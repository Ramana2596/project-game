
// Component: FinAnalysis
// Module: FinAnalysis
// Purpose: Orchestrate the macro-level Annual Report analytics experience
// Author/Version: OpsMgt UXLab V1.3
// AI Tags: annual-report, analytics, financial-ratios, management-dashboard, uxlab

import React, { useMemo, useState } from "react";
import { Alert, Box, Typography } from "@mui/material";
import { colors, layoutStyle, masterTypo } from "../../ux/styles";
import { FA_DEFAULT_FILTERS } from "./constants/faConstants";
import useFinAnalysis from "./hooks/useFinAnalysis";
import FaHeader from "./components/FaHeader";
import FaNavigation from "./components/FaNavigation";
import FaKpis from "./components/FaKpis";
import FaTrend from "./components/FaTrend";
import FaCharts from "./components/FaCharts";
import FaInsights from "./components/FaInsights";

// Resolve the ratio map from either direct or wrapped hook data.
const resolveRatios = (value) => value?.ratios || value || {};

// Resolve Revenue from the Income Statement model.
const getRevenueValue = (item) => {
  const revenue = item?.finIS?.revenue;

  return Number.isFinite(Number(revenue))
    ? Number(revenue)
    : null;
};

// Build the page heading and description for the active section.
const getSectionContent = (activeTab) => {
  if (activeTab === "profitability") {
    return {
      title: "Profitability",
      description:
        "Track revenue growth and the movement of profit margins.",
      ratioKey: "netMargin",
      ratioLabel: "Net Margin",
      unit: "%",
    };
  }

  if (activeTab === "returns") {
    return {
      title: "Returns",
      description:
        "Track shareholder returns and efficiency of the asset base.",
      ratioKey: "roe",
      ratioLabel: "ROE",
      unit: "%",
    };
  }

  if (activeTab === "financialHealth") {
    return {
      title: "Financial Health",
      description:
        "Monitor liquidity, leverage and working-capital strength.",
      ratioKey: "currentRatio",
      ratioLabel: "Current Ratio",
      unit: "x",
    };
  }

  return {
    title: "Performance Overview",
    description:
      "Executive view of growth, profitability, returns and financial health.",
    ratioKey: "revenueGrowth",
    ratioLabel: "Revenue Growth",
    unit: "%",
  };
};

const FinAnalysis = () => {
  // Maintain only page navigation and macro analytical filters.
  const [activeTab, setActiveTab] = useState("overview");
  const [filters, setFilters] = useState(FA_DEFAULT_FILTERS);

  // Load the complete dataset once and apply the selected period locally.
  const {
    annualData = [],
    ratioSeries = [],
    latestRatios = {},
    previousRatios = {},
    periods = [],
    latestPeriod = null,
    loading = false,
    error = null,
  } = useFinAnalysis({
    selectedPeriod: filters.period,
  });

  // Resolve the current and previous ratio maps for presentation.
  const latest = useMemo(
    () => resolveRatios(latestRatios),
    [latestRatios]
  );

  const previous = useMemo(
    () => resolveRatios(previousRatios),
    [previousRatios]
  );

  // Resolve the revenue values aligned with the same analytical periods.
  const revenueSeries = useMemo(
    () =>
      annualData.map((item) => ({
        period: item?.period || "—",
        value: getRevenueValue(item),
      })),
    [annualData]
  );

  // Resolve the analytical content for the active tab.
  const section = useMemo(
    () => getSectionContent(activeTab),
    [activeTab]
  );

  // Update toolbar filters without introducing team or product selection.
  const handleFilterChange = (nextFilters) => {
    setFilters(nextFilters);
  };

  // Render the macro-level Annual Report page.
  return (
    <Box sx={layoutStyle.root}>
      <Box sx={layoutStyle.pageContainer}>
        <FaHeader
          productionMonth={
            filters.period === "ALL"
              ? latestPeriod
              : filters.period
          }
        />

        <FaNavigation
          activeTab={activeTab}
          onChange={setActiveTab}
          filters={filters}
          onFilterChange={handleFilterChange}
          periods={periods}
        />

        {error && (
          <Alert
            severity="error"
            sx={{
              mb: 2,
              mx: 2,
              borderRadius: 3,
            }}
          >
            {error?.message || String(error)}
          </Alert>
        )}

        <FaKpis
          ratios={latest}
          loading={loading}
        />

        <Box
          sx={{
            px: 2,
            mb: 1.5,
          }}
        >
          <Typography
            sx={{
              ...masterTypo.h5,
              color: colors.title,
              mb: 0.5,
            }}
          >
            {section.title}
          </Typography>

          <Typography
            sx={{
              ...masterTypo.body2,
              color: colors.subtitle,
            }}
          >
            {section.description}
          </Typography>
        </Box>

        <FaTrend
          series={ratioSeries}
          revenueSeries={revenueSeries}
          ratioKey={section.ratioKey}
          ratioLabel={section.ratioLabel}
          unit={section.unit}
          loading={loading}
        />

        <FaCharts
          annualData={annualData}
          ratioSeries={ratioSeries}
          loading={loading}
          activeTab={activeTab}
        />

        <FaInsights
          latestRatios={latest}
          previousRatios={previous}
          loading={loading}
          activeTab={activeTab}
        />

        {!loading && !annualData.length && !error && (
          <Box
            sx={{
              px: 2,
              pb: 2,
            }}
          >
            <Typography
              sx={{
                ...masterTypo.caption,
                color: colors.muted,
                textAlign: "center",
              }}
            >
              No Annual Report data is available for the selected period.
            </Typography>
          </Box>
        )}

        {periods.length === 0 &&
          !loading &&
          annualData.length > 0 && (
            <Box
              sx={{
                px: 2,
                pb: 2,
              }}
            >
              <Typography
                sx={{
                  ...masterTypo.caption,
                  color: colors.muted,
                  textAlign: "center",
                }}
              >
                Reporting periods are not available.
              </Typography>
            </Box>
          )}
      </Box>
    </Box>
  );
};

export default FinAnalysis;
