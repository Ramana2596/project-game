// ==========================================
// Component: WelcomeOmtp (Intro + Auth Bridge)
// ==========================================

import React from 'react';
import { Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useLoading } from "../../hooks/loadingIndicatorContext.jsx";
import { useUser } from "../../core/access/userContext.jsx";
import { getUserDetails } from '../Welcome/services/service.js';

// Change pageStyle -> layoutStyle
import {
  colors,
  layoutStyle, // <--- replaced pageStyle
  cardStyle,
  buttonStyle,
} from "../../ux/styles";

import OmtpNavbar from './components/OmtpNavbar';
import HeroSection from './components/HeroSection';
import VideoIntro from './components/VideoIntro';
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
  const { login, setUserInfo, userInfo } = useUser();

  // Purpose: Authenticate guest and open demo simulation
  const handleOpenDemo = () => {
    setIsLoading(true);

    // Read gameId from UserContext
    const activeGameId = userInfo?.gameId || "OpsMgt";

    getUserDetails({ gameId: activeGameId, userEmail: "guest@guest.com" })
      .then((response) => {
        const userData = response?.data?.data?.[0];

        if (response?.data?.success !== false && userData) {
          login({
            User_Id: userData.User_Id,
            User_Login: userData.User_Login,
            RL_Id: userData.RL_Id,
            Role: userData.Role
          });

          setUserInfo(userData);
          navigate("/operationGame/demo");
        } else {
          console.error(
            "Auth failed:",
            response?.data?.message || "Demo login failed. User not found."
          );
        }
      })
      .catch((err) => {
        const errorMsg =
          typeof err?.response?.data === "string" && err.response.data
            ? err.response.data
            : err;
        console.error("Network Error:", errorMsg);
      })
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
          <Box sx={layoutStyle.section}>
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