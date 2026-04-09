// ==========================================
// Component: Final Call to Action (Standardized)
// ==========================================

import React from 'react';
import { Box, Typography, Container, Button, Stack } from '@mui/material';

const FinalCTA = () => {
  const scrollToSteps = () => {
    document.getElementById('how-it-works')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <Box component="section" sx={{ py: 10 }}>
      {/* Outer Container ensures it aligns with the rest of the page width */}
      <Container maxWidth="lg">
        <Box 
          sx={{ 
            bgcolor: '#7c3aed', 
            borderRadius: '40px', // Matches VideoIntro and Gain section card radius
            p: { xs: 6, md: 8 }, 
            color: 'white',
            boxShadow: '0 20px 50px rgba(124, 58, 237, 0.2)',
            position: 'relative',
            overflow: 'hidden'
          }}
        >
          {/* Subtle Decorative Background Detail */}
          <Box sx={{ 
            position: 'absolute', top: '-10%', right: '-5%', 
            width: '300px', height: '300px', borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0) 70%)'
          }} />

          <Stack 
            direction={{ xs: 'column', lg: 'row' }} 
            spacing={4} 
            alignItems="center" 
            justifyContent="space-between"
          >
            <Box sx={{ maxWidth: '650px', textAlign: { xs: 'center', lg: 'left' } }}>
              <Typography 
                variant="h3" 
                sx={{ 
                  fontWeight: 900, 
                  mb: 2, 
                  lineHeight: 1.1,
                  fontSize: { xs: '2.2rem', md: '3rem' },
                  letterSpacing: '-0.02em'
                }}
              >
                Ready to experience real business decision-making?
              </Typography>
              <Typography 
                variant="body1" 
                sx={{ 
                  opacity: 0.9, 
                  fontSize: '1.2rem',
                  fontWeight: 500,
                  lineHeight: 1.5 
                }}
              >
                Give learners a practical way to understand operations, strategy, and finance through one modern simulation platform.
              </Typography>
            </Box>

            <Stack 
              direction={{ xs: 'column', sm: 'row' }} 
              spacing={2} 
              sx={{ width: { xs: '100%', sm: 'auto' } }}
            >
              <Button 
                variant="contained" 
                sx={{ 
                  bgcolor: 'white', 
                  color: '#7c3aed', 
                  fontWeight: 800, 
                  px: 4, py: 2,
                  borderRadius: '100px', // Perfect Pill shape
                  textTransform: 'none',
                  fontSize: '1.05rem',
                  boxShadow: '0 10px 20px rgba(0,0,0,0.1)',
                  '&:hover': { bgcolor: '#f8f9fa', transform: 'translateY(-2px)' },
                  transition: 'all 0.2s'
                }}
              >
                Try Live Simulation
              </Button>
              <Button 
                variant="outlined" 
                onClick={scrollToSteps}
                sx={{ 
                  color: 'white', 
                  borderColor: 'rgba(255,255,255,0.4)', 
                  fontWeight: 800, 
                  px: 4, py: 2,
                  borderRadius: '100px', 
                  textTransform: 'none',
                  fontSize: '1.05rem',
                  borderWidth: '2px',
                  '&:hover': { 
                    borderColor: 'white', 
                    bgcolor: 'rgba(255,255,255,0.1)',
                    borderWidth: '2px'
                  },
                  transition: 'all 0.2s'
                }}
              >
                See the 7 Steps
              </Button>
            </Stack>
          </Stack>
        </Box>
      </Container>
    </Box>
  );
};

export default FinalCTA;