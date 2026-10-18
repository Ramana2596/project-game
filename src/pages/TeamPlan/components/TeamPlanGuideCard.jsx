// File: src/pages/TeamPlan/components/TeamPlanGuideCard.jsx
// Guide half of the info panel: ONE card, synced to the active tab and Part_No.
//   Line 1  Part_No and description (taken from the active plan row)
//   Line 2  the fixed figures for that tab (see LAYOUT)
// Fixed reference figures only. What the plan does to them belongs in the Review half.
// Machine figures are for the whole plant (the SP gives overall capacity and load, not per machine).

import React from "react";
import { alpha, useTheme, Box, Typography } from "@mui/material";

const TAB_NAME = { "OI 001": "Product", "OI 002": "Material", "OI 003": "Machine" };

const fmt = (n) => new Intl.NumberFormat(undefined, { maximumFractionDigits: 2 }).format(n);
const withUom = (n, uom) => (n == null ? null : `${fmt(n)}${uom ? ` ${uom}` : ""}`);

const LAYOUT = {
  "OI 001": [
    { label: "Mkt demand", get: (i) => i.Mkt_Demand },
    { label: "Addl demand", get: (i) => i.Addl_Demand },
    { label: "Total demand", get: (i) => i.Total_Demand },
    { label: "FG stock", get: (i) => i.Stock_Qty },
    { label: "UOM", get: (i) => i.UOM },
  ],
  "OI 002": [
    { label: "Stock qty", get: (i) => i.Stock_Qty },
    { label: "Qty per set", get: (i) => i.Qty_Per_Set },
    { label: "UOM", get: (i) => i.UOM },
  ],
  "OI 003": [
    { label: "Machines", optional: true, get: (i) => i.machines },
    { label: "Capacity", get: (i) => i.plant && withUom(i.plant.capacity, i.plant.uom) },
    { label: "Load", get: (i) => i.plant && withUom(i.plant.load, i.plant.uom) },
    { label: "Utilisation", get: (i) => i.plant && (i.plant.utilisation == null ? null : `${fmt(i.plant.utilisation)}%`) },
  ],
};

// Machine lines use the plant totals; product and material lines need figures of their own.
const hasPartFigure = (i) => i.Mkt_Demand != null || i.Stock_Qty != null || i.Qty_Per_Set != null;

const show = (v) => {
  if (v === null || v === undefined || String(v).trim() === "") return "-";
  return typeof v === "number" ? fmt(v) : String(v);
};

const TeamPlanGuideCard = ({ tab, partNo, partName, info, loading = false, error = "", isStub = false }) => {
  const theme = useTheme();
  const accent = theme.palette.primary.main;
  const fields = LAYOUT[tab] || [];

  let body;
  if (!partNo) {
    body = <Typography variant="body2" color="text.secondary">Select a line to see its guide figures.</Typography>;
  } else if (error) {
    body = <Typography variant="body2" color="error">{error}</Typography>;
  } else if (loading || info === undefined) {
    body = <Typography variant="body2" color="text.secondary">Loading guide figures</Typography>;
  } else if (info === null || (tab !== "OI 003" && !hasPartFigure(info))) {
    body = <Typography variant="body2" color="text.secondary">No guide figure for part {partNo}.</Typography>;
  } else {
    body = (
      <>
        <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
          {partName ?? info.Part_Description}
        </Typography>
        <Box sx={{ display: "flex", flexWrap: "wrap", columnGap: 3, rowGap: 0.5, mt: 0.5 }}>
          {fields.filter((f) => !(f.optional && f.get(info) == null)).map((f) => (
            <Typography key={f.label} variant="body2" sx={{ fontVariantNumeric: "tabular-nums" }}>
              <Box component="span" sx={{ color: "text.secondary" }}>{f.label} </Box>
              <Box component="span" sx={{ fontWeight: 600 }}>{show(f.get(info))}</Box>
            </Typography>
          ))}
        </Box>
      </>
    );
  }

  return (
    <Box
      role="region"
      aria-label="Guide to Operations Decision"
      aria-live="polite"
      sx={{ p: 1.5, borderLeft: `4px solid ${accent}`, borderRadius: 1, bgcolor: alpha(accent, 0.06) }}
    >
      <Typography variant="caption" color="text.secondary" sx={{ display: "block", mb: 0.25 }}>
        Guide to Operations Decision{TAB_NAME[tab] ? `: ${TAB_NAME[tab]}` : ""}{tab === "OI 003" && info?.scope === "plant" ? " (plant total)" : ""}{isStub ? " (sample data)" : ""}
      </Typography>
      {body}
    </Box>
  );
};

export default TeamPlanGuideCard;