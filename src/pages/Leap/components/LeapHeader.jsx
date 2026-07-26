// ============================================================
// LEAP V1.1
// File : LeapHeader.jsx
// Purpose : Display premium LEAP dialog header with stage information
// SEO    : LEAP Header, Learn Help Header, Stage Header
// ============================================================

import React from "react";
import PropTypes from "prop-types";
import {
  Box,
  Chip,
  IconButton,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";
import MenuBookOutlinedIcon from "@mui/icons-material/MenuBookOutlined";
import CloseIcon from "@mui/icons-material/Close";
import { colors, semanticTypo } from "../../../ux/styles";

// ============================================================
// Component
// ============================================================

export default function LeapHeader({
  title,
  stageName,
  stageDescription,
  stageIcon,
  onClose,
}) {

  const Icon = stageIcon || <MenuBookOutlinedIcon fontSize="medium" />;

  return (
    <Box
      sx={{
        position: "sticky",
        top: 0,
        zIndex: 20,
        bgcolor: colors.backgroundPaper,
        borderBottom: `1px solid ${colors.border}`,
      }}
    >

      {/* Top accent */}
      <Box
        sx={{
          height: 4,
          bgcolor: colors.primary,
        }}
      />

      {/* Header */}
      <Box
        sx={{
          px: 3,
          py: 2.5,
        }}
      >

        {/* Header layout */}
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="flex-start"
          spacing={2}
        >

          {/* Header content */}
          <Stack
            direction="row"
            spacing={2}
            sx={{ flex: 1 }}
          >

            {/* Stage icon */}
            <Box
              sx={{
                width: 54,
                height: 54,
                borderRadius: "50%",
                bgcolor: colors.primaryLight,
                color: colors.primary,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
              }}
            >
              {Icon}
            </Box>

            {/* Text content */}
            <Box sx={{ flex: 1 }}>

              {/* Dialog title */}
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

              {/* Stage name */}
              <Typography
                sx={{
                  ...semanticTypo.pageH3,
                  mt: 0.25,
                }}
              >
                {stageName}
              </Typography>

              {/* Stage description */}
              {!!stageDescription && (
                <Typography
                  sx={{
                    ...semanticTypo.bodyMedium,
                    color: colors.textSecondary,
                    mt: 0.75,
                    maxWidth: "90%",
                    lineHeight: 1.6,
                  }}
                >
                  {stageDescription}
                </Typography>
              )}



            </Box>

          </Stack>

          {/* Close button */}
          <Tooltip title="Close">
            <IconButton
              onClick={onClose}
              sx={{
                mt: -0.5,
              }}
            >
              <CloseIcon />
            </IconButton>
          </Tooltip>

        </Stack>

      </Box>

    </Box>
  );
}

// ============================================================
// Component Props
// ============================================================

LeapHeader.propTypes = {
  title: PropTypes.string,
  stageName: PropTypes.string,
  stageDescription: PropTypes.string,
  stageIcon: PropTypes.node,
  onClose: PropTypes.func.isRequired,
};

// ============================================================
// Default Props
// ============================================================

LeapHeader.defaultProps = {
  title: "Learn & Help",
  stageName: "",
  stageDescription: "",
  stageIcon: null,
};