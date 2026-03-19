// File: src/pages/TeamPlan/TeamPlanScreen.jsx
// Purpose: Main screen for Operations Business Plan with tabs, table, and actions

import React, { useState } from "react";
import {
  Box, Typography, Paper, Button, Tabs, Tab, Stack, alpha, Tooltip,
} from "@mui/material";
import { Save as SaveIcon, Close as CancelIcon } from "@mui/icons-material";
import { format } from "date-fns";
import { Alert } from "@mui/material";

import TeamPlanItem from "./components/TeamPlanItem.jsx"; // Table component
import ToastMessage from "../../components/ToastMessage.jsx"; // Toast notifications
import { useTeamPlan } from "./hooks/useTeamPlan.js"; // Custom hook with tab + table logic
import { useUser } from "../../core/access/userContext.jsx"; // User context
import { CATEGORY_ICON } from "./constants/categoryIcon.js"; // Tab metadata (labels, icons, tooltips)

// MUI icons for each category
import InventoryIcon from "@mui/icons-material/Inventory";
import LayersIcon from "@mui/icons-material/Layers";
import PrecisionManufacturingIcon from "@mui/icons-material/PrecisionManufacturing";

const TeamPlanScreen = () => {
  const { userInfo } = useUser(); // Get user info from context

  // Initialize hook to manage production plan state and operations
  const {
    tableData, tabDataMap, loading, currentTab, editMode, columns,
    setEditMode, handleTabChange, handleCellChange,
    saveTableData, cancelEdit, productionMonth, tabStatusMap, fetchBuyInfoLovForPart,
    lovsMap,
  } = useTeamPlan(userInfo);

  // Manage feedback notifications for save/error actions
  const [toast, setToast] = useState({ open: false, message: "", severity: "info" });

  // Execute save operation and provide visual feedback via toast
  const onSaveClick = async () => {
    try {
      const res = await saveTableData();
      if (res.success) {
        setToast({ open: true, message: "Plan saved successfully", severity: "success" });
        setEditMode(false);
      } else {
        setToast({ open: true, message: res.message || "Save failed", severity: "error" });
      }
    } catch (err) {
      setToast({ open: true, message: "Unexpected error while saving", severity: "error" });
    }
  };

  // Logic: Pick which columns look "editable" based on the current tab using OR (||) logic
  const enhancedColumns = columns.map((col) => {
    const isEditable = col.editable ||
      (currentTab === "OI 001" && col.key === "Quantity") ||
      (currentTab !== "OI 001" && ["Required_Quantity", "Info_Price"].includes(col.key)); 
    
    return {
      ...col,
      headerClassName: isEditable ? "editable-header-bold" : "standard-header-bold",
      cellClassName: isEditable ? "editable-cell-highlight" : "readonly-cell-muted",
    };
  });

  // Define icon set for tab status indicators (Saved, Unsaved, Unseen)
  const STATUS_ICONS = {
    saved: { icon: "✅", tooltip: "Saved" },
    unsaved: { icon: "🟡", tooltip: "Yet to Save" },
    unseen: { icon: "⚪", tooltip: "Not yet opened" },
  };

  // Extract relevant rows for the active tab from the state map
  const currentRows = tabDataMap?.[currentTab] ?? tableData ?? [];

  // Determine button states based on current tab's modification status
  const currentStatus = tabStatusMap?.[currentTab] || "unseen";
  const canSave = currentStatus === "unsaved" && editMode;
  const canCancel = currentStatus === "unsaved" && editMode;

  return (
    <Box sx={{ p: 4, backgroundColor: "#F8F9FA" }}>

      {/* Header section containing the main title and dynamic metadata */}
      <Box sx={{ mb: 3 }}>

        {/* Layout for heading info and global action buttons */}
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>

          {/* Render branded heading and user session details */}
          <Box>
            <Typography
              sx={{
                fontFamily: "'Inter', sans-serif",
                fontWeight: 700,
                fontSize: "32px",
                color: "#0061F2",
                letterSpacing: "-0.3px",
                mb: 1
              }}
            >
              Operations Business Plan
            </Typography>

            <Stack direction="row" spacing={4}>
              <Typography sx={{ fontSize: "1.1rem" }}>
                <Box component="span" sx={{ fontWeight: 900 }}>BATCH:</Box>
                <Box component="span" sx={{ color: "#6c757d", ml: 1 }}>{userInfo.gameBatch}</Box>
              </Typography>

              <Typography sx={{ fontSize: "1.1rem" }}>
                <Box component="span" sx={{ fontWeight: 900 }}>TEAM:</Box>
                <Box component="span" sx={{ color: "#6c757d", ml: 1 }}>{userInfo.gameTeam}</Box>
              </Typography>

              <Typography sx={{ fontSize: "1.1rem" }}>
                <Box component="span" sx={{ fontWeight: 900 }}>PERIOD:</Box>
                <Box component="span" sx={{ color: "#6c757d", ml: 1 }}>
                  {productionMonth ? format(new Date(productionMonth), "MMM yyyy").toUpperCase() : ""}
                </Box>
              </Typography>
            </Stack>
          </Box>

          {/* Action buttons for persisting or reverting table changes */}
          <Stack direction="row" spacing={2}>
            <Button
              variant="contained"
              startIcon={<SaveIcon />}
              disabled={!canSave}
              onClick={onSaveClick}
              sx={{ fontWeight: 700 }}
            >
              Submit
            </Button>

            <Button
              variant="contained"
              disabled={!canCancel}
              onClick={cancelEdit}
              startIcon={<CancelIcon />}
              color="inherit"
              sx={{ fontWeight: 700 }}
            >
              Cancel
            </Button>
          </Stack>
        </Box>

        {/* Display warning banner when active tab has unsaved modifications */}
        {tabStatusMap[currentTab] === "unsaved" && (
          <Box
            sx={{
              mt: 2, px: 2, py: 1.5, borderRadius: 2,
              backgroundColor: "#FFF3CD", border: "1px solid #FFEEBA",
              display: "flex", justifyContent: "space-between", alignItems: "center"
            }}
          >
            <Typography sx={{ fontWeight: 600, color: "#856404" }}>
              ⚠ Changes pending !. Please Save or Cancel.
            </Typography>
          </Box>
        )}
      </Box>

      {/* Navigation bar with category-specific icons and status indicators */}
      <Tabs
        value={currentTab}
        onChange={(e, v) => handleTabChange(v)}
        sx={{ minHeight: '48px', '& .MuiTabs-indicator': { display: 'none' } }}
      >
        {Object.entries(CATEGORY_ICON).map(([key, cfg]) => {
          const isActive = currentTab === key;
          const status = tabStatusMap[key] || "unseen";
          const { icon, tooltip } = STATUS_ICONS[status];

          {/* Switch category icons based on Operations Input ID */ }
          let CategoryIconComponent = InventoryIcon;
          if (key === "OI 001") CategoryIconComponent = InventoryIcon;
          if (key === "OI 002") CategoryIconComponent = LayersIcon;
          if (key === "OI 003") CategoryIconComponent = PrecisionManufacturingIcon;

          const rowCount = (tabDataMap?.[key] || []).length;
          const countBadge = rowCount > 0 ? ` (${rowCount})` : "";

          return (
            <Tab
              key={key}
              value={key}
              label={
                <Tooltip title={`${cfg.tooltip}${countBadge} • ${tooltip}`} arrow>
                  <span style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                    <CategoryIconComponent fontSize="small" />
                    <span>{cfg.label}</span>
                    <span>{icon}</span>
                  </span>
                </Tooltip>
              }
              sx={{
                mr: 1.5, minHeight: '48px', borderRadius: "10px 10px 0 0",
                fontWeight: 800, fontSize: "0.9rem",
                backgroundColor: isActive ? "#2D3748" : "transparent",
                color: isActive ? "#FFF !important" : "#6c757d",
                '&:hover': { backgroundColor: isActive ? "#2D3748" : alpha("#2D3748", 0.05) }
              }}
            />
          );
        })}
      </Tabs>

      {/* Main data display area rendering the production plan table */}
      <Paper elevation={15} sx={{ borderRadius: "0 20px 20px 20px", border: "1px solid #DEE2E6", overflow: "hidden", mt: 2 }}>
        <Box sx={{ p: 1 }}>
          <TeamPlanItem
            rows={currentRows}
            loading={loading}
            columns={enhancedColumns}
            lovsMap={lovsMap}
            currentTab={currentTab}
            onEditStart={() => setEditMode(true)}
            onCellChange={handleCellChange}
            fetchBuyInfoLovForPart={fetchBuyInfoLovForPart}
          />
        </Box>
      </Paper>

      {/* Floating notification system for operation results */}
      <ToastMessage {...toast} onClose={() => setToast({ ...toast, open: false })} />
    </Box>
  );
};

export default TeamPlanScreen;