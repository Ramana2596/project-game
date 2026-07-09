import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Paper,
  Grid,
  Card,
  CardContent,
  Divider,
  Chip,
  CircularProgress,
  Button,
  LinearProgress,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

import { useLocation, useNavigate } from "react-router-dom";
import { useUser } from "../../core/access/userContext";

import { getTeamPerf } from "./services/service";

import PerfHeader from "./components/PerfHeader";

/**
 * TeamDebrief
 * FINAL UX LAYER
 * - Learning oriented view
 * - Faculty discussion support
 * - Insight-driven reflection
 */

const TeamDebrief = () => {
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
    loadData();
  }, []);

  const loadData = async () => {
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
      console.error("Debrief Error:", err);
    } finally {
      setLoading(false);
    }
  };

  const goBack = () => {
    navigate(-1);
  };
  
  /*
  const goBack = () => {
    navigate("/operationGame/TeamAssessment", {
      state: {
        gameId,
        gameBatch,
        gameTeam,
      }
    });
  };
  */
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
          No debrief data available.
        </Typography>
      </Box>
    );
  }

  const sorted = [...ratios].sort(
    (a, b) => (b.Ratio_Score || 0) - (a.Ratio_Score || 0)
  );

  const best = sorted.length ? sorted[0] : null;
  const worst = sorted.length ? sorted[sorted.length - 1] : null;

  const strong = sorted.filter((r) => r.Ratio_Score >= 85);
  const weak = sorted.filter((r) => r.Ratio_Score < 70);

  return (
    <Box sx={{ p: 3 }}>

      {/* HEADER */}
      <PerfHeader team={gameTeam} header={header} />

      {/* CONTEXT SUMMARY */}
      <Paper sx={{ p: 2, mt: 2 }} elevation={2}>
        <Typography variant="h6" fontWeight={600}>
          Learning Overview
        </Typography>

        <Typography variant="body2" sx={{ mt: 1 }}>
          A structured reflection of team’s performance.
          It highlights strengths, improvement areas, and decision quality across yardsticks.
        </Typography>
      </Paper>

      {/* INSIGHT CARDS */}
      <Grid container spacing={2} sx={{ mt: 2 }}>

        {/* BEST */}
        <Grid item xs={12} md={4}>
          <Card sx={{ borderLeft: "6px solid #2e7d32" }}>
            <CardContent>
              <Typography variant="caption" color="text.secondary">
                ⭐ Strongest Area
              </Typography>

              <Typography variant="subtitle1" fontWeight={700} sx={{ mt: 1 }}>
                {best?.Ratio_Name}
              </Typography>

              <Typography variant="h5" color="success.main" fontWeight={700}>
                {Number(best?.Ratio_Score || 0).toFixed(2)}
              </Typography>

              <Typography variant="caption" color="text.secondary">
                {best?.Yardstick_Name}
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* WEAK */}
        <Grid item xs={12} md={4}>
          <Card sx={{ borderLeft: "6px solid #d32f2f" }}>
            <CardContent>
              <Typography variant="caption" color="text.secondary">
                ⚠ Improvement Area
              </Typography>

              <Typography variant="subtitle1" fontWeight={700} sx={{ mt: 1 }}>
                {worst?.Ratio_Name}
              </Typography>

              <Typography variant="h5" color="error.main" fontWeight={700}>
                {Number(worst?.Ratio_Score || 0).toFixed(2)}
              </Typography>

              <Typography variant="caption" color="text.secondary">
                {worst?.Yardstick_Name}
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* BALANCE */}
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant="caption" color="text.secondary">
                📊 Performance Balance
              </Typography>

              <Typography variant="h5" fontWeight={700} sx={{ mt: 1 }}>
                {strong.length} Strong / {weak.length} Weak
              </Typography>

              <Typography variant="body2" sx={{ mt: 1 }}>
                Distribution of performance across ratios
              </Typography>
            </CardContent>
          </Card>
        </Grid>

      </Grid>

      {/* YARDSTICK SUMMARY */}
      <Paper sx={{ p: 2, mt: 3 }} elevation={2}>
        <Typography variant="h6" fontWeight={600}>
          Yardstick Summary
        </Typography>

        <Divider sx={{ my: 2 }} />

        <Grid container spacing={2}>
          {yardsticks.map((y) => (
            <Grid item xs={12} md={6} key={y.Yardstick_Id}>
              <Card variant="outlined">
                <CardContent>
                  <Typography fontWeight={600}>
                    {y.Yardstick_Name}
                  </Typography>

                  <Typography variant="body2" color="text.secondary">
                    Contribution: {Number(y.Ratio_Overall || 0).toFixed(2)}
                  </Typography>

                  <LinearProgress
                    variant="determinate"
                    value={Math.min(y.Ratio_Overall || 0, 100)}
                    sx={{ mt: 1, height: 8, borderRadius: 5 }}
                  />
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Paper>

      {/* FACULTY DISCUSSION PANEL */}
      <Paper sx={{ p: 2, mt: 3 }} elevation={2}>
        <Typography variant="h6" fontWeight={600}>
          Faculty Discussion Points
        </Typography>

        <Divider sx={{ my: 2 }} />

        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
          {[
            "What drove the strongest performance area?",
            "Where did decision-making impact outcome?",
            "How could weak ratios be improved?",
            "Was resource allocation optimal?",
            "What would you change in hindsight?",
          ].map((q, i) => (
            <Chip key={i} label={q} color="primary" variant="outlined" />
          ))}
        </Box>
      </Paper>

      {/* ACTION */}
      <Box sx={{ mt: 3, display: "flex", justifyContent: "flex-end" }}>
        <Button
          variant="outlined"
          color="secondary"
          startIcon={<ArrowBackIcon />}
          onClick={goBack}
          sx={{
            borderRadius: "999px",
            textTransform: "none",
            px: 3,
            fontWeight: 600,
          }}
        >
          Back
        </Button>
      </Box>

    </Box>
  );
};

export default TeamDebrief;