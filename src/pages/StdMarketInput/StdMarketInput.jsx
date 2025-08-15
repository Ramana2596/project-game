
// Input Game Batch and Display Data & message
import { Box, InputLabel, MenuItem, FormControl, Select } from "@mui/material";
import Grid from "@mui/material/Grid2";
import Button from "@mui/material/Button";
import GenericTable from "../../components/GenericTable.jsx";
import { useUser } from "../../core/access/userContext.js";
import { useEffect, useState } from "react";
import { pageConstants } from "./constants/pageConstants.js";
import { 
  getGameBatch,
  getStdMarketInput,
} from "./services/service.js";
import { useLoading } from "../../hooks/loadingIndicatorContext.js";
import ToastMessage from "../../components/ToastMessage.jsx";

// StdMarketInput Component
export default function StdMarketInput() {
  const { setIsLoading } = useLoading(); // Loading state management
  const { userInfo } = useUser();// User information from context
  const [gameBatchData, setGameBatchData] = useState(null);// State for storing game batch data
  const [selectedGameBatch, setSelectedBatch] = useState(null);// State for selected game batch
  const [getStdMarketInputParam, setGetStdMarketInputParam] = useState(null);// State for parameters to fetch data
  const [stdMarketInput, setStdMarketInput] = useState(null);// State for storing StdMarketInput data

  const [isTableActionsEnable, setIsTableActionsEnable] = useState(false);
  const [alertData, setAlertData] = useState({
    severity: "",
    message: "",
    isVisible: false,
  });


  // Fetching game batch data
  useEffect(() => {
    setIsLoading(true);
    getGameBatch({
      gameId: `${userInfo?.gameId}`
    }).then((response) => {
      if (response) {
        // API retruns Object = response.data = data & metadata
        // Get gameBatchData Array and not message
        setGameBatchData(response.data.data);  
      }
    })
      .catch((error) => {
        setAlertData({
          severity: "error",
          message: error.response?.data?.message || "Failed to load game batches",
          isVisible: true
         });
      })
      .finally(() => setIsLoading(false));
   }, [userInfo?.gameId]); // Fetch game batches on component mount

  // Setting Parameters for API Call
  useEffect(() => {
    if (selectedGameBatch)  {
        setGetStdMarketInputParam({
          gameId: userInfo?.gameId,
          gameBatch: selectedGameBatch,
        });
    }
  }, [selectedGameBatch]); // Dependency on selected game batch to trigger API call


// Fetching StdMarketInput data for the selected game batch
  useEffect(() => {
    if (getStdMarketInputParam?.gameId && 
        getStdMarketInputParam?.gameBatch)
        {
          setIsLoading(true);

         getStdMarketInput(getStdMarketInputParam)
          .then((response) => {
            const data = response?.data?.data || [];
            const outMessage = response?.data?.message || "No data available";

            setStdMarketInput(data);

            setAlertData({
              severity: data.length > 0 ? "success" : "warning",
              message: outMessage,
              isVisible: true,
            });
          })
          .catch((error) => {
            console.error("Error fetching data:", error);
            const msg =
              error.response?.data?.message ||
              error.message ||
              "An unexpected error occurred.";  

            setAlertData({
              severity: "error",
              message: msg,
              isVisible: true});
         })
        .finally(() => setIsLoading(false));
      }
    }, [getStdMarketInputParam]); // Dependency on parameters to trigger API call

  // Handler for updating selected game batch
  const onStdMarketInputFormUpddate = (event) => {
    if (event.currentTarget) {
      setSelectedBatch(event.currentTarget.value);
    } else if (event.target) {
      setSelectedBatch(event.target.value);
    }
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid
        sx={{ margin: 5 }}
        container
        spacing={{ xs: 2, md: 3 }}
        columns={{ xs: 4, sm: 8, md: 12 }}
      >
        <Grid size={{ xs: 2, sm: 4, md: 4 }}>
          <FormControl
            required
            sx={{ flexGrow: 1, width: "100%", maxWidth: 220 }}
          >
            <InputLabel id="gameBatch">
              {pageConstants.gameBatchLabel}
            </InputLabel>
            <Select
              labelId="gameBatch"
              id="gameBatchRequired"
              name="gameBatch"
              label="Game Batch *"
              value={selectedGameBatch}
              onChange={onStdMarketInputFormUpddate}
            >
              {gameBatchData && gameBatchData.length > 0 ?
                gameBatchData.map((mapObj) => (
                  <MenuItem key={mapObj.Game_Batch} value={mapObj.Game_Batch}>
                    {mapObj.Game_Batch}
                  </MenuItem>
                )) : (<MenuItem value={""}>No Game Batch Available</MenuItem>)}
            </Select>
          </FormControl>
        </Grid>
      </Grid>
      {alertData.isVisible && (
        <ToastMessage
          open={alertData.isVisible}  // ✅ Controls visibility
          severity={alertData.severity}
          message={alertData.message}
          onClose={() => setAlertData({ ...alertData, isVisible: false })}
        />
      )}
      <GenericTable
        inputTableHeadings={pageConstants.table.headers}
        inputTableData={stdMarketInput}
        ifNoData={null}
        hiddenColumns={pageConstants.table.hiddenColumns}
      ></GenericTable>
    </Box>
  );
}
