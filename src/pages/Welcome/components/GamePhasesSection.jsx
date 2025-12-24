import React from 'react';
import { Box, Container, Grid, Typography } from '@mui/material';

const GamePhasesSection = () => {
    const phases = [
        { icon: '🎯', title: 'Strategic Decision', description: 'Plan your Strategy' },
        { icon: '📊', title: 'Market Dynamics', description: 'Analyze market trends' },
        { icon: '⚙️', title: 'Operational Decision', description: 'Make key decisions' },
        { icon: '▶️', title: 'Simulation Run', description: 'Execute simulation' },
        { icon: '📈', title: 'Financial Reports', description: 'Review Financial Statement' },
        { icon: '📋', title: 'Assessment Card', description: ' Assessment & Feedback' }
    ];

    return (
        <Box sx={{
            py: 8,
            bgcolor: '#f5f5f5',
            mt: 4
        }}>
            <Container maxWidth="lg">
                <Typography variant="h5" sx={{ textAlign: 'center', fontWeight: 800, mb: 6, color: '#333' }}>
                    Game Simulation Phases
                </Typography>
                <Grid container spacing={3}>
                    {phases.map((item, index) => (
                        <Grid item xs={12} sm={6} md={4} lg={2} key={index}>
                            <Box sx={{
                                textAlign: 'center',
                                p: 3,
                                borderRadius: '12px',
                                bgcolor: 'white',
                                border: '2px solid #e0e0e0',
                                transition: 'all 0.3s ease',
                                cursor: 'pointer',
                                boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
                                '&:hover': {
                                    bgcolor: '#fafafa',
                                    transform: 'translateY(-6px)',
                                    boxShadow: '0 8px 20px rgba(123, 31, 162, 0.15)',
                                    borderColor: '#7b1fa2'
                                }
                            }}>
                                <Typography variant="h3" sx={{ mb: 1.5, lineHeight: 1 }}>
                                    {item.icon}
                                </Typography>
                                <Typography variant="subtitle2" sx={{ fontWeight: 800, mb: 0.5, color: '#1a1a1a', fontSize: '1rem' }}>
                                    {item.title}
                                </Typography>
                                <Typography variant="caption" sx={{ color: '#666', fontWeight: 500, fontSize: '0.875rem' }}>
                                    {item.description}
                                </Typography>
                            </Box>
                        </Grid>
                    ))}
                </Grid>
            </Container>
        </Box>
    );
};

export default GamePhasesSection;
