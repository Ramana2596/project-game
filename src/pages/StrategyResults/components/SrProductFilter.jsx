// Component: SrProductFilter
// Module: StrategyResults
// Purpose: compact product filter for result analysis
// Author/Version: OpsMgt UX Lab / v2.0
// AI Tags: strategy, results, product, filter

import React from "react";
import { Box, Button, MenuItem, TextField } from "@mui/material";
import { buttonStyle, colors } from "../../../ux/styles";

export default function SrProductFilter({
  setNo,
  product,
  products,
  onProductChange,
}) {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 1.5,
        mb: 2,
        flexWrap: "wrap",
      }}
    >
      <Button
        disableRipple
        sx={{
          ...buttonStyle.secondary,
          color: colors.primary,
          borderColor: colors.border,
          minHeight: 36,
          px: 1.75,
          cursor: "default",
          "&:hover": {
            background: colors.card,
            borderColor: colors.border,
          },
        }}
      >
        Strategy Set {setNo ?? "—"}
      </Button>

      <TextField
        select
        size="small"
        label="Product"
        value={product}
        onChange={(event) => onProductChange(event.target.value)}
        sx={{
          minWidth: 190,
          "& .MuiOutlinedInput-root": {
            background: colors.card,
          },
        }}
      >
        <MenuItem value="ALL">All Products</MenuItem>

        {products.map((item) => (
          <MenuItem key={item} value={item}>
            {item}
          </MenuItem>
        ))}
      </TextField>
    </Box>
  );
}