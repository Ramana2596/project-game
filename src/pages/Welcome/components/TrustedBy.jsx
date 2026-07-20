// **components/TrustedBy.jsx**
// Professional footer with auto-scrolling partner logos + interactive quick links

import React from "react";
import {
  Box,
  Container,
  Typography,
  Grid,
  Paper,
  keyframes,
} from "@mui/material";
import {
  colors,
  semanticTypo,
  cardStyle,
} from "../../../ux/styles";
import { Link } from "react-router-dom";
import OMTPLogo from "../../../assets/GreenTree.png"; // product logo
import coLogo from "../../../assets/coSiteLogo.png";   // company logo
import utyAsterik from "../../../assets/utyAsterik.png";
import utyHash from "../../../assets/utyHash.png";
import profBody from "../../../assets/profBodyMgtG.png";

// Sample dynamic partner list (replace/add logos & acronyms later)
const partners = [
  { key: "uty1", name: "Uty Star", logo: utyAsterik },
  { key: "uty2", name: "Hash Uty", logo: utyHash },
  { key: "co1", name: "SiTe", logo: coLogo },
  { key: "prof", name: "Consulting Group", logo: profBody },
];

// Keyframes for auto-scroll animation
const scroll = keyframes`
  0% { transform: translateX(0); }
  100% { transform: translateX(-50%); }
`;

const TrustedBy = () => {
  // Duplicate partner list for seamless looping
  const scrollingPartners = [...partners, ...partners];

  return (
    <Box
      component="section"
      aria-labelledby="trusted-heading"
      sx={{
        mt: 0,
        py: { xs: 1, md: 1.5 },
        background: colors.background.default,
      }}
    >
      { }
      <Box
      
        sx={{
          background: colors.heroGradient,
          color: colors.white,
          borderRadius: 6,
          py: { xs: 1.75, md: 2 },
          px: 5,
          textAlign: "center",
          boxShadow: `0 24px 60px ${colors.primary}33`,
        }
}
      >
        <Container maxWidth="xl">
          <Typography
            id="trusted-heading"
            component="h2"
            sx={{
              ...semanticTypo.pageH3,
              color: colors.white,
              fontWeight: 700,
              textAlign: "center",
              mb: 0.25,
            }}
          >
            Trusted by • In Association with
          </Typography>

          <Typography
            component="p"
            sx={{
              ...semanticTypo.bodyB1,
              color: colors.white,
              opacity: 0.85,
              fontSize: "1rem",
              textAlign: "center",
            }}
          >
            Universities • Business Schools • Professional Bodies • Industry Partners
          </Typography>

        </Container>
      </Box>

      {/* White Partner Area */}
      <Box
        sx={{
          bgcolor: "#ffffff",
          pt: 0.75,
          pb: 0,
        }}
      >
        <Container maxWidth="lg">

          <Grid container spacing={3} alignItems="center">

            {/* OMTP */}
            <Grid item xs={12} md={2}>
              <Paper
                elevation={2}
                sx={{
                  p: 1.5,
                  borderRadius: 4,
                  textAlign: "center",
                }}
              >
                <img
                  src={coLogo}
                  alt="SiTech"
                  style={{ width: 40, marginBottom: 6 }}
                />

                <img
                  src={OMTPLogo}
                  alt="OMTP"
                  style={{ width: 40 }}
                />

                <Typography
                  sx={{
                    ...semanticTypo.caption,
                    mt: 1,
                  }}
                >
                  OMTP • SiTech
                </Typography>
              </Paper>
            </Grid>

            {/* Partner Logos */}
            <Grid item xs={12} md={10}>

              <Box
                sx={{
                  overflow: "hidden",
                  "&:hover .partner-scroll": {
                    animationPlayState: "paused",
                  },
                }}
              >

                <Box
                  className="partner-scroll"
                  sx={{
                    display: "flex",
                    animation: `${scroll} 34s linear infinite`,
                    width: "max-content",
                  }}
                >

                  {scrollingPartners.map((partner, index) => (

                    <Paper
                      elevation={2}
                      sx={{
                        width: 140,
                        height: 110,
                        mx: 1.5,
                        borderRadius: 4,
                        display: "flex",
                        flexDirection: "column",
                        overflow: "hidden",
                        flexShrink: 0,
                        borderTop:
                          partner.key.startsWith("uty")
                            ? "5px solid #2E7D32"
                            : partner.key.startsWith("co")
                              ? "5px solid #1565C0"
                              : "5px solid #C49000",

                        "&:hover": {
                          transform: "translateY(-6px)",
                          boxShadow: "0 14px 28px rgba(0,0,0,.18)",
                        },
                      }}
                    >

                      <Box
                        sx={{
                          flex: 1,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          p: 2,
                        }}
                      >
                        <Box
                          sx={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            justifyContent: "center",
                            height: "100%",
                            gap: 1,
                          }}
                        >
                          <Box
                            component="img"
                            src={partner.logo}
                            alt={partner.name}
                            sx={{
                              width: 64,
                              height: 64,
                              objectFit: "contain",
                              flexGrow: 1,
                            }}
                          />

                          <Typography
                            component="p"
                            sx={{
                              ...semanticTypo.caption,
                              fontWeight: 700,
                              color: colors.title,
                              textAlign: "center",
                              lineHeight: 1.2,
                            }}
                          >
                            {partner.name}
                          </Typography>
                        </Box>
                      </Box>
                    </Paper>

                  ))}

                </Box>

              </Box>

            </Grid>

          </Grid>

        </Container>
      </Box>

      {/* Footer */}
      <Box
        sx={{
          py: 3,
          bgcolor: colors.heroGradient,
          color: colors.white,
        }}
      >
        <Container maxWidth="lg">

          <Typography
            align="center"
            sx={{
              ...semanticTypo.bodyB2,
              color: colors.body,
              fontWeight: 500,
              mb: 1,
            }}
          >
            © {new Date().getFullYear()} Operation Management Training Platform
          </Typography>

          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              gap: 3,
            }}
          >
            {["About", "Contact", "Privacy", "Terms"].map((link) => (
              <Typography
                key={link}
                component={Link}
                to={`/${link.toLowerCase()}`}
                sx={{
                  ...semanticTypo.bodyB2,
                  color: colors.body,
                  fontWeight: 500,
                  textDecoration: "none",
                  "&:hover": {
                    color: colors.primary,
                    textDecoration: "underline",
                  },
                }}
              >
                {link}
              </Typography>
            ))}
          </Box>

        </Container>
      </Box>

    </Box>
  );
};

export default TrustedBy