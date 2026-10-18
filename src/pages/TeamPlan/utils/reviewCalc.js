// File: src/pages/TeamPlan/utils/reviewCalc.js
// Purpose: figures for the Review card (live: what the user's entries do), for the active line.
// Pure functions, no React. Inputs: the active plan row, all rows of the tab, and the Guide figures.
//
// ASSUMPTIONS (change here if your data differs):
//   Ex-Stock        = the line's selected price source matches EX_STOCK (row.Info_Price). Only Ex-Stock
//                     quantity is available for this month's Ops plan, on top of existing stock/machines.
//   Sales plan qty  = system driven: a field on the OI 001 row named in SALES_KEYS. In lean mode (no Sales
//                     Plan) it falls back to the Production Plan quantity.
//   Sales value     = Sales plan qty x Unit_Price (selling price).
//   Lines in plan   = lines with a quantity above 0 (Quantity on OI 001, Required_Quantity elsewhere).
//   Capacity after  = (available + Ex-Stock machines) x capacity per machine, where capacity per machine
//                     = Guide capacity / Guide No_Of_Machines. Load stays as in the Guide.

export const EX_STOCK = /ex[\s_-]?stock/i;
export const SALES_KEYS = ["Sales_Quantity", "Sales_Plan_Qty", "Sales_Plan"];

const isBlank = (v) => v === null || v === undefined || String(v).trim() === "";
const num = (v) => {
  const n = Number(String(v ?? "").replace(/,/g, ""));
  return Number.isFinite(n) ? n : 0;
};
const fmt = (n) => new Intl.NumberFormat(undefined, { maximumFractionDigits: 2 }).format(n);

const money = (n) => new Intl.NumberFormat(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(n);

const isExStock = (row) =>
  EX_STOCK.test([row?.Info_Price, row?.Price_Info, row?.Purchase_Preference].filter(Boolean).join(" "));

export function reviewFigures(tab, row, rows = [], info = null) {
  if (!row) return null;

  const qtyKey = tab === "OI 001" ? "Quantity" : "Required_Quantity";
  const lines = { done: rows.filter((r) => num(r[qtyKey]) > 0).length, total: rows.length };

  const qty = num(row.Quantity);
  const price = num(row.Unit_Price);
  const uom = row.UOM ?? info?.UOM ?? null;
  const currency = row.Currency ? ` ${row.Currency}` : "";
  const name = row.Part_Name ?? row.Part_Description ?? info?.Part_Description ?? null;
  const field = (label, text, optional = false) => ({ label, text, optional });

  if (tab === "OI 001") {
    const salesRaw = SALES_KEYS.map((k) => row[k]).find((v) => !isBlank(v));
    const sales = salesRaw === undefined ? qty : num(salesRaw); // lean mode: sales plan = production plan
    return { name, lines, fields: [
      field("Production plan", fmt(qty)),
      field("Sales plan", fmt(sales)),
      field("Sales value", `${money(sales * price)}${currency}`),
      field("UOM", uom),
    ] };
  }

  if (tab === "OI 002") {
    const stock = info?.Stock_Qty ?? null;
    const ex = isExStock(row) ? qty : 0;
    return { name, lines, fields: [
      field("Available (stock + Ex-Stock)", stock === null ? null : `${fmt(stock)} + ${fmt(ex)} = ${fmt(stock + ex)}`),
      field("Qty per set", info?.Qty_Per_Set ?? null),
      field("UOM", uom),
    ] };
  }

  // OI 003 Machine
  const avl = info?.machines ?? null; // needs the per-machine list from the SP
  const ex = isExStock(row) ? qty : 0;
  const total = avl === null ? null : avl + ex;
  const p = info?.plant;
  const perMachine = avl > 0 && p?.capacity != null ? p.capacity / avl : null;
  const capAfter = total !== null && perMachine !== null ? total * perMachine : null;
  const utilAfter = capAfter > 0 && p?.load != null ? (p.load / capAfter) * 100 : null;
  return { name, lines, fields: [
    field("Commitment", `${money(qty * price)}${currency}`),
    field("Machines (available + Ex-Stock)", total === null ? null : `${fmt(avl)} + ${fmt(ex)} = ${fmt(total)}`, true),
    field("Capacity after", capAfter === null ? null : `${fmt(capAfter)} ${p.uom}`.trim()),
    field("Utilisation after", utilAfter === null ? null : `${Math.round(utilAfter)}%`),
  ] };
}