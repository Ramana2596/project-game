import { useState, useEffect } from 'react';
import { Card, CardActionArea, CardContent, Typography, Grid } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useLoading } from '../../hooks/loadingIndicatorContext.js';
import ToastMessage from '../../components/ToastMessage.jsx';
import { pageConstants } from '../GameDashboard/constants/pageConstants.js';
import { componentList } from '../../constants/globalConstants.js';
import { Box } from "@mui/material";
import BarChartComponent from '../../components/BarChartComponent.jsx';
import { getChartInfo } from './services/gameDashboard.js';
import { useUser } from "../../core/access/userContext.js";

function GameDashboard() {
  const { setIsLoading } = useLoading();
  const { userInfo } = useUser();
  const navigate = useNavigate();
  const [alertData, setAlertData] = useState({
    severity: '',
    message: '',
    isVisible: false,
  });

  // Chart data state
  const [chartData, setChartData] = useState({
    Total_Inventory: null,
    Profit_Percent: null,
    Cash_Flow: null,
  });

  // Find the "Game Dashboard" item and get its children
  const gameDashboardItem = componentList.find(item => item.label === 'Game Dashboard');
  const children = gameDashboardItem ? gameDashboardItem.children : [];

  useEffect(() => {
    const fetchCharts = async () => {
      setIsLoading(true);
      try {
        const params = {
          gameId: userInfo?.gameId,
          gameBatch: userInfo?.gameBatch,
          gameTeam: userInfo?.gameTeam,
        };
        // Fetch all three charts in parallel
        const [inventory, profit, cashflow] = await Promise.all([
          getChartInfo({ ...params, cmdLine: 'Total_Inventory' }),
          getChartInfo({ ...params, cmdLine: 'Profit_%' }),
          getChartInfo({ ...params, cmdLine: 'Cash_Flow' }),
        ]);
        setChartData({
          Total_Inventory: inventory?.data || [],
          Profit_Percent: profit?.data || [],
          Cash_Flow: cashflow?.data || [],
        });
      } catch (error) {
        setAlertData({
          severity: "error",
          message: "Failed to load chart data.",
          isVisible: true,
        });
      } finally {
        setIsLoading(false);
      }
    };
    if (userInfo?.gameId && userInfo?.gameBatch && userInfo?.gameTeam) {
      fetchCharts();
    }
    // eslint-disable-next-line
  }, [userInfo]);

  const handleCardClick = (href) => {
    navigate(href);
  };

  // Map chart data to children by label
  const getChartForLabel = (label) => {
    if (label === "Total Inventory") return chartData.Total_Inventory;
    if (label === "Profit %") return chartData.Profit_Percent;
    if (label === "Cash Flow") return chartData.Cash_Flow;
    return [];
  };

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
                  <BarChartComponent data={getChartForLabel(child.label)} />
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
