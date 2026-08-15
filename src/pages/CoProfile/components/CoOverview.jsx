// ============================================================
// Component: CoOverview
// Module: Company Profile
// Purpose: Display company-level overview metrics
// AI Tags: company-profile, metrics, overview, uxlab
// UXLab V1.0 — Standardized to Company Profile Reference
// ============================================================

import React, { useMemo } from "react";
import {
  Box,
} from "@mui/material";

import Inventory2OutlinedIcon from "@mui/icons-material/Inventory2Outlined";
import TrendingUpOutlinedIcon from "@mui/icons-material/TrendingUpOutlined";
import CalendarMonthOutlinedIcon from "@mui/icons-material/CalendarMonthOutlined";
import AttachMoneyOutlinedIcon from "@mui/icons-material/AttachMoneyOutlined";

import CoMetricCard from "../cards/CoMetricCard";

import {
  colors,
} from "../../../ux/styles";

// ------------------------------------------------------------
// Company Overview
// ------------------------------------------------------------
export default function CoOverview({ products = [] }) {

  // ----------------------------------------------------------
  // Compute company-level overview metrics
  // ----------------------------------------------------------
  const metrics = useMemo(() => {

    const profitValues = products
      .map((product) => Number(product?.Profit_Percent))
      .filter(Number.isFinite);

    const launchDates = products
      .map((product) => product?.Launch_Date)
      .filter(Boolean)
      .map((date) => new Date(date))
      .filter(
        (date) => !Number.isNaN(date.getTime())
      );

    const currencies = [
      ...new Set(
        products
          .map((product) => product?.Currency)
          .filter(Boolean)
      ),
    ];

    const avgProfit =
      profitValues.length > 0
        ? profitValues.reduce(
            (sum, value) => sum + value,
            0
          ) / profitValues.length
        : null;

    const newestLaunch =
      launchDates.length > 0
        ? new Date(
            Math.max(
              ...launchDates.map((date) =>
                date.getTime()
              )
            )
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

  // ----------------------------------------------------------
  // Format business dates — MMM yyyy, e.g. "Feb 2023"
  // Sourced from each product's Launch_Date (API field)
  // ----------------------------------------------------------
  const formatDate = (date) => {
    if (!date) return "-";

    return date.toLocaleDateString("en-GB", {
      month: "short",
      year: "numeric",
    });
  };

  // ----------------------------------------------------------
  // Render company overview metrics
  // ----------------------------------------------------------
  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: {
          xs: "1fr",
          sm: "repeat(2, 1fr)",
          md: "repeat(4, 1fr)",
        },
        gap: 1.5,
      }}
    >

      {/* Total Products — blue, per reference */}
      <CoMetricCard
        label="Total Products"
        value={metrics.totalProducts}
        subtitle="Active Products"
        icon={Inventory2OutlinedIcon}
        color={colors.accentBlue}
      />

      {/* Average Profit Margin — green, per reference */}
      <CoMetricCard
        label="Avg. Profit Margin"
        value={
          metrics.avgProfit !== null
            ? `${metrics.avgProfit.toFixed(0)}%`
            : "-"
        }
        subtitle="Across All Products"
        icon={TrendingUpOutlinedIcon}
        color={colors.success}
      />

      {/* Newest Product Launch — brand purple, per reference */}
      <CoMetricCard
        label="Newest Launch"
        value={formatDate(metrics.newestLaunch)}
        subtitle="Latest Product"
        icon={CalendarMonthOutlinedIcon}
        color={colors.primary}
      />

      {/* Company Currency — orange, per reference */}
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