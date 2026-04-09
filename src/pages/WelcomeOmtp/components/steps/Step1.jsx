// ==========================================
// Component: Walkthrough Step 1 (Refactored)
// ==========================================

import React from 'react';
import { Box, Typography } from '@mui/material';
import BaseStep from './BaseStep'; // Using our new template
import imgDashboard from '../../../../assets/DemoPicture/Dashboard.jpg';

const Step1 = () => {
  return (
    <BaseStep 
      number="1"
      title="Start from the Dashboard"
      description="Begin from the main dashboard to access the key financial views and understand the overall state of the business before going deeper."
    >
      {/* Content Area */}
      <Box>
        {/* Label styled to match the screenshot's specific font-weight */}
        <Typography 
          variant="h5" 
          sx={{ 
            fontWeight: 700, 
            color: '#111827', 
            mb: 2,
            fontSize: '1.5rem' 
          }}
        >
          Main Dashboard
        </Typography>
        
        {/* Image Container with the "Inner Frame" look */}
        <Box 
          sx={{ 
            p: 1.5, 
            bgcolor: '#f9fafb', 
            border: '1px solid #e5e7eb', 
            borderRadius: '16px',
            boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.02)' 
          }}
        >
          <Box 
            component="img" 
            src={imgDashboard} 
            alt="Main Dashboard" 
            sx={{ 
              width: '100%', 
              borderRadius: '10px', 
              display: 'block' 
            }} 
          />
        </Box>
      </Box>
    </BaseStep>
  );
};

export default Step1;