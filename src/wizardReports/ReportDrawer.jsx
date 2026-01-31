// src/wizardReports/ReportDrawer.jsx
// Renders JSX from globalConstants via cloneElement (do NOT treat as component)

import React, { useState, useMemo, useEffect } from "react";
import {
  Drawer,
  Box,
  Typography,
  List,
  ListItemButton,
  ListItemText,
  IconButton,
  Divider
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useUser } from "../core/access/userContext";
import { componentList } from "../constants/globalConstants";
import { REPORT_REGISTRY } from "./reportRegistry";

// Find JSX element by uiId from nested componentList
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
  const { userAccessiblePageIds } = useUser();
  const [selectedUiId, setSelectedUiId] = useState(null);

  // Reports allowed for this stage after RBAC filter
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

  // ===== Reset selected report when stage changes or reports list changes =====
  useEffect(() => {
    if (reportsForStage.length > 0) {
      setSelectedUiId(reportsForStage[0].uiId);
    } else {
      setSelectedUiId(null);
    }
  }, [stageNo, reportsForStage]);

  // ===== Optional: reset selected report when drawer closes =====
  useEffect(() => {
    if (!open) {
      setSelectedUiId(null);
    }
  }, [open]);

  // Get the JSX element stored in globalConstants
  const selectedElement = selectedUiId
    ? findComponentById(componentList, selectedUiId)
    : null;

  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: {
          width: { xs: "95%", sm: 500 },
          maxHeight: "90vh",
          borderRadius: 2,
          p: 2,
          overflowY: "auto"
        }
      }}
    >
      {/* Header */}
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
        <Typography variant="h6" fontWeight="700">
          Reports – Stage {stageNo} / Period {periodNo}
        </Typography>
        <IconButton onClick={onClose}>
          <CloseIcon />
        </IconButton>
      </Box>

      <Divider sx={{ mb: 2 }} />

      {/* Report list */}
      <List>
        {reportsForStage.length === 0 ? (
          <Typography variant="body2" color="text.secondary" sx={{ pl: 1 }}>
            No reports available for this stage.
          </Typography>
        ) : (
          reportsForStage.map(({ uiId, shortName }) => (
            <ListItemButton
              key={uiId}
              selected={uiId === selectedUiId}
              onClick={() => setSelectedUiId(uiId)}
              sx={{
                borderRadius: 1,
                mb: 0.5,
                "&.Mui-selected": {
                  bgcolor: "primary.light",
                  color: "#fff"
                }
              }}
            >
              <ListItemText primary={shortName} />
            </ListItemButton>
          ))
        )}
      </List>

      <Divider sx={{ my: 2 }} />

      {/* Render stored JSX with injected props */}
      <Box sx={{ minHeight: 200 }}>
        {selectedElement ? (
          React.cloneElement(selectedElement, { periodNo, stageNo })
        ) : (
          <Typography
            variant="body2"
            color="text.secondary"
            textAlign="center"
            sx={{ mt: 4 }}
          >
            Select a report to view
          </Typography>
        )}
      </Box>
    </Drawer>
  );
}
