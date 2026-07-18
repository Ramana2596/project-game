import React from "react";
import { AppBar, Toolbar, Button, Box } from "@mui/material";
import { Link } from "react-router-dom";

import { pageConstants } from "../constants/pageConstants";
import OmtpLogo from "../../../assets/GreenTree.png";

import {
    buttonStyle,
    colors,
    semanticTypo,
} from "../../../ux/styles";

const WelcomeHeader = ({
  activeSection,
  setActiveSection,
  setDisplaySection,
  shortTitles,
  handleDemoLogin,
  appBarRef,
}) => {
  const isProgrammaticScroll = React.useRef(false);

  const handleNavClick = (section) => {
    isProgrammaticScroll.current = true;

    window.clearTimeout(window.__welcomeScrollTimer);

    window.__welcomeScrollTimer = window.setTimeout(() => {
      isProgrammaticScroll.current = false;
    }, 900);

    setDisplaySection(section.key);
    setActiveSection(section.key);
  };

  return (
    <AppBar
      ref={appBarRef}
      position="fixed"
      color="transparent"
      elevation={0}
      sx={{
        background: "rgba(255,255,255,0.92)",
        backdropFilter: "blur(18px)",
        borderBottom: `1px solid ${colors.divider}`,
        boxShadow: "0 4px 24px rgba(123,31,162,.08)",
        transition: "all .30s ease",
      }}
    >
      <Toolbar
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 2,
          minHeight: 72,
          py: 0.75,
        }}
      >
        {/* Logo */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1.5,
          }}
        >
          <Box
            sx={{
              width: 54,
              height: 54,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <img
              src={OmtpLogo}
              alt="OMTP Logo"
              style={{
                height: 62,
                width: "auto",
              }}
            />
          </Box>
        </Box>

        <Box sx={{ flexGrow: 1 }} />

        {/* Navigation */}
        <Box
          sx={{
            display: "flex",
            gap: 0.75,
            alignItems: "center",
          }}
        >
          {pageConstants?.toolBarSections.map((section) => (
            <Button
              key={section.key}
              component="a"
              href={`#${section.key}`}
              onClick={() => handleNavClick(section)}
              sx={{
                ...semanticTypo.bodyB2,

                textTransform: "none",

                color:
                  activeSection === section.key
                    ? colors.white
                    : colors.subtitle,

                fontWeight:
                  activeSection === section.key
                    ? 700
                    : 500,

                px:
                  activeSection === section.key
                    ? 2.25
                    : 1,

                py:
                  activeSection === section.key
                    ? 0.75
                    : 0.5,

                borderRadius: "50px",

                background:
                  activeSection === section.key
                    ? colors.heroGradient
                    : "transparent",

                boxShadow:
                  activeSection === section.key
                    ? `0 4px 12px ${colors.primary}40`
                    : "none",

                transition:
                  "all .25s cubic-bezier(.34,1.56,.64,1)",

                "&:hover": {
                  color:
                    activeSection === section.key
                      ? colors.white
                      : colors.primary,

                  background:
                    activeSection === section.key
                      ? colors.heroGradient
                      : colors.hover,

                  transform: "translateY(-1px)",
                },
              }}
            >
              {shortTitles[section.key] || section.title}
            </Button>
          ))}
        </Box>
        {/* Auth Buttons */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1.25,
            ml: 3,
          }}
        >
          <Button
            variant="text"
            onClick={handleDemoLogin}
            sx={{
              ...buttonStyle.text,
              color: colors.primary,
            }}
          >
            Demo
          </Button>

          <Button
            variant="contained"
            component={Link}
            to="/login"
            sx={{
              ...buttonStyle.primary,
              boxShadow: `0 4px 12px ${colors.primary}40`,
              "&:hover": {
                background: colors.heroGradient,
                boxShadow: "0 6px 18px rgba(123,31,162,.45)",
                transform: "translateY(-1px)",
              },
            }}
          >
            Sign In / Sign Up
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default WelcomeHeader;
