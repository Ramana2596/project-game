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
import InventoryIcon from "@mui/icons-material/Inventory";              // Products (finished goods)
import LayersIcon from "@mui/icons-material/Layers";                    // Materials (raw inputs)
import PrecisionManufacturingIcon from "@mui/icons-material/PrecisionManufacturing"; // Machinery (industrial assets)

const TeamPlanScreen = () => {
  const { userInfo } = useUser(); // Get user info (batch, team, etc.)

  // Hook state and handlers
  const {
    tableData, tabDataMap, loading, lovs, lovsMap, currentTab, editMode, columns,
    setEditMode, handleTabChange, handleCellChange,
    saveTableData, cancelEdit, productionMonth, tabStatusMap, fetchBuyInfoLovForPart,
  } = useTeamPlan(userInfo);

  // Local toast state
  const [toast, setToast] = useState({ open: false, message: "", severity: "info" });

  // Save handler with toast feedback
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

  // Enhance columns with styling classes
  const enhancedColumns = columns.map((col) => {
    const isEditable = col.editable || ["quantity", "operationPlan"].includes(col.field);
    return {
      ...col,
      headerClassName: isEditable ? "editable-header-bold" : "standard-header-bold",
      cellClassName: isEditable ? "editable-cell-highlight" : "readonly-cell-muted",
    };
  });

  // Status icons mapping for tabs
  const STATUS_ICONS = {
    saved: { icon: "✅", tooltip: "Saved" },
    unsaved: { icon: "🟡", tooltip: "Yet to Save" },
    unseen: { icon: "⚪", tooltip: "Not yet opened" },
  };

  // Determine rows for current tab (fallback to tableData for backward compatibility)
  const currentRows = tabDataMap?.[currentTab] ?? tableData ?? [];

  // Determine whether current tab has unsaved changes
  const currentStatus = tabStatusMap?.[currentTab] || "unseen";
  const canSave = currentStatus === "unsaved" && editMode;
  const canCancel = currentStatus === "unsaved" && editMode;

  return (
    <Box sx={{ p: 4, backgroundColor: "#F8F9FA" }}>

      {/* Header section with title and metadata */}
      <Box sx={{ mb: 3 }}>

        {/* Top Row: Title + Actions */}
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>

          {/* Left: Heading & metadata */}
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
                <Box component="span" sx={{ color: "#6c757d", ml: 1 }}>
                  {userInfo.gameBatch}
                </Box>
              </Typography>

              <Typography sx={{ fontSize: "1.1rem" }}>
                <Box component="span" sx={{ fontWeight: 900 }}>TEAM:</Box>
                <Box component="span" sx={{ color: "#6c757d", ml: 1 }}>
                  {userInfo.gameTeam}
                </Box>
              </Typography>

              <Typography sx={{ fontSize: "1.1rem" }}>
                <Box component="span" sx={{ fontWeight: 900 }}>PERIOD:</Box>
                <Box component="span" sx={{ color: "#6c757d", ml: 1 }}>
                  {productionMonth
                    ? format(new Date(productionMonth), "MMM yyyy").toUpperCase()
                    : ""}
                </Box>
              </Typography>
            </Stack>
          </Box>

          {/* Right: Save / Cancel */}
          <Stack direction="row" spacing={2}>
            <Button
              variant="contained"
              startIcon={<SaveIcon />}
              disabled={!canSave}
              onClick={onSaveClick}
            >
              Submit
            </Button>

            <Button
              variant="contained"
              disabled={!canCancel}
              onClick={cancelEdit}
              startIcon={<CancelIcon />}
            >
              Cancel
            </Button>
          </Stack>
        </Box>

        {/* Inline Unsaved Warning */}
        {tabStatusMap[currentTab] === "unsaved" && (
          <Box
            sx={{
              mt: 2,
              px: 2,
              py: 1.5,
              borderRadius: 2,
              backgroundColor: "#FFF3CD",
              border: "1px solid #FFEEBA",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center"
            }}
          >
            <Typography sx={{ fontWeight: 600, color: "#856404" }}>
              ⚠ Changes pending !. Please Save or Cancel.
            </Typography>
          </Box>
        )}

      </Box>

      {/* Tabs navigation with category + status icons */}
      <Tabs
        value={currentTab}
        onChange={(e, v) => handleTabChange(v)}
        sx={{ minHeight: '48px', '& .MuiTabs-indicator': { display: 'none' } }}
      >
        {Object.entries(CATEGORY_ICON).map(([key, cfg]) => {
          const isActive = currentTab === key;
          const status = tabStatusMap[key] || "unseen";
          const { icon, tooltip } = STATUS_ICONS[status];

          // Map category key to correct MUI icon
          let CategoryIconComponent = InventoryIcon;
          if (key === "OI 001") CategoryIconComponent = InventoryIcon;              // Products
          if (key === "OI 002") CategoryIconComponent = LayersIcon;                 // Materials
          if (key === "OI 003") CategoryIconComponent = PrecisionManufacturingIcon; // Machinery

          // Show count if rows exist
          const rowCount = (tabDataMap?.[key] || []).length;
          const countBadge = rowCount > 0 ? ` (${rowCount})` : "";

          return (
            <Tab
              key={key}
              value={key}
              label={
                <Tooltip title={`${cfg.tooltip}${countBadge} • ${tooltip}`} arrow>
                  <span style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                    <CategoryIconComponent fontSize="small" /> {/* ✅ Correct icon */}
                    <span>{cfg.label}</span>                   {/* ✅ Just "Products", "Materials", "Machinery" */}
                    <span>{icon}</span>                        {/* Status icon (✅/🟡/⚪) */}
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

      {/* Table section showing rows for current tab */}
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

      {/* Toast notifications */}
      <ToastMessage {...toast} />
    </Box>
  );
};

export default TeamPlanScreen;