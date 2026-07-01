// ============================================================
// Component: Base Step Card Template (Variant-driven)
// ============================================================

import React from 'react';
import { Box, Typography } from '@mui/material';
import { colors } from '../../../../ux/styles';

const BaseStep = ({ number, title, description, children }) => {
  return (
    <Box 
      sx={{ 
        bgcolor: colors.card || '#ffffff', 
        borderRadius: '24px',   
        p: { xs: 3, md: 4 },    
        mb: 4,                  
        boxShadow: `0 6px 20px ${colors.shadowColor || 'rgba(103,58,183,0.05)'}`,
        border: `1px solid ${colors.border || '#E6E0F4'}`
      }}
    >
      {/* Header Area */}
      <Box sx={{ display: 'flex', alignItems: 'flex-start', mb: 3, gap: 2 }}>
        
        {/* Step Number Badge */}
        <Box 
          sx={{ 
            minWidth: '44px', height: '44px', 
            bgcolor: colors.primary || '#673AB7', 
            color: colors.white || '#ffffff', 
            borderRadius: '50%', display: 'flex', 
            alignItems: 'center', justifyContent: 'center',
            fontWeight: 800,
            boxShadow: `0 6px 12px ${colors.shadowColor || 'rgba(103,58,183,0.25)'}`
          }}
        >
          {number}
        </Box>

        {/* Header Text Block */}
        <Box>
          <Typography 
            variant="h5" 
            component="h2" 
            sx={{ fontWeight: 600, color: colors.title || '#1F2D3D', mb: 0.5 }}
          >
            {title}
          </Typography>
          <Typography 
            variant="body2" 
            component="p" 
            sx={{ color: colors.body || '#546E7A', lineHeight: 1.5, maxWidth: '700px' }}
          >
            {description}
          </Typography>
        </Box>
      </Box>

      {/* Children Content Area */}
      <Box sx={{ mt: 2 }}>
        {children}
      </Box>
    </Box>
  );
};

export default BaseStep;
