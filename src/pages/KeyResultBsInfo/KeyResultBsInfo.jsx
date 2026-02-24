// src/pages/KeyResultBsInfo/KeyResultBsInfo.jsx

import { Box } from "@mui/material";
import { useEffect, useState } from "react";
import GenericTable from "../../components/GenericTable.jsx";
import { useUser } from "../../core/access/userContext.jsx";
import { getKeyResultBsInfo } from "./services/service.js";
import { pageConstants } from "./constants/pageConstants.js";

export default function KeyResultBsInfo() {
  const { userInfo } = useUser();
  const [tableData, setTableData] = useState([]);

useEffect(() => {
  if (userInfo?.gameId) {
    const payLoad = {
      gameId: userInfo.gameId,
      gameBatch: userInfo.gameBatch,
      gameTeam: userInfo.gameTeam,
      productionMonth: productionMonth || null, // only from prop
    };

    getKeyResultBsInfo(payLoad).then((response) => {
      // response.data is the JSON body { success, code, data }
      // response.data.data is Array of data [...]
      if (response?.data?.success && Array.isArray(response.data.data)) {
        setTableData(response.data.data); 
      } else {
        setTableData([]);
      }
    });
  }
}, [userInfo]); // Dependency ensures it runs when userInfo is ready

  return (
    <Box sx={{ flexGrow: 1 }}>
      <GenericTable
        inputTableHeadings={pageConstants.tableHeading}
        inputTableData={tableData}
        ifNoData={null}
        hiddenColumns={pageConstants.hiddenColumns}
      />
    </Box>
  );
}