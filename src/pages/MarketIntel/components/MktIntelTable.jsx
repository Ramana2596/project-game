
/**
 * Component Name: MarketIntelTable
 * Module: Market Intelligence
 * Purpose: Renders market input details with category filtering.
 * AI Tags: market-intelligence, table, filter, report
 */

import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Box
} from '@mui/material';
import { tableStyle, colors, masterTypo } from '../../../ux/styles';
import { TABLE_COLUMNS } from '../constants/mktIntelConstants';

export function MktIntelTable({
  data = [],
  loading = false,
  selectedCategory = '',
  productionMonth = null
}) {
  const filteredData = selectedCategory
    ? data.filter(row =>
        (row.Category?.trim() || '').toLowerCase() === selectedCategory.trim().toLowerCase()
      )
    : data;

  const recordCount = filteredData.length;

  const monthLabel = productionMonth
    ? new Date(productionMonth).toLocaleDateString('en-US', {
        month: 'short',
        year: 'numeric'
      })
    : '';

  return (
    <TableContainer component={Paper} sx={tableStyle.container}>
      <Box sx={{ px: 1.5, py: 1, borderBottom: `1px solid ${colors.divider}` }}>
        <Typography sx={tableStyle.title}>
          Market Input Details (Team: {data[0]?.Team || 'N/A'})
        </Typography>
        <Typography sx={{ ...masterTypo.bodyB2, color: colors.muted, mt: 0.25 }}>
          {selectedCategory || 'All Categories'} ({recordCount}) ·{' '}
          {productionMonth
            ? `Showing market inputs and purchase factors for ${monthLabel}`
            : 'Showing market inputs and purchase factors till current simulation period'}
        </Typography>
      </Box>

      <Table>
        <TableHead sx={tableStyle.columnHeader}>
          <TableRow>
            {TABLE_COLUMNS.map(col => (
              <TableCell
                key={col.id}
                sx={col.numeric ? { textAlign: 'right' } : {}}
              >
                {col.label}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>

        <TableBody>
          {loading ? (
            <TableRow>
              <TableCell
                colSpan={TABLE_COLUMNS.length}
                sx={{ textAlign: 'center', py: 4 }}
              >
                Loading market intelligence data...
              </TableCell>
            </TableRow>
          ) : recordCount === 0 ? (
            <TableRow>
              <TableCell
                colSpan={TABLE_COLUMNS.length}
                sx={{
                  textAlign: 'center',
                  py: 4,
                  color: colors.muted
                }}
              >
                No market intelligence records found for this category.
              </TableCell>
            </TableRow>
          ) : (
            filteredData.map((row, index) => (
              <TableRow key={index} sx={tableStyle.row}>
                <TableCell sx={tableStyle.cell}>{row.Period}</TableCell>
                <TableCell sx={tableStyle.cell}>{row.Category}</TableCell>
                <TableCell sx={{
                  ...tableStyle.cell,
                  fontWeight: 600,
                  color: colors.title
                }}>
                  {row.Part_Description}
                </TableCell>
                <TableCell sx={tableStyle.cell}>{row.Market_Info}</TableCell>
                <TableCell sx={tableStyle.cell}>{row.UOM}</TableCell>
                <TableCell sx={{
                  ...tableStyle.cell,
                  ...tableStyle.numeric
                }}>
                  {row.Quantity}
                </TableCell>
                <TableCell sx={{
                  ...tableStyle.cell,
                  ...tableStyle.numeric
                }}>
                  {row.Addl_Demand ?? 0}
                </TableCell>
                <TableCell sx={{
                  ...tableStyle.cell,
                  ...tableStyle.numeric,
                  fontWeight: 700
                }}>
                  {row.Total_Demand}
                </TableCell>
                <TableCell sx={{
                  ...tableStyle.cell,
                  ...tableStyle.numeric
                }}>
                  {row.Unit_Price}
                </TableCell>
                <TableCell sx={tableStyle.cell}>{row.Currency}</TableCell>
                <TableCell sx={tableStyle.cell}>{row.Price_Info}</TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
