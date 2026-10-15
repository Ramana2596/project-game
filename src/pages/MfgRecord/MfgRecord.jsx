
/**
 * Component: MfgRecord
 * Module: Manufacturing Record
 * Purpose: Orchestrate manufacturing records for standalone and ReportDrawer deployment.
 * Author/Version: UXLab V1.1
 * AI Tags: manufacturing-record, production, sales, overview, uxlab
 */

import React, { useMemo, useState } from "react";
import { Box, Alert, LinearProgress } from "@mui/material";
import { useUser } from "../../core/access/userContext.jsx";
import { useMfgRecord } from "./hooks/useMfgRecord";
import { MrHeader } from "./components/MrHeader";
import { MrNav } from "./components/MrNav";
import { MrFilter } from "./components/MrFilter";
import { MrInsight } from "./components/MrInsight";
import { MrCard } from "./components/MrCard";
import { MrTable } from "./components/MrTable";
import { MR_PROD_COLS, MR_SALES_COLS } from "./constants/mrCols";
import { layoutStyle, colors } from "../../ux/styles";

const SHOW_FILTER = false;

// Render Manufacturing Record in standalone and ReportDrawer modes.
export default function MfgRecord({
  productionMonth,
  hideHeader = false,
}) {
  // Read the authenticated simulation context.
  const { userInfo } = useUser();

  // Initialize the selected reporting period.
  const [selectedMonth, setSelectedMonth] = useState(
    productionMonth || userInfo?.productionMonth || ""
  );

  // Build the API query from the current user context.
  const query = useMemo(() => {
    if (!userInfo?.gameId) return null;

    return {
      gameId: userInfo.gameId,
      gameBatch: userInfo.gameBatch,
      gameTeam: userInfo.gameTeam,
    };
  }, [userInfo]);

  // Load period, summary cards, records, filters, and loading/error state.
  const {
    period,
    months,
    cards,
    prodRows,
    salesRows,
    products,
    loading,
    error,
    activeTab,
    setActiveTab,
    filter,
    setFilter,
  } = useMfgRecord(query, selectedMonth);

  // Detect when the selected period has no records.
  const empty = !loading && !error && period && cards.length === 0;

  return (
    <Box sx={layoutStyle.root}>
      <Box sx={layoutStyle.pageContainer}>
        {/* Keep the period header in standalone mode only. */}
        {!hideHeader && (
          <MrHeader
            period={period}
            months={months}
            onMonthChange={setSelectedMonth}
          />
        )}

        {/* Keep record navigation and optional product filtering available. */}
        <Box sx={layoutStyle.toolbar}>
          <MrNav
            activeTab={activeTab}
            setActiveTab={setActiveTab}
          />

          {SHOW_FILTER && (
            <MrFilter
              filter={filter}
              setFilter={setFilter}
              products={products}
            />
          )}
        </Box>

        {/* Display loading, error, and empty-period feedback. */}
        {loading && <LinearProgress sx={{ mb: 2 }} />}

        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        {empty && (
          <Alert severity="info" sx={{ mb: 2 }}>
            No records for {period}. Choose another month.
          </Alert>
        )}

        {/* Show manufacturing insights and product cards on Overview. */}
        {activeTab === "overview" && cards.length > 0 && (
          <>
            <MrInsight cards={cards} />

            <Box
              sx={{
                display: "grid",
                gap: 2,
                gridTemplateColumns: {
                  xs: "1fr",
                  sm: "repeat(2, minmax(0, 1fr))",
                  lg: "repeat(3, minmax(0, 1fr))",
                },
              }}
            >
              {cards.map((card) => (
                <MrCard key={card.product} card={card} />
              ))}
            </Box>
          </>
        )}

        {/* Display production records for the selected period. */}
        {activeTab === "production" && (
          <MrTable
            title="Production Record"
            note={`Quantity accepted at each work centre in ${period}.`}
            accent={colors.accentBlue}
            cols={MR_PROD_COLS}
            rows={prodRows}
          />
        )}

        {/* Display sales records for the selected period. */}
        {activeTab === "sales" && (
          <MrTable
            title="Sales Record"
            note={`Demand, target and sales in ${period}.`}
            accent={colors.accentOrange}
            cols={MR_SALES_COLS}
            rows={salesRows}
          />
        )}
      </Box>
    </Box>
  );
}