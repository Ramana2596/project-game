// ==========================================================
// Component Name : SectionHead
// Module         : WebOmtp (Landing)
// Purpose        : Shared section title and one-line intro (default and dense variants)
// Author/Version : UXLab V1.3 / v1.1
// AI Tags        : landing, section-heading, shared, typography
// ==========================================================

// Imports
import React from "react";
import { Box, Typography } from "@mui/material";
import { colors, masterTypo } from "../../../ux/styles";

const SectionHead = ({ title, text, align = "center", dense = false }) => {
  // Dense steps one masterTypo level down; default keeps existing sections unchanged
  const titleTypo = dense ? masterTypo.h3 : masterTypo.h2;
  const textTypo = dense ? masterTypo.body2 : masterTypo.body1;

  // Render: title and optional intro, aligned as requested
  return (
    <Box sx={{ textAlign: align, mb: dense ? { xs: 3, md: 3.5 } : 4, maxWidth: 760, mx: align === "center" ? "auto" : 0 }}>
      <Typography component="h2" sx={{ ...titleTypo, color: colors.primaryDark }}>
        {title}
      </Typography>
      {text && (
        <Typography sx={{ ...textTypo, color: colors.subtitle, mt: dense ? 0.75 : 1 }}>
          {text}
        </Typography>
      )}
    </Box>
  );
};

export default SectionHead;