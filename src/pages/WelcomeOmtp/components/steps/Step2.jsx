// ==========================================
// Component: Walkthrough Step 2 (Variant-driven)
// ==========================================

import React from 'react';
import { Box, Typography, Grid } from '@mui/material';
import BaseStep from './BaseStep';
import imgStrategyDraft from '../../../../assets/DemoPicture/StrategyDraft.jpg';
import imgStrategicPlan from '../../../../assets/DemoPicture/StrategicPlan.jpg';
import { colors } from '../../../../ux/styles';

const Step2 = () => {
  return (
    <BaseStep 
      number="2"
      title="Choose Your Strategy"
      description="Review the strategies available to the team and confirm the strategy chosen. This sets the direction for how the business will compete and grow."
    >
      <Grid container spacing={2}>
        
        {/* Left Column */}
        <Grid item xs={12} md={6}>
          <Typography 
            variant="subtitle1" 
            sx={{ fontWeight: 700, color: colors.title || '#1F2D3D', mb: 1 }}
          >
            Strategies available for the team to choose
          </Typography>
          <Box 
            sx={{ 
              p: 1, 
              bgcolor: colors.background?.default || '#f9fafb', 
              border: `1px solid ${colors.border || '#E6E0F4'}`, 
              borderRadius: '12px', 
              overflow: 'hidden' 
            }}
          >
            <Box 
              component="img" 
              src={imgStrategyDraft} 
              alt="Available Strategies Panel" 
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
            Strategies chosen by the team
          </Typography>
          <Box 
            sx={{ 
              p: 1, 
              bgcolor: colors.background?.default || '#f9fafb', 
              border: `1px solid ${colors.border || '#E6E0F4'}`, 
              borderRadius: '12px', 
              overflow: 'hidden' 
            }}
          >
            <Box 
              component="img" 
              src={imgStrategicPlan} 
              alt="Selected Strategic Plan Panel" 
              sx={{ width: '100%', borderRadius: '8px', display: 'block' }} 
            />
          </Box>
        </Grid>

      </Grid>
    </BaseStep>
  );
};

export default Step2;
