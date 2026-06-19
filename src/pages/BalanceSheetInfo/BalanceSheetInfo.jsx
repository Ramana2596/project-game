// Imports for layout, table, chart, hooks
import { Box } from "@mui/material";
import GenericTable from "../../components/GenericTable.jsx";
import { useUser } from "../../core/access/userContext.jsx";
import { useEffect, useState } from "react";
import { getBalanceSheetInfo } from "./services/service.js";
import { pageConstants } from "./constants/pageConstants.js";
import { chartConstants } from "./constants/chartConstants.js"; // New import
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

export default function BalanceSheetInfo({ productionMonth }) {
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

  useEffect(() => {
    getBalanceSheetInfo(payload).then((response) => {
      if (response) {
        setTableData(response.data.data);
      }
    });
  }, []);

  const [dynamicHeadings, setDynamicHeadings] = useState([]);
  const [chartType, setChartType] = useState(chartConstants.defaultChartType);

  // Fetch Balance Sheet table data
  useEffect(() => {
    getBalanceSheetInfo(payload).then((response) => {
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
    {/* Two-column layout: Reports 80%, Charts 20% */}
    <Box sx={{ display: "flex", gap: 3, height: "75vh" }}>
      
      {/* Reports column (80%) */}
      <Box
        sx={{
          flex: "0 0 80%",
          bgcolor: "#f9faff",
          borderRadius: 2,
          border: "1px solid #e5e7eb",
          overflowY: "auto",
        }}
      >
        {/* Sticky header for reports */}
        <Box
          sx={{
            position: "sticky",
            top: 0,
            bgcolor: "#f9faff",
            p: 1,
            borderBottom: "1px solid #e5e7eb",
            zIndex: 1,
          }}
        >
          <h3 style={{ margin: 0 }}>Balance Sheet Report</h3>
        </Box>

        {/* Table remains unaltered */}
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

      {/* Charts column (20%) */}
      <Box
        sx={{
          flex: "0 0 20%",
          overflowY: "auto",
          pr: 1,
          display: "flex",
          flexDirection: "column",
          gap: 1,   // reduced vertical gap
          alignItems: "center",
        }}
      >
        {/* Sticky header for charts */}
        <Box
          sx={{
            position: "sticky",
            top: 0,
            bgcolor: "#ffffff",
            p: 1,
            borderBottom: "1px solid #e5e7eb",
            zIndex: 1,
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <h3 style={{ margin: 0 }}>Charts:</h3>
          <select
            value={chartType}
            onChange={(e) => setChartType(e.target.value)}
            style={{
              border: "none",
              background: "transparent",
              fontSize: "1.2rem",
              cursor: "pointer",
            }}
          >
            {chartConstants.chartTypes.map((type) => (
              <option key={type} value={type}>
                {type === "line" ? "📈" : "📊"}
              </option>
            ))}
          </select>
        </Box>

        {chartData.map((series) => (
          <Box
            key={series.detail}
            sx={{
              width: "100%",
              bgcolor: "#ffffff",
              borderRadius: 2,
              boxShadow: 1,
              p: 1,
            }}
          >
            <ResponsiveContainer width="100%" height={180}>
              {chartType === "line" && (
                <LineChart data={series.data}>
                  <XAxis dataKey="month" hide />   {/* hide duplicate X-axis labels */}
                  <YAxis />
                  <Tooltip />
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
                  <XAxis dataKey="month" hide />   {/* hide duplicate X-axis labels */}
                  <YAxis />
                  <Tooltip />
                  <Bar
                    dataKey="value"
                    name={series.detail}
                    fill={chartConstants.detailColors[series.detail] || "#82ca9d"}
                  />
                </BarChart>
              )}
            </ResponsiveContainer>
            {/* Retained one title per chart at bottom */}
            <h4 style={{ textAlign: "center", marginTop: 4 }}>{series.detail}</h4>
          </Box>
        ))}
      </Box>
    </Box>
  </Box>
);


}
