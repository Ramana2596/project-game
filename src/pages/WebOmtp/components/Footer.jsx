// ==========================================================
// Component Name : Footer
// Module         : WebOmtp (Landing)
// Purpose        : Page footer with copyright and contact link
// Author/Version : UXLab V1.3 / v1.0
// AI Tags        : landing, footer, contact
// ==========================================================

// Imports
import React from "react";
import { Box, Typography, Link } from "@mui/material";
import { colors, layoutStyle, buttonStyle, masterTypo } from "../../../ux/styles";
import { FOOTER } from "../constants/content.js";

const Footer = () => {
  // Render
  return (
    <Box component="footer" sx={{ background: colors.paper, borderTop: `1px solid ${colors.border}` }}>
      <Box sx={{ ...layoutStyle.pageContainer, ...layoutStyle.flexRow, flexWrap: "wrap", px: { xs: 2, md: 4 }, py: 3 }}>
        <Typography sx={{ ...masterTypo.body2, color: colors.subtitle }}>{FOOTER.copy}</Typography>
        <Link href={FOOTER.contact} underline="hover" sx={{ ...masterTypo.body2, ...buttonStyle.text }}>Contact us</Link>
      </Box>
    </Box>
  );
};

export default Footer;
