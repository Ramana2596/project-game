// src/pages/TeamPlan/constants/categoryIcon.js
// Category icons and labels for operations inputs

export const CATEGORY_ICON = {
  "OI 001": { label: "Products", icon: "inventory", tooltip: "Finished Goods" },
  "OI 002": { label: "Materials", icon: "layers", tooltip: "Raw Materials" },
  "OI 003": { label: "Machinery", icon: "precision_manufacturing", tooltip: "Capital Assets" },
};

// Order of tabs
export const CATEGORY_ORDER = Object.keys(CATEGORY_ICON); // ['OI 001', 'OI 002', 'OI 003']