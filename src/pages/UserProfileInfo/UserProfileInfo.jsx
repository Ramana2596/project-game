import { useEffect, useState } from "react";
import { Box } from "@mui/material";
import GenericTable from "../../components/GenericTable.jsx";
import { useUser } from "../../core/access/userContext.jsx";
import { pageConstants } from "./constants/pageConstants.js";
import { getUserProfileInfo } from "./services/service.js";

export default function UserProfileInfo() {
  const { userInfo } = useUser();
  const gameId = userInfo?.gameId;
  const [tableData, setTableData] = useState([]);

  useEffect(() => {
    if (!gameId) return;

    getUserProfileInfo({ gameId }).then((response) => {
      if (response) setTableData(response.data || []);
    });
  }, [gameId]);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <GenericTable
        inputTableHeadings={pageConstants.tableHeading}
        inputTableData={tableData}
        ifNoData={null}
        hiddenColumns={pageConstants.hiddenColumns}
        dateFormatColumns={pageConstants.dateFormatColumns}
      />
    </Box>
  );
}