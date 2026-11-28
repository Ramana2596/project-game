// FgStockInfo.jsx
// Purpose: Display FG closing stock of a team (GET, response.data is the array)

import { Box } from "@mui/material";
import GenericTable from "../../components/GenericTable.jsx";
import { useUser } from "../../core/access/userContext.jsx";
import { useEffect, useState } from "react";
import { getFgStockInfo } from "./services/service.js";
import { pageConstants } from "./constants/pageConstants.js";

export default function FgStockInfo({ productionMonth }) { // productionMonth: optional prop from parent (YYYY-MM-DD)
  const { userInfo } = useUser();
  const [tableData, setTableData] = useState([]);          // rows shown in the table

  // Fetch data on load, and again whenever user info or productionMonth changes
  useEffect(() => {
    if (!userInfo?.gameId) return;

    let ignore = false;    // ignore a late response from an older call

    // Query parameters
    const payLoad = {
      gameId: userInfo.gameId,
      gameBatch: userInfo.gameBatch,
      gameTeam: userInfo.gameTeam,
      productionMonth: productionMonth || null,
    };

    getFgStockInfo(payLoad)
      .then((response) => {
        // Success: API returns a plain array, so response.data is the rows
        if (!ignore) setTableData(Array.isArray(response?.data) ? response.data : []);
      })
      .catch((err) => {
        // 400 / 500: log server text and clear the table
        console.error(err?.response?.data || err);
        if (!ignore) setTableData([]);
      });

    return () => { ignore = true; };  // cleanup when inputs change or page closes
  }, [userInfo?.gameId, userInfo?.gameBatch, userInfo?.gameTeam, productionMonth]);

  return (
    <Box sx={{ flexGrow: 1 }}>
      {/* Stock table: headings, hidden, highlighted and date columns from pageConstants */}
      <GenericTable
        inputTableHeadings={pageConstants.tableHeading}
        inputTableData={tableData}
        ifNoData={null}
        highlightColumnsByField={pageConstants.highlightedColumns}
        hiddenColumns={pageConstants.hiddenColumns}
        dateFormatColumns={pageConstants.dateFormatColumns}
      ></GenericTable>
    </Box>
  );
}