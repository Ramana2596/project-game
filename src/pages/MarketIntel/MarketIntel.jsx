
/**
 * Component Name: MarketIntel
 * Module: Market Intelligence
 * Purpose: Main screen for market intelligence in standalone and ReportDrawer modes.
 * Author/Version: UXLab V1.1
 * AI Tags: market-intelligence, dashboard, orchestration
 */

import React from "react";
import { Box, Typography } from "@mui/material";
import { layoutStyle, colors, masterTypo } from "../../ux/styles";
import { useMarketIntel } from "./hooks/useMarketIntel";
import { MktIntelOverview } from "./components/MktIntelOverview";
import { MktIntelTable } from "./components/MktIntelTable";

// Render Market Intelligence in standalone and ReportDrawer modes.
export default function MarketIntel({
  productionMonth,
  hideHeader = false,
}) {
  // Load market intelligence data and active category filters.
  const {
    data,
    loading,
    queryParams,
    updateFilters,
  } = useMarketIntel(productionMonth);

  return (
    <Box sx={layoutStyle.root}>
      <Box sx={layoutStyle.pageContainer}>
        {/* Show the page heading only in standalone mode. */}
        {!hideHeader && (
          <Box sx={{ ...layoutStyle.pageHeader, mb: 1.5 }}>
            <Typography
              component="h1"
              sx={{
                ...masterTypo.h3,
                color: colors.title,
              }}
            >
              Market Intelligence
            </Typography>

            <Typography
              sx={{
                ...masterTypo.bodyB1,
                color: colors.body,
                mt: 0.25,
              }}
            >
              Monitor product demand, raw material and pricing dynamics.
            </Typography>
          </Box>
        )}

        {/* Display category summaries and retain category selection. */}
        <MktIntelOverview
          data={data}
          selectedCategory={queryParams.Category}
          onSelectCategory={(category) =>
            updateFilters({ Category: category })
          }
        />

        {/* Display market details for the selected category and period. */}
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