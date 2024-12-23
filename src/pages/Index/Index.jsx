import { useEffect, useState } from "react";
import { AppBar, Box, Toolbar, Typography } from "@mui/material"
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import GameNavigationMenu from '../GameNavigationMenu';
import GameMaster from '../GameMaster';
import GameBatch from '../GameBatch';
import { Routes, Route } from "react-router-dom";
import GameSession from "../GameSession";
import GameDashboard from "../GameDashboard";
import StrategyLaunched from '../StrategyLaunched';
import StrategyPlanApproval from "../StrategyPlanApproval";
import MarketFactorInfo from "../MarketFactorInfo";
import MarketFactorInfoInput from "../MarketFactorInfoInput/MarketFactorInfoInput";
import SignOutButton from "../../components/SignOutButton";
import { useUser } from "../../core/access/userContext";
import { getUserAccessPageIds } from "./services/indexService";
import OperationalPlanInfo from "../OperationalPlanInfo/OperationalPlanInfo";
import OperationalPlanInfoInput from "../OperationalPlanInfoInput/OperationalPlanInfoInput";

export default function Index() {
  const [open, setOpen] = useState(false);
  const { user, setAccessablePageIds } = useUser();
  
  useEffect(() => { 
    if (user?.role) { 
      getUserAccessPageIds(user.role)
      .then(response => {
        setAccessablePageIds(response.data);
      })
      .catch(error => { 
        console.error('Error fetching data:', error);
      });
    }
  }, [user?.role]);

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
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Welcome to Operation Game
          </Typography>
          <SignOutButton></SignOutButton>
        </Toolbar>
      </AppBar>
      <GameNavigationMenu openState={open} toggleDrawer={toggleDrawer} />
      <Routes>
        <Route path="/gameDashboard" element={<GameDashboard />} />
        <Route path="/gameMaster" element={<GameMaster />} />
        <Route path="/gameBatch" element={<GameBatch />} />
        <Route path="/gameSession" element={<GameSession />} />
        <Route path="/strategyLaunched" element={<StrategyLaunched />} />
        <Route path="/strategyPlanApproval" element={<StrategyPlanApproval />} />
        <Route path="/marketFactorInfo" element={<MarketFactorInfo />} />
        <Route path="/marketFactorInfoInput" element={<MarketFactorInfoInput />} />
        <Route path="/operationalPlanInfo" element={<OperationalPlanInfo />} />
        <Route path="/operationalPlanInfoInput" element={<OperationalPlanInfoInput />} />
      </Routes>
    </Box>
  );
}
