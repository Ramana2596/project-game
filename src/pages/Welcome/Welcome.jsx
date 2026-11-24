// ==========================================
// Component: Welcome (Integrated with Intro)
// ==========================================

import React, { useState } from 'react';
import { Box } from '@mui/material';
import '../Welcome/styles/pageStyle.css';
import { pageConstants } from './constants/pageConstants.js';
import { useLoading } from "../../hooks/loadingIndicatorContext.jsx";
import { useUser } from "../../core/access/userContext.jsx";
import { getUserDetails } from './services/service.js';
import { useNavigate } from "react-router-dom";
import imgHowItWorks from '../../assets/welcome-page/how-it-works.jpg';
import imgWhatIsOmg from '../../assets/welcome-page/what-is-omg.jpg';
import imgLearningOutcome from '../../assets/welcome-page/learning-outcome.jpg';
import imgforWhom from '../../assets/forWhom.png';
import imgaboutUs from '../../assets/aboutUs.png';

// UI Components
import ToastMessage from '../../components/ToastMessage.jsx';

// Section Components
import WelcomeHeader from './components/WelcomeHeader.jsx';
import HeroSection from './components/HeroSection.jsx';
import ContentSections from './components/ContentSections.jsx';
import CTASection from './components/CTASection.jsx';
import SimulationPhase from './components/SimulationPhase.jsx';
import TrustedBy from './components/TrustedBy.jsx';
import WelcomeFooter from './components/WelcomeFooter.jsx';

// ==========================================================
// Page Configuration
// ==========================================================


const IsActive = {
    WelcomeHeader: true,
    HeroSection: true,
    ContentSections: true,
    CTASection: true,
    SimulationPhase: true,
    TrustedBy: true,
    WelcomeFooter: true,
};


const Welcome = () => {
    const [activeSection, setActiveSection] = useState('aboutSimulation');
    const [displaySection, setDisplaySection] = useState(activeSection);
    const { setIsLoading } = useLoading();
    const { login, setUserInfo, userInfo } = useUser();
    const navigate = useNavigate();

    // Alert state for toast messages
    const [alertData, setAlertData] = useState({
        open: false,
        message: '',
        severity: 'info'
    });

    const handleCloseAlert = () => {
        setAlertData(prev => ({ ...prev, open: false }));
    };

    // Navigation titles
    const shortTitles = {
        aboutSimulation: 'Welcome',
        omtpIntro: 'OMTP Intro',
        aboutUs: 'About',
        forWhom: 'For Whom',
        howItWorks: 'How it Works',
        benefits: 'Learning',
    };

    const imagesByKey = {
        aboutsimulation: imgWhatIsOmg,
        forwhom: imgforWhom,
        aboutus: imgaboutUs,
        howitworks: imgHowItWorks,
        whatisomg: imgWhatIsOmg,
        learningoutcome: imgLearningOutcome,
    };

    // Navigation
    React.useEffect(() => {
        if (activeSection === 'omtpIntro') {
            // Navigate to Intro page
            navigate("/operationGame/welcomeOmtp");

            setActiveSection('aboutSimulation');
        }
    }, [activeSection, navigate]);

    // Direct Demo login
    const handleDemoLogin = () => {
        setIsLoading(true);

        // Read gameId from UserContext
        const activeGameId = userInfo?.gameId || "OpsMgt";

        getUserDetails({ gameId: activeGameId, userEmail: "guest@guest.com" })
            .then((response) => {
                const userData = response?.data?.data?.[0];

                if (response?.data?.success !== false && userData) {
                    // Pass full identity info to login()
                    login({
                        User_Id: userData.User_Id,
                        User_Login: userData.User_Login,
                        RL_Id: userData.RL_Id,
                        Role: userData.Role,
                    });
                    // Set User Context to setUserInfo()
                    setUserInfo(userData);
                    navigate("/operationGame/demo");
                } else {
                    setAlertData({
                        open: true,
                        message:
                            response?.data?.message || "Demo login failed. User not found.",
                        severity: "error",
                    });
                }
            })
            .catch((err) => {
                setAlertData({
                    open: true,
                    message:
                        typeof err?.response?.data === "string" && err.response.data
                            ? err.response.data
                            : "Network Error",
                    severity: "error",
                });
            })
            .finally(() => setIsLoading(false));
    };

    // Navigate to unified login/register screen
    const handleAuthNavigation = () => {
        navigate("/login");
    };

    const findImageForSection = (section) => {
        if (!section) return null;
        const key = (section.key || '').toLowerCase();
        if (key === 'aboutsimulation') return { name: 'welcome', src: imagesByKey.aboutsimulation };
        if (key === 'forwhom') return { name: 'for-whom', src: imagesByKey.forwhom };
        if (key === 'aboutus') return { name: 'about-us', src: imagesByKey.aboutus };
        if (key === 'howitworks') return { name: 'how-it-works', src: imagesByKey.howitworks };
        if (key === 'aboutapp') return { name: 'what-is-omg', src: imagesByKey.whatisomg };
        if (key === 'benefits') return { name: 'learning-outcome', src: imagesByKey.learningoutcome };
        return null;
    };

    const appBarRef = React.useRef(null);

    // Initialize scroll margin
    React.useEffect(() => {
        const updateScrollMargin = () => {
            const headerHeight = appBarRef.current?.offsetHeight || 80;
            document.documentElement.style.setProperty('--welcome-scroll-margin', `${headerHeight}px`);
        };
        updateScrollMargin();
        window.addEventListener('resize', updateScrollMargin);
        return () => window.removeEventListener('resize', updateScrollMargin);
    }, []);

    // Build image order map
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

            {IsActive.WelcomeHeader && (
                <WelcomeHeader
                    activeSection={activeSection}
                    setActiveSection={setActiveSection}
                    setDisplaySection={setDisplaySection}
                    shortTitles={shortTitles}
                    handleDemoLogin={handleDemoLogin}
                    appBarRef={appBarRef}
                />
            )}


            {IsActive.HeroSection && (
                <HeroSection
                    handleDemoLogin={handleDemoLogin}
                    handleAuthNavigation={handleAuthNavigation}
                />
            )}

            {IsActive.ContentSections && (
                <ContentSections
                    pageConstants={pageConstants}
                    findImageForSection={findImageForSection}
                    imageSectionsOrder={imageSectionsOrder} />
            )}

            {IsActive.CTASection && (
                <CTASection handleDemoLogin={handleDemoLogin} />
            )}

            {IsActive.SimulationPhase && (
                <SimulationPhase />
            )}

            {IsActive.TrustedBy && (
                <TrustedBy />
            )}

            {IsActive.WelcomeFooter && (
                <WelcomeFooter />
            )}

            <ToastMessage
                open={alertData.open}
                message={alertData.message}
                severity={alertData.severity}
                onClose={handleCloseAlert}
            />
        </Box>
    );
}

export default Welcome;