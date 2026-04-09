import React from 'react';
import { Box, Typography, Grid } from '@mui/material';
import imgInfoDesk1 from '../../../assets/DemoPicture/InfoDesk1.jpg';
import imgInfoDesk2 from '../../../assets/DemoPicture/InfoDesk2.jpg';

const InfoDeskView = () => (
  <Box sx={{ mt: 4, mb: 8 }}>
    <Grid container spacing={2}>
      <Grid item xs={12} md={6}>
        <Box sx={{ bgcolor: '#f9faff', p: 2, borderRadius: '16px', border: '1px solid #f3f4f6' }}>
          <Typography variant="subtitle2" sx={{ mb: 1.5, color: '#6b7280', fontWeight: 600 }}>
            Information Panel 1 of Historical Data
          </Typography>
          <Box component="img" src={imgInfoDesk1} sx={{ width: '100%', borderRadius: '8px' }} />
        </Box>
      </Grid>
      <Grid item xs={12} md={6}>
        <Box sx={{ bgcolor: '#f9faff', p: 2, borderRadius: '16px', border: '1px solid #f3f4f6' }}>
          <Typography variant="subtitle2" sx={{ mb: 1.5, color: '#6b7280', fontWeight: 600 }}>
            Information Panel 2 of Historical data
          </Typography>
          <Box component="img" src={imgInfoDesk2} sx={{ width: '100%', borderRadius: '8px' }} />
        </Box>
      </Grid>
    </Grid>
  </Box>
);

export default InfoDeskView;