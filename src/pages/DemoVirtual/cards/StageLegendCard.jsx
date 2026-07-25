// Component: StageLegendCard | Module: Demo Virtual Simulation | Purpose: Display the visual legend used throughout the simulation workflow
import React from "react";
import { Avatar, Box, Paper, Stack, Typography } from "@mui/material";
import {
  PlayArrowRounded,
  CheckCircleRounded,
  AssessmentOutlined,
  DoubleArrowRounded,
  LockRounded,
} from "@mui/icons-material";
import { cardStyle, colors } from "../../../ux/styles";

export default function StageLegendCard() {
  return (
    <Paper elevation={0} sx={{ ...cardStyle.primary, p: 2.5, height: "auto" }}>
      {/* Render card title */}
      <Typography
        sx={{
          fontSize: "0.80rem",
          fontWeight: 800,
          letterSpacing: "0.05em",
          color: colors.subtitle,
          mb: 2,
          textTransform: "uppercase",
        }}
      >
        Stage Legend
      </Typography>

      <Stack spacing={2}>
        {/* Active Stage item */}
        <Stack direction="row" spacing={2} alignItems="center">
          <Avatar sx={{ width: 30, height: 30, bgcolor: colors.primary, color: colors.white }}>
            <PlayArrowRounded sx={{ fontSize: 18 }} />
          </Avatar>
          <Box>
            <Typography sx={{ fontSize: "0.90rem", fontWeight: 700, lineHeight: 1.2 }}>
              Active Stage
            </Typography>
            <Typography sx={{ fontSize: "0.80rem", color: colors.subtitle }}>
              Current stage in progress
            </Typography>
          </Box>
        </Stack>

        {/* Completed Stage item */}
        <Stack direction="row" spacing={2} alignItems="center">
          <Avatar sx={{ width: 30, height: 30, bgcolor: colors.success, color: colors.white }}>
            <CheckCircleRounded sx={{ fontSize: 18 }} />
          </Avatar>
          <Box>
            <Typography sx={{ fontSize: "0.90rem", fontWeight: 700, lineHeight: 1.2 }}>
              Completed Stage
            </Typography>
            <Typography sx={{ fontSize: "0.80rem", color: colors.subtitle }}>
              Successfully completed
            </Typography>
          </Box>
        </Stack>

        {/* View Reports item */}
        <Stack direction="row" spacing={2} alignItems="center">
          <Avatar sx={{ width: 30, height: 30, bgcolor: colors.info || "#0288d1", color: colors.white }}>
            <AssessmentOutlined sx={{ fontSize: 18 }} />
          </Avatar>
          <Box>
            <Typography sx={{ fontSize: "0.90rem", fontWeight: 700, lineHeight: 1.2 }}>
              View Reports
            </Typography>
            <Typography sx={{ fontSize: "0.80rem", color: colors.subtitle }}>
              Open reports and analytics
            </Typography>
          </Box>
        </Stack>

        {/* Next Month item */}
        <Stack direction="row" spacing={2} alignItems="center">
          <Avatar
            sx={{
              width: 30,
              height: 30,
              bgcolor: "#f57c00",
              color: colors.white,
              boxShadow: "0 0 8px rgba(245,124,0,0.40)",
            }}
          >
            <DoubleArrowRounded
              sx={{
                fontSize: 18,
                animation: "pulseShift 1.5s infinite ease-in-out",
                "@keyframes pulseShift": {
                  "0%,100%": { transform: "translateX(0)" },
                  "50%": { transform: "translateX(3px)" },
                },
              }}
            />
          </Avatar>
          <Box>
            <Typography sx={{ fontSize: "0.90rem", fontWeight: 700, lineHeight: 1.2, color: "#e65100" }}>
              Next Month
            </Typography>
            <Typography sx={{ fontSize: "0.80rem", color: colors.subtitle }}>
              Advance / loop to Stage 4
            </Typography>
          </Box>
        </Stack>

        {/* Locked Stage item */}
        <Stack direction="row" spacing={2} alignItems="center">
          <Avatar sx={{ width: 30, height: 30, bgcolor: colors.disabledText, color: colors.white }}>
            <LockRounded sx={{ fontSize: 16 }} />
          </Avatar>
          <Box>
            <Typography sx={{ fontSize: "0.90rem", fontWeight: 700, lineHeight: 1.2 }}>
              Locked Stage
            </Typography>
            <Typography sx={{ fontSize: "0.80rem", color: colors.subtitle }}>
              Not yet available
            </Typography>
          </Box>
        </Stack>
      </Stack>
    </Paper>
  );
}