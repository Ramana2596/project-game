// Constants: srCols
// Module: StrategyResults
// Purpose: column definitions for detailed strategy result tables
// Author/Version: OpsMgt UX Lab / v2.0
// AI Tags: strategy, results, table, columns

import {
  fmtCost,
  fmtDate,
  fmtNum,
  fmtPct,
} from "../utils/srFormat";

export const SR_PLAN_COLS = [
  { id: "strategy", label: "Strategy" },
  { id: "benefit", label: "Benefit" },
  { id: "choice", label: "Choice" },
  { id: "isCapital", label: "Capital Investment" },
  { id: "costType", label: "Cost Type" },
  {
    id: "cost",
    label: "Planned Cost",
    num: true,
    fmt: (value, row) => fmtCost(value, row.uom),
  },
  {
    id: "implDate",
    label: "Implement",
    fmt: fmtDate,
  },
  { id: "outcome", label: "Outcome" },
  {
    id: "fromMon",
    label: "From Month No",
    num: true,
    fmt: fmtNum,
  },
  {
    id: "dur",
    label: "Duration",
    num: true,
    fmt: fmtNum,
  },
  {
    id: "gain",
    label: "Gain %",
    num: true,
    fmt: fmtPct,
  },
  {
    id: "loss",
    label: "Loss %",
    num: true,
    fmt: fmtPct,
  },
];

export const SR_BUD_COLS = [
  { id: "strategy", label: "Strategy" },
  { id: "costType", label: "Cost Type" },
  { id: "isCapital", label: "Capital Investment" },
  { id: "cur", label: "Currency" },
  {
    id: "amt",
    label: "Budget Amount",
    num: true,
    fmt: fmtNum,
  },
  {
    id: "implDate",
    label: "Implement",
  },
];

export const SR_DEM_COLS = [
  { id: "strategy", label: "Strategy" },
  { id: "outcome", label: "Outcome" },
  { id: "product", label: "Product" },
  {
    id: "accrual",
    label: "Accrual",
    fmt: fmtDate,
  },
  {
    id: "qty",
    label: "Base Demand",
    num: true,
    fmt: fmtNum,
  },
  {
    id: "demPct",
    label: "Demand %",
    num: true,
    fmt: fmtPct,
  },
  {
    id: "addlDem",
    label: "Additional Demand",
    num: true,
    fmt: fmtNum,
  },
];

export const SR_DISC_COLS = [
  { id: "strategy", label: "Strategy" },
  { id: "outcome", label: "Outcome" },
  { id: "product", label: "Product" },
  {
    id: "accrual",
    label: "Accrual",
    fmt: fmtDate,
  },
  {
    id: "qty",
    label: "Quantity",
    num: true,
    fmt: fmtNum,
  },
  { id: "cur", label: "Currency" },
  {
    id: "price",
    label: "Unit Price",
    num: true,
    fmt: fmtNum,
  },
  {
    id: "discPct",
    label: "Discount %",
    num: true,
    fmt: fmtPct,
  },
  {
    id: "discAmt",
    label: "Discount Amount",
    num: true,
    fmt: fmtNum,
  },
];

export const SR_SAV_COLS = [
  { id: "strategy", label: "Strategy" },
  { id: "outcome", label: "Outcome" },
  { id: "uom", label: "Saving On" },
  {
    id: "accrual",
    label: "Accrual",
    fmt: fmtDate,
  },
  {
    id: "savPct",
    label: "Saving %",
    num: true,
    fmt: fmtPct,
  },
];