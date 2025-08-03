
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
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogActions from '@mui/material/DialogActions';
import '../NavigationMenu/styles/temporaryDrawer.css';
import FeatureManagement from '../FeatureManagement/FeatureManagement.jsx';
import Operations from '../Operations/Operations.jsx';
import AccountPayable from '../AccountPayable/AccountPayable.jsx';
import SavingsRealisable from '../SavingsRealisable/SavingsRealisable.jsx';
import AcReceivable from '../AcReceivable/AcReceivable.jsx';
import PartInfo from '../PartInfo/PartInfo.jsx';
import BOMInfo from '../BOMInfo/BOMInfo.jsx';
import RBACInfo from '../RBACInfo/RBACInfo.jsx';
import ReferenceInfo from '../ReferenceInfo/ReferenceInfo.jsx';
import ScreenInfo from '../ScreenInfo/ScreenInfo.jsx';
import StdNormInfo from '../StdNormInfo/StdNormInfo.jsx';
import StrategyBudgetInfo from '../StrategyBudgetInfo/StrategyBudgetInfo.jsx';
import StrategyLaunchGist from '../StrategyLaunchGist/StrategyLaunchGist.jsx';
import StrategyPlanTeam from '../StrategyPlanTeam/StrategyPlanTeam.jsx';
import TeamProgressInfo from '../TeamProgressInfo/TeamProgressInfo.jsx';
import CapitalAssetStockInfo from '../CapitalAssetStockInfo/CapitalAssetStockInfo.jsx';
import CashBookInfo from '../CashBookInfo/CashBookInfo.jsx';
import CostNormInfo from '../CostNormInfo/CostNormInfo.jsx';
import MfgRoutingInfo from '../MfgRoutingInfo/MfgRoutingInfo.jsx';
import OpsDemandCreationInfo from '../OpsDemandCreationInfo/OpsDemandCreationInfo.jsx';
import OpsDiscountOfferInfo from '../OpsDiscountOfferInfo/OpsDiscountOfferInfo.jsx';
import OpsSavingsPlanInfo from '../OpsSavingsPlanInfo/OpsSavingsPlanInfo.jsx';
import BenefitInfo from '../BenefitInfo/BenefitInfo.jsx';
import ResultantInfo from '../ResultantInfo/ResultantInfo.jsx';
import ShopPerformanceInfo from '../ShopPerformanceInfo/ShopPerformanceInfo.jsx';
import SCMPerformanceInfo from '../SCMPerformanceInfo/SCMPerformanceInfo.jsx';
import MfgWorkCentreInfo from '../MfgWorkCentreInfo/MfgWorkCentreInfo.jsx';
import SystemInfoDesk from '../SystemInfoDesk/SystemInfoDesk.jsx';
import UserMgtDesk from '../UserMgtDesk/UserMgtDesk.jsx';
import MarketScenario from '../MarketScenario/MarketScenario.jsx';
import ValidInputCodes from '../ValidInputCodes/ValidInputCodes.jsx';
import LiabilityInfo from '../LiabilityInfo/LiabilityInfo.jsx';
import RoleInfo from '../RoleInfo/RoleInfo.jsx';
import StrategySetCollection from '../StrategySetCollection/StrategySetCollection.jsx';
import ProductMstInfo from '../ProductMstInfo/ProductMstInfo.jsx';
import ValueStream from '../ValueStream/ValueStream.jsx';
import ValueStreamMap from '../ValueStreamMap/ValueStreamMap.jsx';
import ClassRoomSession from '../ClassRoomSession/ClassRoomSession.jsx';
import UserRoleManagement from '../UserRoleManagement/UserRoleManagement.jsx';
import ProfessionInfo from '../ProfessionInfo/ProfessionInfo.jsx';
import ProfessionRoleInfo from '../ProfessionRoleInfo/ProfessionRoleInfo.jsx';
import UserProfileInfo from '../UserProfileInfo/UserProfileInfo.jsx';
import OperationInputError from '../OperationInputError/OperationInputError.jsx';
import MarketInputError from '../MarketInputError/MarketInputError.jsx';
import StdMarketInput from '../StdMarketInput/StdMarketInput.jsx';
import StdOperationInput from '../StdOperationInput/StdOperationInput.jsx';
import omgLogo from '../../assets/omg-logo.png';
import StdMarketInputNew from '../StdMarketInputNew/StdMarketInputNew.jsx'; // Import the new component
import MarketInfo from '../MarketInfo/MarketInfo.jsx';
import { enrollUser } from './services/indexService.js';
import ToastMessage from '../../components/ToastMessage.jsx';


export default function MiniDrawer() {
  const { setIsLoading } = useLoading();
  const [open, setOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const { user, userInfo, setAccessablePageIds, userAccessiblePages } = useUser();
  const [showEnrollDialog, setShowEnrollDialog] = useState(false);
  const location = useLocation();
  const [alertData, setAlertData] = useState({
    severity: "",
    message: "",
    isVisible: false,
  });

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

  // Show enroll button if user is logged in and does not have a gameId
  const showEnrollButton = user && !userInfo?.gameBatch;

  const handleEnrollClick = () => {
    setShowEnrollDialog(true);
  };

  const handleEnroll = async () => {
    setShowEnrollDialog(false);
    if (!userInfo.loginId) return;
    setIsLoading(true);
    try {
      console.log(userInfo);
      const enrollResponse = await enrollUser({ userId: userInfo.userId, learnMode: userInfo?.learnMode });
      if (enrollResponse) {
        setAlertData({
          severity: "success",
          message: "Enrolled for the game successfully!",
          isVisible: true,
        });
      }
    } catch (err) {
      setAlertData({
        severity: "error",
        message: "Failed to enroll for the game.",
        isVisible: true,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Box sx={{ display: 'flex', flexGrow: 1 }}>
      <CssBaseline />
      <AppBar position="fixed" open={open} sx={{ backgroundImage: 'radial-gradient(ellipse at 50% 100%, hsl(213, 100%, 87%), hsl(0, 0%, 100%))' }}>
        <Toolbar sx={{ backgroundImage: 'inherit' }}>
          {/* Logo Image */}
          <img src={omgLogo} alt="OMG Logo" style={{ width: 40, height: 40, marginRight: 8 }} />
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
          <div style={{ marginLeft: "auto", display: 'flex', alignItems: 'center', gap: 2 }}>
            {showEnrollButton && (
              <Button className='standard-button-secondary-button' sx={{ marginRight: 1 }} onClick={handleEnrollClick}>
                Enroll
              </Button>
            )}
            <Button className="hover-effect" onClick={handleMenu} color="inherit" sx={{ display: "flex", alignItems: "center", textTransform: "none", border: "1px solid", borderRadius: "30px", padding: "5px 20px", backgroundColor: "#FFFFFF", color: "#180081" }}>
              <AccountCircle className="account-icon" sx={{ fontSize: 40 }} />
            </Button>
            <Dialog open={showEnrollDialog} onClose={() => setShowEnrollDialog(false)}>
              <DialogTitle>Alert</DialogTitle>
              <DialogContent>
                <DialogContentText>
                  Do you want to enroll for the game?
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button onClick={() => setShowEnrollDialog(false)} color="secondary">
                  No
                </Button>
                <Button onClick={handleEnroll} color="primary" autoFocus>
                  Yes
                </Button>
              </DialogActions>
            </Dialog>
            <Menu id="menu-appbar" anchorEl={anchorEl} anchorOrigin={{ vertical: "bottom", horizontal: "right", }} keepMounted transformOrigin={{ vertical: "top", horizontal: "right", }} open={Boolean(anchorEl)} onClose={handleClose} sx={{ "& .MuiPaper-root": { borderRadius: "10px", padding: "10px", width: "250px", backgroundColor: "#FFFFFF", }, }} >
              <Typography className="standard-text-color" disabled>{userInfo?.loginId}</Typography>
              <Divider sx={{ backgroundColor: '#D3D3D3', my: 1 }} />
              <Typography className="standard-text-color" disabled>{user?.role}</Typography>
              <Divider sx={{ backgroundColor: '#D3D3D3', my: 1 }} />
              <Typography onClick={handleClose} sx={{ "& .MuiButton-root": { width: "100%", justifyContent: "flex-start", textTransform: "none", padding: "10px", paddingLeft: "20px", } }} >
                <SignOutButton />
              </Typography>
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
                <img src={[componentObj.iconPath]} alt="Description" className="navigation-menu-item-icon" />
                <ListItemText primary={componentObj.label} sx={{ opacity: open ? 1 : 0, wordWrap: open ? 'break-word' : 'none', whiteSpace: open ? 'normal' : 'none' }} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1 }}>
        <DrawerHeader />
        <Routes>
          <Route path="/homePage" element={<GameDashboard />} />
          <Route path="/userRoleManagement" element={<UserRoleManagement />} />
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
          <Route path="/teamPlay" element={<FeatureManagement />} />
          <Route path="/operations" element={<Operations />} />
          <Route path="/accountPayable" element={<AccountPayable />} />
          <Route path="/AcReceivable" element={<AcReceivable />} />
          <Route path="/savingsRealisable" element={<SavingsRealisable />} />
          <Route path="/partInfo" element={<PartInfo />} />
          <Route path="/BOMInfo" element={<BOMInfo />} />
          <Route path="/RBACInfo" element={<RBACInfo />} />
          <Route path="/ReferenceInfo" element={<ReferenceInfo />} />
          <Route path="/ScreenInfo" element={<ScreenInfo />} />
          <Route path="/StdNormInfo" element={<StdNormInfo />} />
          <Route path="/StrategyBudgetInfo" element={<StrategyBudgetInfo />} />
          <Route path="/StrategyLaunchGist" element={<StrategyLaunchGist />} />
          <Route path="/StrategyPlanTeam" element={<StrategyPlanTeam />} />
          <Route path="/TeamProgressInfo" element={<TeamProgressInfo />} />
          <Route path="/CapitalAssetStockInfo" element={<CapitalAssetStockInfo />} />
          <Route path="/CashBookInfo" element={<CashBookInfo />} />
          <Route path="/CostNormInfo" element={<CostNormInfo />} />
          <Route path="/MfgRoutingInfo" element={<MfgRoutingInfo />} />
          <Route path="/OpsDemandCreationInfo" element={<OpsDemandCreationInfo />} />
          <Route path="/OpsDiscountOfferInfo" element={<OpsDiscountOfferInfo />} />
          <Route path="/OpsSavingsPlanInfo" element={<OpsSavingsPlanInfo />} />
          <Route path="/BenefitInfo" element={<BenefitInfo />} />
          <Route path="/ResultantInfo" element={<ResultantInfo />} />
          <Route path="/ShopPerformanceInfo" element={<ShopPerformanceInfo />} />
          <Route path="/SCMPerformanceInfo" element={<SCMPerformanceInfo />} />
          <Route path="/MfgWorkCentreInfo" element={<MfgWorkCentreInfo />} />
          <Route path="/SystemInfoDesk" element={<SystemInfoDesk />} />
          <Route path="/UserMgtDesk" element={<UserMgtDesk />} />
          <Route path="/MarketScenario" element={<MarketScenario />} />
          <Route path='/ValidInputCodes' element={<ValidInputCodes />} />
          <Route path='/LiabilityInfo' element={<LiabilityInfo />} />
          <Route path='/RoleInfo' element={<RoleInfo />} />
          <Route path='/StrategySetCollection' element={<StrategySetCollection />} />
          <Route path='/ProductMstInfo' element={<ProductMstInfo />} />
          <Route path='/ValueStream' element={<ValueStream />} />
          <Route path='/ValueStreamMap' element={<ValueStreamMap />} />
          <Route path='/ClassRoomSession' element={<ClassRoomSession />} />
          <Route path='/ProfessionInfo' element={<ProfessionInfo />} />
          <Route path='/ProfessionRoleInfo' element={<ProfessionRoleInfo />} />
          <Route path='/UserProfileInfo' element={<UserProfileInfo />} />
          <Route path='/OperationInputError' element={<OperationInputError />} />
          <Route path='/MarketInputError' element={<MarketInputError />} />
          <Route path='/StdMarketInput' element={<StdMarketInput />} />
          <Route path='/StdOperationInput' element={<StdOperationInput />} />
          <Route path='/StdMarketInputNew' element={<StdMarketInputNew />} /> {/* New Route for StdMarketInputNew */}
          <Route path='/MarketInfo' element={<MarketInfo />} />
        </Routes>
      </Box>
      <ToastMessage
        open={alertData.isVisible}
        severity={alertData.severity}
        message={alertData.message}
      />
    </Box>
  );
}

