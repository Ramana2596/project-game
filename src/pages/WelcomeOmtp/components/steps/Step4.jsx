// ==========================================
// Component: Walkthrough Step 4 (Compact)
// ==========================================

import React from 'react';
import { Box, Typography, Grid } from '@mui/material';
import BaseStep from './BaseStep';
import imgOpsPlanMatl from '../../../../assets/DemoPicture/OpsPlanMatl.jpg';
import imgOpsPlanProduct from '../../../../assets/DemoPicture/OpsPlanProduct.jpg';

const Step4 = () => {
  return (
    <BaseStep 
      number="4"
      title="Make Operational Decisions"
      description="Input the monthly forecast, production plan, sales plan, and materials choices. This is where learners turn strategy into operational action."
    >
      <Grid container spacing={2}>
        
        {/* Left Column */}
        <Grid item xs={12} md={6}>
          <Typography 
            variant="subtitle1" 
            sx={{ fontWeight: 700, color: '#111827', mb: 1, fontSize: '1.05rem' }}
          >
            Operational decisions input – Monthly forecast, production and sales plan
          </Typography>
          <Box 
            sx={{ 
              p: 1, bgcolor: '#f9fafb', border: '1px solid #e5e7eb', 
              borderRadius: '12px'
            }}
          >
            <Box 
              component="img" 
              src={imgOpsPlanProduct} 
              alt="Operational Plan Product" 
              sx={{ width: '100%', borderRadius: '8px', display: 'block' }} 
            />
          </Box>
        </Grid>

        {/* Right Column */}
        <Grid item xs={12} md={6}>
          <Typography 
            variant="subtitle1" 
            sx={{ fontWeight: 700, color: '#111827', mb: 1, fontSize: '1.05rem' }}
          >
            Operational decisions input – Materials
          </Typography>
          <Box 
            sx={{ 
              p: 1, bgcolor: '#f9fafb', border: '1px solid #e5e7eb', 
              borderRadius: '12px'
            }}
          >
            <Box 
              component="img" 
              src={imgOpsPlanMatl} 
              alt="Operational Plan Materials" 
              sx={{ width: '100%', borderRadius: '8px', display: 'block' }} 
            />
          </Box>
        </Grid>

      </Grid>
    </BaseStep>
  );
};

export default Step4;
