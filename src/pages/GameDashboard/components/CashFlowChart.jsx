import React from "react";
import { Box } from "@mui/material";
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, Legend, Label } from "recharts";

function CashFlowChart({ data }) {
    // Defensive: ensure data is always an array
    const chartData = Array.isArray(data) ? data : [];
    const hasData = chartData.length > 0 && chartData.some(item => typeof item.value === "number");

    return (
        <Box sx={{ width: "100%", height: 300 }}>
            {hasData ? (
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={chartData} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="label">
                            <Label value="Period" offset={-5} position="insideBottom" />
                        </XAxis>
                        <YAxis allowDecimals domain={[dataMin => Math.min(0, dataMin), dataMax => Math.max(0, dataMax)]} />
                        <Tooltip formatter={(value) => value?.toLocaleString?.() ?? value} />
                        <Legend verticalAlign="top" height={36} wrapperStyle={{ top: 0, left: 0, right: 0, margin: '0 auto' }} />
                        <Bar dataKey="value" name="Cash Flow" fill="#1976d2" isAnimationActive />
                    </BarChart>
                </ResponsiveContainer>
            ) : (
                <Box sx={{ textAlign: "center", color: "#888", padding: 2 }}>No data available</Box>
            )}
        </Box>
    );
}

export default CashFlowChart;
