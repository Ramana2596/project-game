// ==========================================================
// Component Name : WebOmtp
// Module         : WebOmtp (Landing)
// Purpose        : Landing page orchestrator - composes sections for Students, Academia,
//                  Professionals and Industry; owns navigation state and demo/sign-in actions
// Author/Version : UXLab V1.3 / v1.1
// AI Tags        : landing, page, orchestrator, omtp, students, academia, professionals, industry
// ==========================================================

// Imports
import React from "react";
import { Box } from "@mui/material";
import { colors } from "../../ux/styles";
import ToastMessage from "../../components/ToastMessage.jsx";
import useWebActions from "./hooks/useWebActions.js";
import useScrollSpy from "./hooks/useScrollSpy.js";
import { SECTION_IDS } from "./constants/nav.js";
import Navbar from "./components/Navbar.jsx";
import OmtpWelcome from "./components/OmtpWelcome.jsx"; // NEW: opening welcome section
import Hero from "./components/Hero.jsx"; // earlier hero, retained but inactive
import WhyChoose from "./components/WhyChoose.jsx";
import Audiences from "./components/Audiences.jsx";
import Journey from "./components/Journey.jsx";
import Steps from "./components/Steps.jsx";
import Features from "./components/Features.jsx";
import Industry from "./components/Industry.jsx";
import Pricing from "./components/Pricing.jsx";
import About from "./components/About.jsx";
import FinalCta from "./components/FinalCta.jsx";
import Footer from "./components/Footer.jsx";

// Constants: switch sections on/off without touching the render tree (root Box applies border-box so width:100% + padding never overflows)
const IsActive = {
  Navbar: true, OmtpWelcome: true, Hero: true, WhyChoose: true, Audiences: true, Journey: true, Steps: true, Features: true,
  Industry: true, Pricing: true, About: true, FinalCta: true, Footer: true,
};

const WebOmtp = () => {
  // Business logic: demo login, sign-in, contact and scroll
  const { alertData, closeAlert, openDemo, getStarted, scrollTo, runAction } = useWebActions();

  // State: nav tab in view
  const [activeId, setActiveId] = useScrollSpy(SECTION_IDS);

  // Event handler: navigate to a section and highlight its tab
  const handleNav = (id) => {
    setActiveId(id);
    scrollTo(id);
  };

  // AI Extension Hooks (placeholders): Learning Coach, Content Recommendation, Facilitator Assistant

  // Render
  return (
    <Box sx={{ minHeight: "100vh", background: colors.page, "& *, & *::before, & *::after": { boxSizing: "border-box" } }}>
      {IsActive.Navbar && <Navbar activeId={activeId} onNav={handleNav} onDemo={openDemo} onStart={getStarted} />}
      <Box component="main">
        {IsActive.OmtpWelcome && <OmtpWelcome onExplore={() => handleNav("overview")} onStart={getStarted} />}
        {IsActive.Hero && <Hero onDemo={openDemo} onStart={getStarted} />}
        {IsActive.WhyChoose && <WhyChoose />}
        {IsActive.Audiences && <Audiences onAction={runAction} />}
        {IsActive.Journey && <Journey />}
        {IsActive.Steps && <Steps />}
        {IsActive.Features && <Features />}
        {IsActive.Industry && <Industry onAction={runAction} />}
        {IsActive.Pricing && <Pricing onAction={runAction} />}
        {IsActive.About && <About />}
        {IsActive.FinalCta && <FinalCta onDemo={openDemo} onStart={getStarted} />}
      </Box>
      {IsActive.Footer && <Footer />}
      <ToastMessage open={alertData.open} message={alertData.message} severity={alertData.severity} onClose={closeAlert} />
    </Box>
  );
};

export default WebOmtp;