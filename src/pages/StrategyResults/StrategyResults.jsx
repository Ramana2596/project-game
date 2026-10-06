// Page: StrategyResults
// Module: StrategyResults
// Purpose: orchestrate strategy result data, overview and business result views.
// Author/Version: OpsMgt UX Lab / v3.0
// AI Tags: strategy, results, overview, navigation, strategy-map, product-filter

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
  SR_PLAN_COLS,
  SR_BUD_COLS,
  SR_DEM_COLS,
  SR_DISC_COLS,
  SR_SAV_COLS,
} from "./constants/srCols";
import { SR_VIEW } from "./constants/srConfig";

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

  if (!srParams) {
    return (
      <Box sx={layoutStyle.page}>
        <SrHeader team={null} />

        <Alert severity="info">
          Your batch and team are not set yet. Join a team
          session to see strategy results.
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
          No strategies are selected in this set yet.
        </Alert>
      ) : (
        <>
          <SrOverview
            setNo={setNoSel}
            srTotals={srTotals}
            srCards={srCards}
            demRows={filteredDemRows}
            discRows={filteredDiscRows}
            savRows={filteredSavRows}
          />

          <Box
            sx={{
              mt: 2.5,
              display: "flex",
              alignItems: "center",
              gap: 1.25,
              flexWrap: "wrap",
            }}
          >
            <SrResultsNav
              srTab={srTab}
              onTabChange={setSrTab}
            />

            <SrProductFilter
              product={product}
              products={products}
              onProductChange={setProduct}
            />
          </Box>

          <Box sx={{ mt: 2 }}>
            {srTab === SR_VIEW.strategy && (
              <>
                <SrStrategyMap
                  setNo={setNoSel}
                  srCards={srCards}
                />

                <Box sx={{ mt: 2 }}>
                  <SrResultTable
                    title="Strategy Plan"
                    note="Selected strategies and their planned implementation."
                    cols={SR_PLAN_COLS}
                    rows={planSel}
                  />
                </Box>
              </>
            )}

            {srTab === SR_VIEW.commitment && (
              <>
                <SrResultTable
                  title="Budget Commitment"
                  note="Budget commitments associated with selected strategies."
                  cols={SR_BUD_COLS}
                  rows={budRows}
                />

                <Box sx={{ mt: 2 }}>
                  <SrResultTable
                    title="Discount Commitment"
                    note="Commercial discount commitments associated with selected strategies."
                    cols={SR_DISC_COLS}
                    rows={filteredDiscRows}
                  />
                </Box>
              </>
            )}

            {srTab === SR_VIEW.demand && (
              <SrResultTable
                title="Acquired Demand"
                note="Demand created through selected strategies."
                cols={SR_DEM_COLS}
                rows={filteredDemRows}
              />
            )}

            {srTab === SR_VIEW.savings && (
              <SrResultTable
                title="Savings"
                note="Savings outcomes from selected strategies."
                cols={SR_SAV_COLS}
                rows={filteredSavRows}
              />
            )}
          </Box>
        </>
      )}
    </Box>
  );
}