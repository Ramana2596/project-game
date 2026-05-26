// ==========================================
// Component: Footer (Sleek & Compact)
// ==========================================

import React from 'react';
import { Box, Container, Typography, Stack, Link, Divider } from '@mui/material';

const Footer = () => (
  <Box 
    component="footer" 
    sx={{ 
      py: 4,   // reduced padding top/bottom
      borderTop: '1px solid #f3f4f6', 
      bgcolor: '#ffffff',
      mt: 3    // tighter margin above footer
    }}
  >
    <Container maxWidth="lg">
      <Stack 
        direction={{ xs: 'column', md: 'row' }} 
        justifyContent="space-between" 
        alignItems={{ xs: 'center', md: 'flex-start' }} 
        spacing={3}   // reduced spacing between brand and links
      >
        {/* Brand Info */}
        <Box sx={{ textAlign: { xs: 'center', md: 'left' } }}>
          <Typography 
            variant="h6" 
            sx={{ fontWeight: 900, color: '#111827', mb: 0.5, letterSpacing: '-0.02em' }}
          >
            OMTP
          </Typography>
          <Typography variant="body2" sx={{ color: '#6b7280', mb: 0.25, fontWeight: 500 }}>
            Operations Management Training Platform
          </Typography>
          <Typography variant="body2" sx={{ color: '#9ca3af' }}>
            Practical Learning for Modern Business.
          </Typography>
        </Box>

        {/* Navigation Links */}
        <Stack 
          direction="row" 
          spacing={2.5}   // tighter link spacing
          sx={{ flexWrap: 'wrap', justifyContent: 'center' }}
        >
          {['About', 'How It Works', 'For Whom', 'Pricing'].map((item) => (
            <Link 
              key={item}
              href={`#${item.toLowerCase().replace(/\s+/g, '-')}`} 
              underline="none" 
              sx={{ 
                color: '#4b5563', 
                fontSize: '0.85rem', 
                fontWeight: 600,
                transition: 'color 0.2s',
                '&:hover': { color: '#7c3aed' }
              }}
            >
              {item}
            </Link>
          ))}
        </Stack>
      </Stack>

      <Divider sx={{ my: 3, borderColor: '#f3f4f6' }} />

      {/* Bottom Copyright */}
      <Stack 
        direction={{ xs: 'column', sm: 'row' }} 
        justifyContent="space-between" 
        alignItems="center" 
        spacing={1.5}
      >
        <Typography variant="caption" sx={{ color: '#9ca3af', fontWeight: 500 }}>
          © {new Date().getFullYear()} OMTP. All rights reserved.
        </Typography>
        <Typography variant="caption" sx={{ color: '#9ca3af' }}>
          Contact: info@omtp.example
        </Typography>
      </Stack>
    </Container>
  </Box>
);

export default Footer;
