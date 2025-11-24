import { Box, InputLabel, MenuItem, FormControl, Select } from "@mui/material";
import Grid from "@mui/material/Grid2";
import { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import GenericTable from "../../components/GenericTable.jsx";
import { useUser } from "../../core/access/userContext.jsx";
import { pageConstants } from "./constants/pageConstants.js";
import {
  getGameBatch,
  getAssetCatalogBatch,
} from "./services/service.js";
import { useLoading } from "../../hooks/loadingIndicatorContext.jsx";

// AssetCatalogBatch Component
export default function AssetCatalogBatch() {
  const { setIsLoading } = useLoading(); // Loading state management
  const { userInfo } = useUser();  // User information from context
  const [gameBatchData, setGameBatchData] = useState(null);   // State for storing game batch data
  const [selectedGameBatch, setSelectedBatch] = useState(null); // State for selected game batch
  const [getAssetCatalogBatchParam, setGetAssetCatalogBatchParam] = useState(null);// State for parameters to fetch data
  const [AssetCatalogBatch, setAssetCatalogBatch] = useState(null);  // State for storing Asset Catalog Batch data

  // Game Batch Data Fetching
  useEffect(() => {
    setIsLoading(true);
    getGameBatch({
      gameId: `${userInfo?.gameId}`,
    }).then((response) => {
      console.log("Game batch response:", response); 
      if (response) {
        setGameBatchData(response.data);
      }
    })
      .finally(() => setIsLoading(false));
  }, []);

  // Asset Catalog Batch Data Fetching
  useEffect(() => {
    // Check if parameters for fetching Asset Catalog Batch are set
    /*if (
        getAssetCatalogBatchParam?.gameId && 
        getAssetCatalogBatchParam?.gameBatch !== null && 
        !isNaN(getAssetCatalogBatchParam?.gameBatch)
        )
    */
   if ( getAssetCatalogBatchParam?.gameId && 
        getAssetCatalogBatchParam?.gameBatch ) 
        {
          setIsLoading(true);
      // Fetching Asset Catalog Batch data
         getAssetCatalogBatch(getAssetCatalogBatchParam)
           .then((response) => {
            if (response) {
               setAssetCatalogBatch(response.data);
            }
          })
          .finally(() => setIsLoading(false));
        }
  }, [getAssetCatalogBatchParam]); // Dependency on parameters to trigger API call


  // Setting Parameters for API Call to fetch Asset Catalog Batch
  useEffect(() => {
     if (selectedGameBatch) {
    //if (selectedGameBatch !== null && !isNaN(selectedGameBatch)) {
        const params = {
          gameId: userInfo?.gameId,
          gameBatch: selectedGameBatch,
       };
      setGetAssetCatalogBatchParam(params);

      // 👇 Log API call parameters
      console.log("Fetch Params:", params);
      }
  }, [selectedGameBatch]);

  // Handler for Game Batch Selection
    const onAssetCatalogBatchFormUpdate = (event) => {
    if (event.currentTarget) {
      setSelectedBatch(event.currentTarget.value);
    } else if (event.target) {
      setSelectedBatch(event.target.value);
    }
  };
  /*
 // Simple version : Handler for Game Batch Selection
 const onAssetCatalogBatchFormUpdate = (event) => {
  const value = event?.target?.value;
  const numericValue = value !== null ? Number(value) : null;  // ✅ now declared
  setSelectedBatch(numericValue);

  // 👇 Log selected value
  console.log("Selected Batch:", numericValue);
  */
//};

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
              onChange={onAssetCatalogBatchFormUpdate}
            >
              {gameBatchData && gameBatchData.length > 0 ?
                gameBatchData.map((mapObj) => (
                  /*
                  <MenuItem key={mapObj.Game_Batch} value={mapObj.Game_Batch}>
                    {mapObj.Game_Batch}
                  </MenuItem>
                  */
                 <MenuItem key={mapObj.Game_Batch} value={Number(mapObj.Game_Batch)}>
                    {mapObj.Game_Batch}
                  </MenuItem>

                )) : (<MenuItem value={null}>No Game Batch Available</MenuItem>)}
            </Select>
          </FormControl>
        </Grid>
      </Grid>
      <GenericTable
        inputTableHeadings={pageConstants.table.headers}
        inputTableData={AssetCatalogBatch}
        ifNoData={null}
        hiddenColumns={pageConstants.table.hiddenColumns}
      ></GenericTable>
    </Box>
  );
}
