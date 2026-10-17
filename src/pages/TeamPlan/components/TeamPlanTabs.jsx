// ============================================================
// Component: TeamPlanTabs
// Module: TeamPlan
// Purpose: Category tabs (counts, save status) with Cancel / Save right-justified
// AI Tags: team-plan, tabs, tab-bar, save-status, uxlab
// UXLab V3 — layoutStyle.tabBar, buttonStyle.tab / tabActive, primary / secondary
// ============================================================

import React from "react";
import { Box, Button, Tab, Tabs, Tooltip, Typography } from "@mui/material";
import {
  Save as SaveIcon,
  Close as CancelIcon,
  CheckCircle as CheckIcon,
  Pending as PendingIcon,
  RadioButtonUnchecked as UnseenIcon,
  Inventory as InventoryIcon,
  Layers as LayersIcon,
  PrecisionManufacturing as ManufacturingIcon,
} from "@mui/icons-material";
import { colors, buttonStyle, layoutStyle, masterTypo } from "../../../ux/styles";
import { CATEGORY_ICON } from "../constants/categoryIcon.js";

// Tab status indicators driven by palette tokens.
const STATUS_CONFIG = {
  saved: {
    icon: <CheckIcon sx={{ fontSize: 16, color: colors.success }} />,
    tooltip: "Saved",
  },
  unsaved: {
    icon: <PendingIcon sx={{ fontSize: 16, color: colors.warning }} />,
    tooltip: "Pending save",
  },
  unseen: {
    icon: <UnseenIcon sx={{ fontSize: 16, color: colors.subtitle }} />,
    tooltip: "Not opened",
  },
};

// Tab icons. Move into constants/categoryIcon.js when convenient.
const TAB_ICON = {
  "OI 001": InventoryIcon,
  "OI 002": LayersIcon,
  "OI 003": ManufacturingIcon,
};

export default function TeamPlanTabs({
  currentTab,
  tabDataMap,
  tabStatusMap,
  onTabClick,
  canCancel,
  canSave,
  saving,
  calculating,
  onCancelClick,
  onSaveClick,
}) {
  return (
    <Box sx={{ px: 2, pt: 2 }}>
      <Box
        component="nav"
        aria-label="Operations Category Navigation"
        sx={{
          ...layoutStyle.tabBar,
          mb: 0,
          flexWrap: "nowrap",
          alignItems: "center",
          columnGap: 2,
        }}
      >
        <Tabs
          value={currentTab}
          onChange={(e, v) => onTabClick(v)}
          variant="scrollable"
          scrollButtons="auto"
          TabIndicatorProps={{ style: { display: "none" } }}
          sx={{
            minHeight: 44,
            flex: 1,
            minWidth: 0,
            "& .MuiTabs-flexContainer": { gap: 0.5 },
          }}
        >
          {Object.entries(CATEGORY_ICON).map(([key, cfg]) => {
            const status = tabStatusMap?.[key] || "unseen";
            const statusCfg = STATUS_CONFIG[status];
            const CategoryIconComponent = TAB_ICON[key] || InventoryIcon;
            const rowCount = (tabDataMap?.[key] || []).length;

            return (
              <Tab
                key={key}
                value={key}
                label={
                  <Tooltip
                    title={`${cfg.tooltip} (${rowCount} items) • ${statusCfg.tooltip}`}
                    arrow
                  >
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                      <CategoryIconComponent fontSize="small" sx={{ color: "inherit" }} />
                      <span>{cfg.label}</span>
                      {rowCount > 0 && (
                        <Typography
                          component="span"
                          sx={{ ...masterTypo.caption, fontWeight: 700, color: "inherit" }}
                        >
                          ({rowCount})
                        </Typography>
                      )}
                      {/* White disc keeps the status icon readable on the active tab */}
                      <Box
                        role="img"
                        aria-label={statusCfg.tooltip}
                        sx={{
                          display: "inline-flex",
                          p: 0.25,
                          borderRadius: "50%",
                          background: colors.paper,
                        }}
                      >
                        {statusCfg.icon}
                      </Box>
                    </Box>
                  </Tooltip>
                }
                sx={{
                  ...buttonStyle.tab,
                  "&.Mui-selected": { ...buttonStyle.tabActive },
                  "&.Mui-selected:hover": { background: buttonStyle.tabActive.background },
                }}
              />
            );
          })}
        </Tabs>

        {/* Actions, right-justified in the tab bar */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, ml: "auto", flexShrink: 0 }}>
          <Button
            variant="outlined"
            color="inherit"
            disabled={!canCancel}
            onClick={onCancelClick}
            startIcon={<CancelIcon />}
            sx={{ ...buttonStyle.secondary, ...buttonStyle.compact }}
          >
            Cancel
          </Button>

          <Button
            variant="contained"
            startIcon={<SaveIcon />}
            disabled={!canSave}
            onClick={onSaveClick}
            sx={{ ...buttonStyle.primary, ...buttonStyle.compact }}
          >
            {saving ? "Saving…" : calculating ? "Calculating…" : "Save"}
          </Button>
        </Box>
      </Box>
    </Box>
  );
}