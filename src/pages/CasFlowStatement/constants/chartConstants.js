// chartConstants.js
// Structured constants for Cash Flow Statement charts

export const chartConstants = {
  // Key Details to focus on in classroom learning
  chartDetails: [
    "Net Cash Flow from Operation",
    "Net Cash Inflow from Investing Activities",
    "Net Cash Inflow from Financing Activities",
    "Cash Balance at the End of the period",

  ],

  // Default chart type
  defaultChartType: "bar",

  // Available chart types for selection
  chartTypes: ["line", "bar"],

  // Colors for chart series
  detailColors: {
    "Net Cash Flow from Operation": "#8884d8",
    "Net Cash Inflow from Investing Activities": "#82ca9d",
    "Net Cash Inflow from Financing Activities": "#ffc658",
    "Cash Balance at the End of the period": "#ff7300",
  },

  // Layout option: how many charts per row
  chartsPerRow: 6,
};
