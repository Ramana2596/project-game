// src/pages/SimulationSuiteNew/wizardreports/ReportDrawer.jsx
// ✅ Drawer overlay for reports, modularized for SimulationSuiteNew.

import React from "react";
import { Drawer, Box, Typography, IconButton } from "@mui/material";
import { Close } from "@mui/icons-material";

// ✅ ReportDrawer component
export default function ReportDrawer({ open, onClose, stageNo, completedPeriod, completedPeriodNo, stageTitle }) {
  return (
    <Drawer anchor="right" open={open} onClose={onClose}>
      <Box sx={{ width: 400, p: 3 }}>
        {/* ✅ Header with stage title and close button */}
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
          <Typography variant="h6" fontWeight="700">{stageTitle}</Typography>
          <IconButton onClick={onClose}><Close /></IconButton>
        </Box>

        {/* ✅ Report content placeholder */}
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          Reports for Stage {stageNo}, Period {completedPeriodNo} ({completedPeriod}).
        </Typography>

        {/* ✅ Actual report content would be rendered here */}
        <Box sx={{ bgcolor: "#f8fafc", borderRadius: 2, p: 2, border: "1px solid #cbd5e1" }}>
          <Typography variant="body1" fontWeight="500">Report content goes here…</Typography>
        </Box>
      </Box>
    </Drawer>
  );
}
