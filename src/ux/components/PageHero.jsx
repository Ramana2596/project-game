// ============================================================
// OpsMgt UX Lab
// Component : PageHero
// Purpose   : Standard page header for all application pages (Purple Theme)
// ============================================================

import React from "react";
import { Box, Typography } from "@mui/material";
import { colors } from "../styles/ColorPalette";
import { typography } from "../styles/Typography";

const PageHero = ({
  title,
  subtitle,
  icon: IconComponent = null, // Renamed to accurately render component reference
}) => {

  return (
    <Box
      sx={{
        mb: 4,
        p: 3,
        borderRadius: 4,
        overflow: "hidden",
        position: "relative",
        background: colors.heroGradient,
        color: colors.white || "#ffffff",
        boxShadow: `0 10px 28px ${colors.primary}38`, // Dynamic purple shadow tint
      }}
    >
      {/* Watermark Icon */}
      {IconComponent && (
        <Box
          sx={{
            position: "absolute",
            right: 20,
            top: "50%",
            transform: "translateY(-50%)",
            opacity: 0.10,
            color: colors.white || "#ffffff",
            display: "flex",
            alignItems: "center",
            "& svg": {
              fontSize: 100,
            },
          }}
        >
          <IconComponent />
        </Box>
      )}

      <Typography
        variant="h4"
        sx={{
          ...typography.pageTitle, // Directly using central Typography tokens
        }}
      >
        {title}
      </Typography>

      <Typography
        variant="subtitle1"
        sx={{
          ...typography.pageSubtitle, // Directly using central Typography tokens
        }}
      >
        {subtitle}
      </Typography>
    </Box>
  );
};

export default PageHero;