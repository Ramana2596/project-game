// ==========================================
// Component: WelcomeOmtp (Intro + Auth Bridge)
// ==========================================

import React from 'react';
import { Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';

// ✅ Logic & Context Imports
import { useLoading } from "../../hooks/loadingIndicatorContext.jsx";
import { useUser } from "../../core/access/userContext.jsx";
import { getUserDetails } from '../Welcome/services/service.js'; 
import { API_STATUS } from '../../utils/statusCodes';

// ✅ Page Section Components
import OmtpNavbar from './components/OmtpNavbar';
import HeroSection from './components/HeroSection';
import VideoIntro from './components/VideoIntro'; 
import CorePillars from './components/CorePillars'; 
import ValueProps from './components/ValueProps';   
import WalkThroughSection from './components/WalkThroughSection';
import InfoDeskView from './components/InfoDeskView';
import TargetAudience from './components/TargetAudience';
import WhatLearnersGain from './components/WhatLearnersGain';
import PricingSection from './components/PricingSection';
import FinalCTA from './components/FinalCTA';
import Footer from './components/Footer';

const WelcomeOmtp = () => {
  const navigate = useNavigate();
  const { setIsLoading } = useLoading();
  const { login, setUserInfo } = useUser();

  // ✅ The "Master Link": Performs API Auth then Navigates
  const handleOpenDemo = () => {
    setIsLoading(true);
    
    // Authenticate as guest so the Game recognizes the session
    getUserDetails({ userEmail: 'guest@guest.com', gameId: 'OpsMgt' })
      .then((response) => {
        const { returnStatus, data } = response.data;

        if (returnStatus === API_STATUS.SUCCESS && data?.length > 0) {
          const userData = data[0];
          
          // Establish the user session
          login({
            User_Id: userData.User_Id,
            User_Login: userData.User_Login,
            RL_Id: userData.RL_Id,
            Role: userData.Role
          });
          
          setUserInfo(userData);
          
          // Now that we are logged in, move to the Demo
          navigate("/operationGame/demoOmtp");
        } else {
          console.error("Auth failed:", response.data.message);
        } 
      })
      .catch((err) => console.error("Network Error:", err))
      .finally(() => setIsLoading(false));
  };

  const handleBackToHome = () => {
    navigate("/");
  };

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: '#ffffff' }}>
      
      {/* Navigation */}
      <OmtpNavbar onBack={handleBackToHome} />
      
      <main>
        {/* Pass the authenticated function to the Hero button */}
        <HeroSection handleDemoLogin={handleOpenDemo} />
        
        <VideoIntro />
        <CorePillars />
        <ValueProps />
        <WalkThroughSection />
        
        <Box sx={{ py: 4 }}>
          <InfoDeskView />
        </Box>

        <TargetAudience />
        <WhatLearnersGain />
        <PricingSection />

        {/* Pass the authenticated function to the Final button */}
        <FinalCTA onStart={handleOpenDemo} />
      </main>

      <Footer />
    </Box>
  );
};

export default WelcomeOmtp;