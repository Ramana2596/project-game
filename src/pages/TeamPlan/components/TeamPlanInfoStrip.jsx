// File: src/pages/TeamPlan/components/TeamPlanInfoStrip.jsx
// Info panel above the tabs: two small cards side by side, each with an icon + title and 2-3 short lines.
//   Guide  (fixed)  what the situation is before you decide
//   Review (live)   what your entries do
// Both follow the active tab and line. Description, Part_No and UOM are not repeated: the highlighted
// table row already shows them.
//
// ASSUMPTIONS (change here if your data differs):
//   Ex-Stock        = the line's selected price source matches EX_STOCK (row.Info_Price). Only Ex-Stock
//                     quantity counts as available this month, on top of existing stock / machines.
//   Sales plan qty  = system driven, a field in SALES_KEYS; lean mode (none) = Production plan qty.
//   Lines           = lines with a quantity above 0 (Quantity on OI 001, Required_Quantity elsewhere).
//   Capacity after  = (available + Ex-Stock machines) x capacity per machine (Guide capacity / machines).

import React from "react";
import { alpha, useTheme, Box, Typography } from "@mui/material";
import { LightbulbOutlined as GuideIcon, FactCheckOutlined as ReviewIcon } from "@mui/icons-material";

const EX_STOCK = /ex[\s_-]?stock/i;
const SALES_KEYS = ["Sales_Quantity", "Sales_Plan_Qty", "Sales_Plan"];

const isBlank = (v) => v === null || v === undefined || String(v).trim() === "";
const num = (v) => {
  const n = Number(String(v ?? "").replace(/,/g, ""));
  return Number.isFinite(n) ? n : 0;
};
const fmt = (n) => (n == null ? null : new Intl.NumberFormat(undefined, { maximumFractionDigits: 2 }).format(n));
const money = (n) => new Intl.NumberFormat(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(n);
const hrs = (n, uom) => (n == null ? null : `${fmt(n)}${uom ? ` ${/^hrs?|hours?/i.test(uom) ? "Hrs" : uom}` : ""}`);
const pct = (n) => (n == null ? null : `${Math.round(n)}%`);
const isExStock = (row) =>
  EX_STOCK.test([row?.Info_Price, row?.Price_Info, row?.Purchase_Preference].filter(Boolean).join(" "));

// Each function returns a flat list of [label, value] items, shown across one row.
export const guideItems = (tab, i) => {
  const p = i.plant;
  if (tab === "OI 001")
    return [["Demand", fmt(i.Mkt_Demand)], ["Additional", fmt(i.Addl_Demand)], ["Total", fmt(i.Total_Demand)], ["FG stock", fmt(i.Stock_Qty)]];
  if (tab === "OI 002")
    return [["Stock", fmt(i.Stock_Qty)], ["Per set", i.Qty_Per_Set]];
  if (tab === "OI 003")
    return [...(i.machines != null ? [["Machines", fmt(i.machines)]] : []),
            ["Capacity", hrs(p?.capacity, p?.uom)], ["Load", hrs(p?.load, p?.uom)], ["Util", pct(p?.utilisation)]];
  return [];
};

// Returns { items, count }: count ("3 of 5") is shown on the card's title row.
export const reviewItems = (tab, row, rows, i) => {
  const qtyKey = tab === "OI 001" ? "Quantity" : "Required_Quantity";
  const count = `${rows.filter((r) => num(r[qtyKey]) > 0).length} of ${rows.length}`;
  const qty = num(row.Quantity);
  const price = num(row.Unit_Price);
  const ex = isExStock(row) ? qty : 0;

  if (tab === "OI 001") {
    const salesRaw = SALES_KEYS.map((k) => row[k]).find((v) => !isBlank(v));
    const sales = salesRaw === undefined ? qty : num(salesRaw); // lean mode: sales plan = production plan
    return { count, items: [["Production", fmt(qty)], ["Sales", fmt(sales)], ["Sales value", money(sales * price)]] };
  }
  if (tab === "OI 002") {
    const stock = i?.Stock_Qty ?? null;
    return { count, items: [["Available (stock + Ex-Stock)", stock === null ? null : `${fmt(stock)} + ${fmt(ex)} = ${fmt(stock + ex)}`]] };
  }
  if (tab === "OI 003") {
    const avl = i?.machines ?? null; // needs the per-machine list from the SP
    const total = avl === null ? null : avl + ex;
    const p = i?.plant;
    const perMachine = avl > 0 && p?.capacity != null ? p.capacity / avl : null;
    const capAfter = total !== null && perMachine !== null ? total * perMachine : null;
    const utilAfter = capAfter > 0 && p?.load != null ? (p.load / capAfter) * 100 : null;
    return { count, items: [
      ["Commitment", money(qty * price)],
      ...(total !== null ? [["Machines", `${fmt(avl)} + ${fmt(ex)} = ${fmt(total)}`]] : []),
      ["Capacity after", hrs(capAfter, p?.uom)],
      ["Util after", pct(utilAfter)],
    ] };
  }
  return { count, items: [] };
};

const hasPartFigure = (i) => i.Mkt_Demand != null || i.Stock_Qty != null || i.Qty_Per_Set != null;

const InfoCard = ({ title, note, right, Icon, accent, live, children }) => (
  <Box
    role="region"
    aria-label={title}
    aria-live={live ? "polite" : undefined}
    sx={{ minWidth: 0, px: 2, py: 1.5, borderRadius: 1.5, border: (t) => `1px solid ${t.palette.divider}`,
          borderLeft: `4px solid ${accent}`, bgcolor: alpha(accent, 0.05) }}
  >
    <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1 }}>
      <Icon aria-hidden sx={{ fontSize: 22, color: accent }} />
      <Typography sx={{ fontSize: 16, fontWeight: 700 }}>{title}</Typography>
      {note && <Typography variant="body2" color="text.secondary">{note}</Typography>}
      {right && (
        <Typography variant="body2" color="text.secondary" sx={{ ml: "auto" }}>
          Lines <Box component="span" sx={{ fontWeight: 700, color: "text.primary" }}>{right}</Box>
        </Typography>
      )}
    </Box>
    {children}
  </Box>
);

// Line 1: labels. Line 2: values, big. Items share the card width equally.
const Items = ({ items }) => (
  <Box sx={{ display: "grid", columnGap: 2, rowGap: 1,
             gridTemplateColumns: { xs: "repeat(2, minmax(0, 1fr))", md: `repeat(${Math.max(items.length, 1)}, minmax(0, 1fr))` } }}>
    {items.map(([label, value]) => (
      <Box key={label} sx={{ minWidth: 0 }}>
        <Typography sx={{ fontSize: 13, lineHeight: 1.3, color: "text.secondary" }}>{label}</Typography>
        <Typography sx={{ fontSize: 18, fontWeight: 700, lineHeight: 1.3, fontVariantNumeric: "tabular-nums", overflowWrap: "anywhere" }}>
          {isBlank(value) ? "-" : value}
        </Typography>
      </Box>
    ))}
  </Box>
);

const Msg = ({ children, error }) => (
  <Typography variant="body1" color={error ? "error" : "text.secondary"}>{children}</Typography>
);

const TeamPlanInfoStrip = ({
  tab, partNo, row, rows = [], info, guideLoading = false, guideError = "", isStub = false,
  unsaved = false, calculating = false,
}) => {
  const theme = useTheme();
  const guideAccent = theme.palette.primary.main;
  const reviewAccent = theme.palette.secondary?.main || theme.palette.primary.dark || guideAccent;

  let guide;
  if (!partNo) guide = <Msg>Select a line</Msg>;
  else if (guideError) guide = <Msg error>{guideError}</Msg>;
  else if (guideLoading || info === undefined) guide = <Msg>Loading</Msg>;
  else if (info === null || (tab !== "OI 003" && !hasPartFigure(info))) guide = <Msg>No guide figure</Msg>;
  else guide = <Items items={guideItems(tab, info)} />;

  const review = row ? reviewItems(tab, row, rows, info) : null;

  return (
    <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" }, gap: 2, mx: 2, mt: 1.5 }}>
      <InfoCard title="Guide" Icon={GuideIcon} accent={guideAccent}
        note={isStub ? "(sample)" : tab === "OI 003" && info?.scope === "plant" ? "(plant)" : ""}>
        {guide}
      </InfoCard>
      <InfoCard title="Review" Icon={ReviewIcon} accent={reviewAccent} live
        note={calculating ? "calculating" : unsaved ? "unsaved" : ""} right={review?.count}>
        {review ? <Items items={review.items} /> : <Msg>Select a line</Msg>}
      </InfoCard>
    </Box>
  );
};

export default TeamPlanInfoStrip;