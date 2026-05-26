// ==========================================
// Component: Walkthrough Step 1 (Compact)
// ==========================================

import React from 'react';
import { Box, Typography } from '@mui/material';
import BaseStep from './BaseStep';
import imgDashboard from '../../../../assets/DemoPicture/Dashboard.jpg';

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
          sx={{ 
            fontWeight: 700, 
            color: '#111827', 
            mb: 1,
            fontSize: '1.1rem' 
          }}
        >
          Main Dashboard
        </Typography>
        
        {/* Compact Image Frame */}
        <Box 
          sx={{ 
            p: 1, 
            bgcolor: '#f9fafb', 
            border: '1px solid #e5e7eb', 
            borderRadius: '12px',
            boxShadow: 'inset 0 1px 3px rgba(0,0,0,0.02)' 
          }}
        >
          <Box 
            component="img" 
            src={imgDashboard} 
            alt="Main Dashboard" 
            sx={{ 
              width: '100%', 
              borderRadius: '8px', 
              display: 'block' 
            }} 
          />
        </Box>
      </Box>
    </BaseStep>
  );
};

export default Step1;
