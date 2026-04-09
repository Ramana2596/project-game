// ==========================================
// Component: Base Step Card Template
// ==========================================

import React from 'react';
import { Box, Typography, Grid } from '@mui/material';

const BaseStep = ({ number, title, description, children }) => {
  return (
    // The main Step Card with soft styling
    <Box 
      sx={{ 
        bgcolor: '#ffffff', 
        borderRadius: '32px', 
        p: { xs: 4, md: 6 }, 
        mb: 6,
        boxShadow: '0 10px 30px rgba(124, 58, 237, 0.05)', // Subtle purple glow
        border: '1px solid #f3f4f6'
      }}
    >
      {/* Header Area: Number and Title */}
      <Box sx={{ display: 'flex', alignItems: 'flex-start', mb: 4, gap: 3 }}>
        {/* Glowing Step Number Indicator */}
        <Box 
          sx={{ 
            minWidth: '50px', height: '50px', 
            bgcolor: '#7C3AED', color: '#fff', 
            borderRadius: '50%', display: 'flex', 
            alignItems: 'center', justifyContent: 'center',
            fontWeight: 'bold', fontSize: '1.25rem',
            boxShadow: '0 8px 16px rgba(124, 58, 237, 0.3)'
          }}
        >
          {number}
        </Box>

        <Box>
          <Typography variant="h4" component="h2" sx={{ fontWeight: 800, color: '#111827', mb: 1 }}>
            {title}
          </Typography>
          <Typography variant="body1" component="p" sx={{ color: '#4b5563', lineHeight: 1.6, maxWidth: '800px' }}>
            {description}
          </Typography>
        </Box>
      </Box>

      {/* Content Area: Where the images go */}
      <Box sx={{ mt: 4 }}>
        {children}
      </Box>
    </Box>
  );
};

export default BaseStep;