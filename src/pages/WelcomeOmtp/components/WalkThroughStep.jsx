import React from 'react';
import { Box, Typography, Grid } from '@mui/material';

const WalkThroughStep = ({ number, title, description, images = [], labels = [] }) => (
  <Box 
    sx={{ 
      mb: 6, p: { xs: 2, md: 4 }, bgcolor: '#ffffff', 
      borderRadius: '24px', border: '1px solid #f3f4f6',
      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)'
    }}
  >
    <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2, mb: 4 }}>
      <Box sx={{ 
        minWidth: 40, height: 40, bgcolor: '#7c3aed', color: 'white', 
        borderRadius: '12px', display: 'flex', alignItems: 'center', 
        justifyContent: 'center', fontWeight: 'bold' 
      }}>
        {number}
      </Box>
      <Box>
        <Typography variant="h5" sx={{ fontWeight: 800, color: '#111827', mb: 1 }}>{title}</Typography>
        <Typography variant="body1" sx={{ color: '#4b5563', maxWidth: '750px' }}>{description}</Typography>
      </Box>
    </Box>

    <Grid container spacing={2}>
      {images.map((img, index) => (
        <Grid item xs={12} md={images.length > 1 ? 6 : 12} key={index}>
          <Box sx={{ bgcolor: '#f9faff', p: 2, borderRadius: '16px', border: '1px solid #f3f4f6' }}>
            {labels[index] && (
              <Typography variant="subtitle2" sx={{ mb: 1.5, color: '#6b7280', fontWeight: 600 }}>
                {labels[index]}
              </Typography>
            )}
            <Box component="img" src={img} sx={{ width: '100%', borderRadius: '8px', display: 'block' }} />
          </Box>
        </Grid>
      ))}
    </Grid>
  </Box>
);

export default WalkThroughStep;