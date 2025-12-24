import React from 'react';
import { Box, Container, Grid, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import RocketLaunchIcon from '@mui/icons-material/RocketLaunch';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

const HeroSection = ({ handleDemoLogin }) => {
    return (
        <Box sx={{
            background: 'linear-gradient(135deg, #f5f3ff 0%, #faf7ff 50%, #f0ecff 100%)',
            position: 'relative',
            pt: 20,
            pb: 16,
            overflow: 'hidden',
            '&::before': {
                content: '""',
                position: 'absolute',
                top: 0,
                left: '-50%',
                width: '200%',
                height: '100%',
                background: 'radial-gradient(circle at 20% 50%, rgba(123, 31, 162, 0.08) 0%, transparent 50%)',
                animation: 'float 20s ease-in-out infinite',
            },
            '&::after': {
                content: '""',
                position: 'absolute',
                bottom: 0,
                right: '-10%',
                width: '400px',
                height: '400px',
                background: 'radial-gradient(circle, rgba(123, 31, 162, 0.05) 0%, transparent 70%)',
                borderRadius: '50%',
            }
        }}>
            <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
                <Grid container spacing={6} alignItems="center">
                    {/* Left Content */}
                    <Grid item xs={12} md={6}>
                        <Box sx={{ animation: 'slideInLeft 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) both' }}>
                            <Typography
                                variant="h2"
                                component="h1"
                                sx={{
                                    fontWeight: 900,
                                    mb: 3,
                                    background: 'linear-gradient(135deg, #7b1fa2 0%, #512da8 100%)',
                                    backgroundClip: 'text',
                                    WebkitBackgroundClip: 'text',
                                    WebkitTextFillColor: 'transparent',
                                    fontSize: { xs: '2.2rem', md: '3.5rem' },
                                    lineHeight: 1.2
                                }}
                            >
                                Master your Operations Management Skills !
                            </Typography>
                            <Typography
                                variant="h6"
                                sx={{
                                    color: 'text.secondary',
                                    mb: 4,
                                    fontSize: '1.1rem',
                                    lineHeight: 1.6,
                                    fontWeight: 400
                                }}
                            >
                                Learn to make strategic and operational decisions in a realistic business simulation. Experience the real impact of your choices on company performance.
                            </Typography>

                            <Box sx={{ display: 'flex', gap: 2, mb: 4, flexWrap: 'wrap' }}>
                                <Button
                                    variant="contained"
                                    size="large"
                                    onClick={handleDemoLogin}
                                    endIcon={<ArrowForwardIcon />}
                                    sx={{
                                        background: 'linear-gradient(135deg, #7b1fa2, #512da8)',
                                        color: 'white',
                                        fontWeight: 600,
                                        textTransform: 'none',
                                        px: 4,
                                        py: 1.5,
                                        borderRadius: '50px',
                                        boxShadow: '0 8px 24px rgba(123, 31, 162, 0.35)',
                                        transition: 'all 0.3s ease',
                                        '&:hover': {
                                            transform: 'translateY(-2px)',
                                            boxShadow: '0 12px 32px rgba(123, 31, 162, 0.45)'
                                        }
                                    }}
                                >
                                    Try Demo Now
                                </Button>
                                <Button
                                    variant="outlined"
                                    size="large"
                                    component={Link}
                                    to="/register"
                                    sx={{
                                        borderColor: '#7b1fa2',
                                        color: '#7b1fa2',
                                        fontWeight: 600,
                                        textTransform: 'none',
                                        px: 4,
                                        py: 1.5,
                                        borderRadius: '50px',
                                        transition: 'all 0.3s ease',
                                        '&:hover': {
                                            borderColor: '#512da8',
                                            bgcolor: 'rgba(123, 31, 162, 0.06)'
                                        }
                                    }}
                                >
                                    Get Started
                                </Button>
                            </Box>
                        </Box>
                    </Grid>

                    {/* Right Illustration */}
                    <Grid item xs={12} md={6}>
                        <Box sx={{
                            animation: 'slideInRight 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) both',
                            perspective: '1200px'
                        }}>
                            <Box sx={{
                                position: 'relative',
                                height: 400,
                                borderRadius: '20px',
                                overflow: 'hidden',
                                boxShadow: '0 20px 60px rgba(123, 31, 162, 0.25)',
                                transform: 'rotateY(-5deg)',
                                transition: 'transform 0.3s ease'
                            }}>
                                <Box sx={{
                                    position: 'absolute',
                                    inset: 0,
                                    background: 'linear-gradient(135deg, #7b1fa2, #512da8)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    flexDirection: 'column',
                                    gap: 3
                                }}>
                                    <RocketLaunchIcon sx={{ fontSize: 80, color: 'white', opacity: 0.9 }} />
                                    <Typography variant="h5" sx={{ color: 'white', fontWeight: 700, textAlign: 'center' }}>
                                        Real-time Interactive Operations Management
                                    </Typography>
                                </Box>
                            </Box>
                        </Box>
                    </Grid>
                </Grid>
            </Container>
        </Box>
    );
};

export default HeroSection;
