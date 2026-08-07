// ============================================================
// StageShow.jsx
// Stage Display Card
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
  AssessmentOutlined,
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
  const isOnHalt = Stage.status === "ON_HALT";

  const statusColor = isActive
    ? colors.primary
    : isCompleted
      ? colors.success
      : isOnHalt
        ? colors.warning
        : colors.muted;

  return (
    <Box
      sx={{
        ...cardStyle.primary,
        position: "relative",

        background: isActive
          ? "linear-gradient(90deg,#D9C8FF 0%,#E8DBFF 18%,#F8F5FF 35%,#FFFFFF 55%,#FFFFFF 100%)"
          : colors.paper,

        border: isActive
          ? `2px solid ${colors.primaryLight}`
          : `1px solid ${colors.border}`,

        boxShadow: isActive
          ? `0 10px 28px ${colors.primary}30`
          : cardStyle.primary.boxShadow,

        transform: isActive ? "scale(1.01)" : "none",
        transition: "all .25s ease",
      }}
    >

      {isActive && (
        <Box
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: 4,
            background: colors.heroGradient,
          }}
        />
      )}

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
              Processing / Simulation in Progress...
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
          py: 1.75,
          pl: 3,
          pr: 2.5,
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
          <Stack direction="row" spacing={2} alignItems="center">
            {/* Stage Icon Circle */}
            <Box
              sx={{
                width: 42,
                height: 42,
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
                "& svg": { fontSize: 22 },
              }}
            >
              {Stage.icon}
            </Box>

            {/* Stage Number */}
            <Typography
              sx={{
                fontSize: "1.55rem",
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
                  fontSize: "1.15rem",
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
                  fontSize: "0.90rem",
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
              border: `1px solid ${
                isActive ? colors.primaryLight : isOnHalt ? colors.warning : "transparent"
              }`,
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
                < AssessmentOutlined sx={{ fontSize: 22 }} />
              </IconButton>
            </span>
          </Tooltip>

          {/* Next Month Button */}
          {isOnHalt && !isSimulationEnd && (
            <Tooltip title={UI_STRINGS.NEXT_MONTH_TOOLTIP} arrow>
              <span>
                <IconButton
                  onClick={handleNextMonth}
                  sx={{
                    width: 42,
                    height: 42,
                    bgcolor: colors.warning,
                    color: colors.white,
                    animation: "nextMonthPulse 0.8s ease-in-out infinite",
                    "@keyframes nextMonthPulse": {
                      "0%, 100%": {
                        transform: "scale(1)",
                        boxShadow: `0 0 0 0 ${colors.warning}80`,
                      },
                      "50%": {
                        transform: "scale(1.15)",
                        boxShadow: `0 0 0 8px ${colors.warning}00`,
                      },
                    },
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
                  : isOnHalt
                    ? colors.warning
                    : colors.panel,
              color: isActive || isCompleted || isOnHalt ? colors.white : colors.muted,
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