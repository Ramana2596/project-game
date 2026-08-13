// File: src/pages/TeamPlan/TeamPlanScreen.jsx
import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Paper,
  Button,
  Tabs,
  Tab,
  Stack,
  Tooltip,
  Alert,
  Chip
} from "@mui/material";
import {
  Save as SaveIcon,
  Close as CancelIcon,
  CheckCircle as CheckIcon,
  Pending as PendingIcon,
  RadioButtonUnchecked as UnseenIcon,
  Inventory as InventoryIcon,
  Layers as LayersIcon,
  PrecisionManufacturing as ManufacturingIcon
} from "@mui/icons-material";
import { format } from "date-fns";
import {
  colors,
  tableStyle,
  buttonStyle,
  layoutStyle,
  masterTypo,
  cardStyle
} from "../../ux/styles";
import TeamPlanItem from "./components/TeamPlanItem.jsx";
import ToastMessage from "../../components/ToastMessage.jsx";
import { useTeamPlan } from "./hooks/useTeamPlan.js";
import { useUser } from "../../core/access/userContext.jsx";
import { CATEGORY_ICON } from "./constants/categoryIcon.js";

const TeamPlanScreen = () => {
  const { userInfo } = useUser();

  const {
    tableData,
    tabDataMap,
    loading,
    currentTab,
    editMode,
    columns,
    setEditMode,
    handleTabChange,
    handleCellChange,
    saveTableData,
    cancelEdit,
    productionMonth,
    tabStatusMap,
    fetchBuyInfoLovForPart,
    lovsMap,
  } = useTeamPlan(userInfo);

  useEffect(() => {
    document.title = `Operations Business Plan | Batch ${userInfo?.gameBatch || ""} - Team ${userInfo?.gameTeam || ""}`;
  }, [userInfo?.gameBatch, userInfo?.gameTeam]);

  const [toast, setToast] = useState({ open: false, message: "", severity: "info" });

  const onSaveClick = async () => {
    try {
      const res = await saveTableData();
      if (res?.success) {
        setToast({ open: true, message: "Plan saved successfully", severity: "success" });
        setEditMode(false);
      } else {
        setToast({ open: true, message: res?.message || "Save failed", severity: "error" });
      }
    } catch {
      setToast({ open: true, message: "Unexpected error while saving", severity: "error" });
    }
  };

  const enhancedColumns = columns.map((col) => {
    const isEditable =
      col.editable ||
      (currentTab === "OI 001" && col.key === "Quantity") ||
      (currentTab !== "OI 001" && ["Required_Quantity", "Info_Price"].includes(col.key));

    return {
      ...col,
      headerClassName: isEditable ? "editable-header-bold" : "standard-header-bold",
      cellClassName: isEditable ? "editable-cell-highlight" : "readonly-cell-muted",
    };
  });

  // Operational status indicators driven by colorPalette.js tokens
  const STATUS_CONFIG = {
    saved: {
      icon: <CheckIcon sx={{ fontSize: 16, color: colors.success }} />,
      tooltip: "Saved"
    },
    unsaved: {
      icon: <PendingIcon sx={{ fontSize: 16, color: colors.warning }} />,
      tooltip: "Pending Save"
    },
    unseen: {
      icon: <UnseenIcon sx={{ fontSize: 16, color: colors.subtitle }} />,
      tooltip: "Not opened"
    },
  };

  const currentRows = tabDataMap?.[currentTab] ?? tableData ?? [];
  const currentStatus = tabStatusMap?.[currentTab] || "unseen";
  const canSave = currentStatus === "unsaved" && editMode;
  const canCancel = currentStatus === "unsaved" && editMode;

  return (
    <Box component="main" aria-labelledby="team-plan-heading" sx={{ ...layoutStyle.root, p: 2 }}>
      <Paper
        component="article"
        elevation={0}
        sx={{
          ...cardStyle.container,
          overflow: "hidden",
          // Table Header uses shared color token from colorPalette.js & structural header styles from tableStyle.js
          "& .MuiDataGrid-columnHeaders, & .standard-header-bold, & .editable-header-bold": {
            ...tableStyle?.header,
            backgroundColor: colors.selected,
            color: colors.heading || colors.primaryDark,
            fontWeight: 700,
            fontSize: "0.825rem",
            letterSpacing: "0.03em",
            borderBottom: `1px solid ${colors.border}`,
          },
          "& .MuiDataGrid-columnHeaderTitle": {
            fontWeight: 700,
            color: colors.heading || colors.primaryDark,
          }
        }}
      >
        {/* Header Title Bar */}
        <Box sx={{ p: 3, pb: 2, borderBottom: `1px solid ${colors.border}`, background: colors.paper }}>
          <Box sx={{ ...layoutStyle.flexRow, flexWrap: "wrap", gap: 2, alignItems: "center", justifyContent: "space-between" }}>
            <Box sx={{ ...layoutStyle.flexColumn, gap: 1 }}>
              <Typography
                id="team-plan-heading"
                component="h1"
                sx={{ ...masterTypo.h1, fontSize: "1.4rem", color: colors.primary }}
              >
                Operations Business Plan
              </Typography>

              <Stack direction="row" spacing={3} alignItems="center" flexWrap="wrap" component="dl" sx={{ my: 0 }}>
                <Stack direction="row" spacing={0.75} alignItems="center">
                  <Typography component="dt" sx={{ ...masterTypo.body2, color: colors.subtitle }}>
                    Batch:
                  </Typography>
                  <Typography component="dd" sx={{ margin: 0 }}>
                    <Chip label={userInfo.gameBatch || "—"} size="small" variant="outlined" sx={{ fontWeight: 600 }} />
                  </Typography>
                </Stack>

                <Stack direction="row" spacing={0.75} alignItems="center">
                  <Typography component="dt" sx={{ ...masterTypo.body2, color: colors.subtitle }}>
                    Team:
                  </Typography>
                  <Typography component="dd" sx={{ margin: 0 }}>
                    <Chip label={userInfo.gameTeam || "—"} size="small" variant="outlined" sx={{ fontWeight: 600 }} />
                  </Typography>
                </Stack>

                <Stack direction="row" spacing={0.75} alignItems="center">
                  <Typography component="dt" sx={{ ...masterTypo.body2, color: colors.subtitle }}>
                    Period:
                  </Typography>
                  <Typography component="dd" sx={{ ...masterTypo.body1, fontWeight: 600, color: colors.heading, margin: 0 }}>
                    {productionMonth ? format(new Date(productionMonth), "MMM yyyy") : "—"}
                  </Typography>
                </Stack>
              </Stack>
            </Box>

            <Stack direction="row" spacing={1.5} alignItems="center">
              <Button
                variant="outlined"
                color="inherit"
                disabled={!canCancel}
                onClick={cancelEdit}
                startIcon={<CancelIcon />}
                sx={{ ...buttonStyle.secondary, ...buttonStyle.compact }}
              >
                Cancel
              </Button>

              <Button
                variant="contained"
                startIcon={<SaveIcon />}
                disabled={!canSave}
                onClick={onSaveClick}
                sx={{ ...buttonStyle.primary, ...buttonStyle.compact }}
              >
                Submit Plan
              </Button>
            </Stack>
          </Box>
        </Box>

        {/* Warning Banner */}
        {tabStatusMap[currentTab] === "unsaved" && (
          <Box sx={{ p: 2, pb: 0, backgroundColor: colors.warningLight || "#fffbeb" }}>
            <Alert
              severity="warning"
              variant="outlined"
              role="status"
              aria-live="polite"
              sx={{
                backgroundColor: colors.warningLight || "#fff8e6",
                borderColor: colors.warning,
                borderRadius: 2,
                "& .MuiAlert-message": { ...masterTypo.body2, color: colors.title || "#92400e" },
              }}
            >
              Edited Data not saved yet. Submit or cancel !.
            </Alert>
          </Box>
        )}

        {/* Tab Navigation Row */}
        <Box
          component="nav"
          aria-label="Operations Category Navigation"
          sx={{
            px: 2,
            pt: 1.5,
            backgroundColor: colors.default || "#f8fafc",
            borderBottom: `1px solid ${colors.border}`
          }}
        >
          <Tabs
            value={currentTab}
            onChange={(e, v) => handleTabChange(v)}
            TabIndicatorProps={{ style: { display: "none" } }}
            sx={{ minHeight: "44px" }}
          >
            {Object.entries(CATEGORY_ICON).map(([key, cfg]) => {
              const isActive = currentTab === key;
              const status = tabStatusMap[key] || "unseen";
              const statusCfg = STATUS_CONFIG[status];

              let CategoryIconComponent = InventoryIcon;
              if (key === "OI 002") CategoryIconComponent = LayersIcon;
              if (key === "OI 003") CategoryIconComponent = ManufacturingIcon;

              const rowCount = (tabDataMap?.[key] || []).length;

              return (
                <Tab
                  key={key}
                  value={key}
                  label={
                    <Tooltip title={`${cfg.tooltip} (${rowCount} items) • ${statusCfg.tooltip}`} arrow>
                      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                        <CategoryIconComponent fontSize="small" sx={{ color: isActive ? colors.primary : colors.subtitle }} />
                        <span>{cfg.label}</span>
                        {rowCount > 0 && (
                          <Typography
                            component="span"
                            variant="caption"
                            sx={{
                              opacity: 0.85,
                              fontWeight: 700,
                              color: isActive ? colors.primary : colors.subtitle
                            }}
                          >
                            ({rowCount})
                          </Typography>
                        )}
                        <Box sx={{ display: "inline-flex", ml: 0.5 }}>
                          {statusCfg.icon}
                        </Box>
                      </Box>
                    </Tooltip>
                  }
                  sx={{
                    mr: 1,
                    minHeight: 44,
                    px: 2.5,
                    borderRadius: "14px 14px 0 0",
                    fontWeight: 700,
                    fontSize: "0.85rem",
                    textTransform: "uppercase",
                    letterSpacing: "0.03em",
                    color: isActive ? colors.primary : colors.subtitle,
                    backgroundColor: isActive ? colors.selected : colors.paper,
                    border: `1px solid ${colors.border}`,
                    borderBottom: isActive ? `1px solid ${colors.selected}` : `1px solid ${colors.border}`,
                    borderTop: isActive ? `4px solid ${colors.primary}` : `1px solid ${colors.border}`,
                    marginBottom: "-1px",
                    zIndex: isActive ? 2 : 1,
                    transition: "all .15s ease-in-out",
                    "&:hover": {
                      backgroundColor: isActive ? colors.selected : colors.hover,
                      color: isActive ? colors.primary : colors.heading
                    },
                  }}
                />
              );
            })}
          </Tabs>
        </Box>

        {/* Data Table Wrapper */}
        <Box sx={{ ...tableStyle?.container, background: colors.paper }}>
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

      {/* Toast Notification Bar */}
      <ToastMessage {...toast} onClose={() => setToast({ ...toast, open: false })} />
    </Box>
  );
};

export default TeamPlanScreen;