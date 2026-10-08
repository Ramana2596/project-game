
// Component: FaNavigation
// Module: FinAnalysis
// Purpose: Provide analytical navigation and reporting-period control in separate responsive boxes
// Author/Version: OpsMgt UXLab V1.3
// AI Tags: financial-analysis, navigation, tabs, period-filter, uxlab

import React from "react";
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import DashboardOutlinedIcon from "@mui/icons-material/DashboardOutlined";
import ShowChartOutlinedIcon from "@mui/icons-material/ShowChartOutlined";
import SavingsOutlinedIcon from "@mui/icons-material/SavingsOutlined";
import AccountBalanceOutlinedIcon from "@mui/icons-material/AccountBalanceOutlined";
import {
  buttonStyle,
  cardStyle,
  colors,
  layoutStyle,
  masterTypo,
} from "../../../ux/styles";
import { FA_TABS } from "../constants/faConstants";

const TAB_VISUALS = {
  overview: {
    icon: DashboardOutlinedIcon,
  },
  profitability: {
    icon: ShowChartOutlinedIcon,
  },
  returns: {
    icon: SavingsOutlinedIcon,
  },
  financialHealth: {
    icon: AccountBalanceOutlinedIcon,
  },
};

const FaNavigation = ({
  activeTab = "overview",
  onChange,
  filters,
  onFilterChange,
  periods = [],
}) => {
  // Update the frontend reporting-period cut-off.
  const handlePeriodChange = (event) => {
    onFilterChange?.({
      ...filters,
      period: event.target.value,
    });
  };

  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: {
          xs: "1fr",
          sm: "minmax(0, 1fr) auto",
        },
        alignItems: "stretch",
        gap: 1,
        mx: 2,
        mb: 2,
      }}
    >
      {/* Analytical navigation box */}
      <Box
        sx={{
          ...layoutStyle.toolbar,
          minWidth: 0,
          height: "100%",
          px: 1,
          py: 0.75,
          background: colors.card,
          border: `1px solid ${colors.border}`,
          borderRadius: 2,
          boxShadow: cardStyle.card?.boxShadow,
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            flexWrap: "wrap",
            gap: 0.5,
          }}
        >
          {FA_TABS.map((tab) => {
            const visual = TAB_VISUALS[tab.id] || {};
            const Icon =
              visual.icon || DashboardOutlinedIcon;
            const selected = activeTab === tab.id;

            return (
              <Button
                key={tab.id}
                variant="text"
                startIcon={<Icon />}
                aria-pressed={selected}
                onClick={() => onChange?.(tab.id)}
                sx={{
                  ...buttonStyle.tab,
                  ...buttonStyle.compact,

                  ...(selected
                    ? {
                        ...buttonStyle.tabActive,
                        backgroundColor: colors.primary,
                        color: colors.onPrimary,

                        "&:hover": {
                          backgroundColor:
                            colors.primaryDark,
                          color: colors.onPrimary,
                        },

                        "& .MuiButton-startIcon": {
                          color: colors.onPrimary,
                        },

                        "& .MuiSvgIcon-root": {
                          color: colors.onPrimary,
                        },
                      }
                    : {
                        color: colors.body,

                        "&:hover": {
                          backgroundColor:
                            colors.primarySoft,
                          color: colors.onPrimarySoft,
                        },

                        "& .MuiButton-startIcon": {
                          color: "inherit",
                        },

                        "& .MuiSvgIcon-root": {
                          color: "inherit",
                        },
                      }),

                  "& .MuiButton-startIcon": {
                    mr: 0.75,
                  },
                }}
              >
                {tab.label}
              </Button>
            );
          })}
        </Box>
      </Box>

      {/* Reporting-period filter box */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          px: 1,
          py: 0.75,
          background: colors.card,
          border: `1px solid ${colors.border}`,
          borderRadius: 2,
          boxShadow: cardStyle.card?.boxShadow,
        }}
      >
        <FormControl
          size="small"
          sx={{
            minWidth: 155,
          }}
        >
          <InputLabel
            sx={{
              ...masterTypo.caption,
            }}
          >
            Period
          </InputLabel>

          <Select
            value={filters?.period || "ALL"}
            label="Period"
            onChange={handlePeriodChange}
            sx={{
              ...masterTypo.bodyB1,
              color: colors.body,
            }}
          >
            <MenuItem value="ALL">
              All periods
            </MenuItem>

            {periods.map((period) => (
              <MenuItem
                key={period}
                value={period}
              >
                {period}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
    </Box>
  );
};

export default FaNavigation;
