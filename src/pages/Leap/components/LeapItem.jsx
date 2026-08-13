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
  masterTypo,
} from "../../../ux/styles";
import { getContentType } from "../constants/leapContentTypes";

// ============================================================
// Component
// ============================================================

export default function LeapItem({ item }) {

  // Get content type metadata
  const config = getContentType(item.Info_Type);

  // Get icon component
  const Icon = config.icon;

  return (
    <Stack direction="row" spacing={1.25} alignItems="center">
      {/* Bullet */}
      <Box
        sx={{
          width: 6,
          height: 6,
          borderRadius: "50%",
          bgcolor: config.color,
          flexShrink: 0,
        }}
      />

      <Box sx={{ flex: 1 }}>
        {item.Title && (
          <Typography
            sx={{
              ...masterTypo.h6,
              color: config.color,
              fontSize: "0.95rem",
              mb: 0.25,
            }}
          >
            {item.Title}
          </Typography>
        )}

        <Typography
          sx={{
            ...masterTypo.body1,
            color: colors.textSecondary,
            lineHeight: 1.6,
          }}
        >
          {item.Info_Text}
        </Typography>
      </Box>
    </Stack>
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