
/**
 * Component Name: MarketIntel
 * Module: Market Intelligence
 * Purpose: Main screen for market intelligence overview and details.
 * AI Tags: market-intelligence, dashboard, orchestration
 */

import React from 'react';
import { Box, Typography } from '@mui/material';
import { layoutStyle, colors, masterTypo } from '../../ux/styles';
import { useMarketIntel } from './hooks/useMarketIntel';
import { MktIntelOverview } from './components/MktIntelOverview';
import { MktIntelTable } from './components/MktIntelTable';

export default function MarketIntel({ productionMonth }) {
  const { data, loading, queryParams, updateFilters } = useMarketIntel(productionMonth);

  return (
    <Box sx={layoutStyle.root}>
      <Box sx={layoutStyle.pageContainer}>
        {/* Page Header */}
        <Box sx={{ ...layoutStyle.pageHeader, mb: 1.5 }}>
          <Typography sx={masterTypo.h3}>
            Market Intelligence
          </Typography>
          <Typography sx={{ ...masterTypo.bodyB1, color: colors.body, mt: 0.25 }}>
            Monitor product demand, raw material and pricing dynamics.
          </Typography>
        </Box>

        {/* Category Overview */}
        <MktIntelOverview
          data={data}
          selectedCategory={queryParams.Category}
          onSelectCategory={(category) => updateFilters({ Category: category })}
        />

        {/* Market Details */}
        <Box sx={{ mt: 1.5 }}>
          <MktIntelTable
            data={data}
            loading={loading}
            selectedCategory={queryParams.Category}
            productionMonth={productionMonth}
          />
        </Box>
      </Box>
    </Box>
  );
}
