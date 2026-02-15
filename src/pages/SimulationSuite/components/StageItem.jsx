// src/pages/SimulationSuite/components/StageItem.jsx
// Presents Stage button & Report icon, status & tooltip
import React from "react";
import { Button, Tooltip, Avatar, Stack, Typography, IconButton, Box, CircularProgress } from "@mui/material";
import { PlayCircle, CheckCircle, Lock, Visibility } from "@mui/icons-material";
import { STAGE_TEMPLATES, UI_STRINGS } from "../constants/labels.js";

export default function StageItem({ stage, onClick, onOpenReport, actionLoading }) {
  // Props destructure: stage model and handlers
  const { stageNo, label, icon, status, tooltipReports, buttonSx, isActive, canViewReports } = stage;

  // Status icon mapping for right-side indicator
  const statusIcon = (() => {
    if (status === "ACTIVE") return <PlayCircle fontSize="small" />;
    if (status === "COMPLETED") return <CheckCircle fontSize="small" />;
    if (status === "LOCKED") return <Lock fontSize="small" />;
    if (status === "FINISHED") return <CheckCircle fontSize="small" color="success" />;
    return null;
  })();

  // Render: main button (left) and report icon (right)
  return (
    <Stack direction="row" spacing={1.5} alignItems="center">
      <Tooltip title={UI_STRINGS.CLICK_TO_PROCEED} arrow>
        <span style={{ flex: 1 }}>
          <Button fullWidth disabled={!isActive || actionLoading} onClick={() => onClick(stage)} sx={buttonSx}>
            <Stack direction="row" spacing={2} alignItems="center" sx={{ flex: 1 }}>
              {actionLoading && isActive ? (
                <CircularProgress size={18} color="inherit" />
              ) : (
                <Avatar sx={{ bgcolor: "transparent" }}>{icon || null}</Avatar>
              )}
              <Typography sx={{ textTransform: "none", fontWeight: 600 }}>{STAGE_TEMPLATES.TITLE(stageNo, label)}</Typography>
            </Stack>
            <Box>{statusIcon}</Box>
          </Button>
        </span>
      </Tooltip>

      <Tooltip title={tooltipReports || ""} arrow>
        <span>
          <IconButton
            aria-label={UI_STRINGS.OPEN_REPORTS_ARIA(stageNo)}
            onClick={() => onOpenReport(stageNo)}
            disabled={!canViewReports}
            color="primary"
          >
            <Visibility />
          </IconButton>
        </span>
      </Tooltip>
    </Stack>
  );
}
