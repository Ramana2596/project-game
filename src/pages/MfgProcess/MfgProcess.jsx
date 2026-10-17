// ============================================================
// Component: MfgProcess
// Module: MfgProcess
// Purpose: Render manufacturing cards with FG stock and period control
// AI Tags: manufacturing, process-routing, fg-stock, calendar, uxlab
// UXLab V1.8 — Local selectedMonth state (works standalone and inside
//              ReportDrawer), header shows "as at Mon yyyy"
// ============================================================

import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  CircularProgress,
  IconButton,
  Popover,
  TextField,
  Typography,
} from "@mui/material";
import CalendarMonthRoundedIcon from "@mui/icons-material/CalendarMonthRounded";
import { useUser } from "../../core/access/userContext.jsx";
import {
  buttonStyle,
  colors,
  layoutStyle,
  masterTypo,
} from "../../ux/styles";
import MfgProcessCard from "./components/MfgProcessCard";
import { useMfgProcess } from "./hooks/useMfgProcess";

// Define the calendar icon control using UXLab tokens.
const iconControlSx = {
  ...buttonStyle.icon,
  background: colors.primarySoft,
  color: colors.primaryDark,
  borderRadius: 2,
  width: 32,
  height: 32,
};

// Normalise any date-like value to "YYYY-MM" without timezone shifts.
const toMonthInputValue = (value) => {
  if (!value) return "";

  const match = String(value).match(/^(\d{4})-(\d{2})/);
  if (match) return `${match[1]}-${match[2]}`;

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "";

  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`;
};

// Format a "YYYY-MM" key (or date-like value) as "Mar 2026".
const formatMonthLabel = (value) => {
  const key = toMonthInputValue(value);
  if (!key) return "";

  const [year, month] = key.split("-").map(Number);
  return new Date(year, month - 1, 1).toLocaleDateString("en-US", {
    month: "short",
    year: "numeric",
  });
};

// Render manufacturing data for the current user and selected period.
export default function MfgProcess({
  productionMonth = null,
  onMonthChange,
  hideHeader = false,
}) {
  const { userInfo } = useUser();
  const [calendarAnchor, setCalendarAnchor] = useState(null);

  // Month chosen in the calendar. Starts from the parent's value and
  // follows it when the parent (e.g. ReportDrawer) changes it.
  const [selectedMonth, setSelectedMonth] = useState(productionMonth);

  useEffect(() => {
    setSelectedMonth(productionMonth);
  }, [productionMonth]);

  // Load manufacturing data. A null month asks the API for all months;
  // the hook then resolves the latest month as displayMonth.
  const { productProcesses, displayMonth, loading, error } = useMfgProcess(
    userInfo,
    selectedMonth || null
  );

  const selectedKey = toMonthInputValue(selectedMonth);
  const effectiveKey = displayMonth || selectedKey;
  const monthText = formatMonthLabel(effectiveKey);

  // Apply the selected month and close the calendar.
  const handleMonthChange = (event) => {
    const value = event.target.value;
    if (!value) return;

    setSelectedMonth(`${value}-01`);
    onMonthChange?.(`${value}-01`);
    setCalendarAnchor(null);
  };

  // Clear the selected month: null makes the API return all months.
  const handleAllPeriods = () => {
    setSelectedMonth(null);
    onMonthChange?.(null);
    setCalendarAnchor(null);
  };

  // Render the body so the header stays mounted while loading or on error.
  const renderBody = () => {
    if (loading) {
      return (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            minHeight: 240,
          }}
        >
          <CircularProgress />
        </Box>
      );
    }

    if (error) {
      return (
        <Typography
          sx={{
            ...masterTypo.body1,
            color: colors.error || colors.danger || colors.primary,
          }}
        >
          {error}
        </Typography>
      );
    }

    if (productProcesses.length === 0) {
      return (
        <Typography sx={{ ...masterTypo.body1, color: colors.subtitle }}>
          No manufacturing data for {monthText || "the selected period"}.
        </Typography>
      );
    }

    return (
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: {
            xs: "minmax(0, 1fr)",
            sm: "repeat(2, minmax(0, 1fr))",
            lg: "repeat(3, minmax(0, 1fr))",
          },
          gap: 2,
          alignItems: "stretch",
          width: "100%",
        }}
      >
        {productProcesses.map((product, index) => (
          <Box
            // Include the month so cards never get reused across periods.
            key={`${effectiveKey}-${product.productNo}`}
            sx={{ minWidth: 0, width: "100%" }}
          >
            <MfgProcessCard
              product={{
                Part_No: product.productNo,
                Part_Description: product.product,
                PLM_Stage: product.plmStage,
                materials: product.materials,
                fgStock: product.fgStock,
              }}
              processes={product.processes}
              index={index}
            />
          </Box>
        ))}
      </Box>
    );
  };

  return (
    <Box sx={{ width: "100%", minWidth: 0 }}>
      {!hideHeader && (
        <Box
          sx={{
            ...layoutStyle.pageHeader,
            py: 0.75,
            minHeight: 54,
            mb: 2,
            position: "relative",
            // Keep the title clear of the top-right period control.
            pr: { xs: 16, sm: 20 },
          }}
        >
          {/* Page heading */}
          <Typography
            variant="h4"
            sx={{
              ...masterTypo.h4,
              color: colors.title,
              lineHeight: 1.15,
            }}
          >
            Manufacturing Process
          </Typography>

          {/* Sub-title with the displayed production month */}
          <Typography
            variant="body2"
            sx={{
              ...masterTypo.body1,
              color: colors.subtitle,
              lineHeight: 1.2,
              mt: 0.15,
            }}
          >
            Product routing, Raw Material availability and finished-goods stock
            {monthText ? ` — as at ${monthText}` : ""}
          </Typography>

          {/* Period control, right-justified like PcHeader */}
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
              {monthText || "All periods"}
            </Typography>

            <IconButton
              sx={iconControlSx}
              aria-label="Change production period"
              onClick={(event) => setCalendarAnchor(event.currentTarget)}
            >
              <CalendarMonthRoundedIcon sx={{ fontSize: 18 }} />
            </IconButton>

            <Popover
              open={Boolean(calendarAnchor)}
              anchorEl={calendarAnchor}
              onClose={() => setCalendarAnchor(null)}
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
                  label="Select month"
                  // Show the month currently displayed, even when none is selected.
                  value={selectedKey || toMonthInputValue(displayMonth)}
                  onChange={handleMonthChange}
                  InputLabelProps={{ shrink: true }}
                  sx={{
                    "& .MuiOutlinedInput-root": { borderRadius: 3 },
                  }}
                />

                <Button sx={buttonStyle.text} onClick={handleAllPeriods}>
                  All periods
                </Button>
              </Box>
            </Popover>
          </Box>
        </Box>
      )}

      {renderBody()}
    </Box>
  );
}