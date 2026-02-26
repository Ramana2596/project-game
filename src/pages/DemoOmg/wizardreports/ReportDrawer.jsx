// src/pages/DemoOmg/wizardreports/ReportDrawer.jsx
// Purpose: Display(ReportWriter) stage-specific RBAC reports.

import React, { useMemo, useState, useEffect } from "react";
import { Drawer, Box, Typography, Tabs, Tab, IconButton, Stack } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { componentList } from "../../../constants/globalConstants";
import { REPORT_REGISTRY } from "./reportRegistry";

// Recursive search component Vs route: Navigates global component list to find the matching element by UI ID.
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

  // Reset tab index  at the first report when drawer opens:
  useEffect(() => {
    if (open) setTabIndex(0);
  }, [open, stageNo]);

  // Date format: Month-Year format fo.
  const formattedMonth = useMemo(() => {
    if (!completedPeriod) return "Setup Phase";
    const date = new Date(completedPeriod);
    return date.toLocaleDateString("en-US", { month: "short", year: "numeric" });
  }, [completedPeriod]);

  // Get RBAC UiId of reports for the stage: Filters available reports by RBAC.
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

  // Get component for UiId for active tab
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
          width: "85%", 
          height: "100vh",
          display: "flex",
          flexDirection: "column",
          bgcolor: "#ffffff",
          overflow: "hidden"
        }
      }}
    >
      {/* HEADER: Team left, Stage center, Month right */}
      <Box sx={{ 
        px: 3, 
        pt: 4, 
        pb: 2, 
        borderBottom: "1px solid #e2e8f0" 
      }}>
        <Stack direction="row" justifyContent="space-between" alignItems="center">
          {/* Left: Team Identity Group */}
          <Typography
            variant="subtitle1"
            sx={{ fontWeight: 800, color: "primary.dark", fontSize: "1.1rem" }} 
          >
            Team {gameTeam} :
          </Typography>

          {/* Center: Main Stage Title */}
          <Typography
            variant="h5"
            sx={{
              fontWeight: 900, 
              color: "#1e293b",
              fontSize: "1.6rem",
              textAlign: "center",
              flexGrow: 1
            }}
          >
            {stageTitle}
          </Typography>

          {/* Right: Period Info + Close Action */}
          <Stack direction="row" spacing={2} alignItems="center">
            <Typography
              variant="subtitle1"
              sx={{ color: "primary.main", fontWeight: 800, fontSize: "1.1rem" }}
            >
              {formattedMonth}
            </Typography>
            <IconButton onClick={onClose} size="small" sx={{ bgcolor: "#f1f5f9", "&:hover": { bgcolor: "#e2e8f0" } }}>
              <CloseIcon fontSize="small" />
            </IconButton>
          </Stack>
        </Stack>
      </Box>

      {/* Active TABS: Professional high-contrast navigation bar */}
      <Box sx={{ px: 2, bgcolor: "#f8fafc", borderBottom: "1px solid #e2e8f0" }}> 
        {reportsForStage.length > 0 && (
          <Tabs
            value={tabIndex}
            onChange={(e, newVal) => setTabIndex(newVal)}
            variant="scrollable"
            TabIndicatorProps={{ sx: { display: "none" } }}
            sx={{
              minHeight: 48,
              "& .MuiTab-root": {
                fontWeight: 800, 
                fontSize: "0.875rem",
                minHeight: 40,
                textTransform: "uppercase", // Professional caps
                letterSpacing: "0.025em",
                px: 3,
                my: 1,
                mx: 0.5,
                borderRadius: "8px",
                color: "#64748b",
                backgroundColor: "transparent",
                transition: "all 0.2s",
                "&:hover": { color: "primary.main", bgcolor: "rgba(15, 23, 42, 0.04)" }
              },
              "& .MuiTab-root.Mui-selected": {
                bgcolor: "primary.main",
                color: "#ffffff !important",
                boxShadow: "0 4px 12px rgba(37, 99, 235, 0.2)" 
              }
            }}
          >
            {reportsForStage.map((r) => (
              <Tab key={r.uiId} label={r.shortName} />
            ))}
          </Tabs>
        )}
      </Box>

      {/* Report Content Area: Injects production month data into the selected component */}
      <Box sx={{ flex: 1, overflow: "auto", px: 2, py: 2, bgcolor: "#f1f5f9" }}> 
        <Box sx={{ 
          minWidth: "1200px", 
          bgcolor: "#fff", 
          p: 3,
          borderRadius: 2,
          boxShadow: "0 1px 3px rgba(0,0,0,0.1)" 
        }}>
          {selectedElement ? (
            React.cloneElement(selectedElement, {
              productionMonth: completedPeriod 
            })
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