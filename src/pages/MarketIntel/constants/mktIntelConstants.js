
/**
 * Component Name: MarketIntelConstants
 * Module: Market Intelligence
 * Purpose: Centralized constants for market input categories, icons, colors, and table mappings.
 * AI Tags: market-constants, categories, reference-data
 */

import Inventory2Icon from '@mui/icons-material/Inventory2';
import WidgetsIcon from '@mui/icons-material/Widgets';
import ExtensionIcon from '@mui/icons-material/Extension';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import PrecisionManufacturingIcon from '@mui/icons-material/PrecisionManufacturing';

export const MARKET_CATEGORIES = [
  { id: "MI 001", code: "FG", description: "Finished Goods", icon: <LocalShippingIcon fontSize="small" /> },
  { id: "MI 002", code: "RM", description: "Raw Material", icon: <Inventory2Icon fontSize="small" /> },
  { id: "MI 003", code: "CA", description: "Capital Asset", icon: <PrecisionManufacturingIcon fontSize="small" /> },
  { id: "MI 004", code: "PC", description: "Production Consumable", icon: <ExtensionIcon fontSize="small" /> },
  { id: "MI 005", code: "PP", description: "Purchase Part", icon: <WidgetsIcon fontSize="small" /> },
];

export const PROGRESS_STAGE = "4_Market_Factor";
export const ACTUAL_DEMAND_CODE = "QM 02";

export const TABLE_COLUMNS = [
  { id: "Period", label: "Period" },
  { id: "Category", label: "Category" },
  { id: "Part_Description", label: "Part Description" },
  { id: "Market_Info", label: "Market Info" },
  { id: "UOM", label: "UOM" },
  { id: "Quantity", label: "Quantity", numeric: true },
  { id: "Addl_Demand", label: "Addl Demand", numeric: true },
  { id: "Total_Demand", label: "Total Quantity", numeric: true },
  { id: "Unit_Price", label: "Unit Price", numeric: true },
  { id: "Currency", label: "Currency" },
  { id: "Price_Info", label: "Price Info" },
];
