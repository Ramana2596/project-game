import * as React from 'react';
import { Card, CardActionArea, CardContent, Typography, Grid } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { Box } from "@mui/material";
import { useUser } from '../../core/access/userContext.jsx';
import '../Operations/styles/style.css';

function UserMgtDesk() {
    const navigate = useNavigate();
    const { userAccessiblePages } = useUser();

    const handleCardClick = (href) => {
        navigate(href);
    };

    //const UserMgtDeskItem = userAccessiblePages?.find(item => item.label === 'User Mgt Desk');
    const UserMgtDeskItem = userAccessiblePages?.find(item => item.id === 'UI 99 980');
    const children = UserMgtDeskItem ? UserMgtDeskItem.children : [];

    return (
        <Box sx={{ flexGrow: 1, padding: 5 }}>
            <Grid container spacing={2}>
                {children.map((child, index) => (
                    <Grid item xs={12} sm={6} md={4} key={index}>
                        <Card className="custom-card">
                            <CardActionArea onClick={() => handleCardClick(child.href)}>
                                <CardContent style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
                                    <Typography variant="h5" component="div">
                                        <img src={child.iconPath} className="card-item-icon" />
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

export default UserMgtDesk;
