// File: src/pages/UiAccess/hooks/useUiAccess.js
// Purpose: Manage UI Access state, hierarchical filtering and ✔ Assigned delta (ONLY changed rows) TVP model

import { useState, useEffect } from "react";
import {
  getRole,
  getProductArea,
  getModule,
  getAccessByRole,
  updateUiAccessBulk
} from "../services/service.js";
import { UI_ACCESS_COLUMNS } from "../constants/uiAccessColumns.js";
import { UI_ACCESS_COLUMN_RULES } from "../constants/columnRules.js";
import { useUser } from "../../../core/access/userContext.jsx";

export const useUiAccess = () => {

  /* ---------------- State ---------------- */

  const [rows, setRows] = useState([]);
  const [savedRows, setSavedRows] = useState([]);
  const [changedRows, setChangedRows] = useState([]);
  const [loading, setLoading] = useState(false);
  const [roles, setRoles] = useState([]);
  const [productAreas, setProductAreas] = useState([]);
  const [modules, setModules] = useState([]);
  const [selectedRole, setSelectedRole] = useState("");
  const [selectedProductArea, setSelectedProductArea] = useState("");
  const [selectedModule, setSelectedModule] = useState("");
  const [showUnassignedOnly, setShowUnassignedOnly] = useState(false);

  const { user, userInfo } = useUser();
  const columns = UI_ACCESS_COLUMNS;

  /* ---------------- Editable Rules ---------------- */
  const isEditable = (key) => UI_ACCESS_COLUMN_RULES[key] ?? false;

  /* ---------------- Load LOVs ---------------- */
  useEffect(() => {
    const fetchLovs = async () => {
      try {

        // ✔ Extract Data[] from standardized API response
        const roleResp = await getRole({ gameId: userInfo.gameId });
        setRoles(roleResp.data?.Data || []);

        const areaResp = await getProductArea({ gameId: userInfo.gameId });
        setProductAreas(areaResp.data?.Data || []);

        const moduleResp = await getModule({ gameId: userInfo.gameId });
        setModules(moduleResp.data?.Data || []);

      } catch {
        setRoles([]);
        setProductAreas([]);
        setModules([]);
      }
    };

    if (userInfo?.gameId) fetchLovs();

  }, [userInfo?.gameId]);

  /* ---------------- Load Access By Role ---------------- */
  const loadAccessByRole = async (roleId) => {

    // ✔ Guard: prevent API call when mandatory params missing
    if (!roleId || !userInfo?.gameId) return;

    setLoading(true);

    try {

      const resp = await getAccessByRole({
        gameId: userInfo.gameId,
        rlId: roleId
      });

      const gridRows = Array.isArray(resp.data?.Data) ? resp.data.Data : [];

      const enriched = gridRows.map(r => ({ ...r, __dirty: false }));

      setRows(enriched);
      setSavedRows(enriched);
      setChangedRows([]);

    } finally {
      setLoading(false);
    }
  };

  /* ---------------- Toggle Assigned (KEY SAFE FIX) ---------------- */
  // ❌ const handleAssignedChange = (rowIndex, value) => {
  const handleAssignedChange = (rowData, value) => {

    setRows(prev => {

      // ❌ const updated = [...prev];
      // ❌ const row = { ...updated[rowIndex] };
      // ❌ const original = savedRows[rowIndex];

      // ✅ Update using business key instead of index (fix for multi-row issue)
      const updated = prev.map(r => {

        if (
          r.Game_Id === rowData.Game_Id &&
          r.RL_Id === rowData.RL_Id &&
          r.UI_Id === rowData.UI_Id
        ) {

          const newAssigned = value ? 1 : 0;

          const original = savedRows.find(s =>
            s.Game_Id === r.Game_Id &&
            s.RL_Id === r.RL_Id &&
            s.UI_Id === r.UI_Id
          );

          return {
            ...r,
            Assigned: newAssigned,
            __dirty: original && original.Assigned !== newAssigned
          };
        }

        return r;
      });

      setChangedRows(prevChanged => {

        const filtered = prevChanged.filter(r =>
          !(r.RL_Id === rowData.RL_Id && r.UI_Id === rowData.UI_Id)
        );

        const newAssigned = value ? 1 : 0;

        const original = savedRows.find(s =>
          s.Game_Id === rowData.Game_Id &&
          s.RL_Id === rowData.RL_Id &&
          s.UI_Id === rowData.UI_Id
        );

        if (original && original.Assigned === newAssigned) {
          return filtered;
        }

        return [
          ...filtered,
          {
            Game_Id: rowData.Game_Id,
            RL_Id: rowData.RL_Id,
            UI_Id: rowData.UI_Id,
            Assigned: newAssigned,
            Permission_Enabled: 0,
            Can_View: 0,
            Can_Create: 0,
            Can_Edit: 0,
            Can_Delete: 0,
            Can_Approve: 0,
            Can_Execute: 0
          }
        ];
      });

      return updated;
    });
  };

  /* ---------------- Hierarchical Filter ---------------- */
  const filteredRows = rows.filter(r => {

    // filter: Product Area, Module, and Unassigned toggle
    if (selectedProductArea && r.Product_Area_Code !== selectedProductArea) return false;

    if (selectedModule && r.Module_Code !== selectedModule) return false;

    if (showUnassignedOnly && r.Assigned === 1) return false;

    return true;
  });

  /* ---------------- Save ONLY CHANGED ROWS ---------------- */
  const saveAccessData = async () => {

    if (changedRows.length === 0) {
      return { success: true };
    }

    setLoading(true);

    try {

      await updateUiAccessBulk({
        rows: changedRows,
        approvedBy: user.userId
      });

      const reset = rows.map(r => ({ ...r, __dirty: false }));

      setRows(reset);
      setSavedRows(reset);
      setChangedRows([]);

      return { success: true };

    } catch {
      return { success: false };
    } finally {
      setLoading(false);
    }
  };

  /* ---------------- Cancel ---------------- */
  const cancelEdit = () => {

    // ✔ Revert to last saved state and clear delta changes
    const reset = savedRows.map(r => ({ ...r, __dirty: false }));

    setRows(reset);
    setChangedRows([]);
  };

  /* ---------------- Return ---------------- */
  return {
    rows: filteredRows,
    loading,
    columns,
    handleAssignedChange,
    saveAccessData,
    cancelEdit,
    isEditable,
    roles,
    productAreas,
    modules,
    selectedRole,
    setSelectedRole,
    selectedProductArea,
    setSelectedProductArea,
    selectedModule,
    setSelectedModule,
    loadAccessByRole,
    showUnassignedOnly,
    setShowUnassignedOnly,
    hasChanges: changedRows.length > 0
  };
};