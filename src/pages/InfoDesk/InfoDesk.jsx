import * as React from 'react';
import { Card, CardActionArea, CardContent, Typography, Grid } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { componentList } from '../../constants/globalConstants.js';
import { Box } from "@mui/material";

function InfoDesk() {
    const navigate = useNavigate();

    const handleCardClick = (href) => {
        navigate(href);
    };

    const infoDeskItem = componentList.find(item => item.label === 'Info Desk');
    const children = infoDeskItem ? infoDeskItem.children : [];

    return (
        <Box sx={{ flexGrow: 1, padding: 20 }}>
            <Grid container spacing={2}>
                {children.map((child, index) => (
                    <Grid item xs={12} sm={6} md={4} key={index}>
                        <Card className="custom-card">
                            <CardActionArea onClick={() => handleCardClick(child.href)}>
                                <CardContent>
                                    <Typography variant="h5" component="div">
                                        {child.icon}
                                    </Typography>
                                    <Typography variant="h5" component="div">
                                        {child.label}
                                    </Typography>
                                </CardContent>
                            </CardActionArea>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
}

export default InfoDesk;
