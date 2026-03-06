// Imports for layout, table, chart, hooks
import { Box } from "@mui/material";
import GenericTable from "../../components/GenericTable.jsx";
import { useUser } from "../../core/access/userContext.jsx";
import { useEffect, useState } from "react";
import { getCashFlowStatement } from "./services/service.js";
import { pageConstants } from "./constants/pageConstants.js";
import { chartConstants } from "./constants/chartConstants.js"; 
import { useLoading } from "../../hooks/loadingIndicatorContext.jsx";
// Chart library import
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

export default function CasFlowStatement({ productionMonth }) {
  const { userInfo } = useUser();
  const { setIsLoading } = useLoading();

  // Payload for API call
  let payload = {
    gameId: userInfo?.gameId,
    gameBatch: userInfo?.gameBatch,
    gameTeam: userInfo?.gameTeam,
    productionMonth: productionMonth, // as prop
  };

  // State for table, chart, headings, and chart type
  const [tableData, setTableData] = useState([]);
  const [chartData, setChartData] = useState([]);
  const [dynamicHeadings, setDynamicHeadings] = useState([]);
  const [chartType, setChartType] = useState(chartConstants.defaultChartType);

  // Fetch Cash Flow Statement table data
  useEffect(() => {
    getCashFlowStatement(payload).then((response) => {
      if (response && response.data.data.length > 0) {
        const rawData = response.data.data;
        setTableData(rawData);

        // Generate dynamic headings from data (excluding hidden ones)
        const keys = Object.keys(rawData[0]);
        const filteredHeadings = keys.filter(
          (key) => !pageConstants.hiddenColumns.includes(key)
        );
        setDynamicHeadings(filteredHeadings);

        // Transform table data into chart series (one chart per detail)
        const months = filteredHeadings.filter(
          (h) => h !== "Details" && h !== "Line_No"
        );

        const chartSeriesByDetail = chartConstants.chartDetails.map((detail) => ({
          detail,
          data: months.map((month) => ({
            month,
            value: rawData.find((row) => row.Details === detail)?.[month] || 0,
          })),
        }));

        setChartData(chartSeriesByDetail);
      }
    });
    // eslint-disable-next-line
  }, [productionMonth]);

  return (
    <Box sx={{ flexGrow: 1 }}>
      {/* Chart type selector */}
      <Box sx={{ mb: 2 }}>
        <label>Select Chart Type: </label>
        <select value={chartType} onChange={(e) => setChartType(e.target.value)}>
          {chartConstants.chartTypes.map((type) => (
            <option key={type} value={type}>
              {type.charAt(0).toUpperCase() + type.slice(1)}
            </option>
          ))}
        </select>
      </Box>

      {/* Multiple charts arranged side-by-side */}
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          gap: 2,
          backgroundColor: "#f9f9f9",
          p: 2,
          borderRadius: 1,
        }}
      >
        {chartData.map((series) => (
          <Box
            key={series.detail}
            sx={{
              flex: `1 1 ${100 / chartConstants.chartsPerRow - 2}%`,
              mb: 2,
              backgroundColor: "#ffffff",
              borderRadius: 1,
              boxShadow: 1,
            }}
          >
            <ResponsiveContainer width="100%" height={250}>
              {chartType === "line" && (
                <LineChart data={series.data}>
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="value"
                    name={series.detail}
                    stroke={chartConstants.detailColors[series.detail] || "#8884d8"}
                  />
                </LineChart>
              )}
              {chartType === "bar" && (
                <BarChart data={series.data}>
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar
                    dataKey="value"
                    name={series.detail}
                    fill={chartConstants.detailColors[series.detail] || "#82ca9d"}
                  />
                </BarChart>
              )}
            </ResponsiveContainer>
            <h4 style={{ textAlign: "center" }}>{series.detail}</h4>
          </Box>
        ))}
      </Box>

      {/* Table with dynamic headings */}
      <Box sx={{ overflowX: "auto", backgroundColor: "#ffffff", borderRadius: 1, boxShadow: 1 }}>
        <GenericTable
          inputTableHeadings={
            dynamicHeadings.length > 0
              ? dynamicHeadings
              : pageConstants.fallbackHeadings
          }
          inputTableData={tableData}
          ifNoData={null}
          hiddenColumns={pageConstants.hiddenColumns}
          highlightRowsByDetail={pageConstants.vitalRows}
        />
      </Box>
    </Box>
  );
}
