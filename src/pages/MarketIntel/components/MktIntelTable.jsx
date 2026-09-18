
/**
 * Component Name: MarketIntelTable
 * Module: Market Intelligence
 * Purpose: Renders enterprise table with selected-category filtering and record count.
 * AI Tags: components, table, data-grid, report, filter, market-intel
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
  selectedCategory = ''
}) {
  const filteredData = selectedCategory
    ? data.filter(row => {
        const rowCategory = row.Category?.trim() || '';
        return rowCategory.toLowerCase() === selectedCategory.trim().toLowerCase();
      })
    : data;

  const recordCount = filteredData.length;

  return (
    <TableContainer component={Paper} sx={tableStyle.container}>
      

      <Box sx={{
        display: 'flex',
        alignItems: 'center',
        gap: 0.75,
        px: 1.5,
        py: 0.5
      }}>
        <Typography sx={masterTypo.bodyB1}>
          {selectedCategory || 'All Categories'}
        </Typography>
        <Typography sx={{
          color: colors.primary,
          fontWeight: 700
        }}>
          ({recordCount})
        </Typography>
      </Box>

      <Box sx={tableStyle.parameters}>
        Showing Info till current simulation period
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
