
// Component: FaHeader
// Module: FinancialAnalysis
// Purpose: Render Financial Analysis page heading and period context
// Author/Version: OpsMgt UXLab V1.3
// AI Tags: financial-analysis, header, period, uxlab

import React from "react";
import { Box, Typography } from "@mui/material";
import CalendarMonthOutlinedIcon from "@mui/icons-material/CalendarMonthOutlined";
import AssessmentOutlinedIcon from "@mui/icons-material/AssessmentOutlined";
import { cardStyle, colors, layoutStyle, masterTypo } from "../../../ux/styles";

// Format the selected reporting period for the management header.
const formatPeriod = (period) => {
  if (!period) {
    return "All periods";
  }

  const date = new Date(period);

  if (Number.isNaN(date.getTime())) {
    return String(period);
  }

  return date.toLocaleDateString("en-US", {
    month: "short",
    year: "numeric",
  });
};

const FaHeader = ({
  productionMonth = null,
  title = "Financial Analysis",
  subtitle = "Management view of financial performance, trends and key ratios.",
}) => {
  // Resolve the display period without changing the source reporting value.
  const periodLabel = formatPeriod(productionMonth);

  return (
    <Box
      sx={{
        ...layoutStyle.pageHeader,
        mb: 2,
        px: 2,
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 1,
        }}
      >
        <Box
          sx={{
            ...cardStyle.statIconCircle(colors.primary),
            width: 42,
            height: 42,
            minWidth: 42,
            "& svg": {
              fontSize: 22,
              color: colors.onPrimary,
            },
          }}
        >
          <AssessmentOutlinedIcon />
        </Box>

        <Typography
          component="h1"
          sx={{
            ...masterTypo.h3,
            color: colors.title,
          }}
        >
          {title}
        </Typography>
      </Box>

      <Typography
        sx={{
          ...masterTypo.body2,
          color: colors.subtitle,
          maxWidth: 760,
        }}
      >
        {subtitle}
      </Typography>

      <Box
        sx={{
          ...layoutStyle.pageHeaderDatePill,
          position: "absolute",
          top: 0,
          right: 16,
        }}
      >
        <CalendarMonthOutlinedIcon
          sx={{
            fontSize: 19,
            color: colors.onPrimary,
          }}
        />

        <Typography
          component="span"
          sx={{
            ...masterTypo.caption,
            color: colors.primary,
          }}
        >
          {periodLabel}
        </Typography>
      </Box>
    </Box>
  );
};

export default FaHeader;
