import React from "react";
import {
  Paper,
  Typography,
  Chip,
  Box,
  Grid,
} from "@mui/material";

import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import MilitaryTechIcon from "@mui/icons-material/MilitaryTech";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import GroupsIcon from "@mui/icons-material/Groups";
import SpeedIcon from "@mui/icons-material/Speed";

const getBandColor = (seqNo) => {
  switch (seqNo) {
    case 1:
      return "success";      // Outstanding
    case 2:
      return "primary";      // Excellent
    case 3:
      return "info";         // Good
    case 4:
      return "warning";      // Satisfactory
    default:
      return "error";        // Needs Improvement
  }
};

const formatScore = (score) => {
  if (score === null || score === undefined) return "-";
  return Number(score).toFixed(2);
};

const formatMonth = (value) => {
  if (!value) return "-";

  try {
    return new Date(value).toLocaleDateString(undefined, {
      month: "short",
      year: "numeric",
    });
  } catch {
    return value;
  }
};

const PerfHeader = ({ team, header }) => {
  if (!header) return null;

  return (
    <Paper
      elevation={3}
      sx={{
        p: 3,
        borderRadius: 3,
        background: "linear-gradient(135deg,#fafafa,#ffffff)",
        border: "1px solid #e5e7eb",
        mb: 2,
      }}
    >
      <Grid container spacing={3} alignItems="center">

        {/* Left */}
        <Grid item xs={12} md={5}>
          <Box display="flex" alignItems="center" gap={1}>
            <GroupsIcon color="primary" />

            <Typography
              variant="h5"
              fontWeight={700}
            >
              {team}
            </Typography>
          </Box>

          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ mt: 0.5 }}
          >
            Team Performance Review
          </Typography>
        </Grid>

        {/* Right */}
        <Grid item xs={12} md={7}>
          <Grid container spacing={2}>

            {/* Overall Score */}
            <Grid item xs={6} sm={3}>
              <Box textAlign="center">
                <SpeedIcon
                  color="primary"
                  sx={{ mb: 0.5 }}
                />

                <Typography
                  variant="caption"
                  display="block"
                  color="text.secondary"
                >
                  Overall Score
                </Typography>

                <Typography
                  variant="h5"
                  fontWeight={700}
                  color="primary"
                >
                  {formatScore(header.Overall_Score)}
                </Typography>
              </Box>
            </Grid>

            {/* Band */}
            <Grid item xs={6} sm={3}>
              <Box textAlign="center">
                <MilitaryTechIcon
                  color="warning"
                  sx={{ mb: 0.5 }}
                />

                <Typography
                  variant="caption"
                  display="block"
                  color="text.secondary"
                >
                  Performance Band
                </Typography>

                <Chip
                  label={header.Band_Name}
                  color={getBandColor(header.Band_Seq_No)}
                  size="medium"
                  sx={{
                    fontWeight: 600,
                    mt: 0.5,
                  }}
                />
              </Box>
            </Grid>

            {/* Rank */}
            <Grid item xs={6} sm={3}>
              <Box textAlign="center">
                <EmojiEventsIcon
                  color="warning"
                  sx={{ mb: 0.5 }}
                />

                <Typography
                  variant="caption"
                  display="block"
                  color="text.secondary"
                >
                  Rank
                </Typography>

                <Typography
                  variant="h5"
                  fontWeight={700}
                >
                  {header.Rank_No ?? "-"}
                </Typography>
              </Box>
            </Grid>

            {/* Evaluation Month */}
            <Grid item xs={6} sm={3}>
              <Box textAlign="center">
                <CalendarMonthIcon
                  color="action"
                  sx={{ mb: 0.5 }}
                />

                <Typography
                  variant="caption"
                  display="block"
                  color="text.secondary"
                >
                  Evaluation
                </Typography>

                <Typography
                  variant="body1"
                  fontWeight={600}
                >
                  {formatMonth(header.Evaluation_Month)}
                </Typography>
              </Box>
            </Grid>

          </Grid>
        </Grid>

      </Grid>
    </Paper>
  );
};

export default PerfHeader;