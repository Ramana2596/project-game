// ==========================================
// Component: Walkthrough Step 1 (Variant-driven)
// ==========================================

import React from 'react';
import { Box, Typography } from '@mui/material';
import BaseStep from './BaseStep';
import imgDashboard from '../../../../assets/DemoPicture/Dashboard.jpg';
import { colors } from '../../../../ux/styles';

const Step1 = () => {
  return (
    <BaseStep 
      number="1"
      title="Start from the Dashboard"
      description="Begin from the main dashboard to access the key financial views and understand the overall state of the business before going deeper."
    >
      <Box>
        {/* Slimmer Label */}
        <Typography 
          variant="subtitle1" 
          sx={{ fontWeight: 700, color: colors.title || '#1F2D3D', mb: 1 }}
        >
          Main Dashboard
        </Typography>
        
        {/* Compact Image Frame */}
        <Box 
          sx={{ 
            p: 1, 
            bgcolor: colors.background?.default || '#f9fafb', 
            border: `1px solid ${colors.border || '#E6E0F4'}`, 
            borderRadius: '12px',
            boxShadow: 'inset 0 1px 3px rgba(0,0,0,0.02)' 
          }}
        >
          <Box 
            component="img" 
            src={imgDashboard} 
            alt="Main Dashboard Preview Layout" 
            sx={{ width: '100%', borderRadius: '8px', display: 'block' }} 
          />
        </Box>
      </Box>
    </BaseStep>
  );
};

export default Step1;
