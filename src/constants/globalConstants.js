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
//import AppInfoDesk from "../pages/AppInfoDesk";
import UserAccessManagement from "../pages/UserAccessManagement/UserAccessManagement";

// start of png
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
import bomIcon from '../assets/navigation-menu/bom.png'
import asterikIcon from '../assets/navigation-menu/asterik.png'
// end of png 

import FeatureManagement from "../pages/FeatureManagement/FeatureManagement";
import HomePage from "../pages/HomePage/HomePage";
import Operations from "../pages/Operations/Operations";
import AccountPayable from "../pages/AccountPayable/AccountPayable";
import SavingsRealisable from "../pages/SavingsRealisable/SavingsRealisable";
import AccountRecievable from "../pages/AccountRecievable/AccountRecievable";
import PartInfo from '../pages/PartInfo/PartInfo';
import BOMInfo from '../pages/BOMInfo/BOMInfo.jsx';
import RBACInfo from '../pages/RBACInfo/RBACInfo.jsx';
import ReferenceInfo from '../pages/ReferenceInfo/ReferenceInfo.jsx';
import ScreenInfo from '../pages/ScreenInfo/ScreenInfo.jsx';
import StdNormInfo from '../pages/StdNormInfo/StdNormInfo.jsx';
import StrategyBudgetInfo from "../pages/StrategyBudgetInfo/StrategyBudgetInfo.jsx";
import StrategyLaunchGist from "../pages/StrategyLaunchGist/StrategyLaunchGist.jsx";
import StrategyPlanInfo from '../pages/StrategyPlanInfo/StrategyPlanInfo.jsx';
import CapitalAssetStockInfo from '../pages/CapitalAssetStockInfo/CapitalAssetStockInfo.jsx';
import CashBookInfo from '../pages/CashBookInfo/CashBookInfo.jsx';
import TeamProgressInfo from '../pages/TeamProgressInfo/TeamProgressInfo.jsx';
import CostNormInfo from '../pages/CostNormInfo/CostNormInfo.jsx';
import MfgRoutingInfo from '../pages/MfgRoutingInfo/MfgRoutingInfo.jsx';
import OpsDemandCreationInfo from '../pages/OpsDemandCreationInfo/OpsDemandCreationInfo.jsx';
import OpsDiscountOfferInfo from '../pages/OpsDiscountOfferInfo/OpsDiscountOfferInfo.jsx';
import OpsSavingsPlanInfo from '../pages/OpsSavingsPlanInfo/OpsSavingsPlanInfo.jsx';
import ShopPerformanceInfo from '../pages/ShopPerformanceInfo/ShopPerformanceInfo.jsx';
import SCMPerformanceInfo from '../pages/SCMPerformanceInfo/SCMPerformanceInfo.jsx';
import BenefitInfo from '../pages/BenefitInfo/BenefitInfo.jsx';
import ResultantInfo from '../pages/ResultantInfo/ResultantInfo.jsx';
import MfgWorkCentreInfo from '../pages/MfgWorkCentreInfo/MfgWorkCentreInfo.jsx'

//
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
        icon: <AccountBalanceWalletTwoToneIcon />,
        id: "UI 21 120",
        label: "Income Statement",
        path: "/incomeStatementInfo",
        href: "/operationGame/incomeStatementInfo",
        routeElement: <IncomeStatementInfo />
      },
      {
        icon: <CurrencyExchangeTwoToneIcon />,
        id: "UI 21 130",
        label: "Cash Flow Statement",
        path: "/cashFlowStatement",
        href: "/operationGame/cashFlowStatement",
        routeElement: <CasFlowStatement />
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
        iconPath: asterikIcon,
        id: "UI 21 020",
        label: "Strategy Plan of a Batch",
        path: "/StrategyPlanInfo",
        href: "/operationGame/StrategyPlanInfo",
        routeElement: <StrategyPlanInfo />
      },
      {
        iconPath: asterikIcon,
        id: "UI 21 040",
        label: "Budget Plan for Strategy",
        path: "/StrategyBudgetInfo",
        href: "/operationGame/StrategyBudgetInfo",
        routeElement: <StrategyBudgetInfo />
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
        iconPath: rawIcon,
        id: "UI 21 140",
        label: "Raw Material Stock Info",
        path: "/rmStockInfo",
        href: "/operationGame/rmStockInfo",
        routeElement: <RmStockInfo />
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
        iconPath: asterikIcon,
        id: "UI 21 190",
        label: "Cash Balance Statement",
        path: "/CashBookInfo",
        href: "/operationGame/CashBookInfo",
        routeElement: <CashBookInfo />
      },
      {
        iconPath: recievableIcon,
        id: "UI 21 200",
        label: "Accounts Receivable",
        path: "/accountRecieveable",
        href: "/operationGame/accountRecieveable",
        routeElement: <AccountRecievable />
      },
      {
        iconPath: payableIcon,
        id: "UI 21 210",
        label: "Accounts Payable",
        path: "/accountPayable",
        href: "/operationGame/accountPayable",
        routeElement: <AccountPayable />
      }, 
      {
        iconPath: partIcon,
        id: "UI 22 010",
        label: "Part Details ",
        path: "/partInfo",
        href: "/operationGame/partInfo",
        routeElement: <PartInfo />
      },
      {
        iconPath: bomIcon,
        id: "UI 22 030",
        label: "Bill of Materials",
        path: "/BOMInfo",
        href: "/operationGame/BOMInfo",
        routeElement: <BOMInfo />
      },
      {
        iconPath: asterikIcon,
        id: "UI 22 040",
        label: "Mfg Process Chart",
        path: "/MfgRoutingInfo",
        href: "/operationGame/MfgRoutingInfo",
        routeElement: <MfgRoutingInfo />
      },
      {
        iconPath: asterikIcon,
        id: "UI 22 060",
        label: "Capital Asset Stock",
        path: "/CapitalAssetStockInfo",
        href: "/operationGame/CapitalAssetStockInfo",
        routeElement: <CapitalAssetStockInfo />
      },
      {
        iconPath: asterikIcon,
        id: "UI 21 050",
        label: "Demand Creation thru Strategy",
        path: "/OpsDemandCreationInfo",
        href: "/operationGame/OpsDemandCreationInfo",
        routeElement: <OpsDemandCreationInfo />
      },
      {
        iconPath: asterikIcon,
        id: "UI 21 060",
        label: "Discount Offer thru Strategy",
        path: "/OpsDiscountOfferInfo",
        href: "/operationGame/OpsDiscountOfferInfo",
        routeElement: <OpsDiscountOfferInfo />
      },
      {
        iconPath: asterikIcon,
        id: "UI 21 070",
        label: "Savings Plan thru Strategy",
        path: "/OpsSavingsPlanInfo",
        href: "/operationGame/OpsSavingsPlanInfo",
        routeElement: <OpsSavingsPlanInfo />
      },
      {
        iconPath: asterikIcon,
        id: "UI 21 220",
        label: "Shop Performance Report",
        path: "/ShopPerformanceInfo",
        href: "/operationGame/ShopPerformanceInfo",
        routeElement: <ShopPerformanceInfo />
      },
      {
        iconPath: asterikIcon,
        id: "UI 21 230",
        label: "SCM Performance Report",
        path: "/SCMPerformanceInfo",
        href: "/operationGame/SCMPerformanceInfo",
        routeElement: <SCMPerformanceInfo />
      },
      {
        iconPath: asterikIcon,
        id: "UI 21 030",
        label: "Strategy-Launch Summary",
        path: "/StrategyLaunchGist",
        href: "/operationGame/StrategyLaunchGist",
        routeElement: <StrategyLaunchGist />
      },
      {
        iconPath: asterikIcon,
        id: "UI 22 110",
        label: "Manufacturing Work Centre List",
        path: "/MfgWorkCentreInfo",
        href: "/operationGame/MfgWorkCentreInfo",
        routeElement: <MfgWorkCentreInfo />
      },     
      {
        iconPath: asterikIcon,
        id: "UI 22 160",
        label: "Reference Terms",
        path: "/ReferenceInfo",
        href: "/operationGame/ReferenceInfo",
        routeElement: <ReferenceInfo />
      },     
      {
        iconPath: asterikIcon,
        id: "UI 22 140",
        label: "Cost Norm Info",
        path: "/CostNormInfo",
        href: "/operationGame/CostNormInfo",
        routeElement: <CostNormInfo />
      },
      {
        iconPath: asterikIcon,
        id: "UI 22 150",
        label: "Standard Norms Info",
        path: "/StdNormInfo",
        href: "/operationGame/StdNormInfo",
        routeElement: <StdNormInfo />
      },
      {
        iconPath: asterikIcon,
        id: "UI 22 180",
        label: "Strategy Benefits",
        path: "/BenefitInfo",
        href: "/operationGame/BenefitInfo",
        routeElement: <BenefitInfo />
      },
      {
        iconPath: asterikIcon,
        id: "UI 22 190",
        label: "Strategy Outcome / Resultant",
        path: "/ResultantInfo",
        href: "/operationGame/ResultantInfo",
        routeElement: <ResultantInfo />
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
        iconPath: asterikIcon,
        id: "UI 24 080",
        label: "Team Progress Status",
        path: "/TeamProgressInfo",
        href: "/operationGame/TeamProgressInfo",
        routeElement: <TeamProgressInfo />
      },
      {
        iconPath: asterikIcon,
        id: "UI 25 010",
        label: "UI Screen Master List",
        path: "/ScreenInfo",
        href: "/operationGame/ScreenInfo",
        routeElement: <ScreenInfo />
      },
      {
        iconPath: asterikIcon,
        id: "UI 25 030",
        label: "RBAC Screen Access",
        path: "/RBACInfo",
        href: "/operationGame/RBACInfo",
        routeElement: <RBACInfo />
      },

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
    id: "UI 15 030",
    label: "User Access Management",
    path: "/userAccessManagement",
    href: "/operationGame/userAccessManagement",
    routeElement: <UserAccessManagement />
  }
  /*
  {
    iconPath: asterikIcon,
    id: "UI 001",
    label: "App Info Desk",
    path: "/AppInfoDesk",
    href: "/operationGame/AppInfoDesk",
    routeElement: <AppInfoDesk />,
    children: [
 
      {
        iconPath: asterikIcon,
        id: "UI 25 010",
        label: "UI Screen Master List",
        path: "/ScreenInfo",
        href: "/operationGame/ScreenInfo",
        routeElement: <ScreenInfo />
      },
      {
        iconPath: asterikIcon,
        id: "UI 25 030",
        label: "RBAC Screen Access",
        path: "/RBACInfo",
        href: "/operationGame/RBACInfo",
        routeElement: <RBACInfo />
      }
    ],
  }
  */

];

export const dateColumns = ["period", "Production_Month"];
