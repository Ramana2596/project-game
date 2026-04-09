// ==========================================
// Component: Walkthrough Step 2 (Refactored)
// ==========================================

import React from 'react';
import { Box, Typography, Grid } from '@mui/material';
import BaseStep from './BaseStep';
import imgStrategyDraft from '../../../../assets/DemoPicture/StrategyDraft.jpg';
import imgStrategicPlan from '../../../../assets/DemoPicture/StrategicPlan.jpg';

const Step2 = () => {
  return (
    <BaseStep 
      number="2"
      title="Choose Your Strategy"
      description="Review the strategies available to the team and confirm the strategy chosen. This sets the direction for how the business will compete and grow."
    >
      {/* Grid container to hold the side-by-side strategy views */}
      <Grid container spacing={4}>
        
        {/* Left Column: Available Strategies */}
        <Grid item xs={12} md={6}>
          <Typography 
            variant="h6" 
            sx={{ fontWeight: 700, color: '#111827', mb: 2, fontSize: '1.2rem' }}
          >
            Strategies available for the team to chose
          </Typography>
          <Box 
            sx={{ 
              p: 1.5, bgcolor: '#f9fafb', border: '1px solid #e5e7eb', 
              borderRadius: '20px', overflow: 'hidden' 
            }}
          >
            <Box 
              component="img" 
              src={imgStrategyDraft} 
              alt="Strategy Draft" 
              sx={{ width: '100%', borderRadius: '12px', display: 'block' }} 
            />
          </Box>
        </Grid>

        {/* Right Column: Chosen Strategy */}
        <Grid item xs={12} md={6}>
          <Typography 
            variant="h6" 
            sx={{ fontWeight: 700, color: '#111827', mb: 2, fontSize: '1.2rem' }}
          >
            Strategies Chosen by the team
          </Typography>
          <Box 
            sx={{ 
              p: 1.5, bgcolor: '#f9fafb', border: '1px solid #e5e7eb', 
              borderRadius: '20px', overflow: 'hidden' 
            }}
          >
            <Box 
              component="img" 
              src={imgStrategicPlan} 
              alt="Strategic Plan" 
              sx={{ width: '100%', borderRadius: '12px', display: 'block' }} 
            />
          </Box>
        </Grid>

      </Grid>
    </BaseStep>
  );
};

export default Step2;