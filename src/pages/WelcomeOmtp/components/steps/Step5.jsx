// ==========================================
// Component: Walkthrough Step 5 (Refactored)
// ==========================================

import React from 'react';
import { Box, Typography, Grid } from '@mui/material';
import BaseStep from './BaseStep';
import imgOpsPlan from '../../../../assets/DemoPicture/OpsPlan.jpg';
import imgSimComplete from '../../../../assets/DemoPicture/SimComplete.jpg';

const Step5 = () => {
  return (
    <BaseStep 
      number="5"
      title="Run the Monthly Simulation"
      description="Execute the month's operations decisions and track simulation progress. Learners experience how their choices play out over time."
    >
      {/* 2-Column Grid for the execution and completion views */}
      <Grid container spacing={4}>
        
        {/* Left Column: Execution View */}
        <Grid item xs={12} md={6}>
          <Typography 
            variant="h6" 
            sx={{ fontWeight: 700, color: '#111827', mb: 2, fontSize: '1.15rem' }}
          >
            Operations decisions for the month
          </Typography>
          <Box 
            sx={{ 
              p: 1.5, bgcolor: '#f9fafb', border: '1px solid #e5e7eb', 
              borderRadius: '20px'
            }}
          >
            <Box 
              component="img" 
              src={imgOpsPlan} 
              alt="Operations Decisions" 
              sx={{ width: '100%', borderRadius: '12px', display: 'block' }} 
            />
          </Box>
        </Grid>

        {/* Right Column: Progress/Completion View */}
        <Grid item xs={12} md={6}>
          <Typography 
            variant="h6" 
            sx={{ fontWeight: 700, color: '#111827', mb: 2, fontSize: '1.15rem' }}
          >
            4 months of Simulation completed
          </Typography>
          <Box 
            sx={{ 
              p: 1.5, bgcolor: '#f9fafb', border: '1px solid #e5e7eb', 
              borderRadius: '20px'
            }}
          >
            <Box 
              component="img" 
              src={imgSimComplete} 
              alt="Simulation Complete" 
              sx={{ width: '100%', borderRadius: '12px', display: 'block' }} 
            />
          </Box>
        </Grid>

      </Grid>
    </BaseStep>
  );
};

export default Step5;