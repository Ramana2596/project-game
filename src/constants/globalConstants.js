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
import SummarizeTwoToneIcon from '@mui/icons-material/SummarizeTwoTone';
import FgStockInfo from "../pages/FgStockInfo/FgStockInfo";
import RmStockInfo from "../pages/RmStockInfo/RmStockInfo";
import StrategyMaster from "../pages/StrategyMaster/StrategyMaster";
import SalesRecordInfo from "../pages/SalesRecordInfo/SalesRecordInfo";
import ProductionRecordInfo from "../pages/ProductionRecordInfo/ProductionRecordInfo";
import CasFlowStatement from "../pages/CasFlowStatement/CasFlowStatement";
import CurrencyExchangeTwoToneIcon from '@mui/icons-material/CurrencyExchangeTwoTone';
import InfoDesk from "../pages/InfoDesk/InfoDesk";
import UserAccessManagement from "../pages/UserAccessManagement/UserAccessManagement";
import homeIcon from '../assets/navigation-menu/home.png';
import dashboardIcon from '../assets/navigation-menu/dash-board.png';
import productionIcon from '../assets/navigation-menu/production.png';
import salesIcon from '../assets/navigation-menu/sales.png';
import finishedIcon from '../assets/navigation-menu/finished.png';
import rawIcon from '../assets/navigation-menu/raw-material.png';
import secureAccessIcon from '../assets/navigation-menu/secure-access.png';
import infoIcon from '../assets/navigation-menu/information.png';
import operationsIcon from '../assets/navigation-menu/operation.png';
import launchIcon from '../assets/navigation-menu/startup.png';
import approvalIcon from '../assets/navigation-menu/agenda.png';
import marketfactorInfoIcon from '../assets/navigation-menu/productInfo.png';
import marketfactorInfoInputIcon from '../assets/navigation-menu/marketFactorInput.png';
import operationalDecisionIcon from '../assets/navigation-menu/operationalDecision.png';
import operationalDecisionInputIcon from '../assets/navigation-menu/operationalDecisionInput.png';
import appSettings from '../assets/navigation-menu/app-settings.png';
import payableIcon from '../assets/navigation-menu/payables.png';
import recievableIcon from '../assets/navigation-menu/receivable.png';
import savingsIcon from '../assets/navigation-menu/savings.png';
import strategyIcon from '../assets/navigation-menu/strategy.png';
import partIcon from '../assets/navigation-menu/part.png'
import FeatureManagement from "../pages/FeatureManagement/FeatureManagement";
import HomePage from "../pages/HomePage/HomePage";
import Operations from "../pages/Operations/Operations";
import AccountPayable from "../pages/AccountPayable/AccountPayable";
import SavingsRealisable from "../pages/SavingsRealisable/SavingsRealisable";
import AccountRecievable from "../pages/AccountRecievable/AccountRecievable";
import PartInfo from "../pages/PartInfo/PartInfo";

export const componentList = [
  {
    iconPath: homeIcon,
    id: "UI 001",
    label: "Home",
    path: "/homePage",
    href: "/operationGame/homePage",
    routeElement: <HomePage />
  },
  {
    iconPath: dashboardIcon,
    id: "UI 001",
    label: "Game Dashboard",
    path: "/gameDashboard",
    href: "/operationGame/gameDashboard",
    routeElement: <GameDashboard />,
    children: [
      {
        icon: <SummarizeTwoToneIcon />,
        id: "UI 21 110",
        label: "Balance Sheet",
        path: "/balanceSheet",
        href: "/operationGame/balanceSheet",
        routeElement: <BalanceSheetInfo />
      },
      {
        icon: <CurrencyExchangeTwoToneIcon />,
        id: "UI 21 130",
        label: "Cash Flow Statement",
        path: "/cashFlowStatement",
        href: "/operationGame/cashFlowStatement",
        routeElement: <CasFlowStatement />
      },
      {
        icon: <AccountBalanceWalletTwoToneIcon />,
        id: "UI 21 120",
        label: "Income Statement",
        path: "/incomeStatementInfo",
        href: "/operationGame/incomeStatementInfo",
        routeElement: <IncomeStatementInfo />
      },
    ],
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
        iconPath: productionIcon,
        id: "UI 21 180",
        label: "Production Record Info",
        path: "/productionRecordInfo",
        href: "/operationGame/productionRecordInfo",
        routeElement: <ProductionRecordInfo />
      },
      {
        iconPath: salesIcon,
        id: "UI 21 170",
        label: "Sales Record Info",
        path: "/salesRecord",
        href: "/operationGame/salesRecord",
        routeElement: <SalesRecordInfo />
      },
      {
        iconPath: finishedIcon,
        id: "UI 21 150",
        label: "Finished Goods Stock Info",
        path: "/fgStockInfo",
        href: "/operationGame/fgStockInfo",
        routeElement: <FgStockInfo />
      },
      {
        iconPath: rawIcon,
        id: "UI 21 140",
        label: "Raw Material Stock Info",
        path: "/rmStockInfo",
        href: "/operationGame/rmStockInfo",
        routeElement: <RmStockInfo />
      },
      {
        iconPath: marketfactorInfoIcon,
        id: "UI 21 090",
        label: "Market Factor Info",
        path: "/marketFactorInfo",
        href: "/operationGame/marketFactorInfo",
        routeElement: <MarketFactorInfo />
      },
      {
        iconPath: operationalDecisionIcon,
        id: "UI 21 100",
        label: "Operational Decision Info",
        path: "/operationalPlanInfo",
        href: "/operationGame/operationalPlanInfo",
        routeElement: <OperationalPlanInfo />
      },
      {
        iconPath: payableIcon,
        id: "UI 21 210",
        label: "Account Payable",
        path: "/accountPayable",
        href: "/operationGame/accountPayable",
        routeElement: <AccountPayable />
      },
      {
        iconPath: recievableIcon,
        id: "UI 21 200",
        label: "Account Receivable",
        path: "/accountRecieveable",
        href: "/operationGame/accountRecieveable",
        routeElement: <AccountRecievable />
      },
      {
        iconPath: savingsIcon,
        id: "UI 21 240",
        label: "Savings Realisable",
        path: "/savingsRealisable",
        href: "/operationGame/savingsRealisable",
        routeElement: <SavingsRealisable />
      },
      {
        iconPath: partIcon,
        id: "UI 22 010",
        label: "Part Details ",
        path: "/partInfo",
        href: "/operationGame/partInfo",
        routeElement: <PartInfo />
      }
      
    ],
  },
  {
    iconPath: operationsIcon,
    id: "UI 001",
    label: "Operations",
    path: "/operations",
    href: "/operationGame/operations",
    routeElement: <Operations />,
    children: [
      {
        iconPath: launchIcon,
        id: "UI 11 020",
        label: "Launch Strategy",
        path: "/strategyLaunched",
        href: "/operationGame/strategyLaunched",
        routeElement: <StrategyLaunched />
      },
      {
        iconPath: approvalIcon,
        id: "UI 11 030",
        label: "Strategy Plan Approval",
        path: "/strategyPlanApproval",
        href: "/operationGame/strategyPlanApproval",
        routeElement: <StrategyPlan />
      },
      {
        iconPath: marketfactorInfoInputIcon,
        id: "UI 11 040",
        label: "Market Factor Input",
        path: "/marketFactorInfoInput",
        href: "/operationGame/marketFactorInfoInput",
        routeElement: <MarketFactorInfoInput />
      },
      {
        iconPath: operationalDecisionInputIcon,
        id: "UI 11 050",
        label: "Operational Decision Input",
        path: "/operationalPlanInfoInput",
        href: "/operationGame/operationalPlanInfoInput",
        routeElement: <OperationalPlanInfoInput />
      },
      {
        iconPath: strategyIcon,
        id: "UI 12 170",
        label: "Strategy Master",
        path: "/strategyMaster",
        href: "/operationGame/strategyMaster",
        routeElement: <StrategyMaster />
      },
      {
        iconPath: appSettings,
        id: "UI 21 260",
        label: "Team Play",
        path: "/teamPlay",
        href: "/operationGame/teamPlay",
        routeElement: <FeatureManagement />
      },
    ],
  },
  {
    iconPath: secureAccessIcon,
    id: "UI UI 15 030",
    label: "User Access Management",
    path: "/userAccessManagement",
    href: "/operationGame/userAccessManagement",
    routeElement: <UserAccessManagement />
  }
];

export const dateColumns = ["period", "Production_Month"];
