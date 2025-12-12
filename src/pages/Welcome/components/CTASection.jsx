import React from 'react';
import { Box, Container, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';

const CTASection = ({ handleDemoLogin }) => {
    return (
        <Box sx={{
            background: 'linear-gradient(135deg, #7b1fa2, #512da8)',
            py: 12,
            textAlign: 'center',
            position: 'relative',
            overflow: 'hidden'
        }}>
            <Box sx={{
                position: 'absolute',
                inset: 0,
                opacity: 0.1,
                backgroundImage: 'radial-gradient(circle at 20% 50%, white 0%, transparent 50%)'
            }} />
            <Container maxWidth="sm" sx={{ position: 'relative', zIndex: 1 }}>
                <Typography variant="h3" sx={{ color: 'white', fontWeight: 900, mb: 3 }}>
                    Ready to Transform Your Learning?
                </Typography>
                <Typography variant="h6" sx={{ color: 'rgba(255,255,255,0.9)', mb: 4 }}>
                    Join thousands of learners experiencing the future of business education.
                </Typography>
                <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap' }}>
                    <Button
                        variant="contained"
                        size="large"
                        onClick={handleDemoLogin}
                        sx={{
                            bgcolor: 'white',
                            color: '#7b1fa2',
                            fontWeight: 700,
                            textTransform: 'none',
                            px: 5,
                            borderRadius: '50px'
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
                            borderColor: 'white',
                            color: 'white',
                            fontWeight: 700,
                            textTransform: 'none',
                            px: 5,
                            borderRadius: '50px'
                        }}
                    >
                        Get Started Free
                    </Button>
                </Box>
            </Container>
        </Box>
    );
};

export default CTASection;
