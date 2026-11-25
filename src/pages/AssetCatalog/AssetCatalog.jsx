
import { Box, InputLabel, MenuItem, FormControl, Select } from "@mui/material";
import Grid from "@mui/material/Grid2";
import { useEffect, useState } from "react";
import GenericTable from "../../components/GenericTable.jsx";
import { useUser } from "../../core/access/userContext.jsx";
import { pageConstants } from "./constants/pageConstants.js";
import { getBatch, getCatalog } from "./services/service.js";
import { useLoading } from "../../hooks/loadingIndicatorContext.jsx";

// AssetCatalog Component
export default function AssetCatalog() {
  const { setIsLoading } = useLoading();
  const { userInfo } = useUser();
  const [batchData, setBatchData] = useState(null);
  const [selectedBatch, setSelectedBatch] = useState("");
  const [catalogBatch, setCatalogBatch] = useState(null);

  // Batch Data Fetching
  useEffect(() => {
    if (!userInfo?.gameId) return;

    setIsLoading(true);
    getBatch({
      gameId: userInfo.gameId,
      cmdLine: "Get_Batch",
    })
      .then((response) => {
        if (response) {
          setBatchData(response.data);
        }
      })
      .finally(() => setIsLoading(false));
  }, [userInfo?.gameId]);

  // Asset Catalog Batch Data Fetching
  useEffect(() => {
    if (!userInfo?.gameId || !selectedBatch) return;

    const params = {
      gameId: userInfo.gameId,
      gameBatch: selectedBatch,
      cmdLine: "Asset_Catalog",
    };

    setIsLoading(true);
    getCatalog(params)
      .then((response) => {
        if (response) {
          setCatalogBatch(response.data);
        }
      })
      .finally(() => setIsLoading(false));
  }, [selectedBatch, userInfo?.gameId]);

  // Handler for Batch Selection
  const onCatalogBatchFormUpdate = (event) => {
    setSelectedBatch(event.target.value);
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
              label="Batch *"
              value={selectedBatch}
              onChange={onCatalogBatchFormUpdate}
            >
              {batchData?.length > 0 ? (
                batchData.map((mapObj) => (
                  <MenuItem
                    key={mapObj.Game_Batch}
                    value={Number(mapObj.Game_Batch)}
                  >
                    {mapObj.Game_Batch}
                  </MenuItem>
                ))
              ) : (
                <MenuItem value="" disabled>
                  No Batch Available
                </MenuItem>
              )}
            </Select>
          </FormControl>
        </Grid>
      </Grid>

      <GenericTable
        inputTableHeadings={pageConstants.table.headers}
        inputTableData={catalogBatch}
        ifNoData={null}
        hiddenColumns={pageConstants.table.hiddenColumns}
      />
    </Box>
  );
}
