// Component: FaCharts
// Module: AnnualReport
// Purpose: Render management-level financial trend charts
// Author/Version: OpsMgt UXLab V1.3
// AI Tags: annual-report, charts, trends, profitability, returns, financial-health

import React, { useMemo } from "react";
import { Box, Typography } from "@mui/material";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import ShowChartOutlinedIcon from "@mui/icons-material/ShowChartOutlined";
import AccountBalanceOutlinedIcon from "@mui/icons-material/AccountBalanceOutlined";
import { cardStyle, colors, layoutStyle, masterTypo } from "../../../ux/styles";

// Build one chart dataset from financial values and calculated ratio series.
const buildChartData = (annualData = [], ratioSeries = []) => {
  const ratioMap = new Map(
    ratioSeries.map((item) => [item.period, item.ratios || item])
  );

  return annualData.map((item) => {
    const ratios = ratioMap.get(item.period) || {};

    const revenue = Number(item?.finIS?.revenue);
    const grossProfit = Number(item?.finIS?.grossProfit);
    const ebit = Number(item?.finIS?.pbit);
    const netProfit = Number(item?.finIS?.netProfit);

    return {
      period: item.period,
      revenue: Number.isFinite(revenue) ? revenue : null,
      grossProfit: Number.isFinite(grossProfit) ? grossProfit : null,
      ebit: Number.isFinite(ebit) ? ebit : null,
      netProfit: Number.isFinite(netProfit) ? netProfit : null,
      grossMargin: ratios.grossMargin ?? null,
      ebitMargin: ratios.ebitMargin ?? null,
      netMargin: ratios.netMargin ?? null,
      roe: ratios.roe ?? null,
      roa: ratios.roa ?? null,
      assetTurnover: ratios.assetTurnover ?? null,
      currentRatio: ratios.currentRatio ?? null,
      debtEquity: ratios.debtEquity ?? null,
    };
  });
};

// Format financial amounts for chart axes and tooltips.
const formatAmount = (value) => {
  if (
    value === null ||
    value === undefined ||
    !Number.isFinite(Number(value))
  ) {
    return "—";
  }

  const number = Number(value);

  if (Math.abs(number) >= 1000000) {
    return `${(number / 1000000).toFixed(1)}M`;
  }

  if (Math.abs(number) >= 1000) {
    return `${(number / 1000).toFixed(1)}K`;
  }

  return number.toLocaleString();
};

// Format analytical ratio values for tooltips.
const formatMetric = (value, unit) => {
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

// Format tooltip values according to the metric being displayed.
const tooltipFormatter = (value, name) => {
  if (
    name.includes("Margin") ||
    name.includes("ROE") ||
    name.includes("ROA")
  ) {
    return [formatMetric(value, "%"), name];
  }

  if (
    name.includes("Turnover") ||
    name.includes("Debt / Equity") ||
    name.includes("Ratio")
  ) {
    return [formatMetric(value, "x"), name];
  }

  return [formatAmount(value), name];
};

// Provide the common UXLab chart-card structure.
const ChartCard = ({ title, subtitle, icon, iconAccent, children }) => (
  <Box
    sx={{
      ...cardStyle.primary,
      p: 2,
      minHeight: 320,
    }}
  >
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        gap: 1.5,
        mb: 1.5,
      }}
    >
      <Box
        sx={{
          ...cardStyle.statIconCircle(iconAccent),
          width: 42,
          height: 42,
          minWidth: 42,
          "& .MuiSvgIcon-root": {
            color: colors.onPrimary,
            fontSize: 21,
          },
        }}
      >
        {icon}
      </Box>

      <Box sx={{ minWidth: 0 }}>
        <Typography sx={{ ...masterTypo.h6, color: colors.title }}>
          {title}
        </Typography>

        <Typography sx={{ ...masterTypo.caption, color: colors.subtitle }}>
          {subtitle}
        </Typography>
      </Box>
    </Box>

    <Box sx={{ width: "100%", height: 235 }}>
      {children}
    </Box>
  </Box>
);

const FaCharts = ({
  annualData = [],
  ratioSeries = [],
  loading = false,
}) => {
  // Prepare the combined chart dataset from the Annual Report data streams.
  const chartData = useMemo(
    () => buildChartData(annualData, ratioSeries),
    [annualData, ratioSeries]
  );

  // Show the standard UXLab loading banner while data is being prepared.
  if (loading) {
    return (
      <Box sx={{ ...layoutStyle.section, px: 2 }}>
        <Box sx={cardStyle.banner}>
          <Box sx={cardStyle.bannerIconCircle}>
            <ShowChartOutlinedIcon
              sx={{ color: colors.onPrimary }}
            />
          </Box>

          <Box>
            <Typography sx={{ ...masterTypo.h6, color: colors.title }}>
              Financial Trends
            </Typography>

            <Typography sx={{ ...masterTypo.body2, color: colors.body }}>
              Preparing analytical charts...
            </Typography>
          </Box>
        </Box>
      </Box>
    );
  }

  // Show the standard UXLab empty-state banner when no chart data exists.
  if (!chartData.length) {
    return (
      <Box sx={{ ...layoutStyle.section, px: 2 }}>
        <Box
          sx={{
            ...cardStyle.banner,
            background: colors.panel,
            borderColor: colors.border,
          }}
        >
          <Box
            sx={{
              ...cardStyle.bannerIconCircle,
              background: colors.primarySoft,
              "& .MuiSvgIcon-root": {
                color: colors.onPrimarySoft,
              },
            }}
          >
            <ShowChartOutlinedIcon />
          </Box>

          <Box>
            <Typography sx={{ ...masterTypo.h6, color: colors.title }}>
              Financial Trends
            </Typography>

            <Typography sx={{ ...masterTypo.body2, color: colors.body }}>
              No chart data is available for the selected period.
            </Typography>
          </Box>
        </Box>
      </Box>
    );
  }

  // Render the management chart section using the UXLab layout and card tokens.
  return (
    <Box sx={{ ...layoutStyle.section, px: 2 }}>
      <Box sx={layoutStyle.sectionHeader}>
        <Box>
          <Typography sx={{ ...masterTypo.h5, color: colors.title }}>
            Financial Trends
          </Typography>

          <Typography sx={{ ...masterTypo.caption, color: colors.subtitle }}>
            Revenue, profitability, returns and financial health over time
          </Typography>
        </Box>
      </Box>

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: {
            xs: "1fr",
            lg: "repeat(2, minmax(0, 1fr))",
          },
          gap: 2,
        }}
      >
        <ChartCard
          title="Revenue & Profit Trend"
          subtitle="Revenue, gross profit, EBIT and net profit"
          icon={<ShowChartOutlinedIcon />}
          iconAccent={colors.accentBlue}
        >
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData}>
              <CartesianGrid
                stroke={colors.divider}
                strokeDasharray="3 3"
              />

              <XAxis
                dataKey="period"
                tick={{ fill: colors.body, fontSize: 12 }}
              />

              <YAxis
                tickFormatter={formatAmount}
                tick={{ fill: colors.body, fontSize: 12 }}
              />

              <Tooltip formatter={tooltipFormatter} />

              <Legend />

              <Line
                type="monotone"
                dataKey="revenue"
                name="Revenue"
                stroke={colors.accentBlue}
                strokeWidth={2.5}
                dot={{ r: 3 }}
              />

              <Line
                type="monotone"
                dataKey="grossProfit"
                name="Gross Profit"
                stroke={colors.accentTeal}
                strokeWidth={2.5}
                dot={{ r: 3 }}
              />

              <Line
                type="monotone"
                dataKey="ebit"
                name="EBIT"
                stroke={colors.accentPurple}
                strokeWidth={2.5}
                dot={{ r: 3 }}
              />

              <Line
                type="monotone"
                dataKey="netProfit"
                name="Net Profit"
                stroke={colors.accentOrange}
                strokeWidth={2.5}
                dot={{ r: 3 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard
          title="Margin Trend"
          subtitle="Gross, EBIT and net profit margins"
          icon={<ShowChartOutlinedIcon />}
          iconAccent={colors.accentTeal}
        >
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData}>
              <CartesianGrid
                stroke={colors.divider}
                strokeDasharray="3 3"
              />

              <XAxis
                dataKey="period"
                tick={{ fill: colors.body, fontSize: 12 }}
              />

              <YAxis
                tickFormatter={(value) => `${value}%`}
                tick={{ fill: colors.body, fontSize: 12 }}
              />

              <Tooltip formatter={tooltipFormatter} />

              <Legend />

              <Line
                type="monotone"
                dataKey="grossMargin"
                name="Gross Margin"
                stroke={colors.accentTeal}
                strokeWidth={2.5}
                dot={{ r: 3 }}
              />

              <Line
                type="monotone"
                dataKey="ebitMargin"
                name="EBIT Margin"
                stroke={colors.accentPurple}
                strokeWidth={2.5}
                dot={{ r: 3 }}
              />

              <Line
                type="monotone"
                dataKey="netMargin"
                name="Net Margin"
                stroke={colors.accentOrange}
                strokeWidth={2.5}
                dot={{ r: 3 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard
          title="Returns & Asset Turnover"
          subtitle="ROE, ROA and asset utilisation"
          icon={<AccountBalanceOutlinedIcon />}
          iconAccent={colors.accentOrange}
        >
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData}>
              <CartesianGrid
                stroke={colors.divider}
                strokeDasharray="3 3"
              />

              <XAxis
                dataKey="period"
                tick={{ fill: colors.body, fontSize: 12 }}
              />

              <YAxis
                yAxisId="percent"
                tickFormatter={(value) => `${value}%`}
                tick={{ fill: colors.body, fontSize: 12 }}
              />

              <YAxis
                yAxisId="turnover"
                orientation="right"
                tick={{ fill: colors.body, fontSize: 12 }}
              />

              <Tooltip formatter={tooltipFormatter} />

              <Legend />

              <Bar
                yAxisId="percent"
                dataKey="roe"
                name="ROE"
                fill={colors.accentBlue}
                radius={[4, 4, 0, 0]}
              />

              <Bar
                yAxisId="percent"
                dataKey="roa"
                name="ROA"
                fill={colors.accentPurple}
                radius={[4, 4, 0, 0]}
              />

              <Bar
                yAxisId="turnover"
                dataKey="assetTurnover"
                name="Asset Turnover"
                fill={colors.accentTeal}
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard
          title="Liquidity & Leverage"
          subtitle="Current ratio and debt-to-equity"
          icon={<AccountBalanceOutlinedIcon />}
          iconAccent={colors.accentRose}
        >
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData}>
              <CartesianGrid
                stroke={colors.divider}
                strokeDasharray="3 3"
              />

              <XAxis
                dataKey="period"
                tick={{ fill: colors.body, fontSize: 12 }}
              />

              <YAxis tick={{ fill: colors.body, fontSize: 12 }} />

              <Tooltip formatter={tooltipFormatter} />

              <Legend />

              <Line
                type="monotone"
                dataKey="currentRatio"
                name="Current Ratio"
                stroke={colors.accentBlue}
                strokeWidth={2.5}
                dot={{ r: 3 }}
              />

              <Line
                type="monotone"
                dataKey="debtEquity"
                name="Debt / Equity"
                stroke={colors.accentRose}
                strokeWidth={2.5}
                dot={{ r: 3 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </ChartCard>
      </Box>
    </Box>
  );
};

export default FaCharts;
