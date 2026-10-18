// File: src/pages/TeamPlan/components/TeamPlanInsights.jsx
// KPI + Insight view for the Operations Plan. Read-only: everything is derived from
// the same tabDataMap / tabStatusMap / rowErrors that useTeamPlan gives the table,
// so it updates live as the user edits.
//
// How the plan data is read (from useTeamPlan V5):
//   OI 001        Quantity            = units planned for production
//   OI 002 / 003  Required_Quantity   = what the team needs (blank = undecided, 0 = not ordering now)
//                 Quantity            = what is actually bought (set by the price tier)
//                 Unit_Price          = price per unit for that tier
//                 spend               = Quantity x Unit_Price   (the values that get saved)
//   OI 003 is assets (Buy_Asset); every other purchase tab is materials (Buy_Material).
//   Asset spend is shown, but left out of "cost per unit".
//
// Likely figures are projections from what the user has entered so far, saved or not.
//   Production value   = OI 001 Quantity x Unit_Price (needs a unit price on OI 001 rows)
//   Purchase commitment = purchase spend; saved tabs = committed, unsaved tabs = pending
//   Plant load         = units planned / capacity (capacity typed in the view, or plantCapacity prop)
//   Strategy advantage = cost at the highest-priced option offered for the same required
//                        quantity, minus what the chosen tier costs (lovsMap price lists)
//   Fire-fighting      = rows bought through a special source (FIREFIGHT_PATTERN); premium = extra paid vs the cheapest option offered
//   Stock availability = stock for a part vs its Required_Quantity (unknown stock is never guessed)
// Tabs load lazily in the hook, so figures only cover tabs the user has opened.

import React, { useMemo, useState } from "react";
import { alpha, useTheme, Box, Button, Chip, TextField, Typography, Tooltip } from "@mui/material";

const PRODUCTION_TAB = "OI 001";
const ASSET_TAB = "OI 003";
const KNOWN_TABS = ["OI 001", "OI 002", "OI 003"]; // add more here if the plan has them
const PART_KEYS = ["Part_Description", "Part_Name", "Part_No"];
// Stock is read from the row if it carries one of these fields, or from the stockByPart prop
// ({ [Part_No]: quantity }), which wins. Rename the keys to match your data.
// Fire-fighting = a special purchase made to avoid a stock-out (e.g. Ex_Stock). A row counts when
// any of these fields, or the label of its selected price option, matches the pattern.
const FIREFIGHT_PATTERN = /ex[\s_-]?stock/i;
const FIREFIGHT_KEYS = ["Price_Id", "Quantity_Id", "Info_Price", "Purchase_Type", "Source"];
const STOCK_KEYS = ["Stock_Quantity", "Available_Stock", "Stock_Available", "Available_Quantity", "On_Hand_Quantity"];

const num = (v) => {
  const n = Number(String(v ?? "").replace(/,/g, ""));
  return Number.isFinite(n) ? n : 0;
};
const isBlank = (v) => v === null || v === undefined || String(v).trim() === "";
const fmtInt = (n) => new Intl.NumberFormat(undefined, { maximumFractionDigits: 0 }).format(n);
const fmtMoney = (n) =>
  new Intl.NumberFormat(undefined, { maximumFractionDigits: Math.abs(n) >= 100 ? 0 : 2 }).format(n);
const fmtPct = (n) => `${Math.round(n * 100)}%`;
const plural = (n, one, many) => `${n} ${n === 1 ? one : many}`;

const partLabel = (row) => {
  for (const k of PART_KEYS) if (!isBlank(row?.[k])) return String(row[k]);
  return "Unnamed part";
};

const STATUS_LABEL = { unseen: "Not opened", saved: "Saved", unsaved: "Unsaved changes" };

/* ----------------------------- calculations ----------------------------- */

function analyse(tabDataMap = {}, tabStatusMap = {}, lovsMap = {}, stockByPart = null) {
  const allTabs = [...new Set([...KNOWN_TABS, ...Object.keys(tabDataMap)])];
  const loaded = (t) => Array.isArray(tabDataMap[t]);
  const statusOf = (t) => (loaded(t) ? tabStatusMap[t] || "saved" : "unseen");

  const prodRows = tabDataMap[PRODUCTION_TAB] || [];
  const units = prodRows.reduce((s, r) => s + num(r.Quantity), 0);
  const productionValue = prodRows.reduce((s, r) => s + num(r.Quantity) * num(r.Unit_Price), 0);
  const hasSellPrice = prodRows.some((r) => num(r.Unit_Price) > 0);

  const perTab = allTabs.map((tab) => {
    const rows = tabDataMap[tab] || [];
    const status = statusOf(tab);
    if (tab === PRODUCTION_TAB) {
      return { tab, rows: rows.length, decided: rows.filter((r) => !isBlank(r.Quantity)).length, spend: 0, status };
    }
    return {
      tab, rows: rows.length, status,
      decided: rows.filter((r) => !isBlank(r.Required_Quantity)).length,
      spend: rows.reduce((s, r) => s + num(r.Quantity) * num(r.Unit_Price), 0),
    };
  });

  const lines = allTabs
    .filter((t) => t !== PRODUCTION_TAB)
    .flatMap((tab) =>
      (tabDataMap[tab] || []).map((r) => {
        const required = isBlank(r.Required_Quantity) ? null : num(r.Required_Quantity);
        const qty = num(r.Quantity);
        const price = num(r.Unit_Price);
        // Strategy: compare the chosen tier with the highest-priced option offered.
        const tiers = lovsMap?.[tab]?.[r.Part_No]?.Price_Lov || [];
        const prices = tiers.map((x) => num(x.Unit_Price)).filter((x) => x > 0);
        const baseUnit = prices.length > 1 ? Math.max(...prices) : null;
        const advantage = baseUnit !== null && required > 0 && qty > 0 ? baseUnit * required - qty * price : null;
        const rowStock = STOCK_KEYS.map((k) => r[k]).find((v) => !isBlank(v));
        const stockRaw = stockByPart && !isBlank(stockByPart[r.Part_No]) ? stockByPart[r.Part_No] : rowStock;
        const stock = isBlank(stockRaw) ? null : num(stockRaw);
        const chosenLabel = tiers.find((x) => x.Price_Id === r.Price_Id)?.Info_Price;
        const special = qty > 0 && FIREFIGHT_PATTERN.test([...FIREFIGHT_KEYS.map((k) => r[k]), chosenLabel].filter((v) => !isBlank(v)).join(" "));
        const cheapest = prices.length ? Math.min(...prices) : null;
        const premium = special && cheapest !== null && price > cheapest ? (price - cheapest) * qty : 0;
        return {
          tab, label: partLabel(r), required, qty, price, spend: qty * price, advantage, stock, special, premium,
          extra: required > 0 && qty > required ? qty - required : 0,
          short: required > 0 && qty < required ? required - qty : 0,
        };
      })
    );

  const spend = lines.reduce((s, l) => s + l.spend, 0);
  const materialSpend = lines.filter((l) => l.tab !== ASSET_TAB).reduce((s, l) => s + l.spend, 0);
  const committed = perTab.filter((t) => t.status === "saved").reduce((s, t) => s + t.spend, 0);
  const pending = perTab.filter((t) => t.status === "unsaved").reduce((s, t) => s + t.spend, 0);
  const extraCost = lines.reduce((s, l) => s + l.extra * l.price, 0);

  const scored = lines.filter((l) => l.advantage !== null);
  const advantage = scored.reduce((s, l) => s + l.advantage, 0);
  const strategyParts = [...scored].sort((a, b) => b.advantage - a.advantage).slice(0, 5);

  const stocked = lines.filter((l) => l.stock !== null && l.required > 0);
  const stockShort = stocked.filter((l) => l.stock < l.required);
  const stockShortUnits = stockShort.reduce((s, l) => s + (l.required - l.stock), 0);
  const special = lines.filter((l) => l.special);
  const specialSpend = special.reduce((s, l) => s + l.spend, 0);
  const specialPremium = special.reduce((s, l) => s + l.premium, 0);
  const stockOpen = stockShort.filter((l) => !l.special);
  const stockWorst = [...stockShort].sort((x, y) => (y.required - y.stock) - (x.required - x.stock)).slice(0, 5);

  const totalRows = perTab.reduce((s, t) => s + t.rows, 0);
  return {
    stocked, stockShort, stockShortUnits, stockWorst, special, specialSpend, specialPremium, stockOpen,
    allTabs, perTab, units, productionValue, hasSellPrice, lines, spend, materialSpend, committed, pending,
    extraCost, scored, advantage, strategyParts,
    eligible: lines.filter((l) => l.required > 0).length,
    stockCovered: stocked.length - stockShort.length,
    margin: productionValue > 0 ? (productionValue - materialSpend) / productionValue : null,
    undecided: lines.filter((l) => l.required === null),
    unpriced: lines.filter((l) => l.required > 0 && l.price <= 0),
    withExtra: lines.filter((l) => l.extra > 0),
    withShort: lines.filter((l) => l.short > 0),
    completeness: totalRows ? perTab.reduce((s, t) => s + t.decided, 0) / totalRows : 0,
    loadedTabs: perTab.filter((t) => t.status !== "unseen").length,
    savedTabs: perTab.filter((t) => t.status === "saved").length,
  };
}

function buildInsights(a, tabStatusMap, rowErrors, currentTab, calculating, capacity) {
  const out = [];
  const errorEntries = Object.entries(rowErrors || {});
  if (errorEntries.length) {
    const [key, message] = errorEntries[0];
    out.push({ level: "error", tab: currentTab,
      title: `${plural(errorEntries.length, "row has", "rows have")} errors on ${currentTab}`,
      detail: `${message} (part ${String(key).split("|")[0]}). Fix before saving.` });
  }
  if (calculating)
    out.push({ level: "info", tab: null, title: "Prices are recalculating",
      detail: "Figures may change in a moment. Saving is paused until this finishes." });

  const load = capacity ? a.units / capacity : null;
  if (load !== null && load > 1)
    out.push({ level: "error", tab: PRODUCTION_TAB, title: `Plan exceeds plant capacity by ${fmtPct(load - 1)}`,
      detail: `${fmtInt(a.units)} units planned against ${fmtInt(capacity)}. Lower the OI 001 quantity or add capacity.` });
  else if (load !== null && load > 0.9)
    out.push({ level: "warning", tab: PRODUCTION_TAB, title: `Plant is ${fmtPct(load)} loaded`,
      detail: "Little room is left for rework or a late change in demand." });
  else if (load !== null && load < 0.6 && a.units > 0)
    out.push({ level: "info", tab: PRODUCTION_TAB, title: `Plant is only ${fmtPct(load)} loaded`,
      detail: "There is room to plan more output this month." });

  if (a.loadedTabs && !a.hasSellPrice && a.units > 0)
    out.push({ level: "warning", tab: PRODUCTION_TAB, title: "Production value can't be worked out",
      detail: "OI 001 rows have no unit price, so likely sales revenue shows as n/a." });
  if (a.productionValue > 0 && a.materialSpend > a.productionValue)
    out.push({ level: "error", tab: "OI 002",
      title: "Material purchases exceed production value",
      detail: `${fmtMoney(a.materialSpend)} of materials against ${fmtMoney(a.productionValue)} of output.` });

  if (a.stockOpen.length)
    out.push({ level: "warning", tab: a.stockOpen[0].tab,
      title: `${plural(a.stockOpen.length, "part has", "parts have")} less stock than required and no special purchase`,
      detail: `First: ${a.stockOpen[0].label}. Consider a special source such as Ex_Stock to avoid a stock-out.` });
  if (a.special.length)
    out.push({ level: "info", tab: a.special[0].tab,
      title: `${plural(a.special.length, "special purchase", "special purchases")} used to avoid stock-outs`,
      detail: `${fmtMoney(a.specialSpend)} spent${a.specialPremium > 0 ? `, ${fmtMoney(a.specialPremium)} above the cheapest option` : ""}. Planning these parts earlier avoids the premium.` });

  const unsaved = Object.entries(tabStatusMap || {}).filter(([, s]) => s === "unsaved").map(([t]) => t);
  if (unsaved.length)
    out.push({ level: "warning", tab: unsaved[0], title: `Unsaved changes in ${unsaved.join(", ")}`,
      detail: `${fmtMoney(a.pending)} of the commitment is not saved yet.` });

  if (a.unpriced.length)
    out.push({ level: "warning", tab: a.unpriced[0].tab,
      title: `${plural(a.unpriced.length, "part needs", "parts need")} a price`,
      detail: `Required quantity is set but no price is applied. First: ${a.unpriced[0].label}.` });
  if (a.undecided.length)
    out.push({ level: "warning", tab: a.undecided[0].tab,
      title: `${plural(a.undecided.length, "part has", "parts have")} no required quantity`,
      detail: "Blank means undecided. Enter 0 for parts you are not ordering now." });
  if (a.withShort.length)
    out.push({ level: "warning", tab: a.withShort[0].tab,
      title: `${plural(a.withShort.length, "part is", "parts are")} bought below the required quantity`,
      detail: "Check the selected price tier." });
  if (a.extraCost > 0)
    out.push({ level: "info", tab: a.withExtra[0].tab, title: `Price tiers add ${fmtMoney(a.extraCost)} of extra stock`,
      detail: `${plural(a.withExtra.length, "part is", "parts are")} bought above the required quantity. This is already netted off the strategy advantage.` });

  const unseen = a.perTab.filter((t) => t.status === "unseen").map((t) => t.tab);
  if (unseen.length)
    out.push({ level: "info", tab: unseen[0], title: `${plural(unseen.length, "tab is", "tabs are")} not included yet`,
      detail: `Open ${unseen.join(", ")} to add ${unseen.length === 1 ? "it" : "them"} to these figures.` });

  if (!out.length)
    out.push({ level: "success", tab: null, title: "Plan looks complete",
      detail: "Every row has a quantity and a price, and all tabs are saved." });
  return out;
}

/* -------------------------------- pieces -------------------------------- */

function Metric({ label, value, hint, tone }) {
  const theme = useTheme();
  return (
    <Box sx={{ flex: "1 1 180px", minWidth: 0, p: 2.5 }}>
      <Typography variant="body2" color="text.secondary">{label}</Typography>
      <Typography component="p" sx={{
        mt: 0.5, fontSize: { xs: 28, md: 34 }, fontWeight: 700, lineHeight: 1.1,
        fontVariantNumeric: "tabular-nums", color: tone ? theme.palette[tone].main : "text.primary",
      }}>{value}</Typography>
      {hint && <Typography variant="caption" color="text.secondary" sx={{ display: "block", mt: 0.5 }}>{hint}</Typography>}
    </Box>
  );
}

// The memorable element: where the money sits, as one proportional strip across the purchase tabs.
function SpendStrip({ perTab, spend }) {
  const theme = useTheme();
  const tabs = perTab.filter((t) => t.spend > 0);
  const shades = [1, 0.72, 0.5, 0.34, 0.22];
  if (!spend) {
    return (
      <Box sx={{ p: 2.5 }}>
        <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>Where the purchase commitment sits</Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
          No spend yet. Once parts have a required quantity and a price, you will see how cost splits between tabs.
        </Typography>
      </Box>
    );
  }
  return (
    <Box sx={{ p: 2.5 }}>
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", flexWrap: "wrap", gap: 1 }}>
        <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>Where the purchase commitment sits</Typography>
        <Typography variant="body2" color="text.secondary">
          {fmtMoney(spend)} across {plural(tabs.length, "tab", "tabs")}
        </Typography>
      </Box>
      <Box role="img"
        aria-label={`Spend by tab: ${tabs.map((t) => `${t.tab} ${fmtPct(t.spend / spend)}`).join(", ")}`}
        sx={{ display: "flex", height: 44, mt: 2, borderRadius: 1, overflow: "hidden", gap: "2px" }}>
        {tabs.map((t, i) => {
          const shade = shades[i % shades.length];
          return (
            <Tooltip key={t.tab} title={`${t.tab}: ${fmtMoney(t.spend)} (${fmtPct(t.spend / spend)})`}>
              <Box sx={{
                flexGrow: t.spend, flexBasis: 0, minWidth: 6, px: 1, overflow: "hidden",
                display: "flex", alignItems: "center", transition: "flex-grow .4s ease",
                bgcolor: alpha(theme.palette.primary.main, shade),
              }}>
                <Typography variant="caption" noWrap sx={{
                  fontWeight: 600, color: shade > 0.5 ? theme.palette.primary.contrastText : "text.primary" }}>
                  {t.tab}{t.tab === ASSET_TAB ? " assets" : ""}
                </Typography>
              </Box>
            </Tooltip>
          );
        })}
      </Box>
    </Box>
  );
}

function PlantLoad({ units, capacity, capacityInput, onCapacityInput }) {
  const theme = useTheme();
  const load = capacity ? units / capacity : null;
  const tone = load === null ? theme.palette.text.disabled
    : load > 1 ? theme.palette.error.main : load > 0.9 ? theme.palette.warning.main : theme.palette.success.main;
  return (
    <Box sx={{ p: 2.5 }}>
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 2, flexWrap: "wrap" }}>
        <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>Plant load</Typography>
        <TextField size="small" type="number" label="Capacity (units)" value={capacityInput}
          onChange={(e) => onCapacityInput(e.target.value)} inputProps={{ min: 0 }} sx={{ width: 150 }} />
      </Box>
      {load === null ? (
        <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
          Enter the plant capacity for this month to see how loaded it will be.
        </Typography>
      ) : (
        <>
          <Box role="img" aria-label={`Plant load ${fmtPct(load)}`}
            sx={{ position: "relative", height: 14, mt: 2, borderRadius: 7, bgcolor: alpha(theme.palette.text.primary, 0.08) }}>
            <Box sx={{ height: "100%", width: `${Math.min(load, 1) * 100}%`, borderRadius: 7, bgcolor: tone, transition: "width .4s ease" }} />
          </Box>
          <Typography variant="body2" sx={{ mt: 1, fontVariantNumeric: "tabular-nums" }}>
            {fmtInt(units)} of {fmtInt(capacity)} units
            {load > 1 ? `, ${fmtInt(units - capacity)} over` : `, ${fmtInt(capacity - units)} free`}
          </Typography>
        </>
      )}
    </Box>
  );
}

function StrategyAdvantage({ a }) {
  const theme = useTheme();
  const max = Math.max(...a.strategyParts.map((p) => Math.abs(p.advantage)), 1);
  return (
    <Box sx={{ p: 2.5 }}>
      <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>Advantage from price strategy</Typography>
      {!a.scored.length ? (
        <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
          Enter a required quantity on a purchase tab. Once a part has several price options, you will see what your choice saves.
        </Typography>
      ) : (
        <>
          <Typography variant="caption" color="text.secondary" sx={{ display: "block", mt: 0.5 }}>
            Against the highest-priced option offered for the same quantity. Covers {a.scored.length} of {a.eligible} ordered parts.
          </Typography>
          <Box component="ol" sx={{ listStyle: "none", m: 0, p: 0, mt: 1.5, display: "grid", gap: 1.25 }}>
            {a.strategyParts.map((p, i) => (
              <Box component="li" key={`${p.tab}-${p.label}-${i}`}>
                <Box sx={{ display: "flex", justifyContent: "space-between", gap: 2 }}>
                  <Typography variant="body2" noWrap sx={{ fontWeight: 500 }}>{p.label}</Typography>
                  <Typography variant="body2" sx={{ fontVariantNumeric: "tabular-nums" }}>{fmtMoney(p.advantage)}</Typography>
                </Box>
                <Box sx={{ height: 6, mt: 0.5, borderRadius: 3, bgcolor: alpha(theme.palette.success.main, 0.12) }}>
                  <Box sx={{ height: "100%", width: `${(Math.abs(p.advantage) / max) * 100}%`, borderRadius: 3, transition: "width .4s ease",
                    bgcolor: p.advantage >= 0 ? theme.palette.success.main : theme.palette.error.main }} />
                </Box>
              </Box>
            ))}
          </Box>
        </>
      )}
    </Box>
  );
}

function StockAvailability({ a }) {
  const theme = useTheme();
  return (
    <Box sx={{ p: 2.5 }}>
      <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>Stock availability</Typography>
      {!a.stocked.length ? (
        <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
          No stock data for the parts you have ordered. Provide it with the stockByPart prop, or a stock field on each row.
        </Typography>
      ) : (
        <>
          <Typography variant="body2" sx={{ mt: 0.5 }}>
            {a.stockCovered} of {a.stocked.length} ordered parts have enough stock
            {a.stockShort.length ? `, ${fmtInt(a.stockShortUnits)} units short overall` : ""}.
          </Typography>
          {a.stockWorst.length > 0 && (
            <Box component="ol" sx={{ listStyle: "none", m: 0, p: 0, mt: 1.5, display: "grid", gap: 1.25 }}>
              {a.stockWorst.map((p, i) => {
                const cover = Math.max(0, Math.min(p.stock / p.required, 1));
                return (
                  <Box component="li" key={`${p.tab}-${p.label}-${i}`}>
                    <Box sx={{ display: "flex", justifyContent: "space-between", gap: 2 }}>
                      <Typography variant="body2" noWrap sx={{ fontWeight: 500 }}>{p.label}</Typography>
                      <Typography variant="body2" sx={{ fontVariantNumeric: "tabular-nums" }}>
                        {fmtInt(p.stock)} of {fmtInt(p.required)}
                      </Typography>
                    </Box>
                    <Box sx={{ height: 6, mt: 0.5, borderRadius: 3, bgcolor: alpha(theme.palette.warning.main, 0.16) }}>
                      <Box sx={{ height: "100%", width: `${cover * 100}%`, borderRadius: 3, transition: "width .4s ease",
                        bgcolor: cover === 0 ? theme.palette.error.main : theme.palette.warning.main }} />
                    </Box>
                  </Box>
                );
              })}
            </Box>
          )}
        </>
      )}
    </Box>
  );
}

function FireFighting({ a }) {
  return (
    <Box sx={{ p: 2.5 }}>
      <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>Fire-fighting done</Typography>
      {!a.special.length ? (
        <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
          No special purchases yet. Parts bought through Ex_Stock or similar sources will be listed here.
        </Typography>
      ) : (
        <>
          <Typography variant="body2" sx={{ mt: 0.5 }}>
            {plural(a.special.length, "part", "parts")} bought through a special source for {fmtMoney(a.specialSpend)}
            {a.specialPremium > 0 ? `, ${fmtMoney(a.specialPremium)} above the cheapest option` : ""}.
          </Typography>
          <Box component="ul" sx={{ listStyle: "none", m: 0, p: 0, mt: 1.5, display: "grid", gap: 1 }}>
            {a.special.slice(0, 6).map((p, i) => (
              <Box component="li" key={`${p.tab}-${p.label}-${i}`} sx={{ display: "flex", justifyContent: "space-between", gap: 2 }}>
                <Box sx={{ minWidth: 0 }}>
                  <Typography variant="body2" noWrap sx={{ fontWeight: 500 }}>{p.label}</Typography>
                  <Typography variant="caption" color="text.secondary">{p.tab}: {fmtInt(p.qty)} at {fmtMoney(p.price)}</Typography>
                </Box>
                <Typography variant="body2" sx={{ fontVariantNumeric: "tabular-nums", flexShrink: 0 }}>
                  {p.premium > 0 ? `+${fmtMoney(p.premium)}` : fmtMoney(p.spend)}
                </Typography>
              </Box>
            ))}
          </Box>
        </>
      )}
    </Box>
  );
}

function Insights({ items, onOpenTab }) {
  const theme = useTheme();
  const colorFor = (lvl) => (lvl === "info" ? theme.palette.info.main : theme.palette[lvl].main);
  const word = { error: "Fix", warning: "Review", info: "Note", success: "Done" };
  return (
    <Box sx={{ p: 2.5 }}>
      <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>What needs attention</Typography>
      <Box component="ul" sx={{ listStyle: "none", m: 0, p: 0, mt: 1.5, display: "grid", gap: 1.25 }}>
        {items.map((it, i) => (
          <Box component="li" key={i} sx={{
            display: "flex", gap: 1.5, alignItems: "flex-start", p: 1.5, borderRadius: 1.5,
            borderLeft: `4px solid ${colorFor(it.level)}`, bgcolor: alpha(colorFor(it.level), 0.06),
          }}>
            <Box sx={{ flex: 1, minWidth: 0 }}>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1, flexWrap: "wrap" }}>
                <Chip size="small" label={word[it.level]} sx={{
                  height: 20, fontWeight: 600, bgcolor: alpha(colorFor(it.level), 0.16), color: colorFor(it.level) }} />
                <Typography variant="body2" sx={{ fontWeight: 600 }}>{it.title}</Typography>
              </Box>
              <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>{it.detail}</Typography>
            </Box>
            {it.tab && (
              <Button size="small" onClick={() => onOpenTab(it.tab)} sx={{ flexShrink: 0 }}>
                Open {it.tab}
              </Button>
            )}
          </Box>
        ))}
      </Box>
    </Box>
  );
}

function TabProgress({ perTab, onOpenTab }) {
  const theme = useTheme();
  const toneFor = (s) => (s === "unsaved" ? theme.palette.warning.main
    : s === "saved" ? theme.palette.success.main : theme.palette.text.disabled);
  return (
    <Box sx={{ p: 2.5 }}>
      <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>Progress by tab</Typography>
      <Box component="ul" sx={{ listStyle: "none", m: 0, p: 0, mt: 1.5, display: "grid", gap: 1.5 }}>
        {perTab.map((t) => {
          const pct = t.rows ? t.decided / t.rows : 0;
          return (
            <Box component="li" key={t.tab}>
              <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 1 }}>
                <Button size="small" onClick={() => onOpenTab(t.tab)} sx={{ fontWeight: 600, px: 0.5, minWidth: 0 }}>
                  {t.tab}
                </Button>
                <Box sx={{ display: "flex", alignItems: "center", gap: 0.75 }}>
                  <Box aria-hidden sx={{ width: 8, height: 8, borderRadius: "50%", bgcolor: toneFor(t.status) }} />
                  <Typography variant="caption" color="text.secondary">{STATUS_LABEL[t.status]}</Typography>
                </Box>
              </Box>
              {t.status === "unseen" ? (
                <Typography variant="caption" color="text.secondary">Open this tab to load its rows.</Typography>
              ) : (
                <>
                  <Box sx={{ height: 6, borderRadius: 3, mt: 0.5, bgcolor: alpha(theme.palette.text.primary, 0.08) }}>
                    <Box sx={{ height: "100%", width: `${pct * 100}%`, borderRadius: 3, transition: "width .4s ease",
                      bgcolor: pct === 1 ? theme.palette.success.main : theme.palette.primary.main }} />
                  </Box>
                  <Typography variant="caption" color="text.secondary">
                    {t.decided} of {plural(t.rows, "row", "rows")} have a quantity
                  </Typography>
                </>
              )}
            </Box>
          );
        })}
      </Box>
    </Box>
  );
}

/* --------------------------------- main --------------------------------- */

const TeamPlanInsights = ({
  tabDataMap, tabStatusMap, lovsMap, rowErrors, currentTab, calculating, plantCapacity = null, stockByPart = null, onOpenTab,
}) => {
  const theme = useTheme();
  const [capacityInput, setCapacityInput] = useState(plantCapacity ? String(plantCapacity) : "");
  const capacity = num(capacityInput) > 0 ? num(capacityInput) : num(plantCapacity) > 0 ? num(plantCapacity) : null;

  const a = useMemo(() => analyse(tabDataMap, tabStatusMap, lovsMap, stockByPart), [tabDataMap, tabStatusMap, lovsMap, stockByPart]);
  const insights = useMemo(
    () => buildInsights(a, tabStatusMap, rowErrors, currentTab, calculating, capacity),
    [a, tabStatusMap, rowErrors, currentTab, calculating, capacity]
  );
  const divider = `1px solid ${theme.palette.divider}`;
  const load = capacity ? a.units / capacity : null;
  const blockers = insights.filter((i) => i.level === "error" || i.level === "warning");
  const notIncluded = a.perTab.filter((t) => t.status === "unseen").length;
  const ready = blockers.length === 0 && notIncluded === 0;

  if (a.loadedTabs === 0) {
    return (
      <Box sx={{ p: 4, textAlign: "center" }}>
        <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>No plan data loaded yet</Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          Open a tab to load its rows. Figures build from the tabs you open.
        </Typography>
        <Button variant="outlined" onClick={() => onOpenTab(currentTab || PRODUCTION_TAB)}>Open plan</Button>
      </Box>
    );
  }

  const readyColor = ready ? theme.palette.success.main : theme.palette.warning.main;
  return (
    <Box>
      <Box role="status" sx={{ p: 2.5, borderBottom: divider, borderLeft: `4px solid ${readyColor}`, bgcolor: alpha(readyColor, 0.06) }}>
        <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
          {ready ? "Ready for approval" : "Not ready for approval yet"}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
          {ready
            ? "Every tab is complete with no errors. Approval happens in the Control Centre."
            : `${plural(blockers.length + (notIncluded ? 1 : 0), "item needs", "items need")} attention before this plan can be approved. Details are listed below.`}
        </Typography>
      </Box>
      <Box sx={{ display: "flex", flexWrap: "wrap", borderBottom: divider,
        "& > *:not(:last-child)": { borderRight: { md: divider } } }}>
        <Metric label="Likely production value"
          value={a.hasSellPrice ? fmtMoney(a.productionValue) : "n/a"}
          hint={a.margin !== null ? `${fmtPct(a.margin)} left after material purchases`
            : a.hasSellPrice ? `${fmtInt(a.units)} units planned` : "OI 001 has no unit price"} />
        <Metric label="Likely purchase commitment" value={fmtMoney(a.spend)}
          hint={`${fmtMoney(a.committed)} saved, ${fmtMoney(a.pending)} unsaved`} />
        <Metric label="Likely plant load" value={load === null ? "Set capacity" : fmtPct(load)}
          tone={load === null ? undefined : load > 1 ? "error" : load > 0.9 ? "warning" : "success"}
          hint={`${fmtInt(a.units)} units planned`} />
        <Metric label="Strategy advantage" value={a.scored.length ? fmtMoney(a.advantage) : "n/a"}
          tone={a.scored.length && a.advantage > 0 ? "success" : undefined}
          hint={a.scored.length ? `Across ${a.scored.length} of ${a.eligible} ordered parts` : "Needs price options"} />
        <Metric label="Stock availability"
          value={a.stocked.length ? fmtPct(a.stockCovered / a.stocked.length) : "n/a"}
          tone={a.stocked.length ? (a.stockShort.length ? "warning" : "success") : undefined}
          hint={a.stocked.length ? `${plural(a.stockShort.length, "part", "parts")} short of required` : "No stock data yet"} />
        <Metric label="Fire-fighting done" value={fmtInt(a.special.length)}
          hint={a.special.length ? `${fmtMoney(a.specialSpend)} spent, ${fmtMoney(a.specialPremium)} premium` : "No special purchases"} />
      </Box>

      <Box sx={{ borderBottom: divider }}><SpendStrip perTab={a.perTab} spend={a.spend} /></Box>

      <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", lg: "3fr 2fr" } }}>
        <Box sx={{ borderRight: { lg: divider }, borderBottom: { xs: divider, lg: "none" } }}>
          <Insights items={insights} onOpenTab={onOpenTab} />
        </Box>
        <Box>
          <Box sx={{ borderBottom: divider }}>
            <PlantLoad units={a.units} capacity={capacity} capacityInput={capacityInput} onCapacityInput={setCapacityInput} />
          </Box>
          <Box sx={{ borderBottom: divider }}><StrategyAdvantage a={a} /></Box>
          <Box sx={{ borderBottom: divider }}><StockAvailability a={a} /></Box>
          <Box sx={{ borderBottom: divider }}><FireFighting a={a} /></Box>
          <TabProgress perTab={a.perTab} onOpenTab={onOpenTab} />
        </Box>
      </Box>
    </Box>
  );
};

export default TeamPlanInsights;