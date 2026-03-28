// src/pages/DemoOmg/wizardreports/ReportDrawer.jsx
// Purpose: Display stage-specific RBAC reports

import React, { useMemo, useState, useEffect } from "react";
import { Drawer, Box, Typography, Tabs, Tab, IconButton, Stack } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { componentList } from "../../../constants/globalConstants";
import { REPORT_REGISTRY } from "./reportRegistry";

// Recursive search component Vs route: Navigates global list to find matching element.
function findComponentById(list, id) {
  for (const item of list) {
    if (item.id === id) return item.routeElement;
    if (item.children) {
      const found = findComponentById(item.children, id);
      if (found) return found;
    }
  }
  return null;
}

export default function ReportDrawer({
  open,
  onClose,
  stageNo,
  completedPeriod,
  stageTitle,
  gameTeam,
  userAccessiblePageIds = []
}) {
  const [tabIndex, setTabIndex] = useState(0);

  // Reset tab index at the first report when drawer opens.
  useEffect(() => {
    if (open) setTabIndex(0);
  }, [open, stageNo]);

  // Date format: Month-Year format.
  const formattedMonth = useMemo(() => {
    if (!completedPeriod) return "Setup Phase";
    const date = new Date(completedPeriod);
    return date.toLocaleDateString("en-US", { month: "short", year: "numeric" });
  }, [completedPeriod]);

  // Get RBAC reports for the stage.
  const reportsForStage = useMemo(() => {
    if (!stageNo) return [];
    const stageReports = (REPORT_REGISTRY[stageNo] || []).filter(
      (uiId) => userAccessiblePageIds?.some((p) => p.uiId === uiId)
    );
    return stageReports.map((uiId) => ({
      uiId,
      shortName: userAccessiblePageIds.find((p) => p.uiId === uiId)?.shortName
    }));
  }, [stageNo, userAccessiblePageIds]);

  // Get component for active tab.
  const selectedElement = reportsForStage[tabIndex]
    ? findComponentById(componentList, reportsForStage[tabIndex].uiId)
    : null;

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
          overflow: "hidden"
        }
      }}
    >
      {/* HEADER */}
      {/* 1. HEADER: Team Left, Title Center, Month Right */}
      <Box sx={{ px: 3, pt: 10, pb: 1.5 }}>
        <Stack direction="row" justifyContent="space-between" alignItems="center">
          {/* Team Name Left-justified */}
          <Typography
            variant="h6"
            sx={{
              fontWeight: 700,
              color: "#334155",
              fontSize: "1.2rem",
              flex: 1,
              textAlign: "left"
            }}
          >
            {gameTeam}
          </Typography>

          {/* Title Centered */}
          <Typography
            variant="h5"
            sx={{
              fontWeight: 800,
              color: "#1e293b",
              fontSize: "1.5rem",
              letterSpacing: "-0.01em",
              flex: 1,
              textAlign: "center"
            }}
          >
            {stageTitle}
          </Typography>

          {/* Month Right-justified + Close Button */}
          <Stack direction="row" spacing={2} alignItems="center" sx={{ flex: 1, justifyContent: "flex-end" }}>
            <Typography
              variant="subtitle1"
              sx={{
                color: "primary.main",
                fontWeight: 800,
                fontSize: "1.1rem",
                textAlign: "right"
              }}
            >
              {formattedMonth}
            </Typography>
            <IconButton onClick={onClose} size="small" sx={{ bgcolor: "#f1f5f9" }}>
              <CloseIcon fontSize="small" />
            </IconButton>
          </Stack>
        </Stack>
      </Box>

      {/* 2. TABS: */}
      <Box sx={{ px: 2, bgcolor: "#fff", borderBottom: "1px solid #e2e8f0" }}>
        {reportsForStage.length > 0 && (
          <Tabs
            value={tabIndex}
            onChange={(e, newVal) => setTabIndex(newVal)}
            variant="scrollable"
            TabIndicatorProps={{ sx: { display: "none" } }}
            sx={{
              minHeight: 40,
              mb: 0.5,
              "& .MuiTab-root": {
                fontWeight: 900,
                fontSize: "0.9rem",
                minHeight: 40,
                textTransform: "none",
                px: 3,
                mx: 0.5,
                borderRadius: "6px",
                color: "#64748b"
              },
              "& .MuiTab-root.Mui-selected": {
                bgcolor: "primary.main",
                color: "#ffffff !important",
                "&:hover": { bgcolor: "primary.dark" }
              }
            }}
          >
            {reportsForStage.map((r) => (
              <Tab key={r.uiId} label={r.shortName} />
            ))}
          </Tabs>
        )}
      </Box>

      {/* Content Area */}
      <Box sx={{ flex: 1, overflow: "auto", px: 1.5, pt: 0.5, bgcolor: "#f8fafc" }}>
        <Box sx={{ minWidth: "1200px", bgcolor: "#fff", p: 0.5 }}>
          {selectedElement ? (
            React.cloneElement(selectedElement, { productionMonth: completedPeriod })
          ) : (
            <Box sx={{ textAlign: "center", py: 10 }}>
              <Typography variant="h6" color="text.secondary" fontWeight="700">
                No Data Available
              </Typography>
            </Box>
          )}
        </Box>
      </Box>
    </Drawer>
  );
}
