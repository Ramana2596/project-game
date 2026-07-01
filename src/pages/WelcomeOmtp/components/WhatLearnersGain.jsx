// ==========================================
// Component: What Learners Gain Section (Variant-driven)
// ==========================================

import React from 'react';
import { Box, Typography, Container, Grid, Stack } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import onlinestudyIcon from '../../../assets/navigation-menu/onlinestudy.png';
import { colors } from '../../../ux/styles';

const GainItem = ({ text }) => (
  <Stack direction="row" spacing={1.5} sx={{ mb: 2, alignItems: 'flex-start' }}>
    <CheckCircleIcon sx={{ color: colors.primary || '#7c3aed', mt: 0.5, fontSize: '1.2rem' }} />
    <Typography 
      variant="body1" 
      sx={{ color: colors.title || '#1F2D3D', fontWeight: 500, lineHeight: 1.5 }}
    >
      {text}
    </Typography>
  </Stack>
);

const WhatLearnersGain = () => {
  return (
    <Box component="section" sx={{ py: 12, bgcolor: colors.card || '#ffffff' }}>
      <Container maxWidth="lg">
        <Grid container spacing={4} alignItems="center">
          
          {/* Visual Column */}
          <Grid item xs={12} md={6}>
            <Box 
              sx={{ 
                bgcolor: colors.background?.panel || '#F8F5FF',
                borderRadius: '32px',
                p: 4,   
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                minHeight: '320px'   
              }}
            >
              <Box 
                component="img" 
                src={onlinestudyIcon} 
                sx={{ 
                  width: '100%', 
                  height: 'auto',
                  maxWidth: '360px',   
                  filter: `drop-shadow(0 8px 16px ${colors.shadowColor || 'rgba(124, 58, 237, 0.12)'})`
                }} 
                alt="Gain Graphic"
              />
            </Box>
          </Grid>

          {/* Text Column */}
          <Grid item xs={12} md={6} sx={{ pl: { md: 6 } }}>
            <Typography 
              variant="h4" 
              sx={{ fontWeight: 600, mb: 3, color: colors.title || '#1F2D3D' }}
            >
              What learners gain
            </Typography>
            
            <Typography 
              variant="body1" 
              sx={{ color: colors.body || '#546E7A', mb: 4, maxWidth: '500px', lineHeight: 1.6 }}
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
