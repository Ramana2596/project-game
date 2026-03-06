// chartConstants.js
// ✅ Structured constants for chart configuration

export const chartConstants = {
  // ✅ Key Details to focus on in classroom learning
  chartDetails: [
    "Equity",
    "Retained Earning",   // matches DB exactly
    "Secured Loan",
    "Total Inventory",    // matches DB exactly
  ],

  // ✅ Default chart type
  defaultChartType: "bar",

  // ✅ Available chart types for selection
  chartTypes: ["line", "bar"],

  // ✅ Colors for chart series (optional, structured)
  detailColors: {
    Equity: "#ff7300",
    "Retained Earning": "#8884d8",
    "Secured Loan": "#82ca9d",
    "Total Inventory": "#ffc658",
  },

  // ✅ Layout option: how many charts per row
  chartsPerRow: 12, // change to 3 or 4 for more compact layout
};
