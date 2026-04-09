// ==========================================
// Component: OMTP Navigation Bar
// ==========================================

import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box, Container } from '@mui/material';

const OmtpNavbar = () => (
  // sticky position keeps the navigation visible while scrolling the walkthrough
  <AppBar 
    position="sticky" 
    color="inherit" 
    elevation={0} 
    sx={{ 
      py: 1, 
      bgcolor: 'rgba(255, 255, 255, 0.9)', 
      backdropFilter: 'blur(8px)', // Modern glass effect
      borderBottom: '1px solid #f3f4f6' 
    }}
  >
    <Container maxWidth="lg">
      <Toolbar disableGutters sx={{ justifyContent: 'space-between' }}>
        
        {/* ✅ LOGO SECTION: Matches the Screenshot branding */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, cursor: 'pointer' }}>
          <Box 
            sx={{ 
              width: 40, height: 40, 
              bgcolor: '#16a34a', // Using the brand green
              borderRadius: 2, 
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              boxShadow: '0 4px 10px rgba(22, 163, 74, 0.2)'
            }} 
          >
            {/* Minimalist tree/node icon representation */}
            <Box sx={{ width: 18, height: 18, border: '3px solid white', borderRadius: '50%' }} />
          </Box>
          <Box>
            <Typography variant="h6" sx={{ fontWeight: 900, lineHeight: 1, color: '#111827', letterSpacing: -0.5 }}>
              OMTP
            </Typography>
            <Typography variant="caption" sx={{ color: '#6b7280', fontSize: '0.65rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: 0.5 }}>
              Operations Management Training Platform
            </Typography>
          </Box>
        </Box>

        {/* ✅ NAVIGATION LINKS: Centered with hover interaction */}
        <Box sx={{ display: { xs: 'none', lg: 'flex' }, gap: 4 }}>
          {['About', 'How It Works', 'For Whom', 'Pricing'].map((item) => (
            <Typography 
              key={item} 
              variant="body2" 
              sx={{ 
                fontWeight: 600, 
                color: '#4b5563', 
                cursor: 'pointer',
                transition: 'color 0.2s',
                '&:hover': { color: '#7c3aed' } 
              }}
            >
              {item}
            </Typography>
          ))}
        </Box>

        {/* ✅ ACTION BUTTONS: Matches Screenshot button styling */}
        <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
          <Button 
            variant="outlined" 
            sx={{ 
              borderRadius: '20px', 
              textTransform: 'none', 
              color: '#7c3aed', 
              borderColor: '#e5e7eb', // Light border as seen in screenshot
              px: 3,
              fontWeight: 700,
              '&:hover': { borderColor: '#7c3aed', bgcolor: 'transparent' }
            }}
          >
            View Demo
          </Button>
          <Button 
            variant="contained" 
            sx={{ 
              borderRadius: '20px', 
              textTransform: 'none', 
              bgcolor: '#7c3aed', 
              px: 3,
              fontWeight: 700,
              boxShadow: '0 10px 20px -5px rgba(124, 58, 237, 0.4)', // Soft purple glow
              '&:hover': { bgcolor: '#6d28d9', boxShadow: '0 12px 24px -5px rgba(124, 58, 237, 0.5)' }
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