import React, { useState, useMemo, useEffect } from "react";
import {
  Drawer, Box, Typography, Divider,
  Stack, Button, Paper
} from "@mui/material";
import { componentList } from "../constants/globalConstants";
import { REPORT_REGISTRY } from "./reportRegistry";
import { useUser } from "../core/access/userContext";

// Flatten componentList to find routeElement by uiId
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
  const { userInfo, userAccessablePageIds } = useUser();
  const [activeReport, setActiveReport] = useState(null);

  // Build report list dynamically
  const reports = useMemo(() => {
    const stageIds = REPORT_REGISTRY[stageNo] || [];

    return stageIds
      .map((uiId) => {
        const rbac = userAccessablePageIds?.find(a => a.uiId === uiId);
        if (!rbac) return null;

        return {
          uiId,
          label: rbac.shortName,
          component: findComponentById(componentList, uiId),
        };
      })
      .filter(Boolean);
  }, [stageNo, userAccessablePageIds]);

  // Reset selection when drawer opens
  useEffect(() => {
    if (open) setActiveReport(null);
  }, [open, stageNo]);

  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={onClose}
      PaperProps={{ sx: { width: { xs: "100%", sm: "900px" }, p: 3 } }}
    >
      {/* Header */}
      <Typography variant="h5" fontWeight="bold" mb={1}>
        Stage {stageNo} Reports
      </Typography>
      <Typography variant="caption" color="text.secondary">
        Period {periodNo}
      </Typography>

      <Divider sx={{ my: 2 }} />

      <Box sx={{ display: "flex", height: "100%" }}>

        {/* Report List */}
        <Stack spacing={1.5} sx={{ width: 260, pr: 2 }}>
          {reports.length === 0 && (
            <Typography variant="body2" color="text.secondary">
              No reports for this stage.
            </Typography>
          )}

          {reports.map((r) => (
            <Button
              key={r.uiId}
              variant={activeReport?.uiId === r.uiId ? "contained" : "outlined"}
              onClick={() => setActiveReport(r)}
              sx={{ justifyContent: "flex-start", textTransform: "none" }}
            >
              {r.label}
            </Button>
          ))}
        </Stack>

        <Divider orientation="vertical" flexItem />

        {/* Report Display Area */}
        <Box sx={{ flex: 1, pl: 3 }}>
          {!activeReport && (
            <Paper
              variant="outlined"
              sx={{
                p: 4,
                height: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                bgcolor: "#f8fafc",
                borderStyle: "dashed",
              }}
            >
              <Typography color="text.secondary">
                Select a report to view details
              </Typography>
            </Paper>
          )}

          {activeReport?.component && React.cloneElement(
            activeReport.component,
            {
              gameId: userInfo.gameId,
              gameBatch: userInfo.gameBatch,
              gameTeam: userInfo.gameTeam,
              stageNo,
              periodNo
            }
          )}
        </Box>

      </Box>
    </Drawer>
  );
}
