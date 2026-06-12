// file: src/pages/PublishMarketData/PublishMarketData.jsx
// Publish Market Input for a selected batch
import { Box, InputLabel, MenuItem, FormControl, Select } from "@mui/material";
import Grid from "@mui/material/Grid2";
import GenericTable from "../../components/GenericTable.jsx";
import { useUser } from "../../core/access/userContext.jsx";
import { useEffect, useState } from "react";
import { pageConstants } from "./constants/pageConstants.js";
import { getBatch, getMarketData } from "./services/service.js";
import { useLoading } from "../../hooks/loadingIndicatorContext.jsx";
import ToastMessage from "../../components/ToastMessage.jsx";

export default function PublishMarketData() {
  const { setIsLoading } = useLoading();
  const { userInfo } = useUser();

  const [batches, setBatches]       = useState([]);
  const [gameBatch, setGameBatch]   = useState("");
  const [marketData, setMarketData] = useState([]);
  const [alertData, setAlertData]   = useState({
    severity: "",
    message: "",
    isVisible: false,
  });

  // Fetch available batches on mount
  useEffect(() => {
    setIsLoading(true);
    getBatch({ gameId: `${userInfo?.gameId}` })
      .then((response) => {
        setBatches(response?.data?.data ?? []);
      })
      .catch((error) => {
        setAlertData({
          severity: "error",
          message: error.response?.data?.message || "Failed to load batches",
          isVisible: true,
        });
      })
      .finally(() => setIsLoading(false));
  }, [userInfo?.gameId]);

  // Fetch market data whenever the selected batch changes
  useEffect(() => {
    if (!gameBatch || !userInfo?.gameId) return;

    let ignore = false;
    setIsLoading(true);

    getMarketData({ gameId: userInfo.gameId, gameBatch })
      .then((response) => {
        if (ignore) return;
        const data       = response?.data?.data    ?? [];
        const outMessage = response?.data?.message ?? "No data available";

        setMarketData(data);
        setAlertData({
          severity: data.length > 0 ? "success" : "warning",
          message: outMessage,
          isVisible: true,
        });
      })
      .catch((error) => {
        if (ignore) return;
        setAlertData({
          severity: "error",
          message:
            error.response?.data?.message ||
            error.message ||
            "An unexpected error occurred.",
          isVisible: true,
        });
      })
      .finally(() => { if (!ignore) setIsLoading(false); });

    return () => { ignore = true; };
  }, [gameBatch, userInfo?.gameId]);

  const onGameBatchChange = (event) => {
    setGameBatch(event.target.value);
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
          <FormControl required sx={{ flexGrow: 1, width: "100%", maxWidth: 220 }}>
            <InputLabel id="batch-label">{pageConstants.gameBatchLabel}</InputLabel>
            <Select
              labelId="batch-label"
              id="batch-select"
              name="Batch"
              label="Batch *"
              value={gameBatch}
              onChange={onGameBatchChange}
            >
              {batches.length > 0 ? (
                batches.map((item) => (
                  <MenuItem key={item.Game_Batch} value={item.Game_Batch}>
                    {item.Game_Batch}
                  </MenuItem>
                ))
              ) : (
                <MenuItem value="">No batch is open</MenuItem>
              )}
            </Select>
          </FormControl>
        </Grid>
      </Grid>

      {alertData.isVisible && (
        <ToastMessage
          open={alertData.isVisible}
          severity={alertData.severity}
          message={alertData.message}
          onClose={() => setAlertData((prev) => ({ ...prev, isVisible: false }))}
        />
      )}

      <GenericTable
        inputTableHeadings={pageConstants.table.headers}
        inputTableData={marketData}
        ifNoData={null}
        hiddenColumns={pageConstants.table.hiddenColumns}
      />
    </Box>
  );
}