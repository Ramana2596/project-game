// ==========================================
// Component: Pricing Section (Standardized)
// ==========================================

import React from 'react';
import { Box, Typography, Container, Grid, Paper, Chip, Button, Stack } from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';

const PricingFeature = ({ text }) => (
  <Stack direction="row" spacing={1.5} sx={{ mb: 1.5, alignItems: 'center' }}>
    <CheckIcon sx={{ fontSize: '1.1rem', color: '#7c3aed' }} />
    <Typography variant="body2" sx={{ color: '#4b5563', fontSize: '0.95rem', fontWeight: 500 }}>
      {text}
    </Typography>
  </Stack>
);

const PricingCard = ({ title, subtitle, price, priceSuffix, features, badge, buttonText, isPrimary }) => (
  <Paper 
    elevation={0} 
    sx={{ 
      p: 5, 
      borderRadius: '40px', // Standardized radius
      border: isPrimary ? '2px solid #7c3aed' : '1px solid #f3f4f6', 
      height: '100%',
      position: 'relative', 
      display: 'flex', 
      flexDirection: 'column', 
      bgcolor: isPrimary ? '#fcfaff' : '#ffffff', // Faint tint for primary
      boxShadow: isPrimary ? '0 20px 40px rgba(124, 58, 237, 0.06)' : 'none',
      transition: 'transform 0.3s ease',
      '&:hover': { transform: 'translateY(-5px)' }
    }}
  >
    {badge && (
      <Chip 
        label={badge} 
        size="small" 
        sx={{ 
          position: 'absolute', top: 24, right: 24, 
          bgcolor: '#7c3aed', color: '#fff', fontWeight: 700, fontSize: '0.75rem' 
        }} 
      />
    )}
    
    <Typography variant="h5" sx={{ fontWeight: 800, color: '#111827', mb: 1 }}>{title}</Typography>
    <Typography variant="body2" sx={{ color: '#6b7280', mb: 4, minHeight: '40px' }}>{subtitle}</Typography>
    
    <Box sx={{ display: 'flex', alignItems: 'baseline', mb: 4 }}>
      <Typography variant="h2" sx={{ fontWeight: 900, color: '#111827', letterSpacing: '-0.03em' }}>
        {price}
      </Typography>
      <Typography variant="body1" sx={{ color: '#6b7280', ml: 1, fontWeight: 600 }}>
        {priceSuffix}
      </Typography>
    </Box>

    <Box sx={{ mb: 5, flexGrow: 1 }}>
      {features.map((feature, index) => (
        <PricingFeature key={index} text={feature} />
      ))}
    </Box>

    <Button 
      variant={isPrimary ? "contained" : "outlined"} 
      fullWidth 
      sx={{ 
        bgcolor: isPrimary ? '#7c3aed' : 'transparent',
        color: isPrimary ? '#fff' : '#111827',
        borderColor: isPrimary ? '#7c3aed' : '#e5e7eb',
        borderRadius: '100px', // Pill shape for consistency
        py: 1.8, 
        textTransform: 'none', 
        fontWeight: 800,
        fontSize: '1rem',
        '&:hover': { 
          bgcolor: isPrimary ? '#6d28d9' : '#f9fafb',
          borderColor: isPrimary ? '#6d28d9' : '#d1d5db'
        }
      }}
    >
      {buttonText}
    </Button>
  </Paper>
);

const PricingSection = () => (
  <Box component="section" id="pricing" sx={{ py: 12, bgcolor: 'white' }}>
    <Container maxWidth="lg"> {/* Width Anchor */}
      <Box sx={{ mb: 8 }}>
        <Typography 
          variant="h3" 
          sx={{ fontWeight: 900, mb: 2, color: '#111827', letterSpacing: '-0.02em' }}
        >
          Simple, affordable pricing
        </Typography>
        <Typography variant="body1" sx={{ color: '#6b7280', maxWidth: '600px', fontSize: '1.1rem' }}>
          Your pricing is a strength. Make it easy for learners to try the platform quickly without overthinking the decision.
        </Typography>
      </Box>

      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          <PricingCard 
            title="Students"
            subtitle="Perfect for university and early learning use"
            price="Free"
            priceSuffix="to start"
            badge="Best for reach"
            buttonText="Start Free"
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
            priceSuffix="per try"
            buttonText="Get Started"
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
    </Container>
  </Box>
);

export default PricingSection;