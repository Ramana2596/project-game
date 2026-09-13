// Component: StHeader — page-level header for Strategy Plan
// Purpose: show title and subtitle
// Author/Version: OpsMgt UX Lab / v1.1

import React from "react";
import PropTypes from "prop-types";
import { Box, Typography } from "@mui/material";
import { masterTypo } from "../../../ux/styles";

const StHeader = ({ title, subtitle = "" }) => (
  <Box>
    <Typography sx={masterTypo.h3}>{title}</Typography>
    <Typography sx={{ ...masterTypo.body2, mt: 1 }}>{subtitle}</Typography>
  </Box>
);

StHeader.propTypes = {
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string,
};

export default StHeader;
