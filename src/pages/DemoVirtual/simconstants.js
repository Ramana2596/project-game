// src/pages/DemoVirtual/simconstants.js
// ✅ Holds simulation stage definitions and constants.

import React from "react";
import { 
  EmojiPeople, RocketLaunch, Assignment, Insights, Settings,
  PlayCircle, AccountBalance, SportsScore
} from "@mui/icons-material";

// ✅ Stage definitions (Stage 9 withdrawn and updated to 8)
export const StagesMaster = [
  { stageNo: 1, label: "Company Profile", icon: <EmojiPeople />, color: "#6A1B9A", isLoop: false },
  { stageNo: 2, label: "Strategy Draft", icon: <RocketLaunch />, color: "#C62828", isLoop: false },
  { stageNo: 3, label: "Strategic Plan", icon: <Assignment />, color: "#AD1457", isLoop: false },
  { stageNo: 4, label: "Market Intelligence", icon: <Insights />, color: "#0288D1", isLoop: true },
  { stageNo: 5, label: "Operations Plan", icon: <Settings />, color: "#1565C0", isLoop: true },
  { stageNo: 6, label: "Simulation - Business Cycles", icon: <PlayCircle />, color: "#00897B", isLoop: true },
  { stageNo: 7, label: "Financial Outcomes", icon: <AccountBalance />, color: "#F9A825", isLoop: true },
  { stageNo: 8, label: "KPI & Team Results", icon: <SportsScore />, color: "#2E7D32", isLoop: false }, // ✅ Updated from 9 to 8
];

// ✅ Map stage numbers to display titles
export const STAGE_TITLE_MAP = StagesMaster.reduce((acc, s) => {
  acc[s.stageNo] = s.label;
  return acc;
}, {});

// ✅ Final simulation step constant
export const FINAL_STAGE_NO = Math.max(...StagesMaster.map(s => s.stageNo));