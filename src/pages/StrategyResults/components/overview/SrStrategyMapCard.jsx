 // Component: SrStrategyMapCard
// Module: StrategyResults
// Purpose: compact visual map for one selected strategy
// Author/Version: OpsMgt UX Lab / v2.3
// AI Tags: strategy, map, visual, benefit, outcome, timeline

import React from "react";
import { Box, Chip, Stack, Typography } from "@mui/material";
import AutoGraphOutlinedIcon from "@mui/icons-material/AutoGraphOutlined";
import ArrowForwardOutlinedIcon from "@mui/icons-material/ArrowForwardOutlined";
import CalendarMonthOutlinedIcon from "@mui/icons-material/CalendarMonthOutlined";
import TrendingUpOutlinedIcon from "@mui/icons-material/TrendingUpOutlined";
import { cardStyle, colors, masterTypo } from "../../../../ux/styles";
import { fmtDate, fmtNum, fmtPct, NIL } from "../../utils/srFormat";

export default function SrStrategyMapCard({ card }) {
  const plan = card?.plan || {};

  const gain = plan.gain !== null && plan.gain !== undefined;
  const loss = plan.loss !== null && plan.loss !== undefined;

  const effectValue = gain
    ? Number(plan.gain)
    : loss
      ? Number(plan.loss)
      : null;

  const effectText = gain
    ? `+${fmtNum(plan.gain)}%`
    : loss
      ? `-${fmtNum(plan.loss)}%`
      : NIL;

  const effectColor = gain
    ? colors.success
    : loss
      ? colors.error
      : colors.subtitle;

  const startMonth = plan.implDate
    ? fmtDate(plan.implDate)
    : plan.fromMon !== null &&
      plan.fromMon !== undefined
      ? `Month ${plan.fromMon}`
      : NIL;

  const duration =
    plan.dur !== null &&
    plan.dur !== undefined
      ? `${fmtNum(plan.dur)} mos`
      : NIL;

  const benefit = plan.benefit || NIL;
  const outcome = plan.outcome || NIL;
  const enabler = plan.enabler || plan.choice || NIL;

  const progress =
    effectValue === null
      ? 35
      : Math.min(
          100,
          Math.max(
            18,
            Math.abs(effectValue) * 12
          )
        );

  return (
    <Box
      sx={{
        ...cardStyle.primary,
        p: 1.75,
        minWidth: 0,
        height: "100%",
        borderTop: `3px solid ${colors.primary}`,
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Stack
        direction="row"
        spacing={1}
        alignItems="center"
      >
        <Box
          sx={{
            width: 30,
            height: 30,
            borderRadius: "50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: colors.primarySoft,
            color: colors.primary,
            flexShrink: 0,
          }}
        >
          <AutoGraphOutlinedIcon sx={{ fontSize: 17 }} />
        </Box>

        <Box
          sx={{
            flex: 1,
            minWidth: 0,
          }}
        >
          <Typography
            sx={{
              ...masterTypo.caption,
              color: colors.subtitle,
              fontWeight: 700,
            }}
          >
            {card.id || NIL}
          </Typography>

          <Typography
            sx={{
              ...masterTypo.body1,
              color: colors.title,
              fontWeight: 700,
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            {card.strategy || NIL}
          </Typography>
        </Box>

        <Typography
          sx={{
            ...masterTypo.body2,
            color: effectColor,
            fontWeight: 800,
            flexShrink: 0,
          }}
        >
          {effectText}
        </Typography>
      </Stack>

      <Stack
        direction="row"
        spacing={0.5}
        sx={{
          mt: 1.25,
          flexWrap: "wrap",
          rowGap: 0.5,
        }}
      >
        <Chip
          label={benefit}
          size="small"
          sx={{
            height: 24,
            maxWidth: "100%",
            background: colors.primarySoft,
            color: colors.primaryDark,
            "& .MuiChip-label": {
              overflow: "hidden",
              textOverflow: "ellipsis",
            },
          }}
        />

        <Chip
          label={plan.costType || NIL}
          size="small"
          sx={{
            height: 24,
            background: colors.panel,
            color: colors.title,
          }}
        />

        <Chip
          label={
            plan.isCapital === true ||
            String(plan.isCapital).toLowerCase() ===
              "yes"
              ? "Capital"
              : "Operating"
          }
          size="small"
          sx={{
            height: 24,
            background: colors.panel,
            color: colors.subtitle,
          }}
        />
      </Stack>

      <Box
        sx={{
          mt: 1.5,
          p: 1.1,
          borderRadius: 1.5,
          background: colors.panel,
        }}
      >
        <Typography
          sx={{
            ...masterTypo.caption,
            color: colors.subtitle,
            fontWeight: 600,
          }}
        >
          Enabler
        </Typography>

        <Typography
          sx={{
            ...masterTypo.body2,
            color: colors.title,
            fontWeight: 600,
            mt: 0.25,
          }}
        >
          {enabler}
        </Typography>
      </Box>

      <Box
        sx={{
          mt: 1.5,
          display: "flex",
          alignItems: "stretch",
          gap: 0.75,
        }}
      >
        <Box
          sx={{
            flex: 1,
            minWidth: 0,
          }}
        >
          <Typography
            sx={{
              ...masterTypo.caption,
              color: colors.subtitle,
              fontWeight: 600,
            }}
          >
            Benefit
          </Typography>

          <Typography
            sx={{
              ...masterTypo.body2,
              color: colors.title,
              fontWeight: 600,
              mt: 0.25,
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
            }}
          >
            {benefit}
          </Typography>
        </Box>

        <ArrowForwardOutlinedIcon
          sx={{
            fontSize: 18,
            color: colors.primary,
            alignSelf: "center",
            flexShrink: 0,
          }}
        />

        <Box
          sx={{
            flex: 1,
            minWidth: 0,
            textAlign: "right",
          }}
        >
          <Typography
            sx={{
              ...masterTypo.caption,
              color: colors.subtitle,
              fontWeight: 600,
            }}
          >
            Outcome
          </Typography>

          <Typography
            sx={{
              ...masterTypo.body2,
              color: colors.title,
              fontWeight: 600,
              mt: 0.25,
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
            }}
          >
            {outcome}
          </Typography>
        </Box>
      </Box>

      <Box
        sx={{
          mt: "auto",
          pt: 1.5,
        }}
      >
        <Box
          sx={{
            position: "relative",
            height: 18,
            display: "flex",
            alignItems: "center",
          }}
        >
          <Box
            sx={{
              position: "absolute",
              left: 4,
              right: 4,
              height: 2,
              background: colors.border,
            }}
          />

          <Box
            sx={{
              position: "absolute",
              left: 4,
              width: `${progress}%`,
              height: 2,
              background: colors.primary,
            }}
          />

          <Box
            sx={{
              position: "absolute",
              left: `calc(${progress}% - 5px)`,
              width: 10,
              height: 10,
              borderRadius: "50%",
              background: colors.primary,
              border: `2px solid ${colors.card}`,
              boxSizing: "border-box",
            }}
          />
        </Box>

        <Stack
          direction="row"
          alignItems="center"
          spacing={0.5}
          sx={{ mt: 0.25 }}
        >
          <CalendarMonthOutlinedIcon
            sx={{
              fontSize: 15,
              color: colors.subtitle,
            }}
          />

          <Typography
            sx={{
              ...masterTypo.caption,
              color: colors.subtitle,
            }}
          >
            {startMonth}
          </Typography>

          <Typography
            sx={{
              ...masterTypo.caption,
              color: colors.border,
            }}
          >
            •
          </Typography>

          <TrendingUpOutlinedIcon
            sx={{
              fontSize: 15,
              color: colors.primary,
            }}
          />

          <Typography
            sx={{
              ...masterTypo.caption,
              color: colors.subtitle,
            }}
          >
            {duration}
          </Typography>
        </Stack>
      </Box>
    </Box>
  );
}