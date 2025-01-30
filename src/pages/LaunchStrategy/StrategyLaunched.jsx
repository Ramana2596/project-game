import { Box, InputLabel, MenuItem, FormControl, Select } from "@mui/material";
import Grid from "@mui/material/Grid2";
import { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import GenericTable from "../../components/GenericTable";
import { pageConstants } from "./constants/pageConstants";
import {
  getGameId,
  getStrategySetData,
  getGameBatchData,
  getStrategySetNoDataApi,
  updateStrategyLaunchData,
} from "./services/strategyLaunchedService";
import { useLoading } from "../../hooks/loadingIndicatorContext";
import { useUser } from "../../core/access/userContext";
import ToastMessage from "../../components/ToastMessage";
import NotificationMessage from "../../components/NotificationMessage";

export default function StrategyLaunched() {
  const { userInfo } = useUser();
  const { setIsLoading } = useLoading();
  const [shouldUpdateStrategyLaunch, setShouldUpdateStrategyLaunch] =
    useState(false);
  const [shouldFetchGameBatch, setShouldFetchGameBatch] = useState(false);
  const [shouldFetchStrategySet, setShouldFetchStrategySet] = useState(false);
  const [gameIdData, setGameIdData] = useState([userInfo?.gameId]);
  const [strategyLaunchData, setStrategyLaunchData] = useState([]);
  const [gameBatchData, setGameBatchData] = useState([]);
  const [getStrategySetNoData, setGetStrategySetNoData] = useState([]);
  const [noDataMessage, setNoDataMessage] = useState("");

  const [strategyLaunchedFormData, setFormData] = useState(
    pageConstants.initialStrategyLaunchedFormData
  );

  const [alertData, setAlertData] = useState({
    severity: "",
    message: "",
    isVisible: false,
  });

  //Get Table Data
  useEffect(() => {
    if (strategyLaunchedFormData?.gameId && strategyLaunchedFormData?.gameBatch && strategyLaunchedFormData?.strategySetNo) {
      setIsLoading(true);
      getStrategySetData({
        gameId: strategyLaunchedFormData.gameId,
        gameBatch: strategyLaunchedFormData.gameBatch,
        strategySetNo: strategyLaunchedFormData.strategySetNo,
      }).then((response) => {
        if (response && response.data && response.data.length > 0) {
          setStrategyLaunchData(response.data);
        } else {
          setNoDataMessage(pageConstants.noDataAvailable);
        }
      })
        .catch()
        .finally(() => setIsLoading(false));
    }
  }, [strategyLaunchedFormData]);

  useEffect(() => {
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
  }, [shouldFetchGameBatch, shouldFetchStrategySet]);

  //Update Strategy Launch Data
  useEffect(() => {
    if (shouldUpdateStrategyLaunch) {
      setIsLoading(true);
      updateStrategyLaunchData({
        gameId: strategyLaunchedFormData.gameId,
        gameBatch: strategyLaunchedFormData.gameBatch,
        strategySetNo: strategyLaunchedFormData.strategySetNo,
      }).then((response) => {
        if (response) {
          setAlertData({
            severity: "success",
            message: pageConstants.updateStrategySuccessMsg,
            isVisible: true,
          });
        }
      })
        .catch((err) => {
          setAlertData({
            severity: "error",
            message: pageConstants.updateStrategyFailureMsg + err?.response?.data?.error,
            isVisible: true,
          });
        })
        .finally(() => setIsLoading(false));
    }
  }, [shouldUpdateStrategyLaunch]);

  const onStrategyFormControlUpdate = (event) => {
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
    setShouldUpdateStrategyLaunch(true);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <form onSubmit={strategyFormSubmit}>
        <Grid
          sx={{ margin: 2 }}
          container
          spacing={{ xs: 2, md: 3 }}
          columns={{ xs: 4, sm: 8, md: 12 }}
        >
          <Grid size={{ xs: 0, sm: 2, md: 2 }}>
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
                {gameIdData?.map((value) => (
                  <MenuItem value={value}>
                    {value}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid size={{ xs: 0, sm: 2, md: 2 }}>
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
          <Grid size={{ xs: 0, sm: 2, md: 2 }}>
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
          <Grid container size={{ xs: 0, sm: 2, md: 2 }} justifyContent="center" alignItems="center">
            <Button disabled={strategyLaunchData?.length === 0} type="submit" variant="contained">
              {pageConstants.submitBtnLabel}
            </Button>
          </Grid>
        </Grid>
      </form>
      {strategyLaunchData.length > 0 ? (
        <GenericTable
          inputTableHeadings={pageConstants.tableHeading}
          inputTableData={strategyLaunchData}
          ifNoData={null}
        ></GenericTable>
      ) : (
        noDataMessage ? <NotificationMessage message={noDataMessage} /> : null
      )}
      <ToastMessage
        open={alertData.isVisible}
        severity={alertData.severity}
        message={alertData.message}
      />
    </Box>
  );
}
