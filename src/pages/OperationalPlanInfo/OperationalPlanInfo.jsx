import { Box } from "@mui/material";
import Grid from "@mui/material/Grid2";
import GenericTable from "../../components/GenericTable";
import { useUser } from "../../core/access/userContext.js";
import { pageConstants } from "./constants/pageConstants.js";
import { useEffect, useState } from "react";
import {
  getDashboardData,
  getOperationalDecisionData,
} from "./services/operationalDecisionService.js";

export default function OperationalPlanInfo() {
  const { userInfo } = useUser();
  const [gameData, setGameData] = useState(null);
  const [operationalInfoData, setOperationalInfoData] = useState(null);

  let getOperationalPlanInfoParam = {
    gameId: userInfo?.gameId,
    gameBatch: userInfo?.gameBatch,
    gameTeam: userInfo?.gameTeam,
  };

  useEffect(() => {
    getDashboardData()
      .then((response) => {
        if (response) {
          setGameData(response.data);
        }
      })
      .catch((err) => {})
      .finally(() => {});

    getOperationalDecisionData(getOperationalPlanInfoParam).then((response) => {
      if (response) {
        setOperationalInfoData(response.data);
      }
    });
  }, []);

  if (!gameData) return <div>...Loading</div>;

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2} justifyContent="center" alignItems="center">
        <h1>{pageConstants.pageTitle}</h1>
      </Grid>
      <Grid container spacing={2} justifyContent="center" alignItems="center">
        <h3>
          {pageConstants.gameBatch}: {userInfo?.gameBatch}
        </h3>
        <h3>
          {pageConstants.gameTeam}: {userInfo?.gameTeam}
        </h3>
      </Grid>
      <GenericTable
        inputTableHeadings={pageConstants.tableHeading}
        inputTableData={operationalInfoData}
        ifNoData={null}
        hiddenColumns={pageConstants.hiddenColumns}
      ></GenericTable>
    </Box>
  );
}
