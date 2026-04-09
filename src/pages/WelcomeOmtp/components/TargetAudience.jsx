// ==========================================
// Component: Target Audience (Horizontal Row)
// ==========================================

import React from 'react';
import { Box, Typography, Container, Stack } from '@mui/material';
import SchoolIcon from '@mui/icons-material/School'; 
import WorkIcon from '@mui/icons-material/Work';
import RocketLaunchIcon from '@mui/icons-material/RocketLaunch';

// ✅ Internal Card Component: Compact horizontal palette
const AudienceCard = ({ icon: Icon, title, description }) => (
  <Box 
    sx={{ 
      p: 2.5, 
      flex: 1, // ✅ Ensures equal width for all three
      minWidth: 0, // Prevents flex-children from overflowing
      borderRadius: '32px', 
      bgcolor: '#ffffff',
      border: '1px solid #f3f4f6',
      display: 'flex',
      alignItems: 'center',
      transition: 'all 0.3s ease',
      '&:hover': { 
        borderColor: '#7c3aed',
        boxShadow: '0 10px 20px rgba(124, 58, 237, 0.05)',
        transform: 'translateY(-2px)'
      }
    }}
  >
    {/* ✅ Icon palette: Reduced size to save horizontal space */}
    <Box sx={{ 
      width: 36, height: 36, borderRadius: '10px', bgcolor: '#f5f3ff', 
      display: 'flex', alignItems: 'center', justifyContent: 'center', mr: 2, flexShrink: 0 
    }}>
      <Icon sx={{ color: '#7c3aed', fontSize: '1.1rem' }} />
    </Box>

    {/* ✅ Text content: Tightened typography for single-line stability */}
    <Box>
      <Typography variant="subtitle2" sx={{ fontWeight: 900, color: '#111827', mb: 0.2, lineHeight: 1.2 }}>
        {title}
      </Typography>
      <Typography variant="caption" sx={{ color: '#6b7280', fontSize: '0.75rem', lineHeight: 1.3, display: 'block' }}>
        {description}
      </Typography>
    </Box>
  </Box>
);

const TargetAudience = () => {
  return (
    // ✅ Main section with global width alignment
    <Box component="section" sx={{ py: 8, bgcolor: 'white' }}>
      <Container maxWidth="lg">
        
        {/* ✅ Section Header: Left-aligned */}
        <Box sx={{ mb: 5 }}>
          <Typography variant="h4" sx={{ fontWeight: 900, mb: 1.5, color: '#111827', letterSpacing: '-0.02em' }}>
            Built for future business leaders
          </Typography>
          <Typography variant="body1" sx={{ color: '#6b7280', maxWidth: '600px', fontSize: '1rem' }}>
            Practical exposure to operations management without the complexity.
          </Typography>
        </Box>

        {/* ✅ Horizontal Stack: Forces cards to stay side-by-side */}
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