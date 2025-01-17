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

export const componentList = [
  {
    id: "UI 001",
    displayText: "Game Dashboard",
    path: "/gameDashboard",
    routePath: "/operationGame/gameDashboard",
    routeElement: <GameDashboard />,
  },
  {
    id: "",
    displayText: "Game Master",
    path: "/gameMaster",
    routePath: "/operationGame/gameMaster",
    routeElement: <GameMaster />,
  },
  {
    id: "",
    displayText: "Game Batch",
    path: "/gameBatch",
    routePath: "/operationGame/gameBatch",
    routeElement: <GameBatch />,
  },
  {
    id: "",
    displayText: "Game Session",
    path: "/gameSession",
    routePath: "/operationGame/gameSession",
    routeElement: <GameSession />,
  },
  {
    id: "UI 001",
    displayText: "Launch Strategy",
    path: "/strategyLaunched",
    routePath: "/operationGame/strategyLaunched",
    routeElement: <StrategyLaunched />,
  },
  {
    id: "UI 002",
    displayText: "Strategy Plan Approval",
    path: "/strategyPlanApproval",
    routePath: "/operationGame/strategyPlanApproval",
    routeElement: <StrategyPlan />,
  },
  {
    id: "UI 003",
    displayText: "Market Factor Info",
    path: "/marketFactorInfo",
    routePath: "/operationGame/marketFactorInfo",
    routeElement: <MarketFactorInfo />,
  },
  {
    id: "UI 004",
    displayText: "Market Factor Input",
    path: "/marketFactorInfoInput",
    routePath: "/operationGame/marketFactorInfoInput",
    routeElement: <MarketFactorInfoInput />,
  },
  {
    id: "UI 005",
    displayText: "Operational Decision Info",
    path: "/operationalPlanInfo",
    routePath: "/operationGame/operationalPlanInfo",
    routeElement: <OperationalPlanInfo />,
  },
  {
    id: "UI 006",
    displayText: "Operational Decision Input",
    path: "/operationalPlanInfoInput",
    routePath: "/operationGame/operationalPlanInfoInput",
    routeElement: <OperationalPlanInfoInput />,
  },
  {
    id: "UI 007",
    displayText: "Income Statement",
    path: "/incomeStatementInfo",
    routePath: "/operationGame/incomeStatementInfo",
    routeElement: <IncomeStatementInfo />,
  },
  {
    id: "UI 008",
    displayText: "Balance Sheet",
    path: "/balanceSheet",
    routePath: "/operationGame/balanceSheet",
    routeElement: <BalanceSheetInfo />,
  },
];

export const dateColumns = ["period"];
