// Component: SrDemandCard
// Module: StrategyResults
// Purpose: compact summary of acquired demand
// Author/Version: OpsMgt UX Lab / v3.0
// AI Tags: demand, product, impact, overview, card

import React, { useMemo } from "react";
import { Box, Stack, Typography } from "@mui/material";
import TrendingUpOutlinedIcon from "@mui/icons-material/TrendingUpOutlined";
import Inventory2OutlinedIcon from "@mui/icons-material/Inventory2Outlined";
import { cardStyle, colors, masterTypo } from "../../../../ux/styles";
import { fmtNum, fmtPct, NIL } from "../../utils/srFormat";

export default function SrDemandCard({ demRows }) {
  const summary = useMemo(() => {
    const rows = Array.isArray(demRows)
      ? demRows
      : [];

    const products = new Set(
      rows
        .map((row) => row.product)
        .filter(Boolean)
    );

    const grouped = new Map();

    rows.forEach((row) => {
      const key = `${row.stratId || ""}|${row.product || ""}`;

      if (!grouped.has(key)) {
        grouped.set(key, row.demPct);
      }
    });

    const values = [...grouped.values()].filter(
      (value) =>
        value !== null &&
        value !== undefined &&
        !Number.isNaN(Number(value))
    );

    const avgPct = values.length
      ? values.reduce(
          (sum, value) => sum + Number(value),
          0
        ) / values.length
      : null;

    const additionalDemand = rows.reduce(
      (sum, row) =>
        row.addlDem === null ||
        row.addlDem === undefined ||
        Number.isNaN(Number(row.addlDem))
          ? sum
          : sum + Number(row.addlDem),
      0
    );

    return {
      productCount: products.size,
      avgPct,
      additionalDemand,
    };
  }, [demRows]);

  return (
    <Box
      sx={{
        ...cardStyle.primary,
        p: 1.75,
        borderLeft: `4px solid ${colors.accentBlue}`,
        minWidth: 0,
      }}
    >
      <Stack
        direction="row"
        spacing={1}
        alignItems="center"
      >
        <Box
          sx={{
            width: 32,
            height: 32,
            borderRadius: "50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: `${colors.accentBlue}1A`,
            color: colors.accentBlue,
            flexShrink: 0,
          }}
        >
          <TrendingUpOutlinedIcon sx={{ fontSize: 18 }} />
        </Box>

        <Typography
          sx={{
            ...masterTypo.h5,
            color: colors.title,
          }}
        >
          Demand
        </Typography>
      </Stack>

      <Box
        sx={{
          mt: 1.25,
          pt: 1.1,
          borderTop: `1px solid ${colors.border}`,
        }}
      >
        <Stack
          direction="row"
          alignItems="center"
          spacing={0.75}
        >
          <Inventory2OutlinedIcon
            sx={{
              fontSize: 16,
              color: colors.accentBlue,
            }}
          />

          <Typography
            sx={{
              ...masterTypo.caption,
              color: colors.subtitle,
            }}
          >
            Products
          </Typography>

          <Typography
            sx={{
              ...masterTypo.body2,
              color: colors.title,
              fontWeight: 700,
              ml: "auto",
            }}
          >
            {fmtNum(summary.productCount)}
          </Typography>
        </Stack>

        <Stack
          direction="row"
          alignItems="center"
          spacing={0.75}
          sx={{ mt: 0.9 }}
        >
          <TrendingUpOutlinedIcon
            sx={{
              fontSize: 16,
              color: colors.accentBlue,
            }}
          />

          <Typography
            sx={{
              ...masterTypo.caption,
              color: colors.subtitle,
            }}
          >
            Impact
          </Typography>

          <Typography
            sx={{
              ...masterTypo.body2,
              color: colors.title,
              fontWeight: 700,
              ml: "auto",
            }}
          >
            {summary.avgPct === null
              ? NIL
              : fmtPct(summary.avgPct)}
          </Typography>
        </Stack>

        <Typography
          sx={{
            ...masterTypo.caption,
            color: colors.subtitle,
            mt: 0.9,
          }}
        >
          +{fmtNum(summary.additionalDemand)} units
        </Typography>
      </Box>
    </Box>
  );
}