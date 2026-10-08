
// Component: FaTrend
// Module: AnnualReport
// Purpose: Render a compact revenue growth trend with stacked period tiles
// Author/Version: OpsMgt UX Lab / v1.3
// AI Tags: annual-report, trend, revenue, growth, analytics, uxlab

import React, { useMemo } from "react";
import { Box, Typography } from "@mui/material";
import TrendingUpOutlinedIcon from "@mui/icons-material/TrendingUpOutlined";
import TrendingDownOutlinedIcon from "@mui/icons-material/TrendingDownOutlined";
import TrendingFlatOutlinedIcon from "@mui/icons-material/TrendingFlatOutlined";
import ShowChartOutlinedIcon from "@mui/icons-material/ShowChartOutlined";
import { cardStyle, colors, masterTypo } from "../../../ux/styles";

// Format ratio values for display.
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

  if (unit === "days") {
    return `${number.toFixed(0)}d`;
  }

  return number.toLocaleString();
};

// Format the actual revenue value.
const formatRevenue = (value) => {
  if (
    value === null ||
    value === undefined ||
    !Number.isFinite(Number(value))
  ) {
    return "—";
  }

  return Number(value).toLocaleString();
};

// Return the movement icon.
const getTrendIcon = (change) => {
  if (change > 0) {
    return <TrendingUpOutlinedIcon sx={{ fontSize: 13 }} />;
  }

  if (change < 0) {
    return <TrendingDownOutlinedIcon sx={{ fontSize: 13 }} />;
  }

  return <TrendingFlatOutlinedIcon sx={{ fontSize: 13 }} />;
};

// Return the semantic movement color.
const getMovementColor = (change) => {
  if (change > 0) {
    return colors.success;
  }

  if (change < 0) {
    return colors.error;
  }

  return colors.muted;
};

const FaTrend = ({
  series = [],
  revenueSeries = [],
  ratioKey = "revenueGrowth",
  ratioLabel = "Revenue Growth",
  unit = "%",
  loading = false,
}) => {
  // Build the selected ratio trend rows.
  const trendRows = useMemo(() => {
    if (!Array.isArray(series)) {
      return [];
    }

    return series.map((item, index) => {
      const value = Number(item?.ratios?.[ratioKey]);

      const previousValue =
        index > 0
          ? Number(series[index - 1]?.ratios?.[ratioKey])
          : NaN;

      const current = Number.isFinite(value)
        ? value
        : null;

      const previous = Number.isFinite(previousValue)
        ? previousValue
        : null;

      return {
        period: item?.period || "—",
        value: current,
        change:
          current !== null && previous !== null
            ? current - previous
            : null,
      };
    });
  }, [series, ratioKey]);

  // Create a direct period-to-revenue lookup.
  const revenueByPeriod = useMemo(() => {
    if (!Array.isArray(revenueSeries)) {
      return {};
    }

    return revenueSeries.reduce((result, item) => {
      if (item?.period) {
        result[item.period] = item.value;
      }

      return result;
    }, {});
  }, [revenueSeries]);

  // Render the trend card.
  return (
    <Box
      sx={{
        ...cardStyle.primary,
        mx: 2,
        mb: 2,
        p: 1.5,
        boxShadow: `0 2px 10px ${colors.primary}0F`,
      }}
    >
      {/* Trend card header */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 1.25,
          mb: 1.25,
        }}
      >
        <Box
          sx={{
            ...cardStyle.statIconCircle(colors.accentBlue),
            width: 36,
            height: 36,
            minWidth: 36,
            "& .MuiSvgIcon-root": {
              fontSize: 19,
              color: colors.onPrimary,
            },
          }}
        >
          {ratioKey === "revenueGrowth" ? (
            <TrendingUpOutlinedIcon />
          ) : (
            <ShowChartOutlinedIcon />
          )}
        </Box>

        <Typography
          sx={{
            ...masterTypo.h6,
            color: colors.title,
            fontWeight: 700,
            lineHeight: 1.15,
          }}
        >
          Revenue &amp; Growth Trend
        </Typography>
      </Box>

      {loading ? (
        <Typography
          sx={{
            ...masterTypo.body2,
            color: colors.muted,
            py: 1.5,
          }}
        >
          Loading trend
        </Typography>
      ) : trendRows.length === 0 ? (
        <Typography
          sx={{
            ...masterTypo.body2,
            color: colors.muted,
            py: 1.5,
          }}
        >
          No trend data available.
        </Typography>
      ) : (
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: {
              xs: "repeat(2, minmax(0, 1fr))",
              sm: "repeat(4, minmax(0, 1fr))",
              md: "repeat(6, minmax(0, 1fr))",
              lg: "repeat(10, minmax(0, 1fr))",
              xl: "repeat(12, minmax(0, 1fr))",
            },
            gap: 0.65,
          }}
        >
          {trendRows.map((row) => {
            const movementColor = getMovementColor(row.change);
            const hasChange = row.change !== null;

            return (
              <Box
                key={row.period}
                sx={{
                  minWidth: 0,
                  px: 0.8,
                  py: 0.85,
                  borderRadius: 1.5,
                  background: colors.panel,
                  border: `1px solid ${colors.divider}`,
                  textAlign: "center",
                }}
              >
                {/* Period label */}
                <Typography
                  noWrap
                  sx={{
                    ...masterTypo.caption,
                    color: colors.title,
                    fontWeight: 700,
                    lineHeight: 1.15,
                  }}
                >
                  {row.period}
                </Typography>

                {/* Actual achieved revenue */}
                <Typography
                  noWrap
                  sx={{
                    ...masterTypo.body2,
                    color: colors.title,
                    fontWeight: 700,
                    lineHeight: 1.2,
                    mt: 0.5,
                  }}
                >
                  USD {formatRevenue(
                    revenueByPeriod[row.period]
                  )}
                </Typography>

                {/* Growth chip */}
                <Box
                  sx={{
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: 0.2,
                    mt: 0.55,
                    px: 0.65,
                    py: 0.2,
                    borderRadius: 5,
                    backgroundColor: hasChange
                      ? `${movementColor}18`
                      : colors.divider,
                    color: hasChange
                      ? movementColor
                      : colors.muted,
                    border: `1px solid ${
                      hasChange
                        ? `${movementColor}35`
                        : colors.divider
                    }`,
                    maxWidth: "100%",
                  }}
                >
                  {hasChange && getTrendIcon(row.value)}

                  <Typography
                    noWrap
                    sx={{
                      ...masterTypo.caption,
                      color: "inherit",
                      fontWeight: 700,
                      lineHeight: 1.1,
                    }}
                  >
                    {formatValue(row.value, unit)}
                  </Typography>
                </Box>

                {/* Growth delta chip */}
                {hasChange && (
                  <Box
                    sx={{
                      display: "inline-flex",
                      alignItems: "center",
                      justifyContent: "center",
                      mt: 0.4,
                      px: 0.55,
                      py: 0.15,
                      borderRadius: 5,
                      backgroundColor: `${movementColor}0D`,
                      color: movementColor,
                      maxWidth: "100%",
                    }}
                  >
                    <Typography
                      noWrap
                      sx={{
                        ...masterTypo.caption,
                        color: "inherit",
                        fontWeight: 600,
                        lineHeight: 1.1,
                      }}
                    >
                      Δ{" "}
                      {row.change > 0 ? "+" : ""}
                      {row.change.toFixed(
                        unit === "%" ? 1 : 2
                      )}
                      {unit === "%" ? "%" : ""}
                    </Typography>
                  </Box>
                )}
              </Box>
            );
          })}
        </Box>
      )}
    </Box>
  );
};

export default FaTrend;
