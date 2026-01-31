// src/wizardReports/ReportDrawer.jsx
// Tab-based report viewer for better UX with large reports

import React, { useMemo, useState, useEffect } from "react";
import {
  Drawer,
  Box,
  Typography,
  Tabs,
  Tab,
  IconButton,
  Divider
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useUser } from "../core/access/userContext";
import { componentList } from "../constants/globalConstants";
import { REPORT_REGISTRY } from "./reportRegistry";

// ===== Find JSX element by uiId from nested componentList
const findComponentById = (list, id) => {
  for (const item of list) {
    if (item.id === id) return item.routeElement;
    if (item.children) {
      const found = findComponentById(item.children, id);
      if (found) return found;
    }
  }
  return null;
};

export default function ReportDrawer({ open, onClose, stageNo, periodNo }) {

  // ===== Get RBAC accessible pages
  const { userAccessiblePageIds } = useUser();

  // ===== Reports allowed for this stage after RBAC filter
  const reportsForStage = useMemo(() => {
    if (!stageNo) return [];

    const stageReports = (REPORT_REGISTRY[stageNo] || []).filter(
      (uiId) => userAccessiblePageIds?.some((p) => p.uiId === uiId)
    );

    return stageReports.map((uiId) => {
      const shortName = userAccessiblePageIds.find((p) => p.uiId === uiId)?.shortName;
      return { uiId, shortName };
    });
  }, [stageNo, userAccessiblePageIds]);

  // ===== Currently selected tab index
  const [tabIndex, setTabIndex] = useState(0);

  // ===== Reset to first report whenever drawer opens or stage changes
  useEffect(() => {
    if (open) setTabIndex(0);
  }, [open, stageNo]);

  // ===== Get selected JSX element from globalConstants
  const selectedElement = reportsForStage[tabIndex]
    ? findComponentById(componentList, reportsForStage[tabIndex].uiId)
    : null;

  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: {
          width: { xs: "100%", sm: "85%", md: "75%" }, // wider view
          height: "100vh",
          p: 2,
          overflow: "hidden"
        }
      }}
    >
      {/* ===== Header with title and close */}
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
        <Typography variant="h6" fontWeight="700">
          Reports – Stage {stageNo} / Period {periodNo}
        </Typography>
        <IconButton onClick={onClose}>
          <CloseIcon />
        </IconButton>
      </Box>

      <Divider sx={{ mb: 2 }} />

      {/* ===== Tabs for switching between reports */}
      {reportsForStage.length > 0 && (
        <Tabs
          value={tabIndex}
          onChange={(e, newVal) => setTabIndex(newVal)}
          variant="scrollable"
          scrollButtons="auto"
          sx={{ mb: 2 }}
        >
          {reportsForStage.map((r, idx) => (
            <Tab key={r.uiId} label={r.shortName} />
          ))}
        </Tabs>
      )}

      {/* ===== Report content area with proper dual scrollbars */}
      <Box
        sx={{
          flex: 1,
          height: "calc(100vh - 140px)",
          border: "1px solid #e2e8f0",
          borderRadius: 2,
          bgcolor: "#ffffff",
          overflow: "auto"          // vertical scroll belongs here
        }}
      >
        <Box
          sx={{
            minWidth: "1200px",     // force width larger than drawer when needed
            width: "max-content",   // allow content to grow horizontally
            overflowX: "auto"
          }}
        >
          {selectedElement ? (
            React.cloneElement(selectedElement, {
              periodNo,
              stageNo
            })
          ) : (
            <Typography
              variant="body2"
              color="text.secondary"
              textAlign="center"
              sx={{ mt: 6 }}
            >
              No reports available for this stage.
            </Typography>
          )}
        </Box>
      </Box>


    </Drawer>
  );
}
