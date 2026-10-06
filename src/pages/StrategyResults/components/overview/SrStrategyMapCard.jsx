/**
 * Component Name: SrStrategyMapCard
 * Module: StrategyResults
 * Purpose: Compact strategy map card with benefit, outcome and effect timeline.
 * Author/Version: UXLab / v1.0
 * AI Tags: strategy-map, strategy, benefit, outcome, timeline
 */

import React from "react";
import PropTypes from "prop-types";
import { Box, Chip, Divider, Typography } from "@mui/material";
import {
  CheckCircleOutline,
  FlagOutlined,
  GroupsOutlined,
  HandshakeOutlined,
  LayersOutlined,
  SettingsOutlined,
} from "@mui/icons-material";
import { cardStyle, colors, masterTypo } from "../../../../ux/styles";
import { fmtCost, fmtDate, fmtPct } from "../../utils/srFormat";

const ENABLER_CONFIG = {
  Leadership: {
    color: colors.primary,
    icon: <FlagOutlined />,
  },
  People: {
    color: colors.accentIndigo,
    icon: <GroupsOutlined />,
  },
  Processes: {
    color: colors.accentBlue,
    icon: <SettingsOutlined />,
  },
  Partnerships: {
    color: colors.accentTeal,
    icon: <HandshakeOutlined />,
  },
  Products: {
    color: colors.accentOrange,
    icon: <LayersOutlined />,
  },
};

const DEFAULT_ENABLER = {
  color: colors.primary,
  icon: <FlagOutlined />,
};

const isSelectedDecision = (plan) => {
  const value = String(
    plan?.decision ??
      plan?.choice ??
      plan?.selected ??
      ""
  )
    .trim()
    .toLowerCase();

  return [
    "y",
    "yes",
    "1",
    "true",
    "selected",
    "implement",
    "implemented",
    "accept",
    "accepted",
  ].includes(value);
};

const formatBudget = (budget) => {
  if (!budget || typeof budget !== "object") return "—";

  const entries = Object.entries(budget);

  if (!entries.length) return "—";

  return entries
    .map(([currency, amount]) => {
      const value = Number(amount);

      if (!Number.isFinite(value)) {
        return `${currency} —`;
      }

      return `${currency} ${fmtCost(value)}`;
    })
    .join(" / ");
};

const InfoItem = ({ label, value }) => (
  <Box sx={{ minWidth: 0 }}>
    <Typography
      sx={{
        ...masterTypo.caption,
        color: colors.subtitle,
        fontWeight: 600,
        lineHeight: 1.2,
      }}
    >
      {label}
    </Typography>

    <Typography
      sx={{
        ...masterTypo.bodyB1,
        color: colors.title,
        fontWeight: 700,
        mt: 0.25,
        overflow: "hidden",
        textOverflow: "ellipsis",
        whiteSpace: "nowrap",
      }}
    >
      {value || "—"}
    </Typography>
  </Box>
);

InfoItem.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
};

export default function SrStrategyMapCard({ card }) {
  const plan = card?.plan || {};
  const selected = isSelectedDecision(plan);

  const enabler =
    plan?.mutualXGroup ||
    plan?.mutual_X_Group ||
    plan?.enabler ||
    plan?.businessEnabler ||
    "Leadership";

  const enablerConfig =
    ENABLER_CONFIG[enabler] || DEFAULT_ENABLER;

  const accent = enablerConfig.color;

  const strategyId =
    plan?.stratId ||
    plan?.strategyId ||
    plan?.Strategy_Id ||
    card?.id ||
    "—";

  const strategy =
    plan?.strategy ||
    plan?.Strategy ||
    card?.strategy ||
    "—";

  const benefit =
    plan?.benefit ||
    plan?.Benefit ||
    "—";

  const outcome =
    plan?.resultant ||
    plan?.resultantOutcome ||
    plan?.outcome ||
    plan?.Resultant ||
    "—";

  const budget = formatBudget(card?.budget);

  const investDate =
    plan?.implDate ||
    plan?.implementDate ||
    plan?.Implement_Date;

  const investPeriod = investDate
    ? fmtDate(investDate)
    : "—";

  const capital =
    plan?.isCapital ??
    plan?.is_Capital ??
    plan?.Is_Capital;

  const capitalText =
    capital === true ||
    capital === 1 ||
    String(capital).toLowerCase() === "true"
      ? "Yes"
      : capital === false ||
        capital === 0 ||
        String(capital).toLowerCase() === "false"
        ? "No"
        : "—";

  const costType =
    plan?.costType ||
    plan?.cost_type ||
    plan?.Cost_Type ||
    "—";

  const gainValue =
    plan?.gainNorm ??
    plan?.gain_norm ??
    plan?.Gain_norm ??
    plan?.gain ??
    plan?.gainPct;

  const lossValue =
    plan?.lossNorm ??
    plan?.loss_norm ??
    plan?.Loss_norm ??
    plan?.loss ??
    plan?.lossPct;

  const effectValue = selected
    ? gainValue
    : lossValue;

  const effectText =
    effectValue !== undefined &&
    effectValue !== null &&
    effectValue !== ""
      ? `${selected ? "+" : "-"}${fmtPct(
          Math.abs(Number(effectValue))
        )}`
      : "—";

  const fromMonthNo = Number(
    plan?.fromMon ??
      plan?.fromMonthNo ??
      plan?.From_Month_No ??
      0
  );

  const duration = Number(
    plan?.dur ??
      plan?.duration ??
      plan?.Duration_Month ??
      0
  );

  // Simulation period is 12 months; effect timeline is fixed at 24 months.
  const scaleMonths = 24;

  const safeFromMonth = Number.isFinite(fromMonthNo)
    ? Math.max(fromMonthNo, 0)
    : 0;

  const safeDuration = Number.isFinite(duration)
    ? Math.max(duration, 0)
    : 0;

  const endMonth =
    safeFromMonth + safeDuration;

  const startPct = Math.min(
    (safeFromMonth / scaleMonths) * 100,
    100
  );

  const widthPct = Math.min(
    (safeDuration / scaleMonths) * 100,
    100 - startPct
  );

  const hasEffectWindow =
    safeFromMonth > 0 || safeDuration > 0;

  return (
    <Box
      sx={{
        ...cardStyle.primary,
        minWidth: 0,
        overflow: "hidden",
        borderLeft: `4px solid ${accent}`,
        background: colors.card,
        p: 1.75,
      }}
    >
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: {
            xs: "1fr",
            md: "minmax(220px, 1.15fr) minmax(0, 1.55fr) minmax(360px, 2fr)",
          },
          gap: {
            xs: 1.5,
            md: 2,
          },
          alignItems: "center",
        }}
      >
        {/* Strategy */}
        <Box sx={{ minWidth: 0 }}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: 1,
            }}
          >
            <Chip
              label={strategyId}
              size="small"
              sx={{
                height: 25,
                borderRadius: 1.5,
                backgroundColor: `${accent}18`,
                color: accent,
                fontWeight: 800,
                "& .MuiChip-label": {
                  px: 1,
                },
              }}
            />

            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 0.4,
                color: selected
                  ? colors.success
                  : colors.subtitle,
                flexShrink: 0,
              }}
            >
              <CheckCircleOutline sx={{ fontSize: 17 }} />

              <Typography
                sx={{
                  ...masterTypo.caption,
                  fontWeight: 700,
                }}
              >
                Implement
              </Typography>
            </Box>
          </Box>

          <Typography
            sx={{
              ...masterTypo.cardH5,
              color: colors.title,
              fontWeight: 700,
              mt: 0.9,
              lineHeight: 1.25,
            }}
          >
            {strategy}
          </Typography>

          <Chip
            icon={React.cloneElement(
              enablerConfig.icon,
              { sx: { fontSize: 16 } }
            )}
            label={enabler}
            size="small"
            sx={{
              mt: 1,
              height: 26,
              borderRadius: 1.5,
              backgroundColor: `${accent}12`,
              color: accent,
              fontWeight: 700,
              "& .MuiChip-icon": {
                color: accent,
                ml: 0.75,
              },
              "& .MuiChip-label": {
                px: 1,
              },
            }}
          />
        </Box>

        {/* Benefit → Outcome */}
        <Box
          sx={{
            minWidth: 0,
            px: {
              xs: 0,
              md: 1,
            },
            py: {
              xs: 0,
              md: 0.25,
            },
          }}
        >
          <Typography
            sx={{
              ...masterTypo.caption,
              color: colors.subtitle,
              fontWeight: 700,
              mb: 0.5,
            }}
          >
            Benefit → Outcome
          </Typography>

          <Box sx={{ minWidth: 0 }}>
            <Typography
              sx={{
                ...masterTypo.bodyB1,
                color: colors.title,
                fontWeight: 700,
                lineHeight: 1.4,
              }}
            >
              {benefit}
            </Typography>

            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1,
                mt: 0.25,
                minWidth: 0,
              }}
            >
              <Typography
                sx={{
                  ...masterTypo.bodyB1,
                  color: colors.title,
                  fontWeight: 700,
                  lineHeight: 1.4,
                  minWidth: 0,
                }}
              >
                → {outcome}
              </Typography>

              <Typography
                sx={{
                  ...masterTypo.bodyB1,
                  color: selected
                    ? colors.success
                    : colors.warning,
                  fontWeight: 800,
                  whiteSpace: "nowrap",
                  flexShrink: 0,
                }}
              >
                {effectText}
              </Typography>
            </Box>
          </Box>
        </Box>

        {/* Investment */}
        <Box
          sx={{
            minWidth: 0,
            borderLeft: {
              xs: "none",
              md: `1px solid ${colors.border}`,
            },
            borderTop: {
              xs: `1px solid ${colors.border}`,
              md: "none",
            },
            pt: {
              xs: 1.25,
              md: 0,
            },
            pl: {
              xs: 0,
              md: 2,
            },
          }}
        >
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns:
                "repeat(4, minmax(0, 1fr))",
              gap: 1.25,
            }}
          >
            <InfoItem
              label="Budget"
              value={budget}
            />

            <InfoItem
              label="Invest Period"
              value={investPeriod}
            />

            <InfoItem
              label="Capital"
              value={capitalText}
            />

            <InfoItem
              label="Cost Type"
              value={costType}
            />
          </Box>
        </Box>
      </Box>

      {hasEffectWindow && (
        <>
          <Divider
            sx={{
              mt: 1.5,
              borderColor: colors.border,
            }}
          />

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

            <Typography
              sx={{
                ...masterTypo.caption,
                color: colors.subtitle,
                mt: 0.5,
              }}
            >
              Effect window: Month {safeFromMonth} →{" "}
              {endMonth} ({safeDuration} mo)
            </Typography>
          </Box>
        </>
      )}
    </Box>
  );
}

SrStrategyMapCard.propTypes = {
  card: PropTypes.shape({
    id: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
    ]),
    strategy: PropTypes.string,
    budget: PropTypes.object,
    plan: PropTypes.object,
  }),
};