// src/pages/SimulationSuite/wizardreports/ReportDrawer.jsx
// Drawer: Get Reports / Placeholder for a selected stage

import React, { useEffect, useState } from "react";
import { Drawer, Box, Typography, List, ListItem, CircularProgress } from "@mui/material";
import { UI_STRINGS, STAGE_TEMPLATES } from "../constants/labels.js";

// Placeholder: Reports for a stage
async function fetchReports(stageNo) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([{ id: `r-${stageNo}-1`, title: `Report A for stage ${stageNo}` }, { id: `r-${stageNo}-2`, title: `Report B for stage ${stageNo}` }]);
    }, 300);
  });
}

export default function ReportDrawer({ open, onClose, stageNo, completedPeriod, completedPeriodNo, stageTitle }) {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(false);

  // Load reports when drawer opens / stageNo changes
  useEffect(() => {
    let mounted = true;
    async function load() {
      // allow stageNo === 0; require open and stageNo not null/undefined
      if (!open || stageNo == null) return;
      setLoading(true);
      try {
        const r = await fetchReports(stageNo);
        if (mounted) setReports(r);
      } catch {
        if (mounted) setReports([]);
      } finally {
        if (mounted) setLoading(false);
      }
    }
    load();
    return () => { mounted = false; };
  }, [open, stageNo]);

  // Render drawer content
  return (
    <Drawer anchor="right" open={open} onClose={onClose} aria-labelledby={`reports-title-${stageNo}`}>
      <Box sx={{ width: 420, p: 3 }}>
        <Typography id={`reports-title-${stageNo}`} variant="h6" gutterBottom>
          {stageTitle || STAGE_TEMPLATES.REPORTS_HEADER(stageNo)}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          {completedPeriodNo ? `Completed Period: ${completedPeriodNo}` : ""}
        </Typography>

        {loading ? (
          <CircularProgress />
        ) : (
          <List>
            {reports.length ? reports.map(r => <ListItem key={r.id}>{r.title}</ListItem>) : <Typography variant="body2">{UI_STRINGS.NO_REPORTS}</Typography>}
          </List>
        )}
      </Box>
    </Drawer>
  );
}
