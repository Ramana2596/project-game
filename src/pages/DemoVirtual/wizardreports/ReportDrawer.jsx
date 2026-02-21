// src/pages/DemoVirtual/wizardreports/ReportDrawer.jsx
// ✅ Drawer overlay for reports, updated for virtual orchestration historical viewing.

import React from "react";
import { Drawer, Box, Typography, IconButton } from "@mui/material";
import { Close } from "@mui/icons-material";
import { UI_STRINGS } from "../constants/labels";

// ✅ Props updated for Virtual Flow: added completedStageNo / ❌ removed completedPeriodNo
export default function ReportDrawer({ open, onClose, stageNo, completedPeriod, completedStageNo, stageTitle }) {
  return (
    <Drawer anchor="right" open={open} onClose={onClose}>
      <Box sx={{ width: 450, p: 3 }}>
        
        {/* ✅ Drawer header with dynamic title based on selected stage */}
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
          <Typography variant="h6" fontWeight="700">
            {UI_STRINGS.REPORT_HEADER(stageTitle)}
          </Typography>
          <IconButton onClick={onClose}><Close /></IconButton>
        </Box>

        {/* ✅ Descriptive sub-text anchoring report to completed virtual markers */}
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          {/* ✅ Displays historical context using the 5-parameter anchor logic */}
          {UI_STRINGS.REPORT_DESC(completedStageNo || stageNo, "", completedPeriod)}
        </Typography>

        {/* ✅ Content container for pre-simulated report data */}
        <Box sx={{ 
          bgcolor: "#f8fafc", 
          borderRadius: 2, 
          p: 2, 
          border: "1px solid #cbd5e1",
          minHeight: "200px" 
        }}>
          {/* ✅ Placeholder for orchestrated report data fetching */}
          <Typography variant="body1" fontWeight="500">
            {UI_STRINGS.REPORT_PLACEHOLDER}
          </Typography>
        </Box>
        
      </Box>
    </Drawer>
  );
}