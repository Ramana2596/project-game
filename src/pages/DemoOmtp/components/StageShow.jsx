// src/pages/DemoOmg/components/StageShow.jsx
// Purpose: The actual visual bar/button, status, icons, & .Size, colour
 
import React from "react";
import { Box, Stack, Button, Tooltip, IconButton, Typography, CircularProgress } from "@mui/material";
import { PlayCircle, CheckCircle, Lock, Visibility, SkipNext } from "@mui/icons-material";
import { UI_STRINGS } from "../constants/labels";

export default function StageShow({
  Stage,
  actionLoading,
  effectiveHalt,
  isSimulationEnd,
  haltStageNo,
  handleStageClick,
  handleOpenReport,
  handleNextMonth,
  isLoading
}) {
 
  const sidebarWidth = 90; // for right sidebar

  return (
    <Stack direction="row" spacing={1} alignItems="center">
      
      {/* Stage Interactive button */}
      <Box sx={{ flex: 1, position: 'relative', overflow: 'hidden', borderRadius: '14px' }}>
        
        {isLoading && (
          <Box sx={{
            position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
            zIndex: 2, bgcolor: 'rgba(255, 255, 255, 0.7)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            backdropFilter: 'blur(2px)'
          }}>
            <CircularProgress size={24} sx={{ mr: 1.5 }} />
            <Typography variant="body2" fontWeight="700" color="primary.main">
              Updating...
            </Typography>
          </Box>
        )}

        {/* Stage Button: Action with Master Styles */}
        <Button
          fullWidth
          disabled={!Stage.isActive || isLoading || effectiveHalt}
          onClick={() => handleStageClick(Stage)}
          sx={Stage.buttonSx}
        >
          <Stack direction="row" spacing={2} alignItems="center">
            {Stage.icon}
            {/* Stage Label format `{No: Name}` */}
            <Typography fontWeight="700">{`${Stage.stageNo}: ${Stage.label}`}</Typography>
          </Stack>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            {Stage.status === "ACTIVE" && <PlayCircle fontSize="small" />}
            {Stage.status === "COMPLETED" && <CheckCircle fontSize="small" sx={{ color: "#4caf50" }} />}
            {Stage.status === "LOCKED" && <Lock fontSize="small" sx={{ color: "#94a3b8" }} />}
            {Stage.status === "FINISHED" && <CheckCircle fontSize="small" sx={{ color: "#2e7d32" }} />}
          </Box>
        </Button>
      </Box>

      {/* Sidebar actions:view reports & NextMonth triggers */}
      <Stack
        direction="row"
        alignItems="center"
        spacing={0.5}
        sx={{ width: `${sidebarWidth}px`, justifyContent: "flex-end" }}
      >
        {/* ViewIcon Report Tooltip and Button */}
        <Tooltip title={Stage.tooltipReports || "No reports"} arrow>
          <span>
            <IconButton
              onClick={() => handleOpenReport(Stage.stageNo)}
              disabled={!Stage.canViewReports}
              color="primary"
              size="small"
              sx={{ bgcolor: Stage.canViewReports ? '#f1f5f9' : 'transparent' }}
            >
              <Visibility />
            </IconButton>
          </span>
        </Tooltip>

        {/* NextMonth trigger with Pulse Animation */}
        <Box sx={{ width: 34 }}>
          {Stage.stageNo === haltStageNo && effectiveHalt && !isSimulationEnd && (
            <Tooltip title={UI_STRINGS.NEXT_MONTH_TOOLTIP || "Proceed to next month"} arrow>
              <span>
                <IconButton
                  onClick={handleNextMonth}
                  size="small"
                  sx={{
                    bgcolor: "#ff9800",
                    color: "#fff",
                    border: "2px solid #fff",
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