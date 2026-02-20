import React from "react";
import { Box, Stack, Button, Tooltip, IconButton, Typography, CircularProgress } from "@mui/material";
import { PlayCircle, CheckCircle, Lock, Visibility, SkipNext } from "@mui/icons-material";
import { UI_STRINGS } from "../constants/labels"; // ✅ Added labels

export default function StageItem({ Stage, actionLoading, effectiveHalt, isSimulationEnd, haltStageNo, handleStageClick, handleOpenReport, handleNextMonth }) {
  const isButtonLoading = actionLoading && Stage.status === "ACTIVE";

  return (
    <Stack direction="row" spacing={1} alignItems="center">
      {/* ✅ Main interactive button area */}
      <Box sx={{ flex: 1, position: 'relative', overflow: 'hidden', borderRadius: '14px' }}>
        {isButtonLoading && (
          <Box sx={{
            position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
            zIndex: 2, bgcolor: 'rgba(255, 255, 255, 0.7)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            backdropFilter: 'blur(2px)'
          }}>
            <CircularProgress size={24} sx={{ mr: 1.5 }} />
            <Typography variant="body2" fontWeight="700" color="primary.main">{UI_STRINGS.WAITING}</Typography>
          </Box>
        )}

        <Button
          fullWidth disabled={!Stage.isActive || actionLoading || effectiveHalt}
          onClick={() => handleStageClick(Stage)} sx={Stage.buttonSx}
        >
          <Stack direction="row" spacing={2} alignItems="center">
            {Stage.icon}
            <Typography fontWeight="500">{Stage.label}</Typography>
          </Stack>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            {Stage.status === "ACTIVE" && <PlayCircle fontSize="small" />}
            {Stage.status === "COMPLETED" && <CheckCircle fontSize="small" />}
            {Stage.status === "LOCKED" && <Lock fontSize="small" sx={{ color: "#94a3b8" }} />}
            {Stage.status === "FINISHED" && <CheckCircle fontSize="small" color="success" />}
          </Box>
        </Button>
      </Box>

      {/* ✅ Sidebar action icons */}
      <Stack direction="row" alignItems="center" spacing={0.5} sx={{ width: 90, justifyContent: "flex-end" }}>
        <Tooltip title={Stage.tooltipReports || UI_STRINGS.NO_REPORTS} arrow>
          <span>
            <IconButton
              onClick={() => handleOpenReport(Stage.stageNo)}
              disabled={!Stage.canViewReports}
              color="primary" size="small"
            >
              <Visibility />
            </IconButton>
          </span>
        </Tooltip>
        <Box sx={{ width: 34 }}>
          {Stage.stageNo === haltStageNo && effectiveHalt && !isSimulationEnd && (
            <Tooltip title={UI_STRINGS.NEXT_MONTH_TOOLTIP} arrow>
              <span>
                <IconButton
                  onClick={handleNextMonth} size="small"
                  sx={{
                    bgcolor: "#ff9800", color: "#fff", border: "2px solid #fff",
                    boxShadow: "0 0 0 1px #ff9800, 0 2px 6px rgba(0,0,0,0.15)",
                    animation: 'pulse 2s infinite',
                    '@keyframes pulse': {
                      '0%': { transform: 'scale(0.95)', boxShadow: '0 0 0 0px rgba(255, 152, 0, 0.7)' },
                      '70%': { transform: 'scale(1.1)', boxShadow: '0 0 0 15px rgba(255, 152, 0, 0)' },
                      '100%': { transform: 'scale(0.95)', boxShadow: '0 0 0 0px rgba(255, 152, 0, 0)' },
                    },
                    "&:hover": { bgcolor: "#fb8c00", animation: 'none', transform: "scale(1.1)" }
                  }}
                >
                  <SkipNext fontSize="small" />
                </IconButton>
              </span>
            </Tooltip>
          )}
        </Box>
      </Stack>
    </Stack>
  );
}