import React from "react";
import { Box, Button } from "@mui/material";
import { layoutStyle, buttonStyle, masterTypo } from "../../../ux/styles";
import { MR_TABS } from "../constants/mrConstants";

export function MrNav({ activeTab, setActiveTab }) {
  return (
    <Box sx={{ ...layoutStyle.tabBar, display: "flex", alignItems: "center", gap: 0.5, minHeight: 0, p: 0, m: 0, mb: 0.5 }}
      role="tablist">
      {MR_TABS.map((t) => {
        const active = activeTab === t.id;
        return (
          <Button key={t.id} role="tab" aria-selected={active} tabIndex={active ? 0 : -1}
            sx={{ ...buttonStyle.tab, ...(active ? buttonStyle.tabActive : {}), ...masterTypo.button,
              minHeight: 0, minWidth: 0, px: 1.5, py: 0.25 }}
            onClick={() => setActiveTab(t.id)}>
            {t.label}
          </Button>
        );
      })}
    </Box>
  );
}