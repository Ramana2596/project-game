
/**
 * Component Name: FinBSHeader
 * Module: Finance / FinBS
 * Purpose: Cut-off month control: shows the selected month (or "All periods") and opens a month picker.
 * Author/Version: UXLab / v1.0
 * AI Tags: month picker, calendar, cut-off month, header
 */

import React, { useState } from "react";
import { Box, Button, IconButton, Popover, TextField, Typography } from "@mui/material";
import CalendarMonthRoundedIcon from "@mui/icons-material/CalendarMonthRounded";
import { buttonStyle, masterTypo } from "../../../ux/styles";
import { brand, surface, text } from "../../../ux/styles/colorPalette";
import { formatMonthLabel } from "../utils/formatters";

// Compact calendar control
const iconControlSx = {
  ...buttonStyle.icon,
  background: surface.panelAlt,
  color: text.heading,
  borderRadius: 2,
  width: 32,
  height: 32,
};

// Render
export default function FinBSHeader({ month, onMonthChange }) {
  const [anchor, setAnchor] = useState(null);
  const monthText = month ? formatMonthLabel(month) : "All periods";

  return (
    <Box sx={{ display: "flex", alignItems: "center", gap: 1, minHeight: 32 }}>
      <Typography
        sx={{
          ...masterTypo.h6,
          color: brand.primary,
          lineHeight: 1.2,
        }}
      >
        {monthText}
      </Typography>

      <IconButton
        sx={iconControlSx}
        aria-label="Change month"
        onClick={(e) => setAnchor(e.currentTarget)}
      >
        <CalendarMonthRoundedIcon sx={{ fontSize: 18 }} />
      </IconButton>

      {/* Month popover: pick a cut-off month or show every period */}
      <Popover
        open={Boolean(anchor)}
        anchorEl={anchor}
        onClose={() => setAnchor(null)}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Box
          sx={{
            p: 2,
            display: "flex",
            flexDirection: "column",
            gap: 1.5,
            minWidth: 240,
          }}
        >
          <TextField
            size="small"
            type="month"
            label="Up to month"
            value={month}
            onChange={(event) => onMonthChange(event.target.value)}
            InputLabelProps={{ shrink: true }}
            sx={{ "& .MuiOutlinedInput-root": { borderRadius: 3 } }}
          />

          <Button
            sx={buttonStyle.text}
            onClick={() => {
              onMonthChange("");
              setAnchor(null);
            }}
          >
            Show all periods
          </Button>
        </Box>
      </Popover>
    </Box>
  );
}
