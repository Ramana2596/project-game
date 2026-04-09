// ==========================================
// Component: Walkthrough Step 7 (Refactored)
// ==========================================

import React from 'react';
import { Box, Typography } from '@mui/material';
import BaseStep from './BaseStep';
import imgImprovement from '../../../../assets/DemoPicture/Dashboard.jpg';

const Step7 = () => {
  return (
    <BaseStep 
      number="7"
      title="Continuous Improvement"
      description="Use the insights gained from the financial outcomes to refine your strategy and operational plans for the next cycle. This iterative process is key to mastering operations management."
    >
      {/* Content Area */}
      <Box>
        {/* Label styled to match the specific font-weight and brand colors */}
        <Typography 
          variant="h6" 
          sx={{ 
            fontWeight: 700, 
            color: '#111827', 
            mb: 2,
            fontSize: '1.25rem' 
          }}
        >
          Cycle back for improvement
        </Typography>
        
        {/* The "Outer Frame" logic maintained from previous steps */}
        <Box 
          sx={{ 
            p: 1.5, 
            bgcolor: '#f9fafb', 
            border: '1px solid #e5e7eb', 
            borderRadius: '20px',
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)'
          }}
        >
          <Box 
            component="img" 
            src={imgImprovement} 
            alt="Dashboard Review for Improvement" 
            sx={{ 
              width: '100%', 
              borderRadius: '12px', 
              display: 'block' 
            }} 
          />
        </Box>
      </Box>
    </BaseStep>
  );
};

export default Step7;