
import React from "react";
import { Grid, Card, Box, Typography, Skeleton } from "@mui/material";
import {
  PrecisionManufacturing as CapIcon,
  TrendingUp as TrendingUpIcon,
  TrendingDown as TrendingDownIcon,
} from "@mui/icons-material";
import { cardStyle, colors } from "../../../ux/styles";

export const PcOverview = ({ plant, workCentres = [], loading }) => {
  // Resolve plant utilisation and capacity UOM
  const util = parseFloat(plant?.Plant_Utilisation_Percent) || 0;
  const utilCol =
    util >= 90
      ? colors.warning
      : util >= 75
      ? colors.primary
      : colors.success;
  const capUom = plant?.Cap_UOM || "Hours";
  const validWcs = Array.isArray(workCentres) ? workCentres : [];

  // Resolve SP-provided most-used and least-used work centres
  const mostUsedWcs = validWcs.filter(
    (wc) => Number(wc.Is_Most_Used) === 1
  );
  const leastUsedWcs = validWcs.filter(
    (wc) => Number(wc.Is_Least_Used) === 1
  );

  // Build display names for tied work centres
  const mostUsedNames = mostUsedWcs
    .map((wc) => wc.WC_Description || wc.Mfg_Work_Centre)
    .filter(Boolean)
    .join(", ");
  const leastUsedNames = leastUsedWcs
    .map((wc) => wc.WC_Description || wc.Mfg_Work_Centre)
    .filter(Boolean)
    .join(", ");

  // Resolve utilisation values for the overview cards
  const mostUsedUtil =
    mostUsedWcs.length > 0
      ? parseFloat(mostUsedWcs[0].Mfg_Load_Percent) || 0
      : 0;
  const leastUsedUtil =
    leastUsedWcs.length > 0
      ? parseFloat(leastUsedWcs[0].Mfg_Load_Percent) || 0
      : 0;

  return (
    <Grid container spacing={1.5} sx={{ mb: 2 }}>
      {/* Overall plant capacity summary */}
      <Grid item xs={12} sm={6} md={4}>
        <Card
          sx={{
            ...cardStyle.statCard,
            p: 1.5,
            minHeight: 92,
            alignItems: "center",
          }}
        >
          <Box sx={cardStyle.statIconCircle(utilCol)}>
            <CapIcon fontSize="small" />
          </Box>
          <Box sx={{ flex: 1, minWidth: 0 }}>
            <Typography
              variant="body2"
              sx={{
                color: colors.subtitle,
                fontWeight: 700,
                lineHeight: 1.2,
              }}
            >
              Overall Plant Capacity
            </Typography>
            <Box
              sx={{
                display: "flex",
                alignItems: "flex-end",
                gap: 2,
                mt: 0.75,
              }}
            >
              <Box>
                <Typography
                  variant="caption"
                  sx={{ color: colors.subtitle, display: "block" }}
                >
                  Capacity
                </Typography>
                <Typography
                  variant="body2"
                  sx={{ fontWeight: 700, color: colors.title }}
                >
                  {loading ? (
                    <Skeleton width={45} />
                  ) : (
                    `${parseFloat(
                      plant?.Plant_Capacity_Hours || 0
                    ).toLocaleString()} ${capUom}`
                  )}
                </Typography>
              </Box>
              <Box>
                <Typography
                  variant="caption"
                  sx={{ color: colors.subtitle, display: "block" }}
                >
                  Load
                </Typography>
                <Typography
                  variant="body2"
                  sx={{ fontWeight: 700, color: colors.title }}
                >
                  {loading ? (
                    <Skeleton width={45} />
                  ) : (
                    `${parseFloat(
                      plant?.Plant_Load_Hours || 0
                    ).toLocaleString()} ${capUom}`
                  )}
                </Typography>
              </Box>
              <Box>
                <Typography
                  variant="caption"
                  sx={{ color: colors.subtitle, display: "block" }}
                >
                  Utilisation
                </Typography>
                <Typography
                  variant="body2"
                  sx={{ fontWeight: 800, color: utilCol }}
                >
                  {loading ? <Skeleton width={30} /> : `${util}%`}
                </Typography>
              </Box>
            </Box>
          </Box>
        </Card>
      </Grid>

      {/* Most-used work centre summary */}
      <Grid item xs={12} sm={6} md={4}>
        <Card
          sx={{
            ...cardStyle.statCard,
            p: 1.5,
            minHeight: 92,
            alignItems: "center",
          }}
        >
          <Box sx={cardStyle.statIconCircle(colors.primary)}>
            <TrendingUpIcon fontSize="small" />
          </Box>
          <Box sx={{ flex: 1, minWidth: 0 }}>
            <Typography
              variant="body2"
              sx={{
                color: colors.subtitle,
                fontWeight: 700,
                lineHeight: 1.2,
              }}
            >
              Most Used Work Centre
            </Typography>
            <Typography
              variant="body2"
              sx={{
                fontWeight: 700,
                color: colors.title,
                lineHeight: 1.2,
                mt: 0.75,
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
              title={mostUsedNames || "N/A"}
            >
              {loading ? <Skeleton width={100} /> : mostUsedNames || "N/A"}
            </Typography>
            <Typography
              variant="caption"
              sx={{
                color: colors.primaryDark,
                fontWeight: 700,
                display: "block",
                mt: 0.25,
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

      {/* Least-used work centre summary */}
      <Grid item xs={12} sm={6} md={4}>
        <Card
          sx={{
            ...cardStyle.statCard,
            p: 1.5,
            minHeight: 92,
            alignItems: "center",
          }}
        >
          <Box sx={cardStyle.statIconCircle(colors.accentBlue)}>
            <TrendingDownIcon fontSize="small" />
          </Box>
          <Box sx={{ flex: 1, minWidth: 0 }}>
            <Typography
              variant="body2"
              sx={{
                color: colors.subtitle,
                fontWeight: 700,
                lineHeight: 1.2,
              }}
            >
              Least Used Work Centre
            </Typography>
            <Typography
              variant="body2"
              sx={{
                fontWeight: 700,
                color: colors.title,
                lineHeight: 1.2,
                mt: 0.75,
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
              title={leastUsedNames || "N/A"}
            >
              {loading ? <Skeleton width={100} /> : leastUsedNames || "N/A"}
            </Typography>
            <Typography
              variant="caption"
              sx={{
                color: colors.accentBlue,
                fontWeight: 700,
                display: "block",
                mt: 0.25,
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
