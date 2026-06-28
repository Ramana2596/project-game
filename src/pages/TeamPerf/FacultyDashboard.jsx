// File : src/pages/TeamPerf/FacultyDashboard.jsx

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
} from "@mui/material";

import { useLocation, useNavigate } from "react-router-dom";
import {
  getBatch,
  getTeamPerf,
} from "./services/teamPerfService";

const FacultyDashboard = () => {

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

  // Load Game / Batch LOV

  useEffect(() => {
    loadBatch();
  }, []);

 
  // Restore previous Faculty selection

  useEffect(() => {

    if (
      restoreState &&
      gameId &&
      gameBatch
    ) {

      loadTeams();

      // Clear restore state so refresh behaves as a normal page
      navigate(location.pathname, {
        replace: true,
        state: null,
      });

    }

  }, [
    restoreState,
    gameId,
    gameBatch,
    navigate,
    location.pathname,
  ]);

  const loadBatch = async () => {
    try {
      setLoading(true);

      const res = await getBatch();

      setMasterRows(
        Array.isArray(res.data.data)
          ? res.data.data
          : []
      );

      if (restoreState) {
        setGameId(restoreGameId);
        setGameBatch(restoreGameBatch);
      }
    }
    catch (err) {
      console.error(err);
    }
    finally {
      setLoading(false);
    }
  };

  // Game List

  const gameList = useMemo(() => {
    return [...new Set(masterRows.map(r => r.Game_Id))];
  }, [masterRows]);


  // Batch List

  const batchList = useMemo(() => {
    return masterRows
      .filter(r => r.Game_Id === gameId)
      .map(r => r.Game_Batch);
  }, [masterRows, gameId]);


  // Load Teams

  const loadTeams = async () => {

    try {
      setLoading(true);
      const res = await getTeamPerf(
        gameId,
        gameBatch
      );
      setTeams(res.data.allTeams || []);
    }
    catch (err) {
      console.error(err);
    }
    finally {
      setLoading(false);
    }
  };

  // Band Color

  const getBandColor = (band) => {

    switch (band) {
      case "Outstanding": return "success";
      case "Excellent": return "primary";
      case "Good": return "info";
      case "Satisfactory": return "warning";
      default: return "error";
    }
  };

  // View Team

  const handleView = (row) => {

    navigate("/operationGame/TeamDashboard", {
      state: {
        fromFaculty: true,
        gameId: row.Game_Id,
        gameBatch: row.Game_Batch,
        gameTeam: row.Game_Team,
      },
    });

  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h5" fontWeight="bold">
        Faculty Dashboard
      </Typography>
      <Typography
        variant="body2"
        color="text.secondary"
        sx={{ mb: 3 }}
      >
        Select Game and Batch to review team performance.
      </Typography>
      <Paper sx={{ p: 2, mb: 3 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={4}>
            <TextField
              select
              fullWidth
              label="Game"
              value={gameId}
              onChange={(e) => {
                setGameId(e.target.value);
                setGameBatch("");
              }}
            >
              {gameList.map(game => (
                <MenuItem
                  key={game}
                  value={game}
                >
                  {game}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid item xs={12} md={4}>
            <TextField
              select
              fullWidth
              label="Batch"
              value={gameBatch}
              onChange={(e) =>
                setGameBatch(e.target.value)
              }
            >
              {batchList.map(batch => (
                <MenuItem
                  key={batch}
                  value={batch}
                >
                  {batch}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid item xs={12} md={4}>
            <Button
              fullWidth
              variant="contained"
              sx={{ height: "56px" }}
              disabled={!gameId || !gameBatch}
              onClick={loadTeams}
            >
              Load Teams
            </Button>
          </Grid>
        </Grid>
      </Paper>
      {loading ? (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            mt: 5,
          }}
        >
          <CircularProgress />
        </Box>
      ) : (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
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
                <TableRow
                  hover
                  key={row.Perf_Id}
                >
                  <TableCell>
                    {row.Rank_No}
                  </TableCell>
                  <TableCell>
                    {row.Game_Team}
                  </TableCell>
                  <TableCell align="right">
                    {Number(row.Overall_Score).toFixed(0)}
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
      )}
    </Box>
  );

};

export default FacultyDashboard;