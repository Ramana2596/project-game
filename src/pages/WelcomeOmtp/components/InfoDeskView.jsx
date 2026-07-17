// ============================================================
// OpsMgt UX Lab
// Component : InfoDeskView (Variant-driven)
// ============================================================

import React from 'react';
import { Box, Typography, Grid } from '@mui/material';
import imgInfoDesk1 from '../../../assets/DemoPicture/InfoDesk1.jpg';
import imgInfoDesk2 from '../../../assets/DemoPicture/InfoDesk2.jpg';
import {
  colors,
  semanticTypo,
} from "../../../ux/styles";

const InfoDeskView = () => (
  <Box sx={{ mt: 2, mb: 4 }}>
    <Grid container spacing={2}> {/* Strict 8px layout grid step (2 = 16px) */}
      
      {/* LEFT PANEL */}
      <Grid item xs={12} md={6}>
        <Box
          sx={{
            bgcolor: colors.panel,
            border: `1px solid ${colors.border}`,
            borderRadius: 4,
            p: 1.5,
            boxShadow: "0 8px 22px rgba(123,31,162,.08)",
            transition: "all .25s ease",

            "&:hover": {
              transform: "translateY(-3px)",
              boxShadow: "0 14px 30px rgba(123,31,162,.15)",
            },
          }}
        >
          <Typography
            component="h4"
            variant="h4"
            sx={{
              ...semanticTypo.cardH5,
              color: colors.primaryDark,
              mb: 1.5,
            }}
          >
            Information Panel 1 of Historical Data
          </Typography>
          <Box
            component="img"
            src={imgInfoDesk1}
            alt="Historical Data Trends View 1"
            sx={{
              width: "100%",
              display: "block",
              borderRadius: 2,
              border: `1px solid ${colors.border}`,
            }}
          />
        </Box>
      </Grid>

      {/* RIGHT PANEL */}
      <Grid item xs={12} md={6}>
        <Box
          sx={{
            bgcolor: colors.panel,
            border: `1px solid ${colors.border}`,
            borderRadius: 4,
            p: 1.5,
            boxShadow: "0 8px 22px rgba(123,31,162,.08)",
            transition: "all .25s ease",

            "&:hover": {
              transform: "translateY(-3px)",
              boxShadow: "0 14px 30px rgba(123,31,162,.15)",
            },
          }}
        >
          <Typography
            component="h4"
            variant="h4"
            sx={{
              ...semanticTypo.cardH5,
              color: colors.primaryDark,
              mb: 1.5,
            }}
          >
            Information Panel 2 of Historical Data
          </Typography>
          <Box 
            component="img"
            src={imgInfoDesk2}
            alt="Historical Data Trends View 2"
            sx={{
              width: "100%",
              display: "block",
              borderRadius: 2,
              border: `1px solid ${colors.border}`,
            }} />
        </Box>
      </Grid>

    </Grid>
  </Box>
);

export default InfoDeskView;
