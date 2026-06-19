// File: src/pages/TeamPlan/hooks/useTeamPlan.js
// Purpose: Manage TeamPlan state, tab data, LOVs, edit and API integration

import { useState, useEffect } from "react";
import { getOpsPlanQuery, updateOpsPlanBulk } from "../services/service.js";
import { getResolvedColumns } from "../utils/getResolvedColumns.js";
import { COLUMN_RULES } from "../constants/columnRules.js";
import { useUser } from "../../../core/access/userContext.jsx";

export const useTeamPlan = (userInfo) => {

  const [tabDataMap, setTabDataMap] = useState({});
  const [savedDataMap, setSavedDataMap] = useState({});
  const [changedRowsMap, setChangedRowsMap] = useState({});
  const [lovsMap, setLovsMap] = useState({});
  const [productionMonth, setProductionMonth] = useState("");
  const [currentTab, setCurrentTab] = useState("OI 001");
  const [loading, setLoading] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [tabStatusMap, setTabStatusMap] = useState({});
  const { user } = useUser();

  const columns = getResolvedColumns(currentTab);

  const isEditable = (key) => {
    const rules = COLUMN_RULES[key];
    return rules ? rules[currentTab] : true;
  };

  /* ---------------- Fetch Production Month ---------------- */
  useEffect(() => {
    if (!userInfo) return;

    const fetchMonth = async () => {
      const payload = {
        gameId: userInfo.gameId,
        gameBatch: userInfo.gameBatch,
        gameTeam: userInfo.gameTeam,
        cmdLine: "Get_Period",
      };
      try {
        const resp = await getOpsPlanQuery(payload);
        setProductionMonth(resp.data?.[0]?.Production_Month || "");
      } catch {
        setProductionMonth("");
      }
    };

    fetchMonth();
  }, [userInfo]);

  /* ---------------- Fetch table data per tab (Get_Info) ---------------- */
  useEffect(() => {
    if (!productionMonth) return;
    if (tabDataMap[currentTab]) return;

    const payload = {
      gameId: userInfo.gameId,
      gameBatch: userInfo.gameBatch,
      gameTeam: userInfo.gameTeam,
      productionMonth: productionMonth.split("T")[0],
      operationsInputId: currentTab,
      cmdLine: "Get_Info",
    };

    const fetchTable = async () => {
      setLoading(true);
      try {
        const resp = await getOpsPlanQuery(payload);
        const rows = Array.isArray(resp.data) ? resp.data : [];

        setTabDataMap(p => ({ ...p, [currentTab]: rows }));
        setSavedDataMap(p => ({ ...p, [currentTab]: JSON.parse(JSON.stringify(rows)) }));
        setChangedRowsMap(p => ({ ...p, [currentTab]: [] }));
      } finally {
        setLoading(false);
      }
    };

    fetchTable();

  }, [productionMonth, currentTab]);

  /* ---------------- Fetch Buy_Info LOV per part ---------------- */
  const fetchBuyInfoLovForPart = async (tabKey, partNo, requiredQuantity) => {
    if (!productionMonth || !partNo) return;

    let cmdLine = "Buy_Material";
    if (tabKey === "OI 003") cmdLine = "Buy_Asset";

    const payload = {
      gameId: userInfo.gameId,
      gameBatch: userInfo.gameBatch,
      gameTeam: userInfo.gameTeam,
      productionMonth: productionMonth.split("T")[0],
      operationsInputId: tabKey,
      partNo,
      requiredQuantity, 
      cmdLine,
    };

    try {
      const resp = await getOpsPlanQuery(payload);
      const data = Array.isArray(resp.data) ? resp.data : [];

      console.log("RAW Buy_Material item:", data[0]);

      const priceLov = data.map(item => ({
        Price_Id: item.Price_Id,
        Info_Price: item.Info_Price,
        Quantity: item.Quantity, 
        Unit_Price: item.Unit_Price,
      }));

      setLovsMap(p => ({
        ...p,
        [tabKey]: { ...(p[tabKey] || {}), [partNo]: { Price_Lov: priceLov } }
      }));

/*
      // Refresh Quantity/Unit_Price for already-selected rows so Order Quantity stays in sync
      setTabDataMap(prev => {
        const rows = prev[tabKey] || [];
        let touched = [];
        const updatedRows = rows.map(r => {
          if (r.Part_No === partNo && r.Price_Id) {
            const match = priceLov.find(p => p.Price_Id === r.Price_Id);
            if (match && (match.Quantity !== r.Quantity || match.Unit_Price !== r.Unit_Price)) {
              const updated = { ...r, Quantity: match.Quantity, Unit_Price: match.Unit_Price };
              touched.push(updated);
              return updated;
            }
          }
          return r;
        });

        if (touched.length === 0) return prev;

        setChangedRowsMap(ch => ({
          ...ch,
          [tabKey]: [
            ...(ch[tabKey] || []).filter(r =>
              !touched.some(t => t.Part_No === r.Part_No && t.Quantity_Id === r.Quantity_Id)
            ),
            ...touched
          ]
        }));
        setTabStatusMap(p => ({ ...p, [tabKey]: "unsaved" }));

        return { ...prev, [tabKey]: updatedRows };
      });

*/
    } catch {
      setLovsMap(p => ({
        ...p,
        [tabKey]: { ...(p[tabKey] || {}), [partNo]: { Price_Lov: [] } }
      }));
    }
  };

  /* ---------------- Cell change handler ---------------- */
  const handleCellChange = (rowIndex, key, valueOrRow) => {
    setTabDataMap(prev => {
      const newData = [...(prev[currentTab] || [])];
      if (key === null) {
        newData[rowIndex] = valueOrRow;
      } else {
        newData[rowIndex] = { ...newData[rowIndex], [key]: valueOrRow };
      }

      const row = newData[rowIndex];
      setChangedRowsMap(ch => ({
        ...ch,
        [currentTab]: [
          ...(ch[currentTab] || []).filter(r =>
            !(r.Part_No === row.Part_No && r.Quantity_Id === row.Quantity_Id)
          ),
          row
        ]
      }));

      return { ...prev, [currentTab]: newData };
    });

    setTabStatusMap(p => ({ ...p, [currentTab]: "unsaved" }));
  };

  /* ---------------- Save ---------------- */
  const saveTableData = async () => {
    setLoading(true);
    try {
      const rows = changedRowsMap[currentTab] || [];

      const payload = rows.map(r => ({
        Game_Id: userInfo.gameId,
        Game_Batch: userInfo.gameBatch,
        Game_Team: userInfo.gameTeam,
        Production_Month: productionMonth.split("T")[0],
        Operations_Input_Id: currentTab,
        Part_No: r.Part_No,
        Quantity_Id: r.Quantity_Id,
        Quantity: Number(r.Quantity || 0),
        Price_Id: r.Price_Id,
        Unit_Price: Number(r.Unit_Price || 0),
      }));

      await updateOpsPlanBulk(payload, user.role);

      setSavedDataMap(p => ({ ...p, [currentTab]: tabDataMap[currentTab] }));
      setChangedRowsMap(p => ({ ...p, [currentTab]: [] }));
      setTabStatusMap(p => ({ ...p, [currentTab]: "saved" }));
      setEditMode(false);

      return { success: true };
    } catch {
      return { success: false };
    } finally {
      setLoading(false);
    }
  };

  const cancelEdit = () => {
    setTabDataMap(p => ({ ...p, [currentTab]: savedDataMap[currentTab] || [] }));
    setChangedRowsMap(p => ({ ...p, [currentTab]: [] }));
    setTabStatusMap(p => ({ ...p, [currentTab]: "saved" }));
    setEditMode(false);
  };

  const handleTabChange = (tabKey) => {
    if (tabStatusMap[currentTab] === "unsaved") {
      return;
    }
    setCurrentTab(tabKey);
  };

  return {
    tableData: tabDataMap[currentTab] || [],
    loading,
    columns,
    editMode,
    setEditMode,
    currentTab,
    handleTabChange,
    handleCellChange,
    saveTableData,
    cancelEdit,
    isEditable,
    changedRows: changedRowsMap[currentTab] || [],
    fetchBuyInfoLovForPart,
    lovsMap,
    productionMonth,
    tabStatusMap,
  };
};
