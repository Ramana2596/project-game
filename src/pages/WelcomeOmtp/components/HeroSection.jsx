// ==========================================
// Component: Hero Section (Variant-driven)
// ==========================================

import React from 'react';
import { Box, Typography, Button, Container, Grid, Stack } from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';
import imgDashboard from '../../../assets/DemoPicture/Dashboard.jpg';
import { colors } from '../../../ux/styles';

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
        background: colors.pageGradient,
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={8} alignItems="center">
          
          {/* LEFT SIDE */}
          <Grid item xs={12} md={6}>
            <Stack spacing={0} sx={{ textAlign: 'left', alignItems: 'flex-start' }}>
              
              {/* Label chip */}
              <Typography
                variant="subtitle2"
                sx={{
                  bgcolor: colors.hover,
                  color: colors.primary,
                  px: 2.5,
                  py: 1,
                  borderRadius: '100px',
                  fontWeight: 700,
                  mb: 2.5,
                  fontSize: '0.85rem',
                  letterSpacing: '0.02em',
                }}
              >
                REAL-TIME BUSINESS SIMULATION
              </Typography>

              {/* Hero Title */}
              <Typography variant="h4">
                Run a Business.<br />
                Make Decisions.<br />
                See Real Results.
              </Typography>

              {/* Hero Subtitle */}
              <Typography variant="body1" sx={{ mb: 3, maxWidth: '520px' }}>
                Experience how strategy, market intelligence, and operations connect in one complete business cycle. Built for students and young professionals.
              </Typography>

              {/* Buttons */}
              <Stack
                direction={{ xs: 'column', sm: 'row' }}
                spacing={2.5}
                sx={{ mb: 6, width: '100%' }}
              >
                <Button
                  variant="contained"
                  onClick={handleDemoLogin}
                  sx={{
                    bgcolor: colors.primary,
                    color: colors.white,
                    px: 4.5,
                    py: 2,
                    borderRadius: '100px',
                    fontWeight: 700,
                    textTransform: 'none',
                    fontSize: '1.05rem',
                    boxShadow: `0 8px 20px ${colors.shadowColor}`,
                    '&:hover': {
                      bgcolor: colors.primaryDark,
                      transform: 'translateY(-2px)',
                    },
                    transition: 'all 0.2s ease',
                  }}
                >
                  Try Live Simulation
                </Button>

                <Button
                  variant="outlined"
                  onClick={scrollToSteps}
                  sx={{
                    px: 3.5,
                    py: 2,
                    borderRadius: '100px',
                    borderColor: colors.border,
                    color: colors.body,
                    fontWeight: 700,
                    textTransform: 'none',
                    fontSize: '1.05rem',
                    borderWidth: '2px',
                    '&:hover': {
                      borderColor: colors.primaryLight,
                      bgcolor: colors.hover,
                    },
                    transition: 'all 0.2s ease',
                  }}
                >
                  See the 7 Steps
                </Button>
              </Stack>

              {/* Feature points */}
              <Box
                sx={{
                  display: 'flex',
                  gap: 4,
                  flexWrap: 'nowrap',
                  whiteSpace: 'nowrap',
                  color: colors.body,
                  fontWeight: 600,
                }}
              >
                {['No experience required', 'Built for learners', 'End-to-end simulation'].map((point) => (
                  <Box key={point} sx={{ display: 'flex', alignItems: 'center' }}>
                    <CheckIcon sx={{ color: colors.primary, fontSize: '1.2rem', mr: 1 }} />
                    <Typography variant="caption" sx={{ fontWeight: 600 }}>
                      {point}
                    </Typography>
                  </Box>
                ))}
              </Box>
            </Stack>
          </Grid>

          {/* RIGHT SIDE */}
          <Grid item xs={12} md={6}>
            <Box
              sx={{
                p: { xs: 1.5, md: 2 },
                bgcolor: colors.primary,
                borderRadius: '24px',
                boxShadow: `0 20px 50px -12px ${colors.shadowColor}`,
                position: 'relative',
                width: '100%',
                transition: 'transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
                '&:hover': { transform: 'rotate(-1deg) scale(1.02)' },
              }}
            >
              <Box
                component="img"
                src={imgDashboard}
                alt="OMTP Dashboard Preview"
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
