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

  return (
    <Box sx={{ p: 3 }}>

      {/* EXECUTIVE HEADER */}
      <PerfHeader
        team={gameTeam}
        header={header}
      />

      {/* KPI SUMMARY SECTION */}
      <Grid container spacing={2} sx={{ mt: 2 }}>

        <Grid item xs={12} md={3}>
          <Card elevation={2}>
            <CardContent sx={{ textAlign: "center" }}>
              <Typography variant="caption" color="text.secondary">
                Overall Score
              </Typography>

              <Typography variant="h4" fontWeight={700} color="primary">
                {Number(header.Overall_Score || 0).toFixed(2)}
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={3}>
          <Card elevation={2}>
            <CardContent sx={{ textAlign: "center" }}>
              <Typography variant="caption" color="text.secondary">
                Band
              </Typography>

              <Chip
                label={header.Band_Name}
                color={
                  header.Band_Seq_No === 1 ? "success" :
                  header.Band_Seq_No === 2 ? "primary" :
                  header.Band_Seq_No === 3 ? "info" :
                  header.Band_Seq_No === 4 ? "warning" :
                  "error"
                }
                sx={{ mt: 1 }}
              />
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={3}>
          <Card elevation={2}>
            <CardContent sx={{ textAlign: "center" }}>
              <Typography variant="caption" color="text.secondary">
                Rank
              </Typography>

              <Typography variant="h4" fontWeight={700}>
                {header.Rank_No ?? "-"}
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={3}>
          <Card elevation={2}>
            <CardContent sx={{ textAlign: "center" }}>
              <Typography variant="caption" color="text.secondary">
                Yardsticks
              </Typography>

              <Typography variant="h4" fontWeight={700}>
                {yardsticks.length}
              </Typography>
            </CardContent>
          </Card>
        </Grid>

      </Grid>

      {/* MAIN CONTENT AREA */}
      <Grid container spacing={2} sx={{ mt: 2 }}>
        {/* LEFT: YARDSTICK PERFORMANCE */}
        <Grid item xs={12} md={5}>
          <Paper
            elevation={2}
            sx={{ p: 2, borderRadius: 2, height: "100%" }}
          >
            <Typography variant="h6" fontWeight={600} gutterBottom>
              Yardstick Performance
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
            <Typography variant="h6" fontWeight={600} gutterBottom>
              Ratio Performance Snapshot
            </Typography>

            <Divider sx={{ mb: 2 }} />

            <Grid container spacing={2}>

              {ratios.slice(0, 8).map((r) => (
                <Grid item xs={12} sm={6} key={r.Ratio_Id}>
                  <Card
                    variant="outlined"
                    sx={{
                      transition: "0.2s",
                      "&:hover": {
                        transform: "scale(1.02)",
                        boxShadow: 3,
                      },
                    }}
                  >
                    <CardContent>
                      <Typography
                        variant="caption"
                        color="text.secondary"
                      >
                        {r.Yardstick_Name}
                      </Typography>

                      <Typography
                        variant="subtitle2"
                        fontWeight={600}
                        sx={{ mt: 0.5 }}
                      >
                        {r.Ratio_Name}
                      </Typography>

                      <Typography
                        variant="h6"
                        color="primary"
                        fontWeight={700}
                        sx={{ mt: 1 }}
                      >
                        {Number(r.Ratio_Score || 0).toFixed(2)}
                      </Typography>

                      <Typography
                        variant="caption"
                        color="text.secondary"
                      >
                        Contribution: {Number(r.Ratio_Contribution || 0).toFixed(2)}
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
