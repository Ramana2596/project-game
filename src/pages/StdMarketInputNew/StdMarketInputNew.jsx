// src/pages/StdMarketInputNew/StdMarketInputNew.jsx
import { Box, InputLabel, MenuItem, FormControl, Select } from "@mui/material";
import Grid from "@mui/material/Grid2";
import { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import GenericTable from "../../components/GenericTable.jsx";
import { useUser } from "../../core/access/userContext.js";
import { pageConstants } from "./constants/pageConstants.js";
import {
  getGameBatch,
  getStdMarketInputNew,
} from "./services/service.js";
import { useLoading } from "../../hooks/loadingIndicatorContext.js";

// StdMarketInputNew Component
export default function StdMarketInputNew() {
  const { setIsLoading } = useLoading(); // Loading state management
  const { userInfo } = useUser();// User information from context
  const [gameBatchData, setGameBatchData] = useState(null);// State for storing game batch data
  const [selectedGameBatch, setSelectedBatch] = useState(null);// State for selected game batch
  const [getStdMarketInputNewParam, setGetStdMarketInputNewParam] = useState(null);// State for parameters to fetch data
  const [stdMarketInputNew, setStdMarketInputNew] = useState(null);// State for storing StdMarketInputNew data

// Fetching game batch data
  useEffect(() => {
    setIsLoading(true);
    getGameBatch({
      gameId: `${userInfo?.gameId}`
    }).then((response) => {
      if (response) {
        setGameBatchData(response.data);
      }
    })
      .finally(() => setIsLoading(false));
  }, []);

// Setting Parameters for API Call, once game batch is selected
  useEffect(() => {
    //if (selectedGameBatch) {
     // ✅ FIX: Allow 0 as valid Game_Batch ID
    if (selectedGameBatch !== null && selectedGameBatch !== undefined) {
      setGetStdMarketInputNewParam({
        gameId: userInfo?.gameId,
        gameBatch: selectedGameBatch,
      });
    }
  }, [selectedGameBatch]); // Update parameters when selected game batch changes


// Fetching StdMarketInputNew data for the selected game batch
  useEffect(() => {
    //if (getStdMarketInputNewParam?.gameId && 
    //    getStdMarketInputNewParam?.gameBatch)
     // ✅ FIX: Allow 0 as valid Game_Batch ID
    if (getStdMarketInputNewParam?.gameId != null && 
        getStdMarketInputNewParam?.gameBatch != null)
        {
          setIsLoading(true);
          getStdMarketInputNew(getStdMarketInputNewParam).then((response) => {
            if (response) {
              setStdMarketInputNew(response.data);
            }
          })
        .finally(() => setIsLoading(false));
    }
  }, [getStdMarketInputNewParam]); // Dependency on parameters to trigger API call

  // Event Handler for updating selected game batch done thru the dropdown
  // This will trigger the API call to fetch StdMarketInputNew data
  const onStdMarketInputNewFormUpddate = (event) => {
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
              onChange={onStdMarketInputNewFormUpddate}
            >
              {gameBatchData && gameBatchData.length > 0 ?
                gameBatchData.map((mapObj) => (
                  <MenuItem key={mapObj.Game_Batch} value={mapObj.Game_Batch}>
                    {mapObj.Game_Batch}
                  </MenuItem>
                )) : (<MenuItem value={null}>No Game Batch Available</MenuItem>)}
            </Select>
          </FormControl>
        </Grid>
      </Grid>
      <GenericTable
        inputTableHeadings={pageConstants.table.headers}
        inputTableData={stdMarketInputNew}
        ifNoData={null}
        hiddenColumns={pageConstants.table.hiddenColumns}
      ></GenericTable>
    </Box>
  );
}
