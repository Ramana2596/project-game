import React from "react";
import { Box, Typography, Chip } from "@mui/material";
import { cardStyle, masterTypo, colors } from "../../../ux/styles";
import { MR_LEVELS } from "../constants/mrConstants";
import { fmtMoney, fmtQty } from "../utils/mrFormat";
import { MrBar } from "./MrBar";

const badgeSx = { height: 20, "& .MuiChip-label": { px: 1, fontSize: 11 } };

// Group heading: slim tinted strip with a coloured edge, group name and its own status badge
const Group = ({ title, color, status, children }) => (
  <Box sx={{ borderTop: `1px solid ${colors.divider}` }}>
    <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", px: 2, py: 0.25,
      minHeight: 26, background: `${color}0D`, borderLeft: `3px solid ${color}` }}>
      <Typography sx={{ ...masterTypo.caption, fontWeight: 700, color, lineHeight: 1.2 }}>{title}</Typography>
      {status && <Chip size="small" label={status.label}
        sx={{ ...cardStyle.badge(colors[status.color]), ...badgeSx }} />}
    </Box>
    <Box sx={{ px: 2, py: 0.5 }}>{children}</Box>
  </Box>
);

// One compact card per product: production bars over sales bars, one shared scale. Full figures stay in the tables.
export function MrCard({ card: c }) {
  const pst = MR_LEVELS.find((s) => s.value === c.prodLevel);
  const sst = MR_LEVELS.find((s) => s.value === c.salesLevel);
  const max = Math.max(c.planQty || 0, c.orderQty || 0, c.stockQty || 0,
    c.totalDemand || 0, c.salesTarget || 0, c.actualDemand || 0, c.soldQty || 0, 1);
  const P = colors.accentBlue, S = colors.accentOrange;
  const hasShare = c.sharePct !== null && c.sharePct !== undefined && Number.isFinite(Number(c.sharePct));
  return (
    <Box sx={cardStyle.primary}>
      {/* Heading: product and its share of the month's sales value on the left, month and unit on the right */}
      <Box sx={{ px: 2, py: 0.75, display: "flex", justifyContent: "space-between", alignItems: "center", gap: 1 }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1, minWidth: 0 }}>
          <Typography noWrap sx={{ ...masterTypo.h6, color: colors.title, minWidth: 0 }}>
            {c.product}
          </Typography>
          {hasShare && (
            <Chip size="small" label={`${Math.round(c.sharePct)}% share`}
              sx={{ ...cardStyle.badge(colors.primary), ...badgeSx, flexShrink: 0 }} />
          )}
        </Box>
        <Typography noWrap sx={{ ...masterTypo.caption, color: colors.subtitle, flexShrink: 0 }}>
          {c.period} · {c.uom}
        </Typography>
      </Box>

      <Group title="Production" color={P} status={pst}>
        <MrBar label="Plan"     value={c.planQty}  max={max} color={`${P}66`} />
        <MrBar label="Launched" value={c.orderQty} max={max} color={`${P}B3`} />
        <MrBar label="OK"       value={c.stockQty} max={max} color={P} strong />
      </Group>

      <Group title="Sales" color={S} status={sst}>
        <MrBar label="Demand"        value={c.totalDemand}  max={max} color={`${S}66`} />
        <MrBar label="Plan"          value={c.salesTarget}  max={max} color={`${S}99`} />
        <MrBar label="Actual demand" value={c.actualDemand} max={max} color={`${S}CC`} />
        <MrBar label="Sold"          value={c.soldQty}      max={max} color={S} strong />
      </Group>

      <Box sx={{ ...cardStyle.footer, display: "flex", justifyContent: "space-between", alignItems: "center", py: 0.5, px: 2 }}>
        <Typography sx={{ ...masterTypo.caption, color: c.unsoldQty > 0 ? colors.warning : colors.subtitle }}>
          Unsold stock {fmtQty(c.unsoldQty)}
        </Typography>
        <Typography sx={{ ...masterTypo.h6, color: colors.title }}>
          {fmtMoney(c.salesValue, c.currency)}
        </Typography>
      </Box>
    </Box>
  );
}