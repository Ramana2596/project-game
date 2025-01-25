import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  Typography,
  Menu,
  MenuItem,
  Button,
  Box
} from "@mui/material";
import AccountCircle from "@mui/icons-material/AccountCircle";
import GameNavigationMenu from "../NavigationMenu/GameNavigationMenu.jsx";
import SignOutButton from "../../components/SignOutButton";
import { useUser } from "../../core/access/userContext.js";
import { getUserAccessPageIds } from "../Index/services/indexService.js";
import { useLoading } from "../../hooks/loadingIndicatorContext.js";

import "./styles/index.css";

export default function Index() {
  const { setIsLoading } = useLoading();
  const [open, setOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const { user, userInfo, setAccessablePageIds } = useUser();
  const location = useLocation();

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

  const getTitle = (path) => {
    switch (path) {
      case "/gameDashboard":
        return "Game Dashboard";
      case "/gameMaster":
        return "Game Master";
      case "/gameBatch":
        return "Game Batch";
      case "/gameSession":
        return "Game Session";
      case "/strategyLaunched":
        return "Strategy Launched";
      case "/strategyPlanApproval":
        return "Strategy Plan Approval";
      case "/marketFactorInfo":
        return "Market Factor Info";
      case "/marketFactorInfoInput":
        return "Market Factor Info Input";
      case "/operationalPlanInfo":
        return "Operational Plan Info";
      case "/operationalPlanInfoInput":
        return "Operational Plan Info Input";
      case "/incomeStatementInfo":
        return "Income Statement Info";
      case "/balanceSheet":
        return "Balance Sheet";
      default:
        return "Home";
    }
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar className="app-bar" position="static">
        <Toolbar className="tool-bar">
          <Button onClick={toggleDrawer(true)} className="storm-button">
            <Typography variant="h5" color="black">
              STORM
            </Typography>
          </Button>
          <Typography variant="h6" className="header-title" sx={{ ml: 2 }}>
            <i>{getTitle(location.pathname)}</i>
          </Typography>
        </Toolbar>
      </AppBar>
      <GameNavigationMenu openState={open} toggleDrawer={toggleDrawer} />
    </Box>
  );
}
