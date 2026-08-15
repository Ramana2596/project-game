// ============================================================
// Component: CoWorkspace
// Module: Company Profile
// Purpose: Render the active Company Profile domain
// AI Tags: company-profile, workspace, product, process, bom
// UXLab V1.0 — Standardized to Company Profile Reference
// ============================================================

import React from "react";
import {
  Box,
  Typography,
} from "@mui/material";

import ProductCard from "../cards/ProductCard";
import CoQuickInsight from "./CoQuickInsight";
import MfgProcess from "../../MfgProcess/MfgProcess";

import {
  colors,
  layoutStyle,
  masterTypo,
} from "../../../ux/styles";

// ------------------------------------------------------------
// Company Profile Workspace
// ------------------------------------------------------------
export default function CoWorkspace({
  activeTab,
  products = [],
}) {
  // ----------------------------------------------------------
  // Render Product workspace
  // Reference shows no section heading above the product cards —
  // the tab bar alone signals the active domain.
  // ----------------------------------------------------------
  if (activeTab === "PRODUCT") {
    return (
      <Box sx={layoutStyle.section}>
        {products.length === 0 ? (
          <Typography
            sx={{
              ...masterTypo.body1,
              color: colors.muted,
            }}
          >
            No product information available.
          </Typography>
        ) : (
          <Box
            sx={{
              ...layoutStyle.grid,
              display: "grid",
              gridTemplateColumns: {
                xs: "1fr",
                sm: "repeat(2, 1fr)",
                lg: "repeat(3, 1fr)",
              },
              gap: 2,
            }}
          >
            {products.map((product, index) => (
              <ProductCard
                key={product?.Part_No ?? index}
                product={product}
                index={index}
              />
            ))}
          </Box>
        )}

        {/* Quick Insight banner — below product cards, per reference */}
        {products.length > 0 && (
          <Box sx={{ mt: 2 }}>
            <CoQuickInsight products={products} />
          </Box>
        )}
      </Box>
    );
  }

  // ----------------------------------------------------------
  // Render Manufacturing Process workspace
  // ----------------------------------------------------------
  if (activeTab === "PROCESS") {
    return <MfgProcess />;
  }

  // ----------------------------------------------------------
  // Company Profile domain labels
  // ----------------------------------------------------------
  const domainLabels = {
    BOM: "Bill of Materials",
    RAW_MATERIAL: "Raw Material",
    PRODUCT_STOCK: "Product Stock",
  };

  // ----------------------------------------------------------
  // Render future Company Profile domains
  // ----------------------------------------------------------
  return (
    <Box sx={layoutStyle.section}>
      {/* Domain Title */}
      <Typography
        sx={{
          ...masterTypo.h3,
          mb: 1,
          color: colors.title,
        }}
      >
        {domainLabels[activeTab] ?? "Company Profile"}
      </Typography>

      {/* Domain Status */}
      <Typography
        sx={{
          ...masterTypo.body1,
          color: colors.muted,
        }}
      >
        This Company Profile section will be implemented
        when its data source is available.
      </Typography>
    </Box>
  );
}