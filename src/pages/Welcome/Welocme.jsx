import React, { useState } from 'react';
import { Box } from '@mui/material';
import '../Welcome/styles/pageStyle.css';
import { pageConstants } from './constants/pageConstants';
import imgHowItWorks from '../../assets/welcome-page/how-it-works.jpg';
import imgWhatIsOmg from '../../assets/welcome-page/what-is-omg.jpg';
import imgLearningOutcome from '../../assets/welcome-page/learning-outcome.jpg';
import { useLoading } from "../../hooks/loadingIndicatorContext.jsx";
import { useUser } from "../../core/access/userContext.jsx";
import { getUserDetails } from './services/service.js';
import { useNavigate } from "react-router-dom";

// Component imports
import WelcomeHeader from './components/WelcomeHeader';
import HeroSection from './components/HeroSection';
import ContentSections from './components/ContentSections';
import CTASection from './components/CTASection';
import GamePhasesSection from './components/GamePhasesSection';
import WelcomeFooter from './components/WelcomeFooter';

const WelcomePage = () => {
    const [activeSection, setActiveSection] = useState('aboutSimulation');
    const [displaySection, setDisplaySection] = useState(activeSection);
    const { setIsLoading } = useLoading();
    const { login, setUserInfo } = useUser();
    const navigate = useNavigate();

    const shortTitles = {
        aboutSimulation: 'Welcome',
        aboutUs: 'About',
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
                }
            })
            .catch(() => {
                navigate("/operationGame/homePage");
            })
            .finally(() => setIsLoading(false));
    };

    const findImageForSection = (section) => {
        if (!section) return null;
        const key = (section.key || '').toLowerCase();
        if (key === 'howitworks') return { name: 'how-it-works', src: imagesByKey.howitworks };
        if (key === 'aboutapp') return { name: 'what-is-omg', src: imagesByKey.whatisomg };
        if (key === 'benefits') return { name: 'learning-outcome', src: imagesByKey.learningoutcome };
        return null;
    };

    const appBarRef = React.useRef(null);

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
            <WelcomeHeader
                activeSection={activeSection}
                setActiveSection={setActiveSection}
                setDisplaySection={setDisplaySection}
                shortTitles={shortTitles}
                handleDemoLogin={handleDemoLogin}
                appBarRef={appBarRef}
            />

            <HeroSection handleDemoLogin={handleDemoLogin} />

            <ContentSections
                pageConstants={pageConstants}
                findImageForSection={findImageForSection}
                imageSectionsOrder={imageSectionsOrder}
            />

            <CTASection handleDemoLogin={handleDemoLogin} />

            <GamePhasesSection />

            <WelcomeFooter />
        </Box>
    );
}

export default WelcomePage;