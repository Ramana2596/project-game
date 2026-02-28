import { Box } from "@mui/material";
import Grid from "@mui/material/Grid2";
import GenericTable from "../../components/GenericTable.jsx";
import { useUser } from "../../core/access/userContext.jsx";
import { useEffect, useState } from "react";
import { getRmStockInfo } from "./services/service.js";
import { pageConstants } from "./constants/pageConstants.js";

export default function RmStockInfo({ productionMonth }) { //prop from parent call
  const { userInfo } = useUser();
  const [tableData, setTableData] = useState([]);

  let payload = {
    gameId: userInfo?.gameId,
    gameBatch: userInfo?.gameBatch,
    gameTeam: userInfo?.gameTeam,
    productionMonth: productionMonth // as prop
  };
  useEffect(() => {
    if (userInfo?.gameId) {
      const payLoad = {
        gameId: userInfo.gameId,
        gameBatch: userInfo.gameBatch,
        gameTeam: userInfo.gameTeam,
        productionMonth: productionMonth || null,   // use injected prop only
      };
      getRmStockInfo(payLoad).then((response) => {
        // response.data is the JSON body { success, code, data }
        // response.data.data is Array of data [...]
        if (response?.data?.success && Array.isArray(response.data.data)) {
          setTableData(response.data.data);
        } else {
          setTableData([]);
        }
      });
    }
  }, []);

  return (
    <Box sx={{ flexGrow: 1 }}>
      {/*}
      <Grid container spacing={2} margin={3}>
        <h3 className="standard-title-color">
          {pageConstants.gameBatch}: {userInfo?.gameBatch}
        </h3>
        <h3 className="standard-title-color">
          {pageConstants.gameTeam}: {userInfo?.gameTeam}
        </h3>
      </Grid>
      */}
      <GenericTable
        inputTableHeadings={pageConstants.tableHeading}
        inputTableData={tableData}
        ifNoData={null}
        hiddenColumns={[]}
      ></GenericTable>
    </Box>
  );
}
