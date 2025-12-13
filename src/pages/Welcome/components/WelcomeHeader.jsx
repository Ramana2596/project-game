import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { Link } from 'react-router-dom';
import { pageConstants } from '../constants/pageConstants';
import omgLogo from '../../../assets/omg-logo.png';

const WelcomeHeader = ({
    activeSection,
    setActiveSection,
    setDisplaySection,
    shortTitles,
    handleDemoLogin,
    appBarRef
}) => {
    const isProgrammaticScroll = React.useRef(false);

    const handleNavClick = (section) => {
        isProgrammaticScroll.current = true;
        window.clearTimeout(window.__welcomeScrollTimer);
        window.__welcomeScrollTimer = window.setTimeout(() => {
            isProgrammaticScroll.current = false;
        }, 900);
        setDisplaySection(section.key);
        setActiveSection(section.key);
    };

    return (
        <AppBar
            ref={appBarRef}
            position="fixed"
            color="transparent"
            elevation={0}
            sx={{
                background: 'rgba(255,255,255,0.95)',
                backdropFilter: 'blur(12px)',
                borderBottom: '1px solid rgba(0,0,0,0.08)',
                transition: 'all 0.3s ease'
            }}
        >
            <Toolbar sx={{ display: 'flex', gap: 2, py: 1 }}>
                {/* Logo */}
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                    <Box sx={{
                        width: 48,
                        height: 48,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}>
                        <img src={omgLogo} alt="OMG Logo" style={{ width: 100, height: 100 }} />
                    </Box>
                </Box>

                <Box sx={{ flexGrow: 1 }} />

                {/* Navigation */}
                <Box sx={{ display: 'flex', gap: 0.5, alignItems: 'center' }}>
                    {pageConstants?.toolBarSections.map((section) => (
                        <Button
                            key={section.key}
                            component="a"
                            href={`#${section.key}`}
                            onClick={() => handleNavClick(section)}
                            sx={{
                                textTransform: 'none',
                                fontSize: '0.9rem',
                                color: activeSection === section.key ? 'white' : 'rgba(30,30,30,0.75)',
                                fontWeight: activeSection === section.key ? 700 : 500,
                                px: activeSection === section.key ? 2 : 1,
                                py: activeSection === section.key ? 0.75 : 0.5,
                                borderRadius: '50px',
                                background: activeSection === section.key ? 'linear-gradient(135deg, #7b1fa2, #512da8)' : 'transparent',
                                boxShadow: activeSection === section.key ? '0 4px 12px rgba(123, 31, 162, 0.25)' : 'none',
                                transition: 'all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)',
                                '&:hover': {
                                    color: activeSection === section.key ? 'white' : '#7b1fa2',
                                    background: activeSection === section.key ? 'linear-gradient(135deg, #7b1fa2, #512da8)' : 'rgba(123, 31, 162, 0.08)',
                                    transform: 'translateY(-2px)'
                                }
                            }}
                        >
                            {shortTitles[section?.key] || section?.title}
                        </Button>
                    ))}
                </Box>

                {/* Auth Buttons */}
                <Box sx={{ display: 'flex', gap: 1, ml: 3 }}>
                    <Button
                        variant="text"
                        onClick={handleDemoLogin}
                        sx={{ color: '#7b1fa2', fontWeight: 600, textTransform: 'none' }}
                    >
                        Demo
                    </Button>
                    <Button
                        variant="outlined"
                        component={Link}
                        to="/register"
                        sx={{
                            borderColor: '#7b1fa2',
                            color: '#7b1fa2',
                            fontWeight: 600,
                            textTransform: 'none',
                            '&:hover': { bgcolor: 'rgba(123, 31, 162, 0.06)' }
                        }}
                    >
                        Register
                    </Button>
                    <Button
                        variant="contained"
                        component={Link}
                        to="/signIn"
                        sx={{
                            background: 'linear-gradient(135deg, #7b1fa2, #512da8)',
                            color: 'white',
                            fontWeight: 600,
                            textTransform: 'none',
                            boxShadow: '0 4px 12px rgba(123, 31, 162, 0.3)'
                        }}
                    >
                        Log In
                    </Button>
                </Box>
            </Toolbar>
        </AppBar>
    );
};

export default WelcomeHeader;
