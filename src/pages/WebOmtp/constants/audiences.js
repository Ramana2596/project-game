// ==========================================================
// Component Name : audiences
// Module         : WebOmtp (Landing)
// Purpose        : Four ways to use OMTP - Learn, Teach, Hone, Analyse - each with a short step flow
// Author/Version : UXLab V1.3 / v1.2
// AI Tags        : landing, audiences, services, flow, constants
// ==========================================================

// Purpose: Section heading under which the four audience cards sit
export const AUDIENCES_HEAD = {
  title: "One platform OMTP, four ways to use it",
  text: "Learn, Teach, Hone or Analyse.",
};

// Purpose: Audience cards; icon = key mapped in Audiences.jsx; action = demo | start | contact
export const AUDIENCES = [
  {
    key: "students", icon: "school", verb: "Learn", label: "Students",
    text: "An interactive learning platform that brings Operations Management concepts through practical business situations and experiential simulation.",
    steps: ["Try the demo", "Run your company", "See your results"],
    cta: "Start Free", action: "start",
  },
  {
    key: "academia", icon: "groups", verb: "Teach", label: "Academia",
    text: "A teaching aid that enriches academic instruction through interactive learning, business scenarios & simulation and experiential exercises.",
    steps: ["Show the demo", "Teams run sessions", "Assess and evaluate"],
    cta: "Try the Demo", action: "demo",
  },
  {
    key: "professionals", icon: "work", verb: "Hone", label: "Professionals",
    text: "A simulational framework for continuous learning, sharpening managerial skills, analytical thinking and decision-making capabilities.",
    steps: ["Start an analytical session", "Make decisions", "Review and repeat"],
    cta: "Get Started", action: "start",
  },
  {
    key: "industry", icon: "analytics", verb: "Analyse", label: "Industry",
    text: "A customised business simulation and analytics environment to model operations, evaluate alternative scenarios and explore potential business outcomes.",
    steps: ["Share your business", "We build your simulation", "Compare outcomes"],
    cta: "Talk to Us", action: "contact",
  },
];