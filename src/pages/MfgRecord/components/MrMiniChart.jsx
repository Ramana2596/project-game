import React from "react";
import { colors } from "../../../ux/styles";
import { fmtQty } from "../utils/mrFormat";

// Plan, stocked and sold bars with a marker at the sales target
export function MrMiniChart({ card }) {
  const { planQty, stockQty, soldQty, salesTarget } = card;
  const bars = [["Plan", planQty, colors.accentBlue], ["Stocked", stockQty, colors.accentTeal], ["Sold", soldQty, colors.accentOrange]];
  const W = 260, L = 58, bw = W - L - 8;
  const max = Math.max(planQty || 0, stockQty || 0, soldQty || 0, salesTarget || 0, 1) * 1.08;
  const x = (v) => L + (bw * (v || 0)) / max;
  return (
    <svg viewBox={`0 0 ${W} 82`} width="100%" role="img"
      aria-label={`Plan ${fmtQty(planQty)}, stocked ${fmtQty(stockQty)}, sold ${fmtQty(soldQty)}, target ${fmtQty(salesTarget)}`}>
      {bars.map(([label, v, c], i) => (
        <g key={label}>
          <text x={L - 8} y={21 + i * 22} textAnchor="end" fontSize="11" fill={colors.body}>{label}</text>
          <rect x={L} y={9 + i * 22} width={Math.max(x(v) - L, 0)} height="16" rx="3" fill={c} />
          <text x={L + 6} y={21 + i * 22} fontSize="11" fontWeight="600" fill="#fff">{fmtQty(v)}</text>
        </g>
      ))}
      {salesTarget != null && (
        <g>
          <line x1={x(salesTarget)} x2={x(salesTarget)} y1="3" y2="74" stroke={colors.title} strokeDasharray="3 2" />
          <text x={x(salesTarget)} y="82" textAnchor="middle" fontSize="10" fill={colors.title}>Target</text>
        </g>
      )}
    </svg>
  );
}