// src/pages/SimulationSuite/wizardreports/ReportDrawer.jsx
// Drawer overlay for reports, upgraded to dynamic component loading

import React, { useState } from "react";
import { Drawer, Box, Typography, IconButton, Tabs, Tab } from "@mui/material";
import { Close } from "@mui/icons-material";
import { UI_STRINGS, STAGE_TEMPLATES } from "../constants/labels.js";
import { REPORT_REGISTRY } from "./reportRegistry.js";
import { componentList } from "../../../constants/globalConstants.js";

export default function ReportDrawer({ 
  open, 
  onClose, 
  stageNo, 
  completedPeriod, 
  completedPeriodNo, 
  stageTitle, 
  userAccessiblePageIds = [] 
}) {
  const [activeTab, setActiveTab] = useState(0);

  // Reports for this stage
  const reports = REPORT_REGISTRY[stageNo] || [];
  const accessibleReports = reports.filter(uiId => 
    userAccessiblePageIds.some(p => p.uiId === uiId)
  );

  const handleTabChange = (_, newValue) => setActiveTab(newValue);

  const activeReportId = accessibleReports[activeTab];
  const activeRouteElement = componentList.find(c => c.id === activeReportId)?.routeElement;

  return (
    <Drawer anchor="right" open={open} onClose={onClose}>
      <Box sx={{ width: 650, p: 3 }}>
        {/* Header */}
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
          <Typography variant="h6" fontWeight="700">
            {stageTitle || STAGE_TEMPLATES.REPORTS_HEADER(stageNo)}
          </Typography>
          <IconButton onClick={onClose}><Close /></IconButton>
        </Box>

        {/* Period info */}
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          {completedPeriodNo ? `Completed Period: ${completedPeriodNo}` : ""}
        </Typography>

        {/* Tabs */}
        <Tabs value={activeTab} onChange={handleTabChange} variant="scrollable" scrollButtons="auto" sx={{ mb: 2 }}>
          {accessibleReports.map((uiId, idx) => {
            const shortName = userAccessiblePageIds.find(p => p.uiId === uiId)?.shortName || uiId;
            return <Tab key={uiId} label={shortName} value={idx} />;
          })}
        </Tabs>

        {/* Report content */}
        <Box sx={{ bgcolor: "#f8fafc", borderRadius: 2, p: 2, border: "1px solid #cbd5e1", minHeight: "300px" }}>
          {activeRouteElement 
            ? activeRouteElement 
            : <Typography variant="body1" fontWeight="500">{UI_STRINGS.NO_REPORTS}</Typography>
          }
        </Box>
      </Box>
    </Drawer>
  );
}
