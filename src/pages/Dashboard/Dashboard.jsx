import { useState, useEffect } from "react";
import {
  Card,
  CardActionArea,
  CardContent,
  Typography,
  Grid,
  Box,
  Chip,
} from "@mui/material";

import { useNavigate } from "react-router-dom";
import { useLoading } from "../../hooks/loadingIndicatorContext.jsx";
import ToastMessage from "../../components/ToastMessage.jsx";
import { componentList } from "../../constants/globalConstants.js";
import { getChartInfo } from "./services/service.js";
import { useUser } from "../../core/access/userContext.jsx";

import PrecisionManufacturingTwoToneIcon
  from "@mui/icons-material/PrecisionManufacturingTwoTone";

function Dashboard() {

  const { setIsLoading } = useLoading();
  const { userInfo } = useUser();
  const navigate = useNavigate();

  const [alertData, setAlertData] = useState({
    severity: "",
    message: "",
    isVisible: false,
  });

  const [chartData, setChartData] = useState({
    Total_Inventory: [],
    Profit_Percent: [],
    Cash_Flow: [],
  });

  const dashboardItem =
    componentList.find(
      item => item.id === "UI 99 900"
    );

  const children =
    dashboardItem?.children || [];

  useEffect(() => {

    const fetchCharts = async () => {

      setIsLoading(true);

      try {

        const params = {
          gameId: userInfo?.gameId,
          gameBatch: userInfo?.gameBatch,
          gameTeam: userInfo?.gameTeam,
        };

        const [inventory, profit, cashflow] =
          await Promise.all([
            getChartInfo({
              ...params,
              cmdLine: "Total_Inventory",
            }),
            getChartInfo({
              ...params,
              cmdLine: "Profit_%",
            }),
            getChartInfo({
              ...params,
              cmdLine: "Cash_Flow",
            }),
          ]);

        const mapChart = (result) =>
          (result?.data || []).map(item => ({
            label: item.Period,
            value: item.Value,
            legend: item.Legend,
            team: item.Team,
            chartType: item.Chart_Type,
            chart: item.Chart,
          }));

        setChartData({
          Total_Inventory: mapChart(inventory),
          Profit_Percent: mapChart(profit),
          Cash_Flow: mapChart(cashflow),
        });

      } catch {

        setAlertData({
          severity: "error",
          message: "Failed to load chart data.",
          isVisible: true,
        });

      } finally {

        setIsLoading(false);

      }

    };

    if (
      userInfo?.gameId &&
      userInfo?.gameBatch &&
      userInfo?.gameTeam
    ) {
      fetchCharts();
    }

  }, [userInfo, setIsLoading]);

  const handleCardClick = (child) => {

    if (child?.href) {
      navigate(child.href);
    }

  };

  const normalize = (str) =>
    (str || "")
      .toLowerCase()
      .replace(/[^a-z0-9]/g, "");

  const getChartForLabel = (label) => {

    const norm = normalize(label);

    if (norm.includes("balance"))
      return chartData.Total_Inventory;

    if (norm.includes("income"))
      return chartData.Profit_Percent;

    if (norm.includes("cashflow"))
      return chartData.Cash_Flow;

    return [];

  };

return (
  <Box
    sx={{
      minHeight: "100vh",
      background:
        "linear-gradient(135deg,#faf7ff 0%,#f3edff 45%,#ffffff 100%)",
      py: 4,
      px: { xs: 2, md: 4 },
    }}
  >

    {/* ================= HERO ================= */}

    <Box
      sx={{
        position: "relative",
        overflow: "hidden",
        mb: 4,
        p: 3.5,
        borderRadius: 5,
        background:
          "linear-gradient(90deg,#5E35B1,#7E57C2,#9575CD)",
        color: "#fff",
        boxShadow:
          "0 12px 36px rgba(94,53,177,.28)",
      }}
    >

      {/* Decorative Background Circle */}

      <Box
        sx={{
          position: "absolute",
          right: -60,
          top: -40,
          width: 220,
          height: 220,
          borderRadius: "50%",
          bgcolor: "rgba(255,255,255,.08)",
        }}
      />

      {/* Watermark Manufacturing Icon */}

      <PrecisionManufacturingTwoToneIcon
        sx={{
          position: "absolute",
          right: 25,
          top: "50%",
          transform: "translateY(-50%)",
          fontSize: 110,
          color: "rgba(255,255,255,.12)",
        }}
      />

      <Typography
        variant="h4"
        sx={{
          fontWeight: 700,
          letterSpacing: .4,
          position: "relative",
          zIndex: 2,
        }}
      >
        Experiential Learning Centre
      </Typography>

      <Typography
        variant="subtitle1"
        sx={{
          mt: 0.5,
          color: "rgba(255,255,255,.92)",
          letterSpacing: .3,
          position: "relative",
          zIndex: 2,
        }}
      >
        Market Dynamics • Business Simulation • Learning • Assessment
      </Typography>

    </Box>

    {/* ================= CARDS ================= */}

    <Grid
      container
      spacing={5}
      justifyContent="center"
      alignItems="stretch"
    >
      {children.map((child, index) => {

        const dataForCard =
          getChartForLabel(child.label);

        const latest =
          dataForCard.length
            ? dataForCard[dataForCard.length - 1]
            : null;

        return (

          <Grid
            item
            xs={12}
            sm={6}
            md={4}
            key={index}
          >

            <Card
              elevation={0}
              sx={{
                position: "relative",
                height: "100%",
                overflow: "hidden",
                borderRadius: 5,
                border: "1px solid #E7E0F8",
                transition: ".30s",

                "&::before": {
                  content: '""',
                  display: "block",
                  height: 5,
                  background:
                    "linear-gradient(90deg,#5E35B1,#9575CD)",
                },

                "&:hover": {
                  transform: "translateY(-8px)",
                  borderColor: "#7E57C2",
                  boxShadow:
                    "0 18px 42px rgba(94,53,177,.18)",
                },
              }}
            >
              <CardActionArea
                sx={{
                  height: "100%",
                  cursor: "pointer",
                }}
                onClick={() => handleCardClick(child)}
              >
                <CardContent
                  sx={{
                    p: 2.5,
                    display: "flex",
                    alignItems: "center",
                    gap: 3,
                  }}
                >

                  {/* Icon */}

                  <Box
                    sx={{
                      width: 64,
                      height: 64,
                      borderRadius: "22px",
                      background:
                        "linear-gradient(135deg,#5E35B1,#9575CD)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,

                      "& svg": {
                        color: "#fff",
                        fontSize: 42,
                      },
                    }}
                  >
                    {child.icon}
                  </Box>

                  <Box sx={{ flex: 1 }}>

                    <Typography
                      variant="h6"
                      sx={{
                        fontWeight: 700,
                        color: "#4527A0",
                      }}
                    >
                      {child.label}
                    </Typography>

                    <Typography
                      variant="body2"
                      sx={{
                        mt: 1,
                        color: "#6B6488",
                        lineHeight: 1.7,
                      }}
                    >
                      {latest
                        ? latest.label
                        : "Information available"}
                    </Typography>

                  </Box>

                </CardContent>

              </CardActionArea>

            </Card>

          </Grid>

        );

      })}

    </Grid>
    <ToastMessage
      open={alertData.isVisible}
      severity={alertData.severity}
      message={alertData.message}
    />

  </Box>
);

}

export default Dashboard;
