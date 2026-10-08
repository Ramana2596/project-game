// Component: FaInsights
// Module: AnnualReport
// Purpose: Render six compact financial insights from core financial ratios
// Author/Version: OpsMgt UXLab V1.3
// AI Tags: annual-report, insights, financial-analysis, ratios, uxlab

import React, { useMemo } from "react";
import { Box, Typography } from "@mui/material";
import TrendingUpOutlinedIcon from "@mui/icons-material/TrendingUpOutlined";
import TrendingDownOutlinedIcon from "@mui/icons-material/TrendingDownOutlined";
import TrendingFlatOutlinedIcon from "@mui/icons-material/TrendingFlatOutlined";
import LightbulbOutlinedIcon from "@mui/icons-material/LightbulbOutlined";
import { cardStyle, colors, masterTypo } from "../../../ux/styles";

// Define the executive ratios and their business-specific observations.
const INSIGHT_DEFINITIONS = [
  {
    key: "revenueGrowth",
    label: "Revenue Growth",
    unit: "%",
    positive: "Sales momentum is improving.",
    negative: "Sales momentum is declining.",
    stable: "Sales momentum is steady.",
  },
  {
    key: "grossMargin",
    label: "Gross Margin",
    unit: "%",
    positive: "Cost of sales is under control.",
    negative: "Cost of sales is under pressure.",
    stable: "Cost of sales is steady.",
  },
  {
    key: "ebitMargin",
    label: "EBIT Margin",
    unit: "%",
    positive: "Operating costs are under control.",
    negative: "Operating costs are under pressure.",
    stable: "Operating costs are steady.",
  },
  {
    key: "netMargin",
    label: "Net Margin",
    unit: "%",
    positive: "Administrative costs are under control.",
    negative: "Administrative costs are under pressure.",
    stable: "Administrative costs are steady.",
  },
  {
    key: "roe",
    label: "ROE",
    unit: "%",
    positive: "Returns on equity are improving.",
    negative: "Returns on equity are declining.",
    stable: "Returns on equity are steady.",
  },
  {
    key: "debtEquity",
    label: "Debt / Equity",
    unit: "x",
    inverse: true,
    positive: "Leverage is improving.",
    negative: "Leverage is increasing.",
    stable: "Leverage is steady.",
  },
];

// Format the ratio value for compact management display.
const formatValue = (value, unit) => {
  if (
    value === null ||
    value === undefined ||
    !Number.isFinite(Number(value))
  ) {
    return "—";
  }

  const number = Number(value);

  if (unit === "%") {
    return `${number.toFixed(1)}%`;
  }

  if (unit === "x") {
    return `${number.toFixed(2)}x`;
  }

  return number.toLocaleString();
};

// Map the actual movement to improving, declining, or stable.
const getDirection = (current, previous, inverse = false) => {
  if (
    current === null ||
    current === undefined ||
    !Number.isFinite(Number(current)) ||
    previous === null ||
    previous === undefined ||
    !Number.isFinite(Number(previous))
  ) {
    return "stable";
  }

  const difference = Number(current) - Number(previous);

  if (difference === 0) {
    return "stable";
  }

  if (inverse) {
    return difference < 0 ? "improving" : "declining";
  }

  return difference > 0 ? "improving" : "declining";
};

// Select the UXLab semantic color for the movement direction.
const getDirectionColor = (direction) => {
  if (direction === "improving") {
    return colors.success;
  }

  if (direction === "declining") {
    return colors.warning;
  }

  return colors.accentPurple;
};

// Select the corresponding movement icon.
const getDirectionIcon = (direction) => {
  if (direction === "improving") {
    return <TrendingUpOutlinedIcon />;
  }

  if (direction === "declining") {
    return <TrendingDownOutlinedIcon />;
  }

  return <TrendingFlatOutlinedIcon />;
};

// Return the short status label.
const getStatusLabel = (direction) => {
  if (direction === "improving") {
    return "Improving";
  }

  if (direction === "declining") {
    return "Attention";
  }

  return "Stable";
};

const FaInsights = ({
  latestRatios = {},
  previousRatios = {},
  loading = false,
}) => {
  // Build the six insight records from current and previous ratio values.
  const insights = useMemo(
    () =>
      INSIGHT_DEFINITIONS.map((definition) => {
        const current = latestRatios?.[definition.key];
        const previous = previousRatios?.[definition.key];

        if (
          current === null ||
          current === undefined ||
          !Number.isFinite(Number(current))
        ) {
          return null;
        }

        const direction = getDirection(
          current,
          previous,
          definition.inverse
        );

        const message =
          direction === "improving"
            ? definition.positive
            : direction === "declining"
              ? definition.negative
              : definition.stable;

        return {
          ...definition,
          direction,
          message,
          value: formatValue(current, definition.unit),
          color: getDirectionColor(direction),
        };
      }).filter(Boolean),
    [latestRatios, previousRatios]
  );

  // Render the compact section heading.
  const renderHeading = () => (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        gap: 0.7,
        mb: 0.75,
      }}
    >
      <LightbulbOutlinedIcon
        sx={{
          fontSize: 20,
          color: colors.primary,
        }}
      />
      <Typography
        sx={{
          ...masterTypo.h6,
          color: colors.title,
          fontWeight: 700,
        }}
      >
        Insight
      </Typography>
    </Box>
  );

  // Render the compact loading state.
  if (loading) {
    return (
      <Box sx={{ mx: 2, mb: 1.5 }}>
        {renderHeading()}
        <Box
          sx={{
            ...cardStyle.banner,
            minHeight: 56,
          }}
        >
          <Typography sx={{ ...masterTypo.caption, color: colors.body }}>
            Preparing financial performance insights
          </Typography>
        </Box>
      </Box>
    );
  }

  // Render the compact empty state.
  if (!insights.length) {
    return (
      <Box sx={{ mx: 2, mb: 1.5 }}>
        {renderHeading()}
        <Box
          sx={{
            ...cardStyle.banner,
            minHeight: 56,
          }}
        >
          <Typography sx={{ ...masterTypo.caption, color: colors.body }}>
            No analytical insights are available for the selected period.
          </Typography>
        </Box>
      </Box>
    );
  }

  // Render the insight heading and six compact cards.
  return (
    <Box sx={{ mx: 2, mb: 1.5 }}>
      {renderHeading()}

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: {
            xs: "repeat(2, minmax(0, 1fr))",
            sm: "repeat(3, minmax(0, 1fr))",
            lg: "repeat(6, minmax(0, 1fr))",
          },
          gap: 0.75,
        }}
      >
        {insights.map((insight) => (
          <Box
            key={insight.key}
            sx={{
              ...cardStyle.primary,
              minWidth: 0,
              px: 1,
              py: 1,
              borderTop: `3px solid ${insight.color}`,
            }}
          >
            {/* Metric header with movement icon and metric title. */}
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 0.65,
                minWidth: 0,
              }}
            >
              <Box
                sx={{
                  ...cardStyle.statIconCircle(insight.color),
                  width: 28,
                  height: 28,
                  minWidth: 28,
                  "& .MuiSvgIcon-root": {
                    fontSize: 16,
                    color: colors.onPrimary,
                  },
                }}
              >
                {getDirectionIcon(insight.direction)}
              </Box>

              <Typography
                noWrap
                sx={{
                  ...masterTypo.caption,
                  color: colors.title,
                  fontWeight: 700,
                  flex: 1,
                  minWidth: 0,
                }}
              >
                {insight.label}
              </Typography>
            </Box>

            {/* Display the actual financial ratio and movement status. */}
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 0.5,
                mt: 0.65,
                minWidth: 0,
              }}
            >
              <Typography
                noWrap
                sx={{
                  ...masterTypo.h6,
                  color: colors.title,
                  fontWeight: 700,
                  lineHeight: 1.1,
                }}
              >
                {insight.value}
              </Typography>

              <Box
                sx={{
                  ...cardStyle.badge(insight.color),
                  px: 0.55,
                  py: 0.2,
                  fontSize: "0.65rem",
                  lineHeight: 1.1,
                  whiteSpace: "nowrap",
                }}
              >
                {getStatusLabel(insight.direction)}
              </Box>
            </Box>

            {/* Display the business-specific interpretation of the movement. */}
            <Typography
              sx={{
                ...masterTypo.caption,
                color: colors.body,
                mt: 0.65,
                lineHeight: 1.25,
                minHeight: "2.5em",
              }}
            >
              {insight.message}
            </Typography>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default FaInsights;