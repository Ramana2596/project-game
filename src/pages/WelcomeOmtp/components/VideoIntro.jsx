// ==========================================
// Component: Video Introduction (Drop-in Replacement)
// ==========================================

import React from 'react';
import { Box, Typography, Button, Container } from '@mui/material';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';

const VideoIntro = () => {
  const youtubeLink = "https://www.youtube.com/watch?v=3eRde31HIzI";

  const handleOpenVideo = () => {
    window.open(youtubeLink, '_blank', 'noopener,noreferrer');
  };

  return (
    <Box component="section" id="how-it-works" sx={{ py: { xs: 8, md: 10 }, bgcolor: '#ffffff' }}>
      <Container maxWidth="lg">
        
        {/* Header */}
        <Typography 
          variant="h3" 
          sx={{ fontWeight: 800, mb: 2, color: '#111827', letterSpacing: '-0.02em' }}
        >
          See how OMTP works
        </Typography>
        <Typography 
          variant="body1" 
          sx={{ color: '#4b5563', mb: 5, maxWidth: '720px', lineHeight: 1.6, fontSize: '1.1rem' }}
        >
          Watch the short introduction video for a quick overview, then scroll down to see the full 7‑step visual walkthrough of the real platform.
        </Typography>

        {/* Purple Gradient Container with reduced padding */}
        <Box 
          sx={{ 
            width: '100%', 
            background: 'linear-gradient(135deg, #4c1d95 0%, #7c3aed 100%)', 
            borderRadius: '28px', 
            p: { xs: 4, md: 6 },   // reduced padding
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white',
            boxShadow: '0 16px 36px rgba(124, 58, 237, 0.15)',
          }}
        >
          {/* Play Button */}
          <Box 
            onClick={handleOpenVideo}
            sx={{ 
              width: 70, height: 70, 
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
            <PlayArrowIcon sx={{ fontSize: 38, color: 'white' }} />
          </Box>

          <Typography 
            variant="h5" 
            sx={{ fontWeight: 700, mb: 2, textAlign: 'center' }}
          >
            Watch the OMTP intro video
          </Typography>
          
          <Typography 
            variant="body2" 
            sx={{ mb: 3.5, opacity: 0.9, maxWidth: '600px', textAlign: 'center', lineHeight: 1.5, fontSize: '1rem' }}
          >
            Get a quick overview of how the platform helps learners make operational decisions, review outcomes, and build practical business understanding.
          </Typography>

          <Button 
            variant="contained" 
            onClick={handleOpenVideo}
            sx={{ 
              bgcolor: 'white', color: '#4c1d95', px: 4, py: 1.25,
              fontWeight: 700, borderRadius: '100px',
              textTransform: 'none', fontSize: '1rem',
              boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
              '&:hover': { bgcolor: '#f9fafb', transform: 'translateY(-2px)' }
            }}
          >
            Watch on YouTube
          </Button>
        </Box>

        {/* Caption */}
        <Typography 
          variant="caption" 
          sx={{ color: '#9ca3af', mt: 2.5, textAlign: 'left' }}
        >
          This opens the video directly on YouTube.
        </Typography>
      </Container>
    </Box>
  );
};

export default VideoIntro;
