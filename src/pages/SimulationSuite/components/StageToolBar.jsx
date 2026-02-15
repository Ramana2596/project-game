// src/pages/SimulationSuite/components/StageToolBar.jsx
// Action row for refresh

import React from "react";
import { Stack, Button } from "@mui/material";
import { Refresh } from "@mui/icons-material";
import { UI_STRINGS } from "../constants/labels.js";

export default function StageToolbar({ onRefresh }) {
  // Handler guard for runtime errors when onRefresh is not provided
  const handleRefresh = () => {
    if (typeof onRefresh === "function") onRefresh();
  };

  return (
    <Stack direction="row" justifyContent="flex-end" spacing={1} sx={{ mb: 2 }}>
      <Button
        variant="outlined"
        startIcon={<Refresh />}
        onClick={handleRefresh}
        aria-label={UI_STRINGS.REFRESH}
      >
        {UI_STRINGS.REFRESH}
      </Button>
    </Stack>
  );
}
