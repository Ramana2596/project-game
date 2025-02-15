import * as React from 'react';
import { useEffect, useState } from 'react';
import { Card, CardActionArea, CardContent, Typography, Grid } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useLoading } from '../../hooks/loadingIndicatorContext.js';
import ToastMessage from '../../components/ToastMessage.jsx';
import { pageConstants } from '../GameDashboard/constants/pageConstants.js';
import { componentList } from '../../constants/globalConstants.js';
import { Box } from "@mui/material";
import BarChartComponent from '../../components/BarChartComponent.jsx';

function GameDashboard() {
  const { setIsLoading } = useLoading();
  const navigate = useNavigate();
  const [alertData, setAlertData] = useState({
    severity: '',
    message: '',
    isVisible: false,
  });

  const handleCardClick = (href) => {
    navigate(href);
  };

  // Find the "Game Dashboard" item and get its children
  const gameDashboardItem = componentList.find(item => item.label === 'Game Dashboard');
  const children = gameDashboardItem ? gameDashboardItem.children : [];

  return (
    <Box sx={{ flexGrow: 1, padding: 20 }}>
      <Grid container spacing={2}>
        {children.map((child, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Card className="custom-card">
              <CardActionArea onClick={() => handleCardClick(child.href)}>
                <CardContent>
                  <Typography variant="h5" component="div">
                    {child.label}
                  </Typography>
                  <BarChartComponent />
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        ))}
      </Grid>
      <ToastMessage
        open={alertData.isVisible}
        severity={alertData.severity}
        message={alertData.message}
      />
    </Box>
  );
}

export default GameDashboard;
