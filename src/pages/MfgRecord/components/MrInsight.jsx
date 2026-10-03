import React, { useMemo } from "react";
import { Box, Typography, CircularProgress, Tooltip } from "@mui/material";
import TrackChangesIcon from "@mui/icons-material/TrackChanges";
import { layoutStyle, masterTypo, colors } from "../../../ux/styles";

/* ---- CONFIG ---- */
const TOL_PCT = 0;            // must equal @Tol in UI_Sales_Record_Info and UI_Production_Record_Info
const ORDER_KEY = "orderQty"; // Shop_Order_Qty (launched)
const STAGES = [              // in process order; NULL stages are skipped
  ["fabQty", "Fab"],
  ["assyQty", "Assembly"],
  ["testQty", "Testing"],
  ["sysQty", "System"],
];
const YIELD_GOOD = 95;        // yield % at or above = green
const YIELD_WARN = 90;        // yield % at or above = orange, else red
const CARD_HEIGHT = 88;
const RING = 44;
/* ---------------- */

const TONE = {
  good: colors.success ?? colors.accentBlue,
  warn: colors.accentOrange,
  bad: colors.danger ?? colors.primary,
};

// Same rule as the SPs: compare the exact %, not the rounded one
const levelOf = (pct) => (pct < 100 - TOL_PCT ? "BELOW" : pct > 100 + TOL_PCT ? "ABOVE" : "ON");
const toneOfLevel = (lvl) => (lvl === "BELOW" ? TONE.bad : TONE.good);
const yieldTone = (pct) => (pct >= YIELD_GOOD ? TONE.good : pct >= YIELD_WARN ? TONE.warn : TONE.bad);

const has = (v) => v !== null && v !== undefined && Number.isFinite(Number(v));
const sum = (rows, k) => rows.reduce((a, r) => a + Number(r[k]), 0);
const fmt = (n) => Math.round(n).toLocaleString();
const withUom = (n, uom) => `${fmt(n)}${uom ? ` ${uom}` : ""}`;
const sharedUom = (rows) => {
  const u = [...new Set(rows.map((r) => r.uom).filter(Boolean))];
  return u.length === 1 ? u[0] : u.length === 0 ? "" : null; // null = mixed units
};

// Overall (weighted) ratio of actualKey to refKey. Mixed units: average the per-product %.
function attainment(rows, actualKey, refKey) {
  const r = rows.filter((x) => has(x[actualKey]) && has(x[refKey]) && Number(x[refKey]) > 0);
  if (!r.length) return null;
  const uom = sharedUom(r);
  const actual = sum(r, actualKey);
  const ref = sum(r, refKey);
  const raw =
    uom !== null
      ? (actual / ref) * 100
      : r.reduce((a, x) => a + (Number(x[actualKey]) / Number(x[refKey])) * 100, 0) / r.length;
  return { raw, actual, ref, uom, mixed: uom === null, rows: r };
}

// Walk each product's chain: order -> each stage that has data -> stocked. Sum the drops per stage.
function stageLoss(cards) {
  const drops = {};
  cards.forEach((c) => {
    if (!has(c[ORDER_KEY])) return;
    let prev = Number(c[ORDER_KEY]);
    [...STAGES, ["stockQty", "Stocking"]].forEach(([k, label]) => {
      if (!has(c[k])) return;
      const cur = Number(c[k]);
      if (prev - cur > 0) drops[label] = (drops[label] || 0) + (prev - cur);
      prev = cur;
    });
  });
  const top = Object.entries(drops).sort((a, b) => b[1] - a[1])[0];
  return top ? { label: top[0], qty: top[1] } : null;
}

function buildStats(cards) {
  const stats = [];
  const currency = cards.find((c) => c.currency)?.currency ?? "";
  const cur = currency ? `${currency} ` : "";

  const ratioStat = (key, label, a, sub) =>
    a && {
      key, label, pct: a.raw, tone: toneOfLevel(levelOf(a.raw)),
      head: a.mixed ? `${a.rows.length} products, average` : `${fmt(a.actual)} of ${withUom(a.ref, a.uom)}`,
      sub,
    };

  // 1. TOP SELLER: product with the highest share of the month's sales value (sharePct from the SP)
  const ranked = cards.filter((c) => has(c.sharePct)).sort((a, b) => b.sharePct - a.sharePct);
  if (ranked.length) {
    const others =
      ranked.slice(1, 3).map((c) => `${c.product} ${Math.round(c.sharePct)}%`).join(" · ") +
      (ranked.length > 3 ? ` +${ranked.length - 3}` : "");
    stats.push({
      key: "top", label: "Top Seller", pct: ranked[0].sharePct, tone: colors.accentBlue,
      head: ranked[0].product,
      sub: ranked.length === 1 ? "share of month's sales value" : others,
      tip: ["Share of the month's sales value", ...ranked.map((c) => `${c.product}: ${Math.round(c.sharePct)}%`)],
    });
  }

  // 2. BUSINESS PLAN: Σ soldQty / Σ salesTarget
  const biz = ratioStat("biz", "Business Plan", attainment(cards, "soldQty", "salesTarget"), "sold vs sales target");
  if (biz) stats.push(biz);

  // 3. OPERATIONS PLAN: Σ stockQty / Σ planQty
  const ops = ratioStat("ops", "Operations Plan", attainment(cards, "stockQty", "planQty"), "stocked vs plan");
  if (ops) stats.push(ops);

  // 4. YIELD: Σ stockQty (accepted) / Σ orderQty (launched)
  const y = attainment(cards, "stockQty", ORDER_KEY);
  if (y) {
    const loss = stageLoss(cards);
    const rejected = Math.max(y.ref - y.actual, 0);
    stats.push({
      key: "yield", label: "Yield", pct: y.raw, tone: yieldTone(y.raw),
      head: y.mixed ? `${y.rows.length} products, average` : `${fmt(y.actual)} of ${withUom(y.ref, y.uom)}`,
      sub: rejected > 0 && !y.mixed
        ? `${withUom(rejected, y.uom)} rejected${loss ? `, most at ${loss.label}` : ""}`
        : rejected > 0 ? "some rejects" : "accepted of launched, no rejects",
    });
  }

  // 5. REVENUE PLAN: Σ salesValue / Σ salesTargetValue (one currency only)
  const rv = cards.filter((c) => has(c.salesValue) && has(c.salesTargetValue) && Number(c.salesTargetValue) > 0);
  const oneCurrency = new Set(rv.map((c) => c.currency).filter(Boolean)).size <= 1;
  if (rv.length && oneCurrency) {
    const actual = sum(rv, "salesValue");
    const planned = sum(rv, "salesTargetValue");
    const raw = (actual / planned) * 100;
    stats.push({
      key: "rev", label: "Revenue Plan", pct: raw, tone: toneOfLevel(levelOf(raw)),
      head: `${cur}${fmt(actual)} of ${fmt(planned)}`,
      sub: "sales value vs target value",
    });
  }

  return stats;
}

const cardSx = {
  height: CARD_HEIGHT, px: 1, py: 0.5, border: "1px solid", borderColor: "divider", borderRadius: 2,
  display: "flex", flexDirection: "column", minWidth: 0, overflow: "hidden",
};
const clamp = (n) => ({ display: "-webkit-box", WebkitLineClamp: n, WebkitBoxOrient: "vertical", overflow: "hidden" });

// Ring with the % written on the chart
function Ring({ pct, tone, size = RING }) {
  const v = Math.max(0, Math.min(pct, 100));
  return (
    <Box sx={{ position: "relative", width: size, height: size, flexShrink: 0 }}>
      <CircularProgress variant="determinate" value={100} size={size} thickness={5}
        sx={{ color: "divider", position: "absolute", inset: 0 }} />
      <CircularProgress variant="determinate" value={v} size={size} thickness={5}
        sx={{ color: tone, position: "absolute", inset: 0 }} />
      <Box sx={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
        <Typography sx={{ ...masterTypo.caption, fontWeight: 700, lineHeight: 1, color: colors.title }}>
          {Math.round(pct)}%
        </Typography>
      </Box>
    </Box>
  );
}

function StatCard({ stat }) {
  const body = (
    <Box sx={cardSx}>
      <Typography noWrap sx={{ ...masterTypo.caption, fontWeight: 700, color: colors.muted }}>{stat.label}</Typography>
      <Box sx={{ display: "flex", alignItems: "center", gap: 1, flex: 1, minHeight: 0 }}>
        <Ring pct={stat.pct} tone={stat.tone} />
        <Box sx={{ minWidth: 0 }}>
          <Typography sx={{ ...masterTypo.body2, fontWeight: 700, lineHeight: 1.3, color: colors.title, ...clamp(1) }}>
            {stat.head}
          </Typography>
          <Typography sx={{ ...masterTypo.caption, fontWeight: 400, color: colors.muted, ...clamp(2) }}>
            {stat.sub}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
  return stat.tip ? (
    <Tooltip arrow title={<Box>{stat.tip.map((t) => <div key={t}>{t}</div>)}</Box>}>{body}</Tooltip>
  ) : body;
}

export function MrInsight({ cards = [] }) {
  const stats = useMemo(() => buildStats(cards), [cards]);

  return (
    <Box sx={{ ...layoutStyle.compactPanel, p: 1, mb: 1 }}>
      <Box sx={{ display: "flex", alignItems: "center", gap: 0.5, mb: 0.5 }}>
        <TrackChangesIcon sx={{ color: colors.primary, fontSize: 18 }} />
        <Typography sx={{ ...masterTypo.h6, lineHeight: 1.2, color: colors.title }}>Insight</Typography>
      </Box>
      {stats.length === 0 ? (
        <Typography sx={{ ...masterTypo.body2, color: colors.muted }}>No insight for this month yet.</Typography>
      ) : (
        <Box sx={{ display: "grid", gap: 0.75,
          gridTemplateColumns: { xs: "repeat(2, minmax(0, 1fr))", md: "repeat(3, minmax(0, 1fr))", lg: "repeat(5, minmax(0, 1fr))" } }}>
          {stats.map((s) => <StatCard key={s.key} stat={s} />)}
        </Box>
      )}
    </Box>
  );
}