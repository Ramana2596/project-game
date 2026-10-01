
import React from "react";
import {
  Box,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";
import { PC_TABS, PC_FILTERS } from "../constants/constants";
import { layoutStyle, buttonStyle, colors } from "../../../ux/styles";

export const PcNavigation = ({
  activeTab,
  setActiveTab,
  filter,
  setFilter,
}) => (
  <Box
    sx={{
      ...layoutStyle.toolbar,
      py: 0.35,
      minHeight: 40,
      alignItems: "center",
      justifyContent: "flex-start",
      gap: 1,
    }}
  >
    {/* Page-level tab navigation */}
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        gap: 0.5,
        flexShrink: 0,
      }}
    >
      {PC_TABS.map((t) => {
        const active = activeTab === t.id;

        return (
          <Button
            key={t.id}
            onClick={() => setActiveTab(t.id)}
            sx={{
              ...buttonStyle.tab,
              ...(active ? buttonStyle.tabActive : {}),
              minHeight: 36,
              px: 2,
              py: 0.75,
              borderRadius: 1.5,
              fontWeight: 700,
              color: active ? colors.onPrimary : colors.primaryDark,
              backgroundColor: active
                ? colors.primary
                : colors.paper,
              border: `1px solid ${
                active ? colors.primary : colors.border
              }`,
              "&:hover": {
                backgroundColor: active
                  ? colors.primaryDark
                  : colors.primarySoft,
                color: active
                  ? colors.onPrimary
                  : colors.primaryDark,
              },
            }}
          >
            {t.label}
          </Button>
        );
      })}
    </Box>

    {/* Left-aligned work centre filter */}
    <FormControl
      size="small"
      sx={{
        minWidth: 185,
        flexShrink: 0,
      }}
    >
      <InputLabel id="pc-flt-lbl">Filter</InputLabel>
      <Select
        labelId="pc-flt-lbl"
        value={filter}
        label="Filter"
        onChange={(e) => setFilter(e.target.value)}
        sx={{
          height: 36,
          borderRadius: "999px",
          backgroundColor: colors.paper,
          color: colors.body,
        }}
      >
        {PC_FILTERS.map((f) => (
          <MenuItem key={f.value} value={f.value}>
            {f.label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  </Box>
);
