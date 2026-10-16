
/**
 * Component: CoOverview
 * Module: Company Profile
 * Purpose: Present company overview metrics in a compact grid
 * AI Tags: company-profile, overview, metrics, uxlab
 * UXLab V1.4 — Six-Column Desktop Layout
 */

import React, { useMemo } from "react";
import { Box } from "@mui/material";

import Inventory2OutlinedIcon from "@mui/icons-material/Inventory2Outlined";
import TrendingUpOutlinedIcon from "@mui/icons-material/TrendingUpOutlined";
import CalendarMonthOutlinedIcon from "@mui/icons-material/CalendarMonthOutlined";
import AttachMoneyOutlinedIcon from "@mui/icons-material/AttachMoneyOutlined";

import CoMetricCard from "../cards/CoMetricCard";

import { colors } from "../../../ux/styles";

// Company Overview
export default function CoOverview({ products = [] }) {
  // Calculate the existing company metrics without changing business logic.
  const metrics = useMemo(() => {
    const profitValues = products
      .map((product) => Number(product?.Profit_Percent))
      .filter(Number.isFinite);

    const launchDates = products
      .map((product) => product?.Launch_Date)
      .filter(Boolean)
      .map((date) => new Date(date))
      .filter((date) => !Number.isNaN(date.getTime()));

    const currencies = [
      ...new Set(products.map((product) => product?.Currency).filter(Boolean)),
    ];

    const avgProfit =
      profitValues.length > 0
        ? profitValues.reduce((sum, value) => sum + value, 0) /
          profitValues.length
        : null;

    const newestLaunch =
      launchDates.length > 0
        ? new Date(
            Math.max(...launchDates.map((date) => date.getTime()))
          )
        : null;

    return {
      totalProducts: products.length,
      avgProfit,
      newestLaunch,
      currency:
        currencies.length === 1
          ? currencies[0]
          : currencies.length > 1
            ? "Multiple"
            : "-",
    };
  }, [products]);

  // Format the newest launch date for display.
  const formatDate = (date) =>
    date
      ? date.toLocaleDateString("en-GB", {
          month: "short",
          year: "numeric",
        })
      : "-";

  // Arrange four cards per row on larger screens and fewer on narrow screens.
  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: {
          xs: "repeat(1, minmax(0, 1fr))",
          sm: "repeat(2, minmax(0, 1fr))",
          lg: "repeat(4, minmax(0, 1fr))",
        },
        gap: 1,
        alignItems: "stretch",
      }}
    >
      <CoMetricCard
        label="Total Products"
        value={metrics.totalProducts}
        subtitle="Active Products"
        icon={Inventory2OutlinedIcon}
        color={colors.accentBlue}
      />

      <CoMetricCard
        label="Avg. Profit Margin"
        value={metrics.avgProfit !== null
          ? `${metrics.avgProfit.toFixed(0)}%`
          : "-"}
        subtitle="Across All Products"
        icon={TrendingUpOutlinedIcon}
        color={colors.success}
      />

      <CoMetricCard
        label="Newest Launch"
        value={formatDate(metrics.newestLaunch)}
        subtitle="Latest Product"
        icon={CalendarMonthOutlinedIcon}
        color={colors.primary}
      />

      <CoMetricCard
        label="Currency"
        value={metrics.currency}
        subtitle="All Prices"
        icon={AttachMoneyOutlinedIcon}
        color={colors.warning}
      />
    </Box>
  );
}
