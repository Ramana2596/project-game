// File: src/pages/TeamPlan/components/TeamPlanReview.jsx
// Purpose: Display live review figures for the selected TeamPlan item.

import React from "react";
import { Box, Typography } from "@mui/material";
import RateReviewOutlinedIcon from "@mui/icons-material/RateReviewOutlined";

import { colors, layoutStyle, masterTypo } from "../../../ux/styles";

// Quantity identifiers for product planning (row field: Quantity_Id).
const QTY_ID = {
  production: "QP 02",
  sales: "QP 03",
};

// Convert a value to a number.
const num = (value) => {
  if (value === null || value === undefined || value === "") return 0;

  const result = Number(String(value).replace(/,/g, ""));
  return Number.isFinite(result) ? result : 0;
};

// Format numeric values.
const fmt = (value) =>
  num(value).toLocaleString("en-IN", { maximumFractionDigits: 2 });

// Format currency values.
const money = (value, currency) =>
  `${currency ? `${currency} ` : ""}${num(value).toLocaleString("en-IN", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;

// Compare identifiers consistently.
const isId = (value, expected) =>
  String(value ?? "").trim().toUpperCase() === expected;

// Get the common currency from the rows.
const getCurrency = (rows = []) =>
  rows.find((item) => item.Currency)?.Currency ?? "";

// Calculate total value.
const getValue = (items = []) =>
  items.reduce(
    (total, item) => total + num(item.Quantity) * num(item.Unit_Price),
    0
  );

// Ordered quantity on Material / Machine lines.
// Required_Quantity 0 = "Not ordering now"; otherwise Quantity from the selected price.
const orderQty = (row) => {
  const required = row?.Required_Quantity;
  const entered =
    required !== null && required !== undefined && String(required).trim() !== "";
  return entered && num(required) === 0 ? 0 : num(row?.Quantity);
};

// Stock after this line: opening balance, plus the ordered quantity for Ex-Stock (CP 04).
const getStock = (row, info) => {
  const openingBalance = num(info?.Stock_Qty);
  return isId(row.Price_Id, "CP 04")
    ? openingBalance + orderQty(row)
    : openingBalance;
};

// Calculate review figures for the selected item.
const reviewItems = (tab, row, rows = [], info) => {
  if (!row) return [];

  const partRows = rows.filter(
    (item) => String(item.Part_No) === String(row.Part_No)
  );

  const currency = getCurrency(partRows) || getCurrency(rows);
  const uom = row.UOM || "";

  switch (tab) {
    case "OI 001": {
      const productionRows = partRows.filter((item) =>
        isId(item.Quantity_Id, QTY_ID.production)
      );

      const salesRows = partRows.filter((item) =>
        isId(item.Quantity_Id, QTY_ID.sales)
      );

      return [
        {
          label: "Production Value",
          value: money(getValue(productionRows), currency),
        },
        {
          label: "Sales Value",
          value: money(getValue(salesRows), currency),
        },
      ];
    }

    case "OI 002": {
      const commitment = orderQty(row) * num(row.Unit_Price);

      return [
        {
          label: "Stock Qty",
          value: `${fmt(getStock(row, info))} ${uom}`.trim(),
        },
        {
          label: "Commitment",
          value: money(commitment, currency),
        },
      ];
    }

    case "OI 003": {
      const plant = info?.plant ?? {}; // capacity, load, utilisation (kept for use)
      const quantity = orderQty(row);
      const commitment = quantity * num(row.Unit_Price);
      const capacityPerMc = num(info?.capacityPerMc);
      const capUom = plant.uom ?? "";

      return [
        {
          label: "Commitment",
          value: money(commitment, currency),
        },
        {
          label: "Stock",
          value: fmt(getStock(row, info)),
        },
        {
          label: "Added Capacity",
          value: `${fmt(capacityPerMc * quantity)} ${capUom}`.trim(),
        },
      ];
    }

    default:
      return [];
  }
};

// Render labels and corresponding values in aligned rows.
const ReviewItems = ({ items }) => {
  if (!items.length) return null;

  const columns = `repeat(${items.length}, minmax(0, 1fr))`;

  return (
    <Box sx={{ minWidth: 0 }}>
      <Box sx={{ display: "grid", gridTemplateColumns: columns, columnGap: 1 }}>
        {items.map((item) => (
          <Typography
            key={item.label}
            sx={{ ...masterTypo.caption, color: colors.subtitle, minWidth: 0 }}
          >
            {item.label}
          </Typography>
        ))}
      </Box>

      <Box sx={{ display: "grid", gridTemplateColumns: columns, columnGap: 1 }}>
        {items.map((item) => (
          <Typography
            key={item.label}
            sx={{
              ...masterTypo.body2,
              color: colors.title,
              fontWeight: 600,
              fontVariantNumeric: "tabular-nums",
              overflowWrap: "anywhere",
              minWidth: 0,
            }}
          >
            {item.value}
          </Typography>
        ))}
      </Box>
    </Box>
  );
};

const TeamPlanReview = ({
  tab,
  row,
  rows = [],
  info,
  unsaved = false,
  calculating = false,
}) => {
  const items = reviewItems(tab, row, rows, info);

  return (
    <Box
      component="section"
      aria-label="Plan Review"
      sx={{ ...layoutStyle.compactPanel, minWidth: 0 }}
    >
      {/* Review heading: same nested layout as Guide Card. */}
      <Box sx={layoutStyle.flexRow}>
        <Box sx={layoutStyle.flexRow}>
          <RateReviewOutlinedIcon sx={{ color: colors.accentBlue }} />
          <Typography sx={{ ...masterTypo.h6, color: colors.title }}>
            Plan Review
          </Typography>
        </Box>
      </Box>

      {/* Review figures for the selected item. */}
      {!row ? (
        <Typography sx={{ ...masterTypo.body2, color: colors.subtitle }}>
          Select a line to view review figures.
        </Typography>
      ) : calculating ? (
        <Typography sx={{ ...masterTypo.body2, color: colors.subtitle }}>
          Calculating plan...
        </Typography>
      ) : !items.length ? (
        <Typography sx={{ ...masterTypo.body2, color: colors.subtitle }}>
          No review figures available.
        </Typography>
      ) : (
        <ReviewItems items={items} />
      )}

      {unsaved && (
        <Typography sx={{ ...masterTypo.caption, color: colors.subtitle }}>
          Unsaved changes
        </Typography>
      )}
    </Box>
  );
};

export default TeamPlanReview;