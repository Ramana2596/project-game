// ============================================================
// LEAP V1.1
// File : LeapSection.jsx
// Purpose : Display one LEAP content section
// SEO    : LEAP Section, Learn Help Section, Content Group
// ============================================================

import React from "react";
import PropTypes from "prop-types";
import {
  Box,
  Divider,
  Stack,
  Typography,
} from "@mui/material";
import {
  colors,
  semanticTypo,
} from "../../../ux/styles";
import LeapItem from "./LeapItem";
import { getContentType } from "../constants/leapContentTypes";

// ============================================================
// Component
// ============================================================

export default function LeapSection({
  infoType,
  items,
  showHeading,
}) {

  // Get content type metadata
  const config = getContentType(infoType);

  // Get icon component
  const Icon = config.icon;

  return (
    <Box>

      {/* Section heading */}
      {showHeading && (
        <Box sx={{ mb: 2 }}>

          {/* Heading layout */}
          <Stack
            direction="row"
            spacing={1}
            alignItems="center"
            sx={{ mb: 1 }}
          >

            {/* Section icon */}
            <Icon
              sx={{
                fontSize: 24,
                color: config.color,
              }}
            />

            {/* Section title */}
            <Typography
              sx={{
                ...semanticTypo.sectionTitle,
                color: config.color,
              }}
            >
              {config.title}
            </Typography>

          </Stack>

          {/* Section divider */}
          <Divider
            sx={{
              borderColor: colors.border,
            }}
          />

        </Box>
      )}

      {/* Section items - single card, bullet list */}
      <Box
        sx={{
          borderLeft: `4px solid ${config.color}`,
          borderRadius: 2,
          bgcolor: colors.backgroundPaper,
          boxShadow: 1,
          px: 2.5,
          py: 2,
        }}
      >
        <Stack spacing={1.25}>
          {items.map((item) => (
            <LeapItem
              key={item.Seq_No}
              item={item}
            />
          ))}
        </Stack>
      </Box>

    </Box>
  );
}

// ============================================================
// Component Props
// ============================================================

LeapSection.propTypes = {
  infoType: PropTypes.string.isRequired,
  items: PropTypes.arrayOf(
    PropTypes.object
  ).isRequired,
  showHeading: PropTypes.bool,
};

// ============================================================
// Default Props
// ============================================================

LeapSection.defaultProps = {
  showHeading: true,
};