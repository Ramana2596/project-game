// File: src/pages/UiAccess/hooks/useUiAccess.js
// Purpose: Manage UI Access state (rows = list of Role ↔ UI Screen mappings)

import { useState, useEffect, useMemo } from "react";
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
  // rows = current working list of Role ↔ UI Screen mappings
 
  const [rows, setRows] = useState([]); // rows = current working list of Role ↔ UI Screen
  const [savedRows, setSavedRows] = useState([]);  // savedRows = last saved copy of rows
  const [loading, setLoading] = useState(false);

  // LOVs (lookup lists) for filters
  const [roles, setRoles] = useState([]);
  const [productAreas, setProductAreas] = useState([]);
  const [modules, setModules] = useState([]);

  // Filter selections
  const [selectedRole, setSelectedRole] = useState("");
  const [selectedProductArea, setSelectedProductArea] = useState("");
  const [selectedModule, setSelectedModule] = useState("");
  const [showUnassignedOnly, setShowUnassignedOnly] = useState(false);

  const { user, userInfo } = useUser();
  const columns = UI_ACCESS_COLUMNS;

  /* ---------------- Load LOVs ---------------- */
  // fetch Role, ProductArea, Module lists for filters
  useEffect(() => {
    const fetchLovs = async () => {
      try {
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
  // fetch all UI Screen mappings for a given Role
  const loadAccessByRole = async (roleId) => {
    if (!roleId || !userInfo?.gameId) return;

    setLoading(true);

    try {
      const resp = await getAccessByRole({
        gameId: userInfo.gameId,
        rlId: roleId
      });

      const gridRows = resp.data?.Data || [];

      const normalized = gridRows.map(r => ({
        ...r,
        Assigned: Number(r.Assigned), // normalize Assigned to number
      }));

      setRows(normalized);
      setSavedRows(normalized);
    } finally {
      setLoading(false);
    }
  };

  /* ---------------- Key Helper ---------------- */
  // Stable unique-keys for each row
  const getKey = (r) => `${r.Game_Id}_${r.RL_Id}_${r.UI_Id}`;

  /* ---------------- Core Updater ---------------- */
  // update Assigned and minimal permissions for given rows
  const updateAssigned = (targetRows, targetKey, value, targetKeys = []) => {
    const newAssigned = value ? 1 : 0;

    return targetRows.map(r => {
      const key = getKey(r);

      // For bulk: only update rows in filteredKeys
      if (targetKey === "__BULK__" && !targetKeys.includes(key)) return r;
      // For single: only update matching row
      if (targetKey !== "__BULK__" && key !== targetKey) return r;

      return {
        ...r,
        Assigned: newAssigned,

        // Minimal safe permissions when Assigned = 1
        Permission_Enabled: newAssigned,
        Can_View: newAssigned,
        Can_Create: 0,
        Can_Edit: 0,
        Can_Delete: 0,
        Can_Approve: 0,
        Can_Execute: 0
      };
    });
  };

  /* ---------------- Single Row Toggle ---------------- */
  // toggle Assigned for one row
  const handleAssignedChange = (rowData, value) => {
    const key = getKey(rowData);
    setRows(prev => updateAssigned(prev, key, value));
  };

  /* ---------------- Bulk Toggle ---------------- */
  // toggle Assigned for all currently filtered rows
  const bulkAssign = (value) => {
    setRows(prev => {
      const filteredKeys = filteredRows.map(r => getKey(r));
      return updateAssigned(prev, "__BULK__", value, filteredKeys);
    });
  };

  /* -------Filter Rows: ProductArea, Module, and Unassigned ------- */
  // Show rows, matching all selected criteria
  const filteredRows = useMemo(() => {
    return rows.filter(r => {
      if (selectedProductArea && r.Product_Area_Code !== selectedProductArea) return false;
      if (selectedModule && r.Module_Code !== selectedModule) return false;
      if (showUnassignedOnly && Number(r.Assigned) === 1) return false;
      return true;
    });
  }, [rows, selectedProductArea, selectedModule, showUnassignedOnly]);

  /* ---------------- Save Access Data ---------------- */
  // Save changes to backend
  const saveAccessData = async () => {
    setLoading(true);

    try {
      const changedRows = rows.filter(r => {
        const original = savedRows.find(s =>
          getKey(s) === getKey(r)
        );
        return original && original.Assigned !== r.Assigned;
      });

      await updateUiAccessBulk({
        rows: changedRows,
        approvedBy: user.userId
      });

      setSavedRows(rows);

      return { success: true };
    } catch {
      return { success: false };
    } finally {
      setLoading(false);
    }
  };

  /* ---------------- Cancel Edit ---------------- */
  // Restore rows to last saved state
  const cancelEdit = () => {
    setRows(savedRows);
  };

  /* ---------------- Return Hook API ---------------- */
  // Expose state and actions to UiAccess.jsx
  return {
    rows: filteredRows,          // list of rows after filters applied
    loading,
    columns,
    handleAssignedChange,
    bulkAssign,
    saveAccessData,
    cancelEdit,
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
    hasChanges: rows.length !== savedRows.length
  };
};
