import React from "react";
import { Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import { tableStyle, masterTypo } from "../../../ux/styles";
import { fmtBy } from "../utils/mrFormat";

// One generic table for the production and sales records
export function MrTable({ title, note, accent, cols, rows }) {
  return (
    <TableContainer sx={{ ...tableStyle.container, borderTop: `3px solid ${accent}` }}>
      <Typography sx={{ ...tableStyle.title, ...masterTypo.h5 }}>{title}</Typography>
      <Typography sx={{ ...tableStyle.parameters, ...masterTypo.caption }}>{note}</Typography>
      <Table size="small" sx={tableStyle.compact}>
        <TableHead sx={tableStyle.columnHeaderAccent(accent)}>
          <TableRow>
            {cols.map((c) => (
              <TableCell key={c.key} align={c.type === "text" ? "left" : "right"} sx={{ fontWeight: 600 }}>{c.label}</TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((r) => (
            <TableRow key={`${r.period}${r.product}`} sx={tableStyle.row}>
              {cols.map((c) => (
                <TableCell key={c.key} sx={{ ...tableStyle.cell, ...(c.type === "text" ? {} : tableStyle.numeric) }}>
                  {fmtBy(c.type, r[c.key], r.currency)}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Box sx={tableStyle.footer}>
        <Typography sx={masterTypo.caption}>{rows.length} product{rows.length === 1 ? "" : "s"}</Typography>
      </Box>
    </TableContainer>
  );
}