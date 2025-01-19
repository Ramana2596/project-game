import { useEffect, useState } from "react";
import {
  AppBar,
  Box,
  Toolbar,
  Typography,
  IconButton,
  Menu,
  MenuItem,
  Button,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import AccountCircle from "@mui/icons-material/AccountCircle";
import GameNavigationMenu from "../GameNavigationMenu";
import GameMaster from "../GameMaster";
import GameBatch from "../GameBatch";
import { Routes, Route } from "react-router-dom";
import GameSession from "../GameSession";
import GameDashboard from "../GameDashboard/GameDashboard";
import StrategyLaunched from "../LaunchStrategy/StrategyLaunched";
import StrategyPlanApproval from "../StrategyPlanApproval/StrategyPlanApproval";
import MarketFactorInfo from "../MarketFactorInfo/MarketFactorInfo";
import MarketFactorInfoInput from "../MarketFactorInfoInput/MarketFactorInfoInput";
import SignOutButton from "../../components/SignOutButton";
import { useUser } from "../../core/access/userContext.js";
import { getUserAccessPageIds } from "./services/indexService.js";
import OperationalPlanInfo from "../OperationalPlanInfo/OperationalPlanInfo";
import OperationalPlanInfoInput from "../OperationalPlanInfoInput/OperationalPlanInfoInput";
import IncomeStatementInfo from "../IncomeStatementInfo/IncomeStatementInfo.jsx";
import BalanceSheetInfo from "../BalanceSheetInfo/BalanceSheetInfo.jsx";
import { useLoading } from "../../hooks/loadingIndicatorContext.js";

export default function Index() {
  const {setIsLoading} = useLoading();
  const [open, setOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const { user, userInfo, setAccessablePageIds } = useUser();

  useEffect(() => {
    if (user?.role) {
      setIsLoading(true);
      getUserAccessPageIds(user.role)
        .then((response) => {
          setAccessablePageIds(response.data);
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        })
        .finally(() => setIsLoading(false));
    }
  }, [user?.role]);

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
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
          <div style={{ marginLeft: "auto" }}>
            <Button
              onClick={handleMenu}
              color="inherit"
              sx={{
                display: "flex",
                alignItems: "center",
                textTransform: "none",
                border: "1px solid",
                borderRadius: "30px",
                padding: "5px 20px",
                backgroundColor: "rgba(255, 255, 255, 0.1)",
                width: "250px",
              }}
            >
              <Typography variant="h6" component="div" sx={{ mr: 1 }}>
                {user?.role}
              </Typography>
              <AccountCircle />
            </Button>
            <Menu
              id="menu-appbar"
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorEl)}
              onClose={handleClose}
              sx={{
                "& .MuiPaper-root": {
                  borderRadius: "10px",
                  padding: "10px",
                  width: "250px",
                  backgroundColor: "rgba(255, 255, 255, 0.6)",
                },
              }}
            >
              <MenuItem disabled>{userInfo?.loginId}</MenuItem>
              <MenuItem
                onClick={handleClose}
                sx={{
                  "& .MuiButton-root": {
                    width: "100%",
                    justifyContent: "flex-start",
                    textTransform: "none",
                    padding: "10px",
                  },
                  "&:hover": {
                    backgroundColor: "rgba(255, 255, 255, 0.2)",
                  },
                }}
              >
                <SignOutButton />
              </MenuItem>
            </Menu>
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
        <Route
          path="/strategyPlanApproval"
          element={<StrategyPlanApproval />}
        />
        <Route path="/marketFactorInfo" element={<MarketFactorInfo />} />
        <Route
          path="/marketFactorInfoInput"
          element={<MarketFactorInfoInput />}
        />
        <Route path="/operationalPlanInfo" element={<OperationalPlanInfo />} />
        <Route
          path="/operationalPlanInfoInput"
          element={<OperationalPlanInfoInput />}
        />
        <Route path="/incomeStatementInfo" element={<IncomeStatementInfo />} />
        <Route path="/balanceSheet" element={<BalanceSheetInfo />} />
      </Routes>
    </Box>
  );
}
