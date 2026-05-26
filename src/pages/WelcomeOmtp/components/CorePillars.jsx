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
  <Box component="section" sx={{ py: 2, bgcolor: '#fcfaff' }}>
    <Container maxWidth="lg">
      <Grid 
        container 
        spacing={1.5} 
        justifyContent="center" 
        alignItems="stretch"
        sx={{ flexWrap: 'nowrap' }}
      >
        {pillars.map((item, index) => (
          <Grid item xs={4} key={index} sx={{ display: 'flex' }}>
            <Box 
              sx={{ 
                width: '100%',
                bgcolor: '#ffffff', 
                px: 1.5, 
                py: 1.5, 
                borderRadius: '10px', 
                border: '1px solid #e5e7eb',
                boxShadow: '0 1px 2px rgba(0,0,0,0.02)',
                textAlign: 'center',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                minHeight: '80px'   // reduced height
              }}
            >
              <Typography 
                variant="subtitle2" 
                sx={{ 
                  fontWeight: 800, 
                  color: '#7c3aed',
                  fontSize: '0.9rem',
                  lineHeight: 1.1,
                  mb: 0.25   // tighter margin
                }}
              >
                {item.title}
              </Typography>
              
              <Typography 
                variant="caption" 
                sx={{ 
                  color: '#4b5563', 
                  fontSize: '0.78rem', 
                  lineHeight: 1.25,
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
