// ============================================================
// File: reportIconRegistry.js
// Module: Application Constants
// Purpose: Central icon registry for report UI components
// AI Tags: report-writer, report-icons, uxlab
// ============================================================

import Inventory2OutlinedIcon from "@mui/icons-material/Inventory2Outlined";
import AccountTreeOutlinedIcon from "@mui/icons-material/AccountTreeOutlined";
import SchemaOutlinedIcon from "@mui/icons-material/SchemaOutlined";
import LocalShippingOutlinedIcon from "@mui/icons-material/LocalShippingOutlined";
import WarehouseOutlinedIcon from "@mui/icons-material/WarehouseOutlined";
import SummarizeOutlinedIcon from "@mui/icons-material/SummarizeOutlined";
import SavingsOutlinedIcon from "@mui/icons-material/SavingsOutlined";
import CampaignOutlinedIcon from "@mui/icons-material/CampaignOutlined";
import SellOutlinedIcon from "@mui/icons-material/SellOutlined";
import AssessmentOutlinedIcon from "@mui/icons-material/AssessmentOutlined";
import StorefrontOutlinedIcon from "@mui/icons-material/StorefrontOutlined";
import PrecisionManufacturingOutlinedIcon from "@mui/icons-material/PrecisionManufacturingOutlined";
import AccountBalanceOutlinedIcon from "@mui/icons-material/AccountBalanceOutlined";
import ReceiptLongOutlinedIcon from "@mui/icons-material/ReceiptLongOutlined";
import PaymentsOutlinedIcon from "@mui/icons-material/PaymentsOutlined";
import InsightsOutlinedIcon from "@mui/icons-material/InsightsOutlined";
import QueryStatsOutlinedIcon from "@mui/icons-material/QueryStatsOutlined";
import BarChartOutlinedIcon from "@mui/icons-material/BarChartOutlined";

export const REPORT_ICON_REGISTRY = {

  // Strategy / Planning
  "UI 21 010": SummarizeOutlinedIcon,
  "UI 21 020": AssessmentOutlinedIcon,
  "UI 21 040": AccountBalanceOutlinedIcon,
  "UI 21 050": CampaignOutlinedIcon,
  "UI 21 060": SellOutlinedIcon,
  "UI 21 070": SavingsOutlinedIcon,

  // Market / Operations
  "UI 21 090": InsightsOutlinedIcon,
  "UI 21 100": PrecisionManufacturingOutlinedIcon,

  // Financial
  "UI 21 110": AccountBalanceOutlinedIcon,
  "UI 21 120": ReceiptLongOutlinedIcon,
  "UI 21 130": PaymentsOutlinedIcon,

  // Stock / Records
  "UI 21 140": LocalShippingOutlinedIcon,
  "UI 21 150": Inventory2OutlinedIcon,
  "UI 21 170": StorefrontOutlinedIcon,
  "UI 21 180": PrecisionManufacturingOutlinedIcon,

  // Performance / Results
  "UI 21 240": BarChartOutlinedIcon,
  "UI 21 250": QueryStatsOutlinedIcon,
  "UI 21 270": AssessmentOutlinedIcon,
  "UI 21 281": AccountBalanceOutlinedIcon,
  "UI 21 282": AssessmentOutlinedIcon,

  // Company Profile
  "UI 22 020": Inventory2OutlinedIcon,
  "UI 22 020 UX": Inventory2OutlinedIcon,
  "UI 22 030": SchemaOutlinedIcon,
  "UI 22 040": AccountTreeOutlinedIcon,
  "UI 22 040 UX": AccountTreeOutlinedIcon,
  "UI 22 060": WarehouseOutlinedIcon,
};

export default REPORT_ICON_REGISTRY;