// ============================================================
// TeamBadgeCard.jsx
// OpsMgt UXLab V2.0
// Purpose : Compact Team Identity Badge
// ============================================================

import React from "react";
import PropTypes from "prop-types";

import {
  Avatar,
  Box,
  Chip,
  Paper,
  Stack,
  Typography,
} from "@mui/material";

import {
  cardStyle,
  colors,
  masterTypo,
} from "../../../ux/styles";

const STATUS_MAP = {
  Active: colors.success,
  Pending: colors.warning,
  Inactive: colors.muted,
  Completed: colors.primary,
};

export default function TeamBadgeCard({
  batch,
  team,
  status = "Active",
}) {
  const statusColor = STATUS_MAP[status] || STATUS_MAP.Active;
  const monogram = team ? team.trim().charAt(0).toUpperCase() : "T";

  return (
    <Paper
      elevation={0}
      sx={{
        ...cardStyle.primary,
        px: 2.25,
        py: 1.0,
      }}
    >
      <Stack direction="row" alignItems="center" spacing={1.5}>
        <Avatar
          sx={{
            width: 38,
            height: 38,
            bgcolor: colors.panel,
            color: colors.primary,
            fontWeight: 800,
            fontSize: "0.95rem",
            border: `1.5px solid ${colors.border}`,
          }}
        >
          {monogram}
        </Avatar>

        <Box sx={{ minWidth: 0, flexGrow: 1, textAlign: "center" }}>
          <Typography
            sx={{
              ...masterTypo.h4,
              fontWeight: 800,
              color: colors.title,
              lineHeight: 1.0,
            }}
            noWrap
            title={team}
          >
            {team}
          </Typography>
          <Typography
            sx={{
              ...masterTypo.caption,
              color: colors.subtitle,
              lineHeight: 1.2,
            }}
          >
            Batch {batch}
          </Typography>
        </Box>

        <Chip
          size="small"
          label={status}
          icon={
            <Box
              sx={{
                width: 7,
                height: 7,
                borderRadius: "50%",
                bgcolor: statusColor,
                ml: "8px !important",
              }}
            />
          }
          sx={{
            ...masterTypo.caption,
            fontWeight: 700,
            borderRadius: "999px",
            bgcolor: colors.panel,
            color: colors.title,
            flexShrink: 0,
            "& .MuiChip-icon": { order: -1 },
          }}
        />
      </Stack>
    </Paper>
  );
}

TeamBadgeCard.propTypes = {
  batch: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string,
  ]),
  team: PropTypes.string,
  status: PropTypes.oneOf(["Active", "Pending", "Inactive", "Completed"]),
};