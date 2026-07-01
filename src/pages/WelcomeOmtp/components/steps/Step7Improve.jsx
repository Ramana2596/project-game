// ==========================================
// Component: Walkthrough Step 7 (Continuous Improvement - Variant-driven)
// ==========================================

import React from 'react';
import { Box, Typography } from '@mui/material';
import BaseStep from './BaseStep';
import imgImprovement from '../../../../assets/DemoPicture/Dashboard.jpg';
import { colors } from '../../../../ux/styles';

const Step7Improve = () => {
  return (
    <BaseStep 
      number="7"
      title="Continuous Improvement"
      description="Use the insights gained from the financial outcomes to refine your strategy and operational plans for the next cycle."
    >
      <Box>
        {/* Slimmer Label */}
        <Typography 
          variant="subtitle1" 
          sx={{ fontWeight: 700, color: colors.title || '#1F2D3D', mb: 1 }}
        >
          Cycle back for improvement
        </Typography>

        {/* Compact Frame */}
        <Box 
          sx={{ 
            p: 1, 
            bgcolor: colors.background?.default || '#f9fafb', 
            border: `1px solid ${colors.border || '#E6E0F4'}`, 
            borderRadius: '12px',
            boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
          }}
        >
          <Box 
            component="img" 
            src={imgImprovement} 
            alt="Dashboard for Continuous Improvement" 
            sx={{ width: '100%', borderRadius: '8px', display: 'block' }} 
          />
        </Box>
      </Box>
    </BaseStep>
  );
};

export default Step7Improve;
