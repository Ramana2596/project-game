import React from 'react';
import { Box, Typography, Grid } from '@mui/material';
import imgInfoDesk1 from '../../../assets/DemoPicture/InfoDesk1.jpg';
import imgInfoDesk2 from '../../../assets/DemoPicture/InfoDesk2.jpg';

const InfoDeskView = () => (
  <Box sx={{ mt: 2, mb: 4 }}>
    <Grid container spacing={1.5}>
      <Grid item xs={12} md={6}>
        <Box sx={{ bgcolor: '#f9faff', p: 1.5, borderRadius: '12px', border: '1px solid #f3f4f6' }}>
          <Typography variant="subtitle2" sx={{ mb: 1, color: '#6b7280', fontWeight: 600 }}>
            Information Panel 1 of Historical Data
          </Typography>
          <Box component="img" src={imgInfoDesk1} sx={{ width: '100%', borderRadius: '6px' }} />
        </Box>
      </Grid>
      <Grid item xs={12} md={6}>
        <Box sx={{ bgcolor: '#f9faff', p: 1.5, borderRadius: '12px', border: '1px solid #f3f4f6' }}>
          <Typography variant="subtitle2" sx={{ mb: 1, color: '#6b7280', fontWeight: 600 }}>
            Information Panel 2 of Historical Data
          </Typography>
          <Box component="img" src={imgInfoDesk2} sx={{ width: '100%', borderRadius: '6px' }} />
        </Box>
      </Grid>
    </Grid>
  </Box>
);

export default InfoDeskView;
