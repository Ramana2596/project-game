// File: src/pages/TeamPlan/TeamPlanScreen.jsx
// V5 — Layout and wiring only. Parts live in components/: TeamPlanHeader (heading),
//      TeamPlanTabs (tabs + Cancel/Save), TeamPlanItem (table), TeamPlanDialogs
//      (confirmations). Rules and formatting live in utils/planRules.js.
//      Standalone shows everything; hideHeader=true (ReportDrawer) drops the
//      heading, page chrome and browser-tab title.

import React, { useState, useEffect, useMemo } from "react";
import { alpha, Alert, Box, LinearProgress, Paper } from "@mui/material";
import { colors, tableStyle, layoutStyle, masterTypo } from "../../ux/styles";
import TeamPlanHeader from "./components/TeamPlanHeader.jsx";
import TeamPlanTabs from "./components/TeamPlanTabs.jsx";
import TeamPlanItem from "./components/TeamPlanItem.jsx";
import TeamPlanDialogs from "./components/TeamPlanDialogs.jsx";
import ToastMessage from "../../components/ToastMessage.jsx";
import { useTeamPlan } from "./hooks/useTeamPlan.js";
import { useUser } from "../../core/access/userContext.jsx";

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

          {/* Tab bar with Cancel / Save */}
          <TeamPlanTabs
            currentTab={currentTab}
            tabDataMap={tabDataMap}
            tabStatusMap={tabStatusMap}
            onTabClick={onTabClick}
            canCancel={canCancel}
            canSave={canSave}
            saving={saving}
            calculating={calculating}
            onCancelClick={() => setDialog({ type: "cancel" })}
            onSaveClick={onSaveClick}
          />

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

      {/* Confirmations */}
      <TeamPlanDialogs
        dialog={dialog}
        currentTab={currentTab}
        saving={saving}
        calculating={calculating}
        onClose={closeDialog}
        onConfirmCancel={onConfirmCancel}
        onDiscardAndContinue={onDiscardAndContinue}
        onSaveAndContinue={onSaveAndContinue}
      />

      {/* Toast Notification Bar */}
      <ToastMessage {...toast} onClose={() => setToast((t) => ({ ...t, open: false }))} />
    </Box>
  );
};

export default TeamPlanScreen;