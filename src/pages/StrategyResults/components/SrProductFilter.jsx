// Component: SrProductFilter
// Module: StrategyResults
// Purpose: render the compact product filter beside result navigation.
// Author/Version: OpsMgt UX Lab / v1.0
// AI Tags: strategy-results, product-filter, toolbar, navigation

import React from "react";
import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import { colors } from "../../../ux/styles";
import { SR_PRODUCT_ALL } from "../constants/srConfig";

export default function SrProductFilter({
  product,
  products,
  onProductChange,
}) {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-end",
        flexShrink: 0,
      }}
    >
      <FormControl
        size="small"
        sx={{
          minWidth: 180,
        }}
      >
        <InputLabel id="sr-product-filter-label">
          Product
        </InputLabel>

        <Select
          labelId="sr-product-filter-label"
          value={product || SR_PRODUCT_ALL}
          label="Product"
          onChange={(event) =>
            onProductChange(event.target.value)
          }
          sx={{
            backgroundColor: colors.card,
            borderRadius: 1.5,
            "& .MuiOutlinedInput-notchedOutline": {
              borderColor: colors.border,
            },
            "&:hover .MuiOutlinedInput-notchedOutline": {
              borderColor: colors.primary,
            },
            "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
              borderColor: colors.primary,
            },
          }}
        >
          <MenuItem value={SR_PRODUCT_ALL}>
            All Products
          </MenuItem>

          {products.map((item) => (
            <MenuItem key={item} value={item}>
              {item}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
}