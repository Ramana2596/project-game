// ==========================================
// Component: Value Propositions (Strict Single Line)
// ==========================================

import React from 'react';
import { Box, Typography, Grid, Container } from '@mui/material';

const valueCards = [
  {
    title: "Real Decisions",
    desc: "Choose strategy, production, and sales inside a realistic business environment.",
    icon: "🎯",
    iconBg: "#fee2e2" 
  },
  {
    title: "Instant Feedback",
    desc: "See how every decision affects profitability and operating results.",
    icon: "📈",
    iconBg: "#e0f2fe" 
  },
  {
    title: "Practical Learning",
    desc: "Build judgment through experience and repeated improvement.",
    icon: "🧠",
    iconBg: "#f3e8ff" 
  }
];

const ValueProps = () => (
  <Box component="section" sx={{ py: 6, bgcolor: 'white' }}>
    <Container maxWidth="lg">
      {/* Heading remains left-aligned for professional contrast */}
      <Box sx={{ mb: 4 }}>
        <Typography 
          variant="h4" 
          sx={{ fontWeight: 900, mb: 1, color: '#111827', letterSpacing: '-0.02em' }}
        >
          Learn by running a business
        </Typography>
        <Typography variant="body2" sx={{ color: '#4b5563', maxWidth: '600px' }}>
          OMTP connects operations, strategy, and finance through one practical experience.
        </Typography>
      </Box>

      {/* Forced Single Line Grid */}
      <Grid 
        container 
        spacing={2} 
        sx={{ 
          flexWrap: 'nowrap', // 👈 This forces the single line
          overflowX: { xs: 'auto', md: 'visible' }, // Scrollable on mobile
          pb: { xs: 2, md: 0 } 
        }}
      >
        {valueCards.map((card, index) => (
          <Grid item xs={4} key={index} sx={{ minWidth: { xs: '280px', md: 'auto' } }}>
            <Box 
              sx={{ 
                p: 3, 
                borderRadius: '20px', 
                bgcolor: '#f9faff', 
                height: '100%',
                border: '1px solid #f3f4f6',
                display: 'flex',
                flexDirection: 'column',
                gap: 1.5
              }}
            >
              <Box 
                sx={{ 
                  width: 40, height: 40, display: 'flex', 
                  alignItems: 'center', justifyContent: 'center', 
                  borderRadius: '10px', bgcolor: card.iconBg, fontSize: '20px'
                }}
              >
                {card.icon}
              </Box>
              <Typography variant="subtitle1" sx={{ fontWeight: 800, color: '#111827' }}>
                {card.title}
              </Typography>
              <Typography variant="caption" sx={{ color: '#4b5563', lineHeight: 1.4, fontSize: '0.85rem' }}>
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