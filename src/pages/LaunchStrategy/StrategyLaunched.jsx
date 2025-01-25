import { Box, InputLabel, MenuItem, FormControl, Select } from "@mui/material";
import Grid from "@mui/material/Grid2";
import { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import GenericTable from "../../components/GenericTable";
import { pageConstants } from "./constants/pageConstants";
import {
  getDashboardData,
  getStrategySetData,
  getGameBatchData,
  getStrategySetNoDataApi,
} from "./services/strategyLaunchedService";
import { useLoading } from "../../hooks/loadingIndicatorContext";

export default function StrategyLaunched() {
  const { setIsLoading } = useLoading();
  const [shouldFetchStratechLaunch, setShouldFetchStrategyLaunch] =
    useState(false);
  const [shouldFetchGameBatch, setShouldFetchGameBatch] = useState(false);
  const [shouldFetchStrategySet, setShouldFetchStrategySet] = useState(false);
  const [gameIdData, setGameIdData] = useState([]);
  const [strategyLaunchData, setStrategyLaunchData] = useState([]);
  const [gameBatchData, setGameBatchData] = useState([]);
  const [getStrategySetNoData, setGetStrategySetNoData] = useState([]);

  const initialStrategyLaunchedFormData = {
    gameId: "",
    gameBatch: "",
    strategySetNo: "",
  };

  const [strategyLaunchedFormData, setFormData] = useState(
    initialStrategyLaunchedFormData
  );

  useEffect(() => {
    getDashboardData()
      .then((response) => {
        if (response) {
          setGameIdData(response.data);
        }
      })
      .catch((err) => { })
      .finally(() => { });
  }, []);

  useEffect(() => {
    if (shouldFetchStratechLaunch) {
      setIsLoading(true);
      getStrategySetData({
        gameId: strategyLaunchedFormData?.gameId,
        gameBatch: strategyLaunchedFormData?.gameBatch,
        strategySetNo: strategyLaunchedFormData?.strategySetNo,
      }).then((response) => {
        if (response) {
          setStrategyLaunchData(response.data);
        }
      })
        .catch()
        .finally(() => setIsLoading(false));
    }

    if (shouldFetchGameBatch) {
      setIsLoading(true);
      getGameBatchData({ gameId: strategyLaunchedFormData?.gameId }).then(
        (response) => {
          if (response) {
            setGameBatchData(response.data);
          }
        }
      )
        .catch()
        .finally(() => setIsLoading(false));
    }

    if (shouldFetchStrategySet) {
      setIsLoading(true);
      getStrategySetNoDataApi({
        gameId: strategyLaunchedFormData?.gameId,
      }).then((response) => {
        if (response) {
          setGetStrategySetNoData(response.data);
        }
      })
        .catch()
        .finally(() => setIsLoading(false));
    }
  }, [shouldFetchStratechLaunch, shouldFetchGameBatch, shouldFetchStrategySet]);

  const onStrategyFormControlUpdate = (event) => {
    setShouldFetchStrategyLaunch(false);
    if (event.currentTarget) {
      setFormData({
        ...strategyLaunchedFormData,
        [event.currentTarget.id]: event.currentTarget.value,
      });
    } else if (event.target) {
      setFormData({
        ...strategyLaunchedFormData,
        [event.target.name]: event.target.value,
      });
      if (event.target.name === "gameId") {
        setShouldFetchStrategySet(true);
        setShouldFetchGameBatch(true);
      }
    }
  };

  const strategFormUpdate = () => {
    return new Promise((resolve) => {
      setTimeout(resolve, 1000);
    });
  };

  const strategyFormSubmit = (event) => {
    event.preventDefault();
    strategFormUpdate();
    setShouldFetchStrategyLaunch(true);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <form onSubmit={strategyFormSubmit}>
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
              <InputLabel id="gameId">
                {pageConstants.headers.gameIdLabel}
              </InputLabel>
              <Select
                labelId="gameId"
                id="gameIdRequired"
                name="gameId"
                value={strategyLaunchedFormData.gameId}
                label={pageConstants.headers.gameIdLabel + " *"}
                onChange={onStrategyFormControlUpdate}
              >
                {gameIdData?.map((mapObj) => (
                  <MenuItem value={mapObj.Game_Id}>
                    {mapObj.Game_Title}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid size={{ xs: 2, sm: 4, md: 4 }}>
            <FormControl
              required
              sx={{ flexGrow: 1, width: "100%", maxWidth: 220 }}
            >
              <InputLabel id="gameBatch">
                {pageConstants.headers.gameBatchLabel}
              </InputLabel>
              <Select
                labelId="gameBatch"
                id="gameBatchRequired"
                name="gameBatch"
                value={strategyLaunchedFormData.gameBatch}
                label={pageConstants.headers.gameBatchLabel + " *"}
                onChange={onStrategyFormControlUpdate}
              >
                {gameBatchData?.map((mapObj) => (
                  <MenuItem value={mapObj.Game_Batch}>
                    {mapObj.Game_Batch}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid size={{ xs: 2, sm: 4, md: 4 }}>
            <FormControl
              required
              sx={{ flexGrow: 1, width: "100%", maxWidth: 220 }}
            >
              <InputLabel id="strategySetNo">
                {pageConstants.headers.strategySetLabel}
              </InputLabel>
              <Select
                labelId="strategySetNo"
                id="strategySetNo"
                name="strategySetNo"
                value={strategyLaunchedFormData.strategySetNo}
                label={pageConstants.headers.strategySetLabel + " *"}
                onChange={onStrategyFormControlUpdate}
              >
                {getStrategySetNoData?.map((mapObj) => (
                  <MenuItem value={mapObj.Strategy_Set_No}>
                    {mapObj.Strategy_Set_No}
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
        inputTableHeadings={pageConstants.tableHeading}
        inputTableData={strategyLaunchData}
        ifNoData={null}
      ></GenericTable>
    </Box>
  );
}
