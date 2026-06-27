import React from "react";
import {
  Box,
  Typography,
  LinearProgress,
  Stack,
  Chip,
  Divider,
} from "@mui/material";

const YardstickChart = ({ data = [] }) => {

  if (!data.length) {
    return (
      <Typography color="text.secondary">
        No performance data available.
      </Typography>
    );
  }

  const maxValue = Math.max(
    ...data.map((x) => Number(x.Ratio_Overall || 0)),
    1
  );

  const sorted = [...data].sort(
    (a, b) => Number(a.Seq_No) - Number(b.Seq_No)
  );

  return (
    <Stack spacing={2}>

      {sorted.map((item) => {

        const value = Number(item.Ratio_Overall || 0);

        const progress = (value / maxValue) * 100;

        return (

          <Box key={item.Yardstick_Id}>

            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                mb: 0.5,
              }}
            >

              <Typography
                variant="subtitle2"
                fontWeight={600}
              >
                {item.Yardstick_Name}
              </Typography>

              <Chip
                label={value.toFixed(2)}
                size="small"
                color="primary"
                variant="outlined"
              />

            </Box>

            <LinearProgress
              variant="determinate"
              value={progress}
              sx={{
                height: 10,
                borderRadius: 5,
              }}
            />

            <Divider sx={{ mt: 2 }} />

          </Box>

        );

      })}

    </Stack>
  );
};

export default YardstickChart;