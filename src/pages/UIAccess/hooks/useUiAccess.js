// File: src/pages/UiAccess/hooks/useUiAccess.js
// Purpose: Manage UI Access state, filtering, ✔ Assigned logic and API integration (backend-driven matrix)

import { useState, useEffect } from "react";
import {
  getRole,
  getProductArea,
  getUiScreen,
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

  const [lovRoles, setLovRoles] = useState([]);
  const [lovCategories, setLovCategories] = useState([]);
  const [lovScreens, setLovScreens] = useState({});

  const [selectedRole, setSelectedRole] = useState("");
  const [selectedDomain, setSelectedDomain] = useState("");

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
        setLovRoles(roleResp.data || []);

        const catResp = await getProductArea({ gameId: user.gameId });
        setLovCategories(catResp.data || []);

        const screenResp = await getUiScreen({ gameId: user.gameId });

        const grouped = {};
        (screenResp.data || []).forEach(s => {
          if (!grouped[s.Domain_Code]) grouped[s.Domain_Code] = [];
          grouped[s.Domain_Code].push(s);
        });

        setLovScreens(grouped);

      } catch {
        setLovRoles([]);
        setLovCategories([]);
        setLovScreens({});
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

      /* Backend already returns full UI matrix */
      const uiAccessRows = Array.isArray(resp.data) ? resp.data : [];

      setRows(uiAccessRows);
      setSavedRows(uiAccessRows);
      setChangedRows([]);

    } finally {
      setLoading(false);
    }
  };

  /* ---------------- Checkbox Toggle Handler ---------------- */
  const handleAssignedChange = (rowIndex, value) => {

    setRows(prev => {

      const updated = [...prev];
      const row = { ...updated[rowIndex] };

      row.Assigned = value;

      /* ---------------- Action Derivation ---------------- */
      if (!row.Assigned && value) {
        row.Action = "ADD";
      } else if (row.Assigned && !value) {
        row.Action = "DELETE";
      } else {
        row.Action = "NONE";
      }

      updated[rowIndex] = row;

      setChangedRows(prevChanged => {

        const filtered = prevChanged.filter(r =>
          !(r.RL_Id === row.RL_Id && r.UI_Id === row.UI_Id)
        );

        return row.Action !== "NONE"
          ? [...filtered, row]
          : filtered;
      });

      return updated;
    });
  };

  /* ---------------- Filtered Rows ---------------- */
  const filteredRows = rows.filter(r => {

    if (selectedDomain && r.Domain_Code !== selectedDomain) return false;

    if (showUnassignedOnly && r.Assigned === true) return false;

    return true;
  });

  /* ---------------- Save Changes ---------------- */
  const saveAccessData = async () => {

    setLoading(true);

    try {

      const addRows = changedRows.filter(r => r.Action === "ADD");
      const deleteRows = changedRows.filter(r => r.Action === "DELETE");

      if (addRows.length > 0) {
        await updateUiAccessBulk({
          type: "ADD",
          rows: addRows.map(r => ({
            Game_Id: r.Game_Id,
            RL_Id: r.RL_Id,
            UI_Id: r.UI_Id,
            Created_By: user.userId,
          }))
        });
      }

      if (deleteRows.length > 0) {
        await updateUiAccessBulk({
          type: "DELETE",
          rows: deleteRows.map(r => ({
            Game_Id: r.Game_Id,
            RL_Id: r.RL_Id,
            UI_Id: r.UI_Id,
          }))
        });
      }

      setSavedRows(rows);
      setChangedRows([]);

      return { success: true };

    } catch {
      return { success: false };
    } finally {
      setLoading(false);
    }
  };

  /* ---------------- Cancel Changes ---------------- */
  const cancelEdit = () => {
    setRows(savedRows);
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

    lovRoles,
    lovCategories,
    lovScreens,

    selectedRole,
    setSelectedRole,
    selectedDomain,
    setSelectedDomain,
    loadAccessByRole,

    showUnassignedOnly,
    setShowUnassignedOnly,
  };
};