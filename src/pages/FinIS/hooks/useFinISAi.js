// Component Name : useFinISAi
// Module         : FinIS (Income Statement)
// Purpose        : AI extension point for Income Statement - reserved for future Learning
//                  Analytics / Facilitator Assistant / Executive Report Narration features.
//                  Acts as a placeholder today and evolves independently of core business logic.
// Author/Version : UXLab V1.0
// AI Tags        : income-statement, ai-hook, learning-analytics, facilitator-assistant

import { useMemo } from "react";

// Function: placeholder narration - returns null until an AI narration service is wired in
const buildNarrative = (rows, periods) => {
    if (!rows?.length || !periods?.length) return null;
    // Future: call a Learning Analytics / Executive Report Narration service here,
    // e.g. summarize margin trend, flag anomalous expense lines, coach next-period actions.
    return null;
};

// Hook: exposes AI-ready extension points for the Income Statement page
export const useFinISAi = (rows, periods) => {

    // Derived: narrative insight placeholder (null today, non-breaking to enable later)
    const narrative = useMemo(() => buildNarrative(rows, periods), [rows, periods]);

    // Derived: anomaly flags placeholder (e.g. unusual month-over-month expense swings)
    const anomalies = useMemo(() => [], [rows, periods]);

    return {
        narrative,
        anomalies,
        isEnabled: false, // flip on once an AI narration/insights service is available
    };
};

export default useFinISAi;
