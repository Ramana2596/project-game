// ============================================================
// Component: Video Introduction (Variant-driven)
// ============================================================

import React from 'react';
import { Box, Typography, Button, Container } from '@mui/material';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import { colors } from '../../../ux/styles';

const VideoIntro = () => {
  const youtubeLink = "https://www.youtube.com/watch?v=3eRde31HIzI";

  const handleOpenVideo = () => {
    window.open(youtubeLink, '_blank', 'noopener,noreferrer');
  };

  return (
    <Box 
      component="section" 
      id="how-it-works" 
      sx={{ py: { xs: 8, md: 10 }, bgcolor: colors.paper || '#ffffff' }}
    >
      <Container maxWidth="lg">
        
        {/* Section Header */}
        <Typography 
          variant="h4" 
          sx={{ fontWeight: 700, mb: 2, color: colors.title || '#1F2D3D', letterSpacing: '-0.02em' }}
        >
          See how OMTP works
        </Typography>
        <Typography 
          variant="body1" 
          sx={{ color: colors.body || '#546E7A', mb: 5, maxWidth: '720px', lineHeight: 1.6 }}
        >
          Watch the short introduction video for a quick overview, then scroll down to see the full 7‑step visual walkthrough of the real platform.
        </Typography>

        {/* Gradient Container */}
        <Box 
          sx={{ 
            width: '100%', 
            background: colors.heroGradient || 'linear-gradient(135deg, #4c1d95 0%, #7c3aed 100%)', 
            borderRadius: '28px', 
            p: { xs: 4, md: 6 }, 
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            color: colors.white || '#ffffff',
            boxShadow: `0 16px 36px ${colors.shadowColor || 'rgba(103,58,183,0.15)'}`,
          }}
        >
          {/* Play Button */}
          <Box 
            onClick={handleOpenVideo}
            sx={{ 
              width: 40, height: 40, 
              bgcolor: 'rgba(255,255,255,0.15)', 
              borderRadius: '50%', 
              display: 'flex', alignItems: 'center', justifyContent: 'center', 
              mb: 3, cursor: 'pointer',
              backdropFilter: 'blur(4px)',
              border: '2px solid rgba(255,255,255,0.3)',
              transition: 'all 0.3s ease',
              '&:hover': { transform: 'scale(1.08)', bgcolor: 'rgba(255,255,255,0.25)' }
            }}
          >
            <PlayArrowIcon sx={{ fontSize: 38, color: colors.white || '#ffffff' }} />
          </Box>

          <Typography variant="h5" sx={{ fontWeight: 700, mb: 2, textAlign: 'center' }}>
            Watch the OMTP intro video
          </Typography>
          
          <Typography 
            variant="body2" 
            sx={{ mb: 3.5, opacity: 0.9, maxWidth: '600px', textAlign: 'center', lineHeight: 1.5 }}
          >
            Get a quick overview of how the platform helps learners make operational decisions, review outcomes, and build practical business understanding.
          </Typography>

          <Button 
            variant="contained" 
            onClick={handleOpenVideo}
            sx={{ 
              bgcolor: colors.white || '#ffffff', 
              color: colors.primaryDark || '#4c1d95', 
              px: 4, py: 1.25,
              fontWeight: 700, 
              borderRadius: '100px',
              textTransform: 'none', 
              fontSize: '1rem',
              boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
              '&:hover': { 
                bgcolor: colors.hover || '#f9fafb', 
                transform: 'translateY(-2px)' 
              },
              transition: 'all 0.2s ease'
            }}
          >
            Watch on YouTube
          </Button>
        </Box>

        {/* Footer Note */}
        <Typography 
          variant="caption" 
          sx={{ color: colors.muted || '#9ca3af', mt: 2.5, display: 'block', textAlign: 'left' }}
        >
          This opens the video directly on YouTube.
        </Typography>
      </Container>
    </Box>
  );
};

export default VideoIntro;
