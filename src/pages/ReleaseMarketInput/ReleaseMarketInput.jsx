import { Box } from "@mui/material";
import Grid from "@mui/material/Grid2";
import GenericTable from "../../components/GenericTable.jsx";
import { useUser } from "../../core/access/userContext.js";
import { useEffect, useState } from "react";
import { getReleaseMarketInput } from "./services/service.js";
import { pageConstants } from "./constants/pageConstants.js";

export default function ReleaseMarketInput() {
  const { userInfo } = useUser();

  const getTableDataPayload = {
    gameId: userInfo?.gameId,
    gameBatch: userInfo?.gameBatch,
    gameTeam: userInfo?.gameTeam
  };

  const [tableData, setTableData] = useState([]);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    getReleaseMarketInput(getTableDataPayload)
      .then((response) => {
        if (response?.data) {
          setTableData(response.data);
          setSuccessMessage("Successful");
          setErrorMessage("");
          setTimeout(() => setSuccessMessage(""), 3000); // auto-hide success message
        }
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        const msg =
          error.response?.data?.message || "An unexpected error occurred.";
        setErrorMessage(msg); // Shows SQL RAISERROR message
        setSuccessMessage("");
        setTimeout(() => setErrorMessage(""), 5000); // auto-hide error
      });
  }, []);

  return (
    <Box sx={{ flexGrow: 1 }}>
      {successMessage && (
        <Box sx={{ color: "green", mb: 2 }}>{successMessage}</Box>
      )}
      {errorMessage && (
        <Box sx={{ color: "red", mb: 2 }}>{errorMessage}</Box>
      )}

      <GenericTable
        inputTableHeadings={pageConstants.tableHeading}
        inputTableData={tableData}
        ifNoData={null}
        hiddenColumns={[]}
      />
    </Box>
  );
}
