import React from 'react';
import { Box, Container, Grid, Typography } from '@mui/material';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';

const WelcomeFooter = () => {
    return (
        <Box component="footer" sx={{
            mt: 8,
            pt: 6,
            pb: 4,
            borderTop: '2px solid #ebeaeaff',
            bgcolor: '#fafafa'
        }}>
            <Container maxWidth="lg">
                <Grid container spacing={3} alignItems="flex-end">
                    <Grid item xs={12} md={6}>
                        <Typography variant="h6" sx={{ color: 'text.primary', fontWeight: 700, mb: 2 }}>
                            Contact Us
                        </Typography>
                        <Box sx={{ display: 'flex', gap: 2, alignItems: 'center', mb: 1 }}>
                            <EmailIcon sx={{ color: 'rgba(30,30,30,0.7)' }} />
                            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                                info@operationsgame.example
                            </Typography>
                        </Box>
                        <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
                            <PhoneIcon sx={{ color: 'rgba(30,30,30,0.7)' }} />
                            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                                +91 00000 00000
                            </Typography>
                        </Box>
                    </Grid>
                    <Grid item xs={12} md={6} sx={{ textAlign: { xs: 'left', md: 'right' } }}>
                        <Typography variant="body2" sx={{ color: 'text.secondary', fontWeight: 500 }}>
                            © {new Date().getFullYear()} OMG Simulation — All rights reserved.
                        </Typography>
                    </Grid>
                </Grid>
            </Container>
        </Box>
    );
};

export default WelcomeFooter;
