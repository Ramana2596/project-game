import React from "react";
import { Box, Typography, Select, MenuItem } from "@mui/material";
import { layoutStyle, masterTypo, colors } from "../../../ux/styles";

export function MrHeader({ period, months, onMonthChange }) {
  return (
    <Box sx={layoutStyle.pageHeader}>
      <Typography sx={{ ...masterTypo.h3, color: colors.title }}>Manufacturing Record</Typography>
      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
        <Typography sx={{ ...masterTypo.body2, color: colors.subtitle }}>Production Month</Typography>
        <Select variant="standard" disableUnderline value={months.includes(period) ? period : ""}
          onChange={(e) => onMonthChange(e.target.value)} displayEmpty
          inputProps={{ "aria-label": "Production month" }}
          sx={{ ...masterTypo.body2, fontWeight: 700, color: colors.primary }}>
          {!months.includes(period) && <MenuItem value="">{period || "Select month"}</MenuItem>}
          {months.map((m) => <MenuItem key={m} value={m}>{m}</MenuItem>)}
        </Select>
      </Box>
    </Box>
  );
}