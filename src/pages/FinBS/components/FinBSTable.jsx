/**
 * Component Name: FinBSTable
 * Module: Finance / FinBS
 * Purpose: Display the Balance Sheet as a period-by-period table with section bands, subtotals and totals.
 * Author/Version: UXLab / v1.1
 * AI Tags: table, finBS, balance sheet, statement, UOM, sticky columns, subtotal, section bands
 */

import React from "react";
import {
  Box,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import KeyboardArrowDownRoundedIcon from "@mui/icons-material/KeyboardArrowDownRounded";
import KeyboardArrowRightRoundedIcon from "@mui/icons-material/KeyboardArrowRightRounded";
import { masterTypo, tableStyle } from "../../../ux/styles";
import { accent, border, brand, state, surface, text } from "../../../ux/styles/colorPalette";
import { LINE_TYPES, ROW_TYPE, STATEMENT_SECTIONS } from "../constants/finBS.constants";
import { formatAmount, formatPeriodLabel } from "../utils/formatters";

// Widths of the fixed Details and UOM columns
const DETAILS_WIDTH = 280;
const UOM_WIDTH = 90;

// Hover tint drawn as an image so sticky cells keep their solid background
const HOVER_TINT = `linear-gradient(${accent.blue}0A, ${accent.blue}0A)`;

// Look of each row type: background, weight, text colour, top border and indent
const ROW_LOOK = {
  [ROW_TYPE.LINE]: { bg: surface.card, weight: 400, color: text.body, borderTop: "none", indent: 4 },
  [ROW_TYPE.SUBTOTAL]: { bg: surface.panel, weight: 600, color: text.heading, borderTop: `1px solid ${border.default}`, indent: 2 },
  [ROW_TYPE.TOTAL]: { bg: state.selected.background, weight: 700, color: brand.onPrimarySoft, borderTop: `2px solid ${brand.primary}`, indent: 2 },
};

// Find the statement section a line belongs to
const sectionOf = (lineNo) => STATEMENT_SECTIONS.find((s) => lineNo >= s.fromLine && lineNo <= s.toLine);

export default function FinBSTable({ rows, totalCount, periods, hiddenPeriodCount, isRefreshing, isTree, onToggle }) {
  // Count Details, UOM and period columns
  const columnCount = periods.length + 2;

  // Render one statement row
  const renderRow = (row) => {
    const look = ROW_LOOK[LINE_TYPES[row.lineNo] ?? ROW_TYPE.LINE];
    const isContra = /^less\s*:/i.test(row.details);
    const canToggle = isTree && row.hasChildren;
    const indent = isTree ? 2 + row.depth * 3 : look.indent;

    return (
      <TableRow
        key={row.lineNo}
        hover
        onClick={canToggle ? () => onToggle(row.lineNo) : undefined}
        sx={{
          cursor: canToggle ? "pointer" : "default",
          transition: tableStyle.row.transition,
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
            backgroundColor: look.bg,
            boxShadow: `inset -1px 0 0 ${border.divider}`,
            borderTop: look.borderTop,
            color: look.color,
            fontWeight: look.weight,
            fontStyle: isContra ? "italic" : "normal",
            pl: indent,
          }}
        >
          {isTree ? (
            <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
              {/* Drill-down arrow */}
              {row.hasChildren ? (
                <IconButton
                  size="small"
                  aria-label={`${row.isExpanded ? "Collapse" : "Expand"} ${row.details}`}
                  aria-expanded={row.isExpanded}
                  sx={{ p: 0.25, color: brand.primary }}
                >
                  {row.isExpanded ? <KeyboardArrowDownRoundedIcon fontSize="small" /> : <KeyboardArrowRightRoundedIcon fontSize="small" />}
                </IconButton>
              ) : (
                <Box sx={{ width: 24 }} />
              )}
              <span>{row.details}</span>
            </Box>
          ) : (
            row.details
          )}
        </TableCell>

        {/* Display the normalized unit of measure */}
        <TableCell
          sx={{
            ...tableStyle.cell,
            minWidth: UOM_WIDTH,
            whiteSpace: "nowrap",
            textAlign: "center",
            backgroundColor: look.bg,
            borderTop: look.borderTop,
            color: look.color,
            fontWeight: look.weight,
          }}
        >
          {row.uom || "—"}
        </TableCell>

        {/* Render the monthly values */}
        {periods.map((period) => {
          const value = row.values[period];
          return (
            <TableCell
              key={period}
              sx={{
                ...tableStyle.cell,
                ...tableStyle.numeric,
                minWidth: 140,
                borderTop: look.borderTop,
                color: value === null ? text.muted : look.color,
                fontWeight: look.weight,
              }}
            >
              {formatAmount(value)}
            </TableCell>
          );
        })}
      </TableRow>
    );
  };

  // Render a section band before the first visible line of each section
  const renderBody = () => {
    let lastSection = null;
    return rows.map((row) => {
      const section = sectionOf(row.lineNo);
      const showBand = section && section.key !== lastSection;
      lastSection = section ? section.key : lastSection;

      return (
        <React.Fragment key={row.lineNo}>
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
                <Box sx={{ position: "sticky", left: 16, display: "inline-block" }}>
                  {section.title}
                </Box>
              </TableCell>
            </TableRow>
          )}
          {renderRow(row)}
        </React.Fragment>
      );
    });
  };

  // Render the table
  return (
    <Box sx={{ ...tableStyle.container, opacity: isRefreshing ? 0.6 : 1, transition: "opacity .2s ease" }}>
      {/* Line count and hidden periods */}
      <Box sx={{ display: "flex", justifyContent: "space-between", gap: 2, px: 2, pt: 1.5, pb: 1 }}>
        <Typography sx={{ ...masterTypo.caption, fontWeight: 700, color: text.subtitle }}>
          {rows.length === totalCount ? `${totalCount} lines` : `Showing ${rows.length} of ${totalCount} lines`}
        </Typography>
        {hiddenPeriodCount > 0 && (
          <Typography sx={{ ...masterTypo.caption, color: text.subtitle }}>
            {hiddenPeriodCount} empty {hiddenPeriodCount === 1 ? "period" : "periods"} hidden
          </Typography>
        )}
      </Box>

      <TableContainer sx={{ maxHeight: "70vh" }}>
        {/* Compact rows with a sticky header */}
        <Table stickyHeader size="small" aria-label="Balance sheet" sx={{ borderCollapse: "separate", ...tableStyle.compact }}>
          <TableHead sx={tableStyle.columnHeader}>
            <TableRow>
              <TableCell
                sx={{
                  position: "sticky",
                  left: 0,
                  zIndex: 3,
                  minWidth: DETAILS_WIDTH,
                  textAlign: "left",
                }}
              >
                Details
              </TableCell>
              <TableCell sx={{ textAlign: "center", whiteSpace: "nowrap", minWidth: UOM_WIDTH }}>
                UOM
              </TableCell>
              {periods.map((period) => (
                <TableCell key={period} sx={{ textAlign: "right", whiteSpace: "nowrap", minWidth: 140 }}>
                  {formatPeriodLabel(period)}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.length ? (
              renderBody()
            ) : (
              <TableRow>
                <TableCell colSpan={columnCount} sx={{ ...tableStyle.cell, textAlign: "center", py: 4, color: text.subtitle }}>
                  No lines match your search. Clear the search or choose All lines.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}