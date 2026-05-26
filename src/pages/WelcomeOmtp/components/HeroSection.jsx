// ==========================================
// Component: Hero Section (Final Drop-in)
// ==========================================

import React from 'react';
import { Box, Typography, Button, Container, Grid, Stack } from '@mui/material';
import CheckIcon from '@mui/icons-material/Check'; 
import imgDashboard from '../../../assets/DemoPicture/Dashboard.jpg';

const styles = {
  h1: { 
    fontSize: { xs: '2.5rem', md: '3.5rem' }, 
    fontWeight: 800, 
    mb: 3,
    letterSpacing: '-0.02em',
    lineHeight: 1.15
  }, 
  p: { 
    fontSize: '1.1rem', 
    lineHeight: 1.6, 
    color: '#374151' 
  } 
};

const HeroSection = ({ handleDemoLogin }) => {
  
  const scrollToSteps = () => {
    document.getElementById('how-it-works')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <Box 
      component="section" 
      sx={{ 
        pt: { xs: 8, md: 12 }, 
        pb: { xs: 8, md: 10 },
        bgcolor: '#ffffff',
        background: 'linear-gradient(180deg, #f9fafb 0%, #ffffff 100%)' 
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={8} alignItems="center">
          
          {/* LEFT SIDE: Text and CTA */}
          <Grid item xs={12} md={6}>
            <Stack spacing={0} sx={{ textAlign: 'left', alignItems: 'flex-start' }}>
              
              <Typography 
                variant="subtitle2" 
                sx={{ 
                  bgcolor: '#f5f3ff', color: '#6A0DAD', px: 2.5, py: 1, 
                  borderRadius: '100px', fontWeight: 700, mb: 2.5, fontSize: '0.85rem',
                  letterSpacing: '0.02em'
                }}
              >
                REAL-TIME BUSINESS SIMULATION
              </Typography>

              <Typography variant="h1" sx={{ ...styles.h1, color: '#111827' }}>
                Run a Business.<br/>
                Make Decisions.<br/>
                See Real Results.
              </Typography>

              <Typography variant="body1" sx={{ ...styles.p, mb: 3, maxWidth: '520px' }}>
                Experience how strategy, market intelligence, and operations connect in one complete business cycle. Built for students and young professionals.
              </Typography>
              

              <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2.5} sx={{ mb: 6, width: '100%' }}>
                <Button 
                  variant="contained" 
                  onClick={handleDemoLogin}
                  sx={{ 
                    bgcolor: '#6A0DAD', color: 'white', px: 4.5, py: 2, 
                    borderRadius: '100px', fontWeight: 700, textTransform: 'none',
                    fontSize: '1.05rem', boxShadow: '0 8px 20px rgba(106, 13, 173, 0.25)',
                    '&:hover': { bgcolor: '#5A0BA0', transform: 'translateY(-2px)' },
                    transition: 'all 0.2s ease'
                  }}
                >
                  Try Live Simulation
                </Button>
                
                <Button 
                  variant="outlined" 
                  onClick={scrollToSteps}
                  sx={{ 
                    px: 3.5, py: 2, borderRadius: '100px', borderColor: '#d1d5db', 
                    color: '#374151', fontWeight: 700, textTransform: 'none',
                    fontSize: '1.05rem', borderWidth: '2px',
                    '&:hover': { borderColor: '#9ca3af', bgcolor: '#f9fafb' },
                    transition: 'all 0.2s ease'
                  }}
                >
                  See the 7 Steps
                </Button>
              </Stack>

              {/* Three ticked points in one line, no wrapping */}
              <Box sx={{ display: 'flex', gap: 4, flexWrap: 'nowrap', whiteSpace: 'nowrap', color: '#4b5563', fontWeight: 600 }}>
                {['No experience required', 'Built for learners', 'End-to-end simulation'].map((point) => (
                  <Box key={point} sx={{ display: 'flex', alignItems: 'center' }}>
                    <CheckIcon sx={{ color: '#6A0DAD', fontSize: '1.2rem', mr: 1 }} />
                    <Typography variant="body2" sx={{ fontWeight: 600 }}>{point}</Typography>
                  </Box>
                ))}
              </Box>
            </Stack>
          </Grid>

          {/* RIGHT SIDE: Large Visual Preview */}
          <Grid item xs={12} md={6}>
            <Box 
              sx={{ 
                p: { xs: 1.5, md: 2 }, bgcolor: '#6A0DAD', borderRadius: '24px', 
                boxShadow: '0 20px 50px -12px rgba(106, 13, 173, 0.35)', position: 'relative',
                width: '100%',
                transition: 'transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
                '&:hover': { transform: 'rotate(-1deg) scale(1.02)' }
              }}
            >
              <Box 
                component="img" src={imgDashboard} alt="OMTP Dashboard Preview" 
                sx={{ width: '100%', borderRadius: '16px', display: 'block' }} 
              />
            </Box>
          </Grid>
          
        </Grid>
      </Container>
    </Box>
  );
};

export default HeroSection;
