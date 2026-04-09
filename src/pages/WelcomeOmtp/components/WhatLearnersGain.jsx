// ==========================================
// Component: What Learners Gain Section
// ==========================================

import React from 'react';
import { Box, Typography, Container, Grid, Stack } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import onlinestudyIcon from '../../../assets/navigation-menu/onlinestudy.png';

const GainItem = ({ text }) => (
  <Stack direction="row" spacing={1.5} sx={{ mb: 2, alignItems: 'flex-start' }}>
    <CheckCircleIcon sx={{ color: '#7c3aed', mt: 0.5, fontSize: '1.2rem' }} />
    <Typography variant="body1" sx={{ color: '#374151', fontWeight: 500, lineHeight: 1.5 }}>
      {text}
    </Typography>
  </Stack>
);

const WhatLearnersGain = () => {
  return (
    <Box component="section" sx={{ py: 12, bgcolor: '#ffffff' }}>
      <Container maxWidth="lg">
        <Grid container spacing={4} alignItems="center">
          
          {/* Visual Column - Matches the "Rounded Box" style from your screenshot */}
          <Grid item xs={12} md={6}>
            <Box 
              sx={{ 
                bgcolor: '#f5f3ff', // Light lavender background from screenshot
                borderRadius: '40px', 
                p: 6,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                minHeight: '400px'
              }}
            >
              <Box 
                component="img" 
                src={onlinestudyIcon} 
                sx={{ 
                  width: '100%', 
                  height: 'auto',
                  maxWidth: '450px',
                  // Subtle filter to make it pop against the light background
                  filter: 'drop-shadow(0 10px 20px rgba(124, 58, 237, 0.15))'
                }} 
                alt="Gain Graphic"
              />
            </Box>
          </Grid>

          {/* Text Column */}
          <Grid item xs={12} md={6} sx={{ pl: { md: 6 } }}>
            <Typography 
              variant="h3" 
              sx={{ 
                fontWeight: 900, 
                mb: 3, 
                color: '#111827',
                fontSize: { xs: '2.25rem', md: '3rem' } 
              }}
            >
              What learners gain
            </Typography>
            
            <Typography 
              variant="body1" 
              sx={{ 
                color: '#4b5563', 
                mb: 4, 
                fontSize: '1.1rem',
                maxWidth: '500px' 
              }}
            >
              OMTP is designed to strengthen business understanding through practical repetition and real cause-and-effect learning.
            </Typography>
            
            <Box sx={{ mt: 4 }}>
              <GainItem text="Understand real-world operations management more clearly." />
              <GainItem text="Improve decision-making under uncertainty and constraint." />
              <GainItem text="See how operational choices affect financial performance." />
              <GainItem text="Learn trade-offs between growth, cost, service, and efficiency." />
              <GainItem text="Build practical confidence for study, work, and entrepreneurship." />
            </Box>
          </Grid>
          
        </Grid>
      </Container>
    </Box>
  );
};

export default WhatLearnersGain;