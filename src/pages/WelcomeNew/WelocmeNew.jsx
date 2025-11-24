import React, { useState, useEffect } from 'react';
import { AppBar, Toolbar, Typography, Button, Container, Box, Divider, Tooltip, Grid } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import '../Welcome/styles/pageStyle.css';
import { pageConstants } from './constants/pageConstants.js';
import omgLogo from '../../assets/omg-logo.png';
import { useLoading } from "../../hooks/loadingIndicatorContext.jsx";
import { useUser } from "../../core/access/userContext.jsx";
import { getUserDetails } from './services/service.js';

const WelcomeNew = () => {
  const [activeSection, setActiveSection] = useState('aboutSimulation');
  const { setIsLoading } = useLoading();
  const [userDetailsData, setUserDetailsData] = useState(null);
  const { login, setUserInfo } = useUser();
  const routeHistory = useNavigate();

  useEffect(() => {
    if (userDetailsData && userDetailsData.length > 0) {
      login(userDetailsData[0]?.Role);
      setUserInfo(userDetailsData[0]);
      routeHistory("/operationGame/homePage");
    }
  }, [userDetailsData]);

  const shortTitles = {
    aboutSimulation: 'Welcome',
    aboutUs: 'About',
    aboutApp: 'OMG?',
    forWhom: 'For Whom',
    howItWorks: 'Process Flow',
    benefits: 'Learning Outcomes',
  };

  const onDemoClick = () => {
    setIsLoading(true);
    getUserDetails({ userEmail: 'guest@guest.com' })
      .then((response) => {
        if (response) setUserDetailsData(response.data);
      })
      .catch(() => null)
      .finally(() => setIsLoading(false));
  };

  return (
    <Box>
      {/* AppBar */}
      <AppBar position="static" sx={{ backgroundColor: '#002b5c' }}>
        <Toolbar>
          <img src={omgLogo} alt="OMG Logo" style={{ width: 40, height: 40, marginRight: 8 }} />
          <Typography variant="h6" sx={{ flexGrow: 1, fontWeight: 'bold', color: 'white' }}>
            OPERATION MANAGEMENT GAME
          </Typography>

          {pageConstants?.toolBarSections.map((section) => (
            <Tooltip key={section?.key} title={section?.title} arrow>
              <Button onClick={() => setActiveSection(section?.key)} sx={{ fontWeight: 'bold', color: 'white' }}>
                {shortTitles[section?.key] || section?.title}
              </Button>
            </Tooltip>
          ))}

          <Button variant="outlined" sx={{ color: 'white', borderColor: 'white', mx: 1 }} onClick={onDemoClick}>
            Demo
          </Button>
          <Button variant="outlined" sx={{ color: 'white', borderColor: 'white', mx: 1 }} component={Link} to="/register">
            Register
          </Button>
          <Button variant="contained" sx={{ backgroundColor: '#00bf72', color: 'white' }} component={Link} to="/signIn">
            Sign In
          </Button>
        </Toolbar>
      </AppBar>

      {/* Hero Banner */}
      <Box sx={{
        backgroundImage: 'url(/assets/hero-supplychain.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        color: 'white',
        textAlign: 'center',
        py: 8,
        px: 2
      }}>
        <Typography variant="h3" sx={{ fontWeight: 'bold', mb: 2 }}>
          Welcome to Operation Management Game
        </Typography>
        <Typography variant="h6" sx={{ maxWidth: '600px', mx: 'auto', mb: 4 }}>
          Learn, Simulate and Master operations through Interactive Game Play
        </Typography>
        <Box>
          <Button variant="contained" sx={{ backgroundColor: '#00bf72', color: 'white', mx: 1 }} onClick={onDemoClick}>
            Play Demo
          </Button>
          <Button variant="outlined" sx={{ color: 'white', borderColor: 'white', mx: 1 }} component={Link} to="/register">
            Register
          </Button>
          <Button variant="outlined" sx={{ color: 'white', borderColor: 'white', mx: 1 }} component={Link} to="/signIn">
            Sign In
          </Button>
        </Box>
      </Box>

      {/* Dynamic Section Rendering */}
      <Container sx={{ py: 6 }}>
        {pageConstants.toolBarSections.map((section) => (
          section.key === activeSection && (
            <Box key={section.key}>
              <Typography variant="h5" sx={{ mb: 2, fontWeight: 'bold', color: '#002b5c' }}>
                {section.title}
              </Typography>
              <Typography variant="body1" sx={{ mb: 2 }}>
                {section.content}
              </Typography>

              {/* Process Flow Icons */}
              {section.key === 'howItWorks' && (
                <Grid container spacing={4} justifyContent="center">
                  {[
                    { icon: "🎯", label: "Strategy" },              // 🎯 Target icon for planning
                    { icon: "📈", label: "Market Dynamics" },       // 📈 Graph icon for market forces
                    { icon: "⚙️", label: "Operation Decision" },    // ⚙️ Gear icon for operational choices
                    { icon: "🧪", label: "Simulation-run of Operation" } // 🧪 Lab flask for simulation
                  ].map((stage, idx) => (
                    <Grid item key={idx} xs={6} md={3} sx={{ textAlign: 'center' }}>
                      <Typography variant="h3">{stage.icon}</Typography>
                      <Typography variant="subtitle1">{stage.label}</Typography>
                    </Grid>
                  ))}
                </Grid>
              )}

              <Divider sx={{ my: 4 }} />
            </Box>
          )
        ))}
      </Container>

      {/* Footer */}
      <Box sx={{ backgroundColor: '#002b5c', color: 'white', py: 4 }}>
        <Container sx={{ textAlign: 'center' }}>
          <Typography variant="body2" sx={{ mb: 1 }}>
            © {new Date().getFullYear()} Operation Management Game
          </Typography>
          <Typography variant="body2">
            Placeholder Links: About | Contact | Privacy | Terms
          </Typography>
        </Container>
      </Box>
    </Box>
  );
};

export default WelcomeNew;
