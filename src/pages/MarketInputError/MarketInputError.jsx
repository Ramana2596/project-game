import { Box } from "@mui/material";
import Grid from "@mui/material/Grid2";
import GenericTable from "../../components/GenericTable.jsx";
import { useUser } from "../../core/access/userContext.js";
import { useEffect, useState } from "react";
import { getMarketInputError} from "./services/service.js";
import { pageConstants } from "./constants/pageConstants.js";

export default function MarketInputError() {
  const { userInfo } = useUser();
  let getTableDataPayload = {
    gameId: userInfo?.gameId,
    gameBatch: userInfo?.gameBatch
  };
  const [tableData, setTableData] = useState([]);
  useEffect(() => {
    getMarketInputError(getTableDataPayload).then((response) => {
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
        hiddenColumns={[]}
      ></GenericTable>
      
    </Box>
  );
}
