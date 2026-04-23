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
  const { user } = useUser();
  const columns = UI_ACCESS_COLUMNS;

  /* ---------------- Editable Rules ---------------- */
  const isEditable = (key) => UI_ACCESS_COLUMN_RULES[key] ?? false;

  /* ---------------- Load LOVs ---------------- */
  useEffect(() => {
    const fetchLovs = async () => {
      try {
        const roleResp = await getRole({ gameId: user.gameId });
        setRoles(roleResp.data || []);
        const areaResp = await getProductArea({ gameId: user.gameId });
        setProductAreas(areaResp.data || []);
        const moduleResp = await getModule({ gameId: user.gameId });
        setModules(moduleResp.data || []);
      } catch {
        setRoles([]);
        setProductAreas([]);
        setModules([]);
      }
    };
    fetchLovs();
  }, [user]);

  /* ---------------- Load Access By Role ---------------- */
  const loadAccessByRole = async (roleId) => {
    if (!roleId) return;
    setLoading(true);
    try {
      const resp = await getAccessByRole({
        gameId: user.gameId,
        RL_Id: roleId,
      });
      const gridRows = Array.isArray(resp.data) ? resp.data : [];
      const enriched = gridRows.map(r => ({ ...r, __dirty: false }));
      setRows(enriched);
      setSavedRows(enriched);
      setChangedRows([]);
    } finally {
      setLoading(false);
    }
  };

  /* ---------------- Toggle Assigned (DELTA SAFE) ---------------- */
  const handleAssignedChange = (rowIndex, value) => {
    setRows(prev => {
      const updated = [...prev];
      const row = { ...updated[rowIndex] };
      const original = savedRows[rowIndex];
      const newAssigned = value ? 1 : 0;
      row.Assigned = newAssigned;
      row.__dirty = original && original.Assigned !== newAssigned;
      updated[rowIndex] = row;
      setChangedRows(prevChanged => {
        const filtered = prevChanged.filter(r =>
          !(r.RL_Id === row.RL_Id && r.UI_Id === row.UI_Id)
        );
        if (original && original.Assigned === newAssigned) {
          return filtered;
        }
        return [
          ...filtered,
          {
            Game_Id: row.Game_Id,
            RL_Id: row.RL_Id,
            UI_Id: row.UI_Id,
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
        Approved_By: user.userId
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