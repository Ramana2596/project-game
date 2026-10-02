import React from "react";
import { Box, Button } from "@mui/material";
import { buttonStyle } from "../../../ux/styles";
import { MR_FILTERS } from "../constants/mrConstants";

export function MrFilter({ filter, setFilter, products }) {
  const opts = [...MR_FILTERS, ...products.map((p) => ({ value: p, label: p }))];
  return (
    <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
      {opts.map((o) => (
        <Button key={o.value} aria-pressed={filter === o.value}
          sx={{ ...buttonStyle.secondary, ...buttonStyle.compact,
            ...(filter === o.value ? buttonStyle.tabActive : {}) }}
          onClick={() => setFilter(o.value)}>
          {o.label}
        </Button>
      ))}
    </Box>
  );
}