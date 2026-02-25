import { Box } from "@mui/material";
import Grid from "@mui/material/Grid2";
import GenericTable from "../../components/GenericTable";
import { useUser } from "../../core/access/userContext.jsx";
import { pageConstants } from "./constants/pageConstants.js";
import { useEffect, useState } from "react";
import {
  getDashboardData,
  getOpsPlanData,
} from "./services/service.js";
import { useLoading } from "../../hooks/loadingIndicatorContext.jsx";


export default function OperationalPlanInfo({ productionMonth }) {  // productionMonth as prop
  const { setIsLoading } = useLoading();
  const { userInfo } = useUser();
  const [gameData, setGameData] = useState(null);
  const [OpsPlanData, setOpsPlanData] = useState(null);

  let payload = {
    gameId: userInfo?.gameId,
    gameBatch: userInfo?.gameBatch,
    gameTeam: userInfo?.gameTeam,
    productionMonth: productionMonth,
  };

  useEffect(() => {
    setIsLoading(true);
    getDashboardData()
      .then((response) => {
        if (response) {
          setGameData(response.data);
        }
      })
      .catch((err) => { })
      .finally(() => setIsLoading(false));

    getOpsPlanData(payload).then((response) => {
      if (response) {
        setOpsPlanData(response.data.data);
      }
    })
      .catch((err) => { })
      .finally(() => setIsLoading(false));
  }, []);

  if (!gameData) return <div>...Loading</div>;

  return (
    <Box sx={{ flexGrow: 1 }}>
      {/*}
      <Grid container margin={3} spacing={2}>
        <h3 className="standard-title-color">{pageConstants.gameBatch}: {userInfo?.gameBatch}</h3>
        <h3 className="standard-title-color">{pageConstants.gameTeam}: {userInfo?.gameTeam}</h3>
      </Grid>
      */}
      <GenericTable
        inputTableHeadings={pageConstants.tableHeading}
        inputTableData={OpsPlanData}
        ifNoData={null}
        highlightColumnsByField={pageConstants.highlightedColumns}
        hiddenColumns={pageConstants.hiddenColumns}
      ></GenericTable>
    </Box>
  );
}
