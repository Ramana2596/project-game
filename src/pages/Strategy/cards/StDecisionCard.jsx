/**
 * Component Name : StDecisionCard
 * Module         : Strategy
 * Purpose        : Single strategy decision unit. Renders as a checkbox
 *                   card (independent strategy) or a radio card (member
 *                   of a mutual-exclusion group), with an investment
 *                   timeline bar and gain/loss visual. Purely
 *                   presentational — selection logic lives in the hook.
 * Author/Version : OpsMgt UX Lab / v1.0
 * AI Tags        : strategy, card, decision, mutual-exclusion, timeline, gain-loss
 */

// --------------------------------------------------------------
// Imports
// --------------------------------------------------------------
import React from "react";
import PropTypes from "prop-types";
import { Box, Chip, Stack, Typography } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import RadioButtonCheckedIcon from "@mui/icons-material/RadioButtonChecked";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import FlagOutlinedIcon from "@mui/icons-material/FlagOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import GroupsOutlinedIcon from "@mui/icons-material/GroupsOutlined";
import InsightsOutlinedIcon from "@mui/icons-material/InsightsOutlined";
import HandshakeOutlinedIcon from "@mui/icons-material/HandshakeOutlined";
import LayersOutlinedIcon from "@mui/icons-material/LayersOutlined";
import TrendingUpOutlinedIcon from "@mui/icons-material/TrendingUpOutlined";
import TrendingDownOutlinedIcon from "@mui/icons-material/TrendingDownOutlined";
import { cardStyle, colors, semanticTypo } from "../../../styles/ux";
import { BUSINESS_ENABLER, CURRENCY_CODE } from "../constants/constants";

// --------------------------------------------------------------
// Constants
// --------------------------------------------------------------
// Maps constants.js icon keys (BUSINESS_ENABLER) to MUI icon components.
const ENABLER_ICON_MAP = {
  FlagOutlined: FlagOutlinedIcon,
  SettingsOutlined: SettingsOutlinedIcon,
  GroupsOutlined: GroupsOutlinedIcon,
  InsightsOutlined: InsightsOutlinedIcon,
  HandshakeOutlined: HandshakeOutlinedIcon,
  LayersOutlined: LayersOutlinedIcon,
};

// Formats an ISO date string as "Apr 01, 2026" for display.
const formatDate = (isoDate) =>
  new Date(isoDate).toLocaleDateString("en-US", { month: "short", day: "2-digit", year: "numeric" });

/**
 * StDecisionCard
 * @param {object}  strategy    - one roster row
 * @param {string}  decision    - "YES" | "NO"
 * @param {boolean} isGrouped   - true when part of a mutual-exclusion group (radio)
 * @param {function} onToggle   - (strategyId) => void, used for independent cards
 * @param {function} onSelect   - (strategyId) => void, used for grouped cards
 */
const StDecisionCard = ({ strategy, decision, isGrouped, onToggle, onSelect }) => {
  // ------------------------------------------------------------
  // Derived Values
  // ------------------------------------------------------------
  const enabler = BUSINESS_ENABLER[strategy.businessEnabler] || BUSINESS_ENABLER.LEADERSHIP;
  const accent = colors[enabler.colorToken] || colors.primary;
  const EnablerIcon = ENABLER_ICON_MAP[enabler.icon] || FlagOutlinedIcon;
  const isSelected = decision === "YES";
  const hasLoss = strategy.lossPct > 0;

  // Timeline bar: position/width of the effect window inside a fixed
  // 24-month scale, so From-Month + Duration read as a Gantt segment.
  const scaleMonths = 24;
  const startPct = Math.min((strategy.fromMonthNo / scaleMonths) * 100, 100);
  const widthPct = Math.min((strategy.duration / scaleMonths) * 100, 100 - startPct);

  // ------------------------------------------------------------
  // Event Handlers
  // ------------------------------------------------------------
  const handleClick = () => {
    if (isGrouped) onSelect(strategy.strategyId);
    else onToggle(strategy.strategyId);
  };

  // ------------------------------------------------------------
  // Render
  // ------------------------------------------------------------
  return (
    <Box
      onClick={handleClick}
      sx={{
        ...cardStyle.primary,
        cursor: "pointer",
        borderLeft: `4px solid ${isSelected ? accent : colors.border}`,
        background: isSelected ? `${accent}0A` : colors.card,
        p: 2.5,
      }}
    >
      <Stack direction="row" spacing={2} alignItems="flex-start">
        {/* Selection indicator — checkbox for independent, radio for grouped */}
        <Box sx={{ pt: 0.25, color: isSelected ? accent : colors.muted, flexShrink: 0 }}>
          {isGrouped ? (
            isSelected ? <RadioButtonCheckedIcon /> : <RadioButtonUncheckedIcon />
          ) : isSelected ? (
            <CheckCircleIcon />
          ) : (
            <CheckBoxOutlineBlankIcon />
          )}
        </Box>

        <Box sx={{ flex: 1, minWidth: 0 }}>
          {/* Title row — enabler icon, strategy name, ID chip, gain/loss trend */}
          <Stack
            direction={{ xs: "column", sm: "row" }}
            spacing={1}
            alignItems={{ sm: "center" }}
            justifyContent="space-between"
          >
            <Stack direction="row" spacing={1} alignItems="center">
              <Box
                sx={{
                  width: 30,
                  height: 30,
                  borderRadius: "50%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  background: `${accent}1A`,
                  color: accent,
                  flexShrink: 0,
                }}
              >
                <EnablerIcon sx={{ fontSize: 17 }} />
              </Box>
              <Typography sx={semanticTypo.cardH5}>{strategy.strategy}</Typography>
              <Chip
                label={strategy.strategyId}
                size="small"
                sx={{ fontWeight: 600, background: colors.panel, color: colors.subtitle }}
              />
            </Stack>

            <Stack direction="row" spacing={0.75} alignItems="center">
              <TrendingUpOutlinedIcon sx={{ fontSize: 16, color: colors.success }} />
              <Typography sx={{ ...semanticTypo.bodyB1, fontWeight: 700, color: colors.success }}>
                +{strategy.gainPct}%
              </Typography>
              {hasLoss && (
                <>
                  <TrendingDownOutlinedIcon sx={{ fontSize: 16, color: colors.error, ml: 1 }} />
                  <Typography sx={{ ...semanticTypo.bodyB1, fontWeight: 700, color: colors.error }}>
                    -{strategy.lossPct}%
                  </Typography>
                </>
              )}
            </Stack>
          </Stack>

          {/* Benefit + outcome */}
          <Typography sx={{ ...semanticTypo.bodyB2, mt: 0.75 }}>
            {strategy.benefit} → {strategy.outcome}
          </Typography>

          {/* Budget / invest period / cost type row */}
          <Stack direction="row" spacing={3} flexWrap="wrap" sx={{ mt: 1.5 }}>
            <Typography sx={semanticTypo.caption}>
              Budget:{" "}
              <Box component="span" sx={{ color: colors.title, fontWeight: 600 }}>
                {strategy.uom === "USD"
                  ? `${CURRENCY_CODE} ${strategy.budgetAmount.toLocaleString()}`
                  : `${strategy.budgetAmount}%`}
              </Box>
            </Typography>
            <Typography sx={semanticTypo.caption}>
              Invest Period:{" "}
              <Box component="span" sx={{ color: colors.title, fontWeight: 600 }}>
                {formatDate(strategy.investPeriod)}
              </Box>
            </Typography>
            <Typography sx={semanticTypo.caption}>
              Cost Type:{" "}
              <Box component="span" sx={{ color: colors.title, fontWeight: 600 }}>
                {strategy.costType}
              </Box>
            </Typography>
          </Stack>

          {/* Effect-window timeline bar (From Month + Duration) */}
          <Box sx={{ mt: 1.5 }}>
            <Box sx={{ position: "relative", height: 8, borderRadius: 4, background: colors.divider }}>
              <Box
                sx={{
                  position: "absolute",
                  left: `${startPct}%`,
                  width: `${widthPct}%`,
                  height: "100%",
                  borderRadius: 4,
                  background: accent,
                }}
              />
            </Box>
            <Typography sx={{ ...semanticTypo.caption, mt: 0.5 }}>
              Effect window: Month {strategy.fromMonthNo} → {strategy.fromMonthNo + strategy.duration} (
              {strategy.duration} mo)
            </Typography>
          </Box>
        </Box>
      </Stack>
    </Box>
  );
};

StDecisionCard.propTypes = {
  strategy: PropTypes.shape({
    strategyId: PropTypes.string.isRequired,
    strategy: PropTypes.string.isRequired,
    benefit: PropTypes.string.isRequired,
    businessEnabler: PropTypes.string.isRequired,
    costType: PropTypes.string,
    uom: PropTypes.string.isRequired,
    budgetAmount: PropTypes.number.isRequired,
    investPeriod: PropTypes.string.isRequired,
    outcome: PropTypes.string.isRequired,
    fromMonthNo: PropTypes.number.isRequired,
    duration: PropTypes.number.isRequired,
    gainPct: PropTypes.number.isRequired,
    lossPct: PropTypes.number.isRequired,
  }).isRequired,
  decision: PropTypes.oneOf(["YES", "NO"]).isRequired,
  isGrouped: PropTypes.bool,
  onToggle: PropTypes.func,
  onSelect: PropTypes.func,
};

StDecisionCard.defaultProps = {
  isGrouped: false,
  onToggle: () => {},
  onSelect: () => {},
};

export default StDecisionCard;