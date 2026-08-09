/**
 * Component Name : useStrategy
 * Module         : Strategy
 * Purpose        : Encapsulates all business logic for the Strategy
 *                   Plan page — data loading, decision toggling with
 *                   mutual-exclusion enforcement, budget roll-up and
 *                   filtering — so UI components stay presentation-only.
 * Author/Version : OpsMgt UX Lab / v1.0
 * AI Tags        : strategy, hook, state, business-logic, mutual-exclusion
 */

// --------------------------------------------------------------
// Imports
// --------------------------------------------------------------
import { useEffect, useMemo, useState } from "react";
import { fetchStrategyPlan, saveStrategyDecisions } from "../services/strategyService";

// --------------------------------------------------------------
// Constants
// --------------------------------------------------------------
const FILTER_ALL = "ALL";

/**
 * useStrategy
 * Central hook for the Strategy page.
 */
const useStrategy = () => {
  // ------------------------------------------------------------
  // State
  // ------------------------------------------------------------
  const [strategies, setStrategies] = useState([]);
  const [decisions, setDecisions] = useState({}); // { [strategyId]: "YES" | "NO" }
  const [enablerFilter, setEnablerFilter] = useState(FILTER_ALL);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState(null);

  // ------------------------------------------------------------
  // Effects — load strategy roster on mount
  // ------------------------------------------------------------
  useEffect(() => {
    let isMounted = true;

    const loadPlan = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const data = await fetchStrategyPlan();
        if (!isMounted) return;
        setStrategies(data.strategies);
        // Seed decision state from the roster's current implementDecision.
        const seeded = {};
        data.strategies.forEach((s) => {
          seeded[s.strategyId] = s.implementDecision;
        });
        setDecisions(seeded);
      } catch (err) {
        if (isMounted) setError(err);
      } finally {
        if (isMounted) setIsLoading(false);
      }
    };

    loadPlan();
    return () => {
      isMounted = false;
    };
  }, []);

  // ------------------------------------------------------------
  // Derived Values
  // ------------------------------------------------------------
  // Distinct business enabler values present in the roster, for the filter chip row.
  const availableEnablers = useMemo(
    () => [...new Set(strategies.map((s) => s.businessEnabler))],
    [strategies]
  );

  // Roster filtered by enabler + free-text search on strategy/benefit.
  const filteredStrategies = useMemo(() => {
    const term = searchTerm.trim().toLowerCase();
    return strategies.filter((s) => {
      const matchesEnabler = enablerFilter === FILTER_ALL || s.businessEnabler === enablerFilter;
      const matchesTerm =
        !term ||
        s.strategy.toLowerCase().includes(term) ||
        s.benefit.toLowerCase().includes(term);
      return matchesEnabler && matchesTerm;
    });
  }, [strategies, enablerFilter, searchTerm]);

  // Group strategies for rendering: independent (no mutual group) vs
  // grouped-by-letter (radio-select) buckets, preserving roster order.
  const groupedStrategies = useMemo(() => {
    const independent = [];
    const groups = {};
    filteredStrategies.forEach((s) => {
      if (!s.mutualGroup) {
        independent.push(s);
      } else {
        groups[s.mutualGroup] = groups[s.mutualGroup] || [];
        groups[s.mutualGroup].push(s);
      }
    });
    return { independent, groups };
  }, [filteredStrategies]);

  // Budget roll-up across YES-decided strategies, split by UOM since
  // USD and % are not summable together.
  const budgetSummary = useMemo(() => {
    let totalUsd = 0;
    let selectedCount = 0;
    strategies.forEach((s) => {
      if (decisions[s.strategyId] === "YES") {
        selectedCount += 1;
        if (s.uom === "USD") totalUsd += s.budgetAmount;
      }
    });
    return { totalUsd, selectedCount, totalCount: strategies.length };
  }, [strategies, decisions]);

  // ------------------------------------------------------------
  // Event Handlers
  // ------------------------------------------------------------
  // Toggle an independent (non-grouped) strategy's YES/NO decision.
  const handleToggleDecision = (strategyId) => {
    setDecisions((prev) => ({
      ...prev,
      [strategyId]: prev[strategyId] === "YES" ? "NO" : "YES",
    }));
  };

  // Select one strategy within a mutual-exclusion group; all siblings
  // in the same group flip to NO.
  const handleSelectGroupChoice = (groupLetter, strategyId) => {
    const siblingIds = (groupedStrategies.groups[groupLetter] || []).map((s) => s.strategyId);
    setDecisions((prev) => {
      const next = { ...prev };
      siblingIds.forEach((id) => {
        next[id] = id === strategyId ? "YES" : "NO";
      });
      return next;
    });
  };

  const handleEnablerFilterChange = (enablerKey) => setEnablerFilter(enablerKey);
  const handleSearchChange = (value) => setSearchTerm(value);

  const handleSaveDecisions = async () => {
    setIsSaving(true);
    try {
      await saveStrategyDecisions(decisions);
    } finally {
      setIsSaving(false);
    }
  };

  // ------------------------------------------------------------
  // AI Extension Hooks
  // Reserved placeholders for future AI-assisted capabilities.
  // These are inert today and must not alter current behavior.
  // ------------------------------------------------------------
  const aiHooks = {
    // Decision Assessment — future: flag budget-risk or low-ROI picks.
    onRequestDecisionAssessment: () => null,
    // Facilitator Assistant — future: suggest a balanced strategy mix.
    onRequestFacilitatorSuggestion: () => null,
  };

  return {
    // data
    strategies: filteredStrategies,
    groupedStrategies,
    decisions,
    availableEnablers,
    budgetSummary,
    // filters
    enablerFilter,
    searchTerm,
    handleEnablerFilterChange,
    handleSearchChange,
    // decisions
    handleToggleDecision,
    handleSelectGroupChoice,
    handleSaveDecisions,
    // status
    isLoading,
    isSaving,
    error,
    // AI-ready extension points
    aiHooks,
  };
};

export default useStrategy;