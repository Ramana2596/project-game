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

export default function StdMarketInputNew() {
  const { setIsLoading } = useLoading();
  const [getStdMarketInputNewParam, setGetMarketInfoParam] = useState(null);
  const [selectedGameBatch, setSelectedBatch] = useState(null);
  const { userInfo } = useUser();
  const [stdMarketInputNew, setStdMarketInputNew] = useState(null);
  const [gameBatchData, setGameBatchData] = useState(null);

  useEffect(() => {
    setIsLoading(true);
    getGameBatch({
      gameId: `${userInfo?.gameId}`,
    }).then((response) => {
      if (response) {
        setGameBatchData(response.data);
      }
    })
      .finally(() => setIsLoading(false));
  }, []);

  useEffect(() => {
    if (getStdMarketInputNewParam?.gameId && getStdMarketInputNewParam?.gameBatch) {
      setIsLoading(true);
      getStdMarketInputNew(getStdMarketInputNewParam).then((response) => {
        if (response) {
          setStdMarketInputNew(response.data);
        }
      })
        .finally(() => setIsLoading(false));
    }
  }, [getStdMarketInputNewParam]);

  useEffect(() => {
    if (selectedGameBatch) {
      setGetMarketInfoParam({
        gameId: userInfo?.gameId,
        gameBatch: selectedGameBatch,
      });
    }
  }, [selectedGameBatch]);

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
