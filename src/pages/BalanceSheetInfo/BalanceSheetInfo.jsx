import { Box } from "@mui/material";
import Grid from "@mui/material/Grid2";
import GenericTable from "../../components/GenericTable.jsx";
import { useUser } from "../../core/access/userContext.js";
import { useEffect, useState } from "react";
import { getBalanceSheetInfo } from "./services/balanceSheetInfoService.js";
import { pageConstants } from "./constants/pageConstants.js";
import InventoryLineChart from "../GameDashboard/components/InventoryLineChart.jsx";
import { getChartInfo } from "../GameDashboard/services/gameDashboard.js";
import { useLoading } from "../../hooks/loadingIndicatorContext.js";

export default function BalanceSheetInfo() {
  const { userInfo } = useUser();
  const { setIsLoading } = useLoading();
  let getBalanceSheetInfoParams = {
    gameId: userInfo?.gameId,
    gameBatch: userInfo?.gameBatch,
    gameTeam: userInfo?.gameTeam,
  };
  const [tableData, setTableData] = useState([]);
  const [chartData, setChartData] = useState([]);
  useEffect(() => {
    getBalanceSheetInfo(getBalanceSheetInfoParams).then((response) => {
      if (response) {
        setTableData(response.data);
      }
    });
  }, []);

  useEffect(() => {
    const fetch = async () => {
      if (!userInfo?.gameId || !userInfo?.gameBatch || !userInfo?.gameTeam) return;
      setIsLoading(true);
      try {
        const params = {
          gameId: userInfo.gameId,
          gameBatch: userInfo.gameBatch,
          gameTeam: userInfo.gameTeam,
          cmdLine: 'Total_Inventory',
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
        // ignore, keep silent; table will still render
      } finally {
        setIsLoading(false);
      }
    };
    fetch();
    // eslint-disable-next-line
  }, [userInfo]);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2} justifyContent="center" alignItems="center">
        <h3>
          {pageConstants.gameBatch}: {userInfo?.gameBatch}
        </h3>
        <h3>
          {pageConstants.gameTeam}: {userInfo?.gameTeam}
        </h3>
      </Grid>
      {/* Chart above table */}
      {chartData && chartData.length > 0 && (
        <Box sx={{ mb: 2 }}>
          <InventoryLineChart data={chartData} />
        </Box>
      )}
      <GenericTable
        inputTableHeadings={pageConstants.tableHeading}
        inputTableData={tableData}
        ifNoData={null}
        hiddenColumns={[]}
        highlightRowsByDetail={pageConstants.vitalRows}
      ></GenericTable>
    </Box>
  );
}
