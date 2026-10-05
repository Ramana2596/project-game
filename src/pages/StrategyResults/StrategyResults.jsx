// Page: StrategyResults
// Module: StrategyResults
// Purpose: orchestrate strategy result data, overview and detailed views
// Author/Version: OpsMgt UX Lab / v2.3
// AI Tags: strategy, results, overview, strategy-map, product-filter

import React, { useMemo, useState } from "react";
import { Alert, Box, LinearProgress } from "@mui/material";
import { useUser } from "../../core/access/userContext.jsx";
import { layoutStyle } from "../../ux/styles";
import useSrResult from "./hooks/useSrResult";
import SrHeader from "./components/SrHeader";
import SrProductFilter from "./components/SrProductFilter";
import SrOverview from "./components/overview/SrOverview";
import SrStrategyMap from "./components/overview/SrStrategyMap";
import SrResultsNav from "./components/results/SrResultsNav";
import SrResultTable from "./components/results/SrResultTable";
import {
  SR_TAB,
  SR_MSG_NO_SESSION,
  SR_MSG_EMPTY,
} from "./constants/srConstants";
import {
  SR_PLAN_COLS,
  SR_BUD_COLS,
  SR_DEM_COLS,
  SR_DISC_COLS,
  SR_SAV_COLS,
} from "./constants/srCols";

export default function StrategyResults() {
  const { userInfo } = useUser();

  const srParams = useMemo(() => {
    if (
      !userInfo?.gameId ||
      !userInfo?.gameBatch ||
      !userInfo?.gameTeam
    ) {
      return null;
    }

    return {
      gameId: userInfo.gameId,
      gameBatch: userInfo.gameBatch,
      gameTeam: userInfo.gameTeam,
    };
  }, [
    userInfo?.gameId,
    userInfo?.gameBatch,
    userInfo?.gameTeam,
  ]);

  const {
    setNoList,
    setNoSel,
    setSetNoSel,
    srTab,
    setSrTab,
    srCards,
    srTotals,
    planSel,
    budRows,
    demRows,
    discRows,
    savRows,
    srLoading,
    srError,
  } = useSrResult(srParams);

  const [product, setProduct] = useState("ALL");
  const [showStrategyMap, setShowStrategyMap] = useState(false);

  const products = useMemo(() => {
    return [
      ...new Set(
        [...demRows, ...discRows, ...savRows]
          .map((row) => row.product)
          .filter(Boolean)
      ),
    ].sort();
  }, [demRows, discRows, savRows]);

  const filteredDemRows = useMemo(() => {
    if (product === "ALL") return demRows;

    return demRows.filter(
      (row) => row.product === product
    );
  }, [demRows, product]);

  const filteredDiscRows = useMemo(() => {
    if (product === "ALL") return discRows;

    return discRows.filter(
      (row) => row.product === product
    );
  }, [discRows, product]);

  const filteredSavRows = useMemo(() => {
    if (product === "ALL") return savRows;

    return savRows.filter(
      (row) => row.product === product
    );
  }, [savRows, product]);

  const tabCounts = useMemo(
    () => ({
      [SR_TAB.plan]: planSel.length,
      [SR_TAB.budget]: budRows.length,
      [SR_TAB.demand]: filteredDemRows.length,
      [SR_TAB.discount]: filteredDiscRows.length,
      [SR_TAB.savings]: filteredSavRows.length,
    }),
    [
      planSel.length,
      budRows.length,
      filteredDemRows.length,
      filteredDiscRows.length,
      filteredSavRows.length,
    ]
  );

  const tableConfig = useMemo(
    () => ({
      [SR_TAB.plan]: {
        title: "Strategy Plan",
        note: "Selected strategies and their planned implementation.",
        cols: SR_PLAN_COLS,
        rows: planSel,
      },
      [SR_TAB.budget]: {
        title: "Budget Plan",
        note: "Budget commitments associated with selected strategies.",
        cols: SR_BUD_COLS,
        rows: budRows,
      },
      [SR_TAB.demand]: {
        title: "Acquired Demand",
        note: "Demand created through selected strategies.",
        cols: SR_DEM_COLS,
        rows: filteredDemRows,
      },
      [SR_TAB.discount]: {
        title: "Price Discount",
        note: "Commercial discount outcomes from selected strategies.",
        cols: SR_DISC_COLS,
        rows: filteredDiscRows,
      },
      [SR_TAB.savings]: {
        title: "Savings",
        note: "Savings outcomes from selected strategies.",
        cols: SR_SAV_COLS,
        rows: filteredSavRows,
      },
    }),
    [
      planSel,
      budRows,
      filteredDemRows,
      filteredDiscRows,
      filteredSavRows,
    ]
  );

  if (!srParams) {
    return (
      <Box sx={layoutStyle.page}>
        <SrHeader
          team={null}
        />
        <Alert severity="info">
          {SR_MSG_NO_SESSION}
        </Alert>
      </Box>
    );
  }

  return (
    <Box sx={layoutStyle.page}>
      <SrHeader
        team={`${userInfo.gameBatch} / ${userInfo.gameTeam}`}
      />

      {srLoading && <LinearProgress sx={{ mb: 2 }} />}

      {srError && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {srError}
        </Alert>
      )}

      {!srLoading && !srError && setNoList.length === 0 ? (
        <Alert severity="info">
          {SR_MSG_EMPTY}
        </Alert>
      ) : (
        <>
          <SrProductFilter
            setNo={setNoSel}
            product={product}
            products={products}
            onProductChange={setProduct}
          />

          <SrOverview
            setNo={setNoSel}
            srTotals={srTotals}
            srCards={srCards}
            demRows={filteredDemRows}
            discRows={filteredDiscRows}
            savRows={filteredSavRows}
            onStrategyClick={() =>
              setShowStrategyMap((current) => !current)
            }
          />

          {showStrategyMap && (
            <SrStrategyMap
              setNo={setNoSel}
              srCards={srCards}
            />
          )}

          <Box sx={{ mt: 2.5 }}>
            <SrResultsNav
              srTab={srTab}
              onTabChange={setSrTab}
              tabCounts={tabCounts}
            />

            {srTab !== SR_TAB.overview && (
              <SrResultTable
                title={tableConfig[srTab]?.title}
                note={tableConfig[srTab]?.note}
                cols={tableConfig[srTab]?.cols || []}
                rows={tableConfig[srTab]?.rows || []}
              />
            )}
          </Box>
        </>
      )}
    </Box>
  );
}