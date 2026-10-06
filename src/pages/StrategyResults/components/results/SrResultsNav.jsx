// Component: SrResultsNav
// Module: StrategyResults
// Purpose: render prominent business result navigation buttons.
// Author/Version: OpsMgt UX Lab / v1.0
// AI Tags: strategy-results, navigation, result-selector, paired-colors

import React from "react";
import { Box, Button } from "@mui/material";
import {
  BarChartOutlined,
  SavingsOutlined,
  TrendingUpOutlined,
  AccountBalanceOutlined,
} from "@mui/icons-material";
import { colors } from "../../../../ux/styles";
import { SR_VIEW, SR_VIEW_LABELS } from "../../constants/srConfig";

const VIEW_CONFIG = {
  [SR_VIEW.strategy]: {
    icon: <TrendingUpOutlined />,
    color: colors.primary,
  },
  [SR_VIEW.commitment]: {
    icon: <AccountBalanceOutlined />,
    color: colors.accentIndigo,
  },
  [SR_VIEW.demand]: {
    icon: <BarChartOutlined />,
    color: colors.accentBlue,
  },
  [SR_VIEW.savings]: {
    icon: <SavingsOutlined />,
    color: colors.accentTeal,
  },
};

export default function SrResultsNav({
  srTab,
  onTabChange,
}) {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        gap: 1,
        flexWrap: "wrap",
      }}
    >
      {Object.values(SR_VIEW).map((view) => {
        const config = VIEW_CONFIG[view];
        const active = srTab === view;

        return (
          <Button
            key={view}
            variant={active ? "contained" : "outlined"}
            startIcon={config.icon}
            onClick={() => onTabChange(view)}
            sx={{
              minHeight: 42,
              minWidth: 132,
              px: 2,
              borderRadius: 2,
              borderWidth: active ? 1 : 1.5,
              borderColor: config.color,
              backgroundColor: active
                ? config.color
                : colors.card,
              color: active
                ? colors.onPrimary
                : config.color,
              fontSize: "0.88rem",
              fontWeight: 700,
              letterSpacing: "0.01em",
              textTransform: "none",
              boxShadow: active
                ? `0 3px 10px ${config.color}35`
                : "none",
              "& .MuiButton-startIcon": {
                marginRight: 0.75,
                color: "inherit",
              },
              "& .MuiSvgIcon-root": {
                fontSize: 21,
              },
              "&:hover": {
                borderColor: config.color,
                backgroundColor: active
                  ? config.color
                  : `${config.color}0D`,
                color: active
                  ? colors.onPrimary
                  : config.color,
                boxShadow: active
                  ? `0 4px 12px ${config.color}40`
                  : "none",
              },
            }}
          >
            {SR_VIEW_LABELS[view]}
          </Button>
        );
      })}
    </Box>
  );
}