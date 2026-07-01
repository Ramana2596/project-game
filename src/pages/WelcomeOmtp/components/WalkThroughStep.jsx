// ==========================================
// Component: Unified Dynamic WalkThroughStep (Variant-driven)
// ==========================================

import React from 'react';
import { Box, Typography, Grid } from '@mui/material';
import { colors } from '../../../../ux/styles';

const WalkThroughStep = ({ number, title, description, images = [], labels = [] }) => (
  <Box 
    sx={{ 
      mb: 6, 
      p: { xs: 2, md: 4 }, 
      bgcolor: colors.card || '#ffffff', 
      borderRadius: '24px', 
      border: `1px solid ${colors.border || '#E6E0F4'}`,
      boxShadow: `0 4px 6px -1px ${colors.shadowColor || 'rgba(0, 0, 0, 0.05)'}`
    }}
  >
    {/* Step Info Row */}
    <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2, mb: 3 }}>
      {/* Dynamic Badge Box */}
      <Box 
        sx={{ 
          minWidth: 40, 
          height: 40, 
          bgcolor: colors.primary || '#673AB7', 
          color: colors.white || '#ffffff', 
          borderRadius: '12px', 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center', 
          fontWeight: 800 
        }}
      >
        {number}
      </Box>
      <Box>
        <Typography 
          variant="h5" 
          sx={{ fontWeight: 500, color: colors.title || '#1F2D3D', mb: 1 }}
        >
          {title}
        </Typography>
        <Typography 
          variant="body1" 
          sx={{ color: colors.body || '#546E7A', maxWidth: '700px', lineHeight: 1.5 }}
        >
          {description}
        </Typography>
      </Box>
    </Box>

    {/* Responsive Media Engine Mapping */}
    <Grid container spacing={2}>
      {images.map((img, index) => (
        <Grid item xs={12} md={images.length > 1 ? 6 : 12} key={index}>
          <Box 
            sx={{ 
              bgcolor: colors.background?.default || '#f9faff', 
              p: 1.5, 
              borderRadius: '12px', 
              border: `1px solid ${colors.border || '#E6E0F4'}`, 
              display: 'flex', 
              flexDirection: 'column',
              alignItems: 'flex-start', 
              maxWidth: '500px', 
              mx: 'auto'
            }}
          >
            {labels[index] && (
              <Typography 
                variant="subtitle2" 
                sx={{ mb: 1, color: colors.body || '#6b7280', fontWeight: 600 }}
              >
                {labels[index]}
              </Typography>
            )}
            <Box 
              component="img" 
              src={img} 
              sx={{ width: '100%', height: 'auto', borderRadius: '8px', display: 'block' }} 
              alt={labels[index] || `Step ${number} visual`} 
            />
          </Box>
        </Grid>
      ))}
    </Grid>
  </Box>
);

export default WalkThroughStep;
