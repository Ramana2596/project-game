// ==========================================
// Component: WelcomeOmtp (Intro + Auth Bridge)
// ==========================================

import React from 'react';
import { Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useLoading } from "../../hooks/loadingIndicatorContext.jsx";
import { useUser } from "../../core/access/userContext.jsx";
import { getUserDetails } from '../Welcome/services/service.js'; 
import { API_STATUS } from '../../utils/statusCodes';
import {
    colors,
    pageStyle,
} from "../../ux/styles";

import OmtpNavbar from './components/OmtpNavbar';
import HeroSection from './components/HeroSection';
import VideoIntro from './components/VideoIntro'; 
//import CorePillars from './components/CorePillars'; 
import ValueProps from './components/ValueProps';   
import WalkThroughSection from './components/WalkThroughSection';
import InfoDeskView from './components/InfoDeskView';
import TargetAudience from './components/TargetAudience';
import WhatLearnersGain from './components/WhatLearnersGain';
import PricingSection from './components/PricingSection';
import FinalCTA from './components/FinalCTA';
import Footer from './components/Footer';

const WelcomeOmtp = () => {
  // Purpose: Navigation and global context access
  const navigate = useNavigate();
  const { setIsLoading } = useLoading();
  const { login, setUserInfo } = useUser();

  // Purpose: Authenticate guest and open demo simulation
  const handleOpenDemo = () => {
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

          navigate("/operationGame/demoOmtp");
        } else {
          console.error("Auth failed:", response.data.message);
        }
      })
      .catch((err) => console.error("Network Error:", err))
      .finally(() => setIsLoading(false));
  };

  // Purpose: Navigate back to landing page
  const handleBackToHome = () => {
    navigate("/");
  };

  // Navigate to unified authentication hub
  const handleAuthNavigation = () => {
    navigate("/login");
  };

  return (
    <Box sx={{ minHeight: '100vh', background: colors.page, }}>
      
      {/* Purpose: Top navigation */}
      <OmtpNavbar
        onBack={handleBackToHome}
        onViewDemo={handleOpenDemo}
        onGetStarted={handleAuthNavigation}
      />

      <main>
        {/* Purpose: Hero and feature presentation */}
        <HeroSection handleDemoLogin={handleOpenDemo} />
        <VideoIntro />
        {/* <CorePillars /> */}
        <ValueProps />
        <WalkThroughSection />

        {/* Purpose: Information dashboard preview */}
        <Box sx={pageStyle.section}>
          <InfoDeskView />
        </Box>

        {/* Purpose: Value proposition sections */}
        <TargetAudience />
        <WhatLearnersGain />
        <PricingSection />

        {/* Purpose: Final CTA */}
        <FinalCTA isMarketing={true} onStart={handleOpenDemo} />
      </main>

      {/* Purpose: Footer */}
      <Footer />
    </Box>
  );
};

export default WelcomeOmtp;