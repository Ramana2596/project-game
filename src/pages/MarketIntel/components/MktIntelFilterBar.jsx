/**
 * Component Name: MktIntelFilterBar
 * Module: Market Intelligence
 * Purpose: Provides controls for filtering market intelligence records by month or category.
 * AI Tags: components, filter-bar, toolbar, search
 */

import React from 'react';
import { Box, TextField, MenuItem, Button } from '@mui/material';
import {
  layoutStyle,
  cardStyle,
  buttonStyle,
  tableStyle,
  colors,
  masterTypo
}
  from '../../../ux/styles';
import { MARKET_CATEGORIES } from '../constants/mktIntelConstants';
import RefreshIcon from '@mui/icons-material/Refresh';

export function MktIntelFilterBar({ queryParams, onFilterChange, onRefresh }) {
  return (
    <Box sx={layoutStyle.toolbar}>
      {/* Category Filter Dropdown */}
      <TextField
        select
        label="Filter by Category"
        size="small"
        value={queryParams.Category || ''}
        onChange={(e) => onFilterChange({ Category: e.target.value })}
        sx={{ minWidth: 220, background: '#FFFFFF', borderRadius: 2 }}
      >
        <MenuItem value=""><em>All Categories</em></MenuItem>
        {MARKET_CATEGORIES.map((cat) => (
          <MenuItem key={cat.id} value={cat.description}>{cat.description} ({cat.code})</MenuItem>
        ))}
      </TextField>

      {/* Refresh Data Action */}
      <Button 
        variant="outlined" 
        sx={buttonStyle.secondary} 
        startIcon={<RefreshIcon />}
        onClick={onRefresh}
      >
        Refresh Data
      </Button>
    </Box>
  );
}