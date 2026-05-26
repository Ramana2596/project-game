// ==========================================
// Component: Walkthrough Step 3 (Compact)
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
          Market demand and Material Prices – Market intelligence
        </Typography>
        
        {/* Compact Image Frame */}
        <Box 
          sx={{ 
            p: 1, 
            bgcolor: '#f9fafb', 
            border: '1px solid #e5e7eb', 
            borderRadius: '12px',
            boxShadow: 'inset 0 1px 2px rgba(0,0,0,0.02)'
          }}
        >
          <Box 
            component="img" 
            src={imgMktIntelligence} 
            alt="Market Intelligence Dashboard" 
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

export default Step3;
