// Component: StHeader — page-level header for Strategy Plan
// Purpose: show title and subtitle (primary page identifier — breadcrumb TBD)
// Author/Version: OpsMgt UX Lab / v1.3

import React from "react";
import PropTypes from "prop-types";
import { Box, Typography } from "@mui/material";
import { colors, masterTypo } from "../../../ux/styles";

const StHeader = ({ title, subtitle = "" }) => (
  <Box sx={{ mb: 2 }}>
    <Typography sx={masterTypo.h4}>{title}</Typography>
    {subtitle && (
      <Typography sx={{ ...masterTypo.body2, color: colors.subtitle, mt: 0.5 }}>
        {subtitle}
      </Typography>
    )}
  </Box>
);

StHeader.propTypes = {
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string,
};

export default StHeader;