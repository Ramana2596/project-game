// ==========================================
// Component: Hero Section (Final Drop-in)
// ==========================================

import React from 'react';
import { Box, Typography, Button, Container, Grid, Stack } from '@mui/material';
import CheckIcon from '@mui/icons-material/Check'; 
import imgDashboard from '../../../assets/DemoPicture/Dashboard.jpg';

const styles = {
  h1: { 
    fontSize: { xs: '2.5rem', md: '3.75rem' }, 
    fontWeight: 900, 
    mb: 3,
    letterSpacing: '-0.03em',
    lineHeight: 1.1
  }, 
  p: { 
    fontSize: '1.15rem', 
    lineHeight: 1.6, 
    color: '#4b5563' 
  } 
};

/**
 * @param {Function} handleDemoLogin - Function passed from WelcomeOmtp to navigate to the Demo
 */
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
                  bgcolor: '#f5f3ff', color: '#7C3AED', px: 2.5, py: 1, 
                  borderRadius: '100px', fontWeight: 800, mb: 2.5, fontSize: '0.85rem'
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
              
              <Typography 
                variant="body2" 
                sx={{ 
                  bgcolor: '#f0fdf4', color: '#166534', px: 2.5, py: 1.25, 
                  borderRadius: '12px', mb: 5, fontWeight: 800, fontSize: '0.95rem',
                  border: '1px solid rgba(22, 101, 52, 0.1)'
                }}
              >
                Start from just $5 — free for students
              </Typography>

              <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2.5} sx={{ mb: 6, width: '100%' }}>
                <Button 
                  variant="contained" 
                  onClick={handleDemoLogin} // ✅ Triggers the navigation
                  sx={{ 
                    bgcolor: '#7C3AED', color: 'white', px: 4.5, py: 2, 
                    borderRadius: '100px', fontWeight: 800, textTransform: 'none',
                    fontSize: '1.05rem', boxShadow: '0 10px 20px -3px rgba(124, 58, 237, 0.3)',
                    '&:hover': { bgcolor: '#6d28d9', transform: 'translateY(-2px)' },
                    transition: 'all 0.2s ease'
                  }}
                >
                  Try Live Simulation
                </Button>
                
                <Button 
                  variant="outlined" 
                  onClick={scrollToSteps}
                  sx={{ 
                    px: 3.5, py: 2, borderRadius: '100px', borderColor: '#e5e7eb', 
                    color: '#374151', fontWeight: 800, textTransform: 'none',
                    fontSize: '1.05rem', borderWidth: '2px',
                    '&:hover': { borderColor: '#d1d5db', bgcolor: '#f9fafb', borderWidth: '2px' },
                    transition: 'all 0.2s ease'
                  }}
                >
                  See the 7 Steps
                </Button>
              </Stack>

              <Grid container spacing={2} sx={{ color: '#4b5563', fontWeight: 600 }}>
                {['No experience required', 'Built for learners', 'End-to-end simulation'].map((point) => (
                  <Grid item key={point} sx={{ display: 'flex', alignItems: 'center' }}>
                    <CheckIcon sx={{ color: '#7C3AED', fontSize: '1.2rem', mr: 1 }} />
                    <Typography variant="body2" sx={{ fontWeight: 600 }}>{point}</Typography>
                  </Grid>
                ))}
              </Grid>
            </Stack>
          </Grid>

          {/* RIGHT SIDE: Visual Preview */}
          <Grid item xs={12} md={6}>
            <Box 
              sx={{ 
                p: { xs: 1.5, md: 2 }, bgcolor: '#7C3AED', borderRadius: '40px', 
                boxShadow: '0 25px 60px -12px rgba(124, 58, 237, 0.4)', position: 'relative',
                transition: 'transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
                '&:hover': { transform: 'rotate(-1deg) scale(1.02)' }
              }}
            >
              <Box 
                component="img" src={imgDashboard} alt="OMTP Dashboard Preview" 
                sx={{ width: '100%', borderRadius: '24px', display: 'block' }} 
              />
            </Box>
          </Grid>
          
        </Grid>
      </Container>
    </Box>
  );
};

export default HeroSection;