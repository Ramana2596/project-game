import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, Button, Container, Box, Grid, Card, CardContent } from '@mui/material';
import { Link } from 'react-router-dom';
import '../Welcome/styles/pageStyle.css';
import { pageConstants } from './constants/pageConstants';
import omgLogo from '../../assets/omg-logo.png';
import imgHowItWorks from '../../assets/welcome-page/how-it-works.jpg';
import imgWhatIsOmg from '../../assets/welcome-page/what-is-omg.jpg';
import imgLearningOutcome from '../../assets/welcome-page/learning-outcome.jpg';
import { useLoading } from "../../hooks/loadingIndicatorContext.jsx";
import { useUser } from "../../core/access/userContext.jsx";
import { getUserDetails } from './services/service.js';
import { useNavigate } from "react-router-dom";
import RocketLaunchIcon from '@mui/icons-material/RocketLaunch';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

const WelcomePage = () => {
    const [activeSection, setActiveSection] = useState('aboutSimulation');
    const [displaySection, setDisplaySection] = useState(activeSection);
    const { setIsLoading } = useLoading();
    const { login, setUserInfo } = useUser();
    const navigate = useNavigate();

    const shortTitles = {
        aboutSimulation: 'Welcome',
        aboutUs: 'About',
        aboutApp: 'OMG?',
        forWhom: 'For Whom',
        howItWorks: 'How it Works',
        benefits: 'Learning',
    };

    const imagesByKey = {
        howitworks: imgHowItWorks,
        whatisomg: imgWhatIsOmg,
        learningoutcome: imgLearningOutcome,
    };

    // Handle demo user login
    const handleDemoLogin = () => {
        setIsLoading(true);
        getUserDetails({ userEmail: 'guest@guest.com' })
            .then((response) => {
                const userData = response?.data?.data?.[0];
                if (userData) {
                    login(userData.Role);
                    setUserInfo(userData);
                    navigate("/operationGame/homePage");
                } else {
                    console.log('Demo user not found in response.');
                }
            })
            .catch(() => {
                console.log('Demo user not found in response.');
            })
            .finally(() => setIsLoading(false));
    };

    // Get active section object
    const active = pageConstants.toolBarSections.find(s => s.key === displaySection) || pageConstants.toolBarSections[0];

    const findImageForSection = (section) => {
        if (!section) return null;
        const key = (section.key || '').toLowerCase();
        if (key === 'howitworks') return { name: 'how-it-works', src: imagesByKey.howitworks };
        if (key === 'aboutapp') return { name: 'what-is-omg', src: imagesByKey.whatisomg };
        if (key === 'benefits') return { name: 'learning-outcome', src: imagesByKey.learningoutcome };
        return null;
    };

    const appBarRef = React.useRef(null);
    const isProgrammaticScroll = React.useRef(false);

    // Initialize scroll margin on mount and window resize
    React.useEffect(() => {
        const updateScrollMargin = () => {
            const headerHeight = appBarRef.current?.offsetHeight || 80;
            document.documentElement.style.setProperty('--welcome-scroll-margin', `${headerHeight}px`);
        };
        updateScrollMargin();
        window.addEventListener('resize', updateScrollMargin);
        return () => window.removeEventListener('resize', updateScrollMargin);
    }, []);

    // Build image order map for alternating layout
    const imageSectionsOrder = React.useMemo(() => {
        const map = {};
        let counter = 0;
        pageConstants.toolBarSections.forEach(s => {
            if (findImageForSection(s)) {
                map[s.key] = counter++;
            }
        });
        return map;
    }, []);

    return (
        <Box className="welcome-root" sx={{ minHeight: '100vh' }}>
            {/* AppBar - modern glass morphism */}
            <AppBar ref={appBarRef} position="fixed" color="transparent" elevation={0} sx={{
                background: 'rgba(255,255,255,0.95)',
                backdropFilter: 'blur(12px)',
                borderBottom: '1px solid rgba(0,0,0,0.08)',
                transition: 'all 0.3s ease'
            }}>
                <Toolbar sx={{ display: 'flex', gap: 2, py: 1 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                        <Box sx={{
                            width: 48,
                            height: 48,
                            borderRadius: '12px',
                            background: 'linear-gradient(135deg, #7b1fa2, #512da8)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            boxShadow: '0 4px 12px rgba(123, 31, 162, 0.25)'
                        }}>
                            <img src={omgLogo} alt="OMG Logo" style={{ width: 32, height: 32 }} />
                        </Box>
                        <Typography variant="h6" sx={{ fontWeight: 800, background: 'linear-gradient(135deg, #7b1fa2, #512da8)', backgroundClip: 'text', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>OMG</Typography>
                    </Box>

                    <Box sx={{ flexGrow: 1 }} />

                    <Box sx={{ display: 'flex', gap: 0.5, alignItems: 'center' }}>
                        {pageConstants?.toolBarSections.map((section) => (
                            <Button
                                key={section.key}
                                component="a"
                                href={`#${section.key}`}
                                onClick={() => {
                                    isProgrammaticScroll.current = true;
                                    window.clearTimeout(window.__welcomeScrollTimer);
                                    window.__welcomeScrollTimer = window.setTimeout(() => {
                                        isProgrammaticScroll.current = false;
                                    }, 900);
                                    setDisplaySection(section.key);
                                    setActiveSection(section.key);
                                }}
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

                    <Box sx={{ display: 'flex', gap: 1, ml: 3 }}>
                        <Button
                            variant="text"
                            onClick={handleDemoLogin}
                            sx={{ color: '#7b1fa2', fontWeight: 600, textTransform: 'none' }}
                        >
                            Demo
                        </Button>
                        <Button variant="outlined" component={Link} to="/register" sx={{ borderColor: '#7b1fa2', color: '#7b1fa2', fontWeight: 600, textTransform: 'none', '&:hover': { bgcolor: 'rgba(123, 31, 162, 0.06)' } }}>Register</Button>
                        <Button variant="contained" component={Link} to="/signIn" sx={{ background: 'linear-gradient(135deg, #7b1fa2, #512da8)', color: 'white', fontWeight: 600, textTransform: 'none', boxShadow: '0 4px 12px rgba(123, 31, 162, 0.3)' }}>Sign In</Button>
                    </Box>
                </Toolbar>
            </AppBar>

            {/* Modern Hero Section with gradient overlay */}
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
                                    Master Business Operations
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
                                            Interactive Business Simulation
                                        </Typography>
                                    </Box>
                                </Box>
                            </Box>
                        </Grid>
                    </Grid>
                </Container>
            </Box>

            {/* Sections (full-width) - clicking nav scrolls to each; alternate image position per index */}
            <Box sx={{ bgcolor: 'white', py: 10 }}>
                {pageConstants.toolBarSections.map((section, idx) => {
                    const imgEntry = findImageForSection(section);
                    const img = imgEntry ? imgEntry.src : null;
                    // decide side: alternate based on the order among image-bearing sections (image left, next right, ...)
                    let side = 'right';
                    if (img) {
                        const imageIndex = imageSectionsOrder[section.key];
                        if (typeof imageIndex === 'number') {
                            side = (imageIndex % 2 === 0) ? 'left' : 'right';
                        } else {
                            // fallback: alternate by full-section index
                            side = (idx % 2 === 0) ? 'right' : 'left';
                        }
                        // Force specific mapping: ensure the "what-is-omg" image is on the right with content left
                        if (imgEntry && imgEntry.name === 'what-is-omg') {
                            side = 'right';
                        }
                    }

                    return (
                        <Box id={section.key} key={section.key} sx={{ py: 8, scrollMarginTop: 'var(--welcome-scroll-margin, 80px)' }}>
                            <Container maxWidth="lg">
                                {img ? (
                                    <Grid container spacing={6} alignItems="center">
                                        {side === 'left' ? (
                                            <>
                                                <Grid item xs={12} md={6}>
                                                    <Box sx={{
                                                        borderRadius: '16px',
                                                        overflow: 'hidden',
                                                        boxShadow: '0 12px 40px rgba(11, 8, 33, 0.1)',
                                                        aspectRatio: '4/3'
                                                    }}>
                                                        <img src={img} alt={section.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                                    </Box>
                                                </Grid>
                                                <Grid item xs={12} md={6}>
                                                    <Typography variant="h4" sx={{ fontWeight: 800, mb: 3, color: 'text.primary' }}>
                                                        {section.title}
                                                    </Typography>
                                                    <Box sx={{ color: 'text.secondary', lineHeight: 1.8 }}>
                                                        {section.content}
                                                    </Box>
                                                </Grid>
                                            </>
                                        ) : (
                                            <>
                                                <Grid item xs={12} md={6}>
                                                    <Typography variant="h4" sx={{ fontWeight: 800, mb: 3, color: 'text.primary' }}>
                                                        {section.title}
                                                    </Typography>
                                                    <Box sx={{ color: 'text.secondary', lineHeight: 1.8 }}>
                                                        {section.content}
                                                    </Box>
                                                </Grid>
                                                <Grid item xs={12} md={6}>
                                                    <Box sx={{
                                                        borderRadius: '16px',
                                                        overflow: 'hidden',
                                                        boxShadow: '0 12px 40px rgba(11, 8, 33, 0.1)',
                                                        aspectRatio: '4/3'
                                                    }}>
                                                        <img src={img} alt={section.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                                    </Box>
                                                </Grid>
                                            </>
                                        )}
                                    </Grid>
                                ) : (
                                    <Box>
                                        <Typography variant="h4" sx={{ fontWeight: 800, mb: 3, color: 'text.primary' }}>
                                            {section.title}
                                        </Typography>
                                        <Box sx={{ color: 'text.secondary', lineHeight: 1.8 }}>
                                            {section.content}
                                        </Box>
                                    </Box>
                                )}
                            </Container>
                        </Box>
                    );
                })}
            </Box>

            {/* CTA Section */}
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

            {/* Footer */}
            <Box component="footer" sx={{ mt: 8, py: 6, borderTop: '1px solid rgba(255,255,255,0.06)', bgcolor: 'transparent' }}>
                <Container maxWidth="lg">
                    <Grid container spacing={3} alignItems="center">
                        <Grid item xs={12} md={6}>
                            <Typography variant="h6" sx={{ color: 'text.primary' }}>Contact Us</Typography>
                            <Box sx={{ display: 'flex', gap: 2, alignItems: 'center', mt: 1 }}>
                                <EmailIcon sx={{ color: 'rgba(30,30,30,0.7)' }} />
                                <Typography variant="body2" sx={{ color: 'text.secondary' }}>info@operationsgame.example</Typography>
                            </Box>
                            <Box sx={{ display: 'flex', gap: 2, alignItems: 'center', mt: 1 }}>
                                <PhoneIcon sx={{ color: 'rgba(30,30,30,0.7)' }} />
                                <Typography variant="body2" sx={{ color: 'text.secondary' }}>+91 00000 00000</Typography>
                            </Box>
                        </Grid>
                        <Grid item xs={12} md={6} sx={{ textAlign: { xs: 'left', md: 'right' } }}>
                            <Typography variant="body2" sx={{ color: 'text.secondary' }}>© {new Date().getFullYear()} OMG — All rights reserved.</Typography>
                        </Grid>
                    </Grid>
                </Container>
            </Box>
        </Box>
    );
}

export default WelcomePage;