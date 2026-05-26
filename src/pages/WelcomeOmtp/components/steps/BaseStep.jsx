// ==========================================
// Component: Base Step Card Template (Compact)
// ==========================================

import React from 'react';
import { Box, Typography } from '@mui/material';

const BaseStep = ({ number, title, description, children }) => {
  return (
    <Box 
      sx={{ 
        bgcolor: '#ffffff', 
        borderRadius: '24px',   // reduced radius
        p: { xs: 3, md: 4 },    // tighter padding
        mb: 4,                  // reduced margin below
        boxShadow: '0 6px 20px rgba(124, 58, 237, 0.05)',
        border: '1px solid #f3f4f6'
      }}
    >
      {/* Header Area */}
      <Box sx={{ display: 'flex', alignItems: 'flex-start', mb: 3, gap: 2 }}>
        {/* Step Number */}
        <Box 
          sx={{ 
            minWidth: '44px', height: '44px', 
            bgcolor: '#7C3AED', color: '#fff', 
            borderRadius: '50%', display: 'flex', 
            alignItems: 'center', justifyContent: 'center',
            fontWeight: 'bold', fontSize: '1.1rem',
            boxShadow: '0 6px 12px rgba(124, 58, 237, 0.25)'
          }}
        >
          {number}
        </Box>

        <Box>
          <Typography variant="h5" component="h2" sx={{ fontWeight: 800, color: '#111827', mb: 0.5 }}>
            {title}
          </Typography>
          <Typography variant="body2" component="p" sx={{ color: '#4b5563', lineHeight: 1.5, maxWidth: '700px' }}>
            {description}
          </Typography>
        </Box>
      </Box>

      {/* Content Area */}
      <Box sx={{ mt: 2 }}>
        {children}
      </Box>
    </Box>
  );
};

export default BaseStep;
