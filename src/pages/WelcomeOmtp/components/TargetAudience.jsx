// ==========================================
// Component: Target Audience (Variant-driven)
// ==========================================

import React from 'react';
import { Box, Typography, Container, Stack } from '@mui/material';
import SchoolIcon from '@mui/icons-material/School'; 
import WorkIcon from '@mui/icons-material/Work';
import RocketLaunchIcon from '@mui/icons-material/RocketLaunch';
import { colors } from '../../../ux/styles';

// Internal Card Component: Compact horizontal palette
const AudienceCard = ({ icon: Icon, title, description }) => (
  <Box 
    sx={{ 
      p: 2.5, 
      flex: 1,
      minWidth: 0,
      borderRadius: '32px', 
      bgcolor: colors.card || '#ffffff',
      border: `1px solid ${colors.border || '#E6E0F4'}`,
      display: 'flex',
      alignItems: 'center',
      transition: 'all 0.3s ease',
      '&:hover': { 
        borderColor: colors.accent || '#7E57C2',
        boxShadow: `0 10px 20px ${colors.shadowColor || 'rgba(103,58,183,0.15)'}`,
        transform: 'translateY(-2px)'
      }
    }}
  >
    {/* Icon Container */}
    <Box sx={{ 
      width: 36, height: 36, borderRadius: '10px', bgcolor: colors.hover || '#F3EDFF', 
      display: 'flex', alignItems: 'center', justifyContent: 'center', mr: 2, flexShrink: 0 
    }}>
      <Icon sx={{ color: colors.primary || '#673AB7', fontSize: '1.1rem' }} />
    </Box>

    {/* Text Content */}
    <Box>
      <Typography 
        variant="subtitle2" 
        sx={{ fontWeight: 800, color: colors.title || '#1F2D3D', mb: 0.2, lineHeight: 1.2 }}
      >
        {title}
      </Typography>
      <Typography 
        variant="caption" 
        sx={{ color: colors.body || '#546E7A', lineHeight: 1.3, display: 'block' }}
      >
        {description}
      </Typography>
    </Box>
  </Box>
);

const TargetAudience = () => {
  return (
    <Box component="section" sx={{ py: 8, bgcolor: colors.paper || '#ffffff' }}>
      <Container maxWidth="lg">
        
        {/* Section Header */}
        <Box sx={{ mb: 5 }}>
          <Typography 
            variant="h4" 
            sx={{ fontWeight: 700, mb: 1.5, color: colors.title || '#1F2D3D', letterSpacing: '-0.02em' }}
          >
            Built for future business leaders
          </Typography>
          <Typography 
            variant="body1" 
            sx={{ color: colors.body || '#546E7A', maxWidth: '600px' }}
          >
            Practical exposure to operations management without the complexity.
          </Typography>
        </Box>

        {/* Horizontal Stack */}
        <Stack 
          direction={{ xs: 'column', md: 'row' }} 
          spacing={2} 
          sx={{ width: '100%', alignItems: 'stretch' }}
        >
          <AudienceCard 
            icon={SchoolIcon}
            title="Students"
            description="Hands-on performance tracking for learners."
          />
          <AudienceCard 
            icon={WorkIcon}
            title="Professionals"
            description="Sharp decision-making for early careers."
          />
          <AudienceCard 
            icon={RocketLaunchIcon}
            title="Entrepreneurs"
            description="Test decisions before real-world application."
          />
        </Stack>
      </Container>
    </Box>
  );
};

export default TargetAudience;
