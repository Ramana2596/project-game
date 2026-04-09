// ==========================================
// Component: Walkthrough Step 7 (Historical Data)
// ==========================================

import React from 'react';
import { Box, Typography, Grid } from '@mui/material';
import BaseStep from './BaseStep';
import imgInfoDesk1 from '../../../../assets/DemoPicture/InfoDesk1.jpg';
import imgInfoDesk2 from '../../../../assets/DemoPicture/InfoDesk2.jpg';

const Step7Hist = () => {
  return (
    <BaseStep 
      number="7"
      title="Learn from Historical Data"
      description="Use the information panels and historical data to reflect on past performance, identify patterns, and improve future decisions."
    >
      <Box>
        {/* Correct Label matching your existing content */}
        <Typography 
          variant="h6" 
          sx={{ fontWeight: 700, color: '#111827', mb: 2, fontSize: '1.25rem' }}
        >
          Historical Data and Trend Analysis
        </Typography>

        {/* 2-Column Grid for side-by-side data analysis views */}
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Box 
              sx={{ 
                p: 1.5, bgcolor: '#f9fafb', border: '1px solid #e5e7eb', 
                borderRadius: '20px'
              }}
            >
              <Box 
                component="img" 
                src={imgInfoDesk1} 
                alt="Historical Data View 1" 
                sx={{ width: '100%', borderRadius: '12px', display: 'block' }} 
              />
            </Box>
          </Grid>

          <Grid item xs={12} md={6}>
            <Box 
              sx={{ 
                p: 1.5, bgcolor: '#f9fafb', border: '1px solid #e5e7eb', 
                borderRadius: '20px'
              }}
            >
              <Box 
                component="img" 
                src={imgInfoDesk2} 
                alt="Historical Data View 2" 
                sx={{ width: '100%', borderRadius: '12px', display: 'block' }} 
              />
            </Box>
          </Grid>
        </Grid>
      </Box>
    </BaseStep>
  );
};

export default Step7Hist;