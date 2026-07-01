// ==========================================
// Component: Pricing Section (Variant-driven)
// ==========================================

import React from 'react';
import { Box, Typography, Container, Grid, Paper, Chip, Button, Stack } from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';
import { colors, buttonStyles } from '../../../ux/styles';

const PricingFeature = ({ text }) => (
  <Stack direction="row" spacing={1.2} sx={{ mb: 1.2, alignItems: 'center' }}>
    <CheckIcon sx={{ fontSize: '1rem', color: colors.primary }} />
    <Typography variant="body2" sx={{ color: colors.text || '#333333', fontWeight: 500 }}>
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
      border: isPrimary ? `2px solid ${colors.primary}` : `1px solid ${colors.border || '#e0e0e0'}`, 
      height: '100%',
      position: 'relative', 
      display: 'flex', 
      flexDirection: 'column', 
      justifyContent: 'space-between',
      bgcolor: isPrimary ? (colors.hover || 'rgba(103,58,183,0.04)') : (colors.paper || '#ffffff'),
      boxShadow: isPrimary ? `0 16px 32px ${colors.primary}1A` : 'none',
      transition: 'transform 0.3s ease',
    }}
  >
    {badge && (
      <Chip 
        label={badge} 
        size="small" 
        sx={{ 
          position: 'absolute', top: 20, right: 20, 
          bgcolor: colors.primary, color: colors.white || '#ffffff', fontWeight: 700, fontSize: '0.75rem' 
        }} 
      />
    )}
    
    <Box>
      <Typography variant="h5" sx={{ fontWeight: 800, color: colors.title || '#000000', mb: 1 }}>
        {title}
      </Typography>
      <Typography variant="body2" sx={{ color: colors.subtitle || '#666666', mb: 3, minHeight: '36px' }}>
        {subtitle}
      </Typography>
      
      <Box sx={{ display: 'flex', alignItems: 'baseline', mb: 3 }}>
        <Typography variant="h3" sx={{ fontWeight: 600, color: colors.title || '#000000', letterSpacing: '-0.03em' }}>
          {price}
        </Typography>
        <Typography variant="body1" sx={{ color: colors.subtitle || '#666666', ml: 1, fontWeight: 600 }}>
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
        ...(isPrimary ? buttonStyles.primary : buttonStyles.secondary),
        borderRadius: '100px',
        py: 1.5,
        fontSize: '1rem',
      }}
    >
      {buttonText}
    </Button>
  </Paper>
);

const PricingSection = () => (
  <Box component="section" id="pricing" sx={{ py: 10, bgcolor: colors.paper || '#ffffff' }}>
    <Container maxWidth="lg">
      <Box sx={{ mb: 2 }}>
        <Typography 
          variant="h4" 
          sx={{ fontWeight: 700, mb: 2, color: colors.title || '#000000', letterSpacing: '-0.02em' }}
        >
          Simple, affordable pricing
        </Typography>
        <Typography variant="body1" sx={{ color: colors.subtitle || '#666666', maxWidth: '600px' }}>
          Experiential Learning Journey !
        </Typography>
      </Box>

      <Box sx={{ transition: 'transform 0.3s ease', '&:hover': { transform: 'translateY(-5px)' } }}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <PricingCard 
              title="Students"
              subtitle="Perfect for university and early learning use"
              price="Free"
              priceSuffix="to start"
              badge="Best reach"
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
              priceSuffix="per Program"
              badge="Best Affliation"
              buttonText="Get Started"
              isPrimary={false}
              features={[
                "Full access to the simulation journey",
                "Real-world business decision practice",
                "Strong value at an easy price point",
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
