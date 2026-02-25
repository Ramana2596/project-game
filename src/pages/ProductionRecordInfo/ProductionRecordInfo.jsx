// src/pages/ProductionRecordInfo/ProductionRecordInfo.jsx
// Purpose: Display Production Record Info

import { Box } from "@mui/material";
import Grid from "@mui/material/Grid2";
import GenericTable from "../../components/GenericTable.jsx";
import { useUser } from "../../core/access/userContext.jsx";
import { useEffect, useState } from "react";
import { getProductionInfo } from "./services/service.js";
import { pageConstants } from "./constants/pageConstants.js";

export default function ProductionRecordInfo({ productionMonth }) {  // productionMonth as prop
  const { userInfo } = useUser();
  let payload = {
    gameId: userInfo?.gameId,
    gameBatch: userInfo?.gameBatch,
    gameTeam: userInfo?.gameTeam,
    productionMonth: productionMonth || null,   // use injected prop only
  };
  const [tableData, setTableData] = useState([]);
  
  // Fetch production info 
  useEffect(() => {
    getProductionInfo(payload).then((response) => {
      if (response) {
        setTableData(response.data.data);
      }
    });
  }, []);

  // Render the table with production info
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
