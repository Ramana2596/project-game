// File: src/pages/TeamPlan/components/TeamPlanGuide.jsx
// Purpose: Display fixed guide figures for the selected TeamPlan item.

import React from "react";
import { Box, Typography } from "@mui/material";
import LightbulbOutlinedIcon from "@mui/icons-material/LightbulbOutlined";

import { colors, layoutStyle, masterTypo } from "../../../ux/styles";

// Convert a value to a number.
const num = (value) => {
  if (value === null || value === undefined || value === "") return 0;

  const result = Number(String(value).replace(/,/g, ""));
  return Number.isFinite(result) ? result : 0;
};

// Format numeric values.
const fmt = (value) =>
  num(value).toLocaleString("en-IN", { maximumFractionDigits: 2 });

// Format percentage.
const pct = (value) =>
  value === null || value === undefined
    ? "-"
    : `${num(value).toFixed(0)}%`;

// Prepare guide figures for the selected item.
const guideItems = (tab, info) => {
  if (!info) return [];

  switch (tab) {
    case "OI 001":
      return [
        { label: "Demand", value: fmt(info.Mkt_Demand) },
        { label: "Additional", value: fmt(info.Addl_Demand) },
        { label: "Total Demand", value: fmt(info.Total_Demand) },
      ];

    case "OI 002":
      return [
        { label: "Qty per Set", value: fmt(info.Qty_Per_Set) },
      ];

    case "OI 003": {
      const plant = info.plant ?? {};

      return [
        { label: "Machines", value: fmt(info.machines) },
        { label: "Capacity", value: fmt(plant.capacity) },
        { label: "Load", value: fmt(plant.load) },
        { label: "Utilisation", value: pct(plant.utilisation) },
      ];
    }

    default:
      return [];
  }
};

// Render labels and corresponding values in aligned rows.
const GuideItems = ({ items }) => {
  if (!items.length) return null;

  const columns = `repeat(${items.length}, minmax(0, 1fr))`;

  return (
    <Box>
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: columns,
        }}
      >
        {items.map((item) => (
          <Typography
            key={item.label}
            sx={{ ...masterTypo.caption, color: colors.subtitle }}
          >
            {item.label}
          </Typography>
        ))}
      </Box>

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: columns,
        }}
      >
        {items.map((item) => (
          <Typography
            key={item.label}
            sx={{
              ...masterTypo.body2,
              color: colors.title,
              fontWeight: 600,
              fontVariantNumeric: "tabular-nums",
              overflowWrap: "anywhere",
            }}
          >
            {item.value}
          </Typography>
        ))}
      </Box>
    </Box>
  );
};

const TeamPlanGuide = ({
  tab,
  partNo,
  info,
  loading = false,
  error = "",
}) => {
  const hasStock = ["OI 001", "OI 002"].includes(tab);
  const stockValue =
    info?.Stock_Qty === null || info?.Stock_Qty === undefined
      ? "-"
      : fmt(info.Stock_Qty);

  const stockUom = info?.UOM ? ` ${info.UOM}` : "";
  const items = guideItems(tab, info);

  // Helper to determine active tab label text
  const getTabLabel = () => {
    switch (tab) {
      case "OI 001":
        return "Product";
      case "OI 002":
        return "Material";
      case "OI 003":
        return "Plant";
      default:
        return "";
    }
  };

  const tabLabel = getTabLabel();

  return (
    <Box
      component="section"
      aria-label={`Guide to Plan : ${tabLabel}`}
      sx={{
        ...layoutStyle.compactPanel,
        minWidth: 0,
      }}
    >
      {/* Heading and right-aligned stock figure. */}
      <Box sx={layoutStyle.flexRow}>
        <Box sx={layoutStyle.flexRow}>
          <LightbulbOutlinedIcon sx={{ color: colors.brand }} />
          <Typography sx={{ ...masterTypo.h6, color: colors.title }}>
            Guide to Plan
          </Typography>
          
          {tabLabel && (
            <Typography sx={{ ...masterTypo.h6, color: colors.title }}>
              {tabLabel}
            </Typography>
          )}
        </Box>

        {hasStock && (
          <Box sx={layoutStyle.flexRight}>
            <Typography sx={{ ...masterTypo.caption, color: colors.subtitle }}>
              Stock:
            </Typography>
            <Typography
              sx={{
                ...masterTypo.body2,
                color: colors.title,
                fontWeight: 600,
                fontVariantNumeric: "tabular-nums",
              }}
            >
              {stockValue}{stockUom}
            </Typography>
          </Box>
        )}
      </Box>

      {/* Guide loading and selection states. */}
      {!partNo ? (
        <Typography sx={{ ...masterTypo.body2, color: colors.subtitle }}>
          Select a line to view guide figures.
        </Typography>
      ) : error ? (
        <Typography sx={{ ...masterTypo.body2, color: colors.subtitle }}>
          {error}
        </Typography>
      ) : loading ? (
        <Typography sx={{ ...masterTypo.body2, color: colors.subtitle }}>
          Loading guide figures...
        </Typography>
      ) : !info || !items.length ? (
        <Typography sx={{ ...masterTypo.body2, color: colors.subtitle }}>
          No guide figures available.
        </Typography>
      ) : (
        <GuideItems items={items} />
      )}
    </Box>
  );
};

export default TeamPlanGuide;