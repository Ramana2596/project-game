
// Component: StDecisionCard — single strategy decision card
// Purpose: render independent (checkbox) or grouped (radio) strategy with visuals
// Author/Version: OpsMgt UX Lab / v1.1

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

import { cardStyle, colors, masterTypo } from "../../../ux/styles";
import { BUSINESS_ENABLER } from "../constants/constants";

// Map BUSINESS_ENABLER icon keys to MUI icons
const ENABLER_ICON_MAP = {
  FlagOutlined: FlagOutlinedIcon,
  SettingsOutlined: SettingsOutlinedIcon,
  GroupsOutlined: GroupsOutlinedIcon,
  InsightsOutlined: InsightsOutlinedIcon,
  HandshakeOutlined: HandshakeOutlinedIcon,
  LayersOutlined: LayersOutlinedIcon,
};

// Safe date formatter
const formatDate = (isoDate) =>
  isoDate
    ? new Date(isoDate).toLocaleDateString("en-US", {
        month: "short",
        year: "numeric",
      })
    : "—";

const StDecisionCard = ({
  strategy,
  decision,
  isGrouped,
  onToggle,
  onSelect,
}) => {
  const enabler =
    BUSINESS_ENABLER[strategy.businessEnabler] || BUSINESS_ENABLER.Leadership;
  const accent = colors[enabler.colorToken] || colors.primary;
  const EnablerIcon =
    ENABLER_ICON_MAP[enabler.icon] || FlagOutlinedIcon;
  const isSelected = decision === "YES";
  const hasLoss = (strategy.lossPct ?? 0) > 0;

  const scaleMonths = 24;
  const startPct = Math.min(
    ((strategy.fromMonthNo ?? 0) / scaleMonths) * 100,
    100
  );
  const widthPct = Math.min(
    ((strategy.duration ?? 0) / scaleMonths) * 100,
    100 - startPct
  );

  const handleClick = () => {
    if (isGrouped) onSelect(strategy.strategyId);
    else onToggle(strategy.strategyId);
  };

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
      {/* UX: Strategy selection and visual identity */}
      <Stack direction="row" spacing={2} alignItems="flex-start">
        <Box
          sx={{
            pt: 0.25,
            color: isSelected ? accent : colors.muted,
            flexShrink: 0,
          }}
        >
          {isGrouped ? (
            isSelected ? (
              <RadioButtonCheckedIcon />
            ) : (
              <RadioButtonUncheckedIcon />
            )
          ) : isSelected ? (
            <CheckCircleIcon />
          ) : (
            <CheckBoxOutlineBlankIcon />
          )}
        </Box>

        <Box sx={{ flex: 1, minWidth: 0 }}>
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

              <Typography sx={masterTypo.h5}>
                {strategy.strategy}
              </Typography>

              <Chip
                label={strategy.strategyId}
                size="small"
                sx={{
                  fontWeight: 600,
                  background: colors.panel,
                  color: colors.subtitle,
                }}
              />
            </Stack>

            {/* UX: Strategy benefit, outcome, and Resultants */}
            <Stack direction="row" spacing={0.75} alignItems="center">
              <TrendingUpOutlinedIcon
                sx={{ fontSize: 16, color: colors.success }}
              />

              <Typography
                sx={{
                  ...masterTypo.body1,
                  fontWeight: 700,
                  color: colors.success,
                }}
              >
                +{strategy.gainPct ?? 0}%
              </Typography>

              {hasLoss && (
                <>
                  <TrendingDownOutlinedIcon
                    sx={{
                      fontSize: 16,
                      color: colors.error,
                      ml: 1,
                    }}
                  />

                  <Typography
                    sx={{
                      ...masterTypo.body1,
                      fontWeight: 700,
                      color: colors.error,
                    }}
                  >
                    -{strategy.lossPct ?? 0}%
                  </Typography>
                </>
              )}
            </Stack>
          </Stack>

          <Typography sx={{ ...masterTypo.body2, mt: 0.75 }}>
            {strategy.benefit} → {strategy.outcome}
          </Typography>

          {/* UX: Investment, Investment Period, and cost information */}
          <Stack
            direction="row"
            spacing={3}
            flexWrap="wrap"
            sx={{ mt: 1.5 }}
          >
            <Typography sx={masterTypo.caption}>
              Budget:{" "}
              <Box component="span" sx={{ color: colors.title, fontWeight: 600 }}>
                {strategy.uom} {Number(strategy.budgetAmount).toLocaleString()}
              </Box>
            </Typography>
            
            <Typography sx={masterTypo.caption}>
              Invest Period:{" "}
              <Box
                component="span"
                sx={{ color: colors.title, fontWeight: 600 }}
              >
                {formatDate(strategy.investPeriod)}
              </Box>
            </Typography>

            <Typography sx={masterTypo.caption}>
              Cost Type:{" "}
              <Box
                component="span"
                sx={{ color: colors.title, fontWeight: 600 }}
              >
                {strategy.costType || "—"}
              </Box>
            </Typography>
          </Stack>

          {/* UX: Strategy implementation timeline */}
          <Box sx={{ mt: 1.5 }}>
            <Box
              sx={{
                position: "relative",
                height: 8,
                borderRadius: 4,
                background: colors.divider,
              }}
            >
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

            <Typography sx={{ ...masterTypo.caption, mt: 0.5 }}>
              Effect window: Month {strategy.fromMonthNo ?? 0} →{" "}
              {(strategy.fromMonthNo ?? 0) + (strategy.duration ?? 0)} (
              {strategy.duration ?? 0} mo)
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
    budgetAmount: PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.string,
    ]).isRequired,
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
