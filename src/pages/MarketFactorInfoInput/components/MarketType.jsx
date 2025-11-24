import React, { useEffect, useState } from "react";
import {
  InputLabel,
  FormControl,
  Select,
  MenuItem,
  CircularProgress,
  Alert,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import { getMarketFactorInfoTableData } from "../services/marketFactorInputService";
import { useUser } from "../../../core/access/userContext.jsx";

export default function MarketType({
  marketType,
  onFormControlUpdate,
  isDisabled,
}) {
  const { userInfo } = useUser();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [marketTypeData, setGameBatchData] = useState([]);

  useEffect(() => {
    getMarketFactorInfoTableData({
      cmdLine: "Get_Market_Input_Id",
      gameId: userInfo?.gameId,
    })
      .then((response) => {
        setLoading(false);
        setGameBatchData(response.data);
      })
      .catch((error) => {
        setError(error);
      })
  }, []);

  const handleChange = (event) => {
    const { value } = event.target;
    const selectedValueObj = marketTypeData.filter(
      (mktTypeObj) => mktTypeObj.Market_Input_Id === value
    );
    onFormControlUpdate({
      marketInputId: selectedValueObj[0]?.Market_Input_Id,
      partCategory: selectedValueObj[0]?.Part_Category,
    });
  };

  return (
    <Grid size={{ xs: 2, sm: 4, md: 4 }}>
      <FormControl required sx={{ flexGrow: 1, width: "100%", maxWidth: 220 }}>
        <InputLabel id="marketType">Market Input</InputLabel>
        <Select
          labelId="marketType"
          id="marketTypeRequired"
          name="marketInputId"
          value={marketType}
          label="Market Type *"
          onChange={handleChange}
          disabled={isDisabled}
        >
          {loading ? (
            <MenuItem disabled>
              <CircularProgress size={24} />
            </MenuItem>
          ) : error ? (
            <MenuItem disabled>
              <Alert severity="error">{error}</Alert>
            </MenuItem>
          ) : (
            marketTypeData.length > 0 ? marketTypeData?.map((batch, index) => (
              <MenuItem key={index} value={batch.Market_Input_Id}>
                {batch.Category_Desc}
              </MenuItem>
            )) : (
              <MenuItem value={null}>No Market Type Available</MenuItem>
            )
          )}
        </Select>
      </FormControl>
    </Grid>
  );
}
