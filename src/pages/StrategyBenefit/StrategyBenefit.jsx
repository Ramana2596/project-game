import { Box } from "@mui/material";
import Grid from "@mui/material/Grid2";
import GenericTable from "../../components/GenericTable.jsx";
import { useUser } from "../../core/access/userContext.jsx";
import { useEffect, useState } from "react";
import { getStrategyBenefit } from "./services/service.js";
import { pageConstants } from "./constants/pageConstants.js";

export default function StrategySetCollection() {
  const { userInfo } = useUser();
  let payload = {
    gameId: userInfo?.gameId
  };
  const [tableData, setTableData] = useState([]);
  useEffect(() => {
    getStrategyBenefit(payload).then((response) => {
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
        highlightColumnsByField= {pageConstants.highlightedColumns}
        hiddenColumns= {pageConstants.hiddenColumns}
      ></GenericTable>

    </Box>
  );
}
