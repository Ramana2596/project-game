// ==========================================
// Component: Final Call to Action (Variant-driven)
// ==========================================

import React from 'react';
import { Box, Typography, Container, Button, Stack } from '@mui/material';
import { colors } from '../../../ux/styles';

const FinalCTA = ({ onStart }) => {
  const scrollToSteps = () => {
    document.getElementById('how-it-works')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <Box component="section" sx={{ py: { xs: 8, md: 12 }, bgcolor: colors.paper || '#ffffff' }}>
      <Container maxWidth="lg">
        <Box 
          sx={{ 
            background: colors.heroGradient || colors.primary, 
            borderRadius: '32px',
            p: { xs: 6, md: 8 }, 
            color: colors.white || '#ffffff',
            boxShadow: `0 20px 50px ${colors.primary}40`, 
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
                  mb: 2, 
                  lineHeight: 1.2,
                  letterSpacing: '-0.02em',
                  color: colors.white || '#ffffff'
                }}
              >
                Ready to experience real business decision‑making?
              </Typography>
              
              <Typography 
                variant="body1" 
                sx={{ 
                  lineHeight: 1.6,
                  color: colors.white || '#ffffff',
                  opacity: 0.9
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
              {/* Inverted Light Primary Button */}
              <Button 
                variant="contained" 
                onClick={onStart}
                sx={{ 
                  bgcolor: colors.white || '#ffffff', 
                  color: colors.primary, 
                  fontWeight: 700, 
                  px: 4, py: 2,
                  borderRadius: '100px', 
                  textTransform: 'none',
                  fontSize: '1.05rem',
                  boxShadow: '0 8px 20px rgba(0,0,0,0.12)',
                  '&:hover': { 
                    bgcolor: colors.hover || 'rgba(255,255,255,0.92)', 
                    transform: 'translateY(-2px)' 
                  },
                  transition: 'all 0.2s ease'
                }}
              >
                Try Live Simulation
              </Button>

              {/* Inverted Outlined Button */}
              <Button 
                variant="outlined" 
                onClick={scrollToSteps}
                sx={{ 
                  color: colors.white || '#ffffff', 
                  borderColor: 'rgba(255,255,255,0.5)', 
                  fontWeight: 700, 
                  px: 4, py: 2,
                  borderRadius: '100px', 
                  textTransform: 'none',
                  fontSize: '1.05rem',
                  borderWidth: '2px',
                  '&:hover': { 
                    borderColor: colors.white || '#ffffff', 
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
