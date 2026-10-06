// Component: SrSavingsCard
// Module: StrategyResults
// Purpose: compact summary of savings outcomes
// Author/Version: OpsMgt UX Lab / v3.0
// AI Tags: savings, product, impact, overview, card

import React, { useMemo } from "react";
import { Box, Stack, Typography } from "@mui/material";
import SavingsOutlinedIcon from "@mui/icons-material/SavingsOutlined";
import TrendingUpOutlinedIcon from "@mui/icons-material/TrendingUpOutlined";
import Inventory2OutlinedIcon from "@mui/icons-material/Inventory2Outlined";
import { cardStyle, colors, masterTypo } from "../../../../ux/styles";
import { fmtNum, fmtPct, NIL } from "../../utils/srFormat";

export default function SrSavingsCard({ savRows }) {
  const summary = useMemo(() => {
    const rows = Array.isArray(savRows)
      ? savRows
      : [];

    const products = new Set(
      rows
        .map((row) => row.product)
        .filter(Boolean)
    );

    const values = rows
      .map((row) => row.savPct)
      .filter(
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

    return {
      productCount: products.size,
      avgPct,
      hasSavings: rows.length > 0,
    };
  }, [savRows]);

  return (
    <Box
      sx={{
        ...cardStyle.primary,
        p: 1.75,
        borderLeft: `4px solid ${colors.accentTeal}`,
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
            background: `${colors.accentTeal}1A`,
            color: colors.accentTeal,
            flexShrink: 0,
          }}
        >
          <SavingsOutlinedIcon sx={{ fontSize: 18 }} />
        </Box>

        <Typography
          sx={{
            ...masterTypo.h5,
            color: colors.title,
          }}
        >
          Savings
        </Typography>
      </Stack>

      {!summary.hasSavings ? (
        <Typography
          sx={{
            ...masterTypo.body2,
            color: colors.subtitle,
            mt: 1.75,
          }}
        >
          No savings result available.
        </Typography>
      ) : (
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
                color: colors.accentTeal,
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
                color: colors.accentTeal,
              }}
            />

            <Typography
              sx={{
                ...masterTypo.caption,
                color: colors.subtitle,
              }}
            >
              Avg Saving
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
        </Box>
      )}
    </Box>
  );
}