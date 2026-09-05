import React from "react";
import { Box, Button, Select, MenuItem, FormControl, InputLabel } from "@mui/material";
import { PC_TABS, PC_FILTERS } from "../constants/constants";
import { layoutStyle, buttonStyle, masterTypo, colors } from "../../../ux/styles";

export const PcNavigation = ({ activeTab, setActiveTab, filter, setFilter }) => (
  <Box sx={layoutStyle.toolbar}>
    <Box sx={layoutStyle.tabBar}>
      {PC_TABS.map((t) => (
        <Button
          key={t.id}
          sx={activeTab === t.id ? { ...buttonStyle.tab, ...buttonStyle.tabActive } : buttonStyle.tab}
          onClick={() => setActiveTab(t.id)}
        >
          {t.label}
        </Button>
      ))}
    </Box>

    <FormControl size="small" sx={{ minWidth: 170 }}>
      <InputLabel id="pc-flt-lbl">Filter View</InputLabel>
      <Select
        labelId="pc-flt-lbl"
        value={filter}
        label="Filter View"
        onChange={(e) => setFilter(e.target.value)}
        sx={{ borderRadius: "999px", background: colors.paper }}
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