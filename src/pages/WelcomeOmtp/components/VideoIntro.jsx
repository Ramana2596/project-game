// ============================================================
// Component: Video Introduction (UXLab V1.0)
// ============================================================

import React from "react";
import { Box, Typography, Button, Container } from "@mui/material";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";

import {
  colors,
  buttonStyle,
  semanticTypo,
} from "../../../ux/styles";

const VideoIntro = () => {
  const youtubeLink = "https://www.youtube.com/watch?v=3eRde31HIzI";

  const handleOpenVideo = () => {
    window.open(youtubeLink, "_blank", "noopener,noreferrer");
  };

  return (
    <Box
      component="section"
      id="how-it-works"
      sx={{
        py: { xs: 8, md: 10 },
        bgcolor: colors.paper,
      }}
    >
      <Container maxWidth="lg">

        {/* Section Header */}

        <Typography
          component="h2"
          variant="h3"
          sx={{
            ...semanticTypo.sectionH3,
            mb: 2,
          }}
        >
          See how OMTP works
        </Typography>

        <Typography
          component="p"
          variant="body1"
          sx={{
            ...semanticTypo.sectionB1,
            mb: 5,
            maxWidth: 720,
          }}
        >
          Watch the short introduction video for a quick overview, then
          scroll down to see the full 7-step visual walkthrough of the
          real platform.
        </Typography>

        {/* Video Panel */}

        <Box
          sx={{
            width: "100%",
            background: colors.heroGradient,
            borderRadius: 7,
            p: { xs: 4, md: 6 },

            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",

            color: colors.white,

            boxShadow: `0 16px 36px ${colors.shadowColor}`,
          }}
        >

          {/* Play Button */}

          <Box
            onClick={handleOpenVideo}
            sx={{
              width: 72,
              height: 72,
              bgcolor: "rgba(255,255,255,0.15)",
              borderRadius: "50%",

              display: "flex",
              alignItems: "center",
              justifyContent: "center",

              mb: 3,

              cursor: "pointer",

              backdropFilter: "blur(4px)",

              border: "2px solid rgba(255,255,255,0.30)",

              transition: "all .25s ease",

              "&:hover": {
                transform: "scale(1.08)",
                bgcolor: "rgba(255,255,255,0.25)",
              },
            }}
          >
            <PlayArrowIcon
              sx={{
                fontSize: 42,
                color: colors.white,
              }}
            />
          </Box>

          <Typography
            component="h3"
            variant="h4"
            sx={{
              ...semanticTypo.cardH4,
              color: colors.white,
              textAlign: "center",
              mb: 2,
            }}
          >
            Watch the OMTP Intro Video
          </Typography>

          <Typography
            component="p"
            variant="body2"
            sx={{
              ...semanticTypo.bodyB2,
              color: "rgba(255,255,255,0.90)",
              textAlign: "center",
              maxWidth: 600,
              mb: 4,
            }}
          >
            Get a quick overview of how the platform helps learners make
            operational decisions, review outcomes, and build practical
            business understanding.
          </Typography>

          <Button
            variant="contained"
            onClick={handleOpenVideo}
            sx={{
              ...buttonStyle.primary,

              background: colors.white,
              color: colors.primary,

              px: 4,
              py: 1.3,
              borderRadius: "100px",

              "&:hover": {
                ...buttonStyle.primary["&:hover"],
                background: "#F8F8F8",
                color: colors.primaryDark,
              },
            }}
          >
            Watch on YouTube
          </Button>
        </Box>

        {/* Footer Note */}

        <Typography
          component="p"
          sx={{
            ...semanticTypo.caption,
            mt: 2.5,
            textAlign: "left",
          }}
        >
          This opens the video directly on YouTube.
        </Typography>

      </Container>
    </Box>
  );
};

export default VideoIntro;