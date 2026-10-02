import React from "react";
import { Box, Typography } from "@mui/material";
import { masterTypo, colors } from "../../../ux/styles";
import { fmtQty } from "../utils/mrFormat";

const Item = ({ label, value, strong }) => (
  <Box>
    <Typography sx={{ ...masterTypo.caption, color: colors.subtitle }}>{label}</Typography>
    <Typography sx={{ ...masterTypo.h6, color: strong ? colors.primary : colors.title }}>{fmtQty(value)}</Typography>
  </Box>
);

// Market demand + additional demand = total demand; then target and sold
export function MrDemand({ card }) {
  return (
    <Box sx={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(90px, 1fr))", gap: 1.5 }}>
      <Item label="Market demand" value={card.marketDemand} />
      <Item label="Addl demand" value={card.addlDemand} />
      <Item label="Total demand" value={card.totalDemand} />
      <Item label="Sales target" value={card.salesTarget} />
      <Item label="Sold" value={card.soldQty} strong />
      {card.returnQty != null && <Item label="Returns" value={card.returnQty} />}
    </Box>
  );
}