// src/pages/SimulationSuite/simconstants.js
// Canonical stage definitions used across the simulation suite
import React from "react";
import {
  EmojiPeople, RocketLaunch, Assignment, Insights, Settings,
  PlayCircle, AccountBalance, EventAvailable, SportsScore
} from "@mui/icons-material";

export const STAGES = [
  { stageNo: 1, label: "Company Profile", icon: <EmojiPeople />, color: "#6A1B9A", isLoop: false },
  { stageNo: 2, label: "Strategy Draft", icon: <RocketLaunch />, color: "#C62828", isLoop: false },
  { stageNo: 3, label: "Strategic Plan", icon: <Assignment />, color: "#AD1457", isLoop: false },
  { stageNo: 4, label: "Market Intelligence", icon: <Insights />, color: "#0288D1", isLoop: true },
  { stageNo: 5, label: "Operations Plan", icon: <Settings />, color: "#1565C0", isLoop: true },
  { stageNo: 6, label: "Simulation - Business Cycles", icon: <PlayCircle />, color: "#00897B", isLoop: true },
  { stageNo: 7, label: "Financial Outcomes", icon: <AccountBalance />, color: "#F9A825", isLoop: true },
  //{ stageNo: 8, label: "Manufacturing Performance Review", icon: <EventAvailable />, color: "#EF6C00", isLoop: true },
  { stageNo: 9, label: "KPI & Team Results", icon: <SportsScore />, color: "#2E7D32", isLoop: false },
];

// Map stage number to human readable title for drawer headers
export const STAGE_TITLES = STAGES.reduce((acc, s) => {
  acc[s.stageNo] = `Stage ${s.stageNo} – ${s.label}`;
  return acc;
}, {});

// Final stage number derived from master list
export const FINAL_STAGE = Math.max(...STAGES.map(s => s.stageNo));
