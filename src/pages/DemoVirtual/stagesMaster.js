// src/pages/DemoVirtual/stageMaster.js
// Holds simulation stage definitions and constants.

import React from "react";
import { 
  EmojiPeople, RocketLaunch, Assignment, Insights, Settings,
  PlayCircle, AccountBalance, SportsScore
} from "@mui/icons-material";

// Stage definitions with toDo actionable subtitles
export const StagesMaster = [
  { 
    stageNo: 1, 
    label: "Company Profile", 
    toDo: "Set up company information and core objectives", 
    icon: <EmojiPeople />, 
    color: "#6A1B9A", 
    isLoop: false 
  },
  { 
    stageNo: 2, 
    label: "Strategy Draft", 
    toDo: "Outline initial strategic vision and direction", 
    icon: <RocketLaunch />, 
    color: "#C62828", 
    isLoop: false 
  },
  { 
    stageNo: 3, 
    label: "Strategic Plan", 
    toDo: "Finalize competitive strategy and positioning", 
    icon: <Assignment />, 
    color: "#AD1457", 
    isLoop: false 
  },
  { 
    stageNo: 4, 
    label: "Market Intelligence", 
    toDo: "Analyse market conditions and customer demand", 
    icon: <Insights />, 
    color: "#0288D1", 
    isLoop: true 
  },
  { 
    stageNo: 5, 
    label: "Operations Plan", 
    toDo: "Plan capacity, resource utilization, and workflow", 
    icon: <Settings />, 
    color: "#1565C0", 
    isLoop: true 
  },
  { 
    stageNo: 6, 
    label: "Business Plan Execution", 
    toDo: "Execute operational tactics and manage decisions", 
    icon: <PlayCircle />, 
    color: "#00897B", 
    isLoop: true 
  },
  { 
    stageNo: 7, 
    label: "Financial Outcome", 
    toDo: "Review period revenue, costs, and cash flow", 
    icon: <AccountBalance />, 
    color: "#F9A825", 
    isLoop: true 
  },
  { 
    stageNo: 8, 
    label: "Key Results", 
    toDo: "Evaluate overall performance and plan next steps", 
    icon: <SportsScore />, 
    color: "#2E7D32", 
    isLoop: false 
  },
];

// Map stage numbers to display titles
export const STAGE_TITLE_MAP = StagesMaster.reduce((acc, s) => {
  acc[s.stageNo] = s.label;
  return acc;
}, {});

// Final simulation step constant
export const FINAL_STAGE_NO = Math.max(...StagesMaster.map(s => s.stageNo));