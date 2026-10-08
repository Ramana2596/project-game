
// Service: annualReportService
// Module: AnnualReport
// Purpose: Provide financial statement data sources for Annual Report Analytics
// Author/Version: OpsMgt UXLab V1.3
// AI Tags: annual-report, service, finBS, finIS, finCF, comparison

import {
  getBalanceSheetInfo,
} from "../../FinBS/services/finBSService";
import {
  getIncomeStatementInfo,
} from "../../FinIS/services/finISService";

// Load the Balance Sheet source for Annual Report calculations.
export const getAnnualReportBalanceSheet = ({
  gameId,
  gameBatch,
  gameTeam,
  productionMonth,
}) =>
  getBalanceSheetInfo({
    params: {
      gameId,
      gameBatch: Number(gameBatch),
      gameTeam,
      productionMonth,
    },
  });

// Load the Income Statement source for Annual Report calculations.
export const getAnnualReportIncomeStatement = ({
  gameId,
  gameBatch,
  gameTeam,
  productionMonth,
}) =>
  getIncomeStatementInfo({
    gameId,
    gameBatch: Number(gameBatch),
    gameTeam,
    productionMonth,
  });

// Provide a single entry point for the current financial statement sources.
export const getAnnualReportSources = async ({
  gameId,
  gameBatch,
  gameTeam,
  productionMonth,
}) => {
  const [balanceSheet, incomeStatement] = await Promise.all([
    getAnnualReportBalanceSheet({
      gameId,
      gameBatch,
      gameTeam,
      productionMonth,
    }),
    getAnnualReportIncomeStatement({
      gameId,
      gameBatch,
      gameTeam,
      productionMonth,
    }),
  ]);

  return {
    balanceSheet,
    incomeStatement,
    cashFlow: null,
  };
};

export default {
  getAnnualReportBalanceSheet,
  getAnnualReportIncomeStatement,
  getAnnualReportSources,
};
