// ==========================================================
// Component Name : steps
// Module         : WebOmtp (Landing)
// Purpose        : 7-step walkthrough content with real OMTP app screens
// Author/Version : UXLab V1.3 / v1.0
// AI Tags        : landing, walkthrough, steps, constants, screenshots
// ==========================================================

import shotProfile from "../../../assets/web-omtp/KnowCompany.png";
import shotDraft from "../../../assets/web-omtp/StrategyDraft.png";
import shotPlan from "../../../assets/web-omtp/Strategy Plan.png";
import shotMarket from "../../../assets/web-omtp/Mkt Intelligence.png";
import shotOps from "../../../assets/web-omtp/OpsProduct.png";
import shotExec from "../../../assets/web-omtp/BPExecution.png";
import shotFin from "../../../assets/web-omtp/FinStat.png";

// Purpose: Ordered simulation steps; short = label for the compact step list
export const STEPS = [
  { short: "Company Profile", title: "Company Profile", text: "Set up your virtual company, products and business objectives.",
    learn: ["Know your products and their lifecycle", "Understand the manufacturing process", "Check plant capacity and load"], shot: shotProfile },
  { short: "Strategy Draft", title: "Strategy Draft", text: "Explore strategy options and their expected outcomes.",
    learn: ["Compare strategies by cost, gain and duration", "Filter by group and search benefits", "Spot the enablers behind growth"], shot: shotDraft },
  { short: "Strategic Plan", title: "Strategic Plan", text: "Select and confirm the strategies you will invest in.",
    learn: ["Commit budget across chosen strategies", "See the effect window of each choice", "Save decisions for the period"], shot: shotPlan },
  { short: "Market Intelligence", title: "Market Intelligence", text: "Review market demand and key input information.",
    learn: ["Read likely product demand", "Check raw material and machine prices", "Plan with market data"], shot: shotMarket },
  { short: "Operations Plan", title: "Operations Plan", text: "Make key operational decisions: production, sales, materials and machinery.",
    learn: ["Set production and sales quantities", "Order materials for current/ next month", "Decide on additional Machinery / Plant capacity"], shot: shotOps },
  { short: "Plan Execution", title: "Business Plan Execution", text: "Run your plan and manage day-to-day operations.",
    learn: ["Compare plan with actual results", "Track yield and revenue", "Find gaps in production and sales"], shot: shotExec },
  { short: "Financial Outcome", title: "Financial Outcome", text: "Review revenue, cost, profit and overall performance.",
    learn: ["Read balance sheet ratios", "Analyse income and cash flow", "Link operations to financial results"], shot: shotFin },
];
