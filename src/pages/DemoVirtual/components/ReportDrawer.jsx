// ============================================================
// Component: ReportDrawer
// Module: DemoVirtual / ReportWriter
// Purpose: Display stage-specific reports and Decide Plan UI
// AI Tags: report-writer, report-drawer, rich-ux, navigation
// UXLab V3 — ReportWriter Rich UX
// ============================================================

import React, { useMemo, useState, useEffect } from "react";

import {
  Drawer,
  Box,
  Typography,
  IconButton,
} from "@mui/material";

import CloseIcon from "@mui/icons-material/Close";

import {
  REPORT_ICON_REGISTRY,
} from "../../../constants/reportIconRegistry";

import {
  REPORT_REGISTRY,
  DECIDE_PLAN_REGISTRY,
} from "./reportRegistry";

import ReportWriter from "./ReportWriter";
import ReportHeader from "../components/ReportHeader";
import ReportNavigation from "../components/ReportNavigation";


// ------------------------------------------------------------
// Report Drawer
// ------------------------------------------------------------
export default function ReportDrawer({
  open,
  onClose,
  stageNo,
  mode = "REPORT",
  completedPeriod,
  stageTitle,
  gameTeam,
  userAccessiblePageIds = [],
}) {

  const [tabIndex, setTabIndex] = useState(0);

  // ----------------------------------------------------------
  // Reset active report when drawer or stage changes.
  // ----------------------------------------------------------
  useEffect(() => {
    if (open) {
      setTabIndex(0);
    }
  }, [open, stageNo, mode]);

  // ----------------------------------------------------------
  // Resolve registry for current drawer mode.
  // ----------------------------------------------------------
  const reportsForStage = useMemo(() => {

    if (!stageNo) return [];

    // --------------------------------------------------------
    // Decide Plan
    // --------------------------------------------------------
    if (mode === "DECIDE_PLAN") {

      const uiId = DECIDE_PLAN_REGISTRY[stageNo];

      if (!uiId) return [];

      const page = userAccessiblePageIds?.find(
        (p) => p.uiId === uiId
      );

      return [
        {
          uiId,
          shortName: page?.shortName || "Decide Plan",
        },
      ];
    }

    // --------------------------------------------------------
    // Normal Reports
    // --------------------------------------------------------
    const stageReports =
      (REPORT_REGISTRY[stageNo] || []).filter(
        (uiId) =>
          userAccessiblePageIds?.some(
            (p) => p.uiId === uiId
          )
      );

    return stageReports.map((uiId) => ({
      uiId,
      shortName:
        userAccessiblePageIds.find(
          (p) => p.uiId === uiId
        )?.shortName || uiId,
    }));

  }, [
    stageNo,
    mode,
    userAccessiblePageIds,
  ]);


  // ----------------------------------------------------------
  // Report Navigation
  //
  // Convert the stage report list into the generic navigation
  // structure consumed by ReportNavigation.
  // ----------------------------------------------------------
  const navigation = useMemo(
    () =>
      reportsForStage.map((report) => ({
        uiId: report.uiId,
        shortName: report.shortName,
        icon: REPORT_ICON_REGISTRY[report.uiId],
      })),
    [reportsForStage]
  );

  // ----------------------------------------------------------
  // Shared Report Context
  //
  // This is the context supplied to both reusable Rich UX
  // components and the selected ReportWriter component.
  // ----------------------------------------------------------
  const reportContext = useMemo(
    () => ({
      stageNo,
      stageTitle,
      gameTeam,
      productionMonth: completedPeriod,

      navigation,
    }),
    [
      stageNo,
      stageTitle,
      gameTeam,
      completedPeriod,
      navigation,
    ]
  );


  // ----------------------------------------------------------
  // Current report
  // ----------------------------------------------------------
  const activeReport =
    reportsForStage[tabIndex];


  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: {
          width: "80%",
          height: "100vh",
          display: "flex",
          flexDirection: "column",
          bgcolor: "#ffffff",
          overflow: "hidden",
        },
      }}
    >

      {/* ==================================================== */}
      {/* Rich UX Header                                       */}
      {/* ==================================================== */}

      <Box
        sx={{
          px: 3,
          pt: 10,
          pb: 1,
        }}
      >

        <Box
          sx={{
            display: "flex",
            alignItems: "flex-start",
            gap: 2,
          }}
        >

          {/* ------------------------------------------------ */}
          {/* Reusable Report Header                           */}
          {/* ------------------------------------------------ */}

          <Box sx={{ flex: 1 }}>
            <ReportHeader
              reportContext={reportContext}
            />
          </Box>

          {/* ------------------------------------------------ */}
          {/* Close                                            */}
          {/* ------------------------------------------------ */}

          <IconButton
            onClick={onClose}
            size="small"
            sx={{
              mt: 0.5,
              bgcolor: "#f1f5f9",
              "&:hover": {
                bgcolor: "#e2e8f0",
              },
            }}
          >
            <CloseIcon fontSize="small" />
          </IconButton>

        </Box>

        {/* -------------------------------------------------- */}
        {/* Team Context                                       */}
        {/* -------------------------------------------------- */}

        {gameTeam && (
          <Typography
            sx={{
              mt: -1,
              mb: 1,
              fontSize: "0.9rem",
              fontWeight: 600,
              color: "text.secondary",
            }}
          >
            {gameTeam}
          </Typography>
        )}

      </Box>


      {/* ==================================================== */}
      {/* Reusable Report Navigation                          */}
      {/* ==================================================== */}

      {navigation.length > 0 && (
        <Box
          sx={{
            px: 3,
            pb: 1,
          }}
        >
          <ReportNavigation
            reportContext={reportContext}
            activeIndex={tabIndex}
            onChange={setTabIndex}
          />
        </Box>
      )}


      {/* ==================================================== */}
      {/* Report Content                                       */}
      {/* ==================================================== */}

      <Box
        sx={{
          flex: 1,
          overflow: "auto",
          px: 1.5,
          pt: 0.5,
          bgcolor: "#f8fafc",
        }}
      >

        <Box
          sx={{
            minWidth: "1200px",
            bgcolor: "#fff",
            p: 0.5,
          }}
        >

          {activeReport?.uiId ? (

            <ReportWriter
              uiId={activeReport.uiId}
              reportContext={reportContext}
            />

          ) : (

            <Box
              sx={{
                textAlign: "center",
                py: 10,
              }}
            >
              <Typography
                variant="h6"
                color="text.secondary"
                fontWeight="700"
              >
                No Data Available
              </Typography>
            </Box>

          )}

        </Box>

      </Box>

    </Drawer>
  );
}