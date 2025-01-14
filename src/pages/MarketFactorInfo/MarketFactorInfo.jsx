import { Box, InputLabel, MenuItem, FormControl, Select } from "@mui/material";
import Grid from "@mui/material/Grid2";
import { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import GenericTable from "../../components/GenericTable.jsx";
import { useUser } from "../../core/access/userContext.js";
import { pageConstants } from "./constants/pageConstants.js";
import {
  getGameBatch,
  getMarketFactorInfo,
} from "./services/marketFactorInfoService.js";

export default function MarketFactorInfo() {
  const [shouldFetchMarketFactorInfo, setShouldFetchMarketFactorInfo] =
    useState(false);
  const [getMarketFactorInfoParam, setGetMarketInfoParam] = useState(null);
  const [selectedGameBatch, setSelectedBatch] = useState(null);
  const { userInfo } = useUser();
  const [marketFactorInfo, setMarketFactorInfo] = useState(null);
  const [gameBatchData, setGameBatchData] = useState(null);

  useEffect(() => {
    getGameBatch({
      gameId: `${userInfo?.gameId}`,
    }).then((response) => {
      if (response) {
        setGameBatchData(response.data);
      }
    });
  }, []);

  useEffect(() => {
    if (shouldFetchMarketFactorInfo) {
      getMarketFactorInfo(getMarketFactorInfoParam).then((response) => {
        if (response) {
          setMarketFactorInfo(response.data);
        }
      });
    }
  }, [shouldFetchMarketFactorInfo]);

  const onMarketFactorInfoFormUpddate = (event) => {
    setShouldFetchMarketFactorInfo(false);
    if (event.currentTarget) {
      setSelectedBatch(event.currentTarget.value);
    } else if (event.target) {
      setSelectedBatch(event.target.value);
    }
  };

  const marketFormInfoSumbit = (event) => {
    event.preventDefault();
    setGetMarketInfoParam({
      gameId: userInfo?.gameId,
      gameBatch: selectedGameBatch,
    });
    setShouldFetchMarketFactorInfo(true);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <form onSubmit={marketFormInfoSumbit}>
        <Grid container spacing={2} justifyContent="center" alignItems="center">
          <h1>{pageConstants.pageTitle}</h1>
        </Grid>
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
                onChange={onMarketFactorInfoFormUpddate}
              >
                {gameBatchData?.map((mapObj) => (
                  <MenuItem value={mapObj.Game_Batch}>
                    {mapObj.Game_Batch}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
        </Grid>
        <Grid container spacing={2} justifyContent="center" alignItems="center">
          <Button type="submit" variant="contained">
            {pageConstants.submitBtnLabel}
          </Button>
        </Grid>
      </form>
      <GenericTable
        inputTableHeadings={pageConstants.table.headers}
        inputTableData={marketFactorInfo}
        ifNoData={null}
        hiddenColumns={pageConstants.table.hiddenColumns}
      ></GenericTable>
    </Box>
  );
}
