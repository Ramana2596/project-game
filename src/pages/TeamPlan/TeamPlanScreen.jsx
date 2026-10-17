// File: src/pages/TeamPlan/TeamPlanScreen.jsx
// V4 — Built from src/ux/styles tokens: layoutStyle (root, pageContainer,
//      pageHeader, pageHeaderDatePill, tabBar, panel), buttonStyle (tab, tabActive,
//      primary, secondary, text, compact), tableStyle (container), masterTypo, colors.
//      Heading lives in components/TeamPlanHeader.jsx (ReportHeader pattern).
//      Buttons sit in the tab bar. Standalone shows everything; hideHeader=true
//      (ReportDrawer) drops the heading, page chrome and browser-tab title.

import React, { useState, useEffect, useMemo } from "react";
import {
  alpha,
  Box,
  Typography,
  Paper,
  Button,
  Tabs,
  Tab,
  Tooltip,
  Alert,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  LinearProgress,
} from "@mui/material";
import {
  Save as SaveIcon,
  Close as CancelIcon,
  CheckCircle as CheckIcon,
  Pending as PendingIcon,
  RadioButtonUnchecked as UnseenIcon,
  Inventory as InventoryIcon,
  Layers as LayersIcon,
  PrecisionManufacturing as ManufacturingIcon,
} from "@mui/icons-material";
import {
  colors,
  tableStyle,
  buttonStyle,
  layoutStyle,
  masterTypo,
} from "../../ux/styles";
import TeamPlanHeader from "./components/TeamPlanHeader.jsx";
import TeamPlanItem from "./components/TeamPlanItem.jsx";
import ToastMessage from "../../components/ToastMessage.jsx";
import { useTeamPlan } from "./hooks/useTeamPlan.js";
import { useUser } from "../../core/access/userContext.jsx";
import { CATEGORY_ICON } from "./constants/categoryIcon.js";

/* ---------------- Styles composed from ux/styles tokens ---------------- */

// Destructive actions: primary button shape with the error colour.
const DANGER_SX = {
  ...buttonStyle.primary,
  ...buttonStyle.compact,
  background: colors.error,
  boxShadow: "none",
  "&:hover": { background: colors.error, filter: "brightness(0.9)", boxShadow: "none" },
};
const DANGER_TEXT_SX = {
  ...buttonStyle.text,
  color: colors.error,
  "&:hover": { background: "transparent", color: colors.error },
};

// Tab status indicators driven by palette tokens.
const STATUS_CONFIG = {
  saved: {
    icon: <CheckIcon sx={{ fontSize: 16, color: colors.success }} />,
    tooltip: "Saved",
  },
  unsaved: {
    icon: <PendingIcon sx={{ fontSize: 16, color: colors.warning }} />,
    tooltip: "Pending save",
  },
  unseen: {
    icon: <UnseenIcon sx={{ fontSize: 16, color: colors.subtitle }} />,
    tooltip: "Not opened",
  },
};

// Tab icons. Move into constants/categoryIcon.js when convenient.
const TAB_ICON = {
  "OI 001": InventoryIcon,
  "OI 002": LayersIcon,
  "OI 003": ManufacturingIcon,
};

// Embedded (ReportDrawer) wrapper: no page chrome, fills the drawer.
const EMBEDDED_SX = { width: "100%", minWidth: 0 };

const TeamPlanScreen = ({ hideHeader = false }) => {
  const { userInfo } = useUser();

  const {
    tabDataMap,
    tableData,
    loading,
    saving,
    calculating,
    error,
    currentTab,
    columns,
    setEditMode,
    handleTabChange,
    handleCellChange,
    saveTableData,
    cancelEdit,
    changedRows,
    rowErrors,
    productionMonth,
    tabStatusMap,
    fetchBuyInfoLovForPart,
    lovsMap,
  } = useTeamPlan(userInfo);

  // Browser-tab title only when the page is standalone.
  useEffect(() => {
    if (hideHeader) return;
    document.title = `Operations Business Plan | Batch ${userInfo?.gameBatch ?? ""} - Team ${userInfo?.gameTeam ?? ""}`;
  }, [hideHeader, userInfo?.gameBatch, userInfo?.gameTeam]);

  const [toast, setToast] = useState({ open: false, message: "", severity: "info" });
  // dialog: null | { type: "cancel" } | { type: "tab", tab: "OI 002" }
  const [dialog, setDialog] = useState(null);

  const currentRows = tabDataMap?.[currentTab] ?? tableData ?? [];
  const currentStatus = tabStatusMap?.[currentTab] || "unseen";
  const isUnsaved = currentStatus === "unsaved";
  const hasAnyUnsaved = Object.values(tabStatusMap || {}).includes("unsaved");
  const busy = saving || loading;

  const canSave = isUnsaved && !busy && !calculating;
  const canCancel = isUnsaved && !busy;

  // Warn before the browser tab is closed with unsaved data.
  useEffect(() => {
    if (!hasAnyUnsaved) return undefined;
    const warn = (e) => {
      e.preventDefault();
      e.returnValue = "";
    };
    window.addEventListener("beforeunload", warn);
    return () => window.removeEventListener("beforeunload", warn);
  }, [hasAnyUnsaved]);

  // Save the current tab, show the result, and report back.
  const onSaveClick = async () => {
    const res = await saveTableData();
    setToast({
      open: true,
      message: res?.message || (res?.success ? "Plan saved" : "Save failed"),
      severity: res?.success ? "success" : "error",
    });
    return res;
  };

  // Tab click: ask first when the current tab has unsaved changes.
  const onTabClick = (tab) => {
    if (tab === currentTab) return;
    if (isUnsaved) {
      setDialog({ type: "tab", tab });
      return;
    }
    handleTabChange(tab);
  };

  const closeDialog = () => setDialog(null);

  const onDiscardAndContinue = () => {
    const target = dialog?.tab;
    cancelEdit();
    closeDialog();
    if (target) handleTabChange(target);
  };

  const onSaveAndContinue = async () => {
    const target = dialog?.tab;
    const res = await onSaveClick();
    closeDialog();
    if (res?.success && target) handleTabChange(target);
  };

  const onConfirmCancel = () => {
    cancelEdit();
    closeDialog();
  };

  // Mark editable columns; editable rules are kept in one place here.
  const enhancedColumns = useMemo(
    () =>
      columns.map((col) => {
        const isEditable =
          col.editable ||
          (currentTab === "OI 001" && col.key === "Quantity") ||
          (currentTab !== "OI 001" &&
            ["Required_Quantity", "Info_Price"].includes(col.key));

        return { ...col, editable: isEditable };
      }),
    [columns, currentTab]
  );

  const tabLabel = (key) => CATEGORY_ICON?.[key]?.label || key;

  return (
    <Box
      {...(hideHeader
        ? { component: "section", "aria-label": "Operations Business Plan", sx: EMBEDDED_SX }
        : { component: "main", "aria-labelledby": "team-plan-heading", sx: layoutStyle.root })}
    >
      <Box sx={hideHeader ? undefined : layoutStyle.pageContainer}>
        {/* Page heading: hidden when rendered through ReportDrawer */}
        {!hideHeader && (
          <TeamPlanHeader team={userInfo?.gameTeam} productionMonth={productionMonth} />
        )}

        <Paper component="article" elevation={0} sx={{ ...layoutStyle.panel, p: 0, overflow: "hidden" }}>
          {/* Progress while saving or calculating prices */}
          {(saving || calculating) && <LinearProgress aria-label="Working" />}

          {/* Load error */}
          {error && (
            <Box sx={{ p: 2, pb: 0 }}>
              <Alert severity="error" variant="outlined" role="alert" sx={{ borderRadius: 2 }}>
                {error}
              </Alert>
            </Box>
          )}

          {/* Unsaved-changes banner */}
          {isUnsaved && (
            <Box sx={{ p: 2, pb: 0 }}>
              <Alert
                severity="warning"
                variant="outlined"
                role="status"
                aria-live="polite"
                sx={{
                  backgroundColor: alpha(colors.warning, 0.08),
                  borderColor: colors.warning,
                  borderRadius: 2,
                  "& .MuiAlert-message": { ...masterTypo.body2, color: colors.title },
                }}
              >
                You have unsaved changes. Save the plan or cancel to discard them.
              </Alert>
            </Box>
          )}

          {/* Tab bar: category tabs with Cancel / Save right-justified */}
          <Box sx={{ px: 2, pt: 2 }}>
            <Box
              component="nav"
              aria-label="Operations Category Navigation"
              sx={{
                ...layoutStyle.tabBar,
                mb: 0,
                flexWrap: "nowrap",
                alignItems: "center",
                columnGap: 2,
              }}
            >
              <Tabs
                value={currentTab}
                onChange={(e, v) => onTabClick(v)}
                variant="scrollable"
                scrollButtons="auto"
                TabIndicatorProps={{ style: { display: "none" } }}
                sx={{
                  minHeight: 44,
                  flex: 1,
                  minWidth: 0,
                  "& .MuiTabs-flexContainer": { gap: 0.5 },
                }}
              >
                {Object.entries(CATEGORY_ICON).map(([key, cfg]) => {
                  const status = tabStatusMap?.[key] || "unseen";
                  const statusCfg = STATUS_CONFIG[status];
                  const CategoryIconComponent = TAB_ICON[key] || InventoryIcon;
                  const rowCount = (tabDataMap?.[key] || []).length;

                  return (
                    <Tab
                      key={key}
                      value={key}
                      label={
                        <Tooltip title={`${cfg.tooltip} (${rowCount} items) • ${statusCfg.tooltip}`} arrow>
                          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                            <CategoryIconComponent fontSize="small" sx={{ color: "inherit" }} />
                            <span>{cfg.label}</span>
                            {rowCount > 0 && (
                              <Typography
                                component="span"
                                sx={{ ...masterTypo.caption, fontWeight: 700, color: "inherit" }}
                              >
                                ({rowCount})
                              </Typography>
                            )}
                            {/* White disc keeps the status icon readable on the active tab */}
                            <Box
                              role="img"
                              aria-label={statusCfg.tooltip}
                              sx={{
                                display: "inline-flex",
                                p: 0.25,
                                borderRadius: "50%",
                                background: colors.paper,
                              }}
                            >
                              {statusCfg.icon}
                            </Box>
                          </Box>
                        </Tooltip>
                      }
                      sx={{
                        ...buttonStyle.tab,
                        "&.Mui-selected": { ...buttonStyle.tabActive },
                        "&.Mui-selected:hover": { background: buttonStyle.tabActive.background },
                      }}
                    />
                  );
                })}
              </Tabs>

              <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, ml: "auto", flexShrink: 0 }}>
                <Button
                  variant="outlined"
                  color="inherit"
                  disabled={!canCancel}
                  onClick={() => setDialog({ type: "cancel" })}
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
                  {saving ? "Saving…" : calculating ? "Calculating…" : "Save"}
                </Button>
              </Box>
            </Box>
          </Box>

          {/* Data table card */}
          <Box sx={{ p: 2 }}>
            <Box sx={tableStyle.container}>
              <TeamPlanItem
                rows={currentRows}
                loading={loading}
                columns={enhancedColumns}
                lovsMap={lovsMap}
                currentTab={currentTab}
                changedRows={changedRows}
                rowErrors={rowErrors}
                onEditStart={() => setEditMode(true)}
                onCellChange={handleCellChange}
                fetchBuyInfoLovForPart={fetchBuyInfoLovForPart}
              />
            </Box>
          </Box>
        </Paper>
      </Box>

      {/* Cancel confirmation */}
      <Dialog open={dialog?.type === "cancel"} onClose={closeDialog} aria-labelledby="cancel-dialog-title">
        <DialogTitle id="cancel-dialog-title" sx={{ ...masterTypo.h5, color: colors.title }}>
          Discard unsaved changes?
        </DialogTitle>
        <DialogContent>
          <DialogContentText sx={{ ...masterTypo.body2, color: colors.body }}>
            Your edits on {tabLabel(currentTab)} will be lost and the last saved values restored.
          </DialogContentText>
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 2 }}>
          <Button onClick={closeDialog} sx={buttonStyle.text}>
            Keep editing
          </Button>
          <Button onClick={onConfirmCancel} variant="contained" sx={DANGER_SX}>
            Discard
          </Button>
        </DialogActions>
      </Dialog>

      {/* Tab change with unsaved changes: Save / Discard / Stay */}
      <Dialog open={dialog?.type === "tab"} onClose={saving ? undefined : closeDialog} aria-labelledby="tab-dialog-title">
        <DialogTitle id="tab-dialog-title" sx={{ ...masterTypo.h5, color: colors.title }}>
          Unsaved changes
        </DialogTitle>
        <DialogContent>
          <DialogContentText sx={{ ...masterTypo.body2, color: colors.body }}>
            {tabLabel(currentTab)} has unsaved changes. Save them before opening{" "}
            {tabLabel(dialog?.tab)}?
          </DialogContentText>
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 2 }}>
          <Button onClick={closeDialog} disabled={saving} sx={buttonStyle.text}>
            Stay
          </Button>
          <Button onClick={onDiscardAndContinue} disabled={saving} sx={DANGER_TEXT_SX}>
            Discard and continue
          </Button>
          <Button
            onClick={onSaveAndContinue}
            disabled={saving || calculating}
            variant="contained"
            sx={{ ...buttonStyle.primary, ...buttonStyle.compact }}
          >
            {saving ? "Saving…" : "Save and continue"}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Toast Notification Bar */}
      <ToastMessage {...toast} onClose={() => setToast((t) => ({ ...t, open: false }))} />
    </Box>
  );
};

export default TeamPlanScreen;