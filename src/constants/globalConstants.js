import GameDashboard from "../pages/GameDashboard/GameDashboard";
import StrategyLaunched from "../pages/LaunchStrategy/StrategyLaunched";
import StrategyPlan from "../pages/StrategyPlanApproval/StrategyPlanApproval";
import MarketFactorInfo from "../pages/MarketFactorInfo/MarketFactorInfo";
import MarketFactorInfoInput from "../pages/MarketFactorInfoInput/MarketFactorInfoInput";
import OperationalPlanInfo from "../pages/OperationalPlanInfo/OperationalPlanInfo";
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
import SystemInfoDesk from "../pages/SystemInfoDesk/SystemInfoDesk.jsx";
import UserMgtDesk from "../pages/UserMgtDesk/UserMgtDesk.jsx";
import UserRoleManagement from "../pages/UserRoleManagement/UserRoleManagement";
import Simulation from "../pages/Simulation/Simulation";
import BatchMgt from "../pages/BatchMgt/BatchMgt.jsx";

// start of png
import homeIcon from '../assets/navigation-menu/home.png';
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
import receivableIcon from '../assets/navigation-menu/receivable.png';
import savingsIcon from '../assets/navigation-menu/savings.png';
import strategyIcon from '../assets/navigation-menu/strategy.png';
import partIcon from '../assets/navigation-menu/part.png'
import bomIcon from '../assets/navigation-menu/bom.png'
import asterikIcon from '../assets/navigation-menu/asterik.png'
import budgetIcon from '../assets/navigation-menu/budget.png'
import marketIcon from '../assets/navigation-menu/market.png'
import choiceIcon from '../assets/navigation-menu/choice.png'
import loanIcon from '../assets/navigation-menu/loan.png'
import roleIcon from '../assets/navigation-menu/role.png'
import tilesIcon from '../assets/navigation-menu/tiles.png'
import rightaccessIcon from '../assets/navigation-menu/rightaccess.png'
import costIcon from '../assets/navigation-menu/cost.png'
import factoryIcon from '../assets/navigation-menu/factory.png'
import standardIcon from '../assets/navigation-menu/standard.png'
import valueStreamIcon from '../assets/navigation-menu/valueChain.png'
import productIcon from '../assets/navigation-menu/productLaunch.png'
import benefitsIcon from '../assets/navigation-menu/benefits.png'
import referenceIcon from '../assets/navigation-menu/reference.png'
import strategySetsIcon from '../assets/navigation-menu/strategySets.png'
import demandIcon from '../assets/navigation-menu/demand.png'
import discountIcon from '../assets/navigation-menu/discount.png'
import cashBookIcon from '../assets/navigation-menu/cashBook.png'
import machineIcon from '../assets/navigation-menu/machine.png'
import improvementIcon from '../assets/navigation-menu/improvement.png'
import factoryPerfIcon from '../assets/navigation-menu/factoryPerf.png'
import supplierPerfIcon from '../assets/navigation-menu/supplierPerf.png'
import progressIcon from '../assets/navigation-menu/progress.png'
import processIcon from '../assets/navigation-menu/process.png'
import businessStrategyIcon from '../assets/navigation-menu/business-strategy.png'
import resultIcon from '../assets/navigation-menu/result.png'
import actionableIcon from '../assets/navigation-menu/actionable.png'
import statisticsIcon from '../assets/navigation-menu/statistics.png'
import onlinestudyIcon from '../assets/navigation-menu/onlinestudy.png'
import softwareIcon from '../assets/navigation-menu/software.png'
import professionalIcon from '../assets/navigation-menu/professional.png'
import IdCardIcon from '../assets/navigation-menu/IdCard.png'
import userIcon from '../assets/navigation-menu/user.png'
import verifiedIcon from '../assets/navigation-menu/verified.png'
import operationInputIcon from '../assets/navigation-menu/potential.png'
import marketInputIcon from '../assets/navigation-menu/marketInput.png'
import peopleIcon from '../assets/navigation-menu/people.png'
import schoolIcon from '../assets/navigation-menu/school.png'
import manufacturingIcon from '../assets/navigation-menu/manufacturing.png'
import dashboardIcon from '../assets/navigation-menu/dash-board.png';
import perfOpsIcon from '../assets/navigation-menu/perfOps.png';
import perfCoIcon from "../assets/navigation-menu/perfCo.png";
import omgBgIcon from "../assets/navigation-menu/omgBgSrp.png";
// end of png 

import FeatureManagement from "../pages/FeatureManagement/FeatureManagement";
import Operations from "../pages/Operations/Operations";
import MarketScenario from "../pages/MarketScenario/MarketScenario.jsx";
import AccountPayable from "../pages/AccountPayable/AccountPayable";
import SavingsRealisable from "../pages/SavingsRealisable/SavingsRealisable";
import AcReceivable from '../pages/AcReceivable/AcReceivable.jsx';
import PartInfo from '../pages/PartInfo/PartInfo';
import BOMInfo from '../pages/BOMInfo/BOMInfo.jsx';
import RBACInfo from '../pages/RBACInfo/RBACInfo.jsx';
import ReferenceInfo from '../pages/ReferenceInfo/ReferenceInfo.jsx';
import ScreenInfo from '../pages/ScreenInfo/ScreenInfo.jsx';
import StdNormInfo from '../pages/StdNormInfo/StdNormInfo.jsx';
import StrategyBudgetInfo from "../pages/StrategyBudgetInfo/StrategyBudgetInfo.jsx";
import StrategyLaunchGist from "../pages/StrategyLaunchGist/StrategyLaunchGist.jsx";
import StrategyPlanTeam from '../pages/StrategyPlanTeam/StrategyPlanTeam.jsx';
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
import MfgWorkCentreInfo from '../pages/MfgWorkCentreInfo/MfgWorkCentreInfo.jsx';
import ValidInputCodes from '../pages/ValidInputCodes/ValidInputCodes.jsx';
import LiabilityInfo from '../pages/LiabilityInfo/LiabilityInfo.jsx';
import RoleInfo from '../pages/RoleInfo/RoleInfo.jsx';
import StrategySetCollection from '../pages/StrategySetCollection/StrategySetCollection.jsx';
import ProductMstInfo from "../pages/ProductMstInfo/ProductMstInfo.jsx";
import ValueStream from '../pages/ValueStream/ValueStream.jsx';
import ValueStreamMap from "../pages/ValueStreamMap/ValueStreamMap.jsx";
import ClassRoomSession from "../pages/ClassRoomSession/ClassRoomSession.jsx";
import ProfessionInfo from '../pages/ProfessionInfo/ProfessionInfo.jsx';
import ProfessionRoleInfo from '../pages/ProfessionRoleInfo/ProfessionRoleInfo.jsx';
import UserProfileInfo from "../pages/UserProfileInfo/UserProfileInfo.jsx";
import MarketInputError from '../pages/MarketInputError/MarketInputError.jsx';
import StdMarketInput from "../pages/StdMarketInput/StdMarketInput.jsx";
import StdOperationInput from "../pages/StdOperationInput/StdOperationInput.jsx";
import MarketInfoTeam from "../pages/MarketInfoTeam/MarketInfoTeam.jsx";
import AssetCatalogTeam from "../pages/AssetCatalogTeam/AssetCatalogTeam.jsx";
import AssetCatalogBatch from "../pages/AssetCatalogBatch/AssetCatalogBatch.jsx";
import SimulationPlay from "../pages/SimulationPlay/SimulationPlay.jsx";
import BatchMstDetails from "../pages/BatchMaster/BatchMstDetails.jsx";
import DemoWizard from "../pages/SimulationPlay/DemoWizard.jsx";
import TeamPlanScreen from "../pages/TeamPlan/TeamPlanScreen.jsx";
import SimulationSuite from '../pages/SimulationSuite/SimulationSuite.jsx';
import KeyResultBsInfo  from '../pages/KeyResultBsInfo/KeyResultBsInfo.jsx';
import KeyResultPlInfo  from '../pages/KeyResultPlInfo/KeyResultPlInfo.jsx';
import DemoOmg from "../pages/DemoOmg/DemoOmg.jsx";

// import AssetCatalog from "../pages/AssetCatalog/AssetCatalog.jsx";

export const componentList = [
  {
    iconPath: homeIcon,
    id: "UI 99 900",
    label: "Game Dashboard",
    path: "/homePage",
    href: "/operationGame/homePage",
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
    id: "UI 99 910",
    label: "Information Desk",
    path: "/infoDesk",
    href: "/operationGame/infoDesk",
    routeElement: <InfoDesk />,
    children: [
      {
        iconPath: strategySetsIcon,
        id: "UI 21 010",
        label: "Strategy Sets Collection",
        path: "/StrategySetCollection",
        href: "/operationGame/StrategySetCollection",
        routeElement: <StrategySetCollection />
      },
      {
        iconPath: businessStrategyIcon,
        id: "UI 21 020",
        label: "Strategies for You",
        path: "/StrategyPlanInfo",
        href: "/operationGame/StrategyPlanTeam",
        routeElement: <StrategyPlanTeam />
      },
      {
        iconPath: budgetIcon,
        id: "UI 21 040",
        label: "Budget for Strategy",
        path: "/StrategyBudgetInfo",
        href: "/operationGame/StrategyBudgetInfo",
        routeElement: <StrategyBudgetInfo />
      },
      {
        iconPath: marketfactorInfoIcon,
        id: "UI 21 080",
        label: "Market Info Archive",
        path: "/marketFactorInfo",
        href: "/operationGame/marketFactorInfo",
        routeElement: <MarketFactorInfo />
      },
      {
        iconPath: marketfactorInfoIcon,
        id: "UI 21 090",
        label: "Market Info",
        path: "/marketInfoTeam",
        href: "/operationGame/marketInfoTeam",
        routeElement: <MarketInfoTeam />
      },
      {
        iconPath: operationalDecisionIcon,
        id: "UI 21 100",
        label: "Operations Decision Info",
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
        iconPath: cashBookIcon,
        id: "UI 21 190",
        label: "Cash Balance Statement",
        path: "/CashBookInfo",
        href: "/operationGame/CashBookInfo",
        routeElement: <CashBookInfo />
      },
      {
        iconPath: receivableIcon,
        id: "UI 21 200",
        label: "Accounts Receivable",
        path: "/AcReceivable",
        href: "/operationGame/AcReceivable",
        routeElement: <AcReceivable />
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
        iconPath: loanIcon,
        id: "UI 21 220",
        label: "Liability Details",
        path: "/LiabilityInfo",
        href: "/operationGame/LiabilityInfo",
        routeElement: <LiabilityInfo />
      },
      {
        iconPath: perfCoIcon,
        id: "UI 21 281",
        label: "Key Result - Balance Sheet",
        path: "/KeyResultBsInfo",
        href: "/operationGame/KeyResultBsInfo",
        routeElement: <KeyResultBsInfo />
      },
      {
        iconPath: perfOpsIcon,
        id: "UI 21 282",
        label: "Key Result - Profit & Loss",
        path: "/KeyResultPlInfo",
        href: "/operationGame/KeyResultPlInfo",
        routeElement: <KeyResultPlInfo />
      },
      
      {
        iconPath: partIcon,
        id: "UI 22 010",
        label: "Capital Asset Catalog",
        path: "/assetCatalogTeam",
        href: "/operationGame/assetCatalogTeam",
        routeElement: <AssetCatalogTeam />
      },
      {
        iconPath: partIcon,
        id: "UI 22 050",
        label: "Capital Asset Catalog Master",
        path: "/assetCatalogBatch",
        href: "/operationGame/assetCatalogBatch",
        routeElement: <AssetCatalogBatch />
      },
      {
        iconPath: productIcon,
        id: "UI 22 020",
        label: "Product Master Details ",
        path: "/ProductMstInfo",
        href: "/operationGame/ProductMstInfo",
        routeElement: <ProductMstInfo />
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
        iconPath: processIcon,
        id: "UI 22 040",
        label: "Mfg Process Chart",
        path: "/MfgRoutingInfo",
        href: "/operationGame/MfgRoutingInfo",
        routeElement: <MfgRoutingInfo />
      },
      {
        iconPath: machineIcon,
        id: "UI 22 060",
        label: "Capital Asset Stock",
        path: "/CapitalAssetStockInfo",
        href: "/operationGame/CapitalAssetStockInfo",
        routeElement: <CapitalAssetStockInfo />
      },
      {
        iconPath: demandIcon,
        id: "UI 21 050",
        label: "Demand Creation thru Strategy",
        path: "/OpsDemandCreationInfo",
        href: "/operationGame/OpsDemandCreationInfo",
        routeElement: <OpsDemandCreationInfo />
      },
      {
        iconPath: discountIcon,
        id: "UI 21 060",
        label: "Discount Offer thru Strategy",
        path: "/OpsDiscountOfferInfo",
        href: "/operationGame/OpsDiscountOfferInfo",
        routeElement: <OpsDiscountOfferInfo />
      },
      {
        iconPath: improvementIcon,
        id: "UI 21 070",
        label: "Savings Plan thru Strategy",
        path: "/OpsSavingsPlanInfo",
        href: "/operationGame/OpsSavingsPlanInfo",
        routeElement: <OpsSavingsPlanInfo />
      },
      {
        iconPath: factoryPerfIcon,
        id: "UI 21 240",
        label: "Shop Performance Report",
        path: "/ShopPerformanceInfo",
        href: "/operationGame/ShopPerformanceInfo",
        routeElement: <ShopPerformanceInfo />
      },
      {
        iconPath: supplierPerfIcon,
        id: "UI 21 250",
        label: "SCM Performance Report",
        path: "/SCMPerformanceInfo",
        href: "/operationGame/SCMPerformanceInfo",
        routeElement: <SCMPerformanceInfo />
      },
      {
        iconPath: statisticsIcon,
        id: "UI 21 030",
        label: "Strategy-Launch Summary",
        path: "/StrategyLaunchGist",
        href: "/operationGame/StrategyLaunchGist",
        routeElement: <StrategyLaunchGist />
      },
      {
        iconPath: savingsIcon,
        id: "UI 21 230",
        label: "Savings Realisable",
        path: "/savingsRealisable",
        href: "/operationGame/savingsRealisable",
        routeElement: <SavingsRealisable />
      },
      {
        iconPath: onlinestudyIcon,
        id: "UI 24 070",
        label: "Class Room Session",
        path: "/ClassRoomSession",
        href: "/operationGame/ClassRoomSession",
        routeElement: <ClassRoomSession />
      },
      {
        iconPath: progressIcon,
        id: "UI 24 090",
        label: "Team Progress Status",
        path: "/TeamProgressInfo",
        href: "/operationGame/TeamProgressInfo",
        routeElement: <TeamProgressInfo />
      }
    ],
  },
  {
    iconPath: marketIcon,
    id: "UI 99 920",
    label: "Market Scenario",
    path: "/MarketScenario",
    href: "/operationGame/MarketScenario",
    routeElement: <MarketScenario />,
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
        iconPath: marketfactorInfoInputIcon,
        id: "UI 11 040",
        label: "Key-in Market Input",
        path: "/marketFactorInfoInput",
        href: "/operationGame/marketFactorInfoInput",
        routeElement: <MarketFactorInfoInput />
      },
      {
        iconPath: asterikIcon,
        id: "UI 22 270",
        label: "Check Minimum Market Input",
        path: "/MarketInputError",
        href: "/operationGame/MarketInputError",
        routeElement: <MarketInputError />
      },
      {
        iconPath: marketInputIcon,
        id: "UI 22 200",
        label: "Release Std Market Input",
        path: "/StdMarketInput",
        href: "/operationGame/StdMarketInput",
        routeElement: <StdMarketInput />
      },
      {
        iconPath: strategyIcon,
        id: "UI 12 170",
        label: "Strategy Master",
        path: "/strategyMaster",
        href: "/operationGame/strategyMaster",
        routeElement: <StrategyMaster />
      }
    ]
  },
  {
    iconPath: operationsIcon,
    id: "UI 99 930",
    label: "Operations",
    path: "/operations",
    href: "/operationGame/operations",
    routeElement: <Operations />,
    children: [
      {
        iconPath: approvalIcon,
        id: "UI 11 030",
        label: "Strategic Plan",
        path: "/strategyPlanApproval",
        href: "/operationGame/strategyPlanApproval",
        routeElement: <StrategyPlan />
      },
      {
        iconPath: operationalDecisionInputIcon,
        id: "UI 11 050",
        label: "Operations Plan",
        path: "/teamPlanScreen",
        href: "/operationGame/teamPlanScreen",
        routeElement: <TeamPlanScreen />
      },

    ],
  },
  {
    iconPath: manufacturingIcon,
    id: "UI 99 940",
    label: "Simulation",
    path: "/Simulation",
    href: "/operationGame/Simulation",
    routeElement: <Simulation />,
    children: [
      /*
        {
          iconPath: appSettings,
          id: "UI 21 260",
          label: "Team Play",
          path: "/teamPlay",
          href: "/operationGame/teamPlay",
          routeElement: <FeatureManagement />
        },
      */
      {
        iconPath: appSettings,
        id: "UI 21 271",
        label: "Simulation Play",
        path: "/simulationPlay",
        href: "/operationGame/SimulationPlay",
        routeElement: <SimulationPlay />
      },
      {
        iconPath: appSettings,
        id: "UI 21 272",
        label: "Simulation Suite",
        path: "/simulationSuite",
        href: "/operationGame/simulationSuite",
        routeElement: <SimulationSuite />
      },
      {
        iconPath: appSettings,
        id: "UI 21 270",
        label: "Demo Wizard",
        path: "/demoWizard",
        href: "/operationGame/DemoWizard",
        routeElement: <DemoWizard />
      },
            {
        iconPath: appSettings,
        id: "UI 21 273",
        label: "Demo OMG",
        path: "/demoOmg",
        href: "/operationGame/DemoOmg",
        routeElement: <DemoOmg />
      }

    ],
  },
  {
    iconPath: schoolIcon,
    id: "UI 99 970",
    label: "Batch Management",
    path: "/BatchMgt",
    href: "/operationGame/BatchMgt",
    routeElement: <BatchMgt />,
    children: [
      {
        iconPath: peopleIcon,
        id: "UI 14 020",
        label: "Batch Master Details",
        path: "/BatchMaster",
        href: "/operationGame/BatchMaster",
        routeElement: <BatchMstDetails />
      }
    ],
  },

  {
    iconPath: secureAccessIcon,
    id: "UI 99 980",
    label: "User Mgt Desk",
    path: "/UserMgtDesk",
    href: "/operationGame/UserMgtDesk",
    routeElement: <UserMgtDesk />,
    children: [
      {
        iconPath: tilesIcon,
        id: "UI 25 010",
        label: "UI Screen Master List",
        path: "/ScreenInfo",
        href: "/operationGame/ScreenInfo",
        routeElement: <ScreenInfo />
      },
      {
        iconPath: roleIcon,
        id: "UI 25 020",
        label: "Role Info",
        path: "/RoleInfo",
        href: "/operationGame/RoleInfo",
        routeElement: <RoleInfo />
      },
      {
        iconPath: professionalIcon,
        id: "UI 25 060",
        label: "Profession Info",
        path: "/ProfessionInfo",
        href: "/operationGame/ProfessionInfo",
        routeElement: <ProfessionInfo />
      },
      {
        iconPath: IdCardIcon,
        id: "UI 25 070",
        label: "Profession Vs Role Info",
        path: "/ProfessionRoleInfo",
        href: "/operationGame/ProfessionRoleInfo",
        routeElement: <ProfessionRoleInfo />
      },
      {
        iconPath: rightaccessIcon,
        id: "UI 25 030",
        label: "RBAC Screen Access",
        path: "/RBACInfo",
        href: "/operationGame/RBACInfo",
        routeElement: <RBACInfo />
      },
      {
        iconPath: userIcon,
        id: "UI 25 040",
        label: "User Profile",
        path: "/UserProfileInfo",
        href: "/operationGame/UserProfileInfo",
        routeElement: <UserProfileInfo />
      },
      {
        iconPath: verifiedIcon,
        id: "UI 15 030",
        label: "User Role Management",
        path: "/userRoleManagement",
        href: "/operationGame/userRoleManagement",
        routeElement: <UserRoleManagement />
      },
    ],
  },
  {
    iconPath: softwareIcon,
    id: "UI 99 990",
    label: "System Info Desk",
    path: "/SystemInfoDesk",
    href: "/operationGame/SystemInfoDesk",
    routeElement: <SystemInfoDesk />,
    children: [
      {
        iconPath: operationInputIcon,
        id: "UI 22 210",
        label: "Release Std Operation Input",
        path: "/StdOperationInput",
        href: "/operationGame/StdOperationInput",
        routeElement: <StdOperationInput />
      },
      {
        iconPath: choiceIcon,
        id: "UI 22 220",
        label: "Valid Market Vs Operation Codes",
        path: "/ValidInputCodes",
        href: "/operationGame/ValidInputCodes",
        routeElement: <ValidInputCodes />
      },
      {
        iconPath: factoryIcon,
        id: "UI 22 110",
        label: "Manufacturing Work Centre List",
        path: "/MfgWorkCentreInfo",
        href: "/operationGame/MfgWorkCentreInfo",
        routeElement: <MfgWorkCentreInfo />
      },
      {
        iconPath: referenceIcon,
        id: "UI 22 160",
        label: "Reference Terms",
        path: "/ReferenceInfo",
        href: "/operationGame/ReferenceInfo",
        routeElement: <ReferenceInfo />
      },
      {
        iconPath: costIcon,
        id: "UI 22 140",
        label: "Cost Norm Info",
        path: "/CostNormInfo",
        href: "/operationGame/CostNormInfo",
        routeElement: <CostNormInfo />
      },
      {
        iconPath: standardIcon,
        id: "UI 22 150",
        label: "Standard Norms Info",
        path: "/StdNormInfo",
        href: "/operationGame/StdNormInfo",
        routeElement: <StdNormInfo />
      },
      {
        iconPath: benefitsIcon,
        id: "UI 22 180",
        label: "Strategy Benefits",
        path: "/BenefitInfo",
        href: "/operationGame/BenefitInfo",
        routeElement: <BenefitInfo />
      },
      {
        iconPath: resultIcon,
        id: "UI 22 190",
        label: "Strategy Outcome / Resultant",
        path: "/ResultantInfo",
        href: "/operationGame/ResultantInfo",
        routeElement: <ResultantInfo />
      },
      {
        iconPath: valueStreamIcon,
        id: "UI 22 230",
        label: "Value Stream Details",
        path: "/ValueStream",
        href: "/operationGame/ValueStream",
        routeElement: <ValueStream />
      },
      {
        iconPath: actionableIcon,
        id: "UI 22 240",
        label: "Resultant - Value Stream Map",
        path: "/ValueStreamMap",
        href: "/operationGame/ValueStreamMap",
        routeElement: <ValueStreamMap />
      }
    ],
  }

];

export const dateColumns = ["period", "Production_Month"];
