// ==========================================
// Component: Core Pillars (Ultra-Compact Row)
// ==========================================

import React from 'react';
import { Box, Typography, Grid, Container } from "@mui/material";
import {
    semanticTypo,
    cardStyle,
} from "../../../ux/styles";

const pillars = [
  { title: "Real Decisions", desc: "Input monthly forecasts and sales strategies." },
  { title: "Instant Feedback", desc: "See immediate financial results after every run." },
  { title: "Practical Learning", desc: "Bridge the gap between theory and performance." }
];

const CorePillars = () => (
  <Box component="section" sx={{ py: 2, bgcolor: colors.panel }}>
    <Container maxWidth="lg">
      <Grid 
        container 
        spacing={2} 
        justifyContent="center" 
        alignItems="stretch"
        sx={{ flexWrap: 'nowrap' }}
      >
        {pillars.map((item, index) => (
          <Grid item xs={4} key={index} sx={{ display: 'flex' }}>
            <Box
              sx={{
                ...cardStyle.primary,

                width: "100%",
                px: 2,
                py: 2,
                textAlign: "center",

                display: "flex",
                flexDirection: "column",
                justifyContent: "center",

                minHeight: 90,
              }}
            >
              <Typography
                sx={{
                  ...semanticTypo.cardH6,
                  color: colors.primaryDark,
                  mb: 0.5,
                }}
              >
                {item.title}
              </Typography>

              <Typography
                sx={{
                  ...semanticTypo.caption,
                }}
              >
                {item.desc}
              </Typography>
            </Box>
          </Grid>
        ))}
      </Grid>
    </Container>
  </Box>
);

export default CorePillars;
