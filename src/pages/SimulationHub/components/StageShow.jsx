// src/pages/SimulationSuite/components/StageShow.jsx
// Purpose: Visual representation of a simulation stage with RBAC for Leader and Student

import React from "react";
import { Box, Stack, Button, Tooltip, IconButton, Typography, CircularProgress } from "@mui/material";
import { PlayCircle, CheckCircle, Lock, Visibility, SkipNext, Block } from "@mui/icons-material"; 
import { UI_STRINGS } from "../constants/labels";

export default function StageShow({
  stage,
  effectiveHalt,
  isSimulationEnd,
  haltStageNo,
  onStageClick,
  onOpenReport,
  onNextMonth,
  isLoading,
  isLeader
}) {

  const sidebarWidth = 90; // for right sidebar

  // RBAC: Disable button if user is Student
  const isDisabled = !isLeader || !stage.isActive || isLoading || effectiveHalt; 

  return (
    <Stack direction="row" spacing={1} alignItems="center">

      {/* Stage Button Container */}
      <Box sx={{ flex: 1, position: 'relative', overflow: 'hidden', borderRadius: '14px' }}>
        
        {/* Loading overlay on Stage Progress */}
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

        {/* Tooltip for Student: 'Leader to Act' */}
        <Tooltip title={(!isLeader && stage.status === "ACTIVE") ? "Leader to Act" : ""} arrow>
          <span style={{ cursor: isDisabled ? 'not-allowed' : 'pointer', display: 'block', pointerEvents: 'auto' }}>
            <Button
              fullWidth
              disabled={isDisabled}
              onClick={() => onStageClick(stage)}
              sx={{ ...stage.buttonSx }}
            >
              {/* Stage label and category icon */}
              <Stack direction="row" spacing={2} alignItems="center">
                {stage.icon} 
                <Typography fontWeight="700">{stage.stageNo + ": " + stage.label}</Typography>
              </Stack>

              {/* Stage status icon: Block for Student, Play for Leader */}
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                {stage.status === "ACTIVE" && (
                  isLeader ? <PlayCircle fontSize="small" /> : <Block fontSize="small" color="error" />
                )}
                {stage.status === "COMPLETED" && <CheckCircle fontSize="small" sx={{ color: "#4caf50" }} />}
                {stage.status === "LOCKED" && <Lock fontSize="small" sx={{ color: "#94a3b8" }} />}
                {stage.status === "FINISHED" && <CheckCircle fontSize="small" sx={{ color: "#2e7d32" }} />}
              </Box>
            </Button>
          </span>
        </Tooltip>
      </Box>

      {/* Sidebar: View reports & NextMonth trigger */}
      <Stack direction="row" alignItems="center" spacing={0.5} sx={{ width: sidebarWidth, justifyContent: "flex-end" }}>
        
        {/* View Reports icon available to both roles */}
        <Tooltip title={stage.tooltipReports || "No reports"} arrow>
          <span>
            <IconButton
              onClick={() => onOpenReport(stage.stageNo)}
              disabled={!stage.canViewReports}
              color="primary"
              size="small"
              sx={{
                bgcolor: stage.canViewReports ? '#f1f5f9' : 'transparent',
                cursor: stage.canViewReports ? 'pointer' : 'not-allowed'
              }}
            >
              <Visibility />
            </IconButton>
          </span>
        </Tooltip>

        {/* Next Month trigger: Only visible to Leader */}
        {isLeader && Number(stage.stageNo) === Number(haltStageNo) && effectiveHalt && !isSimulationEnd && (
          <Tooltip title={UI_STRINGS.NEXT_MONTH_TOOLTIP || "Proceed to next month"} arrow>
            <span>
              <IconButton
                onClick={onNextMonth}
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
                  "&:hover": { bgcolor: "#fb8c00", animation: 'none', transform: "scale(1.1)", cursor: 'pointer' }
                }}
              >
                <SkipNext fontSize="small" />
              </IconButton>
            </span>
          </Tooltip>
        )}
      </Stack>
    </Stack>
  );
}