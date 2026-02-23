// src/pages/DemoVirtual/wizardreports/ReportDrawer.jsx
// Drawer overlay for reports, updated for virtual orchestration with dynamic component loading.

import React, { useState } from "react";
import { Drawer, Box, Typography, IconButton, Tabs, Tab } from "@mui/material";
import { Close } from "@mui/icons-material";
import { UI_STRINGS } from "../constants/labels";
import { REPORT_REGISTRY } from "./reportRegistry";          // ✅ Registry mapping
import { componentList } from "../../../constants/globalConstants"; // ✅ Global component registry

// Props for rendering Reports
export default function ReportDrawer({ 
  open, 
  onClose, 
  stageNo, 
  completedPeriod, 
  completedStageNo, 
  stageTitle, 
  userAccessiblePageIds = [] // ✅ Ensure access filtering
}) {
  // ✅ Local state for tab selection
  const [activeTab, setActiveTab] = useState(0);

  // ✅ Resolve reports for this stage
  const reports = REPORT_REGISTRY[stageNo] || [];
  const accessibleReports = reports.filter(uiId => 
    userAccessiblePageIds.some(p => p.uiId === uiId)
  );

  // ✅ Handle tab change
  const handleTabChange = (_, newValue) => setActiveTab(newValue);

  // ✅ Resolve component for active tab
  const activeReportId = accessibleReports[activeTab];
  const activeRouteElement = componentList.find(c => c.id === activeReportId)?.routeElement; // ✅ Use routeElement directly

  return (
    <Drawer anchor="right" open={open} onClose={onClose}>
      <Box sx={{ width: 650, p: 3 }}>
        
        {/* Drawer header with dynamic title based on selected stage */}
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
          <Typography variant="h6" fontWeight="700">
            {UI_STRINGS.REPORT_HEADER(stageTitle)}
          </Typography>
          <IconButton onClick={onClose}><Close /></IconButton>
        </Box>

        {/* Team Progress description */}
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          {UI_STRINGS.REPORT_DESC(completedStageNo || stageNo, "", completedPeriod)}
        </Typography>

        {/* ❌ Removed static placeholder box */}
        {/* ✅ Added: Tab navigation for accessible reports */}
        <Tabs 
          value={activeTab} 
          onChange={handleTabChange} 
          variant="scrollable" 
          scrollButtons="auto" 
          sx={{ mb: 2 }}
        >
          {accessibleReports.map((uiId, idx) => {
            const shortName = userAccessiblePageIds.find(p => p.uiId === uiId)?.shortName || uiId;
            return <Tab key={uiId} label={shortName} value={idx} />;
          })}
        </Tabs>

        {/* ✅ Render active report component dynamically */}
        <Box sx={{ 
          bgcolor: "#f8fafc", 
          borderRadius: 2, 
          p: 2, 
          border: "1px solid #cbd5e1",
          minHeight: "300px" 
        }}>
          {activeRouteElement 
            ? activeRouteElement 
            : <Typography variant="body1" fontWeight="500">{UI_STRINGS.NO_REPORTS}</Typography>
          }
        </Box>
        
      </Box>
    </Drawer>
  );
}
