// src/navigation/routeRegistry.js

// Each module exports an ARRAY → easy to merge consistently
import { dashboardRoutes } from "./Dashboard/dashboardRoutes";
import { infoDeskRoutes } from "./InfoDesk/infoDeskRoutes";
import { marketScenarioRoutes } from "./MarketScenario/marketScenarioRoutes";
import { operationsRoutes } from "./Operations/operationsRoutes";
import { simulationRoutes } from "./Simulation/simulationRoutes";
import { batchMgtRoutes } from "./BatchMgt/batchMgtRoutes";
import { userMgtDeskRoutes } from "./UserMgtDesk/userMgtDeskRoutes";
import { systemInfoDeskRoutes } from "./SystemInfoDesk/systemInfoDeskRoutes";
import { quicklinksRoutes } from "./QuickLinks/quicklinksRoutes";

// Spread keeps structure flat → sidebar + routes stay in sync
export const allRoutes = [
  ...dashboardRoutes,
  ...infoDeskRoutes,
  ...marketScenarioRoutes,
  ...operationsRoutes,
  ...simulationRoutes,
  ...batchMgtRoutes,
  ...userMgtDeskRoutes,
  ...systemInfoDeskRoutes,
  ...quicklinksRoutes,
];
