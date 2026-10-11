/**
 * Component Name: FinCFTable
 * Module: Finance / FinCF
 * Purpose: Display the Cash Flow Statement as a period-by-period table with section bands, subtotals and totals.
 * Author/Version: UXLab / v4.0 (layout mirrors FinBSTable)
 * AI Tags: table, finCF, cash flow, statement, sticky columns, subtotal, section bands
 */

import React, { useMemo, useState } from "react";
import { Box, CircularProgress, IconButton, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import KeyboardArrowDownRoundedIcon from "@mui/icons-material/KeyboardArrowDownRounded";
import KeyboardArrowRightRoundedIcon from "@mui/icons-material/KeyboardArrowRightRounded";
import { masterTypo, tableStyle } from "../../../ux/styles";
import { accent, border, brand, state, surface, text } from "../../../ux/styles/colorPalette";
import {
  CASH_FLOW_DEFAULT_EXPANDED_LINES,
  CASH_FLOW_LINE_CHILDREN,
  CASH_FLOW_ROOT_LINES,
  CASH_FLOW_SECTIONS,
  CASH_FLOW_SUBTOTAL_LINES,
  CASH_FLOW_TOTAL_LINES,
} from "../constants/finCFConstants";
import { formatAmount, formatPeriodLabel } from "../utils/finCFFormatters";

// Width of the sticky "Details" column
const DETAILS_WIDTH = 280;

// Lines that close the statement (net cash flow, closing cash) get the strongest look
const KEY_TOTAL_LINES = [49, 51];

// Hover tint drawn as an image so sticky cells keep their solid background
const HOVER_TINT = `linear-gradient(${accent.blue}0A, ${accent.blue}0A)`;

// Row types
const ROW_TYPE = { LINE: "line", SUBTOTAL: "subtotal", TOTAL: "total" };

// Look of each row type: background, weight, text colour, top border and indent
const ROW_LOOK = {
  [ROW_TYPE.LINE]: { bg: surface.card, weight: 400, color: text.body, borderTop: "none", indent: 4 },
  [ROW_TYPE.SUBTOTAL]: { bg: surface.panel, weight: 600, color: text.heading, borderTop: `1px solid ${border.default}`, indent: 2 },
  [ROW_TYPE.TOTAL]: { bg: state.selected.background, weight: 700, color: brand.onPrimarySoft, borderTop: `2px solid ${brand.primary}`, indent: 2 },
};

// Row type from line number
const rowTypeOf = (lineNo) => {
  if (KEY_TOTAL_LINES.includes(lineNo)) return ROW_TYPE.TOTAL;
  if (CASH_FLOW_SUBTOTAL_LINES.has(lineNo) || CASH_FLOW_TOTAL_LINES.has(lineNo)) return ROW_TYPE.SUBTOTAL;
  return ROW_TYPE.LINE;
};

// Find the statement section a line belongs to
const sectionOf = (lineNo) => CASH_FLOW_SECTIONS.find((s) => lineNo >= s.startLine && lineNo <= s.endLine);

// Raw value to number, or null when empty / invalid
const toAmount = (value) => {
  if (value === "" || value == null) return null;
  const n = Number(value);
  return Number.isFinite(n) ? n : null;
};

export default function FinCFTable({
  rows = [],
  totalCount,
  periods = [],
  hiddenPeriodCount = 0,
  loading = false,
  isRefreshing = false,
  isTree = true, // true: expandable hierarchy; false: flat list in line order
}) {
  // State: lines currently expanded
  const [expanded, setExpanded] = useState(() => new Set(CASH_FLOW_DEFAULT_EXPANDED_LINES));

  // Derived values
  const columnCount = periods.length + 1;
  const total = totalCount ?? rows.length;
  const dimmed = isRefreshing || (loading && rows.length > 0);

  // Look-up of incoming rows by line number
  const rowByLine = useMemo(() => new Map(rows.map((r) => [Number(r?.Line_No), r])), [rows]);

  // Visible rows in display order, with depth and expansion info
  const visibleRows = useMemo(() => {
    if (!isTree) {
      return rows.map((row, i) => ({
        key: `${row?.Line_No}-${i}`,
        lineNo: Number(row?.Line_No),
        row,
        depth: 0,
        hasChildren: false,
        isExpanded: false,
      }));
    }
    const out = [];
    const walk = (lineNo, depth, path) => {
      const row = rowByLine.get(lineNo);
      if (!row) return;
      const children = (CASH_FLOW_LINE_CHILDREN[lineNo] || []).filter((c) => rowByLine.has(c));
      const key = `${path}/${lineNo}`;
      const isOpen = expanded.has(lineNo);
      out.push({ key, lineNo, row, depth, hasChildren: children.length > 0, isExpanded: isOpen });
      if (isOpen) children.forEach((c) => walk(c, depth + 1, key));
    };
    CASH_FLOW_ROOT_LINES.forEach((l) => walk(l, 0, "r"));
    return out;
  }, [isTree, rows, rowByLine, expanded]);

  // Toggle one parent line
  const toggle = (lineNo) =>
    setExpanded((prev) => {
      const next = new Set(prev);
      if (next.has(lineNo)) next.delete(lineNo);
      else next.add(lineNo);
      return next;
    });

  // Render one statement row
  const renderRow = ({ key, lineNo, row, depth, hasChildren, isExpanded }) => {
    const look = ROW_LOOK[rowTypeOf(lineNo)];
    const details = row?.Details ?? "—";
    const isContra = /^less\s*:/i.test(String(details));
    const canToggle = isTree && hasChildren;
    const indent = isTree ? 2 + depth * 3 : look.indent;

    return (
      <TableRow
        key={key}
        hover
        onClick={canToggle ? () => toggle(lineNo) : undefined}
        sx={{
          cursor: canToggle ? "pointer" : "default",
          transition: tableStyle.row?.transition,
          backgroundColor: look.bg,
          "&:nth-of-type(even)": { backgroundColor: look.bg },
          "&.MuiTableRow-hover:hover": { backgroundColor: look.bg },
          "&:hover, &:hover .sticky-cell": { backgroundImage: HOVER_TINT },
        }}
      >
        <TableCell
          className="sticky-cell"
          sx={{
            ...tableStyle.cell,
            position: "sticky",
            left: 0,
            zIndex: 1,
            minWidth: DETAILS_WIDTH,
            backgroundColor: "inherit",
            boxShadow: `inset -1px 0 0 ${border.divider}`,
            borderTop: look.borderTop,
            color: look.color,
            fontWeight: look.weight,
            fontStyle: isContra ? "italic" : "normal",
            pl: indent,
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
            {/* Drill-down arrow */}
            {isTree &&
              (hasChildren ? (
                <IconButton
                  size="small"
                  aria-label={`${isExpanded ? "Collapse" : "Expand"} ${details}`}
                  aria-expanded={isExpanded}
                  sx={{ p: 0.25, color: brand.primary }}
                >
                  {isExpanded ? <KeyboardArrowDownRoundedIcon fontSize="small" /> : <KeyboardArrowRightRoundedIcon fontSize="small" />}
                </IconButton>
              ) : (
                <Box sx={{ width: 24, flexShrink: 0 }} />
              ))}
            {/* Line number kept small and muted so it never competes with the label */}
            <Typography component="span" sx={{ ...masterTypo.caption, color: text.muted, minWidth: 20, fontWeight: 400, fontStyle: "normal" }}>
              {lineNo}
            </Typography>
            <span>{details}</span>
          </Box>
        </TableCell>

        {periods.map((period) => {
          const amount = toAmount(row?.[period]);
          return (
            <TableCell
              key={period}
              sx={{
                ...tableStyle.cell,
                ...tableStyle.numeric,
                minWidth: 140,
                whiteSpace: "nowrap",
                fontVariantNumeric: "tabular-nums",
                borderTop: look.borderTop,
                color: amount === null ? text.muted : look.color,
                fontWeight: look.weight,
              }}
            >
              {amount === null ? "—" : formatAmount(amount)}
            </TableCell>
          );
        })}
      </TableRow>
    );
  };

  // Render the body: a section band before the first top-level line of each section
  const renderBody = () => {
    let lastSection = null;
    return visibleRows.map((item) => {
      const section = item.depth === 0 ? sectionOf(item.lineNo) : null;
      const showBand = section && section.id !== lastSection;
      if (section) lastSection = section.id;
      return (
        <React.Fragment key={item.key}>
          {showBand && (
            <TableRow>
              <TableCell
                colSpan={columnCount}
                sx={{
                  ...tableStyle.cell,
                  ...masterTypo.h6,
                  background: state.selected.background,
                  color: brand.primaryDark,
                }}
              >
                <Box sx={{ position: "sticky", left: 16, display: "inline-block" }}>{section.label}</Box>
              </TableCell>
            </TableRow>
          )}
          {renderRow(item)}
        </React.Fragment>
      );
    });
  };

  // Render
  return (
    <Box sx={{ ...tableStyle.container, opacity: dimmed ? 0.6 : 1, transition: "opacity .2s ease" }}>
      {/* Line count and hidden periods */}
      <Box sx={{ display: "flex", justifyContent: "space-between", gap: 2, px: 2, pt: 1.5, pb: 1 }}>
        <Typography sx={{ ...masterTypo.caption, fontWeight: 700, color: text.subtitle }}>
          {visibleRows.length === total ? `${total} lines` : `Showing ${visibleRows.length} of ${total} lines`}
        </Typography>
        {hiddenPeriodCount > 0 && (
          <Typography sx={{ ...masterTypo.caption, color: text.subtitle }}>
            {hiddenPeriodCount} empty {hiddenPeriodCount === 1 ? "period" : "periods"} hidden
          </Typography>
        )}
      </Box>

      <TableContainer sx={{ maxHeight: "70vh" }}>
        {/* Makes the table rows smaller and tighter */}
        <Table stickyHeader size="small" aria-label="Cash flow statement" sx={{ borderCollapse: "separate", ...tableStyle.compact }}>
          <TableHead sx={tableStyle.columnHeader}>
            <TableRow>
              <TableCell sx={{ position: "sticky", left: 0, zIndex: 3, minWidth: DETAILS_WIDTH, textAlign: "left" }}>Details</TableCell>
              {periods.map((period) => (
                <TableCell key={period} sx={{ textAlign: "right", whiteSpace: "nowrap", minWidth: 140 }}>
                  {formatPeriodLabel(period)}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {loading && rows.length === 0 ? (
              <TableRow>
                <TableCell colSpan={columnCount} sx={{ ...tableStyle.cell, textAlign: "center", py: 5 }}>
                  <CircularProgress size={28} />
                  <Typography sx={{ ...masterTypo.body2, color: text.subtitle, mt: 1 }}>Loading cash-flow data…</Typography>
                </TableCell>
              </TableRow>
            ) : visibleRows.length ? (
              renderBody()
            ) : (
              <TableRow>
                <TableCell colSpan={columnCount} sx={{ ...tableStyle.cell, textAlign: "center", py: 4, color: text.subtitle }}>
                  No cash-flow data matches the selected filters.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}