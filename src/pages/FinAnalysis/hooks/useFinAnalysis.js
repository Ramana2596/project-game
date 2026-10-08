// Hook: useFinAnalysis
// Module: FinAnalysis
// Purpose: Load complete financial data and apply reporting-period analysis locally
// Author/Version: OpsMgt UXLab V1.3
// AI Tags: financial-analysis, hook, ratios, finBS, finIS, period-filter

import { useCallback, useEffect, useMemo, useState } from "react";
import { useUser } from "../../../core/access/userContext";
import {
  getBalanceSheetInfo,
  normalizeRows,
} from "../../FinBS/services/finBSService";
import { getIncomeStatementInfo } from "../../FinIS/services/finISService";
import { buildAnnualData } from "../utils/faAggregation";
import {
  calculateLatestRatios,
  calculateRatioSeries,
} from "../utils/faRatios";

const extractRows = (response) => {
  if (Array.isArray(response)) {
    return response;
  }

  if (Array.isArray(response?.data)) {
    return response.data;
  }

  if (Array.isArray(response?.data?.data)) {
    return response.data.data;
  }

  return [];
};

// Convert a reporting period into a sortable date.
const toPeriodDate = (value) => {
  if (!value) {
    return null;
  }

  const date = new Date(value);

  if (!Number.isNaN(date.getTime())) {
    return date;
  }

  const parsed = new Date(`01-${value}`);

  return Number.isNaN(parsed.getTime())
    ? null
    : parsed;
};

const useFinAnalysis = (props = {}) => {
  const { userInfo } = useUser();

  const gameId =
    props.gameId ?? userInfo?.gameId;

  const gameBatch =
    props.gameBatch ?? userInfo?.gameBatch;

  const gameTeam =
    props.gameTeam ?? userInfo?.gameTeam;

  const selectedPeriod =
    props.selectedPeriod ?? "ALL";

  const [allAnnualData, setAllAnnualData] =
    useState([]);

  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState(null);

  // Load the complete available financial dataset from both statements.
  const loadData = useCallback(async () => {
    if (
      !gameId ||
      gameBatch === undefined ||
      gameBatch === null ||
      !gameTeam
    ) {
      setAllAnnualData([]);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const [
        balanceSheetResponse,
        incomeStatementResponse,
      ] = await Promise.all([
        getBalanceSheetInfo({
          params: {
            gameId,
            gameBatch: Number(gameBatch),
            gameTeam,
            productionMonth: null,
          },
        }),

        getIncomeStatementInfo({
          gameId,
          gameBatch: Number(gameBatch),
          gameTeam,
          productionMonth: null,
        }),
      ]);

      const balanceSheetRows =
        normalizeRows(
          extractRows(balanceSheetResponse)
        );

      const incomeStatementRows =
        extractRows(
          incomeStatementResponse
        );

      const result = buildAnnualData(
        incomeStatementRows,
        balanceSheetRows.rows,
        []
      );

      setAllAnnualData(
        Array.isArray(result)
          ? result
          : []
      );
    } catch (err) {
      setAllAnnualData([]);
      setError(err);
    } finally {
      setLoading(false);
    }
  }, [
    gameId,
    gameBatch,
    gameTeam,
  ]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  // Keep the complete reporting-period list independent of the selected period.
  const periods = useMemo(
    () =>
      allAnnualData
        .map((item) => item.period)
        .filter(Boolean),
    [allAnnualData]
  );

  // Identify the latest available reporting period from the complete dataset.
  const latestPeriod = useMemo(
    () =>
      periods.length
        ? periods[periods.length - 1]
        : null,
    [periods]
  );

  // Apply the selected period as a cut-off while retaining historical data for trends.
  const annualData = useMemo(() => {
    if (
      !selectedPeriod ||
      selectedPeriod === "ALL"
    ) {
      return allAnnualData;
    }

    const selectedDate =
      toPeriodDate(selectedPeriod);

    if (!selectedDate) {
      return allAnnualData;
    }

    return allAnnualData.filter((item) => {
      const itemDate =
        toPeriodDate(item.period);

      return (
        itemDate &&
        itemDate <= selectedDate
      );
    });
  }, [
    allAnnualData,
    selectedPeriod,
  ]);

  // Calculate the ratio trend across all periods up to the selected cut-off.
  const ratioSeries = useMemo(
    () =>
      calculateRatioSeries(
        annualData
      ),
    [annualData]
  );

  // Calculate current KPIs from the final period in the selected analytical range.
  const latestRatios = useMemo(
    () =>
      calculateLatestRatios(
        annualData
      ),
    [annualData]
  );

  // Calculate comparison ratios from the immediately preceding period.
  const previousRatios = useMemo(() => {
    if (ratioSeries.length < 2) {
      return {};
    }

    return (
      ratioSeries[
        ratioSeries.length - 2
      ]?.ratios || {}
    );
  }, [ratioSeries]);

  return {
    annualData,
    ratioSeries,
    latestRatios,
    previousRatios,
    periods,
    latestPeriod,
    loading,
    error,
    reload: loadData,
    gameId,
    gameBatch,
    gameTeam,
    productionMonth:
      selectedPeriod === "ALL"
        ? null
        : selectedPeriod,
  };
};

export default useFinAnalysis;
