import React from 'react';
import { Box, Container, Grid, Typography } from '@mui/material';

const ContentSections = ({ pageConstants, findImageForSection, imageSectionsOrder }) => {
    return (
        <Box sx={{ bgcolor: 'white', py: 10 }}>
            {pageConstants.toolBarSections.map((section, idx) => {
                const imgEntry = findImageForSection(section);
                const img = imgEntry ? imgEntry.src : null;

                let side = 'right';
                if (img) {
                    const imageIndex = imageSectionsOrder[section.key];
                    if (typeof imageIndex === 'number') {
                        side = (imageIndex % 2 === 0) ? 'left' : 'right';
                    } else {
                        side = (idx % 2 === 0) ? 'right' : 'left';
                    }
                    if (imgEntry && imgEntry.name === 'what-is-omg') {
                        side = 'right';
                    }
                }

                return (
                    <Box id={section.key} key={section.key} sx={{ py: 8, scrollMarginTop: 'var(--welcome-scroll-margin, 80px)' }}>
                        <Container maxWidth="lg">
                            {img ? (
                                <Grid container spacing={6} alignItems="center">
                                    {side === 'left' ? (
                                        <>
                                            <Grid item xs={12} md={6}>
                                                <Box sx={{
                                                    borderRadius: '16px',
                                                    overflow: 'hidden',
                                                    boxShadow: '0 12px 40px rgba(11, 8, 33, 0.1)',
                                                    aspectRatio: '4/3'
                                                }}>
                                                    <img src={img} alt={section.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                                </Box>
                                            </Grid>
                                            <Grid item xs={12} md={6}>
                                                <Typography variant="h4" sx={{ fontWeight: 800, mb: 3, color: 'text.primary' }}>
                                                    {section.title}
                                                </Typography>
                                                <Box sx={{ color: 'text.secondary', lineHeight: 1.8 }}>
                                                    {section.content}
                                                </Box>
                                            </Grid>
                                        </>
                                    ) : (
                                        <>
                                            <Grid item xs={12} md={6}>
                                                <Typography variant="h4" sx={{ fontWeight: 800, mb: 3, color: 'text.primary' }}>
                                                    {section.title}
                                                </Typography>
                                                <Box sx={{ color: 'text.secondary', lineHeight: 1.8 }}>
                                                    {section.content}
                                                </Box>
                                            </Grid>
                                            <Grid item xs={12} md={6}>
                                                <Box sx={{
                                                    borderRadius: '16px',
                                                    overflow: 'hidden',
                                                    boxShadow: '0 12px 40px rgba(11, 8, 33, 0.1)',
                                                    aspectRatio: '4/3'
                                                }}>
                                                    <img src={img} alt={section.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                                </Box>
                                            </Grid>
                                        </>
                                    )}
                                </Grid>
                            ) : (
                                <Box>
                                    <Typography variant="h4" sx={{ fontWeight: 800, mb: 3, color: 'text.primary' }}>
                                        {section.title}
                                    </Typography>
                                    <Box sx={{ color: 'text.secondary', lineHeight: 1.8 }}>
                                        {section.content}
                                    </Box>
                                </Box>
                            )}
                        </Container>
                    </Box>
                );
            })}
        </Box>
    );
};

export default ContentSections;
