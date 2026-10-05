// Component: SrResultTable
// Module: StrategyResults
// Purpose: render detailed result data for the selected result view
// Author/Version: OpsMgt UX Lab / v2.0
// AI Tags: strategy, results, table, drill-down

import React from "react";
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { colors, tableStyle } from "../../../../ux/styles";
import { fmtNum, isNil, NIL } from "../../utils/srFormat";

export default function SrResultTable({
  title,
  note,
  accent = colors.primary,
  cols,
  rows,
}) {
  const cellText = (column, row) => {
    if (column.fmt) {
      return column.fmt(row[column.id], row);
    }

    return isNil(row[column.id])
      ? NIL
      : String(row[column.id]);
  };

  return (
    <TableContainer
      sx={{
        ...tableStyle.container,
        borderTop: `3px solid ${accent}`,
      }}
    >
      <Typography sx={tableStyle.title}>
        {title}
      </Typography>

      <Typography sx={tableStyle.parameters}>
        {note}
      </Typography>

      <Table
        stickyHeader
        size="small"
        aria-label={title}
      >
        <TableHead>
          <TableRow sx={tableStyle.columnHeaderAccent(accent)}>
            {cols.map((column) => (
              <TableCell
                key={column.id}
                align={column.num ? "right" : "left"}
              >
                {column.label}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>

        <TableBody>
          {rows.length === 0 && (
            <TableRow>
              <TableCell
                colSpan={cols.length}
                sx={tableStyle.cell}
              >
                No records in this view.
              </TableCell>
            </TableRow>
          )}

          {rows.map((row) => (
            <TableRow
              key={row.rowId}
              sx={tableStyle.row}
            >
              {cols.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.num ? "right" : "left"}
                  sx={{
                    ...tableStyle.cell,
                    ...(column.num ? tableStyle.numeric : {}),
                  }}
                >
                  {cellText(column, row)}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <Box sx={tableStyle.footer}>
        <Typography variant="caption">
          {`${fmtNum(rows.length)} records`}
        </Typography>
      </Box>
    </TableContainer>
  );
}