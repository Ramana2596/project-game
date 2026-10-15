// ============================================================
// Component: ReportDrawer
// Module: DemoVirtual / ReportWriter
// Purpose: Display and navigate stage-specific report screens
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

import { ScreenHostProvider } from "../../../components/ScreenAdapter";

import { colors, masterTypo, buttonStyle, tableStyle } from "../../../ux/styles";

// Height of the app-level purple bar that sits above the drawer.

const APP_BAR_HEIGHT = "64px";

// Report Drawer
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

  // Reset active report when drawer or stage changes.
  useEffect(() => {
    if (open) {
      setTabIndex(0);
    }
  }, [open, stageNo, mode]);


  // Resolve registry for current drawer mode.
  const reportsForStage = useMemo(() => {

    if (!stageNo) return [];

    // Decide Plan
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


    // Normal Reports
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



  // Report Navigation
  // Convert stage report list into generic navigation, consumed by ReportNavigation.

  const navigation = useMemo(
    () =>
      reportsForStage.map((report) => ({
        uiId: report.uiId,
        shortName: report.shortName,
        icon: REPORT_ICON_REGISTRY[report.uiId],
      })),
    [reportsForStage]
  );


  // Shared reusable Report Context
  // As standalone components and as the selected ReportWriter component.

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

  // Current report
  const activeReport =
    reportsForStage[tabIndex];

  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: {
          width: { xs: "100%", md: "85%" },
          top: APP_BAR_HEIGHT,
          height: `calc(100vh - ${APP_BAR_HEIGHT})`,
          display: "flex",
          flexDirection: "column",
          bgcolor: colors.paper,
          overflow: "hidden",
        },
      }}
    >

      {/* Header: Team | Stage heading + Date | Close  */}
      <Box
        sx={{
          px: 3,
          pt: 1,
          pb: 0,
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 2,
          }}
        >

          {/* Team name (left)   */}
          {gameTeam && (
            <Typography
              noWrap
              sx={{
                ...masterTypo.body2,
                fontWeight: 600,
                color: colors.subtitle,
              }}
            >
              {gameTeam}
            </Typography>
          )}

          {/* Reusable Report Header (heading + date pill)     */}
          <Box
            sx={{
              flex: 1,
              // remove the bottom margin added by ReportHeader
              "& > *": { mb: "0 !important" },
              // vertically centre the date pill with the heading
              "& > * > :last-child": {
                top: { md: "50%" },
                transform: { md: "translateY(-50%)" },
              },
            }}
          >
            <ReportHeader
              reportContext={reportContext}
            />
          </Box>

          {/* Close (right)    */}
          <IconButton
            onClick={onClose}
            size="small"
            sx={{
              ...buttonStyle.icon,
              width: 32,
              minWidth: 32,
              height: 32,
            }}
          >
            <CloseIcon fontSize="small" />
          </IconButton>

        </Box>

      </Box>

      {/* Reusable Report Navigation     */}
      {navigation.length > 0 && (
        <Box
          sx={{
            px: 3,
            pb: 0,
            "& > *": { mb: "8px !important" },
          }}
        >
          <ReportNavigation
            reportContext={reportContext}
            activeIndex={tabIndex}
            onChange={setTabIndex}
          />
        </Box>
      )}

      {/* Report Content    */}
      <Box
        sx={{
          flex: 1,
          overflow: "auto",
          px: 0.5,
          pt: 0,
          bgcolor: colors.panel,
        }}
      >

        <Box
          sx={{
            ...tableStyle.compact,
            minWidth: 0,
            width: "100%",
            bgcolor: colors.paper,
            p: 0.5,
          }}
        >

          {activeReport?.uiId ? (

            // Screens rendered here know they are hosted by the drawer
            <ScreenHostProvider>
              <ReportWriter
                uiId={activeReport.uiId}
                reportContext={reportContext}
              />
            </ScreenHostProvider>

          ) : (

            <Box
              sx={{
                textAlign: "center",
                py: 10,
              }}
            >
              <Typography
                sx={{
                  ...masterTypo.h6,
                  fontWeight: 700,
                  color: colors.subtitle,
                }}
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