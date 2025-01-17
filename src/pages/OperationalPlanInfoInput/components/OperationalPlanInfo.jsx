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
import { getOperationalPlanInfoTableData } from "../services/operationalPlanInfoInputService";
import { useUser } from "../../../core/access/userContext";
import { pageConstants } from "../constants/pageConstants";

export default function OperationalPlanInfoType({
  operationalPlanType,
  onFormControlUpdate,
  isDisabled,
}) {
  const { userInfo } = useUser();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [operationalPlanInfoData, setGameBatchData] = useState([]);

  useEffect(() => {
    setLoading(false);
    getOperationalPlanInfoTableData({
      gameId: userInfo?.gameId,
      gameBatch: userInfo?.gameBatch,
      cmdLine: "Get_Input_Id",
    })
      .then((response) => {
        setGameBatchData(response?.data);
      })
      .catch((error) => {
        setError(error?.message);
      });
  }, []);

  const handleChange = (event) => {
    const { value } = event.target;
    const selectedValueObj = operationalPlanInfoData.filter(
      (optInfoObj) => optInfoObj.Operations_Input_Id === value
    );
    onFormControlUpdate({
      operationsInputId: selectedValueObj[0]?.Operations_Input_Id,
      partCategory: selectedValueObj[0]?.Part_Category,
    });
  };

  return (
    <Grid size={{ xs: 2, sm: 4, md: 4 }}>
      <FormControl required sx={{ flexGrow: 1, width: "100%", maxWidth: 220 }}>
        <InputLabel id="operationalPlanType">
          {pageConstants.pageTitle}
        </InputLabel>
        <Select
          labelId="operationalPlanType"
          id="operationalPlanTypeRequired"
          name="operationalPlanTypeId"
          value={operationalPlanType}
          label="Info: Operational Plan *"
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
            operationalPlanInfoData?.map((batch, index) => (
              <MenuItem key={index} value={batch.Operations_Input_Id}>
                {batch.Category_Desc}
              </MenuItem>
            ))
          )}
        </Select>
      </FormControl>
    </Grid>
  );
}
