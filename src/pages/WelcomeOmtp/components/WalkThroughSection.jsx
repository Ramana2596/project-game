// ==========================================
// Component: Walkthrough Section Container (Variant-driven)
// ==========================================

import React from 'react';
import { Box, Typography, Container, Stack } from '@mui/material';
import { colors } from '../../../ux/styles';

// Demo Steps - Screenshots Component (Individual modules)
import Step1 from './steps/Step1';
import Step2 from './steps/Step2';
import Step3 from './steps/Step3';
import Step4 from './steps/Step4';
import Step5 from './steps/Step5';
import Step6 from './steps/Step6';
import Step7 from './steps/Step7'; 

const WalkThroughSection = () => {
  return (
    <Box 
      id="how-it-works" 
      component="section" 
      sx={{ 
        py: { xs: 8, md: 10 }, 
        bgcolor: colors.background?.panel || '#F8F5FF'
      }}
    >
      <Container maxWidth="lg">
        {/* Section Header */}
        <Box sx={{ mb: 6 }}>
          <Typography 
            variant="h4" 
            sx={{ 
              fontWeight: 600, 
              color: colors.title || '#1F2D3D', 
              mb: 2,
              lineHeight: 1.3,
              letterSpacing: '-0.02em'
            }}
          >
            OMTP: A 7-step guided walkthrough
          </Typography>
          <Typography 
            variant="body1" 
            sx={{ 
              color: colors.body || '#546E7A', 
              maxWidth: '650px', 
              lineHeight: 1.6
            }}
          >
            Follow our structured simulation journey to master operations management, 
            from initial setup to high-level strategic decision-making.
          </Typography>
        </Box>

        {/* Sequential Steps */}
        <Stack spacing={4}>
          <Step1 />
          <Step2 />
          <Step3 />
          <Step4 />
          <Step5 />
          <Step6 />
          <Step7 />
        </Stack>
      </Container>
    </Box>
  );
};

export default WalkThroughSection;
