// ============================================================
// LEAP V1.1
// File : LeapItem.jsx
// Purpose : Display one premium LEAP content item
// SEO    : LEAP Item, Learn Help Item, Content Card
// ============================================================

import React from "react";
import PropTypes from "prop-types";
import {
  Box,
  Stack,
  Typography,
} from "@mui/material";
import {
  colors,
  semanticTypo,
} from "../../../ux/styles";
import { getContentType } from "../constants/leapContentTypes";

// ============================================================
// Component
// ============================================================

export default function LeapItem({ item }) {

  // Get content type metadata
  const config = getContentType(item.infoType);

  // Get icon component
  const Icon = config.icon;

  return (
    <Box
      sx={{
        px: 2.5,
        py: 2,
        borderLeft: `4px solid ${config.borderColor}`,
        borderRadius: 2,
        bgcolor: colors.backgroundPaper,
        boxShadow: 1,
        transition: "all .20s ease",
        "&:hover": {
          boxShadow: 3,
          transform: "translateY(-2px)",
        },
      }}
    >

      {/* Item layout */}
      <Stack spacing={1.25}>

        {/* Item header */}
        <Stack
          direction="row"
          spacing={1.25}
          alignItems="center"
        >

          {/* Item icon */}
          <Icon
            sx={{
              fontSize: 22,
              color: config.color,
              flexShrink: 0,
            }}
          />

          {/* Item title */}
          <Typography
            sx={{
              ...semanticTypo.sectionTitle,
              color: config.color,
              flex: 1,
            }}
          >
            {item.title}
          </Typography>

        </Stack>

        {/* Item description */}
        <Typography
          sx={{
            ...semanticTypo.bodyMedium,
            color: colors.textSecondary,
            lineHeight: 1.7,
            pl: 4.25,
          }}
        >
          {item.infoText}
        </Typography>

      </Stack>

    </Box>
  );
}

// ============================================================
// Component Props
// ============================================================

LeapItem.propTypes = {
  item: PropTypes.shape({
    stageId: PropTypes.number,
    stageSequence: PropTypes.number,
    infoType: PropTypes.string,
    seqNo: PropTypes.number,
    title: PropTypes.string,
    infoText: PropTypes.string,
  }).isRequired,
};