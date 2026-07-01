// ============================================================
// OpsMgt UX Lab
// Component : PageBackground
// Purpose   : Standard page container and background (Purple Theme)
// ============================================================

import React from "react";
import { Box } from "@mui/material";
import { colors } from "../styles/ColorPalette";
import { pageStyles } from "../styles/PageStyle";

const PageBackground = ({
  children,
  maxWidth = 1400,
  // Binds defaults cleanly to your layout tokens
  paddingX = pageStyles.root.px,
  paddingY = pageStyles.root.py,
}) => {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        width: "100%",
        background: colors.pageGradient,
        px: paddingX,
        py: paddingY,
        display: "flex",
        justifyContent: "center",
      }}
    >
      <Box
        sx={{
          width: "100%",
          maxWidth: maxWidth,
        }}
      >
        {children}
      </Box>
    </Box>
  );
};

export default PageBackground;