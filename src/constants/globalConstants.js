import GameSession from "../pages/GameSession";
import GameDashboard from "../pages/GameDashboard/GameDashboard";
import StrategyLaunched from "../pages/LaunchStrategy/StrategyLaunched";
import StrategyPlan from "../pages/StrategyPlanApproval/StrategyPlanApproval";
import MarketFactorInfo from "../pages/MarketFactorInfo/MarketFactorInfo";
import MarketFactorInfoInput from "../pages/MarketFactorInfoInput/MarketFactorInfoInput";
import GameMaster from "../pages/GameMaster";
import GameBatch from "../pages/GameBatch";
import OperationalPlanInfo from "../pages/OperationalPlanInfo/OperationalPlanInfo";
import OperationalPlanInfoInput from "../pages/OperationalPlanInfoInput/OperationalPlanInfoInput";
import IncomeStatementInfo from "../pages/IncomeStatementInfo/IncomeStatementInfo";
import BalanceSheetInfo from "../pages/BalanceSheetInfo/BalanceSheetInfo";
import HomeIcon from '@mui/icons-material/Home';
import AccountBalanceWalletTwoToneIcon from '@mui/icons-material/AccountBalanceWalletTwoTone';
import RocketLaunchTwoToneIcon from '@mui/icons-material/RocketLaunchTwoTone';
import AssignmentTurnedInTwoToneIcon from '@mui/icons-material/AssignmentTurnedInTwoTone';
import StoreTwoToneIcon from '@mui/icons-material/StoreTwoTone';
import AddBusinessTwoToneIcon from '@mui/icons-material/AddBusinessTwoTone';
import DomainAddTwoToneIcon from '@mui/icons-material/DomainAddTwoTone';
import DomainTwoToneIcon from '@mui/icons-material/DomainTwoTone';
import SummarizeTwoToneIcon from '@mui/icons-material/SummarizeTwoTone';
import FgStockInfo from "../pages/FgStockInfo/FgStockInfo";
import LocalAtmTwoToneIcon from '@mui/icons-material/LocalAtmTwoTone';
import PaymentsTwoToneIcon from '@mui/icons-material/PaymentsTwoTone';
import RmStockInfo from "../pages/RmStockInfo/RmStockInfo";
import StrategyMaster from "../pages/StrategyMaster/StrategyMaster";
import SalesRecordInfo from "../pages/SalesRecordInfo/SalesRecordInfo";
import ProductionRecordInfo from "../pages/ProductionRecordInfo/ProductionRecordInfo";

export const componentList = [
  { icon: <HomeIcon />, id: "UI 001", displayText: "Game Dashboard", path: "/gameDashboard", routePath: "/operationGame/gameDashboard", routeElement: <GameDashboard /> },
  { icon: <HomeIcon />, id: "", displayText: "Game Master", path: "/gameMaster", routePath: "/operationGame/gameMaster", routeElement: <GameMaster /> },
  { icon: <HomeIcon />, id: "", displayText: "Game Batch", path: "/gameBatch", routePath: "/operationGame/gameBatch", routeElement: <GameBatch /> },
  {
    icon: <HomeIcon />,
    id: "",
    displayText: "Game Session",
    path: "/gameSession",
    routePath: "/operationGame/gameSession",
    routeElement: <GameSession />,
  },
  {
    icon: <RocketLaunchTwoToneIcon />,
    id: "UI 001",
    displayText: "Launch Strategy",
    path: "/strategyLaunched",
    routePath: "/operationGame/strategyLaunched",
    routeElement: <StrategyLaunched />,
  },
  {
    icon: <AssignmentTurnedInTwoToneIcon />,
    id: "UI 002",
    displayText: "Strategy Plan Approval",
    path: "/strategyPlanApproval",
    routePath: "/operationGame/strategyPlanApproval",
    routeElement: <StrategyPlan />,
  },
  {
    icon: <StoreTwoToneIcon />,
    id: "UI 003",
    displayText: "Market Factor Info",
    path: "/marketFactorInfo",
    routePath: "/operationGame/marketFactorInfo",
    routeElement: <MarketFactorInfo />,
  },
  {
    icon: <AddBusinessTwoToneIcon />,
    id: "UI 004",
    displayText: "Market Factor Input",
    path: "/marketFactorInfoInput",
    routePath: "/operationGame/marketFactorInfoInput",
    routeElement: <MarketFactorInfoInput />,
  },
  {
    icon: <DomainTwoToneIcon />,
    id: "UI 005",
    displayText: "Operational Decision Info",
    path: "/operationalPlanInfo",
    routePath: "/operationGame/operationalPlanInfo",
    routeElement: <OperationalPlanInfo />,
  },
  {
    icon: <DomainAddTwoToneIcon />,
    id: "UI 006",
    displayText: "Operational Decision Input",
    path: "/operationalPlanInfoInput",
    routePath: "/operationGame/operationalPlanInfoInput",
    routeElement: <OperationalPlanInfoInput />,
  },
  {
    icon: <AccountBalanceWalletTwoToneIcon />,
    id: "UI 007",
    displayText: "Income Statement",
    path: "/incomeStatementInfo",
    routePath: "/operationGame/incomeStatementInfo",
    routeElement: <IncomeStatementInfo />,
  },
  {
    icon: <SummarizeTwoToneIcon />,
    id: "UI 008",
    displayText: "Balance Sheet",
    path: "/balanceSheet",
    routePath: "/operationGame/balanceSheet",
    routeElement: <BalanceSheetInfo />,
  },
  {
    icon: <LocalAtmTwoToneIcon />,
    id: "UI 009",
    displayText: "FG Stock Info",
    path: "/fgStockInfo",
    routePath: "/operationGame/fgStockInfo",
    routeElement: <FgStockInfo />,
  },
  {
    icon: <PaymentsTwoToneIcon />,
    id: "UI 010",
    displayText: "RM Stock Info",
    path: "/rmStockInfo",
    routePath: "/operationGame/rmStockInfo",
    routeElement: <RmStockInfo />,
  },
  {
    icon: <PaymentsTwoToneIcon />,
    id: "UI 018",
    displayText: "Strategy Master",
    path: "/strategyMaster",
    routePath: "/operationGame/strategyMaster",
    routeElement: <StrategyMaster />,
  },
  {
    icon: <PaymentsTwoToneIcon />,
    id: "UI 013",
    displayText: "Sales Record Info",
    path: "/salesRecord",
    routePath: "/operationGame/salesRecord",
    routeElement: <SalesRecordInfo />,
  },
  {
    icon: <PaymentsTwoToneIcon />,
    id: "UI 014",
    displayText: "Production Record Info",
    path: "/productionRecordInfo",
    routePath: "/operationGame/productionRecordInfo",
    routeElement: <ProductionRecordInfo />,
  },
];

export const dateColumns = ["period", "Production_Month"];
