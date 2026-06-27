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

  const yardstickColors = {
    Profitability: "#1976d2",
    Liquidity: "#2e7d32",
    Leverage: "#ed6c02",
    Growth: "#9c27b0",
  };

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
                sx={{
                  color: yardstickColors[item.Yardstick_Name] || "#424242",
                  borderColor: yardstickColors[item.Yardstick_Name] || "#90a4ae",
                  fontWeight: 600,
                }}
                variant="outlined"
              />

            </Box>

            <LinearProgress
              variant="determinate"
              value={progress}
              sx={{
                height: 10,
                borderRadius: 5,

                backgroundColor: "#eceff1",

                "& .MuiLinearProgress-bar": {
                  backgroundColor:
                    yardstickColors[item.Yardstick_Name] || "#90a4ae",
                },
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