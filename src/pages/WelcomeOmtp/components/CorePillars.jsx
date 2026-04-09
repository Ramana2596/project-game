// ==========================================
// Component: Core Pillars (Ultra-Compact Row)
// ==========================================

import React from 'react';
import { Box, Typography, Grid, Container } from '@mui/material';

const pillars = [
  { title: "Real Decisions", desc: "Input monthly forecasts and sales strategies." },
  { title: "Instant Feedback", desc: "See immediate financial results after every run." },
  { title: "Practical Learning", desc: "Bridge the gap between theory and performance." }
];

const CorePillars = () => (
  <Box component="section" sx={{ py: 3, bgcolor: '#fcfaff' }}>
    <Container maxWidth="lg">
      <Grid 
        container 
        spacing={2} 
        justifyContent="center" 
        alignItems="stretch"
        sx={{ flexWrap: 'nowrap' }} // Forces single-line behavior
      >
        {pillars.map((item, index) => (
          <Grid item xs={4} key={index} sx={{ display: 'flex' }}>
            <Box 
              sx={{ 
                width: '100%',
                bgcolor: '#ffffff', 
                px: 2, 
                py: 2, 
                borderRadius: '12px', 
                border: '1px solid #e5e7eb',
                boxShadow: '0 1px 3px rgba(0,0,0,0.02)',
                textAlign: 'center',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                // Keeps the height uniform while limiting width
                minHeight: '100px'
              }}
            >
              <Typography 
                variant="subtitle2" 
                sx={{ 
                  fontWeight: 800, 
                  color: '#7c3aed', // Purple highlight for headers
                  fontSize: '0.95rem',
                  lineHeight: 1.1,
                  mb: 0.5
                }}
              >
                {item.title}
              </Typography>
              
              <Typography 
                variant="caption" 
                sx={{ 
                  color: '#4b5563', 
                  fontSize: '0.8rem', 
                  lineHeight: 1.3,
                  fontWeight: 500
                }}
              >
                {item.desc}
              </Typography>
            </Box>
          </Grid>
        ))}
      </Grid>
    </Container>
  </Box>
);

export default CorePillars;