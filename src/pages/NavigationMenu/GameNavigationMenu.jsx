
import BreadCrumb from '../../components/BreadCrumb.jsx';
import CasFlowStatement from '../CasFlowStatement/CasFlowStatement.jsx';
import InfoDesk from '../InfoDesk/InfoDesk.jsx';
import ProductionRecordInfo from '../ProductionRecordInfo/ProductionRecordInfo.jsx';
import SalesRecordInfo from '../SalesRecordInfo/SalesRecordInfo.jsx';
import {
  React,
  useTheme,
  Box,
  Menu,
  MenuItem,
  Button,
  List,
  CssBaseline,
  Typography,
  Divider,
  IconButton,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  AccountCircle,
  ArrowForwardIosIcon,
  SignOutButton,
  ArrowBackIosIcon,
  FgStockInfo,
  HomeIcon,
  Toolbar,
  Link,
  useUser,
  useLoading,
  GameMaster,
  GameBatch,
  Routes,
  Route,
  GameSession,
  GameDashboard,
  StrategyLaunched,
  StrategyPlanApproval,
  MarketFactorInfo,
  MarketFactorInfoInput,
  OperationalPlanInfo,
  OperationalPlanInfoInput,
  IncomeStatementInfo,
  BalanceSheetInfo,
  RmStockInfo,
  StrategyMaster,
  getUserAccessPageIds,
  useEffect,
  useState,
  useLocation,
  DrawerHeader, AppBar, Drawer
} from './imports.js';
import { pageConstants } from './pageConstants.js';
import '../NavigationMenu/styles/temporaryDrawer.css';

export default function MiniDrawer() {
  const { setIsLoading } = useLoading();
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const { user, userInfo, setAccessablePageIds, userAccessiblePages } = useUser();
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

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const currentRoute = location.pathname;

  return (
    <Box sx={{ display: 'flex', flexGrow: 1 }}>
      <CssBaseline />
      <AppBar position="fixed" open={open} sx={{ backgroundImage: 'radial-gradient(ellipse at 50% 100%, hsl(213, 100%, 87%), hsl(0, 0%, 100%))' }}>
        <Toolbar sx={{ backgroundImage: 'inherit' }}>
          <Typography color='black' align="left" variant="h4" noWrap component="div" sx={{ ...(open && { display: 'none' }) }}>
            {pageConstants.companyTitleCollapsed}
          </Typography>
          <IconButton className="hover-effect" aria-label="open drawer" onClick={handleDrawerOpen} edge="start" sx={{ marginLeft: 1, ...(open && { display: 'none' }) }} >
            <ArrowForwardIosIcon />
          </IconButton>
          <IconButton className="hover-effect" aria-label="close drawer" onClick={handleDrawerClose} edge="start" sx={{ ...(!open && { display: 'none' }) }} >
            <ArrowBackIosIcon />
          </IconButton>
          <BreadCrumb currentRoute={currentRoute} />
          <div style={{ marginLeft: "auto" }}>
            <Button className="hover-effect" onClick={handleMenu} color="inherit" sx={{ display: "flex", alignItems: "center", textTransform: "none", border: "1px solid", borderRadius: "30px", padding: "5px 20px", backgroundColor: "#FFFFFF", color: "#4682B4", /* Set to pleasant blue */ }}>
              <AccountCircle className="account-icon" sx={{ fontSize: 40 }} />
            </Button>
            <Menu id="menu-appbar" anchorEl={anchorEl} anchorOrigin={{ vertical: "bottom", horizontal: "right", }} keepMounted transformOrigin={{ vertical: "top", horizontal: "right", }} open={Boolean(anchorEl)} onClose={handleClose} sx={{ "& .MuiPaper-root": { borderRadius: "10px", padding: "10px", width: "250px", backgroundColor: "#FFFFFF", }, }} >
              <Typography className="standard-text-color" disabled>{userInfo?.loginId}</Typography>
              <Divider sx={{ backgroundColor: '#D3D3D3', my: 1 }} />
              <Typography className="standard-text-color" disabled>{user?.role}</Typography>
              <Divider sx={{ backgroundColor: '#D3D3D3', my: 1 }} />
              <MenuItem onClick={handleClose} sx={{ "& .MuiButton-root": { width: "100%", justifyContent: "flex-start", textTransform: "none", padding: "10px", paddingLeft: "20px", } }} >
                <SignOutButton />
              </MenuItem>
            </Menu>
          </div>
        </Toolbar>
      </AppBar>
      <Drawer className="drawer-container" variant="permanent" open={open}>
        <DrawerHeader className="drawer-header">
          {open ? (
            <Typography color='black' align="left" variant="h6" wrap component="div">
              {pageConstants.companyTitleExpandedFH} <br />
              {pageConstants.companyTitleExpandedSH}
            </Typography>
          ) : (
            <Typography color='black' align="left" variant="h4" noWrap component="div" sx={{ ...(open && { display: 'none' }) }}>
              {pageConstants.companyTitleCollapsed}
            </Typography>
          )}
        </DrawerHeader>
        <List sx={{ backgroundImage: 'inherit' }}>
          {userAccessiblePages?.map((componentObj) => (
            <ListItem key={componentObj.href} disablePadding sx={{ display: 'block' }}>
              <ListItemButton className="hover-effect" component={Link} to={componentObj.href} sx={{ minHeight: 60, justifyContent: open ? 'initial' : 'center', px: 2.5 }} >
                <ListItemIcon sx={{ minWidth: 0, mr: open ? 2 : 'auto', justifyContent: 'center', }} >
                  {[componentObj.icon]}
                </ListItemIcon>
                <ListItemText primary={componentObj.label} sx={{ opacity: open ? 1 : 0, wordWrap: open ? 'break-word' : 'none', whiteSpace: open ? 'normal' : 'none' }} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1 }}>
        <DrawerHeader />
        <Routes>
          <Route path="/gameDashboard" element={<GameDashboard />} />
          <Route path="/infoDesk" element={<InfoDesk />} />
          <Route path="/gameMaster" element={<GameMaster />} />
          <Route path="/gameBatch" element={<GameBatch />} />
          <Route path="/gameSession" element={<GameSession />} />
          <Route path="/strategyLaunched" element={<StrategyLaunched />} />
          <Route path="/strategyPlanApproval" element={<StrategyPlanApproval />} />
          <Route path="/marketFactorInfo" element={<MarketFactorInfo />} />
          <Route path="/marketFactorInfoInput" element={<MarketFactorInfoInput />} />
          <Route path="/operationalPlanInfo" element={<OperationalPlanInfo />} />
          <Route path="/operationalPlanInfoInput" element={<OperationalPlanInfoInput />} />
          <Route path="/incomeStatementInfo" element={<IncomeStatementInfo />} />
          <Route path="/balanceSheet" element={<BalanceSheetInfo />} />
          <Route path="/fgStockInfo" element={<FgStockInfo />} />
          <Route path="/rmStockInfo" element={<RmStockInfo />} />
          <Route path="/strategyMaster" element={<StrategyMaster />} />
          <Route path="/salesRecord" element={<SalesRecordInfo />} />
          <Route path="/productionRecordInfo" element={<ProductionRecordInfo />} />
          <Route path="/cashFlowStatement" element={<CasFlowStatement />} />
        </Routes>
      </Box>
    </Box>
  );
}

