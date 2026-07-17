// ==========================================
// Component: OMTP Navigation Bar (Variant-driven)
// ==========================================

import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box, Container } from '@mui/material';
import {
    buttonStyle,
    cardStyle,
    colors,
    semanticTypo,
} from "../../../ux/styles";

// Purpose: Top navigation with demo and auth access
const OmtpNavbar = ({ onViewDemo, onGetStarted }) => (
  <AppBar 
    position="sticky" 
    color="inherit" 
    elevation={0} 
    sx={{ 
      py: 1.25, 
      bgcolor: 'rgba(255, 255, 255, 0.95)', 
      backdropFilter: 'blur(8px)', 
      borderBottom: `1px solid ${colors.border || '#e0e0e0'}`
    }}
  >
    <Container maxWidth="lg">
      <Toolbar
        disableGutters
        sx={{
          justifyContent: "space-between",
          minHeight: 72,
        }}
      >        
        {/* Logo and platform branding */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, cursor: 'pointer' }}>
          <Box sx={{ ...cardStyle.iconBox, width: 40, height: 40, borderRadius: 2 }}>
            <Box sx={{ width: 18, height: 18, border: '3px solid white', borderRadius: '50%' }} />
          </Box>
          <Box>
            <Typography
              sx={{
                ...semanticTypo.cardH5,
                color: colors.primaryDark,
                lineHeight: 1,
              }}
            >
              OMTP
            </Typography>
            <Typography
              sx={{
                ...semanticTypo.caption,
                textTransform: "uppercase",
                letterSpacing: 0.5,
              }}
            >
              Operations Management Training Platform
            </Typography>
          </Box>
        </Box>

        {/* Desktop navigation links */}
        <Box sx={{ display: { xs: 'none', lg: 'flex' }, gap: 5 }}>
          {['About', 'How It Works', 'For Whom', 'Pricing'].map((item) => (
            <Typography 
              key={item}
              sx={{
                ...semanticTypo.bodyB1,
                fontWeight: 600,
                color: colors.body,
                cursor: 'pointer',
                transition: 'color 0.2s ease',
                '&:hover': { color: colors.primary }
              }}
            >
              {item}
            </Typography>
          ))}
        </Box>

        {/* CTA buttons */}
        <Box sx={{ display: 'flex', gap: 2.5, alignItems: 'center' }}>
          <Button 
            variant="outlined" 
            onClick={onViewDemo}
            sx={{ 
              ...buttonStyle.secondary,
              borderRadius: '100px',
              fontSize: '1rem',
              px: 3.5, 
              py: 1.25,
            }}
          >
            Demo
          </Button>

          <Button 
            variant="contained"
            onClick={onGetStarted}
            sx={{ 
              ...buttonStyle.primary,
              borderRadius: '100px',
              fontSize: '1rem',
              px: 3.5, 
              py: 1.25,
            }}
          >
            Get Started
          </Button>
        </Box>

      </Toolbar>
    </Container>
  </AppBar>
);

export default OmtpNavbar;
