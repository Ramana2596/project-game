// ============================================================
// OpsMgt UX Lab
// Component : InfoDeskView (Variant-driven)
// ============================================================

import React from 'react';
import { Box, Typography, Grid } from '@mui/material';
import imgInfoDesk1 from '../../../assets/DemoPicture/InfoDesk1.jpg';
import imgInfoDesk2 from '../../../assets/DemoPicture/InfoDesk2.jpg';
import { colors } from '../../../ux/styles'; 

const InfoDeskView = () => (
  <Box sx={{ mt: 2, mb: 4 }}>
    <Grid container spacing={2}> {/* Strict 8px layout grid step (2 = 16px) */}
      
      {/* LEFT PANEL */}
      <Grid item xs={12} md={6}>
        <Box 
          sx={{ 
            bgcolor: colors.panel || '#F8F5FF', 
            p: 2, 
            borderRadius: '12px', 
            border: `1px solid ${colors.border || '#E6E0F4'}` 
          }}
        >
          <Typography 
            variant="subtitle2" 
            sx={{ 
              mb: 1.5, 
              color: colors.subtitle || '#6B6488', 
              fontWeight: 600
            }}
          >
            Information Panel 1 of Historical Data
          </Typography>
          <Box 
            component="img" 
            src={imgInfoDesk1} 
            alt="Historical Data Trends View 1"
            sx={{ width: '100%', borderRadius: '8px', display: 'block' }} 
          />
        </Box>
      </Grid>

      {/* RIGHT PANEL */}
      <Grid item xs={12} md={6}>
        <Box 
          sx={{ 
            bgcolor: colors.panel || '#F8F5FF', 
            p: 2, 
            borderRadius: '12px', 
            border: `1px solid ${colors.border || '#E6E0F4'}` 
          }}
        >
          <Typography 
            variant="subtitle2" 
            sx={{ 
              mb: 1.5, 
              color: colors.subtitle || '#6B6488', 
              fontWeight: 600
            }}
          >
            Information Panel 2 of Historical Data
          </Typography>
          <Box 
            component="img" 
            src={imgInfoDesk2} 
            alt="Historical Data Trends View 2"
            sx={{ width: '100%', borderRadius: '8px', display: 'block' }} 
          />
        </Box>
      </Grid>

    </Grid>
  </Box>
);

export default InfoDeskView;
