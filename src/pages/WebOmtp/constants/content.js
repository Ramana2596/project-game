// ==========================================================
// Component Name : content
// Module         : WebOmtp (Landing)
// Purpose        : Hero, why-choose, journey, features, industry, pricing, about and footer copy
// Author/Version : UXLab V1.3 / v1.0
// AI Tags        : landing, content, copy, pricing, constants
// ==========================================================

// Purpose: Hero copy (titleLines = one headline line per entry; accent renders in the primary colour)
export const HERO = {
  eyebrow: "An integrated learning, training, simulation and business analytics platform",
  titleLines: [
    { text: "Learn Operations." },
    { text: "Make Decisions." },
    { text: "See ", accent: "Business Outcome." },
  ],
  
  text: "Simulate manufacturing business, apply strategy and operations knowledge, and see the impact of your decisions in a realistic, risk-free environment.",
  checks: [
    "Learn through real-life business scenarios",
    "Self-paced and continue where you left off", 
    "Develop operational and managerial skills",
  ],
};

// Purpose: "Why Choose OMTP?" strip shown under the Hero (copy from the approved Benefits screens)

export const WHY_CHOOSE = {
  title: "Why Choose OMTP?",
  items: [
    {
      id: "decisions",
      title: "Stronger Decision-Making",
      text: "Make business decisions and understand their operational and financial impact."
    },
    {
      id: "operations",
      title: "Practical Operations Skills",
      text: "Apply concepts in production, capacity, materials and resource management."
    },
    {
      id: "acumen",
      title: "Build Business Acumen",
      text: "Connect operations, strategy and finance to understand overall business performance."
    },
    {
      id: "learners",
      title: "Experiential Learning",
      text: "Learn by doing through interactive exercises and realistic business simulations."
    },
  ],
};

// Purpose: Learn - Decide - See Results flow
export const JOURNEY = [
  { icon: "learn", title: "Learn", text: "Understand the business and its market." },
  { icon: "decide", title: "Decide", text: "Make strategy and operations choices." },
  { icon: "results", title: "See Results", text: "Review performance and learn from outcomes." },
];

// Purpose: Key features, 10 cards in 6 themes (icon = key mapped in Features.jsx; theme = grouping label, in display order)
export const FEATURE_THEMES = [
  "Content",
  "Business cycle & scenarios",
  "Systemic flow",
  "Learning ease",
  "Getting Started",
  "Ease of use",
];

export const FEATURES = [
  // Content: what you run, decide and how it is assessed
  { theme: FEATURE_THEMES[0], icon: "sim", title: "Real-Life Business Simulation", text: "Run a company in a realistic business environment, not a textbook example." },
  { theme: FEATURE_THEMES[0], icon: "decisions", title: "Strategic & Operational Decisions", text: "Make the decisions and understand their impact on company performance." },
  { theme: FEATURE_THEMES[0], icon: "assess", title: "Business Performance Assessment", text: "A structured assessment of how well your business performed." },
  { theme: FEATURE_THEMES[0], icon: "rank", title: "User Performance Evaluation", text: "See how each learner or team performed and compare results." },
  // Business cycle & scenarios: period after period, new situations
  { theme: FEATURE_THEMES[1], icon: "periods", title: "Multiple Periods, Varied Scenarios", text: "Simulate period after period, each with a different business situation." },
  // Getting Started: a short orienting aid
  { theme: FEATURE_THEMES[2], icon: "demo", title: "Quick Demo", text: "A short System walkthrough to show you what you learn and decide before you begin." },
  // Learning ease: learn at your own pace
  { theme: FEATURE_THEMES[3], icon: "history", title: "Self-Paced Learning", text: "Start, pause to learn and continue where you left off across many sessions." },
  { theme: FEATURE_THEMES[3], icon: "history", title: "In-App Guidance and Feedback", text: "Objectives, hints and FAQs guide every step. Share feedback from any page." },
  // Ease of use: the screens themselves
  { theme: FEATURE_THEMES[4], icon: "touch", title: "Easy Click-Through Screens", text: "Simple, guided screens for everyone, from beginners to professionals." },

  // Systemic flow: the end-to-end operations flow (inactive)
  // { theme: FEATURE_THEMES[5], icon: "flow", title: "Hands-On System Flow", text: "Walk the full operations flow yourself, from company setup to financial results." },
];

// Purpose: Industry story - customer-built simulation
export const INDUSTRY = {
  title: "Explore Your Business Through Custom Simulation",
  text: "A customised business simulation & analytics environment to model operations, evaluate alternative scenarios and explore potential business outcomes.",
  flow: [
    { title: "Share your business", text: "Products, processes, capacity and cost structure." },
    { title: "We build your simulation", text: "Your scenario on the OMTP engine and screens." },
    { title: "Decide and compare", text: "Teams run strategies and compare financial outcomes." },
  ],
  cta: "Talk to Us",
};

// Purpose: Pricing plans; action = start | contact
export const PLANS = [
  { name: "Students", tag: "Best Reach", desc: "Perfect for university and early learning use.", price: "Free", unit: "to start", cta: "Start Free", action: "start", highlight: true,
    points: ["Full simulation experience", "Practical operations learning", "No prior experience required"] },
  { name: "Professionals", tag: "Best Value", desc: "Affordable practical skill development.", price: "$10", unit: "per Learn Capsule", cta: "Get Started", action: "start", highlight: false,
    points: ["Complete simulation journey", "Real-world business practice", "Career-oriented learning"] },
  { name: "Academia", tag: "For Classrooms", desc: "Teach with teams, assessment and progress views.", price: "Let's talk", unit: "", cta: "Contact Us", action: "contact", highlight: false,
    points: ["Team and batch assessment", "Guided learning topics", "Support for your course"] },
  { name: "Industry", tag: "Custom", desc: "A simulation built around your business.", price: "Let's talk", unit: "", cta: "Contact Us", action: "contact", highlight: false,
    points: ["Customer-built scenarios", "Financial outcome analytics", "Team training and evaluation"] },
];

// Purpose: About Us
export const ABOUT = {
  title: "About OMTP",
  text: "A team of operations management professionals and industry practitioners, some currently teaching at universities across Asia.",
  items: [
    { title: "Our Vision", text: "To empower individuals and organisations with knowledge and insights to achieve operational excellence through experiential learning and business simulation." },
    { title: "Our Mission", text: "To enable practical learning, skill development and informed decision-making through interactive education, experiential simulation and business analytics." },
    { title: "Our Team", text: "Educators and industry veterans with deep manufacturing and service operations experience." },
    { title: "Our Commitment", text: "A practical, engaging experience with professional assessment, for beginners and experts alike." },
  ],
};

// Purpose: Final call to action and footer
export const FINAL_CTA = { title: "Begin your learning journey now", text: "A hands-on way to understand Strategy, Operations Decisions and Business Outcome." };
export const FOOTER = { copy: "© 2026 Operations Management Training Platform", contact: "mailto:contact@omtp.example" };