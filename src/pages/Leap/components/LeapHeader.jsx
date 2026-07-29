// ============================================================
// LEAP V1.3
// File : LeapHeader.jsx
// Purpose : Compact header for LEAP side panel
// ============================================================

import React from "react";
import PropTypes from "prop-types";

import {
  Box,
  Chip,
  Stack,
  Typography,
} from "@mui/material";

import {
  colors,
  semanticTypo,
  buttonStyle,
} from "../../../ux/styles";

// ============================================================

export default function LeapHeader({
  title,
  stageName,
  infoType,
  icon: Icon,
  onBack,
}) {

  return (
    <Box
      sx={{
        position: "sticky",
        top: 0,
        zIndex: 20,
        bgcolor: colors.backgroundPaper,
      }}
    >
      {/* Purple Accent */}
      <Box
        sx={{
          height: 4,
          bgcolor: colors.primary,
        }}
      />

      <Box
        sx={{
          px: 2,
          py: 2,
        }}
      >
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="flex-start"
        >

          {/* Left */}
          <Stack
            direction="row"
            spacing={1.5}
            sx={{ flex: 1 }}
          >
            {Icon && (
              <Icon
                sx={{
                  mt: 0.25,
                  color: colors.primary,
                  fontSize: 28,
                }}
              />
            )}

            <Box>

              <Typography
                sx={{
                  ...semanticTypo.overline,
                  color: colors.primary,
                  fontWeight: 700,
                  letterSpacing: 1,
                  textTransform: "uppercase",
                }}
              >
                {title}
              </Typography>

              {!!stageName && (
                <Typography
                  sx={{
                    ...semanticTypo.cardH5,
                    mt: 0.25,
                  }}
                >
                  {stageName}
                </Typography>
              )}

              {!!infoType && (
                <Typography
                  sx={{
                    ...semanticTypo.bodyMedium,
                    color: colors.textSecondary,
                    mt: 0.4,
                    fontWeight: 600,
                  }}
                >
                  {infoType}
                </Typography>
              )}

            </Box>

          </Stack>

          {!!onBack && (
            <Chip
              label="Back"
              clickable
              onClick={onBack}
              sx={{
                ...buttonStyle.outlinedSmall,
                minWidth: 72,
              }}
            />
          )}

        </Stack>

      </Box>

    </Box>
  );
}

// ============================================================

LeapHeader.propTypes = {
  title: PropTypes.string,
  stageName: PropTypes.string,
  infoType: PropTypes.string,
  icon: PropTypes.elementType,
  onBack: PropTypes.func,
};

LeapHeader.defaultProps = {
  title: "Learn & Help",
  stageName: "",
  infoType: "",
  onBack: null,
};