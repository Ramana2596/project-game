// Hook: useStrategy — business logic for Strategy page
// Purpose: load strategies, manage decisions, enforce groups, roll up budget
// Author/Version: OpsMgt UX Lab / v1.1

import { useEffect, useMemo, useState } from "react";
import { getStrategyPlan, updateStrategyPlan } from "../services/strategyService";
import { useUser } from "../../../core/access/userContext";

const FILTER_ALL = "ALL";

const useStrategy = () => {
  const { userInfo } = useUser();

  // State
  const [strategies, setStrategies] = useState([]);
  const [decisions, setDecisions] = useState({});
  const [enablerFilter, setEnablerFilter] = useState(FILTER_ALL);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState(null);

  // NEW: expose raw values for Strategy component
  const [outMessage, setOutMessage] = useState(null);
  const [sucValue, setSucValue] = useState(null);

  useEffect(() => {
    let mounted = true;
    const load = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await getStrategyPlan({
          gameId: userInfo?.gameId,
          gameBatch: userInfo?.gameBatch,
          gameTeam: userInfo?.gameTeam,
          cmdLine: "Get_Strategy_Plan",
        });

        const payload = response?.data || response;

        // Capture raw values always
        if (mounted) {
          setOutMessage(payload?.Out_Message || null);
          setSucValue(Number(payload?.SucValue));
        }

        const raw = Array.isArray(payload?.data) ? payload.data : [];

        // Map backend fields to front‑end shape
        const roster = raw.map((s) => ({
          strategySetNo: s.Strategy_Set_No,
          strategyId: s.Strategy_Id,
          strategy: s.Strategy,
          benefit: s.Benefit,
          businessEnabler: s.Business_Enabler,
          costType: s.Cost_Type,
          mutualGroup: s.Mutual_X_Group,
          uom: s.Currency,
          budgetAmount: s.Budget_Amount,
          implementDecision: s.Decision,
          fromMonthNo: s.From_Month,
          duration: s.Duration_Month,
          gainPct: s.Norm_Percent,
          lossPct: s.Loss_Percent,
          outcome: s.Resultant,
          investPeriod: s.Implement_Date,
        }));

        if (mounted) {
          setStrategies(roster);

          const seed = {};
          roster.forEach((s) => {
            seed[s.strategyId] = s.implementDecision;
          });
          setDecisions(seed);
        }
      } catch (e) {
        if (mounted) setError(e);
      } finally {
        if (mounted) setIsLoading(false);
      }
    };
    load();
    return () => {
      mounted = false;
    };
  }, [userInfo]);

  // Distinct enablers
  const availableEnablers = useMemo(
    () => (Array.isArray(strategies) ? [...new Set(strategies.map((s) => s.businessEnabler))] : []),
    [strategies]
  );

  // Filtered strategies
  const filteredStrategies = useMemo(() => {
    const term = searchTerm.trim().toLowerCase();
    return Array.isArray(strategies)
      ? strategies.filter((s) => {
        const matchFilter = enablerFilter === FILTER_ALL || s.businessEnabler === enablerFilter;
        const matchTerm =
          !term ||
          (s.strategy && s.strategy.toLowerCase().includes(term)) ||
          (s.benefit && s.benefit.toLowerCase().includes(term));
        return matchFilter && matchTerm;
      })
      : [];
  }, [strategies, enablerFilter, searchTerm]);

  // Grouped strategies
  const groupedStrategies = useMemo(() => {
    const independent = [];
    const groups = {};
    filteredStrategies.forEach((s) => {
      if (!s.mutualGroup) independent.push(s);
      else {
        groups[s.mutualGroup] = groups[s.mutualGroup] || [];
        groups[s.mutualGroup].push(s);
      }
    });
    return { independent, groups };
  }, [filteredStrategies]);

  // Budget summary
  const budgetSummary = useMemo(() => {
    let totalAmount = 0;
    let selectedCount = 0;

    if (Array.isArray(strategies)) {
      strategies.forEach((s) => {
        if (decisions[s.strategyId] === "YES") {
          selectedCount += 1;

          if (s.uom !== "%") {
            totalAmount += Number(s.budgetAmount) || 0;
          }
        }
      });
    }

    return {
      totalAmount,
      currency: strategies[0]?.uom,
      selectedCount,
      totalCount: strategies.length,
    };
  }, [strategies, decisions]);

  // Handlers
  const handleToggleDecision = (id) => {
    setDecisions((prev) => ({
      ...prev,
      [id]: prev[id] === "YES" ? "NO" : "YES",
    }));
  };

  const handleSelectGroupChoice = (letter, id) => {
    const ids = (groupedStrategies.groups[letter] || []).map((s) => s.strategyId);
    setDecisions((prev) => {
      const next = { ...prev };
      ids.forEach((x) => {
        next[x] = x === id ? "YES" : "NO";
      });
      return next;
    });
  };

  const handleEnablerFilterChange = (val) => setEnablerFilter(val);
  const handleSearchChange = (val) => setSearchTerm(val);

  const handleSaveDecisions = async () => {
    setIsSaving(true);
    try {
      const decisionPayload = strategies.map((s) => ({
        gameId: userInfo?.gameId,
        gameBatch: userInfo?.gameBatch,
        gameTeam: userInfo?.gameTeam,
        strategySetNo: s.strategySetNo,
        strategyId: s.strategyId,
        playerDecision: decisions[s.strategyId] === "YES" ? "YES" : "NO", // camelCase
        decidedBy: "Player",
      }));

      const updateResponse = await updateStrategyPlan(decisionPayload);
      console.log("Update Strategy Plan response:", updateResponse);

      const refreshed = await getStrategyPlan({
        gameId: userInfo?.gameId,
        gameBatch: userInfo?.gameBatch,
        gameTeam: userInfo?.gameTeam,
        cmdLine: "Get_Strategy_Plan",
      });

      const payload = refreshed?.data || refreshed;
      const raw = Array.isArray(payload?.data) ? payload.data : [];

      const roster = raw.map((s) => ({
        strategySetNo: s.Strategy_Set_No,
        strategyId: s.Strategy_Id,
        strategy: s.Strategy,
        benefit: s.Benefit,
        businessEnabler: s.Business_Enabler,
        costType: s.Cost_Type,
        mutualGroup: s.Mutual_X_Group,
        uom: s.Currency,
        budgetAmount: s.Budget_Amount,
        implementDecision: s.Decision,
        fromMonthNo: s.From_Month,
        duration: s.Duration_Month,
        gainPct: s.Norm_Percent,
        lossPct: s.Loss_Percent,
        outcome: s.Resultant,
        investPeriod: s.Implement_Date,
      }));
      setStrategies(roster);

    } catch (e) {
      console.error("Save failed:", e);
      setError(e);
    } finally {
      setIsSaving(false);
    }
  };


  return {
    groupedStrategies,
    decisions,
    availableEnablers,
    budgetSummary,
    enablerFilter,
    searchTerm,
    handleEnablerFilterChange,
    handleSearchChange,
    handleToggleDecision,
    handleSelectGroupChoice,
    handleSaveDecisions,
    isLoading,
    isSaving,
    error,
    outMessage, // raw banner message
    sucValue,   // raw success/failure code
  };
};

export default useStrategy;
