
// File: useFinCFAi.js
// Module: FinCF
// Purpose: Identify the strongest positive and most concerning cash-flow lines.

import { useMemo } from "react";
import { formatAmount, toAmount } from "../utils/finCFFormatters";

// Derive two concise insights from the selected reporting period.
export const useFinCFAi = (
    rows = [],
    periods = [],
    productionMonth = null
) => {
    const narrative = useMemo(() => {
        if (!rows.length || !periods.length) return [];

        // Resolve the selected period, falling back to the latest available period.
        const prefix = productionMonth
            ? String(productionMonth).slice(0, 7)
            : null;

        const period = prefix
            ? periods.find((item) => String(item).startsWith(prefix)) ||
              periods[periods.length - 1]
            : periods[periods.length - 1];

        // Read the value and statement description for a given line.
        const getLine = (lineNo) => {
            const row = rows.find(
                (item) => Number(item?.Line_No) === lineNo
            );

            const value = toAmount(row?.[period]);

            return value === null
                ? null
                : {
                    lineNo,
                    title: row?.Details || `Line ${lineNo}`,
                    value,
                };
        };

        const measures = [33, 37, 48, 49]
            .map(getLine)
            .filter((item) => item !== null);

        const closingCash = getLine(51);
        const positive = measures
            .filter((item) => item.value > 0)
            .sort((a, b) => b.value - a.value);

        const negative = measures
            .filter((item) => item.value < 0)
            .sort((a, b) => a.value - b.value);

        // Prioritize negative closing cash as the most direct liquidity concern.
        const worst = closingCash?.value < 0
            ? closingCash
            : negative[0];

        const best = positive[0];
        const insights = [];

        // Show the strongest positive line using its actual statement description.
        insights.push(
            best
                ? {
                    id: "best",
                    title: best.title,
                    status: "success",
                    text: `Positive cash flow of ${formatAmount(best.value)}.`,
                }
                : {
                    id: "best",
                    title: "No positive cash-flow line",
                    status: "info",
                    text: "No positive value was found among the main cash-flow totals.",
                }
        );

        // Show the most concerning negative line or report that none was found.
        insights.push(
            worst
                ? {
                    id: "worst",
                    title: worst.title,
                    status: "error",
                    text: `Negative value of ${formatAmount(worst.value)}. Review the underlying cash-flow movements.`,
                }
                : {
                    id: "worst",
                    title: "No negative cash-flow line",
                    status: "success",
                    text: "No negative value was found among the main cash-flow totals or closing cash balance.",
                }
        );

        return insights;
    }, [rows, periods, productionMonth]);

    return { narrative };
};

