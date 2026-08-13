// ============================================================
// Component: ProductCard
// Module: Company Profile
// Purpose: Display product information as a rich UX card
// AI Tags: company-profile, product-card, lifecycle, metrics
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
  RocketLaunchOutlined,
  BarChartOutlined,
  HourglassBottomOutlined,
} from "@mui/icons-material";

import { colors, masterTypo } from "../../../ux/styles";

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
      softColor: "#F3E8FF",
    }
  );
};

// ------------------------------------------------------------
// Resolve lifecycle-specific product icon
// Reference: Company Profile UX design
// ------------------------------------------------------------
const getLifecycleIcon = (stage) => {
  const code = normalizeLifecycleCode(stage);

  switch (code) {
    case "PL_02":
      return RocketLaunchOutlined;

    case "PL_03":
      return BarChartOutlined;

    case "PL_04":
      return HourglassBottomOutlined;

    default:
      return Inventory2Outlined;
  }
};

// ------------------------------------------------------------
// Product Information Row
// ------------------------------------------------------------
function ProductInfoRow({
  icon: Icon,
  iconColor,
  label,
  value,
  valueColor,
}) {
  return (
    <Stack
      direction="row"
      alignItems="center"
      spacing={1}
      sx={{
        minHeight: 38,
        py: 0.55,
      }}
    >
      <Icon
        sx={{
          fontSize: 20,
          color: iconColor,
          flexShrink: 0,
        }}
      />

      <Typography
        sx={{
          ...masterTypo.body1,
          fontSize: "0.88rem",
          color: "#475569",
          flex: 1,
        }}
      >
        {label}
      </Typography>

      <Typography
        sx={{
          ...masterTypo.body1,
          fontSize: "0.88rem",
          fontWeight: 700,
          color: valueColor || "#172B4D",
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
  // Business Potential comes directly from Product Master API
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
        height: "100%",
        border: `2px solid ${lifecycle.color}`,
        borderRadius: 3,
        backgroundColor: "#FFFFFF",
        overflow: "hidden",
        transition:
          "transform 0.2s ease, box-shadow 0.2s ease",

        "&:hover": {
          transform: "translateY(-2px)",
          boxShadow:
            `0 8px 22px ${lifecycle.color}25`,
        },
      }}
    >
      <Box sx={{ p: 2.25 }}>

        {/* Product Header */}
        <Stack
          direction="row"
          alignItems="center"
          spacing={1.25}
        >

          {/* Product Number */}
          <Box
            sx={{
              width: 48,
              height: 48,
              borderRadius: 2,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: lifecycle.color,
              color: "#FFFFFF",
              flexShrink: 0,
            }}
          >
            <Typography
              sx={{
                fontWeight: 800,
                fontSize: "1rem",
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
                ...masterTypo.h3,
                color: lifecycle.color,
                fontSize: {
                  xs: "1.35rem",
                  md: "1.55rem",
                },
                fontWeight: 800,
                lineHeight: 1.15,
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
                borderRadius: 3,
                backgroundColor:
                  lifecycle.softColor,
                color: lifecycle.color,
                border:
                  `1px solid ${lifecycle.color}55`,
                fontWeight: 700,
                fontSize: "0.75rem",
              }}
            />
          </Box>

          {/* Lifecycle Product Icon */}
          <Box
            sx={{
              width: 48,
              height: 48,
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              backgroundColor:
                lifecycle.softColor,
              flexShrink: 0,
            }}
          >
            <LifecycleIcon
              sx={{
                fontSize: 28,
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
            fontSize: "0.88rem",
            lineHeight: 1.55,
            color: "#334155",
          }}
        >
          {businessPotential}
        </Typography>

        <Divider sx={{ mb: 0.5 }} />

        {/* Profit Margin */}
        <ProductInfoRow
          icon={TrendingUpOutlined}
          iconColor="#16A34A"
          label="Profit Margin"
          value={profit}
          valueColor={lifecycle.color}
        />

        <Divider />

        {/* Estimated Price */}
        <ProductInfoRow
          icon={LocalOfferOutlined}
          iconColor="#7C3AED"
          label="Est. Price"
          value={price}
          valueColor={lifecycle.color}
        />

        <Divider />

        {/* Launch Date */}
        <ProductInfoRow
          icon={CalendarMonthOutlined}
          iconColor="#2563EB"
          label="Date of Launch"
          value={formatDate(product?.Launch_Date)}
          valueColor={lifecycle.color}
        />

        <Divider />

        {/* Product Life Cycle */}
        <ProductInfoRow
          icon={TimelineOutlined}
          iconColor="#DB2777"
          label="Product Life Cycle"
          value={lifecycleLabel}
          valueColor={lifecycle.color}
        />

        <Divider />

        {/* Pricing Date */}
        <ProductInfoRow
          icon={AccessTimeOutlined}
          iconColor="#EA580C"
          label="Pricing Date"
          value={formatDate(product?.Pricing_Date)}
          valueColor={lifecycle.color}
        />

        <Divider />

        {/* Unit of Measure */}
        <ProductInfoRow
          icon={Inventory2Outlined}
          iconColor="#0891B2"
          label="UOM"
          value={product?.UOM ?? "-"}
          valueColor={lifecycle.color}
        />

      </Box>
    </Card>
  );
}