import { Box } from "@mui/material";
import Grid from "@mui/material/Grid2";
import GenericTable from "../../components/GenericTable.jsx";
import { useUser } from "../../core/access/userContext.js";
import { useEffect, useState } from "react";
import { getIncomeStatementInfo } from "./services/incomeStatementInfoService.js";

export default function IncomeStatementInfo() {
  const { userInfo } = useUser();
  let getOperationalPlanInfoParam = {
    gameId: userInfo?.gameId,
    gameBatch: userInfo?.gameBatch,
    gameTeam: userInfo?.gameTeam,
  };
  const [tableData, setTableData] = useState([]);
  useEffect(() => {
    getIncomeStatementInfo(getOperationalPlanInfoParam).then((response) => {
      if (response) {
        setTableData(response.data);
      }
    });
  }, []);
  let tableHeading = [
    "Line_no",
    "Details",
    "PrvYear_End",
    "Period_1",
    "Period_2",
    "Period_3",
    "Period_4",
    "Period_5",
    "Period_6",
    "Period_7",
    "Period_8",
    "Period_9",
    "Period_10",
    "Period_11",
    "Period_12",
  ];

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2} justifyContent="center" alignItems="center">
        <h1>Operational Plan Info</h1>
      </Grid>
      <Grid container spacing={2} justifyContent="center" alignItems="center">
        <h3>Game Batch: {userInfo?.gameBatch}</h3>
        <h3>Game Team: {userInfo?.gameTeam}</h3>
      </Grid>
      <GenericTable
        inputTableHeadings={tableHeading}
        inputTableData={tableData}
        ifNoData={null}
        hiddenColumns={[]}
      ></GenericTable>
    </Box>
  );
}
