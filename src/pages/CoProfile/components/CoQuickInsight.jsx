// ============================================================
// Component: CoQuickInsight
// Module: Company Profile
// Purpose: Surface a data-driven insight banner with lifecycle legend
// AI Tags: company-profile, insight, banner, lifecycle, uxlab
// UXLab V1.0 — Built fresh from UXLab tokens (Company Profile Reference)
// ============================================================

import React, { useMemo } from "react";

import {
  Box,
  Stack,
  Typography,
} from "@mui/material";

import TipsAndUpdatesOutlinedIcon from "@mui/icons-material/TipsAndUpdatesOutlined";
import TrendingUpOutlinedIcon from "@mui/icons-material/TrendingUpOutlined";
import ShieldOutlinedIcon from "@mui/icons-material/ShieldOutlined";
import DescriptionOutlinedIcon from "@mui/icons-material/DescriptionOutlined";
import QueryStatsOutlinedIcon from "@mui/icons-material/QueryStatsOutlined";

import {
  colors,
  cardStyle,
  layoutStyle,
  masterTypo,
} from "../../../ux/styles";

import { PRODUCT_LIFECYCLE } from "../constants/constants";

// ------------------------------------------------------------
// Lifecycle legend definition — colors match ProductCard /
// CoOverview assignments already established for this page.
// ------------------------------------------------------------
const LIFECYCLE_LEGEND = [
  {
    key: "GROWTH",
    label: "Growth",
    action: "Invest & Scale",
    color: colors.success,
    icon: TrendingUpOutlinedIcon,
  },
  {
    key: "MATURITY",
    label: "Maturity",
    action: "Optimize & Maintain",
    color: colors.accentBlue,
    icon: ShieldOutlinedIcon,
  },
  {
    key: "PHASING_OUT",
    label: "Phasing Out",
    action: "Manage Exit",
    color: colors.warning,
    icon: DescriptionOutlinedIcon,
  },
];

// ------------------------------------------------------------
// Legend Chip — cardStyle.bannerChip token
// ------------------------------------------------------------
function LegendChip({ item }) {
  const Icon = item.icon;

  return (
    <Box>
      <Box sx={cardStyle.bannerChip}>
        <Icon
          sx={{
            fontSize: 20,
            color: item.color,
          }}
        />

        <Typography
          sx={{
            ...masterTypo.body1,
            fontWeight: 700,
            color: item.color,
          }}
        >
          {item.label}
        </Typography>
      </Box>

      <Typography
        sx={{
          ...masterTypo.body2,
          color: colors.body,
          mt: 0.25,
        }}
      >
        {item.action}
      </Typography>
    </Box>
  );
}

// ------------------------------------------------------------
// Normalize lifecycle code —  PLM_Stage
// ------------------------------------------------------------
const normalizeLifecycleCode = (value) => {
  if (!value) return "";
  return String(value).trim().replace(/\s+/g, "_");
};

const getLifecycleLabel = (stage) => {
  const code = normalizeLifecycleCode(stage);
  return PRODUCT_LIFECYCLE?.[code]?.label ?? null;
};

// ------------------------------------------------------------
// Derive a data-driven insight sentence from live product data
// ------------------------------------------------------------
function useInsightText(products) {
  return useMemo(() => {
    if (!products || products.length === 0) {
      return "Product insights will appear once product data is available.";
    }

    const withProfit = products.filter(
      (p) => Number.isFinite(Number(p?.Profit_Percent))
    );

    const topProduct = withProfit.length
      ? withProfit.reduce((best, p) =>
          Number(p.Profit_Percent) > Number(best.Profit_Percent)
            ? p
            : best
        )
      : null;

    const growthProduct = products.find(
      (p) => getLifecycleLabel(p?.PLM_Stage)?.toLowerCase() === "growth"
    );

    const phasingOutProduct = products.find(
      (p) =>
        getLifecycleLabel(p?.PLM_Stage)
          ?.toLowerCase()
          .replace(/\s+/g, "") === "phasingout"
    );

    const lines = [];

    if (topProduct) {
      lines.push(
        `${topProduct.Name ?? "A product"} leads with the highest profit margin.`
      );
    }

    if (growthProduct || phasingOutProduct) {
      const investPart = growthProduct
        ? `Invest in ${growthProduct.Name} for growth`
        : null;

      const exitPart = phasingOutProduct
        ? `plan exit for ${phasingOutProduct.Name}`
        : null;

      lines.push(
        [investPart, exitPart].filter(Boolean).join(" and ") + "."
      );
    }

    return lines.length
      ? lines
      : ["Review product performance across the portfolio."];
  }, [products]);
}

// ------------------------------------------------------------
// Quick Insight Banner
// ------------------------------------------------------------
export default function CoQuickInsight({ products = [] }) {
  const insightLines = useInsightText(products);
  const lines = Array.isArray(insightLines) ? insightLines : [insightLines];

  return (
    <Box
      sx={{
        ...layoutStyle.panel,
        display: "flex",
        flexWrap: "wrap",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 3,
      }}
    >
      {/* ================================================== */}
      {/* Insight Icon + Text */}
      {/* ================================================== */}
      <Stack
        direction="row"
        alignItems="center"
        spacing={2}
        sx={{ minWidth: 260, flex: 1 }}
      >
        <Box
          sx={{
            ...cardStyle.bannerIconCircle,
            background: `${colors.primary}1A`,

            "& svg": {
              fontSize: 26,
              color: colors.primary,
            },
          }}
        >
          <TipsAndUpdatesOutlinedIcon />
        </Box>

        <Box>
          <Typography
            sx={{
              ...masterTypo.h5,
              color: colors.primary,
            }}
          >
            Quick Insight
          </Typography>

          {lines.map((line, idx) => (
            <Typography
              key={idx}
              sx={{
                ...masterTypo.body1,
                color: colors.title,
                mt: idx === 0 ? 0.5 : 0.1,
              }}
            >
              {line}
            </Typography>
          ))}
        </Box>
      </Stack>

      {/* ================================================== */}
      {/* Lifecycle Legend */}
      {/* ================================================== */}
      <Stack
        direction="row"
        divider={
          <Box
            sx={{
              width: "1px",
              alignSelf: "stretch",
              background: colors.divider,
            }}
          />
        }
        spacing={3}
        alignItems="flex-start"
        flexWrap="wrap"
      >
        {LIFECYCLE_LEGEND.map((item) => (
          <LegendChip key={item.key} item={item} />
        ))}
      </Stack>

      {/* ================================================== */}
      {/* Decorative Glyph */}
      {/* ================================================== */}
      <Box
        sx={{
          width: 64,
          height: 64,
          borderRadius: 3,
          display: { xs: "none", md: "flex" },
          alignItems: "center",
          justifyContent: "center",
          background: colors.primarySoft,
          flexShrink: 0,
        }}
      >
        <QueryStatsOutlinedIcon
          sx={{
            fontSize: 30,
            color: colors.primary,
          }}
        />
      </Box>
    </Box>
  );
}