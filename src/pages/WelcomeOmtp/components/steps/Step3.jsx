// ==========================================
// Component: Walkthrough Step 3 (Variant-driven)
// ==========================================

import React from 'react';
import { Box, Typography } from '@mui/material';
import BaseStep from './BaseStep';
import imgMktIntelligence from '../../../../assets/DemoPicture/MktIntelligence.jpg';
import { colors } from '../../../../ux/styles';

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
          sx={{ fontWeight: 700, color: colors.title || '#1F2D3D', mb: 1 }}
        >
          Market demand and Material Prices – Market intelligence
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
            src={imgMktIntelligence} 
            alt="Market Intelligence Dashboard" 
            sx={{ width: '100%', borderRadius: '8px', display: 'block' }} 
          />
        </Box>
      </Box>
    </BaseStep>
  );
};

export default Step3;
