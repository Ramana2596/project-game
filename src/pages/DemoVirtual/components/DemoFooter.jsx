// ============================================================
// Component : DemoFooter
// Module    : Demo Virtual Simulation
// Purpose   : Enterprise footer for Demo Virtual.
// ============================================================

import React from "react";
import { Box, Divider, Stack, Typography } from "@mui/material";
import { colors } from "../../../ux/styles";

export default function DemoFooter() {
  return (
    <Box
      component="footer"
      sx={{
        mt: 4,
        px: 3,
        pb: 2,
      }}
    >
      <Divider sx={{ mb: 2 }} />

      <Stack
        direction={{ xs: "column", md: "row" }}
        justifyContent="space-between"
        alignItems="center"
        spacing={1}
      >
        <Typography
          variant="body2"
          sx={{ color: colors.subtitle }}
        >
          Operations Management Training Platform (OMTP)
        </Typography>

        <Typography
          variant="body2"
          sx={{ color: colors.subtitle }}
        >
          Demo Virtual Simulation • UXLab V2.0
        </Typography>
      </Stack>
    </Box>
  );
}