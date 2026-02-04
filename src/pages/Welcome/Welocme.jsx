import React, { useState } from 'react';
import { Box } from '@mui/material';
import '../Welcome/styles/pageStyle.css';
import { pageConstants } from './constants/pageConstants';
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
import ToastMessage from '../../components/ToastMessage';
// Constants and Logic
import { API_STATUS, API_STATUS_MAP } from '../../utils/statusCodes';

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
    //  Alert state for toast messages
    const [alertData, setAlertData] = useState({
        open: false,
        message: '',
        severity: 'info' // 'success' | 'error' | 'warning' | 'info'
    });

    // Function to close the toast
    const handleCloseAlert = () => {
        setAlertData(prev => ({ ...prev, open: false }));
    };

    const shortTitles = {
        aboutSimulation: 'Welcome',
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

    // Handle demo user login 
    // Complete info (User_Id,User_Login, RL_Id, Role)
    const handleDemoLogin = () => {
        setIsLoading(true);
        getUserDetails({ userEmail: 'guest@guest.com', gameId: 'OpsMgt' })
            .then((response) => {
                const { returnStatus, data } = response.data;

                if (returnStatus === API_STATUS.SUCCESS && data?.length > 0) {
                    const userData = data[0];

                    login({
                        User_Id: userData.User_Id,
                        User_Login: userData.User_Login,
                        RL_Id: userData.RL_Id,
                        Role: userData.Role
                    });

                    setUserInfo(userData);
                    navigate("/operationGame/demoWizard");
                } else {
                    const statusConfig = API_STATUS_MAP[returnStatus] || {};
                    const apiMessage = response.data.message;

                    setAlertData({
                        open: true,
                        message: apiMessage || statusConfig.defaultMsg || "Error",
                        severity: statusConfig.severity || "error"
                    });
                } // This closes the 'else'
            }) // This closes the '.then'
            .catch((error) => {
                setAlertData({
                    open: true,
                    message: "Network Error",
                    severity: "error"
                });
            })
            .finally(() => setIsLoading(false));
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

    // Initialize scroll margin on mount and window resize
    React.useEffect(() => {
        const updateScrollMargin = () => {
            const headerHeight = appBarRef.current?.offsetHeight || 80;
            document.documentElement.style.setProperty('--welcome-scroll-margin', `${headerHeight}px`);
        };
        updateScrollMargin();
        window.addEventListener('resize', updateScrollMargin);
        return () =>
            window.removeEventListener('resize', updateScrollMargin);
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
            <ToastMessage
                open={alertData.open}
                message={alertData.message}
                severity={alertData.severity}
                onClose={handleCloseAlert}
            />
        </Box>

    );
}

export default WelcomePage;