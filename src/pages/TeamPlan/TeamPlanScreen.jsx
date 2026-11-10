// File: src/pages/TeamPlan/TeamPlanScreen.jsx
// Purpose: Operations Business Plan screen. Layout and wiring only; parts live in components/.
// hideHeader=true (ReportDrawer) drops the heading, page chrome and browser-tab title.
// Approval happens in the parent Control Centre, not here.

// React and MUI building blocks.
import React, { useState, useEffect, useMemo } from "react";
import { alpha, Alert, Box, LinearProgress, Paper } from "@mui/material";

// UXLab V3 style tokens.
import { colors, tableStyle, layoutStyle, masterTypo } from "../../ux/styles";

// Screen parts.
import TeamPlanHeader from "./components/TeamPlanHeader.jsx";
import TeamPlanTabs from "./components/TeamPlanTabs.jsx";
import TeamPlanItem from "./components/TeamPlanItem.jsx";
import TeamPlanDialogs from "./components/TeamPlanDialogs.jsx";
import TeamPlanInfoStrip from "./components/TeamPlanInfoStrip.jsx";

// Data hooks and shared pieces.
import { useTeamPlanGuide } from "./hooks/useTeamPlanGuide.js";
import { useTeamPlan } from "./hooks/useTeamPlan.js";
import ToastMessage from "../../components/ToastMessage.jsx";
import { useUser } from "../../core/access/userContext.jsx";

// Wrapper style when embedded in ReportDrawer: no page chrome, fills the drawer.
const EMBEDDED_SX = { width: "100%", minWidth: 0 };

// Progress bar style shown while saving or calculating prices.
const PROGRESS_SX = {
  backgroundColor: colors.primarySelected,
  "& .MuiLinearProgress-bar": { background: colors.heroGradient },
};

// Unsaved-changes banner style.
const UNSAVED_SX = {
  backgroundColor: alpha(colors.warning, 0.08),
  borderColor: colors.warning,
  borderRadius: 2,
  "& .MuiAlert-message": { ...masterTypo.body2, color: colors.title },
};

const TeamPlanScreen = ({ hideHeader = false }) => {
  // Signed-in user and game context (game, batch, team).
  const { userInfo } = useUser();

  // Plan data, edit state and actions for the active tab.
  const {
    tabDataMap,
    tableData: currentRows, // rows of the active tab
    loading,
    saving,
    calculating,
    error,
    currentTab,
    columns,
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

  // Toast message state.
  const [toast, setToast] = useState({ open: false, message: "", severity: "info" });

  // Open confirmation: null | { type: "cancel" } | { type: "tab", tab: "OI 002" }.
  const [dialog, setDialog] = useState(null);

  // Set the browser-tab title (standalone page only).
  useEffect(() => {
    if (hideHeader) return;
    document.title = `Operations Business Plan | Batch ${userInfo?.gameBatch ?? ""} - Team ${userInfo?.gameTeam ?? ""}`;
  }, [hideHeader, userInfo?.gameBatch, userInfo?.gameTeam]);

  // Active line for the Guide and Review cards (Part_No is unique across tabs).
  const [activePart, setActivePart] = useState(null);
  const firstPart = currentRows[0]?.Part_No ?? null;

  // Start on the first row whenever the tab or its first row changes.
  useEffect(() => {
    setActivePart(firstPart != null ? String(firstPart) : null);
  }, [currentTab, firstPart]);

  // Guide figures (last month) for the active line.
  const { info: guideInfo, loading: guideLoading, error: guideError } =
    useTeamPlanGuide(userInfo, productionMonth, activePart);

  // Row behind the active line, used by the Review card.
  const activeRow = currentRows.find((r) => String(r.Part_No) === activePart);

  // Save / unsaved status flags.
  const isUnsaved = (tabStatusMap?.[currentTab] || "unseen") === "unsaved";
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

  // Save the current tab, show the result in a toast, and report back.
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

  // Close any open confirmation.
  const closeDialog = () => setDialog(null);

  // Confirmation "Discard": drop edits, then move to the chosen tab.
  const onDiscardAndContinue = () => {
    const target = dialog?.tab;
    cancelEdit();
    closeDialog();
    if (target) handleTabChange(target);
  };

  // Confirmation "Save": save first, then move to the chosen tab on success.
  const onSaveAndContinue = async () => {
    const target = dialog?.tab;
    const res = await onSaveClick();
    closeDialog();
    if (res?.success && target) handleTabChange(target);
  };

  // Confirmation "Cancel": drop edits on the current tab.
  const onConfirmCancel = () => {
    cancelEdit();
    closeDialog();
  };

  // Mark which columns the user can edit on each tab.
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
    // Page wrapper: <section> when embedded, <main> when standalone.
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
          {/* Progress bar while saving or calculating prices */}
          {(saving || calculating) && <LinearProgress aria-label="Working" sx={PROGRESS_SX} />}

          {/* Load error message */}
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
                sx={UNSAVED_SX}
              >
                You have unsaved changes. Save the plan or cancel to discard them.
              </Alert>
            </Box>
          )}

          {/* Guide (last month, fixed) and Review (effect of the plan, live) cards */}
          <TeamPlanInfoStrip
            tab={currentTab}
            partNo={activePart}
            row={activeRow}
            rows={currentRows}
            info={guideInfo}
            guideLoading={guideLoading}
            guideError={guideError}
            unsaved={isUnsaved}
            calculating={calculating}
          />

          {/* Tab bar with Cancel and Save buttons */}
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

          {/* Plan table for the active tab */}
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
                activePart={activePart}
                onActiveRowChange={(row) => setActivePart(String(row.Part_No))}
                onCellChange={handleCellChange}
                fetchBuyInfoLovForPart={fetchBuyInfoLovForPart}
              />
            </Box>
          </Box>
        </Paper>
      </Box>

      {/* Confirmation dialogs (cancel, tab switch with unsaved data) */}
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

      {/* Toast notification bar */}
      <ToastMessage {...toast} onClose={() => setToast((t) => ({ ...t, open: false }))} />
    </Box>
  );
};

export default TeamPlanScreen;