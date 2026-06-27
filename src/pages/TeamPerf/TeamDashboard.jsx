import React, { useEffect, useState } from "react";

import {
  Box,
  Typography,
  Paper,
  Grid,
  Chip,
  CircularProgress,
  Button,
  Divider,
  Card,
  CardContent,
} from "@mui/material";

import { useLocation, useNavigate } from "react-router-dom";
import { useUser } from "../../core/access/userContext";
import { getTeamPerf } from "./services/teamPerfService";

import PerfHeader from "./components/PerfHeader";
import YardstickChart from "./components/YardstickChart";

/**
 * TeamDashboard
 * - Executive Performance View
 * - Uses UI_TA_Perf_Query
 */

const TeamDashboard = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const { userInfo } = useUser();

  const [loading, setLoading] = useState(true);

  const [header, setHeader] = useState(null);
  const [yardsticks, setYardsticks] = useState([]);
  const [ratios, setRatios] = useState([]);
  const gameId = state?.gameId ?? userInfo.gameId;
  const gameBatch = state?.gameBatch ?? userInfo.gameBatch;
  const gameTeam = state?.gameTeam ?? userInfo.gameTeam;

  useEffect(() => {
    loadTeam();
  }, []);

  const loadTeam = async () => {
    try {
      setLoading(true);

      const res = await getTeamPerf(
        gameId,
        gameBatch,
        gameTeam
      );
      const data = res.data || {};

      setHeader(data.header || null);
      setYardsticks(data.yardsticks || []);
      setRatios(data.ratios || []);
    } catch (err) {
      console.error("Team Dashboard Error:", err);
    } finally {
      setLoading(false);
    }
  };

  const goToDebrief = () => {
    navigate("/teamperf/debrief", {
      state: {
        gameId,
        gameBatch,
        gameTeam,
      },
    });
  };

  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", mt: 6 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (!header) {
    return (
      <Box sx={{ p: 3 }}>
        <Typography color="error">
          No performance data found.
        </Typography>
      </Box>
    );
  }

  const yardstickColors = {
    Profitability: "#1565c0",
    Liquidity: "#2e7d32",
    Leverage: "#ef6c00",
    Growth: "#6a1b9a",
  };

  return (
    <Box sx={{ p: 3 }}>

      {/* EXECUTIVE HEADER */}
      <PerfHeader
        team={gameTeam}
        header={header}
      />

      {/* MAIN CONTENT AREA */}
      <Grid container spacing={2} sx={{ mt: 2 }}>
        {/* LEFT: YARDSTICK PERFORMANCE */}
        <Grid item xs={12} md={5}>
          <Paper
            elevation={2}
            sx={{ p: 2, borderRadius: 2, height: "100%" }}
          >
            <Typography variant="h6" fontWeight={700} gutterBottom>
              Performance Yardsticks
            </Typography>

            <Divider sx={{ mb: 2 }} />

            <YardstickChart data={yardsticks} />
          </Paper>
        </Grid>

        {/* RIGHT: RATIO SNAPSHOT */}
        <Grid item xs={12} md={7}>
          <Paper
            elevation={2}
            sx={{ p: 2, borderRadius: 2, height: "100%" }}
          >
            <Typography variant="h6" fontWeight={700} gutterBottom>

              Ratio Analysis
            </Typography>

            <Divider sx={{ mb: 2 }} />

            <Grid container spacing={2}>

              {ratios.map((r) => (
                <Grid item xs={12} sm={6} md={4} key={r.Ratio_Id}>
                  <Card
                    variant="outlined"
                    sx={{
                      borderLeft: `4px solid ${yardstickColors[r.Yardstick_Name] || "#bdbdbd"
                        }`,
                      transition: "0.2s",
                      "&:hover": {
                        transform: "scale(1.02)",
                        boxShadow: 3,
                      },
                    }}
                  >
                    <CardContent
                      sx={{
                        p: 1.5,
                        "&:last-child": {
                          pb: 1.5,
                        },
                      }}
                    >                      <Chip
                        label={r.Yardstick_Name}
                        size="small"
                        sx={{
                          bgcolor: yardstickColors[r.Yardstick_Name] || "#e0e0e0",
                          color: "#fff",
                          fontWeight: 600,
                          mb: 1,
                        }}
                      />

                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                          mt: 0.5,
                          mb: 0.5,
                        }}
                      >
                        <Typography
                          variant="subtitle2"
                          fontWeight={600}
                          sx={{ pr: 1 }}
                        >
                          {r.Ratio_Name}
                        </Typography>

                        <Chip
                          label={Number(r.Ratio_Overall || 0).toFixed(2)}
                          size="small"
                          color="primary"
                          variant="outlined"
                        />
                      </Box>


                      <Typography variant="body2" color="text.secondary">
                        Actual : {Number(r.Ratio_Value || 0).toFixed(2)}
                      </Typography>

                      <Typography
                        variant="subtitle1"
                        color="primary"
                        fontWeight={600}
                        sx={{ mt: 0.25 }}
                      >
                        {Number(r.Ratio_Score || 0).toFixed(0)}%
                      </Typography>

                    </CardContent>
                  </Card>
                </Grid>
              ))}

            </Grid>

          </Paper>
        </Grid>

      </Grid>
      {/* PERFORMANCE HIGHLIGHTS */}
      <Paper
        elevation={2}
        sx={{
          mt: 3,
          p: 2,
          borderRadius: 2,
          background: "linear-gradient(135deg,#ffffff,#f9fafb)",
        }}
      >
        <Typography variant="h6" fontWeight={600} gutterBottom>
          Performance Highlights
        </Typography>

        <Divider sx={{ mb: 2 }} />

        {(() => {
          if (!ratios.length) return null;

          const sorted = [...ratios].sort(
            (a, b) => (b.Ratio_Score || 0) - (a.Ratio_Score || 0)
          );

          const best = sorted[0];
          const worst = sorted[sorted.length - 1];

          return (
            <Grid container spacing={2}>

              {/* BEST */}
              <Grid item xs={12} md={6}>
                <Card
                  sx={{
                    borderLeft: "6px solid #2e7d32",
                    height: "100%",
                  }}
                >
                  <CardContent>
                    <Typography
                      variant="caption"
                      color="text.secondary"
                    >
                      ⭐ Best Performing Ratio
                    </Typography>

                    <Typography
                      variant="subtitle1"
                      fontWeight={700}
                      sx={{ mt: 1 }}
                    >
                      {best?.Ratio_Name}
                    </Typography>

                    <Typography
                      variant="h5"
                      color="success.main"
                      fontWeight={700}
                    >
                      {Number(best?.Ratio_Score || 0).toFixed(2)}
                    </Typography>

                    <Typography
                      variant="caption"
                      color="text.secondary"
                    >
                      {best?.Yardstick_Name}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>

              {/* WORST */}
              <Grid item xs={12} md={6}>
                <Card
                  sx={{
                    borderLeft: "6px solid #d32f2f",
                    height: "100%",
                  }}
                >
                  <CardContent>
                    <Typography
                      variant="caption"
                      color="text.secondary"
                    >
                      ⚠ Needs Improvement
                    </Typography>

                    <Typography
                      variant="subtitle1"
                      fontWeight={700}
                      sx={{ mt: 1 }}
                    >
                      {worst?.Ratio_Name}
                    </Typography>

                    <Typography
                      variant="h5"
                      color="error.main"
                      fontWeight={700}
                    >
                      {Number(worst?.Ratio_Score || 0).toFixed(2)}
                    </Typography>

                    <Typography
                      variant="caption"
                      color="text.secondary"
                    >
                      {worst?.Yardstick_Name}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>

            </Grid>
          );
        })()}
      </Paper>
      {/* ACTION SECTION */}
      <Box
        sx={{
          mt: 3,
          display: "flex",
          justifyContent: "flex-end",
          gap: 2,
        }}
      >
        <Button
          variant="outlined"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        >
          Back to Top
        </Button>

        <Button
          variant="contained"
          color="primary"
          onClick={goToDebrief}
        >
          Go to Debrief
        </Button>
      </Box>

    </Box>
  );
};

export default TeamDashboard;
