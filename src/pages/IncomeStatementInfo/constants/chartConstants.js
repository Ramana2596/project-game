// chartConstants.js
// Structured constants for Income Statement charts

export const chartConstants = {
  // Key Details to focus on in classroom learning
  chartDetails: [
    "Sales Revenue",
    "Cost of Goods Sold",
    "Gross_Margin",
    "Operating Profit",
    "Profit Before Tax",
  ],

  // Default chart type
  defaultChartType: "bar",

  // Available chart types for selection
  chartTypes: ["line", "bar"],

  // Colors for chart series (optional, structured)
  detailColors: {
    "Sales Revenue": "#8884d8",
    "Cost of Goods Sold": "#82ca9d",
    "Gross_Margin": "#ffc658",
    "Operating Profit": "#ff7300",
    "Profit Before Tax": "#00c49f",
  },

  // Layout option: how many charts per row
  chartsPerRow: 6, // change to 3 or 4 for more compact layout
};