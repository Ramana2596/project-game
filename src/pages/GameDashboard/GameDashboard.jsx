import { useState, useEffect } from 'react';
import { Card, CardActionArea, CardContent, Typography, Grid } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useLoading } from '../../hooks/loadingIndicatorContext.js';
import ToastMessage from '../../components/ToastMessage.jsx';
import { pageConstants } from '../GameDashboard/constants/pageConstants.js';
import { componentList } from '../../constants/globalConstants.js';
import { Box } from "@mui/material";
import BarChartComponent from '../../components/BarChartComponent.jsx';
import InventoryLineChart from './components/InventoryLineChart.jsx';
import ProfitPercentLineChart from './components/ProfitPercentLineChart.jsx';
import { getChartInfo } from './services/gameDashboard.js';
import { useUser } from "../../core/access/userContext.js";
import CashFlowChart from './components/CashFlowChart.jsx';
import AccountBalanceWalletTwoToneIcon from '@mui/icons-material/AccountBalanceWalletTwoTone';
import SummarizeTwoToneIcon from '@mui/icons-material/SummarizeTwoTone';
import CurrencyExchangeTwoToneIcon from '@mui/icons-material/CurrencyExchangeTwoTone';

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
    Total_Inventory: [],
    Profit_Percent: [],
    Cash_Flow: [],
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
        // Transform cashflow and inventory data for the chart
        const cashFlowData = (cashflow?.data || []).map(item => ({
          label: item.Period,
          value: item.Value,
          legend: item.Legend,
          team: item.Team,
          chartType: item.Chart_Type,
          chart: item.Chart,
        }));
        const inventoryData = (inventory?.data || []).map(item => ({
          label: item.Period,
          value: item.Value,
          legend: item.Legend,
          team: item.Team,
          chartType: item.Chart_Type,
          chart: item.Chart,
        }));
        const profitPercentData = (profit?.data || []).map(item => ({
          label: item.Period,
          value: item.Value,
          legend: item.Legend,
          team: item.Team,
          chartType: item.Chart_Type,
          chart: item.Chart,
        }));
        setChartData({
          Total_Inventory: inventoryData,
          Profit_Percent: profitPercentData,
          Cash_Flow: cashFlowData,
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

  const handleCardClick = (child) => {
    // navigate to the child's page; that page will render the chart above its table
    if (child?.href) navigate(child.href);
  };

  // Normalize label for robust matching
  const normalize = (str) => (str || '').toLowerCase().replace(/[^a-z0-9]/g, '');
  const getChartForLabel = (label) => {
    const norm = normalize(label);
    if (norm.includes('balance')) return chartData.Total_Inventory;
    if (norm.includes('income')) return chartData.Profit_Percent;
    if (norm.includes('cashflow')) return chartData.Cash_Flow;
    return [];
  };

  return (
    <Box sx={{ flexGrow: 1, padding: 2, display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '70vh' }}>
      {/* Cards row: show three cards horizontally (responsive) */}
      <Grid container spacing={3} alignItems="stretch" justifyContent="center" sx={{ width: '100%', maxWidth: 1200 }}>
        {children.map((child, index) => {
          const normLabel = normalize(child.label);
          // small summary value for card (latest value)
          const dataForCard = getChartForLabel(child.label) || [];
          const latest = dataForCard.length ? dataForCard[dataForCard.length - 1] : null;
          return (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Card className="custom-card" sx={{ height: '100%' }}>
                <CardActionArea onClick={() => handleCardClick(child)}>
                  <CardContent sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    {/* icon */}
                    {(() => {
                      const n = normLabel;
                      if (n.includes('balance')) return <AccountBalanceWalletTwoToneIcon sx={{ fontSize: 40, color: 'primary.main' }} />;
                      if (n.includes('income')) return <SummarizeTwoToneIcon sx={{ fontSize: 40, color: 'primary.main' }} />;
                      if (n.includes('cashflow')) return <CurrencyExchangeTwoToneIcon sx={{ fontSize: 40, color: 'primary.main' }} />;
                      return <SummarizeTwoToneIcon sx={{ fontSize: 40, color: 'primary.main' }} />;
                    })()}
                    <div>
                      <Typography variant="h6" component="div" gutterBottom>
                        {child.label}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {latest ? `${latest.label}: ${latest.value}` : 'No data available'}
                      </Typography>
                    </div>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>
          );
        })}
      </Grid>

      {/* charts are rendered on their respective pages (above tables) */}
      <ToastMessage
        open={alertData.isVisible}
        severity={alertData.severity}
        message={alertData.message}
      />
    </Box>
  );
}

export default GameDashboard;
