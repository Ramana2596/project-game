import GameSession from '../pages/GameSession';
import GameDashboard from '../pages/GameDashboard';
import StrategyLaunched from '../pages/StrategyLaunched';
import StrategyPlan from '../pages/StrategyPlanApproval';
import MarketFactorInfo from '../pages/MarketFactorInfo';
import MarketFactorInfoInput from '../pages/MarketFactorInfoInput/MarketFactorInfoInput';
import GameMaster from '../pages/GameMaster';
import GameBatch from '../pages/GameBatch';

export const componentList = [
  { id: 'UI 005', displayText: 'Game Dashboard', path: '/gameDashboard', routePath: '/operationGame/gameDashboard', routeElement: <GameDashboard /> },
  { id: '', displayText: 'Game Master', path: '/gameMaster', routePath: '/operationGame/gameMaster', routeElement: <GameMaster /> },
  { id: '', displayText: 'Game Batch', path: '/gameBatch', routePath: '/operationGame/gameBatch', routeElement: <GameBatch /> },
  { id: '', displayText: 'Game Session', path: '/gameSession', routePath: '/operationGame/gameSession', routeElement: <GameSession /> },
  { id: 'UI 001', displayText: 'Strategy Launched', path: '/strategyLaunched', routePath: '/operationGame/strategyLaunched', routeElement: <StrategyLaunched /> },
  { id: 'UI 002', displayText: 'Strategy Plan Approval', path: '/strategyPlanApproval', routePath: '/operationGame/strategyPlanApproval', routeElement: <StrategyPlan /> },
  { id: 'UI 003', displayText: 'Market Factor Info', path: '/marketFactorInfo', routePath: '/operationGame/marketFactorInfo', routeElement: <MarketFactorInfo /> },
  { id: 'UI 004', displayText: 'Market Factor Info Input', path: '/marketFactorInfoInput', routePath: '/operationGame/marketFactorInfoInput', routeElement: <MarketFactorInfoInput /> }
];

export const dateColumns = [
  'period'
];