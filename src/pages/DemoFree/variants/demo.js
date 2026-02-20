// src/pages/SimulationSuiteNew/variants/demo.js
// ✅ Demo variant configuration for SimulationSuiteNew.

import { 
  EmojiPeople, RocketLaunch, Assignment, Insights, Settings,
  PlayCircle, AccountBalance, SportsScore
} from "@mui/icons-material";

// ✅ Demo variant stage definitions (mirrors simconstants, but can be customized for demo mode).
export const DemoStages = [
  { stageNo: 1, label: "Company Profile", icon: <EmojiPeople />, color: "#6A1B9A" },
  { stageNo: 2, label: "Strategy Draft", icon: <RocketLaunch />, color: "#C62828" },
  { stageNo: 3, label: "Strategic Plan", icon: <Assignment />, color: "#AD1457" },
  { stageNo: 4, label: "Market Intelligence", icon: <Insights />, color: "#0288D1" },
  { stageNo: 5, label: "Operations Plan", icon: <Settings />, color: "#1565C0" },
  { stageNo: 6, label: "Simulation - Business Cycles", icon: <PlayCircle />, color: "#00897B" },
  { stageNo: 7, label: "Financial Outcomes", icon: <AccountBalance />, color: "#F9A825" },
  { stageNo: 9, label: "KPI & Team Results", icon: <SportsScore />, color: "#2E7D32" },
];

// ✅ Demo variant title map (labels only).
export const DemoStageTitleMap = DemoStages.reduce((acc, s) => {
  acc[s.stageNo] = s.label;
  return acc;
}, {});
