// Hook: useSrResult
// Module: StrategyResults
// Purpose: load, map and prepare strategy result data for the UI
// Author/Version: OpsMgt UX Lab / v2.0
// AI Tags: strategy, results, hook, api, mapping

import { useEffect, useMemo, useState } from "react";
import {
  getStrategyPlanTeam,
  getStrategyBudgetInfo,
  getOpsDemandCreationInfo,
  getOpsDiscountOfferInfo,
  getOpsSavingsPlanInfo,
} from "../services/srService";
import { SR_TAB, SR_MSG_LOAD_FAIL, SR_YES_VALUES } from "../constants/srConstants";
import {
  listSetNos,
  buildCards,
  buildTotals,
} from "../utils/srAggregation";

const rowsOf = ({ data: res }) => {
  if (Array.isArray(res)) return res;

  if (res?.success === false) {
    throw new Error(res.message || SR_MSG_LOAD_FAIL);
  }

  return res?.data || [];
};

const isSelected = (value) =>
  SR_YES_VALUES.includes(
    String(value ?? "").trim().toLowerCase()
  );

const mapBase = (row, index, kind) => ({
  rowId: `${kind}-${row.Strategy_Set_No}-${row.Strategy_Id}-${index}`,
  setNo: row.Strategy_Set_No,
  stratId: row.Strategy_Id,
  strategy: row.Strategy,
  outcome: row.Resultant ?? row.Outcome,
  accrual: row.Accrual_Date,
});

const mapPlan = (row, index) => ({
  ...mapBase(row, index, "plan"),
  benefit: row.Benefit,
  choice: row.Mutual_X_Group,
  isCapital: row.Is_Capital,
  costType: row.Cost_Type,
  uom: row.UOM,
  cost: row.Implied_Cost,
  implDate: row.Implement_Date,
  fromMon: row.From_Month_No,
  dur: row.Duration_Month,
  gain: row.Gain_Percent,
  loss: row.Loss_Percent,
  decision: row.Player_Decision,
  selected: isSelected(row.Player_Decision),
});

const toYesNo = (value) =>
  ["true", "1", "yes", "y"].includes(
    String(value ?? "").trim().toLowerCase()
  )
    ? "Yes"
    : "No";

const mapBudget = (row, index) => ({
  ...mapBase(row, index, "bud"),
  setNo: row.Strategy_Set,
  isCapital: toYesNo(row.Is_Capital),
  costType: row.Cost_Type,
  cur: row.Currency,
  amt: row.Budget_Amount,
  implDate: row.Implement_Date,
});

const mapDemand = (row, index) => ({
  ...mapBase(row, index, "dem"),
  product: row.Product,
  qty: row.Quantity,
  demPct: row.Demand_Percent,
  addlDem: row.Addl_Demand,
});

const mapDiscount = (row, index) => ({
  ...mapBase(row, index, "disc"),
  product: row.Part_Description,
  unit: row.Unit,
  qty: row.Quantity,
  cur: row.Currency,
  price: row.Unit_Price,
  discPct: row.Discount_Percent,
  discAmt: row.Discount_Amount,
});

const mapSavings = (row, index) => ({
  ...mapBase(row, index, "sav"),
  product: row.Product ?? row.Part_Description,
  uom: row.UOM,
  savPct: row.Saving_Percent,
});

export default function useSrResult(srParams) {
  const [planAll, setPlanAll] = useState([]);
  const [budAll, setBudAll] = useState([]);
  const [demAll, setDemAll] = useState([]);
  const [discAll, setDiscAll] = useState([]);
  const [savAll, setSavAll] = useState([]);

  const [setNoSel, setSetNoSel] = useState(null);
  const [srTab, setSrTab] = useState(SR_TAB.overview);
  const [srLoading, setSrLoading] = useState(false);
  const [srError, setSrError] = useState("");

  const setNoList = useMemo(
    () =>
      listSetNos([
        planAll,
        budAll,
        demAll,
        discAll,
        savAll,
      ]),
    [planAll, budAll, demAll, discAll, savAll]
  );

  const planSet = useMemo(
    () => planAll.filter((row) => row.setNo === setNoSel),
    [planAll, setNoSel]
  );

  const budRows = useMemo(
    () => budAll.filter((row) => row.setNo === setNoSel),
    [budAll, setNoSel]
  );

  const demRows = useMemo(
    () => demAll.filter((row) => row.setNo === setNoSel),
    [demAll, setNoSel]
  );

  const discRows = useMemo(
    () => discAll.filter((row) => row.setNo === setNoSel),
    [discAll, setNoSel]
  );

  const savRows = useMemo(
    () => savAll.filter((row) => row.setNo === setNoSel),
    [savAll, setNoSel]
  );

  const planSel = useMemo(
    () => planSet.filter((row) => row.selected),
    [planSet]
  );

  const srCards = useMemo(
    () =>
      buildCards(
        planSel,
        budRows,
        demRows,
        discRows,
        savRows
      ),
    [planSel, budRows, demRows, discRows, savRows]
  );

  const srTotals = useMemo(
    () =>
      buildTotals(
        srCards,
        planSet,
        budRows,
        demRows,
        discRows,
        savRows
      ),
    [
      srCards,
      planSet,
      budRows,
      demRows,
      discRows,
      savRows,
    ]
  );

  useEffect(() => {
    if (!srParams) {
      setPlanAll([]);
      setBudAll([]);
      setDemAll([]);
      setDiscAll([]);
      setSavAll([]);
      setSetNoSel(null);
      setSrError("");
      return undefined;
    }

    let stale = false;

    setSrLoading(true);
    setSrError("");

    Promise.all([
      getStrategyPlanTeam(srParams),
      getStrategyBudgetInfo(srParams),
      getOpsDemandCreationInfo(srParams),
      getOpsDiscountOfferInfo(srParams),
      getOpsSavingsPlanInfo(srParams),
    ])
      .then(([plan, budget, demand, discount, savings]) => {
        if (stale) return;

        setPlanAll(
          rowsOf(plan).map(mapPlan)
        );

        setBudAll(
          rowsOf(budget).map(mapBudget)
        );

        setDemAll(
          rowsOf(demand).map(mapDemand)
        );

        setDiscAll(
          rowsOf(discount).map(mapDiscount)
        );

        setSavAll(
          rowsOf(savings).map(mapSavings)
        );
      })
      .catch((error) => {
        if (!stale) {
          setSrError(
            error?.message || SR_MSG_LOAD_FAIL
          );
        }
      })
      .finally(() => {
        if (!stale) {
          setSrLoading(false);
        }
      });

    return () => {
      stale = true;
    };
  }, [srParams]);

  useEffect(() => {
    if (!setNoList.includes(setNoSel)) {
      setSetNoSel(setNoList[0] ?? null);
    }
  }, [setNoList, setNoSel]);

  return {
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
  };
}