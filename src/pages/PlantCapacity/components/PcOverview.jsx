import React from "react";
import { Grid, Card, Box, Typography, Skeleton } from "@mui/material";
import {
  PrecisionManufacturing as CapIcon,
  TrendingUp as TrendingUpIcon,
  TrendingDown as TrendingDownIcon,
} from "@mui/icons-material";
import { cardStyle, colors } from "../../../ux/styles";

export const PcOverview = ({ plant, workCentres = [], loading }) => {
  const util = parseFloat(plant?.Plant_Utilisation_Percent) || 0;

  const utilCol =
    util >= 90
      ? colors.warning
      : util >= 75
      ? colors.primary
      : colors.success;

  const capUom = plant?.Cap_UOM || "Hours";
  const validWcs = Array.isArray(workCentres) ? workCentres : [];

  // ------------------------------------------------------------
  // Usage information is determined by the SP.
  // Multiple Work Centres may be Most / Least Used when tied.
  // ------------------------------------------------------------
  const mostUsedWcs = validWcs.filter(
    (wc) => Number(wc.Is_Most_Used) === 1
  );

  const leastUsedWcs = validWcs.filter(
    (wc) => Number(wc.Is_Least_Used) === 1
  );

  const mostUsedNames = mostUsedWcs
    .map((wc) => wc.WC_Description || wc.Mfg_Work_Centre)
    .filter(Boolean)
    .join(", ");

  const leastUsedNames = leastUsedWcs
    .map((wc) => wc.WC_Description || wc.Mfg_Work_Centre)
    .filter(Boolean)
    .join(", ");

  const mostUsedUtil =
    mostUsedWcs.length > 0
      ? parseFloat(mostUsedWcs[0].Mfg_Load_Percent) || 0
      : 0;

  const leastUsedUtil =
    leastUsedWcs.length > 0
      ? parseFloat(leastUsedWcs[0].Mfg_Load_Percent) || 0
      : 0;

  return (
    <Grid container spacing={2.5} sx={{ mb: 4 }}>
      {/* 1. Combined Plant Capacity Card */}
      <Grid item xs={12} sm={6} md={4}>
        <Card
          sx={{
            ...cardStyle.statCard,
            p: 2.5,
            alignItems: "flex-start",
          }}
        >
          <Box sx={cardStyle.statIconCircle(utilCol)}>
            <CapIcon />
          </Box>

          <Box sx={{ flex: 1 }}>
            <Typography variant="h6" sx={{ color: colors.subtitle }}>
              Overall Plant Capacity
            </Typography>

            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                mt: 1,
                gap: 1,
              }}
            >
              {/* Capacity */}
              <Box>
                <Typography
                  variant="caption"
                  sx={{
                    color: colors.subtitle,
                    fontSize: "0.7rem",
                    display: "block",
                  }}
                >
                  Capacity
                </Typography>

                <Typography
                  variant="body2"
                  sx={{
                    fontWeight: 600,
                    color: colors.title,
                    lineHeight: 1.2,
                  }}
                >
                  {loading ? (
                    <Skeleton width={40} />
                  ) : (
                    `${parseFloat(
                      plant?.Plant_Capacity_Hours || 0
                    ).toLocaleString()} ${capUom}`
                  )}
                </Typography>
              </Box>

              {/* Load */}
              <Box>
                <Typography
                  variant="caption"
                  sx={{
                    color: colors.subtitle,
                    fontSize: "0.7rem",
                    display: "block",
                  }}
                >
                  Load
                </Typography>

                <Typography
                  variant="body2"
                  sx={{
                    fontWeight: 600,
                    color: colors.title,
                    lineHeight: 1.2,
                  }}
                >
                  {loading ? (
                    <Skeleton width={40} />
                  ) : (
                    `${parseFloat(
                      plant?.Plant_Load_Hours || 0
                    ).toLocaleString()} ${capUom}`
                  )}
                </Typography>
              </Box>

              {/* Utilisation */}
              <Box>
                <Typography
                  variant="caption"
                  sx={{
                    color: colors.subtitle,
                    fontSize: "0.7rem",
                    display: "block",
                  }}
                >
                  Utilisation
                </Typography>

                <Typography
                  variant="body2"
                  sx={{
                    fontWeight: 700,
                    color: utilCol,
                    lineHeight: 1.2,
                  }}
                >
                  {loading ? <Skeleton width={30} /> : `${util}%`}
                </Typography>
              </Box>
            </Box>
          </Box>
        </Card>
      </Grid>

      {/* 2. Work Centre Overview: Most Used */}
      <Grid item xs={12} sm={6} md={4}>
        <Card sx={{ ...cardStyle.statCard, p: 2.5 }}>
          <Box sx={cardStyle.statIconCircle(colors.primary)}>
            <TrendingUpIcon />
          </Box>

          <Box sx={{ flex: 1 }}>
            <Typography variant="h6" sx={{ color: colors.subtitle }}>
              Most Used Work Centre
            </Typography>

            <Typography
              variant="subtitle1"
              sx={{
                fontWeight: 700,
                color: colors.title,
                lineHeight: 1.2,
                mt: 0.5,
              }}
            >
              {loading ? (
                <Skeleton width={100} />
              ) : (
                mostUsedNames || "N/A"
              )}
            </Typography>

            <Typography
              variant="body2"
              sx={{
                color: colors.primaryDark,
                fontWeight: 600,
                mt: 0.5,
              }}
            >
              {loading ? (
                <Skeleton width={50} />
              ) : (
                `${mostUsedUtil}% Utilisation`
              )}
            </Typography>
          </Box>
        </Card>
      </Grid>

      {/* 3. Work Centre Overview: Least Used */}
      <Grid item xs={12} sm={6} md={4}>
        <Card sx={{ ...cardStyle.statCard, p: 2.5 }}>
          <Box sx={cardStyle.statIconCircle(colors.accentBlue)}>
            <TrendingDownIcon />
          </Box>

          <Box sx={{ flex: 1 }}>
            <Typography variant="h6" sx={{ color: colors.subtitle }}>
              Least Used Work Centre
            </Typography>

            <Typography
              variant="subtitle1"
              sx={{
                fontWeight: 700,
                color: colors.title,
                lineHeight: 1.2,
                mt: 0.5,
              }}
            >
              {loading ? (
                <Skeleton width={100} />
              ) : (
                leastUsedNames || "N/A"
              )}
            </Typography>

            <Typography
              variant="body2"
              sx={{
                color: colors.accentBlue,
                fontWeight: 600,
                mt: 0.5,
              }}
            >
              {loading ? (
                <Skeleton width={50} />
              ) : (
                `${leastUsedUtil}% Utilisation`
              )}
            </Typography>
          </Box>
        </Card>
      </Grid>
    </Grid>
  );
};