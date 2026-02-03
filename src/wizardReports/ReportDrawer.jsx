// src/wizardReports/ReportDrawer.jsx

import React, { useMemo, useState, useEffect } from "react";
import { Drawer, Box, Typography, Tabs, Tab, IconButton, Stack } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useUser } from "../core/access/userContext";
import { componentList } from "../constants/globalConstants";
import { REPORT_REGISTRY } from "./reportRegistry";

const findComponentById = (list, id) => {
  for (const item of list) {
    if (item.id === id) return item.routeElement;
    if (item.children) {
      const found = findComponentById(item.children, id);
      if (found) return found;
    }
  }
  return null;
};

export default function ReportDrawer({
  open,
  onClose,
  stageNo,
  completedPeriod,   
  completedPeriodNo, 
  stageTitle 
}) {
  const { userAccessiblePageIds } = useUser();
  const [tabIndex, setTabIndex] = useState(0);

  useEffect(() => {
    if (open) setTabIndex(0);
  }, [open, stageNo]);

  // Clean formatting: Only "Feb 2026"
  const formattedMonth = useMemo(() => {
    if (!completedPeriod) return "Setup Phase";
    const date = new Date(completedPeriod);
    return date.toLocaleDateString("en-US", { month: "short", year: "numeric" });
  }, [completedPeriod]);

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

  const selectedElement = reportsForStage[tabIndex]
    ? findComponentById(componentList, reportsForStage[tabIndex].uiId)
    : null;

  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={onClose}
      PaperProps={{ sx: { width: "80%", height: "100vh", display: "flex", flexDirection: "column", bgcolor: "#ffffff", overflow: "hidden" }}}
    >
      {/* 1. HEADER: Minimalist Title & Date Only */}
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

      {/* 2. TABS: High-contrast active state */}
      <Box sx={{ px: 2, bgcolor: "#fff", borderBottom: "1px solid #e2e8f0" }}>
        {reportsForStage.length > 0 && (
          <Tabs
            value={tabIndex}
            onChange={(e, newVal) => setTabIndex(newVal)}
            variant="scrollable"
            TabIndicatorProps={{ sx: { display: 'none' } }}
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

      {/* 3. CONTENT AREA: Flush to Tabs */}
      <Box sx={{ flex: 1, overflow: "auto", px: 1.5, pt: 0.5, bgcolor: "#f8fafc" }}>
        <Box sx={{ minWidth: "1200px", bgcolor: "#fff", p: 0.5 }}>
          {selectedElement ? (
            React.cloneElement(selectedElement, { 
              completedPeriod, 
              periodNo: completedPeriodNo, 
              stageNo 
            })
          ) : (
            <Typography variant="body2" align="center" sx={{ mt: 5 }}>No Data</Typography>
          )}
        </Box>
      </Box>
    </Drawer>
  );
}