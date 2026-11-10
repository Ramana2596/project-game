// File: src/pages/TeamPlan/components/TeamPlanSummary.jsx
// Purpose: Summarize planned items and financial values in the active tab.

import React from "react";
import { Box, Typography } from "@mui/material";
import AssessmentOutlinedIcon from "@mui/icons-material/AssessmentOutlined";

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

// Ordered quantity on Material / Machine lines.
// Required_Quantity 0 = "Not ordering now"; otherwise Quantity from the selected price.
// Same rule as TeamPlanReview.
const orderQty = (row) => {
  const required = row?.Required_Quantity;
  const entered =
    required !== null && required !== undefined && String(required).trim() !== "";
  return entered && num(required) === 0 ? 0 : num(row?.Quantity);
};

// Identify a quantity row.
const isId = (row, id) =>
  String(row?.Quantity_Id ?? "").trim().toUpperCase() === id;

// Distinct Part_No values.
const distinctParts = (rows) =>
  new Set(
    rows
      .filter((row) => row.Part_No !== null && row.Part_No !== undefined)
      .map((row) => String(row.Part_No).trim())
      .filter(Boolean)
  );

// Count distinct planned Part_No values against all distinct Part_No values.
const plannedCount = (rows, isPlanned) => {
  const allParts = distinctParts(rows);
  const plannedParts = distinctParts(rows.filter(isPlanned));

  return `${fmt(plannedParts.size)} / ${fmt(allParts.size)}`;
};

// Format a monetary value using the common currency.
const money = (value, currency) => {
  const amount = num(value).toLocaleString("en-IN", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  return currency ? `${currency} ${amount}` : amount;
};

// Get the common currency from the active tab rows.
const getCurrency = (rows) =>
  String(rows.find((row) => row.Currency)?.Currency ?? "").trim();

// Sum of Quantity x Unit_Price.
const sumValue = (rows) =>
  rows.reduce((total, row) => total + num(row.Quantity) * num(row.Unit_Price), 0);

// Sum of ordered quantity x Unit_Price (Material / Machine tabs).
const sumCommitment = (rows) =>
  rows.reduce((total, row) => total + orderQty(row) * num(row.Unit_Price), 0);

// Prepare summary figures for the active tab.
const summaryItems = (tab, rows, currency) => {
  if (!rows.length) return { planned: "", items: [] };

  switch (tab) {
    case "OI 001": {
      const productionRows = rows.filter((row) => isId(row, QTY_ID.production));
      const salesRows = rows.filter((row) => isId(row, QTY_ID.sales));

      return {
        planned: plannedCount(productionRows, (row) => num(row.Quantity) > 0),
        items: [
          {
            label: "Production Value",
            value: money(sumValue(productionRows), currency),
          },
          {
            label: "Sales Value",
            value: money(sumValue(salesRows), currency),
          },
        ],
      };
    }

    case "OI 002":
    case "OI 003":
      return {
        planned: plannedCount(rows, (row) => num(row.Required_Quantity) > 0),
        items: [
          {
            label: "Commitment",
            value: money(sumCommitment(rows), currency),
          },
        ],
      };

    default:
      return { planned: "", items: [] };
  }
};

// Render summary labels and their corresponding values.
const SummaryItems = ({ items }) => {
  const columns = `repeat(${items.length}, minmax(0, 1fr))`;

  return (
    <Box sx={{ minWidth: 0 }}>
      <Box sx={{ display: "grid", gridTemplateColumns: columns }}>
        {items.map((item) => (
          <Typography
            key={item.label}
            sx={{ ...masterTypo.caption, color: colors.subtitle }}
          >
            {item.label}
          </Typography>
        ))}
      </Box>

      <Box sx={{ display: "grid", gridTemplateColumns: columns }}>
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

const TeamPlanSummary = ({ tab, rows = [] }) => {
  const accent = colors.accentBlue;
  const currency = getCurrency(rows);
  const { planned, items } = summaryItems(tab, rows, currency);

  return (
    <Box
      component="section"
      aria-label="Plan Summary"
      sx={{ ...layoutStyle.compactPanel, minWidth: 0 }}
    >
      {/* Heading and right-aligned planned count. */}
      <Box sx={{ ...layoutStyle.flexRow, justifyContent: "space-between" }}>
        <Box sx={layoutStyle.flexRow}>
          <AssessmentOutlinedIcon sx={{ color: accent }} />
          <Typography sx={{ ...masterTypo.h6, color: colors.title }}>
            Plan Summary
          </Typography>
        </Box>

        {planned !== "" && (
          <Typography
            sx={{
              ...masterTypo.body2,
              color: colors.title,
              fontWeight: 600,
              fontVariantNumeric: "tabular-nums",
              whiteSpace: "nowrap",
            }}
          >
            Planned {planned}
          </Typography>
        )}
      </Box>

      {/* Summary of all items in the active tab. */}
      {!rows.length ? (
        <Typography sx={{ ...masterTypo.body2, color: colors.subtitle }}>
          No plan rows available.
        </Typography>
      ) : !items.length ? (
        <Typography sx={{ ...masterTypo.body2, color: colors.subtitle }}>
          No summary figures available.
        </Typography>
      ) : (
        <SummaryItems items={items} />
      )}
    </Box>
  );
};

export default TeamPlanSummary;