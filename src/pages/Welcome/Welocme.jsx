import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, Button, Container, Box, Divider, Tooltip } from '@mui/material';
import { Link } from 'react-router-dom';
import '../Welcome/styles/pageStyle.css';
import { pageConstants } from './constants/pageConstants';
import omgLogo from '../../assets/omg-logo.png';

const WelcomePage = () => {
    const [activeSection, setActiveSection] = useState('aboutSimulation');

    // Mapping short titles
    const shortTitles = {
        aboutSimulation: 'Welcome',
        aboutUs: 'About',
        aboutApp: 'OMG?',
        forWhom: 'For Whom',
        howItWorks: 'How it Works',
        benefits: 'Learning',
    };

    return (
        <Box>
            {/* AppBar with Toolbar */}
            <AppBar position="static" sx={{ backgroundImage: 'radial-gradient(ellipse at 50% 100%, hsl(213, 100%, 87%), hsl(0, 0%, 100%))', backgroundColor: 'white', color: 'black', boxShadow: 'none' }}>
                <Toolbar>
                    {/* Logo Image */}
                    <img src={omgLogo} alt="OMG Logo" style={{ width: 40, height: 40, marginRight: 8 }} />

                    {/* App Title */}
                    <Typography variant="h6" sx={{ flexGrow: 1 }}>
                        OMG
                    </Typography>

                    {/* Navigation Buttons with Enhanced Tooltip */}
                    {pageConstants?.toolBarSections.map((section) => (
                        <Tooltip
                            key={section?.key}
                            title={section?.title}
                            arrow
                            PopperProps={{
                                modifiers: [
                                    {
                                        name: 'preventOverflow',
                                        options: {
                                            boundary: 'window',
                                        },
                                    },
                                ],
                            }}
                            sx={{
                                '& .MuiTooltip-tooltip': {
                                    fontSize: '16px',
                                    padding: '24px',  // Increased padding for better height
                                    lineHeight: '32px', // More spacing for readability
                                    minHeight: '120px', // Ensures tooltip is visibly taller
                                    maxWidth: '250px', // Prevents text from squeezing too much
                                }
                            }}
                        >
                            <Button onClick={() => setActiveSection(section?.key)} sx={{ fontWeight: 'bold', marginRight: 1 }}>
                                {shortTitles[section?.key] || section?.title}
                            </Button>
                        </Tooltip>
                    ))}

                    {/* Register & Sign-In Buttons */}
                    <Button className='standard-button-secondary-button' sx={{ marginRight: 1 }} component={Link} to="/register">
                        Register
                    </Button>
                    <Button className='standard-button-primary-button' component={Link} to="/signIn">
                        Sign In
                    </Button>
                </Toolbar>
            </AppBar>

            {/* Dynamic Section Rendering */}
            <Container>
                <Box sx={{ my: 4 }}>
                    {pageConstants.toolBarSections.map((section) => (
                        section.key === activeSection && (
                            <Box key={section.key}>
                                <Typography variant="h5" sx={{ textAlign: 'left' }}>{section.title}</Typography>
                                <Typography variant="body1" sx={{ textAlign: 'left' }}>{section.content}</Typography>
                                <Divider sx={{ my: 2 }} />
                            </Box>
                        )
                    ))}
                </Box>
            </Container>
        </Box>
    );
};

export default WelcomePage;
