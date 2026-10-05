// Component: SrCommitmentCard
// Module: StrategyResults
// Purpose: compact summary of financial commitments
// Author/Version: OpsMgt UX Lab / v2.2
// AI Tags: commitment, budget, discount, card

import React, { useMemo } from "react";
import { Box, Stack, Typography } from "@mui/material";
import SavingsOutlinedIcon from "@mui/icons-material/SavingsOutlined";
import LocalOfferOutlinedIcon from "@mui/icons-material/LocalOfferOutlined";
import { cardStyle, colors, masterTypo } from "../../../../ux/styles";
import { fmtCurMap, fmtPct, NIL } from "../../utils/srFormat";

export default function SrCommitmentCard({
  srTotals,
  discRows,
}) {
  const discountPct = useMemo(() => {
    const values = discRows
      .map((row) => row.discPct)
      .filter(
        (value) =>
          value !== null &&
          value !== undefined
      );

    if (!values.length) return null;

    return (
      values.reduce(
        (sum, value) => sum + Number(value),
        0
      ) / values.length
    );
  }, [discRows]);

  return (
    <Box
      sx={{
        ...cardStyle.primary,
        p: 2,
        borderLeft: `4px solid ${colors.accentIndigo}`,
        minWidth: 0,
      }}
    >
      <Stack direction="row" spacing={1} alignItems="center">
        <Box
          sx={{
            width: 32,
            height: 32,
            borderRadius: "50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: `${colors.accentIndigo}1A`,
            color: colors.accentIndigo,
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
          Commitment
        </Typography>
      </Stack>

      <Box
        sx={{
          mt: 1.5,
          pt: 1.25,
          borderTop: `1px solid ${colors.border}`,
        }}
      >
        <Stack
          direction="row"
          alignItems="center"
          spacing={0.75}
        >
          <SavingsOutlinedIcon
            sx={{
              fontSize: 16,
              color: colors.accentIndigo,
            }}
          />

          <Typography
            sx={{
              ...masterTypo.caption,
              color: colors.subtitle,
            }}
          >
            Budget
          </Typography>

          <Typography
            sx={{
              ...masterTypo.body2,
              color: colors.title,
              fontWeight: 700,
              ml: "auto",
              textAlign: "right",
            }}
          >
            {fmtCurMap(srTotals.budget)}
          </Typography>
        </Stack>

        <Stack
          direction="row"
          alignItems="center"
          spacing={0.75}
          sx={{ mt: 1 }}
        >
          <LocalOfferOutlinedIcon
            sx={{
              fontSize: 16,
              color: colors.accentOrange,
            }}
          />

          <Typography
            sx={{
              ...masterTypo.caption,
              color: colors.subtitle,
            }}
          >
            Discount
          </Typography>

          <Typography
            sx={{
              ...masterTypo.body2,
              color: colors.title,
              fontWeight: 700,
              ml: "auto",
            }}
          >
            {discountPct === null
              ? NIL
              : fmtPct(discountPct)}
          </Typography>
        </Stack>
      </Box>
    </Box>
  );
}