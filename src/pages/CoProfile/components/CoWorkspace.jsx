// ============================================================
// Component: CoWorkspace
// Module: Company Profile
// Purpose: Render the active Company Profile domain
// AI Tags: company-profile, workspace, product, process, bom
// ============================================================

import React from "react";
import {
  Box,
  Typography,
} from "@mui/material";

import ProductCard from "../cards/ProductCard";
import MfgProcess from "../../MfgProcess/MfgProcess";

import {
  semanticTypo,
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
  // ----------------------------------------------------------
  if (activeTab === "PRODUCT") {
    return (
      <Box>
        {/* Workspace Title */}
        <Typography
          sx={{
            ...semanticTypo.pageH3,
            mb: 1.5,
          }}
        >
          Products
        </Typography>

        {/* Product Cards */}
        {products.length === 0 ? (
          <Typography
            sx={{
              ...semanticTypo.body,
              color: "text.secondary",
            }}
          >
            No product information available.
          </Typography>
        ) : (
          <Box
            sx={{
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
    <Box>
      {/* Domain Title */}
      <Typography
        sx={{
          ...semanticTypo.pageH3,
          mb: 1,
        }}
      >
        {domainLabels[activeTab] ?? "Company Profile"}
      </Typography>

      {/* Domain Status */}
      <Typography
        sx={{
          ...semanticTypo.body,
          color: "text.secondary",
        }}
      >
        This Company Profile section will be implemented
        when its data source is available.
      </Typography>
    </Box>
  );
}