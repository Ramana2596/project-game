// ==========================================
// Component: Video Introduction (Final YouTube Link)
// ==========================================

import React from 'react';
import { Box, Typography, Button, Container } from '@mui/material';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';

const VideoIntro = () => {
  // Your specific OMTP YouTube video link
  const youtubeLink = "https://www.youtube.com/watch?v=3eRde31HIzI";

  const handleOpenVideo = () => {
    window.open(youtubeLink, '_blank', 'noopener,noreferrer');
  };

  return (
    <Box component="section" id="how-it-works" sx={{ py: 10, bgcolor: '#ffffff' }}>
      <Container maxWidth="lg">
        {/* Left-aligned Header text as per Screenshot 0 */}
        <Typography 
          variant="h3" 
          sx={{ fontWeight: 800, mb: 2, color: '#111827', letterSpacing: '-0.02em' }}
        >
          See how OMTP works
        </Typography>
        <Typography 
          variant="body1" 
          sx={{ color: '#4b5563', mb: 6, maxWidth: '750px', lineHeight: 1.6 }}
        >
          Watch the short introduction video for a quick overview, then scroll down to see the full 7-step visual walkthrough of the real platform.
        </Typography>

        {/* Purple Gradient Container */}
        <Box 
          sx={{ 
            width: '100%', 
            background: 'linear-gradient(135deg, #4c1d95 0%, #7c3aed 100%)', 
            borderRadius: '40px', 
            p: { xs: 6, md: 10 },
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white',
            boxShadow: '0 20px 40px rgba(124, 58, 237, 0.15)',
            position: 'relative',
          }}
        >
          {/* Glassmorphism Play Button */}
          <Box 
            onClick={handleOpenVideo}
            sx={{ 
              width: 85, height: 85, 
              bgcolor: 'rgba(255,255,255,0.15)', 
              borderRadius: '50%', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center', 
              mb: 4, 
              cursor: 'pointer',
              backdropFilter: 'blur(4px)',
              transition: 'all 0.3s ease',
              border: '2px solid rgba(255,255,255,0.3)',
              '&:hover': { 
                transform: 'scale(1.1)',
                bgcolor: 'rgba(255,255,255,0.25)' 
              }
            }}
          >
            <PlayArrowIcon sx={{ fontSize: 45, color: 'white' }} />
          </Box>

          <Typography 
            variant="h4" 
            sx={{ fontWeight: 800, mb: 2, textAlign: 'center' }}
          >
            Watch the OMTP intro video
          </Typography>
          
          <Typography 
            variant="body1" 
            sx={{ 
              mb: 4, 
              opacity: 0.9, 
              maxWidth: '620px', 
              textAlign: 'center',
              lineHeight: 1.6 
            }}
          >
            Get a quick overview of how the platform helps learners make operational decisions, review outcomes, and build practical business understanding.
          </Typography>

          <Button 
            variant="contained" 
            onClick={handleOpenVideo}
            sx={{ 
              bgcolor: 'white', 
              color: '#4c1d95', 
              px: 5, py: 1.5,
              fontWeight: 800, 
              borderRadius: '50px', // Pill shape matching screenshot
              textTransform: 'none',
              fontSize: '1.05rem',
              boxShadow: '0 4px 14px rgba(0,0,0,0.1)',
              '&:hover': { bgcolor: '#f8f9fa', transform: 'translateY(-2px)' }
            }}
          >
            Watch on YouTube
          </Button>
        </Box>

        {/* Contextual Caption */}
        <Typography 
          variant="body2" 
          sx={{ color: '#9ca3af', mt: 3, textAlign: 'left', fontStyle: 'italic' }}
        >
          This opens the video directly on YouTube, which is the most reliable option while reviewing the page locally.
        </Typography>
      </Container>
    </Box>
  );
};

export default VideoIntro;