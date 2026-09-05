import React from "react";
import { Grid, Card, Box, Typography, Skeleton } from "@mui/material";
import {
  PrecisionManufacturing as CapIcon,
  TrendingUp as LoadIcon,
  Speed as UtilIcon,
  WarningAmber as AlertIcon,
  CheckCircle as OkIcon,
} from "@mui/icons-material";
import { cardStyle, colors } from "../../../ux/styles";

export const PcOverview = ({ plant, criticalCount, loading }) => {
  const util = plant?.Plant_Utilisation_Percent || 0;
  const utilCol = util >= 90 ? colors.warning : util >= 75 ? colors.primary : colors.success;

  return (
    <Grid container spacing={2.5} sx={{ mb: 4 }}>
      {/* Total Capacity Card */}
      <Grid item xs={12} sm={6} md={3}>
        <Card sx={cardStyle.statCard}>
          <Box sx={cardStyle.statIconCircle(colors.primarySoft)}>
            <CapIcon sx={{ color: colors.primaryDark }} />
          </Box>
          <Box>
            <Typography variant="caption" sx={{ color: colors.subtitle }}>
              Total Plant Capacity
            </Typography>
            <Typography variant="h5" sx={{ fontWeight: 700, color: colors.title }}>
              {loading ? <Skeleton width={80} /> : `${plant?.Plant_Capacity_Hours?.toLocaleString() || 0} Hrs`}
            </Typography>
          </Box>
        </Card>
      </Grid>

      {/* Scheduled Load Card */}
      <Grid item xs={12} sm={6} md={3}>
        <Card sx={cardStyle.statCard}>
          <Box sx={cardStyle.statIconCircle(`${colors.accentBlue}1F`)}>
            <LoadIcon sx={{ color: colors.accentBlue }} />
          </Box>
          <Box>
            <Typography variant="caption" sx={{ color: colors.subtitle }}>
              Scheduled Mfg Load
            </Typography>
            <Typography variant="h5" sx={{ fontWeight: 700, color: colors.title }}>
              {loading ? <Skeleton width={80} /> : `${plant?.Plant_Load_Hours?.toLocaleString() || 0} Hrs`}
            </Typography>
          </Box>
        </Card>
      </Grid>

      {/* Utilisation % Card */}
      <Grid item xs={12} sm={6} md={3}>
        <Card sx={cardStyle.statCard}>
          <Box sx={cardStyle.statIconCircle(`${utilCol}1F`)}>
            <UtilIcon sx={{ color: utilCol }} />
          </Box>
          <Box>
            <Typography variant="caption" sx={{ color: colors.subtitle }}>
              Overall Utilisation
            </Typography>
            <Typography variant="h5" sx={{ fontWeight: 700, color: colors.title }}>
              {loading ? <Skeleton width={80} /> : `${util}%`}
            </Typography>
          </Box>
        </Card>
      </Grid>

      {/* Critical Bottlenecks Card */}
      <Grid item xs={12} sm={6} md={3}>
        <Card sx={cardStyle.statCard}>
          <Box sx={cardStyle.statIconCircle(criticalCount > 0 ? `${colors.error}1F` : `${colors.success}1F`)}>
            {criticalCount > 0 ? <AlertIcon sx={{ color: colors.error }} /> : <OkIcon sx={{ color: colors.success }} />}
          </Box>
          <Box>
            <Typography variant="caption" sx={{ color: colors.subtitle }}>
              Critical Bottlenecks
            </Typography>
            <Typography variant="h5" sx={{ fontWeight: 700, color: colors.title }}>
              {loading ? <Skeleton width={80} /> : `${criticalCount} Work Centre(s)`}
            </Typography>
          </Box>
        </Card>
      </Grid>
    </Grid>
  );
};