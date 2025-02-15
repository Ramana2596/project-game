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
import CasFlowStatement from "../pages/CasFlowStatement/CasFlowStatement";
import CurrencyExchangeTwoToneIcon from '@mui/icons-material/CurrencyExchangeTwoTone';
import PrecisionManufacturingTwoToneIcon from '@mui/icons-material/PrecisionManufacturingTwoTone';
import LoyaltyTwoToneIcon from '@mui/icons-material/LoyaltyTwoTone';
import RawOnTwoToneIcon from '@mui/icons-material/RawOnTwoTone';
import Inventory2TwoToneIcon from '@mui/icons-material/Inventory2TwoTone';

export const componentList = [
  {
    icon: <HomeIcon />,
    id: "UI 001",
    label: "Game Dashboard",
    path: "/gameDashboard",
    href: "/operationGame/gameDashboard",
    routeElement: <GameDashboard />,
    children: [
      {
        icon: <SummarizeTwoToneIcon />,
        id: "UI 008",
        label: "Balance Sheet",
        path: "/balanceSheet",
        href: "/operationGame/balanceSheet",
        routeElement: <BalanceSheetInfo />,
      },
      {
        icon: <CurrencyExchangeTwoToneIcon />,
        id: "UI 008",
        label: "Cash Flow Statement",
        path: "/cashFlowStatement",
        href: "/operationGame/cashFlowStatement",
        routeElement: <CasFlowStatement />,
      },
      {
        icon: <AccountBalanceWalletTwoToneIcon />,
        id: "UI 007",
        label: "Income Statement",
        path: "/incomeStatementInfo",
        href: "/operationGame/incomeStatementInfo",
        routeElement: <IncomeStatementInfo />,
      },
    ],
  },
  { icon: <HomeIcon />, id: "", label: "Game Master", path: "/gameMaster", routePath: "/operationGame/gameMaster", routeElement: <GameMaster /> },
  { icon: <HomeIcon />, id: "", label: "Game Batch", path: "/gameBatch", routePath: "/operationGame/gameBatch", routeElement: <GameBatch /> },
  {
    icon: <HomeIcon />,
    id: "",
    label: "Game Session",
    path: "/gameSession",
    href: "/operationGame/gameSession",
    routeElement: <GameSession />,
  },
  {
    icon: <RocketLaunchTwoToneIcon />,
    id: "UI 001",
    label: "Launch Strategy",
    path: "/strategyLaunched",
    href: "/operationGame/strategyLaunched",
    routeElement: <StrategyLaunched />,
  },
  {
    icon: <AssignmentTurnedInTwoToneIcon />,
    id: "UI 002",
    label: "Strategy Plan Approval",
    path: "/strategyPlanApproval",
    href: "/operationGame/strategyPlanApproval",
    routeElement: <StrategyPlan />,
  },
  {
    icon: <StoreTwoToneIcon />,
    id: "UI 003",
    label: "Market Factor Info",
    path: "/marketFactorInfo",
    href: "/operationGame/marketFactorInfo",
    routeElement: <MarketFactorInfo />,
  },
  {
    icon: <AddBusinessTwoToneIcon />,
    id: "UI 004",
    label: "Market Factor Input",
    path: "/marketFactorInfoInput",
    href: "/operationGame/marketFactorInfoInput",
    routeElement: <MarketFactorInfoInput />,
  },
  {
    icon: <DomainTwoToneIcon />,
    id: "UI 005",
    label: "Operational Decision Info",
    path: "/operationalPlanInfo",
    href: "/operationGame/operationalPlanInfo",
    routeElement: <OperationalPlanInfo />,
  },
  {
    icon: <DomainAddTwoToneIcon />,
    id: "UI 006",
    label: "Operational Decision Input",
    path: "/operationalPlanInfoInput",
    href: "/operationGame/operationalPlanInfoInput",
    routeElement: <OperationalPlanInfoInput />,
  },
  {
    icon: <PaymentsTwoToneIcon />,
    id: "UI 018",
    label: "Strategy Master",
    path: "/strategyMaster",
    href: "/operationGame/strategyMaster",
    routeElement: <StrategyMaster />,
  },
  {
    icon: <LoyaltyTwoToneIcon />,
    id: "UI 013",
    label: "Sales Record Info",
    path: "/salesRecord",
    href: "/operationGame/salesRecord",
    routeElement: <SalesRecordInfo />,
  },
  {
    icon: <PrecisionManufacturingTwoToneIcon />,
    id: "UI 008",
    label: "Production Record Info",
    path: "/productionRecordInfo",
    href: "/operationGame/productionRecordInfo",
    routeElement: <ProductionRecordInfo />,
  },
];

export const dateColumns = ["period", "Production_Month"];
