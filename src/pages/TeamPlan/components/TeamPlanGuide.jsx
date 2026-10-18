// File: src/pages/TeamPlan/components/TeamPlanGuide.jsx
// Step 1 of TeamPlan: "Guide to Operations Decision" - the situation BEFORE the user decides.
// It is a snapshot: figures come from useTeamPlanGuide and do not move as the user types.
//
// HOW TO PLUG IN AN ITEM (one at a time):
//   1. Make useTeamPlanGuide return a value under the item's id (see GUIDE_ITEMS below).
//   2. Nothing else. Items with no value show "Not connected yet"; items with a value render.
//      type "value" -> a number          e.g. guide.marketDemand = 1200
//      type "list"  -> [{ label, value, note? }]   e.g. guide.rawStock = [{ label: "Product A", value: 340 }]
//   Purchase is still to be defined: replace its placeholder item when we agree the content.

import React from "react";
import { alpha, useTheme, Box, Chip, Typography } from "@mui/material";

export const GUIDE_ITEMS = [
  { id: "marketDemand", section: "Products", title: "Market demand", type: "value", unit: "units",
    help: "How much the market is expected to buy this month." },
  { id: "fgStock", section: "Products", title: "Existing finished-goods stock", type: "value", unit: "units",
    help: "Stock already on hand, which reduces what you need to produce." },
  { id: "plantCapacity", section: "Operations", title: "Plant capacity available", type: "value", unit: "units",
    help: "The most the plant can make this month." },
  { id: "plantLoad", section: "Operations", title: "Plant load already committed", type: "value", unit: "units",
    help: "Capacity already used before this plan." },
  { id: "rawStock", section: "Operations", title: "Raw material stock per product", type: "list", unit: "units",
    help: "How many units of each product existing materials can already make." },
  { id: "purchase", section: "Purchase", title: "To be defined", type: "value", unit: "",
    help: "We will agree what the user needs to know before deciding purchases." },
];

const SECTIONS = ["Products", "Operations", "Purchase"];
const fmt = (n) => new Intl.NumberFormat(undefined, { maximumFractionDigits: 0 }).format(n);
const isNum = (v) => typeof v === "number" && Number.isFinite(v);
const has = (v) => v !== undefined && v !== null;

// Figures worked out from the items above, shown only when their inputs are connected.
export function deriveGuide(guide = {}) {
  const out = [];
  if (isNum(guide.marketDemand) && isNum(guide.fgStock)) {
    out.push({ id: "netToProduce", title: "Net to produce", unit: "units",
      value: Math.max(guide.marketDemand - guide.fgStock, 0), help: "Market demand minus finished-goods stock." });
  }
  if (isNum(guide.plantCapacity) && isNum(guide.plantLoad)) {
    out.push({ id: "capacityFree", title: "Capacity still free", unit: "units",
      value: Math.max(guide.plantCapacity - guide.plantLoad, 0), help: "Plant capacity minus load already committed." });
  }
  return out;
}

function ItemBlock({ item, value }) {
  const connected = has(value);
  return (
    <Box sx={{ p: 2.5, minWidth: 0 }}>
      <Typography variant="body2" color="text.secondary">{item.title}</Typography>
      {!connected ? (
        <>
          <Typography sx={{ mt: 0.5, fontSize: 20, fontWeight: 600, color: "text.disabled" }}>Not connected yet</Typography>
          <Typography variant="caption" color="text.secondary" sx={{ display: "block", mt: 0.5 }}>{item.help}</Typography>
        </>
      ) : item.type === "list" ? (
        <Box component="ul" sx={{ listStyle: "none", m: 0, p: 0, mt: 1, display: "grid", gap: 0.75 }}>
          {value.map((r, i) => (
            <Box component="li" key={`${r.label}-${i}`} sx={{ display: "flex", justifyContent: "space-between", gap: 2 }}>
              <Typography variant="body2" noWrap>{r.label}</Typography>
              <Typography variant="body2" sx={{ fontWeight: 600, fontVariantNumeric: "tabular-nums" }}>
                {isNum(r.value) ? fmt(r.value) : r.value}{r.note ? ` (${r.note})` : ""}
              </Typography>
            </Box>
          ))}
        </Box>
      ) : (
        <Box sx={{ display: "flex", alignItems: "baseline", gap: 0.75, mt: 0.5 }}>
          <Typography component="p" sx={{ fontSize: { xs: 28, md: 34 }, fontWeight: 700, lineHeight: 1.1, fontVariantNumeric: "tabular-nums" }}>
            {isNum(value) ? fmt(value) : String(value)}
          </Typography>
          {item.unit && <Typography variant="body2" color="text.secondary">{item.unit}</Typography>}
        </Box>
      )}
    </Box>
  );
}

const TeamPlanGuide = ({ guide = {}, loading = false, error = "", compact = false }) => {
  const theme = useTheme();
  const divider = `1px solid ${theme.palette.divider}`;
  const derived = deriveGuide(guide);

  // Compact strip above the table while the user is deciding: connected figures only.
  if (compact) {
    const chips = [
      ...GUIDE_ITEMS.filter((i) => i.type === "value" && isNum(guide[i.id])).map((i) => ({ id: i.id, label: i.title, value: guide[i.id] })),
      ...derived.map((d) => ({ id: d.id, label: d.title, value: d.value })),
    ];
    if (!chips.length) return null;
    return (
      <Box aria-label="Guide to Operations Decision" sx={{ display: "flex", flexWrap: "wrap", gap: 1, px: 2, pt: 2 }}>
        {chips.map((c) => (
          <Chip key={c.id} size="small" variant="outlined" label={`${c.label}: ${fmt(c.value)}`}
            sx={{ bgcolor: alpha(theme.palette.primary.main, 0.05) }} />
        ))}
      </Box>
    );
  }

  return (
    <Box>
      <Box sx={{ p: 2.5, borderBottom: divider }}>
        <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>Guide to Operations Decision</Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
          The situation before you decide. These figures are fixed for this plan and do not change as you enter quantities.
        </Typography>
        {loading && <Typography variant="caption" color="text.secondary">Loading guide figures</Typography>}
        {error && <Typography variant="caption" color="error">{error}</Typography>}
      </Box>

      {SECTIONS.map((section) => {
        const items = GUIDE_ITEMS.filter((i) => i.section === section);
        const extra = section === "Products" ? derived.filter((d) => d.id === "netToProduce")
          : section === "Operations" ? derived.filter((d) => d.id === "capacityFree") : [];
        return (
          <Box key={section} component="section" aria-label={section} sx={{ borderBottom: divider }}>
            <Typography variant="subtitle2" sx={{ px: 2.5, pt: 2, fontWeight: 600 }}>{section}</Typography>
            <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", md: "repeat(auto-fit, minmax(240px, 1fr))" },
              "& > *": { borderBottom: { xs: divider, md: "none" } } }}>
              {items.map((item) => <ItemBlock key={item.id} item={item} value={guide[item.id]} />)}
              {extra.map((d) => <ItemBlock key={d.id} item={{ ...d, type: "value" }} value={d.value} />)}
            </Box>
          </Box>
        );
      })}
    </Box>
  );
};

export default TeamPlanGuide;