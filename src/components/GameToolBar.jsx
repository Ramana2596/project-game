import { useState } from "react";
import { AppBar, Box, Toolbar } from "@mui/material"
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import GameNavigationMenu from './GameNavigationMenu';
import GameMaster from './GameMaster';
import GameBatch from './GameBatch';
import { Routes, Route } from "react-router-dom";
import GameSession from "./GameSession";
import GameDashboard from "./GameDashboard";
import StrategyLaunched from './StrategyLaunched';

export default function BasicTabs() {
  const [open, setOpen] = useState(false);

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar sx={{ marginBottom: 5 }} position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={toggleDrawer(true)}
          >
            <MenuIcon />
          </IconButton>
          <div variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Welcome to Operation Game
          </div>
        </Toolbar>
      </AppBar>
      <GameNavigationMenu openState={open} toggleDrawer={toggleDrawer} />
      <Routes>
        <Route path="/gameDashboard" element={<GameDashboard />} />
        <Route path="/gameMaster" element={<GameMaster />} />
        <Route path="/gameBatch" element={<GameBatch />} />
        <Route path="/gameSession" element={<GameSession />} />
        <Route path="/strategyLaunched" element={<StrategyLaunched />} />
      </Routes>
    </Box>
  );
}
