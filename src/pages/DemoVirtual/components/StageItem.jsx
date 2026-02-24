// src/pages/DemoVirtual/components/StageItem.jsx
// Stage row component clicks, visual states, and report.

import React from "react";
import { Box, Stack, Button, Tooltip, IconButton, Typography, CircularProgress } from "@mui/material";
import { PlayCircle, CheckCircle, Lock, Visibility, SkipNext } from "@mui/icons-material";
import { UI_STRINGS } from "../constants/labels";

export default function StageItem({
  Stage,
  actionLoading,
  effectiveHalt,
  isSimulationEnd,
  haltStageNo,
  handleStageClick,
  handleOpenReport,
  handleNextMonth,
  isLoading   // ✅ new prop from StageList
}) {
  // ✅ Fixed sidebar width for icons
  const sidebarWidth = 120;

  return (
    <Stack direction="row" spacing={1} alignItems="center">
      
      {/* ✅ Stage button area takes total width minus sidebar */}
      <Box sx={{ flex: `1 1 calc(100% - ${sidebarWidth}px)`, position: 'relative', overflow: 'hidden', borderRadius: '14px' }}>
        
        {/* ✅ Loading overlay for this stage button */}
        {isLoading && (
          <Box sx={{
            position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
            zIndex: 2, bgcolor: 'rgba(255, 255, 255, 0.7)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            backdropFilter: 'blur(2px)'
          }}>
            <CircularProgress size={24} sx={{ mr: 1.5 }} />
            <Typography variant="body2" fontWeight="700" color="primary.main">
              {UI_STRINGS.WAITING || "Wait.."}
            </Typography>
          </Box>
        )}

        {/* ✅ Stage Action Button */}
        <Button
          fullWidth
          disabled={!Stage.isActive || isLoading || effectiveHalt}
          onClick={() => handleStageClick(Stage)}
          sx={Stage.buttonSx}
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

      {/* ✅ Sidebar reserved fixed width for icons, View left‑justified, NextMonth to its right */}
      <Stack
        direction="row"
        alignItems="center"
        spacing={1}
        sx={{ width: `${sidebarWidth}px`, justifyContent: "flex-start" }}  // ✅ left‑justified
      >
        {/* ✅ Report visibility trigger (always left) */}
        <Tooltip title={Stage.tooltipReports || UI_STRINGS.NO_REPORTS} arrow>
          <span>
            <IconButton
              onClick={() => handleOpenReport(Stage.stageNo)}
              disabled={!Stage.canViewReports}
              color="primary"
              size="small"
            >
              <Visibility />
            </IconButton>
          </span>
        </Tooltip>

        {/* ✅ Next Month trigger appears only at halt stage, immediately right of View */}
        {Stage.stageNo === haltStageNo && effectiveHalt && !isSimulationEnd && (
          <Tooltip title={UI_STRINGS.NEXT_MONTH_TOOLTIP} arrow>
            <span>
              <IconButton
                onClick={handleNextMonth}
                size="medium"
                sx={{
                  bgcolor: "#ff9800",
                  color: "#fff",
                  border: "2px solid #fff",
                  borderRadius: "50%",   // ✅ circular shape
                  width: 44,
                  height: 44,
                  boxShadow: "0 6px 16px rgba(0,0,0,0.3)", // ✅ raised look
                  animation: "pulse 0.9s infinite",        // ✅ faster pulse
                  "@keyframes pulse": {
                    "0%": { transform: "scale(0.9)", boxShadow: "0 0 0 0 rgba(255,152,0,0.7)" },
                    "50%": { transform: "scale(1.25)", boxShadow: "0 0 0 18px rgba(255,152,0,0)" }, // ✅ stronger scale + spread
                    "100%": { transform: "scale(0.9)", boxShadow: "0 0 0 0 rgba(255,152,0,0)" }
                  },
                  "&:hover": {
                    bgcolor: "#fb8c00",
                    transform: "scale(1.3)",               // ✅ stronger hover lift
                    boxShadow: "0 10px 24px rgba(0,0,0,0.5)"
                  }
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
