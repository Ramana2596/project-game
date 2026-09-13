// Component: StBudgetCard — sticky roll-up card for strategy count and budget
// Purpose: present summary of selected strategies and committed USD
// Author/Version: OpsMgt UX Lab / v1.1

import React from "react";
import PropTypes from "prop-types";
import { Box, Button, LinearProgress, Paper, Stack, Typography } from "@mui/material";
import SavingsOutlinedIcon from "@mui/icons-material/SavingsOutlined";
import { buttonStyle, colors, masterTypo } from "../../../ux/styles";
import { CURRENCY_CODE } from "../constants/constants";

const StBudgetCard = ({
  selectedCount = 0,
  totalCount = 0,
  totalUsd = 0,
  onSave,
  isSaving = false,
}) => {
  // Derived — progress percentage
  const progressPct = totalCount ? Math.round((selectedCount / totalCount) * 100) : 0;

  // Render
  return (
    <Paper
      elevation={0}
      sx={{
        p: 3,
        borderRadius: 4,
        background: colors.heroGradient,
        color: colors.white,
        position: { md: "sticky" },
        top: { md: 16 },
      }}
    >
      {/* Header */}
      <Stack direction="row" spacing={1.5} alignItems="center">
        <SavingsOutlinedIcon />
        <Typography variant="h4" sx={{ color: colors.white }}>
          Investment Summary
        </Typography>
      </Stack>

      {/* Headline figure */}
      <Typography sx={{ ...masterTypo.h4, color: colors.white, mt: 2 }}>
        {CURRENCY_CODE} {totalUsd.toLocaleString()}
      </Typography>
      <Typography sx={{ ...masterTypo.body2, color: "rgba(255,255,255,0.85)" }}>
        Committed across {selectedCount} of {totalCount} strategies
      </Typography>

      {/* Progress bar */}
      <Box sx={{ mt: 2 }}>
        <LinearProgress
          variant="determinate"
          value={progressPct}
          sx={{
            height: 8,
            borderRadius: 4,
            background: "rgba(255,255,255,0.25)",
            "& .MuiLinearProgress-bar": { background: colors.white, borderRadius: 4 },
          }}
        />
      </Box>

      {/* Save button */}
      <Button
        fullWidth
        disabled={isSaving}
        onClick={onSave}
        sx={{
          ...buttonStyle.secondary,
          mt: 3,
          background: colors.white,
          color: colors.primary,
          border: "none",
          "&:hover": { background: "rgba(255,255,255,0.9)" },
        }}
      >
        {isSaving ? "Saving…" : "Save Decisions"}
      </Button>
    </Paper>
  );
};

StBudgetCard.propTypes = {
  selectedCount: PropTypes.number,
  totalCount: PropTypes.number,
  totalUsd: PropTypes.number,
  onSave: PropTypes.func.isRequired,
  isSaving: PropTypes.bool,
};

export default StBudgetCard;
