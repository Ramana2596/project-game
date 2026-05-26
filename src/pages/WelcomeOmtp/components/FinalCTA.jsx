// ==========================================
// Component: Final Call to Action (Drop-in Replacement)
// ==========================================

import React from 'react';
import { Box, Typography, Container, Button, Stack } from '@mui/material';

const FinalCTA = ({ onStart }) => {
  const scrollToSteps = () => {
    document.getElementById('how-it-works')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <Box component="section" sx={{ py: { xs: 8, md: 12 } }}>
      <Container maxWidth="lg">
        <Box 
          sx={{ 
            bgcolor: '#6A0DAD', 
            borderRadius: '32px',
            p: { xs: 6, md: 8 }, 
            color: 'white',
            boxShadow: '0 20px 50px rgba(106, 13, 173, 0.25)',
            position: 'relative',
            overflow: 'hidden'
          }}
        >
          {/* Decorative background accent */}
          <Box sx={{ 
            position: 'absolute', top: '-10%', right: '-5%', 
            width: '280px', height: '280px', borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(255,255,255,0.12) 0%, rgba(255,255,255,0) 70%)'
          }} />

          <Stack 
            direction={{ xs: 'column', lg: 'row' }} 
            spacing={4} 
            alignItems="center" 
            justifyContent="space-between"
          >
            {/* Text block */}
            <Box sx={{ maxWidth: '640px', textAlign: { xs: 'center', lg: 'left' } }}>
              <Typography 
                variant="h4" 
                sx={{ 
                  fontWeight: 800, 
                  mb: 2, 
                  lineHeight: 1.2,
                  fontSize: { xs: '2.2rem', md: '2.8rem' },
                  letterSpacing: '-0.02em'
                }}
              >
                Ready to experience real business decision‑making?
              </Typography>
              <Typography 
                variant="body1" 
                sx={{ 
                  opacity: 0.9, 
                  fontSize: '1.15rem',
                  fontWeight: 500,
                  lineHeight: 1.6 
                }}
              >
                Give learners a practical way to understand operations, strategy, and finance through one modern simulation platform.
              </Typography>
            </Box>

            {/* CTA buttons */}
            <Stack 
              direction={{ xs: 'column', sm: 'row' }} 
              spacing={2.5} 
              sx={{ width: { xs: '100%', sm: 'auto' } }}
            >
              <Button 
                variant="contained" 
                onClick={onStart}
                sx={{ 
                  bgcolor: 'white', 
                  color: '#6A0DAD', 
                  fontWeight: 700, 
                  px: 4, py: 2,
                  borderRadius: '100px',
                  textTransform: 'none',
                  fontSize: '1.05rem',
                  boxShadow: '0 8px 20px rgba(0,0,0,0.12)',
                  '&:hover': { bgcolor: '#f9fafb', transform: 'translateY(-2px)' },
                  transition: 'all 0.2s ease'
                }}
              >
                Try Live Simulation
              </Button>
              <Button 
                variant="outlined" 
                onClick={scrollToSteps}
                sx={{ 
                  color: 'white', 
                  borderColor: 'rgba(255,255,255,0.5)', 
                  fontWeight: 700, 
                  px: 4, py: 2,
                  borderRadius: '100px', 
                  textTransform: 'none',
                  fontSize: '1.05rem',
                  borderWidth: '2px',
                  '&:hover': { 
                    borderColor: 'white', 
                    bgcolor: 'rgba(255,255,255,0.12)',
                    borderWidth: '2px'
                  },
                  transition: 'all 0.2s ease'
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
