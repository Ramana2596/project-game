// ============================================================
// LEAP V1.1
// File : LeapPanel.jsx
// Purpose : Render LEAP content sections in configured display order
// SEO    : LEAP Panel, Learn Help Panel, Content Renderer
// ============================================================

import React from "react";
import PropTypes from "prop-types";
import {
  Box,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import MenuBookOutlinedIcon from "@mui/icons-material/MenuBookOutlined";
import {
  colors,
  semanticTypo,
} from "../../../ux/styles";
import LeapSection from "./LeapSection";
import { LEAP_SECTION_ORDER } from "../constants/leapConstants";

// ============================================================
// Component
// ============================================================

export default function LeapPanel({
  grouped,
  selectedType,
}) {

  // Show section heading only when displaying all sections
  const showHeading = selectedType === "ALL";

  // Check whether any content exists
  const hasContent = LEAP_SECTION_ORDER.some(
    (type) => grouped[type]?.length > 0
  );

  // Empty state
  if (!hasContent) {
    return (
      <Paper
        elevation={0}
        sx={{
          p: 5,
          borderRadius: 3,
          textAlign: "center",
          border: `1px dashed ${colors.border}`,
          bgcolor: colors.backgroundPaper,
        }}
      >
        <Stack
          spacing={2}
          alignItems="center"
        >
          <MenuBookOutlinedIcon
            sx={{
              fontSize: 48,
              color: colors.textSecondary,
            }}
          />

          <Typography
            sx={{
              ...semanticTypo.sectionTitle,
            }}
          >
            No learning resources found
          </Typography>

          <Typography
            sx={{
              ...semanticTypo.bodyMedium,
              color: colors.textSecondary,
              maxWidth: 420,
            }}
          >
            There are no learning resources available for the selected
            category.
          </Typography>

        </Stack>
      </Paper>
    );
  }

  return (
    <Box>

      {/* Render sections in configured display order */}
      {LEAP_SECTION_ORDER.map((infoType) => {

        const items = grouped[infoType];

        if (!items?.length) {
          return null;
        }

        return (
          <Box
            key={infoType}
            sx={{
              mb: 4,
            }}
          >
            <LeapSection
              infoType={infoType}
              items={items}
              showHeading={showHeading}
            />
          </Box>
        );

      })}

    </Box>
  );
}

// ============================================================
// Component Props
// ============================================================

LeapPanel.propTypes = {
  grouped: PropTypes.object.isRequired,
  selectedType: PropTypes.string,
};

// ============================================================
// Default Props
// ============================================================

LeapPanel.defaultProps = {
  selectedType: "ALL",
};