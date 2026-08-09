// ============================================================
// Company Profile Constants
// Module: CoProfile
// Purpose: Company Profile UI configuration
// AI Tags: company-profile, navigation, lifecycle, product
// ============================================================

import {
  Inventory2Outlined,
  SettingsOutlined,
  DescriptionOutlined,
  LayersOutlined,
  InventoryOutlined,
} from "@mui/icons-material";

// ------------------------------------------------------------
// Company Profile Navigation
// ------------------------------------------------------------
export const PROFILE_TABS = [
  {
    key: "PRODUCT",
    label: "Products",
    icon: Inventory2Outlined,
  },
  {
    key: "PROCESS",
    label: "Processes",
    icon: SettingsOutlined,
  },
  {
    key: "BOM",
    label: "BOM",
    icon: DescriptionOutlined,
  },
  {
    key: "RAW_MATERIAL",
    label: "Raw Material Stock",
    icon: LayersOutlined,
  },
  {
    key: "PRODUCT_STOCK",
    label: "Product Stock",
    icon: InventoryOutlined,
  },
];

// ------------------------------------------------------------
// Product Life Cycle
// Reference: Company Profile UX design
// ------------------------------------------------------------
export const PRODUCT_LIFECYCLE = {
  PL_02: {
    label: "Growth",
    color: "#159447",
    softColor: "#E8F7EE",
  },

  PL_03: {
    label: "Maturity",
    color: "#1769E0",
    softColor: "#EAF1FF",
  },

  PL_04: {
    label: "Phasing Out",
    color: "#E96B00",
    softColor: "#FFF1E5",
  },
};

// ------------------------------------------------------------
// Product Fields
// ------------------------------------------------------------
export const PRODUCT_FIELDS = [
  {
    key: "UOM",
    label: "UOM",
  },
  {
    key: "Launch_Date",
    label: "Date of Launch",
  },
  {
    key: "PLM_Stage",
    label: "Product Life Cycle",
  },
  {
    key: "Profit_Percent",
    label: "Profit Margin",
  },
  {
    key: "Currency",
    label: "Currency",
  },
  {
    key: "Unit_Price",
    label: "Est. Price",
  },
  {
    key: "Pricing_Date",
    label: "Pricing Date",
  },
];