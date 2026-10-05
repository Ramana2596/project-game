// Component: SrStrategyCard
// Module: StrategyResults
// Purpose: compact summary of selected strategies
// Author/Version: OpsMgt UX Lab / v2.2
// AI Tags: strategy, results, summary, card

import React from "react";
import { Box, Stack, Typography } from "@mui/material";
import LayersOutlinedIcon from "@mui/icons-material/LayersOutlined";
import CheckCircleOutlinedIcon from "@mui/icons-material/CheckCircleOutlined";
import AccountTreeOutlinedIcon from "@mui/icons-material/AccountTreeOutlined";
import { cardStyle, colors, masterTypo } from "../../../../ux/styles";
import { fmtNum, NIL } from "../../utils/srFormat";

export default function SrStrategyCard({
  setNo,
  srTotals,
  onClick,
}) {
  return (
    <Box
      onClick={onClick}
      role={onClick ? "button" : undefined}
      tabIndex={onClick ? 0 : undefined}
      onKeyDown={(event) => {
        if (
          onClick &&
          (event.key === "Enter" || event.key === " ")
        ) {
          event.preventDefault();
          onClick();
        }
      }}
      sx={{
        ...cardStyle.primary,
        p: 2,
        borderLeft: `4px solid ${colors.primary}`,
        cursor: onClick ? "pointer" : "default",
        minWidth: 0,
        transition: "box-shadow 0.2s, transform 0.2s",
        "&:hover": onClick
          ? {
              boxShadow: 4,
              transform: "translateY(-1px)",
            }
          : {},
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
            background: colors.primarySoft,
            color: colors.primary,
            flexShrink: 0,
          }}
        >
          <LayersOutlinedIcon sx={{ fontSize: 18 }} />
        </Box>

        <Box sx={{ minWidth: 0, flex: 1 }}>
          <Typography
            sx={{
              ...masterTypo.h5,
              color: colors.title,
            }}
          >
            Strategy
          </Typography>

          <Typography
            sx={{
              ...masterTypo.caption,
              color: colors.subtitle,
            }}
          >
            Set {setNo ?? NIL}
          </Typography>
        </Box>

        {onClick && (
          <AccountTreeOutlinedIcon
            sx={{
              fontSize: 19,
              color: colors.primary,
            }}
          />
        )}
      </Stack>

      <Box
        sx={{
          mt: 1.5,
          pt: 1.25,
          borderTop: `1px solid ${colors.border}`,
          display: "flex",
          alignItems: "center",
          gap: 0.75,
        }}
      >
        <CheckCircleOutlinedIcon
          sx={{
            fontSize: 17,
            color: colors.success,
          }}
        />

        <Typography
          sx={{
            ...masterTypo.body2,
            color: colors.subtitle,
          }}
        >
          Selected
        </Typography>

        <Typography
          sx={{
            ...masterTypo.body2,
            color: colors.title,
            fontWeight: 700,
            ml: "auto",
          }}
        >
          {fmtNum(srTotals.nSel)} / {fmtNum(srTotals.nTotal)}
        </Typography>
      </Box>

      {onClick && (
        <Typography
          sx={{
            ...masterTypo.caption,
            color: colors.primary,
            fontWeight: 600,
            mt: 1,
            textAlign: "right",
          }}
        >
          Strategy Map →
        </Typography>
      )}
    </Box>
  );
}