// ==========================================
// Component: Walkthrough Step 7 (Historical Data - Variant-driven)
// ==========================================

import React from 'react';
import { Box, Typography, Grid } from '@mui/material';
import BaseStep from './BaseStep';
import imgInfoDesk1 from '../../../../assets/DemoPicture/InfoDesk1.jpg';
import imgInfoDesk2 from '../../../../assets/DemoPicture/InfoDesk2.jpg';
import { colors } from '../../../../ux/styles';

const Step7Hist = () => {
  return (
    <BaseStep 
      number="7"
      title="Learn from Historical Data"
      description="Use the information panels and historical data to reflect on past performance, identify patterns, and improve future decisions."
    >
      <Box>
        {/* Slimmer Label */}
        <Typography 
          variant="subtitle1" 
          sx={{ fontWeight: 700, color: colors.title || '#1F2D3D', mb: 1 }}
        >
          Historical Data and Trend Analysis
        </Typography>

        {/* 2-Column Grid */}
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <Box 
              sx={{ 
                p: 1, 
                bgcolor: colors.background?.default || '#f9fafb', 
                border: `1px solid ${colors.border || '#E6E0F4'}`, 
                borderRadius: '12px'
              }}
            >
              <Box 
                component="img" 
                src={imgInfoDesk1} 
                alt="Historical Data View 1 Panel" 
                sx={{ width: '100%', borderRadius: '8px', display: 'block' }} 
              />
            </Box>
          </Grid>

          <Grid item xs={12} md={6}>
            <Box 
              sx={{ 
                p: 1, 
                bgcolor: colors.background?.default || '#f9fafb', 
                border: `1px solid ${colors.border || '#E6E0F4'}`, 
                borderRadius: '12px'
              }}
            >
              <Box 
                component="img" 
                src={imgInfoDesk2} 
                alt="Historical Data View 2 Panel" 
                sx={{ width: '100%', borderRadius: '8px', display: 'block' }} 
              />
            </Box>
          </Grid>
        </Grid>
      </Box>
    </BaseStep>
  );
};

export default Step7Hist;
