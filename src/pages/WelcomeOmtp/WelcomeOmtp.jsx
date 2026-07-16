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

// ==========================================================
// Page Configuration
// ==========================================================


const IsActive = {
  HeroSection: true,
  VideoIntro: true,
  ValueProps: true,
  WalkThroughSection: true,
  InfoDeskView: true,
  TargetAudience: true,
  WhatLearnersGain: true,
  PricingSection: true,
  FinalCTA: true,
  Footer: true,
};

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

          navigate("/operationGame/demo");
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
    <Box
      component="div"
      sx={{
        minHeight: "100vh",
        background: colors.page,
      }}
    >
      {/* Purpose: Top navigation */}
      <OmtpNavbar
        onBack={handleBackToHome}
        onViewDemo={handleOpenDemo}
        onGetStarted={handleAuthNavigation}
      />

      <Box
        component="main"
        sx={{ display: "block" }}
      >

        {/* Purpose: Hero and product positioning */}
        {IsActive.HeroSection && (
          <HeroSection
            handleDemoLogin={handleOpenDemo}
          />
        )}

        {/* Purpose: Product introduction video */}
        {IsActive.VideoIntro && (
          <VideoIntro />
        )}

        {/* Purpose: Core value proposition */}
        {IsActive.ValueProps && (
          <ValueProps />
        )}

        {/* Purpose: Product walkthrough */}
        {IsActive.WalkThroughSection && (
          <WalkThroughSection />
        )}

        {/* Purpose: Information dashboard preview */}
        {IsActive.InfoDeskView && (
          <Box sx={pageStyle.section}>
            <InfoDeskView />
          </Box>
        )}

        {/* Purpose: Target users */}
        {IsActive.TargetAudience && (
          <TargetAudience />
        )}

        {/* Purpose: Learning outcomes */}
        {IsActive.WhatLearnersGain && (
          <WhatLearnersGain />
        )}

        {/* Purpose: Pricing plans */}
        {IsActive.PricingSection && (
          <PricingSection />
        )}

        {/* Purpose: Final Call-to-Action */}
        {IsActive.FinalCTA && (
          <FinalCTA
            onStart={handleOpenDemo}
          />
        )}
        
        {/* Purpose: Footer */}
        {IsActive.Footer && (
          <Footer />
        )}

      </Box>
    </Box>
  );
};

export default WelcomeOmtp;