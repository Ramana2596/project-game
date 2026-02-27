// src/pages/DemoOmg/wizardreports/ReportDrawer.jsx
// Purpose: Display stage-specific RBAC reports

import React, { useMemo, useState, useEffect } from "react";
import { Drawer, Box, Typography, Tabs, Tab, IconButton, Stack, Paper } from "@mui/material";
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
      {/* 1. HEADER: Minimalist Title & Date Only adopted from XX ✅ */}
      <Box sx={{ px: 3, pt: 10, pb: 1.5 }}>
        <Stack direction="row" justifyContent="space-between" alignItems="center">
          <Typography 
            variant="h5" 
            sx={{ 
              fontWeight: 800, 
              color: "#1e293b", 
              fontSize: "1.5rem",
              letterSpacing: "-0.01em"
            }}
          >
            {stageTitle}
          </Typography>

          <Stack direction="row" spacing={2} alignItems="center">
            <Typography 
              variant="subtitle1" 
              sx={{ 
                color: "primary.main", 
                fontWeight: 800, 
                fontSize: "1.1rem" 
              }}
            >
              {formattedMonth}
            </Typography>
            <IconButton onClick={onClose} size="small" sx={{ bgcolor: '#f1f5f9' }}>
              <CloseIcon fontSize="small" />
            </IconButton>
          </Stack>
        </Stack>
      </Box>

{/* 2. TABS: High-contrast active state adopted from XX ✅ */}
      <Box sx={{ px: 2, bgcolor: "#fff", borderBottom: "1px solid #e2e8f0" }}>
        {reportsForStage.length > 0 && (
          <Tabs
            value={tabIndex}
            onChange={(e, newVal) => setTabIndex(newVal)}
            variant="scrollable"
            TabIndicatorProps={{ sx: { display: 'none' } }} // ✅ Hidden indicator from XX
            sx={{
              minHeight: 40,
              mb: 0.5,
              "& .MuiTab-root": { 
                fontWeight: 900, 
                fontSize: "0.9rem", 
                minHeight: 40, 
                textTransform: "none", // ✅ Text case adopted from XX
                px: 3,
                mx: 0.5,
                borderRadius: "6px", 
                color: "#64748b",
              },
              "& .MuiTab-root.Mui-selected": { 
                bgcolor: "primary.main", 
                color: "#ffffff !important",
                "&:hover": { bgcolor: "primary.dark" }
              }
            }}
          >
            {reportsForStage.map((r) => <Tab key={r.uiId} label={r.shortName} />)}
          </Tabs>
        )}
      </Box>

      {/* Content Area: */}
      <Box sx={{ flex: 1, overflow: "auto", px: 1.5, pt: 0.5, bgcolor: "#f8fafc" }}>
        <Box sx={{ minWidth: "1200px", bgcolor: "#fff", p: 0.5 }}>
          {selectedElement ? (
            React.cloneElement(selectedElement, { productionMonth: completedPeriod })
          ) : (
            <Box sx={{ textAlign: "center", py: 10 }}>
              <Typography variant="h6" color="text.secondary" fontWeight="700">No Data Available</Typography>
            </Box>
          )}
        </Box>
      </Box>
    </Drawer>
  );
}