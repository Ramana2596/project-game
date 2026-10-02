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

const SHOW_FILTER = false; // product filter switched off for now

export default function MfgRecord({ productionMonth }) {
  const { userInfo } = useUser();
  const [selectedMonth, setSelectedMonth] = useState(productionMonth || userInfo?.productionMonth || "");

  // Build API query from current user
  const query = useMemo(() => {
    if (!userInfo?.gameId) return null;
    return { gameId: userInfo.gameId, gameBatch: userInfo.gameBatch, gameTeam: userInfo.gameTeam };
  }, [userInfo]);

  const { period, months, cards, prodRows, salesRows, products, loading, error,
    activeTab, setActiveTab, filter, setFilter } = useMfgRecord(query, selectedMonth);

  const empty = !loading && !error && period && cards.length === 0;

  return (
    <Box sx={layoutStyle.root}>
      <Box sx={layoutStyle.pageContainer}>
        <MrHeader period={period} months={months} onMonthChange={setSelectedMonth} />

        <Box sx={layoutStyle.toolbar}>
          <MrNav activeTab={activeTab} setActiveTab={setActiveTab} />
          {SHOW_FILTER && <MrFilter filter={filter} setFilter={setFilter} products={products} />}
        </Box>

        {loading && <LinearProgress sx={{ mb: 2 }} />}
        {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
        {empty && <Alert severity="info" sx={{ mb: 2 }}>No records for {period}. Choose another month.</Alert>}

        {activeTab === "overview" && cards.length > 0 && (
          <>
            <MrInsight cards={cards} />
            <Box sx={{ display: "grid", gap: 2, gridTemplateColumns: { xs: "1fr", sm: "repeat(2, 1fr)", lg: "repeat(3, 1fr)" } }}>
              {cards.map((c) => <MrCard key={c.product} card={c} />)}
            </Box>
          </>
        )}

        {activeTab === "production" && (
          <MrTable title="Production Record" note={`Quantity accepted at each work centre in ${period}.`}
            accent={colors.accentBlue} cols={MR_PROD_COLS} rows={prodRows} />
        )}
        {activeTab === "sales" && (
          <MrTable title="Sales Record" note={`Demand, target and sales in ${period}.`}
            accent={colors.accentOrange} cols={MR_SALES_COLS} rows={salesRows} />
        )}
      </Box>
    </Box>
  );
}