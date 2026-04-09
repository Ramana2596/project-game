// ==========================================
// Component: Walkthrough Step 4 (Refactored)
// ==========================================

import React from 'react';
import { Box, Typography, Grid } from '@mui/material';
import BaseStep from './BaseStep';
import imgOpsPlanMatl from '../../../../assets/DemoPicture/OpsPlanMatl.jpg';
import imgOpsPlanProduct from '../../../../assets/DemoPicture/OpsPlanProduct.jpg';

const Step4 = () => {
  return (
    <BaseStep 
      number="4"
      title="Make Operational Decisions"
      description="Input the monthly forecast, production plan, sales plan, and materials choices. This is where learners turn strategy into operational action."
    >
      {/* 2-Column Grid for side-by-side input screens */}
      <Grid container spacing={4}>
        
        {/* Left Column: Forecast & Sales Plan */}
        <Grid item xs={12} md={6}>
          <Typography 
            variant="h6" 
            sx={{ fontWeight: 700, color: '#111827', mb: 2, fontSize: '1.15rem', minHeight: '3.5rem' }}
          >
            Operational decisions input screen - Monthly forecast, production and Sales plan
          </Typography>
          <Box 
            sx={{ 
              p: 1.5, bgcolor: '#f9fafb', border: '1px solid #e5e7eb', 
              borderRadius: '20px'
            }}
          >
            <Box 
              component="img" 
              src={imgOpsPlanProduct} 
              alt="Operational Plan Product" 
              sx={{ width: '100%', borderRadius: '12px', display: 'block' }} 
            />
          </Box>
        </Grid>

        {/* Right Column: Materials Decisions */}
        <Grid item xs={12} md={6}>
          <Typography 
            variant="h6" 
            sx={{ fontWeight: 700, color: '#111827', mb: 2, fontSize: '1.15rem', minHeight: '3.5rem' }}
          >
            Operational Decision input screen- Materials
          </Typography>
          <Box 
            sx={{ 
              p: 1.5, bgcolor: '#f9fafb', border: '1px solid #e5e7eb', 
              borderRadius: '20px'
            }}
          >
            <Box 
              component="img" 
              src={imgOpsPlanMatl} 
              alt="Operational Plan Materials" 
              sx={{ width: '100%', borderRadius: '12px', display: 'block' }} 
            />
          </Box>
        </Grid>

      </Grid>
    </BaseStep>
  );
};

export default Step4;