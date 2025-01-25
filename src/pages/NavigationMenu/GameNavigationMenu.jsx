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
  getUserAccessPageIds,
  useEffect,
  useState,
  useLocation,
  DrawerHeader, AppBar, Drawer
} from './imports.js';
import { pageConstants } from './pageConstants.js';

export default function MiniDrawer() {
  const { setIsLoading } = useLoading();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
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

  // Find the display title based on the current route
  const currentRoute = location.pathname;
  const currentPage = userAccessiblePages?.find(page => page.routePath === currentRoute);
  const displayTitle = currentPage?.displayText || 'Default Title'; // Fallback to 'Default Title' if not found

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" open={open}>
        <Toolbar>
          <Typography color='black' align="left" variant="h4" noWrap component="div"
            sx={{ ...(open && { display: 'none' }) }}>
            {pageConstants.companyTitleCollapsed}
          </Typography>
          <IconButton
            className="hover-effect"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{ marginLeft: 1, ...(open && { display: 'none' }) }}
          >
            <ArrowForwardIosIcon />
          </IconButton>

          <Typography color='black' align='left' className="header-title" variant='h5' component="div">
            {displayTitle}
          </Typography>

          <div style={{ marginLeft: "auto" }}>
            <Button
              className="hover-effect"
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
                color: "#4682B4", /* Set to pleasant blue */
              }}
            >
              <AccountCircle
                className="account-icon"
                sx={{ fontSize: 40 }} // Adjust the font size to make the icon bigger
              />
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
                  backgroundColor: "#FFFFFF",
                },
              }}
            >
              <Typography className="standard-text-color" disabled>{userInfo?.loginId}</Typography>
              <Divider sx={{ backgroundColor: '#D3D3D3', my: 1 }} /> {/* Gray separator with padding */}
              <Typography className="standard-text-color" disabled>{user?.role}</Typography>
              <Divider sx={{ backgroundColor: '#D3D3D3', my: 1 }} /> {/* Gray separator with padding */}
              <MenuItem
                onClick={handleClose}
                sx={{
                  "& .MuiButton-root": {
                    width: "100%",
                    justifyContent: "flex-start",
                    textTransform: "none",
                    padding: "10px",
                    paddingLeft: "20px", // Adjust the left padding for menu items
                  }
                }}
              >
                <SignOutButton />
              </MenuItem>
            </Menu>
          </div>
        </Toolbar>
      </AppBar>
      <Drawer className="drawer-container" variant="permanent" open={open}>
        <DrawerHeader className="drawer-header">
          {open ? <Typography color='black' align="left" variant="h6" wrap component="div">
            {pageConstants.companyTitleExpandedFH} <br /> {pageConstants.companyTitleExpandedSH}
          </Typography> : <Typography color='black' align="left" variant="h4" noWrap component="div"
            sx={{ ...(open && { display: 'none' }) }}>
            {pageConstants.companyTitleCollapsed}
          </Typography>}

          <IconButton className="hover-effect" onClick={handleDrawerClose}>
            {open ? <ArrowBackIosIcon /> : <ArrowForwardIosIcon />}
          </IconButton>
        </DrawerHeader>
        <List>
          {userAccessiblePages?.map((componentObj) => (
            <ListItem key={componentObj.routePath} disablePadding sx={{ display: 'block' }}>
              <ListItemButton
                className="hover-effect"
                component={Link}
                to={componentObj.routePath}
                sx={{
                  minHeight: 60,
                  justifyContent: open ? 'initial' : 'center',
                  px: 2.5
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 2 : 'auto',
                    justifyContent: 'center',
                  }}
                >
                  {[componentObj.icon]}
                </ListItemIcon>
                <ListItemText primary={componentObj.displayText} sx={{
                  opacity: open ? 1 : 0,
                  wordWrap: open ? 'break-word' : 'none',
                  whiteSpace: open ? 'normal' : 'none'
                }} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1 }}>
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
          <Route path="/incomeStatementInfo" element={<IncomeStatementInfo />} />
          <Route path="/balanceSheet" element={<BalanceSheetInfo />} />
        </Routes>
      </Box>
    </Box>
  );
}

