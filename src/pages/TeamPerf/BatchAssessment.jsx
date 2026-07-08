// File: src/pages/TeamPerf/BatchAssessment.jsx

import React, { useEffect, useMemo, useState } from "react";
import {
  Box,
  Typography,
  Paper,
  Grid,
  TextField,
  MenuItem,
  Button,
  CircularProgress,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  Card,
  CardContent,
  Stack,
} from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import { getBatch, getTeam } from "./services/service";

const BatchAssessment = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [loading, setLoading] = useState(false);
  const [masterRows, setMasterRows] = useState([]);
  const [gameId, setGameId] = useState("");
  const [gameBatch, setGameBatch] = useState("");
  const [teams, setTeams] = useState([]);

  const restoreState = location.state?.restore || false;
  const restoreGameId = location.state?.gameId;
  const restoreGameBatch = location.state?.gameBatch;

  useEffect(() => {
    loadBatch();
  }, []);

  useEffect(() => {
    if (restoreState && gameId && gameBatch) {
      loadTeams();
      navigate(location.pathname, { replace: true, state: null });
    }
  }, [restoreState, gameId, gameBatch, navigate, location.pathname]);

  const loadBatch = async () => {
    try {
      setLoading(true);
      const res = await getBatch();
      setMasterRows(Array.isArray(res.data.data) ? res.data.data : []);

      if (restoreState) {
        setGameId(restoreGameId);
        setGameBatch(restoreGameBatch);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const gameList = useMemo(
    () => [...new Set(masterRows.map((r) => r.Game_Id))],
    [masterRows]
  );

  const batchList = useMemo(
    () => masterRows.filter((r) => r.Game_Id === gameId).map((r) => r.Game_Batch),
    [masterRows, gameId]
  );

  const loadTeams = async () => {
    try {
      setLoading(true);
      const res = await getTeam(gameId, gameBatch);
      setTeams(res.data.allTeams || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const getBandColor = (band) => {
    switch (band) {
      case "Outstanding":
        return "success";
      case "Excellent":
        return "primary";
      case "Good":
        return "info";
      case "Satisfactory":
        return "warning";
      default:
        return "error";
    }
  };

  const handleView = (row) => {
    navigate("/operationGame/TeamAssessment", {
      state: {
        fromFaculty: true,
        gameId: row.Game_Id,
        gameBatch: row.Game_Batch,
        gameTeam: row.Game_Team,
      },
    });
  };

  // Summary metrics
  const totalTeams = teams.length;
  const topScore = teams.length ? Math.max(...teams.map((t) => t.Overall_Score)) : 0;
  const avgScore = teams.length
    ? (teams.reduce((sum, t) => sum + Number(t.Overall_Score), 0) / teams.length).toFixed(2)
    : 0;
  const minScore = teams.length ? Math.min(...teams.map((t) => t.Overall_Score)) : 0;

  return (
    <Box sx={{ p: 3, backgroundColor: "#f9f9fc", minHeight: "100vh" }}>
      <Typography variant="h4" fontWeight={700} sx={{ color: "#5e35b1", mb: 0.5 }}>
        Batch Assessment
      </Typography>
      <Typography variant="body2" sx={{ mb: 3, color: "#7e57c2" }}>
        Review team performance across selected batches
      </Typography>

      {/* Controls */}
      <Paper sx={{ p: 2.5, mb: 3, borderRadius: 2 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={4}>
            <TextField
              select
              fullWidth
              size="small"
              label="Game"
              value={gameId}
              onChange={(e) => {
                setGameId(e.target.value);
                setGameBatch("");
              }}
            >
              {gameList.map((game) => (
                <MenuItem key={game} value={game}>
                  {game}
                </MenuItem>
              ))}
            </TextField>
          </Grid>

          <Grid item xs={12} md={4}>
            <TextField
              select
              fullWidth
              size="small"
              label="Batch"
              value={gameBatch}
              onChange={(e) => setGameBatch(e.target.value)}
            >
              {batchList.map((batch) => (
                <MenuItem key={batch} value={batch}>
                  {batch}
                </MenuItem>
              ))}
            </TextField>
          </Grid>

          <Grid item xs={12} md={4}>
            <Button
              fullWidth
              variant="contained"
              sx={{
                height: 40,
                borderRadius: "999px",
                textTransform: "none",
                fontWeight: 600,
                backgroundColor: "#7e57c2",
                "&:hover": {
                  backgroundColor: "#5e35b1",
                },
              }}
              disabled={!gameId || !gameBatch}
              onClick={loadTeams}
            >
              Load Teams
            </Button>
          </Grid>
        </Grid>
      </Paper>

      {/* Summary */}
      {teams.length > 0 && (
        <Grid container spacing={2} mb={3}>
          {[
            { label: "Total Teams", value: totalTeams },
            { label: "Top Score", value: topScore },
            { label: "Average Score", value: avgScore },
            { label: "Range", value: `${minScore} – ${topScore}` },
          ].map((item, i) => (
            <Grid item xs={12} md={3} key={i}>
              <Card sx={{ backgroundColor: "#ede7f6", borderRadius: 2 }}>
                <CardContent sx={{ py: 1.5 }}>
                  <Typography variant="caption" color="text.secondary">
                    {item.label}
                  </Typography>
                  <Typography variant="h6" sx={{ color: "#5e35b1", fontWeight: 700 }}>
                    {item.value}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}

      {/* Table */}
      {loading ? (
        <Box sx={{ display: "flex", justifyContent: "center", mt: 5 }}>
          <CircularProgress color="secondary" />
        </Box>
      ) : (
        <Paper elevation={2} sx={{ borderRadius: 2 }}>
          <TableContainer>
            <Table size="small">
              <TableHead sx={{ backgroundColor: "#ede7f6" }}>
                <TableRow>
                  <TableCell><b>Rank</b></TableCell>
                  <TableCell><b>Team</b></TableCell>
                  <TableCell align="right"><b>Score</b></TableCell>
                  <TableCell><b>Performance</b></TableCell>
                  <TableCell align="center"><b>Action</b></TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {teams.map((row) => (
                  <TableRow hover key={row.Perf_Id}>
                    <TableCell>{row.Rank_No}</TableCell>

                    <TableCell>
                      <Typography variant="body2" fontWeight={600}>
                        {row.Game_Team}
                      </Typography>
                    </TableCell>

                    <TableCell align="right">
                      <Stack direction="row" spacing={1} justifyContent="flex-end">
                        <Chip
                          label={Number(row.Overall_Score).toFixed(0)}
                          size="small"
                          sx={{
                            fontWeight: 700,
                            backgroundColor: "#ede7f6",
                            color: "#5e35b1",
                          }}
                        />
                      </Stack>
                    </TableCell>

                    <TableCell>
                      <Chip
                        label={row.Band_Name}
                        color={getBandColor(row.Band_Name)}
                        size="small"
                      />
                    </TableCell>

                    <TableCell align="center">
                      <Button
                        size="small"
                        variant="outlined"
                        sx={{
                          color: "#5e35b1",
                          borderColor: "#5e35b1",
                          fontSize: "0.75rem",
                          "&:hover": {
                            backgroundColor: "#ede7f6",
                          },
                        }}
                        onClick={() => handleView(row)}
                      >
                        View
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      )}
    </Box>
  );
};

export default BatchAssessment;