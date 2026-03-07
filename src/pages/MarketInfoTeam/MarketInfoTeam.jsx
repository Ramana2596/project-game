import { Box } from "@mui/material";
import Grid from "@mui/material/Grid2";
import GenericTable from "../../components/GenericTable.jsx";
import { useUser } from "../../core/access/userContext.jsx";
import { useEffect, useState } from "react";
import { getMarketInfoTeam } from "./services/service.js";
import { pageConstants } from "./constants/pageConstants.js";

export default function MarketInfoTeam({productionMonth}) { // as prop from parent component
  const { userInfo } = useUser();
  let payload = {
    gameId: userInfo?.gameId,
    gameBatch: userInfo?.gameBatch,
    gameTeam: userInfo?.gameTeam,
    productionMonth: productionMonth  // as prop 
  };
  const [tableData, setTableData] = useState([]);
  useEffect(() => {
    getMarketInfoTeam(payload).then((response) => {
      if (response) {
        setTableData(response.data);
      }
    });
  }, []);

  return (
    <Box sx={{ flexGrow: 1 }}>

      <GenericTable
        inputTableHeadings={pageConstants.tableHeading}
        inputTableData={tableData}
        ifNoData={null}
        highlightColumnsByField={pageConstants.highlightedColumns}
        hiddenColumns={pageConstants.hiddenColumns}
      ></GenericTable>

    </Box>
  );
}
