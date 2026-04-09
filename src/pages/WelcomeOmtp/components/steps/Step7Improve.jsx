// ==========================================
// Component: Walkthrough Step 7 (Continuous Improvement)
// ==========================================

import React from 'react';
import { Box, Typography } from '@mui/material';
import BaseStep from './BaseStep';
import imgImprovement from '../../../../assets/DemoPicture/Dashboard.jpg';

const Step7Improve = () => {
  return (
    <BaseStep 
      number="7"
      title="Continuous Improvement"
      description="Use the insights gained from the financial outcomes to refine your strategy and operational plans for the next cycle."
    >
      <Box>
        {/* Standardized Heading for the Cycle Label */}
        <Typography 
          variant="h6" 
          sx={{ fontWeight: 700, color: '#111827', mb: 2, fontSize: '1.25rem' }}
        >
          Cycle back for improvement
        </Typography>

        {/* The Frame: Consistent with Step 1 and Step 3 */}
        <Box 
          sx={{ 
            p: 1.5, 
            bgcolor: '#f9fafb', 
            border: '1px solid #e5e7eb', 
            borderRadius: '20px',
            boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.02)'
          }}
        >
          <Box 
            component="img" 
            src={imgImprovement} 
            alt="Dashboard for Continuous Improvement" 
            sx={{ width: '100%', borderRadius: '12px', display: 'block' }} 
          />
        </Box>
      </Box>
    </BaseStep>
  );
};

export default Step7Improve;