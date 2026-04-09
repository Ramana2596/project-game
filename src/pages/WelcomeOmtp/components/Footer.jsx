// ==========================================
// Component: Footer (Aligned & Standardized)
// ==========================================

import React from 'react';
import { Box, Container, Typography, Stack, Link, Divider } from '@mui/material';

const Footer = () => (
  <Box 
    component="footer" 
    sx={{ 
      py: 10, 
      borderTop: '1px solid #f3f4f6', 
      bgcolor: '#ffffff',
      mt: 8 // Significant margin to separate from the Final CTA
    }}
  >
    <Container maxWidth="lg"> {/* Global Width Anchor */}
      <Stack 
        direction={{ xs: 'column', md: 'row' }} 
        justifyContent="space-between" 
        alignItems={{ xs: 'center', md: 'flex-start' }} 
        spacing={6}
      >
        {/* Brand Info */}
        <Box sx={{ textAlign: { xs: 'center', md: 'left' } }}>
          <Typography 
            variant="h6" 
            sx={{ 
              fontWeight: 900, 
              color: '#111827', 
              mb: 1,
              letterSpacing: '-0.02em'
            }}
          >
            OMTP
          </Typography>
          <Typography variant="body2" sx={{ color: '#6b7280', mb: 0.5, fontWeight: 500 }}>
            Operations Management Training Platform
          </Typography>
          <Typography variant="body2" sx={{ color: '#9ca3af' }}>
            Practical Learning for Modern Business.
          </Typography>
        </Box>

        {/* Navigation Links */}
        <Stack 
          direction="row" 
          spacing={4} 
          sx={{ 
            flexWrap: 'wrap', 
            justifyContent: 'center' 
          }}
        >
          {['About', 'How It Works', 'For Whom', 'Pricing'].map((item) => (
            <Link 
              key={item}
              href={`#${item.toLowerCase().replace(/\s+/g, '-')}`} 
              underline="none" 
              sx={{ 
                color: '#4b5563', 
                fontSize: '0.9rem', 
                fontWeight: 600,
                transition: 'color 0.2s',
                '&:hover': { color: '#7c3aed' } // Branded purple hover
              }}
            >
              {item}
            </Link>
          ))}
        </Stack>
      </Stack>

      <Divider sx={{ my: 6, borderColor: '#f3f4f6' }} />

      {/* Bottom Copyright Area */}
      <Stack 
        direction={{ xs: 'column', sm: 'row' }} 
        justifyContent="space-between" 
        alignItems="center" 
        spacing={2}
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