// ============================================================
// Component: pageConstants
// Module: MfgProcess
// Purpose: Manufacturing Process UI configuration
// AI Tags: manufacturing-process, routing, icons, colors, uxlab
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
// ------------------------------------------------------------
export const PROCESS_VISUALS = {
  "Cutting & Sizing": {
    icon: ContentCutOutlined,
    color: "#7B1FA2",
    softColor: "#F3E5F5",
  },

  "CNC Machining": {
    icon: PrecisionManufacturingOutlined,
    color: "#1565C0",
    softColor: "#E3F2FD",
  },

  Plating: {
    icon: ScienceOutlined,
    color: "#00897B",
    softColor: "#E0F2F1",
  },

  Assembly: {
    icon: BuildOutlined,
    color: "#EF6C00",
    softColor: "#FFF3E0",
  },

  Moulding: {
    icon: CategoryOutlined,
    color: "#6A1B9A",
    softColor: "#F3E5F5",
  },

  Painting: {
    icon: FormatPaintOutlined,
    color: "#C2185B",
    softColor: "#FCE4EC",
  },

  "R & D Lab Work": {
    icon: BiotechOutlined,
    color: "#2E7D32",
    softColor: "#E8F5E9",
  },

  default: {
    icon: SettingsOutlined,
    color: "#5E35B1",
    softColor: "#EDE7F6",
  },
};
