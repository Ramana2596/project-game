// **components/TrustedBy.jsx**
// Professional footer with auto-scrolling partner logos + interactive quick links
// UXLab V1.0 — Purple theme, soft-wash variant

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

const CATEGORY_META = {
  university: { label: "University", color: colors.success },
  company: { label: "Company", color: colors.info },
  professional: { label: "Professional Body", color: "#C49000" },
};

const omtpPartner =
  { key: "omtp", name: "OMTP • SiTech", logo: OMTPLogo, category: "company", fixed: true, };

const partners = [
  { key: "uty1", name: "Uty Star", logo: utyAsterik, category: "university" },
  { key: "uty2", name: "Hash Uty", logo: utyHash, category: "university" },
  { key: "co1", name: "SiTe", logo: coLogo, category: "company" },
  { key: "prof", name: "Consulting Group", logo: profBody, category: "professional" },
];

// Keyframes for auto-scroll animation
const scroll = keyframes`
  0% { transform: translateX(0); }
  100% { transform: translateX(-50%); }
`;

const TrustedBy = () => {
  // Duplicate partner list for seamless scrolling
  const scrollingPartners = [
    ...partners,
    ...partners,
  ];

  return (
    <Box
      component="section"
      aria-labelledby="trusted-heading"
      sx={{
        py: { xs: 6, md: 8 },
        mt: 0,
        background: colors.pageGradient,
        position: "relative",

        "&::before": {
          content: '""',
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(circle at right center, rgba(123,31,162,.06), transparent 55%)",
          pointerEvents: "none",
        },
      }}
    >
      { }
      <Box sx={{ pt: { xs: 4, md: 5 }, pb: { xs: 2, md: 2.5 } }}>
        <Container maxWidth="lg" sx={{ textAlign: "center" }}>
          <Typography
            id="trusted-heading"
            component="h2"
            sx={{
              ...semanticTypo.pageH3,
              color: colors.primaryDark,
              textAlign: "center",
              mb: 1.5,
              position: "relative",
              zIndex: 1,
            }}
          >
            Trusted by • In association with
          </Typography>

          <Typography
            component="p"
            sx={{
              ...semanticTypo.cardH4,
              fontSize: { xs: "1.05rem", md: "1.2rem" },
              color: colors.heading,
              fontWeight: 600,
            }}
          >
            Universities • Business Schools • Professional Bodies • Industry Partners
          </Typography>
        </Container>
      </Box>

      {/* Partner Area */}
      <Box sx={{ pb: { xs: 3, md: 3.5 } }}>
        <Container maxWidth="lg">
          <Grid container>
            <Grid item xs={12}>            {/* OMTP */}

              <Box
                sx={{
                  display: "flex",
                  alignItems: "stretch",
                  gap: 2,
                }}
              >

                <Paper
                  elevation={0}
                  sx={{
                    ...cardStyle.primary,
                    background: colors.panelGradient,
                    borderRadius: 6,

                    width: 148,
                    height: 116,

                    flexShrink: 0,

                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",

                    borderTop: `4px solid ${colors.primary}`,
                  }}
                >
                  <Box
                    component="img"
                    src={OMTPLogo}
                    alt="OMTP"
                    sx={{
                      width: 72,
                      height: 72,
                      objectFit: "contain",
                    }}
                  />

                  <Typography
                    sx={{
                      ...semanticTypo.caption,
                      color: colors.subtitle,
                      mt: 1,
                    }}
                  >
                    OMTP • SiTech
                  </Typography>
                </Paper>

                {/* Partner Logos */}
                <Box
                  sx={{
                    flex: 1,
                    overflow: "hidden",
                    maskImage:
                      "linear-gradient(90deg, transparent, #000 5%, #000 95%, transparent)",
                    WebkitMaskImage:
                      "linear-gradient(90deg, transparent, #000 5%, #000 95%, transparent)",
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
                      "@media (prefers-reduced-motion: reduce)": {
                        animation: "none",
                      },
                    }}
                  >
                    {scrollingPartners.map((partner, index) => {
                      const meta = CATEGORY_META[partner.category];
                      return (
                        <Paper
                          key={`${partner.key}-${index}`}
                          elevation={0}
                          sx={{
                            ...cardStyle.primary,
                            background: colors.panelGradient,
                            borderRadius: 6,
                            "&:hover": {
                              ...cardStyle.primary["&:hover"],
                            }, width: 148,
                            height: 116,
                            mx: 1.5,
                            display: "flex",
                            flexDirection: "column",
                            overflow: "hidden",
                            flexShrink: 0,
                            borderTop: `4px solid ${partner.fixed
                              ? colors.primary
                              : meta.color
                              }`,
                          }}
                        >
                          <Box
                            sx={{
                              flex: 1,
                              display: "flex",
                              flexDirection: "column",
                              alignItems: "center",
                              justifyContent: "center",
                              gap: 1,
                              px: 2.5,
                              py: 2.2,
                            }}
                          >
                            <Box
                              component="img"
                              src={partner.logo}
                              alt={`${partner.name} logo`}
                              sx={{
                                width: 72,
                                height: 72,
                                objectFit: "contain",
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
                        </Paper>
                      );
                    })}
                  </Box>
                </Box>
              </Box>
              {/* Legend — makes the accent colour coding actually legible */}
              <Box
                sx={{
                    display: "flex",
                    justifyContent: "center",
                    flexWrap: "wrap",
                    gap: 2.5,
                    mt: 1.5,
                  }}
                >
                  {Object.values(CATEGORY_META).map((meta) => (
                    <Box
                      key={meta.label}
                      sx={{ display: "flex", alignItems: "center", gap: 0.75 }}
                    >
                      <Box
                        aria-hidden="true"
                        sx={{
                          width: 10,
                          height: 10,
                          borderRadius: "50%",
                          background: meta.color,
                        }}
                      />
                      <Typography
                        sx={{ ...semanticTypo.caption, color: colors.subtitle }}
                      >
                        {meta.label}
                      </Typography>
                    </Box>
                  ))}
                </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Footer */}
      <Box
        sx={{
          py: 2.5,
          borderTop: `1px solid ${colors.divider}`,
        }}
      >
        <Container maxWidth="lg">
          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "column", sm: "row" },
              alignItems: "center",
              justifyContent: "space-between",
              gap: 1.5,
            }}
          >
            <Typography
              sx={{
                ...semanticTypo.caption,
                color: colors.muted,
              }}
            >
              © {new Date().getFullYear()} Operation Management Training Platform
            </Typography>

            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2.5 }}>
              {["About", "Contact", "Privacy", "Terms"].map((link) => (
                <Typography
                  key={link}
                  component={Link}
                  to={`/${link.toLowerCase()}`}
                  sx={{
                    ...semanticTypo.caption,
                    color: colors.body,
                    textDecoration: "none",
                    "&:hover": {
                      color: colors.primary,
                      textDecoration: "underline",
                    },
                    "&:focus-visible": {
                      outline: `2px solid ${colors.primary}`,
                      outlineOffset: 2,
                      borderRadius: 2,
                    },
                  }}
                >
                  {link}
                </Typography>
              ))}
            </Box>
          </Box>
        </Container>
      </Box>
    </Box>
  );
};

export default TrustedBy;
