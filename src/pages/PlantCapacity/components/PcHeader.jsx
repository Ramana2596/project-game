
import React, { useState } from "react";
import {
  Box,
  Button,
  IconButton,
  Popover,
  TextField,
  Typography,
} from "@mui/material";
import CalendarMonthRoundedIcon from "@mui/icons-material/CalendarMonthRounded";
import {
  buttonStyle,
  layoutStyle,
  masterTypo,
  colors,
} from "../../../ux/styles";

const iconControlSx = {
  ...buttonStyle.icon,
  background: colors.primarySoft,
  color: colors.primaryDark,
  borderRadius: 2,
  width: 32,
  height: 32,
};

// Format SP Production_Month as "Mar 2026"
const formatMonthLabel = (value) => {
  if (!value) return "";

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) return "";

  return date.toLocaleDateString("en-US", {
    month: "short",
    year: "numeric",
  });
};

// Convert SP Production_Month to HTML month input value
const toMonthInputValue = (value) => {
  if (!value) return "";

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) return "";

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");

  return `${year}-${month}`;
};

export const PcHeader = ({ productionMonth, onMonthChange }) => {
  const [anchor, setAnchor] = useState(null);

  const monthText = formatMonthLabel(productionMonth);
  const monthInputValue = toMonthInputValue(productionMonth);

  // Select a specific month
  const handleMonthChange = (event) => {
    const value = event.target.value;

    if (!value) return;

    onMonthChange?.(`${value}-01`);
    setAnchor(null);
  };

  // Select latest period through SP null behavior
  const handleAllPeriods = () => {
    onMonthChange?.("");
    setAnchor(null);
  };

  return (
    <Box
      sx={{
        ...layoutStyle.pageHeader,
        py: 0.75,
        minHeight: 54,
        position: "relative",
      }}
    >
      {/* Page heading and returned production month */}
      <Box
        sx={{
          display: "flex",
          alignItems: "baseline",
          gap: 1,
        }}
      >
        <Typography
          variant="h4"
          sx={{
            ...masterTypo.h4,
            color: colors.title,
            lineHeight: 1.15,
          }}
        >
          Plant Capacity & Load
        </Typography>

        {monthText && (
          <Typography
            sx={{
              ...masterTypo.h6,
              color: colors.primaryDark,
              lineHeight: 1.2,
              whiteSpace: "nowrap",
            }}
          >
            as at {monthText}
          </Typography>
        )}
      </Box>

      <Typography
        variant="body2"
        sx={{
          color: colors.subtitle,
          lineHeight: 1.2,
          mt: 0.15,
        }}
      >
        Real-time Analytics: Manufacturing Capacity, Load, Utilisation & Bottleneck
      </Typography>

      {/* FinBS-style period control at top-right */}
      <Box
        sx={{
          position: "absolute",
          top: 8,
          right: 0,
          display: "flex",
          alignItems: "center",
          gap: 0.75,
        }}
      >
        <Typography
          sx={{
            ...masterTypo.h6,
            color: colors.primaryDark,
            lineHeight: 1.2,
            whiteSpace: "nowrap",
          }}
        >
          All periods
        </Typography>

        <IconButton
          sx={iconControlSx}
          aria-label="Change production period"
          onClick={(event) => setAnchor(event.currentTarget)}
        >
          <CalendarMonthRoundedIcon sx={{ fontSize: 18 }} />
        </IconButton>

        {/* Production period picker */}
        <Popover
          open={Boolean(anchor)}
          anchorEl={anchor}
          onClose={() => setAnchor(null)}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "right",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
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
              label="Select month"
              value={monthInputValue}
              onChange={handleMonthChange}
              InputLabelProps={{ shrink: true }}
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: 3,
                },
              }}
            />

            <Button
              sx={buttonStyle.text}
              onClick={handleAllPeriods}
            >
              All periods
            </Button>
          </Box>
        </Popover>
      </Box>
    </Box>
  );
};
