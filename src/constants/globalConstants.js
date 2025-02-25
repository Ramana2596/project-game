import GameDashboard from "../pages/GameDashboard/GameDashboard";
import StrategyLaunched from "../pages/LaunchStrategy/StrategyLaunched";
import StrategyPlan from "../pages/StrategyPlanApproval/StrategyPlanApproval";
import MarketFactorInfo from "../pages/MarketFactorInfo/MarketFactorInfo";
import MarketFactorInfoInput from "../pages/MarketFactorInfoInput/MarketFactorInfoInput";
import OperationalPlanInfo from "../pages/OperationalPlanInfo/OperationalPlanInfo";
import OperationalPlanInfoInput from "../pages/OperationalPlanInfoInput/OperationalPlanInfoInput";
import IncomeStatementInfo from "../pages/IncomeStatementInfo/IncomeStatementInfo";
import BalanceSheetInfo from "../pages/BalanceSheetInfo/BalanceSheetInfo";
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
import FeedTwoToneIcon from '@mui/icons-material/FeedTwoTone';
import InfoDesk from "../pages/InfoDesk/InfoDesk";
import UserAccessManagement from "../pages/UserAccessManagement/UserAccessManagement";
import VerifiedUserTwoToneIcon from '@mui/icons-material/VerifiedUserTwoTone';
import homeIcon from '../assets/navigation-menu/home.png';
import secureAccessIcon from '../assets/navigation-menu/secure-access.png';
import infoIcon from '../assets/navigation-menu/information.png';
import launchIcon from '../assets/navigation-menu/startup.png';
import approvalIcon from '../assets/navigation-menu/agenda.png';
import marketfactorInfoIcon from '../assets/navigation-menu/productInfo.png';
import marketfactorInfoInputIcon from '../assets/navigation-menu/marketFactorInput.png';
import operationalDecisionIcon from '../assets/navigation-menu/operationalDecision.png';
import operationalDecisionInputIcon from '../assets/navigation-menu/operationalDecisionInput.png';
import appSettings from '../assets/navigation-menu/app-settings.png';
import FeatureManagement from "../pages/FeatureManagement/FeatureManagement";

export const componentList = [
  {
    iconPath: homeIcon,
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
  {
    iconPath: secureAccessIcon,
    id: "UI 001",
    label: "User Access Management",
    path: "/userAccessManagement",
    href: "/operationGame/userAccessManagement",
    routeElement: <UserAccessManagement />
  },
  {
    iconPath: infoIcon,
    id: "UI 001",
    label: "Info Desk",
    path: "/infoDesk",
    href: "/operationGame/infoDesk",
    routeElement: <InfoDesk />,
    children: [
      {
        icon: <PrecisionManufacturingTwoToneIcon />,
        id: "UI 008",
        label: "Production Record Info",
        path: "/productionRecordInfo",
        href: "/operationGame/productionRecordInfo",
        routeElement: <ProductionRecordInfo />,
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
        icon: <AccountBalanceWalletTwoToneIcon />,
        id: "UI 007",
        label: "Income Statement",
        path: "/incomeStatementInfo",
        href: "/operationGame/incomeStatementInfo",
        routeElement: <IncomeStatementInfo />,
      },
      {
        icon: <LocalAtmTwoToneIcon />,
        id: "UI 007",
        label: "Finished Goods Stock Info",
        path: "/fgStockInfo",
        href: "/operationGame/fgStockInfo",
        routeElement: <FgStockInfo />,
      },
      {
        icon: <LocalAtmTwoToneIcon />,
        id: "UI 007",
        label: "Finished Goods Stock Info",
        path: "/rmStockInfo",
        href: "/operationGame/rmStockInfo",
        routeElement: <RmStockInfo />,
      },
    ],
  },
  {
    iconPath: launchIcon,
    id: "UI 001",
    label: "Launch Strategy",
    path: "/strategyLaunched",
    href: "/operationGame/strategyLaunched",
    routeElement: <StrategyLaunched />,
  },
  {
    iconPath: approvalIcon,
    id: "UI 002",
    label: "Strategy Plan Approval",
    path: "/strategyPlanApproval",
    href: "/operationGame/strategyPlanApproval",
    routeElement: <StrategyPlan />,
  },
  {
    iconPath: marketfactorInfoIcon,
    id: "UI 003",
    label: "Market Factor Info",
    path: "/marketFactorInfo",
    href: "/operationGame/marketFactorInfo",
    routeElement: <MarketFactorInfo />,
  },
  {
    iconPath: marketfactorInfoInputIcon,
    id: "UI 004",
    label: "Market Factor Input",
    path: "/marketFactorInfoInput",
    href: "/operationGame/marketFactorInfoInput",
    routeElement: <MarketFactorInfoInput />,
  },
  {
    iconPath: operationalDecisionIcon,
    id: "UI 005",
    label: "Operational Decision Info",
    path: "/operationalPlanInfo",
    href: "/operationGame/operationalPlanInfo",
    routeElement: <OperationalPlanInfo />,
  },
  {
    iconPath: operationalDecisionInputIcon,
    id: "UI 006",
    label: "Operational Decision Input",
    path: "/operationalPlanInfoInput",
    href: "/operationGame/operationalPlanInfoInput",
    routeElement: <OperationalPlanInfoInput />,
  },
  {
    iconPath: appSettings,
    id: "UI 001",
    label: "Feature Management",
    path: "/featureManagement",
    href: "/operationGame/featureManagement",
    routeElement: <FeatureManagement />,
  },
  {
    id: "UI 018",
    label: "Strategy Master",
    path: "/strategyMaster",
    href: "/operationGame/strategyMaster",
    routeElement: <StrategyMaster />,
  }
];

export const dateColumns = ["period", "Production_Month"];
