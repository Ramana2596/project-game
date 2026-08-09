/**
 * Component Name : StGroupList
 * Module         : Strategy
 * Purpose        : Renders the strategy roster as decision cards,
 *                   separating independent (checkbox) strategies from
 *                   mutual-exclusion groups (radio-select clusters with
 *                   a group label). Orchestration only — no business logic.
 * Author/Version : OpsMgt UX Lab / v1.0
 * AI Tags        : strategy, list, mutual-exclusion, group, decision-grid
 */

// --------------------------------------------------------------
// Imports
// --------------------------------------------------------------
import React from "react";
import PropTypes from "prop-types";
import { Box, Paper, Stack, Typography } from "@mui/material";
import LayersOutlinedIcon from "@mui/icons-material/LayersOutlined";
import StDecisionCard from "../cards/StDecisionCard";
import { MUTUAL_GROUP_LABEL } from "../constants/constants";
import { colors, semanticTypo } from "../../../styles/ux";

/**
 * StGroupList
 * @param {object}  groupedStrategies - { independent: [], groups: { A: [], B: [] } }
 * @param {object}  decisions         - { [strategyId]: "YES" | "NO" }
 * @param {function} onToggle
 * @param {function} onSelect
 */
const StGroupList = ({ groupedStrategies, decisions, onToggle, onSelect }) => {
  // ------------------------------------------------------------
  // Derived Values
  // ------------------------------------------------------------
  const { independent, groups } = groupedStrategies;
  const groupLetters = Object.keys(groups).sort();

  // ------------------------------------------------------------
  // Render
  // ------------------------------------------------------------
  return (
    <Stack spacing={3}>
      {/* Independent strategies — standalone checkboxes */}
      {independent.length > 0 && (
        <Stack spacing={2}>
          {independent.map((strategy) => (
            <StDecisionCard
              key={strategy.strategyId}
              strategy={strategy}
              decision={decisions[strategy.strategyId] || "NO"}
              isGrouped={false}
              onToggle={onToggle}
            />
          ))}
        </Stack>
      )}

      {/* Mutual-exclusion groups — radio-select clusters */}
      {groupLetters.map((letter) => (
        <Paper
          key={letter}
          elevation={0}
          sx={{
            p: 2,
            borderRadius: 4,
            background: colors.panel,
            border: `1px dashed ${colors.border}`,
          }}
        >
          <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 1.5, px: 1 }}>
            <LayersOutlinedIcon sx={{ fontSize: 18, color: colors.subtitle }} />
            <Typography sx={{ ...semanticTypo.bodyB2, fontWeight: 600 }}>
              {MUTUAL_GROUP_LABEL[letter] || `Choose one — Group ${letter}`}
            </Typography>
          </Stack>
          <Stack spacing={2}>
            {groups[letter].map((strategy) => (
              <StDecisionCard
                key={strategy.strategyId}
                strategy={strategy}
                decision={decisions[strategy.strategyId] || "NO"}
                isGrouped
                onSelect={(strategyId) => onSelect(letter, strategyId)}
              />
            ))}
          </Stack>
        </Paper>
      ))}

      {independent.length === 0 && groupLetters.length === 0 && (
        <Box sx={{ textAlign: "center", py: 6 }}>
          <Typography sx={semanticTypo.bodyB2}>
            No strategies match the current filter.
          </Typography>
        </Box>
      )}
    </Stack>
  );
};

StGroupList.propTypes = {
  groupedStrategies: PropTypes.shape({
    independent: PropTypes.array.isRequired,
    groups: PropTypes.object.isRequired,
  }).isRequired,
  decisions: PropTypes.object.isRequired,
  onToggle: PropTypes.func.isRequired,
  onSelect: PropTypes.func.isRequired,
};

export default StGroupList;