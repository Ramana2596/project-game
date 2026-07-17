// ==========================================
// Component: Footer
// UXLab V1.0
// ==========================================

import React from "react";
import {
  Box,
  Container,
  Typography,
  Stack,
  Link,
  Divider,
} from "@mui/material";

import {
  colors,
  semanticTypo,
} from "../../../ux/styles";

const Footer = () => (
  <Box
    component="footer"
    sx={{
      py: { xs: 3, md: 3.5 },
      mt: 3,
      bgcolor: colors.panel,
      borderTop: `1px solid ${colors.border}`,
    }}
  >
    <Container maxWidth="lg">

      {/* Brand + Navigation */}

      <Stack
        direction={{ xs: "column", md: "row" }}
        justifyContent="space-between"
        alignItems={{ xs: "center", md: "flex-start" }}
        spacing={3}
      >

        {/* Brand */}

        <Box
          sx={{
            textAlign: { xs: "center", md: "left" },
            lineHeight: 1.2,
          }}
        >
          <Typography
            component="h2"
            variant="h6"
            sx={{
              ...semanticTypo.cardH5,
              color: colors.primaryDark,
            }}          >
            OMTP
          </Typography>

          <Typography
            component="p"
            variant="body2"
            sx={{
              ...semanticTypo.bodyB2,
              mb: 0.5,
            }}
          >
            Operations Management Training Platform
          </Typography>

          <Typography
            component="p"
            variant="caption"
            sx={semanticTypo.caption}
          >
            Practical Learning for Modern Business.
          </Typography>
        </Box>

        {/* Navigation */}

        <Stack
          direction="row"
          spacing={2}
          sx={{
            flexWrap: "wrap",
            justifyContent: "center",
          }}
        >
          {[
            "About",
            "How It Works",
            "For Whom",
            "Pricing",
          ].map((item) => (
            <Link
              key={item}
              href={`#${item.toLowerCase().replace(/\s+/g, "-")}`}
              underline="none"
              sx={{
                ...semanticTypo.bodyB2,
                color: colors.body,
                transition: "color .2s",

                "&:hover": {
                  color: colors.primaryDark,
                },
              }}
            >
              {item}
            </Link>
          ))}
        </Stack>

      </Stack>

      <Divider
        sx={{
          my: 2.5,
          borderColor: colors.border,
        }}
      />

      {/* Bottom */}

      <Stack
        direction={{ xs: "column", sm: "row" }}
        justifyContent="space-between"
        alignItems="center"
        spacing={0.5}
      >
        <Typography
          component="p"
          variant="caption"
          sx={semanticTypo.caption}
        >
          © {new Date().getFullYear()} OMTP. All rights reserved.
        </Typography>

        <Typography
          component="p"
          variant="caption"
          sx={semanticTypo.caption}
        >
          Contact: info@omtp.example
        </Typography>
      </Stack>

    </Container>
  </Box>
);

export default Footer;