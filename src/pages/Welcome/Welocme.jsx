import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, Button, Container, Box, Divider, Tooltip } from '@mui/material';
import { Link } from 'react-router-dom';
import '../Welcome/styles/pageStyle.css';
import { pageConstants } from './constants/pageConstants';
import omgLogo from '../../assets/omg-logo.png';
import { useLoading } from "../../hooks/loadingIndicatorContext.jsx";
import { useUser } from "../../core/access/userContext.jsx";
import { getUserDetails } from './services/service.js';
import { useNavigate } from "react-router-dom";

const WelcomePage = () => {
    const [activeSection, setActiveSection] = useState('aboutSimulation');
    const { setIsLoading } = useLoading(); // <-- Use loading context
    const [userDetailsData, setUserDetailsData] = React.useState(null);
    const { login, setUserInfo } = useUser();
    const routeHistory = useNavigate();

    React.useEffect(() => {
        if (userDetailsData && userDetailsData.length > 0) {
            login(userDetailsData[0]?.Role);
            setUserInfo(userDetailsData[0]);
            routeHistory("/operationGame/homePage");
        }
    }, [userDetailsData]);

    // Mapping short titles
    const shortTitles = {
        aboutSimulation: 'Welcome',
        aboutUs: 'About',
        aboutApp: 'OMG?',
        forWhom: 'For Whom',
        howItWorks: 'How it Works',
        benefits: 'Learning',
    };

    const onDemoClick = () => {
        setIsLoading(true);
        getUserDetails({ userEmail: 'guest@guest.com' }).then((response) => {
            if (response) {
                setUserDetailsData(response.data);
            }
        })
            .catch(() => null)
            .finally(() => setIsLoading(false));
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

                    {/*Demo & Register & Sign-In Buttons */}
                    <Button className='standard-button-third-button' sx={{ marginRight: 1 }} onClick={onDemoClick}>
                        Demo
                    </Button>
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
