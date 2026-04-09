// ==========================================
// Component: Walkthrough Step 3 (Refactored)
// ==========================================

import React from 'react';
import { Box, Typography } from '@mui/material';
import BaseStep from './BaseStep';
import imgMktIntelligence from '../../../../assets/DemoPicture/MktIntelligence.jpg';

const Step3 = () => {
  return (
    <BaseStep 
      number="3"
      title="Study Market Intelligence"
      description="Understand market demand and material prices before making operational decisions. This helps connect business planning with changing market conditions."
    >
      {/* Content Area: Single detailed view */}
      <Box>
        {/* Sub-label matching the detailed descriptive style of your screenshot */}
        <Typography 
          variant="h6" 
          sx={{ 
            fontWeight: 700, 
            color: '#111827', 
            mb: 2,
            fontSize: '1.25rem' 
          }}
        >
          Market demand and Material Prices – Market intelligence
        </Typography>
        
        {/* Image Frame: Standardized padding and border for the screenshot */}
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
            src={imgMktIntelligence} 
            alt="Market Intelligence Dashboard" 
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

export default Step3;