// File: src/pages/TeamPlan/hooks/useTeamPlan.js
// Purpose: Manage TeamPlan state, tab data, LOVs, edit and API integration

import { useState, useEffect } from "react";
import { getOpsPlanQuery, updateOpsPlanBulk } from "../services/service.js";
import { getResolvedColumns } from "../utils/getResolvedColumns.js";
import { COLUMN_RULES } from "../constants/columnRules.js";
import { useUser } from "../../../core/access/userContext.jsx";

export const useTeamPlan = (userInfo) => {

  /* ---------------- State ---------------- */
  const [paramMap, setParamMap] = useState({});               // Param values per tab
  const [tabDataMap, setTabDataMap] = useState({});           // Table data per tab
  const [savedDataMap, setSavedDataMap] = useState({});       // Saved snapshot per tab
  const [changedRowsMap, setChangedRowsMap] = useState({});   // Changed rows per tab
  const [lovsMap, setLovsMap] = useState({});                 // Buy_Info LOV per part
  const [productionMonth, setProductionMonth] = useState(""); // Active month
  const [currentTab, setCurrentTab] = useState("OI 001");     // Active tab
  const [loading, setLoading] = useState(false);              // Loading flag
  const [editMode, setEditMode] = useState(false);            // Edit mode flag
  const [tabStatusMap, setTabStatusMap] = useState({});       // Tab status
  const { user } = useUser();

  const columns = getResolvedColumns(currentTab);

  /* ---------------- Editable rules ---------------- */
  const isEditable = (key) => {
    const rules = COLUMN_RULES[key];
    return rules ? rules[currentTab] : true;
  };

  /* ---------------- Load ParamMap once (user session) ---------------- */
  useEffect(() => {
    if (!userInfo) return;

    const loadParams = async () => {
      const tabs = ["OI 001", "OI 002", "OI 003"];
      const map = {};

      for (const tab of tabs) {
        const payload = {
          gameId: userInfo.gameId,
          operationsInputId: tab,
          cmdLine: "Get_Param_Value",
        };
        try {
          const resp = await getOpsPlanQuery(payload);
          map[tab] = resp.data?.[0] || {};
        } catch {
          map[tab] = {};
        }
      }
      setParamMap(map);
    };

    loadParams();
  }, [userInfo]);

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

  /* ---------------- Fetch table data per tab ---------------- */
  useEffect(() => {
    if (!productionMonth || !paramMap[currentTab]) return;
    if (tabDataMap[currentTab]) return;

    const { Ref_Type_Info, Ref_Type_Price } = paramMap[currentTab];

    const payload = {
      gameId: userInfo.gameId,
      gameBatch: userInfo.gameBatch,
      gameTeam: userInfo.gameTeam,
      productionMonth: productionMonth.split("T")[0],
      operationsInputId: currentTab,
      refTypeInfo: Ref_Type_Info,
      refTypePrice: Ref_Type_Price, 
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

  }, [productionMonth, currentTab, paramMap]);


  /* ---------------- Fetch Buy_Info LOV per part ---------------- */
  const fetchBuyInfoLovForPart = async (tabKey, partNo) => {
    if (!productionMonth || !partNo) return;

    const { Ref_Type_Info, Ref_Type_Price } = paramMap[tabKey] || {};

    const payload = {
      gameId: userInfo.gameId,
      gameBatch: userInfo.gameBatch,
      gameTeam: userInfo.gameTeam,
      productionMonth: productionMonth.split("T")[0],
      operationsInputId: tabKey,
      refTypeInfo: Ref_Type_Info,
      refTypePrice: Ref_Type_Price,
      partNo,
      cmdLine: "Buy_Info",
    };

    try {
      const resp = await getOpsPlanQuery(payload);
      const data = Array.isArray(resp.data) ? resp.data : [];

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
        // full row update
        newData[rowIndex] = valueOrRow;
      } else {
        // single field update
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

  /* ---------------- Cancel edit ---------------- */
  const cancelEdit = () => {
    setTabDataMap(p => ({ ...p, [currentTab]: savedDataMap[currentTab] || [] }));
    setChangedRowsMap(p => ({ ...p, [currentTab]: [] }));
    setTabStatusMap(p => ({ ...p, [currentTab]: "saved" }));
    setEditMode(false);
  };

  /* ---------------- Tab change ---------------- */
  const handleTabChange = (tabKey) => {
    // Prevent switching if current tab has unsaved changes
    if (tabStatusMap[currentTab] === "unsaved") {
      return;
    }
    setCurrentTab(tabKey);
  };


  /* ---------------- Return ---------------- */
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
