
// File: src/pages/TeamPlan/components/TeamPlanGuideCard.jsx
// Component: TeamPlanGuideCard
// Module: TeamPlan
// Purpose: Display fixed reference figures for the active plan line.
// AI Tags: team-plan, guide-card, reference-figures, uxlab

import React from "react";
import { Box, Typography } from "@mui/material";
import TipsAndUpdatesRoundedIcon from "@mui/icons-material/TipsAndUpdatesRounded";
import { cardStyle, masterTypo } from "../../../ux/styles";
import { accent, text } from "../../../ux/styles/colorPalette";

const fmt = (n) => new Intl.NumberFormat(undefined, { maximumFractionDigits: 2 }).format(n);
const show = (v) => v == null || String(v).trim() === "" ? "-" : typeof v === "number" ? fmt(v) : String(v);
const withUom = (n, uom) => n == null ? null : `${fmt(n)}${uom ? ` ${uom}` : ""}`;

const LAYOUT = {
  "OI 001": [
    { label: "Mkt demand", get: (i) => i.Mkt_Demand },
    { label: "Additional", get: (i) => i.Addl_Demand },
    { label: "Total", get: (i) => i.Total_Demand },
    { label: "FG stock", get: (i) => i.Stock_Qty },
  ],
  "OI 002": [
    { label: "Stock qty", get: (i) => i.Stock_Qty },
    { label: "Qty per set", get: (i) => i.Qty_Per_Set },
  ],
  "OI 003": [
    { label: "Machines", optional: true, get: (i) => i.machines },
    { label: "Capacity", get: (i) => i.plant && withUom(i.plant.capacity, i.plant.uom) },
    { label: "Load", get: (i) => i.plant && withUom(i.plant.load, i.plant.uom) },
    { label: "Utilisation", get: (i) => i.plant?.utilisation == null ? null : `${fmt(i.plant.utilisation)}%` },
  ],
};

const TAB_NAME = { "OI 001": "Product", "OI 002": "Material", "OI 003": "Machine" };

const hasPartFigure = (i) =>
  i.Mkt_Demand != null || i.Addl_Demand != null || i.Total_Demand != null ||
  i.Stock_Qty != null || i.Qty_Per_Set != null;

// Show the active line's fixed reference figures in one compact card.
const TeamPlanGuideCard = ({ tab, partNo, partName, info, loading = false, error = "", isStub = false }) => {
  const fields = LAYOUT[tab] || [];
  const name = partName ?? info?.Part_Description;
  const body = !partNo
    ? "Select a line to see its guide figures."
    : error
      ? error
      : loading || info === undefined
        ? "Loading guide figures..."
        : info === null || (tab !== "OI 003" && !hasPartFigure(info))
          ? `No guide figure for part ${partNo}.`
          : null;

  const visibleFields = body == null
    ? fields.filter((f) => !(f.optional && f.get(info) == null))
    : [];

  // Keep product demand together and FG stock on its own line.
  const demandFields = tab === "OI 001"
    ? visibleFields.filter((f) => ["Mkt demand", "Additional", "Total"].includes(f.label))
    : [];
  const otherFields = tab === "OI 001"
    ? visibleFields.filter((f) => f.label === "FG stock")
    : visibleFields;

  return (
    <Box
      role="region"
      aria-label="Guide to Operations Decision"
      aria-live="polite"
      sx={{
        ...cardStyle.primary,
        height: "auto",
        p: 1.5,
        borderLeft: `3px solid ${accent.purple}`,
        "&:hover": { transform: "none" },
      }}
    >
      {/* Identify the guide and the selected line without exposing its database key as the title. */}
      <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1, minWidth: 0 }}>
        <Box sx={{ ...cardStyle.statIconCircle(accent.purple), width: 32, height: 32, minWidth: 32, "& svg": { fontSize: 18 } }}>
          <TipsAndUpdatesRoundedIcon />
        </Box>
        <Typography sx={{ ...masterTypo.h6, color: text.title, minWidth: 0, overflowWrap: "anywhere" }}>
          {name ? `Guide on ${name}` : `Guide${TAB_NAME[tab] ? `: ${TAB_NAME[tab]}` : ""}`}
        </Typography>
        {isStub && (
          <Typography sx={{ ...masterTypo.caption, color: text.subtitle, ml: "auto", flexShrink: 0 }}>
            Sample
          </Typography>
        )}
      </Box>

      {/* Preserve the existing loading, error and empty-data states. */}
      {body != null ? (
        <Typography role={error ? "alert" : undefined} sx={{ ...masterTypo.body2, color: error ? "error.main" : text.subtitle }}>
          {body}
        </Typography>
      ) : (
        <Box sx={{ display: "flex", flexDirection: "column", gap: 0.5 }}>
          {demandFields.length > 0 && (
            <Box sx={{ display: "flex", flexWrap: "wrap", columnGap: 2, rowGap: 0.5 }}>
              {demandFields.map((f) => (
                <Typography key={f.label} sx={{ ...masterTypo.body2, color: text.body, fontVariantNumeric: "tabular-nums" }}>
                  <Box component="span" sx={{ color: text.subtitle }}>{f.label}: </Box>
                  <Box component="span" sx={{ fontWeight: 600, color: text.title }}>{show(f.get(info))}</Box>
                </Typography>
              ))}
            </Box>
          )}
          {otherFields.length > 0 && (
            <Box sx={{ display: "flex", flexWrap: "wrap", columnGap: 2, rowGap: 0.5 }}>
              {otherFields.map((f) => (
                <Typography key={f.label} sx={{ ...masterTypo.body2, color: text.body, fontVariantNumeric: "tabular-nums" }}>
                  <Box component="span" sx={{ color: text.subtitle }}>{f.label}: </Box>
                  <Box component="span" sx={{ fontWeight: 600, color: text.title }}>{show(f.get(info))}</Box>
                </Typography>
              ))}
            </Box>
          )}
          {tab === "OI 003" && info?.scope === "plant" && (
            <Typography sx={{ ...masterTypo.caption, color: text.subtitle }}>Plant totals</Typography>
          )}
        </Box>
      )}
    </Box>
  );
};

export default TeamPlanGuideCard;