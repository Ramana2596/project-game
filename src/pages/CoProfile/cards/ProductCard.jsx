// ============================================================
// Component: ProductCard
// Module: Company Profile
// Purpose: Display product information as a rich UX card
// AI Tags: company-profile, product-card, lifecycle, metrics
// UXLab V1.0 — Standardized to Company Profile Reference
// ============================================================

import React from "react";

import {
  Box,
  Card,
  Chip,
  Divider,
  Stack,
  Typography,
} from "@mui/material";

import {
  Inventory2Outlined,
  TrendingUpOutlined,
  LocalOfferOutlined,
  CalendarMonthOutlined,
  TimelineOutlined,
  AccessTimeOutlined,
  RocketLaunch,
  BarChart,
  HourglassBottom,
  Inventory2,
} from "@mui/icons-material";

import {
  colors,
  cardStyle,
  masterTypo,
} from "../../../ux/styles";

import { PRODUCT_LIFECYCLE } from "../constants/constants";

// ------------------------------------------------------------
// Format API date for business-user display
// ------------------------------------------------------------
const formatDate = (value) => {
  if (!value) return "-";

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return value;
  }

  return date.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

// ------------------------------------------------------------
// Normalize lifecycle code for constants lookup
// Example: PL 02 -> PL_02
// ------------------------------------------------------------
const normalizeLifecycleCode = (value) => {
  if (!value) return "";

  return String(value)
    .trim()
    .replace(/\s+/g, "_");
};

// ------------------------------------------------------------
// Resolve lifecycle visual treatment
// ------------------------------------------------------------
const getLifecycle = (stage) => {
  const code = normalizeLifecycleCode(stage);

  return (
    PRODUCT_LIFECYCLE?.[code] ?? {
      label: "Not Available",
      color: colors.primary,
      softColor: colors.primarySoft,
    }
  );
};

// ------------------------------------------------------------
// Resolve lifecycle-specific product icon — filled style,
// matches reference (row icons below stay outline)
// ------------------------------------------------------------
const getLifecycleIcon = (stage) => {
  const code = normalizeLifecycleCode(stage);

  switch (code) {
    case "PL_02":
      return RocketLaunch;

    case "PL_03":
      return BarChart;

    case "PL_04":
      return HourglassBottom;

    default:
      return Inventory2;
  }
};

// ------------------------------------------------------------
// Product Information Row
// Icon always inherits the card's single lifecycle color —
// matches reference (all row icons share one theme color per card).
// ------------------------------------------------------------
function ProductInfoRow({
  icon: Icon,
  themeColor,
  label,
  value,
}) {
  return (
    <Stack
      direction="row"
      alignItems="center"
      spacing={1}
      sx={{
        minHeight: 38,
        py: 0.85,
      }}
    >
      <Icon
        sx={{
          fontSize: 20,
          color: themeColor,
          flexShrink: 0,
        }}
      />

      <Typography
        sx={{
          ...masterTypo.body1,
          color: colors.body,
          flex: 1,
        }}
      >
        {label}
      </Typography>

      <Typography
        sx={{
          ...masterTypo.body1,
          fontWeight: 700,
          color: themeColor,
          textAlign: "right",
        }}
      >
        {value}
      </Typography>
    </Stack>
  );
}

// ------------------------------------------------------------
// Product Card
// ------------------------------------------------------------
export default function ProductCard({
  product = {},
  index = 0,
}) {
  // ----------------------------------------------------------
  // Resolve API Product Data
  // ----------------------------------------------------------
  const productName =
    product?.Name ??
    `Product ${index + 1}`;

  const productNumber = String(
    product?.S_No ?? index + 1
  ).padStart(2, "0");

  // ----------------------------------------------------------
  // Resolve lifecycle presentation
  // ----------------------------------------------------------
  const lifecycle = getLifecycle(
    product?.PLM_Stage
  );

  const LifecycleIcon = getLifecycleIcon(
    product?.PLM_Stage
  );

  // ----------------------------------------------------------
  // Resolve business-facing lifecycle information
  // ----------------------------------------------------------
  const lifecycleLabel =
    product?.Product_Life ??
    lifecycle.label;

  // ----------------------------------------------------------
  // Business Potential
  // ----------------------------------------------------------
  const businessPotential =
    product?.Business_Potential ??
    "Product information and current lifecycle status.";

  // ----------------------------------------------------------
  // Format product financial information
  // ----------------------------------------------------------
  const profit =
    product?.Profit_Percent !== undefined &&
    product?.Profit_Percent !== null
      ? `${Number(product.Profit_Percent).toFixed(0)}%`
      : "-";

  const currency =
    product?.Currency ?? "";

  const price =
    product?.Unit_Price !== undefined &&
    product?.Unit_Price !== null
      ? `${currency} ${Number(product.Unit_Price).toFixed(2)}`
      : "-";

  // ----------------------------------------------------------
  // Render Product Card
  // ----------------------------------------------------------
  return (
    <Card
      elevation={0}
      sx={{
        ...cardStyle.primary,

        // Lifecycle - visual accent.
        border: `2px solid ${lifecycle.color}`,

        "&:hover": {
          transform: "translateY(-6px)",
          boxShadow:
            `0 16px 32px ${lifecycle.color}2E`,
          borderColor: lifecycle.color,
        },
      }}
    >
      <Box sx={{ p: 2.25 }}>

        {/* Product Header */}
        <Stack
          direction="row"
          alignItems="center"
          spacing={1.5}
        >
          {/* Product Number */}
          <Box
            sx={{
              width: 56,
              height: 56,
              borderRadius: 2,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: lifecycle.color,
              color: colors.white,
              flexShrink: 0,
            }}
          >
            <Typography
              sx={{
                ...masterTypo.h4,
                color: colors.white,
                fontWeight: 800,
              }}
            >
              {productNumber}
            </Typography>
          </Box>

          {/* Product Name and Lifecycle */}
          <Box
            sx={{
              flex: 1,
              minWidth: 0,
            }}
          >
            <Typography
              sx={{
                ...masterTypo.h5,
                color: lifecycle.color,
                fontWeight: 700,
              }}
            >
              {productName}
            </Typography>

            <Chip
              label={lifecycleLabel}
              size="small"
              sx={{
                mt: 0.6,
                height: 24,
                borderRadius: "999px",
                backgroundColor: lifecycle.softColor,
                color: lifecycle.color,
                border:
                  `1px solid ${lifecycle.color}55`,
                fontWeight: 700,
              }}
            />
          </Box>

          {/* Lifecycle Product Icon */}
          <Box
            sx={{
              width: 64,
              height: 64,
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: lifecycle.softColor,
              flexShrink: 0,
            }}
          >
            <LifecycleIcon
              sx={{
                fontSize: 32,
                color: lifecycle.color,
              }}
            />
          </Box>
        </Stack>

        {/* Business Potential */}
        <Typography
          sx={{
            ...masterTypo.body1,
            mt: 2,
            mb: 1.25,
            color: colors.body,
          }}
        >
          {businessPotential}
        </Typography>

        {/* Single divider separates description from the stat list — matches reference */}
        <Divider
          sx={{
            mb: 0.5,
            borderColor: colors.divider,
          }}
        />

        {/* Profit Margin */}
        <ProductInfoRow
          icon={TrendingUpOutlined}
          themeColor={lifecycle.color}
          label="Profit Margin"
          value={profit}
        />

        {/* Estimated Unit Price */}
        <ProductInfoRow
          icon={LocalOfferOutlined}
          themeColor={lifecycle.color}
          label="Est. Unit Price"
          value={price}
        />

        {/* Pricing Date */}
        <ProductInfoRow
          icon={AccessTimeOutlined}
          themeColor={lifecycle.color}
          label="Pricing Date"
          value={
            product?.Pricing_Date
              ? new Date(product.Pricing_Date).toLocaleDateString("en-US", {
                month: "short",
                year: "numeric",
              })
              : "—"
          }
        />

       {/* Product Life Cycle */}
        <ProductInfoRow
          icon={TimelineOutlined}
          themeColor={lifecycle.color}
          label="Product Life Cycle"
          value={lifecycleLabel}
        />

        {/* Launch Date */}
        <ProductInfoRow
          icon={CalendarMonthOutlined}
          themeColor={lifecycle.color}
          label="Date of Launch"
          value={
            product?.Launch_Date
              ? new Date(product.Launch_Date).toLocaleDateString("en-US", {
                month: "short",
                year: "numeric",
              })
              : "—"
          }
        />

      </Box>
    </Card>
  );
}