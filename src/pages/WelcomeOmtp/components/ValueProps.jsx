// ==========================================
// Component: Value Propositions (Variant-driven)
// ==========================================

import React from 'react';
import { Box, Typography, Grid, Container } from '@mui/material';
import { colors } from '../../../ux/styles';

const valueCards = [
  {
    title: "Real Decisions",
    desc: "Choose strategy, production, and sales inside a realistic business environment.",
    icon: "🎯",
    iconBg: 'rgba(239, 68, 68, 0.12)'
  },
  {
    title: "Instant Feedback",
    desc: "See how every decision affects profitability and operating results.",
    icon: "📈",
    iconBg: 'rgba(56, 189, 248, 0.15)' 
  },
  {
    title: "Practical Learning",
    desc: "Build judgment through experience and repeated improvement.",
    icon: "🧠",
    iconBg: 'rgba(168, 85, 247, 0.15)' 
  }
];

const ValueProps = () => (
  <Box component="section" sx={{ py: 6, bgcolor: colors.background.default || 'transparent' }}>
    <Container maxWidth="lg">
      {/* Section Header */}
      <Box sx={{ mb: 4 }}>
        <Typography 
          variant="h4" 
          sx={{ fontWeight: 700, mb: 1, color: colors.text?.primary || '#111827', letterSpacing: '-0.02em' }}
        >
          Learn by running a business
        </Typography>
        <Typography 
          variant="body2" 
          sx={{ color: colors.text?.secondary || '#4b5563', maxWidth: '600px' }}
        >
          OMTP connects strategy, operations and finance through one practical experience.
        </Typography>
      </Box>

      {/* Single Line Grid */}
      <Grid 
        container 
        spacing={2} 
        sx={{ 
          flexWrap: 'nowrap',
          overflowX: { xs: 'auto', md: 'visible' },
          pb: { xs: 2, md: 0 } 
        }}
      >
        {valueCards.map((card, index) => (
          <Grid item xs={4} key={index} sx={{ minWidth: { xs: '260px', md: 'auto' } }}>
            <Box 
              sx={{ 
                p: 2, 
                borderRadius: '16px', 
                bgcolor: colors.paper || '#f9faff', 
                border: `1px solid ${colors.border || 'rgba(0,0,0,0.05)'}`,
                display: 'flex',
                flexDirection: 'column',
                gap: 1, 
                height: '100%',
                maxHeight: 160,
                transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                '&:hover': {
                  transform: 'translateY(-2px)',
                  boxShadow: '0 8px 24px rgba(0,0,0,0.04)'
                }
              }}
            >
              <Box 
                sx={{ 
                  width: 32, height: 32, display: 'flex', 
                  alignItems: 'center', justifyContent: 'center', 
                  borderRadius: '8px', bgcolor: card.iconBg, fontSize: '18px'
                }}
              >
                {card.icon}
              </Box>
              <Typography 
                variant="subtitle1" 
                sx={{ fontWeight: 800, color: colors.text?.primary || '#111827', mb: 0.5 }}
              >
                {card.title}
              </Typography>
              <Typography 
                variant="caption" 
                sx={{ color: colors.text?.secondary || '#4b5563', lineHeight: 1.3 }}
              >
                {card.desc}
              </Typography>
            </Box>
          </Grid>
        ))}
      </Grid>
    </Container>
  </Box>
);

export default ValueProps;
