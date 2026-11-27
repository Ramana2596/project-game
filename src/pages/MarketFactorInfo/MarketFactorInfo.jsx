import { useEffect, useState } from "react";
import { Box, FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import Grid from "@mui/material/Grid2";
import GenericTable from "../../components/GenericTable.jsx";
import { useUser } from "../../core/access/userContext.jsx";
import { useLoading } from "../../hooks/loadingIndicatorContext.jsx";
import { pageConstants } from "./constants/pageConstants.js";
import { getBatch, getMarketInfo } from "./services/mFService.js";

export default function MarketFactorInfo() {
  const { setIsLoading } = useLoading();
  const { userInfo } = useUser();
  const gameId = userInfo?.gameId;

  const [batchList, setBatchList] = useState([]);
  const [selectedBatch, setSelectedBatch] = useState("");
  const [marketFactorInfo, setMarketFactorInfo] = useState(null);

  // Load available batches for the current game
  useEffect(() => {
    if (!gameId) return;

    setIsLoading(true);
    getBatch({ gameId: `${gameId}` })
      .then((res) => setBatchList(res?.data || []))
      .finally(() => setIsLoading(false));
  }, [gameId]);

  // Load market info whenever a batch is selected
  useEffect(() => {
    if (!gameId || !selectedBatch) return;

    setIsLoading(true);
    getMarketInfo({ gameId, gameBatch: selectedBatch })
      .then((res) => setMarketFactorInfo(res?.data || null))
      .finally(() => setIsLoading(false));
  }, [gameId, selectedBatch]);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid
        container
        sx={{ margin: 5 }}
        spacing={{ xs: 2, md: 3 }}
        columns={{ xs: 4, sm: 8, md: 12 }}
      >
        <Grid size={{ xs: 2, sm: 4, md: 4 }}>
          <FormControl required sx={{ width: "100%", maxWidth: 220 }}>
            <InputLabel id="gameBatch">{pageConstants.gameBatchLabel}</InputLabel>
            <Select
              labelId="gameBatch"
              id="gameBatchRequired"
              name="gameBatch"
              label={`${pageConstants.gameBatchLabel} *`}
              value={selectedBatch}
              onChange={(e) => setSelectedBatch(e.target.value)}
            >
              {batchList.length > 0 ? (
                batchList.map(({ Game_Batch }) => (
                  <MenuItem key={Game_Batch} value={Game_Batch}>
                    {Game_Batch}
                  </MenuItem>
                ))
              ) : (
                <MenuItem value="" disabled>
                  No Game Batch Available
                </MenuItem>
              )}
            </Select>
          </FormControl>
        </Grid>
      </Grid>

      <GenericTable
        inputTableHeadings={pageConstants.table.headers}
        inputTableData={marketFactorInfo}
        ifNoData={null}
        hiddenColumns={pageConstants.table.hiddenColumns}
      />
    </Box>
  );
}