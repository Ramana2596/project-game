// Component: SrResultsNav
// Module: StrategyResults
// Purpose: compact navigation between overview and detailed result views
// Author/Version: OpsMgt UX Lab / v2.0
// AI Tags: strategy, results, navigation, tabs

import React from "react";
import { Box, Button } from "@mui/material";
import { buttonStyle, layoutStyle } from "../../../../ux/styles";
import { SR_TABS } from "../../constants/srConstants";

export default function SrResultsNav({
  srTab,
  onTabChange,
  tabCounts,
}) {
  return (
    <Box
      sx={{
        ...layoutStyle.tabBar,
        mb: 2,
        overflowX: "auto",
      }}
      role="tablist"
    >
      {SR_TABS.map((tab) => {
        const active = srTab === tab.id;
        const count = tabCounts?.[tab.id];

        return (
          <Button
            key={tab.id}
            role="tab"
            aria-selected={active}
            onClick={() => onTabChange(tab.id)}
            sx={{
              ...buttonStyle.tab,
              ...(active ? buttonStyle.tabActive : {}),
              whiteSpace: "nowrap",
            }}
          >
            {tab.label}
            {count !== undefined ? ` (${count})` : ""}
          </Button>
        );
      })}
    </Box>
  );
}