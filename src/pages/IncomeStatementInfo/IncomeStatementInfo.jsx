import { Box } from "@mui/material";
import Grid from "@mui/material/Grid2";
import GenericTable from "../../components/GenericTable.jsx";
import { useUser } from "../../core/access/userContext.jsx";
import { useEffect, useState } from "react";
import { getIncomeStatementInfo } from "./services/service.js";
import { pageConstants } from "./constants/pageConstants.js";
import ProfitPercentLineChart from "../GameDashboard/components/ProfitPercentLineChart.jsx";
import { getChartInfo } from "../GameDashboard/services/gameDashboard.js";
import { useLoading } from "../../hooks/loadingIndicatorContext.jsx";

export default function IncomeStatementInfo({ productionMonth }) {  // as prrop from parent call
  const { userInfo } = useUser();
  const { setIsLoading } = useLoading();

  let payload = {
    gameId: userInfo?.gameId,
    gameBatch: Number(userInfo?.gameBatch),
    gameTeam: userInfo?.gameTeam,
    productionMonth: productionMonth    // as prop
  };
  const [tableData, setTableData] = useState([]);
  const [chartData, setChartData] = useState([]);
  const [dynamicHeadings, setDynamicHeadings] = useState([]); //Track productionMonth

  // Income Statement
  useEffect(() => {
    getIncomeStatementInfo(payload).then((response) => {
      if (response && response.data.data.length > 0) {
        const rawData = response.data.data;
        setTableData(rawData);
        
        // Generate Column headings from data (excluding hidden ones)
        const keys = Object.keys(rawData[0]);
        const filteredHeadings = keys.filter(key => !pageConstants.hiddenColumns.includes(key));
        setDynamicHeadings(filteredHeadings);

      }
    });
  }, []);

  //Chart
  useEffect(() => {
    const fetch = async () => {
      if (!userInfo?.gameId || !userInfo?.gameBatch || !userInfo?.gameTeam) return;
      setIsLoading(true);
      try {
        const params = {
          gameId: userInfo.gameId,
          gameBatch: Number(userInfo.gameBatch),
          gameTeam: userInfo.gameTeam,
          cmdLine: 'Profit_%',
        };
        const resp = await getChartInfo(params);
        const mapped = (resp?.data || []).map(item => ({
          label: item.Period,
          value: item.Value,
          legend: item.Legend,
          team: item.Team,
          chartType: item.Chart_Type,
          chart: item.Chart,
        }));
        setChartData(mapped);
      } catch (e) {
      } finally {
        setIsLoading(false);
      }
    };
    fetch();
    // eslint-disable-next-line
  }, [userInfo]);

  return (
    <Box sx={{ flexGrow: 1 }}>
      {/*}
      <Grid container spacing={2} justifyContent="center" alignItems="center">
        <h3>
          {pageConstants.gameBatch}: {userInfo?.gameBatch}
        </h3>
        <h3>
          {pageConstants.gameTeam}: {userInfo?.gameTeam}
        </h3>
      </Grid>
    */}
      {chartData && chartData.length > 0 && (
        <Box sx={{ mb: 2 }}>
          <ProfitPercentLineChart data={chartData} />
        </Box>
      )}
      <GenericTable
        inputTableHeadings={
          dynamicHeadings.length > 0
            ? dynamicHeadings :
            pageConstants.fallbackHeadings} // Use dynamic Column Heading
        inputTableData={tableData}
        ifNoData={null}
        hiddenColumns={pageConstants.hiddenColumns}
        highlightRowsByDetail={pageConstants.vitalRows}
      ></GenericTable>
    </Box>
  );
}
