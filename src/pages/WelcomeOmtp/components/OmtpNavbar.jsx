// ==========================================
// Component: OMTP Navigation Bar (Variant-driven)
// ==========================================

import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box, Container } from '@mui/material';
import { colors } from '../../../ux/styles/ColorPalette';
import { buttonStyles } from '../../../ux/styles/ButtonStyle';
import { cardStyles } from '../../../ux/styles/CardStyle';

// Purpose: Top navigation with demo and auth access
const OmtpNavbar = ({ onViewDemo, onGetStarted }) => (
  <AppBar 
    position="sticky" 
    color="inherit" 
    elevation={0} 
    sx={{ 
      py: 1, 
      bgcolor: 'rgba(255, 255, 255, 0.95)', 
      backdropFilter: 'blur(8px)', 
      borderBottom: `1px solid ${colors.border || '#e0e0e0'}`
    }}
  >
    <Container maxWidth="lg">
      <Toolbar disableGutters sx={{ justifyContent: 'space-between' }}>
        
        {/* Logo and platform branding */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, cursor: 'pointer' }}>
          <Box sx={{ ...cardStyles.iconBox, width: 40, height: 40, borderRadius: 2 }}>
            <Box sx={{ width: 18, height: 18, border: '3px solid white', borderRadius: '50%' }} />
          </Box>
          <Box>
            <Typography 
              variant="h6" 
              sx={{ 
                fontWeight: 900, 
                lineHeight: 1, 
                color: colors.title || '#000000', 
                letterSpacing: -0.5 
              }}
            >
              OMTP
            </Typography>
            <Typography 
              variant="caption" 
              sx={{ 
                color: colors.subtitle || '#666666', 
                fontWeight: 600, 
                textTransform: 'uppercase', 
                letterSpacing: 0.5 
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
              variant="body1" 
              sx={{ 
                fontWeight: 700, 
                color: colors.subtitle || '#666666', 
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
              ...buttonStyles.secondary,
              borderRadius: '100px',
              fontSize: '1rem',
              px: 3.5, 
              py: 1.25,
            }}
          >
            View Demo
          </Button>

          <Button 
            variant="contained"
            onClick={onGetStarted}
            sx={{ 
              ...buttonStyles.primary,
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
