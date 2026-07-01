// ==========================================
// Component: Footer (Variant-driven)
// ==========================================

import React from 'react';
import { Box, Container, Typography, Stack, Link, Divider } from '@mui/material';
import { colors } from '../../../ux/styles';

const Footer = () => (
  <Box 
    component="footer" 
    sx={{ 
      py: 4,   
      borderTop: `1px solid ${colors.border || '#e0e0e0'}`, 
      bgcolor: colors.paper || '#ffffff',
      mt: 3    
    }}
  >
    <Container maxWidth="lg">
      <Stack 
        direction={{ xs: 'column', md: 'row' }} 
        justifyContent="space-between" 
        alignItems={{ xs: 'center', md: 'flex-start' }} 
        spacing={3}   
      >
        {/* Brand Info */}
        <Box sx={{ textAlign: { xs: 'center', md: 'left' } }}>
          <Typography 
            variant="h6" 
            sx={{ 
              fontWeight: 700, 
              color: colors.title || '#000000', 
              mb: 0.5, 
              letterSpacing: '-0.02em' 
            }}
          >
            OMTP
          </Typography>
          <Typography 
            variant="body2" 
            sx={{ 
              color: colors.subtitle || '#666666', 
              mb: 0.25 
            }}
          >
            Operations Management Training Platform
          </Typography>
          <Typography 
            variant="caption" 
            sx={{ 
              color: colors.disabledText || '#9e9e9e' 
            }}
          >
            Practical Learning for Modern Business.
          </Typography>
        </Box>

        {/* Navigation Links */}
        <Stack 
          direction="row" 
          spacing={2.5}   
          sx={{ flexWrap: 'wrap', justifyContent: 'center', alignItems: 'center' }}
        >
          {['About', 'How It Works', 'For Whom', 'Pricing'].map((item) => (
            <Link 
              key={item}
              href={`#${item.toLowerCase().replace(/\s+/g, '-')}`} 
              underline="none" 
              sx={{ 
                color: colors.text || '#333333', 
                fontSize: '0.92rem', 
                fontWeight: 600, 
                transition: 'color 0.2s',
                '&:hover': { color: colors.primary }
              }}
            >
              {item}
            </Link>
          ))}
        </Stack>
      </Stack>

      <Divider sx={{ my: 3, borderColor: colors.border || '#e0e0e0' }} />

      {/* Bottom Copyright */}
      <Stack 
        direction={{ xs: 'column', sm: 'row' }} 
        justifyContent="space-between" 
        alignItems="center" 
        spacing={1.5}
      >
        <Typography 
          variant="caption" 
          sx={{ color: colors.disabledText || '#9e9e9e' }}
        >
          © {new Date().getFullYear()} OMTP. All rights reserved.
        </Typography>
        <Typography 
          variant="caption" 
          sx={{ color: colors.disabledText || '#9e9e9e' }}
        >
          Contact: info@omtp.example
        </Typography>
      </Stack>
    </Container>
  </Box>
);

export default Footer;
