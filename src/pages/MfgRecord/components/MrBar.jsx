import React from "react";
import { Box, Typography } from "@mui/material";
import { masterTypo, colors } from "../../../ux/styles";
import { fmtQty } from "../utils/mrFormat";

// One horizontal bar row: label | bar | value. Bar = value / max. NULL shows "–" with an empty bar.
export function MrBar({ label, value, max, color, strong }) {
  const w = value == null ? 0 : Math.min(100, (value / (max || 1)) * 100);
  return (
    <Box sx={{ display: "grid", gridTemplateColumns: "92px 1fr 52px", alignItems: "center", gap: 1, py: 0.35 }}>
      <Typography sx={{ ...masterTypo.caption, color: colors.subtitle }} noWrap>{label}</Typography>
      <Box sx={{ height: 10, borderRadius: 5, background: colors.panel }}>
        <Box sx={{ width: `${w}%`, height: "100%", borderRadius: 5, background: color }} />
      </Box>
      <Typography sx={{ ...masterTypo.caption, textAlign: "right", fontVariantNumeric: "tabular-nums",
        fontWeight: strong ? 700 : 500, color: colors.title }}>
        {fmtQty(value)}
      </Typography>
    </Box>
  );
}