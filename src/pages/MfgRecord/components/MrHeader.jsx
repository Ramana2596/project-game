import React from "react";
import { Box, Typography, Select, MenuItem } from "@mui/material";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import { layoutStyle, masterTypo, colors } from "../../../ux/styles";

export function MrHeader({ period, months, onMonthChange }) {
  const known = months.includes(period);
  return (
    <Box sx={{ ...layoutStyle.pageHeader, display: "grid", gridTemplateColumns: "1fr auto 1fr",
      alignItems: "center", gap: 1, minHeight: 0, height: "auto", p: 0, py: 0.25, m: 0, mb: 0.5 }}>
      <span />

      <Typography noWrap sx={{ ...masterTypo.h4, lineHeight: 1.1, color: colors.title, textAlign: "center", m: 0 }}>
        Manufacturing Record
      </Typography>

      {/* Month picker: right-justified in the right cell */}
      <Box sx={{ justifySelf: "end", display: "flex", alignItems: "center", gap: 0.5, pl: 0.75, pr: 0.25, py: 0,
        border: `1px solid ${colors.divider}`, borderRadius: 4 }}>
        <CalendarMonthIcon sx={{ fontSize: 18, color: colors.subtitle }} />
        <Select variant="standard" disableUnderline value={known ? period : ""}
          onChange={(e) => onMonthChange(e.target.value)} displayEmpty
          inputProps={{ "aria-label": "Production month" }}
          sx={{ ...masterTypo.body2, fontWeight: 700, color: colors.primary,
            "& .MuiSelect-select": { py: 0 } }}>
          {!known && <MenuItem value="">{period || "Select month"}</MenuItem>}
          {months.map((m) => <MenuItem key={m} value={m}>{m}</MenuItem>)}
        </Select>
      </Box>
    </Box>
  );
}