/**
 * Component Name : StHeader
 * Module         : Strategy
 * Purpose        : Page-level header — title and supporting subtitle
 *                   for the Strategy Plan decision page.
 * Author/Version : OpsMgt UX Lab / v1.0
 * AI Tags        : strategy, header, branding, page-title
 */

// --------------------------------------------------------------
// Imports
// --------------------------------------------------------------
import React from "react";
import PropTypes from "prop-types";
import { Box, Typography } from "@mui/material";
import { semanticTypo } from "../../../styles/ux";

/**
 * StHeader
 * @param {string} title
 * @param {string} subtitle
 */
const StHeader = ({ title, subtitle }) => (
  <Box>
    <Typography sx={semanticTypo.heroH1}>{title}</Typography>
    <Typography sx={{ ...semanticTypo.bodyB1, mt: 1 }}>{subtitle}</Typography>
  </Box>
);

StHeader.propTypes = {
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string,
};

StHeader.defaultProps = {
  subtitle: "",
};

export default StHeader;