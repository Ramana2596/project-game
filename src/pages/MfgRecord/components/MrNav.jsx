import React from "react";
import { Box, Button } from "@mui/material";
import { layoutStyle, buttonStyle } from "../../../ux/styles";
import { MR_TABS } from "../constants/mrConstants";

export function MrNav({ activeTab, setActiveTab }) {
  return (
    <Box sx={{ ...layoutStyle.tabBar, mb: 0 }} role="tablist">
      {MR_TABS.map((t) => (
        <Button key={t.id} role="tab" aria-pressed={activeTab === t.id}
          sx={{ ...buttonStyle.tab, ...(activeTab === t.id ? buttonStyle.tabActive : {}) }}
          onClick={() => setActiveTab(t.id)}>
          {t.label}
        </Button>
      ))}
    </Box>
  );
}