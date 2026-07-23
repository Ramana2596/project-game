// ============================================================
// StageShow.jsx
// OpsMgt UXLab V2.0
// High-Legibility Enterprise Stage Display Card
// ============================================================

import React from "react";

import {
  Box,
  Stack,
  Button,
  Tooltip,
  IconButton,
  Typography,
  CircularProgress,
  Chip,
} from "@mui/material";

import {
  PlayArrow,
  Check,
  Lock,
  Visibility,
  SkipNext,
} from "@mui/icons-material";

import { UI_STRINGS } from "../constants/labels";

import {
  buttonStyle,
  cardStyle,
  semanticTypo,
  colors,
} from "../../../ux/styles";

export default function StageShow({
  Stage,
  actionLoading,
  effectiveHalt,
  isSimulationEnd,
  haltStageNo,
  handleStageClick,
  handleOpenReport,
  handleNextMonth,
  isLoading,
}) {
  const isCompleted = Stage.status === "COMPLETED" || Stage.status === "FINISHED";
  const isActive = Stage.status === "ACTIVE";

  const statusColor = isActive
    ? colors.primary
    : isCompleted
      ? colors.success
      : colors.muted;

  return (
    <Box
      sx={{
        ...cardStyle.primary,
        position: "relative",
        borderColor: isActive ? colors.primary : colors.border,
        boxShadow: isActive 
          ? `0 8px 24px ${colors.primary}2E` 
          : cardStyle.primary.boxShadow,
      }}
    >
      {/* Accent Indicator Bar */}
      <Box
        sx={{
          position: "absolute",
          left: 0,
          top: 0,
          bottom: 0,
          width: 6,
          bgcolor: statusColor,
        }}
      />

      {/* Loading Overlay */}
      {isLoading && (
        <Box
          sx={{
            position: "absolute",
            inset: 0,
            zIndex: 5,
            bgcolor: "rgba(255, 255, 255, 0.88)",
            backdropFilter: "blur(4px)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Stack direction="row" spacing={1.5} alignItems="center">
            <CircularProgress size={24} sx={{ color: colors.primary }} />
            <Typography
              sx={{
                ...semanticTypo.bodyB1,
                fontSize: "1rem",
                color: colors.primary,
                fontWeight: 700,
              }}
            >
              Updating Stage...
            </Typography>
          </Stack>
        </Box>
      )}

      {/* Main Content Row */}
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        sx={{
          py: 2.5,
          pl: 3.5,
          pr: 3,
        }}
      >
        {/* Interactive Click Area */}
        <Button
          disableRipple
          disabled={!Stage.isActive || isLoading || effectiveHalt}
          onClick={() => handleStageClick(Stage)}
          sx={{
            ...buttonStyle.text,
            p: 0,
            flex: 1,
            justifyContent: "flex-start",
            textAlign: "left",
            textTransform: "none",
            "&:hover": {
              bgcolor: "transparent",
            },
          }}
        >
          <Stack direction="row" spacing={3} alignItems="center">
            {/* Stage Icon Circle */}
            <Box
              sx={{
                width: 48,
                height: 48,
                borderRadius: "50%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexShrink: 0,
                background: isActive || isCompleted
                  ? colors.iconGradient
                  : colors.disabledBackground,
                color: isActive || isCompleted ? colors.white : colors.muted,
                boxShadow: isActive ? `0 4px 14px ${colors.primary}40` : "none",
                "& svg": { fontSize: 26 },
              }}
            >
              {Stage.icon}
            </Box>

            {/* Stage Number */}
            <Typography
              sx={{
                fontSize: "1.75rem",
                fontWeight: 800,
                color: statusColor,
                minWidth: 32,
                lineHeight: 1,
              }}
            >
              {Stage.stageNo}
            </Typography>

            {/* Titles & Descriptions */}
            <Box sx={{ pr: 2 }}>
              <Typography
                sx={{
                  fontSize: "1.25rem",
                  fontWeight: 700,
                  color: colors.title,
                  lineHeight: 1.3,
                  mb: 0.5,
                }}
              >
                {Stage.label}
              </Typography>

              <Typography
                sx={{
                  fontSize: "0.95rem",
                  color: Stage.toDo ? colors.body : colors.muted,
                  lineHeight: 1.4,
                }}
              >
                {Stage.toDo || "Yet to define"}
              </Typography>
            </Box>
          </Stack>
        </Button>

        {/* Action Controls & Badges */}
        <Stack direction="row" spacing={2} alignItems="center">
          {/* Status Badge */}
          <Chip
            size="medium"
            label={Stage.status}
            sx={{
              height: 32,
              px: 1.5,
              fontSize: "0.85rem",
              fontWeight: 700,
              borderRadius: "999px",
              color: isActive
                ? colors.primary
                : isCompleted
                  ? colors.success
                  : colors.muted,
              bgcolor: isActive
                ? colors.selected
                : isCompleted
                  ? "#E8F5E9"
                  : colors.panel,
              border: `1px solid ${isActive ? colors.primaryLight : "transparent"}`,
            }}
          />

          {/* View Reports Button */}
          <Tooltip title={Stage.tooltipReports || "No Reports"} arrow>
            <span>
              <IconButton
                onClick={() => handleOpenReport(Stage.stageNo)}
                disabled={!Stage.canViewReports}
                sx={{
                  width: 42,
                  height: 42,
                  border: `1px solid ${colors.border}`,
                  bgcolor: colors.paper,
                  color: colors.primary,
                  "&:hover": {
                    bgcolor: colors.primary,
                    color: colors.white,
                    borderColor: colors.primary,
                  },
                  "&.Mui-disabled": {
                    bgcolor: colors.paper,
                    color: colors.disabledText,
                    borderColor: colors.border,
                  },
                }}
              >
                <Visibility sx={{ fontSize: 22 }} />
              </IconButton>
            </span>
          </Tooltip>

          {/* Next Month Button */}
          {Stage.stageNo === haltStageNo && effectiveHalt && !isSimulationEnd && (
            <Tooltip title={UI_STRINGS.NEXT_MONTH_TOOLTIP} arrow>
              <span>
                <IconButton
                  onClick={handleNextMonth}
                  sx={{
                    width: 42,
                    height: 42,
                    bgcolor: colors.warning,
                    color: colors.white,
                    "&:hover": {
                      bgcolor: "#D97706",
                    },
                  }}
                >
                  <SkipNext sx={{ fontSize: 24 }} />
                </IconButton>
              </span>
            </Tooltip>
          )}

          {/* Status Icon Indicator */}
          <Box
            sx={{
              width: 42,
              height: 42,
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              bgcolor: isActive
                ? colors.primary
                : isCompleted
                  ? colors.success
                  : colors.panel,
              color: isActive || isCompleted ? colors.white : colors.muted,
            }}
          >
            {isActive && <PlayArrow sx={{ fontSize: 24 }} />}
            {isCompleted && <Check sx={{ fontSize: 24 }} />}
            {Stage.status === "LOCKED" && <Lock sx={{ fontSize: 22 }} />}
          </Box>
        </Stack>
      </Stack>
    </Box>
  );
}