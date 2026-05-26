// ==========================================
// Component: OMTP Navigation Bar (Drop-in Replacement)
// ==========================================

import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box, Container } from '@mui/material';

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
      borderBottom: '1px solid #e5e7eb'
    }}
  >
    <Container maxWidth="lg">
      <Toolbar disableGutters sx={{ justifyContent: 'space-between' }}>
        
        {/* Purpose: Logo and platform branding */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, cursor: 'pointer' }}>
          <Box 
            sx={{ 
              width: 40, height: 40, 
              bgcolor: '#16a34a', 
              borderRadius: 2, 
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              boxShadow: '0 4px 10px rgba(22, 163, 74, 0.25)'
            }} 
          >
            <Box sx={{ width: 18, height: 18, border: '3px solid white', borderRadius: '50%' }} />
          </Box>
          <Box>
            <Typography variant="h6" sx={{ fontWeight: 900, lineHeight: 1, color: '#111827', letterSpacing: -0.5 }}>
              OMTP
            </Typography>
            <Typography variant="caption" sx={{ color: '#6b7280', fontSize: '0.75rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: 0.5 }}>
              Operations Management Training Platform
            </Typography>
          </Box>
        </Box>

        {/* Purpose: Desktop navigation links */}
        <Box sx={{ display: { xs: 'none', lg: 'flex' }, gap: 5 }}>
          {['About', 'How It Works', 'For Whom', 'Pricing'].map((item) => (
            <Typography 
              key={item} 
              variant="body1" 
              sx={{ 
                fontWeight: 700, 
                fontSize: '1rem', 
                color: '#374151', 
                cursor: 'pointer',
                transition: 'color 0.2s ease',
                '&:hover': { color: '#6A0DAD' }
              }}
            >
              {item}
            </Typography>
          ))}
        </Box>

        {/* Purpose: Primary call-to-action buttons */}
        <Box sx={{ display: 'flex', gap: 2.5, alignItems: 'center' }}>
          
          {/* Existing Demo launch */}
          <Button 
            variant="outlined" 
            onClick={onViewDemo}
            sx={{ 
              borderRadius: '100px', 
              textTransform: 'none', 
              color: '#6A0DAD', 
              borderColor: '#d1d5db', 
              px: 3.5, py: 1.25,
              fontWeight: 700,
              fontSize: '1rem',
              '&:hover': { borderColor: '#6A0DAD', bgcolor: 'transparent' }
            }}
          >
            View Demo
          </Button>

          {/* ✅ Restored auth navigation */}
          <Button 
            variant="contained"
            onClick={onGetStarted}
            sx={{ 
              borderRadius: '100px', 
              textTransform: 'none', 
              bgcolor: '#6A0DAD', 
              px: 3.5, py: 1.25,
              fontWeight: 700,
              fontSize: '1rem',
              boxShadow: '0 8px 20px rgba(106, 13, 173, 0.3)',
              '&:hover': { bgcolor: '#5A0BA0', boxShadow: '0 10px 24px rgba(106, 13, 173, 0.4)' }
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