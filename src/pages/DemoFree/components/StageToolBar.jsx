// src/pages/SimulationSuite/components/StageToolBar.jsx
// Action row for refresh

import React from "react";
import { Stack, Button, Tooltip, Typography, IconButton, Paper } from "@mui/material";
import { Refresh, HelpOutline } from "@mui/icons-material";
import { UI_STRINGS } from "../constants/labels"; // ✅ Added labels

export default function StageToolBar({ onRefresh, loading }) {
  return (
    <Paper 
      elevation={0} 
      sx={{ 
        p: 1.5, 
        mb: 2, 
        bgcolor: "#f8fafc", 
        border: "1px solid #e2e8f0", 
        borderRadius: "12px" 
      }}
    >
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        {/* ✅ Left side: Action group */}
        <Stack direction="row" spacing={1} alignItems="center">
          <Button
            variant="outlined"
            size="small"
            startIcon={<Refresh sx={{ animation: loading ? "spin 2s linear infinite" : "none" }} />}
            onClick={onRefresh}
            disabled={loading}
            sx={{ borderRadius: "8px", textTransform: "none", fontWeight: "600" }}
          >
            {loading ? UI_STRINGS.WAITING : "Refresh Status"}
          </Button>
          
          <style>
            {`@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }`}
          </style>
        </Stack>

        {/* ✅ Right side: Info group */}
        <Stack direction="row" spacing={1} alignItems="center">
          <Typography variant="caption" color="text.secondary" sx={{ fontWeight: "500" }}>
            {/* Logic for last sync can be added here */}
          </Typography>
          <Tooltip title="View Help & Documentation" arrow>
            <IconButton size="small">
              <HelpOutline fontSize="small" sx={{ color: "#64748b" }} />
            </IconButton>
          </Tooltip>
        </Stack>
      </Stack>
    </Paper>
  );
}
