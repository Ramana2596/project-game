// ==========================================
// Component: Walkthrough Step 5 (Variant-driven)
// ==========================================

import React from 'react';
import { Box, Typography, Grid } from '@mui/material';
import BaseStep from './BaseStep';
import imgOpsPlan from '../../../../assets/DemoPicture/OpsPlan.jpg';
import imgSimComplete from '../../../../assets/DemoPicture/SimComplete.jpg';
import { colors } from '../../../../ux/styles';

const Step5 = () => {
  return (
    <BaseStep 
      number="5"
      title="Run the Monthly Simulation"
      description="Execute the month's operations decisions and track simulation progress. Learners experience how their choices play out over time."
    >
      <Grid container spacing={2}>
        
        {/* Left Column */}
        <Grid item xs={12} md={6}>
          <Typography 
            variant="subtitle1" 
            sx={{ fontWeight: 700, color: colors.title || '#1F2D3D', mb: 1 }}
          >
            Operations decision for each month
          </Typography>
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
              src={imgOpsPlan} 
              alt="Operations Decisions Panel" 
              sx={{ width: '100%', borderRadius: '8px', display: 'block' }} 
            />
          </Box>
        </Grid>

        {/* Right Column */}
        <Grid item xs={12} md={6}>
          <Typography 
            variant="subtitle1" 
            sx={{ fontWeight: 700, color: colors.title || '#1F2D3D', mb: 1 }}
          >
            4 months of Simulation completed
          </Typography>
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
              src={imgSimComplete} 
              alt="Simulation Complete Progress Panel" 
              sx={{ width: '100%', borderRadius: '8px', display: 'block' }} 
            />
          </Box>
        </Grid>

      </Grid>
    </BaseStep>
  );
};

export default Step5;
