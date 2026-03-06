// src/pages/MarketFactorInfo/MarketInfo.jsx
// Purpose: Display market factor info of a game batch

import { Box, InputLabel, MenuItem, FormControl, Select } from "@mui/material";
import Grid from "@mui/material/Grid2";
import { useEffect, useState } from "react";
import GenericTable from "../../components/GenericTable.jsx";
import { useUser } from "../../core/access/userContext.jsx";
import { pageConstants } from "./constants/pageConstants.js";
import { getGameBatch, getMarketFactorInfo } from "./services/service.js";
import { useLoading } from "../../hooks/loadingIndicatorContext.jsx";

// Selection of a Game Batch and displays its Market Info
export default function MarketFactorInfo({ productionMonth }) {
  const { setIsLoading } = useLoading();
  const { userInfo } = useUser();

  // State: 
  const [gameBatchData, setGameBatchData] = useState([]); // batch LOV
  const [selectedGameBatch, setSelectedBatch] = useState("");   // selected batch
  const [marketInfo, setMarketInfo] = useState(null); // final Mkt info

  // Fetch game batches
  useEffect(() => {
    if (userInfo?.gameId) {
      setIsLoading(true);
      getGameBatch({ gameId: userInfo.gameId })
        .then((res) => {
          if (res?.data) setGameBatchData(res.data);
        })
        .finally(() => setIsLoading(false));
    }
  }, [userInfo?.gameId]);

  // Fetch market details 
  useEffect(() => {
    if (userInfo?.gameId && selectedGameBatch) {
      setIsLoading(true);
      getMarketFactorInfo({
        gameId: userInfo.gameId,
        gameBatch: selectedGameBatch,
        productionMonth: productionMonth 
      })
        .then((res) => {
          if (res?.data) setMarketInfo(res.data);
        })
        .finally(() => setIsLoading(false));
    }
  }, [selectedGameBatch, userInfo?.gameId, productionMonth]);

  // Update local batch selection state
  const onBatchChange = (event) => {
    setSelectedBatch(event.target.value);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      {/* Control Section: Batch Selection Dropdown */}
      <Grid
        sx={{ margin: 5 }}
        container
        spacing={{ xs: 2, md: 3 }}
        columns={{ xs: 4, sm: 8, md: 12 }}
      >
        <Grid size={{ xs: 2, sm: 4, md: 4 }}>
          <FormControl required sx={{ width: "100%", maxWidth: 220 }}>
            <InputLabel id="gameBatch-label">{pageConstants.gameBatchLabel}</InputLabel>
            <Select
              labelId="gameBatch-label"
              value={selectedGameBatch}
              label={pageConstants.gameBatchLabel}
              onChange={onBatchChange}
            >
              {gameBatchData.length > 0 ? (
                gameBatchData.map((item) => (
                  <MenuItem key={item.Game_Batch} value={item.Game_Batch}>
                    {item.Game_Batch}
                  </MenuItem>
                ))
              ) : (
                <MenuItem disabled value="">No Batches Available</MenuItem>
              )}
            </Select>
          </FormControl>
        </Grid>
      </Grid>

      {/* Presentation Section: Data Output Table */}
      <GenericTable
        inputTableHeadings={pageConstants.table.headers}
        inputTableData={marketInfo}
        ifNoData={null}
        hiddenColumns={pageConstants.table.hiddenColumns}
      />
    </Box>
  );
}