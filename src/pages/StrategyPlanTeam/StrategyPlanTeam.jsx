import { Box } from "@mui/material";
import GenericTable from "../../components/GenericTable.jsx";
import { useUser } from "../../core/access/userContext.jsx";
import { useEffect, useState } from "react";
import { getStrategyPlanTeam } from "./services/service.js";
import { pageConstants } from "./constants/pageConstants.js";

export default function StrategyPlanTeam() {
  const { userInfo } = useUser();
  const [tableData, setTableData] = useState([]);

  // Fetch Strategy Plan for the current team
  useEffect(() => {
    const payload = {
      gameId: userInfo?.gameId,
      gameBatch: userInfo?.gameBatch,
      gameTeam: userInfo?.gameTeam,
    };

    getStrategyPlanTeam(payload)
      .then((response) => {
        setTableData(response.data);
      })
      .catch((error) => {
        console.error("Failed to fetch Strategy Plan:", error);
        setTableData([]);
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
      />
    </Box>
  );
}