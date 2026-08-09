/**
 * Component Name : StBudgetCard
 * Module         : Strategy
 * Purpose        : Sticky roll-up card showing selected strategy count
 *                   and total committed USD budget. Purely presentational.
 * Author/Version : OpsMgt UX Lab / v1.0
 * AI Tags        : strategy, card, budget, summary, decision-roll-up
 */

// --------------------------------------------------------------
// Imports
// --------------------------------------------------------------
import React from "react";
import PropTypes from "prop-types";
import { Box, Button, LinearProgress, Paper, Stack, Typography } from "@mui/material";
import SavingsOutlinedIcon from "@mui/icons-material/SavingsOutlined";
import { buttonStyle, colors, semanticTypo } from "../../../styles/ux";
import { CURRENCY_CODE } from "../constants/constants";

/**
 * StBudgetCard
 * @param {number}  selectedCount
 * @param {number}  totalCount
 * @param {number}  totalUsd
 * @param {function} onSave
 * @param {boolean} isSaving
 */
const StBudgetCard = ({ selectedCount, totalCount, totalUsd, onSave, isSaving }) => {
  // ------------------------------------------------------------
  // Derived Values
  // ------------------------------------------------------------
  const progressPct = totalCount ? Math.round((selectedCount / totalCount) * 100) : 0;

  // ------------------------------------------------------------
  // Render
  // ------------------------------------------------------------
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
      {/* Header — icon + title */}
      <Stack direction="row" spacing={1.5} alignItems="center">
        <SavingsOutlinedIcon />
        <Typography sx={{ ...semanticTypo.cardH4, color: colors.white }}>
          Investment Summary
        </Typography>
      </Stack>

      {/* Headline figure — total committed USD across YES-decided strategies */}
      <Typography sx={{ ...semanticTypo.heroH2, color: colors.white, mt: 2 }}>
        {CURRENCY_CODE} {totalUsd.toLocaleString()}
      </Typography>
      <Typography sx={{ ...semanticTypo.bodyB2, color: "rgba(255,255,255,0.85)" }}>
        Committed across {selectedCount} of {totalCount} strategies
      </Typography>

      {/* Selection-progress bar — selectedCount / totalCount */}
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

      {/* Commit action — persists decisions via the hook's onSave handler */}
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
  selectedCount: PropTypes.number.isRequired,
  totalCount: PropTypes.number.isRequired,
  totalUsd: PropTypes.number.isRequired,
  onSave: PropTypes.func.isRequired,
  isSaving: PropTypes.bool,
};

StBudgetCard.defaultProps = {
  isSaving: false,
};

export default StBudgetCard;