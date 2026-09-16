
// ============================================================
// Component: StrategyTable
// Module: StrategyBank
// Purpose: Display Strategy Bank reference strategies and impacts
// AI Tags: strategy-bank, table, strategy, benefit, impact
// ============================================================

import React from "react";
import {
  Box,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Chip,
} from "@mui/material";
import { tableStyle, colors } from "../../../ux/styles";
import {
  TABLE_COLUMNS,
  OUTCOME_META,
  CHOICE_GROUP_COLORS,
} from "../constants/constants";
import { computeImpact, formatAmount } from "../utils/strategyBankUtils";

function ChoiceBadge({ value }) {
  // Render the mutually exclusive strategy group badge.
  if (!value) {
    return (
      <Chip
        size="small"
        label="—"
        sx={{
          height: 24,
          bgcolor: "action.disabledBackground",
        }}
      />
    );
  }

  const color = CHOICE_GROUP_COLORS[value] || colors.primary;

  return (
    <Chip
      size="small"
      label={value}
      sx={{
        height: 24,
        bgcolor: `${color}1A`,
        color,
        fontWeight: 700,
      }}
    />
  );
}

function OutcomePill({ value }) {
  // Display the actual Resultant value and wrap long outcomes.
  const meta = OUTCOME_META[value];
  const color = meta?.color || colors.primary;

  return (
    <Chip
      size="small"
      label={value || "—"}
      sx={{
        bgcolor: `${color}1A`,
        color,
        fontWeight: 700,
        height: "auto",
        maxWidth: 115,
        "& .MuiChip-label": {
          display: "block",
          whiteSpace: "normal",
          lineHeight: 1.15,
          py: 0.4,
          px: 0.8,
        },
      }}
    />
  );
}

export default function StrategyTable({
  rows,
  onHeaderSort,
  loading,
  error,
}) {
  // Render the compact Strategy Bank reference table.
  return (
    <Box sx={tableStyle.container}>
      {/* Render a dense table with minimal horizontal spacing. */}
      <Box sx={{ overflowX: "auto" }}>
        <Table
          size="small"
          sx={{
            minWidth: 0,
            width: "100%",
            "& .MuiTableCell-root": {
              px: 0.75,
              py: 0.75,
            },
          }}
        >
          <TableHead>
            {/* Show the current reference count without adding a footer. */}
            <TableRow>
              <TableCell
                colSpan={TABLE_COLUMNS.length}
                sx={{
                  ...tableStyle.cell,
                  py: 0.5,
                  color: colors.subtitle,
                  fontSize: "0.75rem",
                  fontWeight: 600,
                  borderBottom: "none",
                }}
              >
                {loading
                  ? "Loading strategies…"
                  : error
                  ? error
                  : `${rows.length} strategies referenced`}
              </TableCell>
            </TableRow>

            {/* Render compact table column headings. */}
            <TableRow sx={tableStyle.columnHeader}>
              {TABLE_COLUMNS.map((col) => (
                <TableCell
                  key={col.key}
                  align={col.numeric ? "right" : "left"}
                  onClick={() => onHeaderSort && onHeaderSort(col.key)}
                  sx={{
                    cursor: onHeaderSort ? "pointer" : "default",
                    whiteSpace: "normal",
                    lineHeight: 1.15,
                    px: 0.75,
                  }}
                  aria-label={
                    onHeaderSort ? `Sort by ${col.label}` : undefined
                  }
                >
                  {col.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>

          {/* Render empty state or strategy rows. */}
          <TableBody>
            {!loading && !error && rows.length === 0 && (
              <TableRow>
                <TableCell
                  colSpan={TABLE_COLUMNS.length}
                  sx={{
                    py: 4,
                    textAlign: "center",
                    color: colors.subtitle,
                  }}
                >
                  No strategies match this search or filter. Try a different
                  keyword or choose "All groups."
                </TableCell>
              </TableRow>
            )}

            {!loading &&
              !error &&
              rows.map((r) => {
                const impact = computeImpact(r);

                return (
                  <TableRow key={r.S_No} sx={tableStyle.row}>
                    <TableCell sx={tableStyle.cell}>
                      {r.S_No}
                    </TableCell>

                    <TableCell
                      sx={{
                        ...tableStyle.cell,
                        fontWeight: 600,
                        whiteSpace: "normal",
                        maxWidth: 170,
                      }}
                    >
                      {r.Strategy}
                    </TableCell>

                    <TableCell
                      sx={{
                        ...tableStyle.cell,
                        whiteSpace: "normal",
                      }}
                    >
                      {r.Category_Name}
                    </TableCell>

                    <TableCell
                      sx={{
                        ...tableStyle.cell,
                        whiteSpace: "normal",
                        maxWidth: 170,
                      }}
                    >
                      {r.Benefit}
                    </TableCell>

                    <TableCell sx={tableStyle.cell}>
                      <ChoiceBadge value={r.Mutual_X_Group} />
                    </TableCell>

                    <TableCell sx={tableStyle.cell}>
                      {r.Cost_Type}
                    </TableCell>

                    <TableCell sx={tableStyle.cell}>
                      {r.UOM}
                    </TableCell>

                    <TableCell
                      sx={{
                        ...tableStyle.cell,
                        ...tableStyle.numeric,
                        whiteSpace: "nowrap",
                      }}
                    >
                      {formatAmount(r)}
                    </TableCell>

                    <TableCell sx={tableStyle.cell}>
                      {r.Milestone_Month}
                    </TableCell>

                    {/* Keep Outcome narrow and wrap long values. */}
                    <TableCell
                      sx={{
                        ...tableStyle.cell,
                        minWidth: 75,
                        maxWidth: 115,
                        whiteSpace: "normal",
                        verticalAlign: "middle",
                      }}
                    >
                      <OutcomePill value={r.Resultant} />
                    </TableCell>

                    <TableCell
                      sx={{
                        ...tableStyle.cell,
                        whiteSpace: "nowrap",
                      }}
                    >
                      {r.From_Month_No}
                    </TableCell>

                    <TableCell
                      sx={{
                        ...tableStyle.cell,
                        ...tableStyle.numeric,
                        whiteSpace: "nowrap",
                      }}
                    >
                      {r.Duration_Month}
                    </TableCell>

                    <TableCell
                      sx={{
                        ...tableStyle.cell,
                        ...tableStyle.numeric,
                        color: colors.success,
                        fontWeight: 700,
                        whiteSpace: "nowrap",
                      }}
                    >
                      {r.Gain_Norm}%
                    </TableCell>

                    <TableCell
                      sx={{
                        ...tableStyle.cell,
                        ...tableStyle.numeric,
                        color: colors.error,
                        fontWeight: 700,
                        whiteSpace: "nowrap",
                      }}
                    >
                      {r.Loss_Norm}%
                    </TableCell>

                    <TableCell
                      sx={{
                        ...tableStyle.cell,
                        ...tableStyle.numeric,
                        fontWeight: 700,
                        whiteSpace: "nowrap",
                      }}
                    >
                      {impact}%
                    </TableCell>
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </Box>
    </Box>
  );
}
