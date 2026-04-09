// ==========================================
// Component: Walkthrough Section Container
// ==========================================

import React from 'react';
import { Box, Typography, Container, Stack } from '@mui/material';

// ✅ Steps Component Imports (Individual journey modules)
import Step1 from './steps/Step1';
import Step2 from './steps/Step2';
import Step3 from './steps/Step3';
import Step4 from './steps/Step4';
import Step5 from './steps/Step5';
import Step6 from './steps/Step6';
import Step7 from './steps/Step7'; 

const WalkThroughSection = () => {
  return (
    // ✅ Main section wrapper with background color and vertical padding
    <Box 
      id="how-it-works" 
      component="section" 
      sx={{ 
        py: { xs: 8, md: 12 }, 
        bgcolor: '#fcfaff' // Subtle tint to differentiate walkthrough zone
      }}
    >
      <Container maxWidth="lg">
        {/* ✅ Section Header: Left-aligned Title and Description */}
        <Box sx={{ mb: 10 }}>
          <Typography 
            variant="h3" 
            sx={{ 
              fontWeight: 900, 
              color: '#111827', 
              mb: 2,
              letterSpacing: '-0.02em',
              fontSize: { xs: '2.25rem', md: '3rem' } 
            }}
          >
            How OMTP works — a 7-step guided walkthrough
          </Typography>
          <Typography 
            variant="body1" 
            sx={{ 
              color: '#4b5563', 
              maxWidth: '750px', 
              fontSize: '1.15rem',
              lineHeight: 1.6
            }}
          >
            Follow our structured simulation journey to master operations management, 
            from initial setup to high-level strategic decision-making.
          </Typography>
        </Box>

        {/* ✅ Vertical stack for sequential step rendering with standardized spacing */}
        <Stack spacing={12}>
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