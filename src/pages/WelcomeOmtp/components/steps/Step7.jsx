// ==========================================
// Component: Walkthrough Step 7 (Compact)
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
      <Box>
        {/* Slimmer Label */}
        <Typography 
          variant="subtitle1" 
          sx={{ 
            fontWeight: 700, 
            color: '#111827', 
            mb: 1,
            fontSize: '1.05rem' 
          }}
        >
          Cycle back for improvement
        </Typography>
        
        {/* Compact Image Frame */}
        <Box 
          sx={{ 
            p: 1, 
            bgcolor: '#f9fafb', 
            border: '1px solid #e5e7eb', 
            borderRadius: '12px',
            boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
          }}
        >
          <Box 
            component="img" 
            src={imgImprovement} 
            alt="Dashboard Review for Improvement" 
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

export default Step7;
