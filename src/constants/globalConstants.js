import GameSession from '../pages/GameSession';
import GameDashboard from '../pages/GameDashboard';
import StrategyLaunched from '../pages/StrategyLaunched';
import StrategyPlan from '../pages/StrategyPlanApproval';
import MarketFactorInfo from '../pages/MarketFactorInfo';
import MarketFactorInfoInput from '../pages/MarketFactorInfoInput/MarketFactorInfoInput';
import GameMaster from '../pages/GameMaster';
import GameBatch from '../pages/GameBatch';

export const componentList = [
  { id: '', displayText: 'Game Dashboard', routePath: '/operationGame/gameDashboard', routeElement: <GameDashboard /> },
  { id: '', displayText: 'Game Master', routePath: '/operationGame/gameMaster', routeElement: <GameMaster /> },
  { id: '', displayText: 'Game Batch', routePath: '/operationGame/gameBatch', routeElement: <GameBatch /> },
  { id: '', displayText: 'Game Session', routePath: '/operationGame/gameSession', routeElement: <GameSession /> },
  { id: 'UI 001', displayText: 'Strategy Launched', routePath: '/operationGame/strategyLaunched', routeElement: <StrategyLaunched /> },
  { id: 'UI 002', displayText: 'Strategy Plan Approval', routePath: '/operationGame/strategyPlanApproval', routeElement: <StrategyPlan /> },
  { id: 'UI 003', displayText: 'Market Factor Info', routePath: '/operationGame/marketFactorInfo', routeElement: <MarketFactorInfo /> },
  { id: 'UI 004', displayText: 'Market Factor Info Input', routePath: '/operationGame/marketFactorInfoInput', routeElement: <MarketFactorInfoInput /> }
];

export const dateColumns = [
  'period'
];