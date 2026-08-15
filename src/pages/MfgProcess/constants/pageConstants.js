// ============================================================
// Component: pageConstants
// Module: MfgProcess
// Purpose: Manufacturing Process UI configuration
// AI Tags: manufacturing-process, routing, icons, colors, uxlab
// UXLab V1.0 — Standardized (aligned with ProductCard visual pattern)
// ============================================================

import {
  ContentCutOutlined,
  PrecisionManufacturingOutlined,
  ScienceOutlined,
  BuildOutlined,
  FormatPaintOutlined,
  BiotechOutlined,
  CategoryOutlined,
  SettingsOutlined,
} from "@mui/icons-material";

import { colors } from "../../../ux/styles";

// ------------------------------------------------------------
// Process Display Fields
// ------------------------------------------------------------
export const MFG_PROCESS_FIELDS = [
  {
    key: "Part_No",
    label: "Product",
  },
  {
    key: "Part_Description",
    label: "Product Description",
  },
  {
    key: "Mfg_Seq_No",
    label: "Operation",
  },
  {
    key: "Work_Centre_Description",
    label: "Work Centre",
  },
  {
    key: "Facility_Description",
    label: "Facility",
  },
  {
    key: "Batch_Qty",
    label: "Batch Quantity",
  },
  {
    key: "SetUp_Time",
    label: "Set-up Time",
  },
  {
    key: "Std_Time",
    label: "Standard Time",
  },
  {
    key: "UOM",
    label: "Unit of Time",
  },
];

// ------------------------------------------------------------
// Process Page Labels
// ------------------------------------------------------------
export const MFG_PROCESS_LABELS = {
  title: "Manufacturing Process",
  subtitle: "Manufacturing process flow and operating standards",
  operation: "Operation",
  facility: "Facility",
  batchQuantity: "Batch",
  setupTime: "Setup",
  standardTime: "Std Time",
};

// ------------------------------------------------------------
// Manufacturing Process Visual Identity
// Purpose: Assign meaningful icon and color to each process
//
// Token note (UXLab V1.0):
// softColor is always derived from the base color via the
// standard tint suffix (`${color}1A`) — same convention as
// cardStyle.badge / statIconCircle / bannerIconCircle — so
// every soft tint stays mathematically tied to its base color.
//
// UXLab V1.0 has no dedicated multi-hue "process palette".
// Only two entries below have no token match (Moulding,
// Painting) and are flagged for the V1.0 backlog
// (processPalette). Cutting & Sizing and Plating match
// existing brand/accent tokens exactly and now reference them
// directly instead of duplicating the hex.
// ------------------------------------------------------------
export const PROCESS_VISUALS = {
  "Cutting & Sizing": {
    icon: ContentCutOutlined,
    color: colors.primary, // matches brand.primary — no duplicate hex needed
    softColor: `${colors.primary}1A`,
  },

  "CNC Machining": {
    icon: PrecisionManufacturingOutlined,
    color: colors.info,
    softColor: `${colors.info}1A`,
  },

  Plating: {
    icon: ScienceOutlined,
    color: colors.accentTeal, // matches accent.teal — no duplicate hex needed
    softColor: `${colors.accentTeal}1A`,
  },

  Assembly: {
    icon: BuildOutlined,
    color: colors.warning,
    softColor: `${colors.warning}1A`,
  },

  Moulding: {
    icon: CategoryOutlined,
    color: "#6A1B9A", // no UXLab token — backlog: processPalette
    softColor: "#6A1B9A1A",
  },

  Painting: {
    icon: FormatPaintOutlined,
    color: "#C2185B", // no UXLab token — backlog: processPalette
    softColor: "#C2185B1A",
  },

  "R & D Lab Work": {
    icon: BiotechOutlined,
    color: colors.success,
    softColor: `${colors.success}1A`,
  },

  default: {
    icon: SettingsOutlined,
    color: colors.primary,
    softColor: colors.primarySoft,
  },
};