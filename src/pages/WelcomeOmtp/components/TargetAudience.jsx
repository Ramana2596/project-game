// ==========================================
// Component: Target Audience (Variant-driven)
// ==========================================

import React from 'react';
import { Box, Typography, Container, Stack } from '@mui/material';
import SchoolIcon from '@mui/icons-material/School'; 
import WorkIcon from '@mui/icons-material/Work';
import RocketLaunchIcon from '@mui/icons-material/RocketLaunch';
import {
  colors,
  semanticTypo,
  cardStyle,
} from "../../../ux/styles";

// Internal Card Component: Compact horizontal palette
const AudienceCard = ({ icon: Icon, title, description }) => (
  <Box 
    sx={{ 
      p: 2.5, 
      flex: 1,
      minWidth: 0,
      borderRadius: 5, 
      bgcolor: colors.card || '#ffffff',
      border: `1px solid ${colors.border || '#E6E0F4'}`,
      display: 'flex',
      alignItems: 'center',
      transition: 'all 0.25s ease',
      "&:hover": {
        transform: "translateY(-4px)",
        borderColor: colors.primary,
        boxShadow: `0 16px 32px ${colors.primary}2E`,
      },
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
        sx={{
          ...semanticTypo.cardH5,
          color: colors.primaryDark,
          mb: 0.25,
        }}
      >
        {title}
      </Typography>
      <Typography
        sx={{
          ...semanticTypo.bodyB2,
        }}
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
            sx={{
              ...semanticTypo.pageH3,
              color: colors.primaryDark,
              mb: 1.5,
            }}
          >
            Built for future business leaders
          </Typography>
          <Typography
            sx={{
              ...semanticTypo.bodyB1,
              maxWidth: 600,
            }}
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
