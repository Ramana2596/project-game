import { Box } from "@mui/material";
import Grid from "@mui/material/Grid2";
import GenericTable from "../../components/GenericTable.jsx";
import { useUser } from "../../core/access/userContext.js";
import { useEffect, useState } from "react";
import { getMfgRoutingInfo} from "./services/service.js";
import { pageConstants } from "./constants/pageConstants.js";

export default function MfgRoutingInfo() {
  const { userInfo } = useUser();
  let getTableDataPayload = {
    gameId: userInfo?.gameId,
    gameBatch: userInfo?.gameBatch,
    gameTeam: userInfo?.gameTeam,
  };
  const [tableData, setTableData] = useState([]);
  useEffect(() => {
    getMfgRoutingInfo(getTableDataPayload).then((response) => {
      if (response) {
        setTableData(response.data);
      }
    });
  }, []);

  return (
    <Box sx={{ flexGrow: 1 }}>
      /*<Grid container spacing={2} justifyContent="center" alignItems="center">
        <h3>
          {pageConstants.gameBatch}: {userInfo?.gameBatch}
        </h3>
        <h3>
          {pageConstants.gameTeam}: {userInfo?.gameTeam}
        </h3>
      </Grid> */
      <GenericTable
        inputTableHeadings={pageConstants.tableHeading}
        inputTableData={tableData}
        ifNoData={null}
        hiddenColumns={[]}
      ></GenericTable>
    </Box>
  );
}
