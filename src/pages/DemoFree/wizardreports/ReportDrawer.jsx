// src/pages/SimulationSuiteNew/wizardreports/ReportDrawer.jsx
// ✅ Drawer overlay for reports, modularized for SimulationSuiteNew.

import React from "react";
import { Drawer, Box, Typography, IconButton } from "@mui/material";
import { Close } from "@mui/icons-material";
import { UI_STRINGS } from "../constants/labels"; // ✅ Added labels

export default function ReportDrawer({ open, onClose, stageNo, completedPeriod, completedPeriodNo, stageTitle }) {
  return (
    <Drawer anchor="right" open={open} onClose={onClose}>
      <Box sx={{ width: 400, p: 3 }}>
        {/* ✅ Drawer header */}
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
          <Typography variant="h6" fontWeight="700">{UI_STRINGS.REPORT_HEADER(stageTitle)}</Typography>
          <IconButton onClick={onClose}><Close /></IconButton>
        </Box>

        {/* ✅ Descriptive sub-text */}
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          {UI_STRINGS.REPORT_DESC(stageNo, completedPeriodNo, completedPeriod)}
        </Typography>

        {/* ✅ Content container */}
        <Box sx={{ bgcolor: "#f8fafc", borderRadius: 2, p: 2, border: "1px solid #cbd5e1" }}>
          <Typography variant="body1" fontWeight="500">{UI_STRINGS.REPORT_PLACEHOLDER}</Typography>
        </Box>
      </Box>
    </Drawer>
  );
}