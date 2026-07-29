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
      {/* Title row — above purple bar */}
      <Box
        sx={{
          px: 2,
          pt: 2,
          pb: 1.5,
          textAlign: "center",
        }}
      >
        <Stack
          direction="row"
          justifyContent="center"
          alignItems="center"
          spacing={1}
        >
          {Icon && (
            <Icon
              sx={{
                color: colors.primary,
                fontSize: 26,
              }}
            />
          )}

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
        </Stack>

        {!!onBack && (
          <Box sx={{ display: "flex", justifyContent: "center", mt: 1 }}>
            <Chip
              label="Back"
              clickable
              onClick={onBack}
              sx={{
                ...buttonStyle.outlinedSmall,
                minWidth: 72,
              }}
            />
          </Box>
        )}
      </Box>

      {/* Purple Accent */}
      <Box
        sx={{
          height: 4,
          bgcolor: colors.primary,
        }}
      />

      {/* Stage name — below purple bar */}
      {(!!stageName || !!infoType) && (
        <Box
          sx={{
            px: 2,
            pt: 1.5,
            pb: 1,
            textAlign: "center",
          }}
        >
          {!!stageName && (
            <Typography
              sx={{
                ...semanticTypo.cardH5,
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
      )}
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