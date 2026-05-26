// ==========================================
// Component: Pricing Section (Grouped Hover)
// ==========================================

import React from 'react';
import { Box, Typography, Container, Grid, Paper, Chip, Button, Stack } from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';

const PricingFeature = ({ text }) => (
  <Stack direction="row" spacing={1.2} sx={{ mb: 1.2, alignItems: 'center' }}>
    <CheckIcon sx={{ fontSize: '1rem', color: '#7c3aed' }} />
    <Typography variant="body2" sx={{ color: '#4b5563', fontSize: '0.9rem', fontWeight: 500 }}>
      {text}
    </Typography>
  </Stack>
);

const PricingCard = ({ title, subtitle, price, priceSuffix, features, badge, buttonText, isPrimary }) => (
  <Paper 
    elevation={0} 
    sx={{ 
      p: 4,
      borderRadius: '32px',
      border: isPrimary ? '2px solid #7c3aed' : '1px solid #f3f4f6', 
      height: '100%',
      position: 'relative', 
      display: 'flex', 
      flexDirection: 'column', 
      justifyContent: 'space-between',
      bgcolor: isPrimary ? '#fcfaff' : '#ffffff',
      boxShadow: isPrimary ? '0 16px 32px rgba(124, 58, 237, 0.06)' : 'none',
      transition: 'transform 0.3s ease',
      // remove individual hover shift
    }}
  >
    {badge && (
      <Chip 
        label={badge} 
        size="small" 
        sx={{ 
          position: 'absolute', top: 20, right: 20, 
          bgcolor: '#7c3aed', color: '#fff', fontWeight: 700, fontSize: '0.75rem' 
        }} 
      />
    )}
    
    <Box>
      <Typography variant="h5" sx={{ fontWeight: 800, color: '#111827', mb: 1 }}>{title}</Typography>
      <Typography variant="body2" sx={{ color: '#6b7280', mb: 3, minHeight: '36px' }}>{subtitle}</Typography>
      
      <Box sx={{ display: 'flex', alignItems: 'baseline', mb: 3 }}>
        <Typography variant="h2" sx={{ fontWeight: 900, color: '#111827', letterSpacing: '-0.03em' }}>
          {price}
        </Typography>
        <Typography variant="body1" sx={{ color: '#6b7280', ml: 1, fontWeight: 600 }}>
          {priceSuffix}
        </Typography>
      </Box>

      <Box sx={{ mb: 4 }}>
        {features.map((feature, index) => (
          <PricingFeature key={index} text={feature} />
        ))}
      </Box>
    </Box>

    <Button 
      variant={isPrimary ? "contained" : "outlined"} 
      fullWidth 
      sx={{ 
        bgcolor: isPrimary ? '#7c3aed' : 'transparent',
        color: isPrimary ? '#fff' : '#111827',   // darker text for visibility
        borderColor: isPrimary ? '#7c3aed' : '#d1d5db',
        borderRadius: '100px',
        py: 1.5, 
        textTransform: 'none', 
        fontWeight: 700,
        fontSize: '1rem',
        '&:hover': { 
          bgcolor: isPrimary ? '#6d28d9' : '#f3f4f6',
          borderColor: isPrimary ? '#6d28d9' : '#9ca3af'
        }
      }}
    >
      {buttonText}
    </Button>
  </Paper>
);

const PricingSection = () => (
  <Box component="section" id="pricing" sx={{ py: 10, bgcolor: 'white' }}>
    <Container maxWidth="lg">
      <Box sx={{ mb: 2 }}>
        <Typography 
          variant="h3" 
          sx={{ fontWeight: 900, mb: 2, color: '#111827', letterSpacing: '-0.02em' }}
        >
          Simple, affordable pricing
        </Typography>
        <Typography variant="body1" sx={{ color: '#6b7280', maxWidth: '600px', fontSize: '1.5rem' }}>
          Experiential Learning Journey !
        </Typography>
      </Box>

      {/* Group wrapper with hover effect */}
      <Box sx={{ transition: 'transform 0.3s ease', '&:hover': { transform: 'translateY(-5px)' } }}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <PricingCard 
              title="Students"
              subtitle="Perfect for university and early learning use"
              price="Free"
              priceSuffix="to start"
              badge="Best for reach"
              buttonText="Sign Up"
              isPrimary={true}
              features={[
                "Full simulation experience",
                "Practical exposure to operations decisions",
                "Ideal for learning and classroom use",
                "No prior experience required"
              ]}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <PricingCard 
              title="Young Professionals"
              subtitle="Low-cost access for practical skill development"
              price="$10"
              priceSuffix="per Enrollment"
              buttonText="Enroll Now"
              isPrimary={false}
              features={[
                "Full access to the simulation journey",
                "Real-world business decision practice",
                "Strong value at an easy entry price",
                "Useful for self-development and career growth"
              ]}
            />
          </Grid>
        </Grid>
      </Box>
    </Container>
  </Box>
);

export default PricingSection;
