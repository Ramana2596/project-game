// Dropdown: Operation Input - Product, Materials, Machinery

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
import { getOpsPlanId } from "../services/service";
import { useUser } from "../../../core/access/userContext";
import { pageConstants } from "../constants/pageConstants";

export default function OpsPlanOption({
  selectedOperationsInputId,  
  onFormControlUpdate,
  isDisabled,
}) {
  const { userInfo } = useUser();

  // State: dropdown options, loading, error
  const [opsPlanOptions, setOpsPlanOptions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch operational plan input options on mount
  useEffect(() => {
    setLoading(true);
    getOpsPlanId({
      gameId: userInfo?.gameId,
      gameBatch: userInfo?.gameBatch,
      cmdLine: "Get_Input_Id",
    })
      .then((response) => {
        setOpsPlanOptions(response?.data || []);
        setError(null);
      })
      .catch((error) => {
        setError(error?.message || "Failed to load options");
      })
      .finally(() => setLoading(false));
  }, []);

  // Handle dropdown selection
  const handleChange = (event) => {
    const selectedId = event.target.value;
    const selected = opsPlanOptions.find(
      (opt) => opt.Operations_Input_Id === selectedId
    );

    onFormControlUpdate({
      operationsInputId: selected?.Operations_Input_Id,
      partCategory: selected?.Part_Category,
    });
  };

  return (
    <Grid size={{ xs: 2, sm: 4, md: 4 }}>
      <FormControl required sx={{ flexGrow: 1, width: "100%", maxWidth: 220 }}>
        <InputLabel id="OpsPlanId">Info: Operational Plan</InputLabel>
        <Select
          labelId="OpsPlanOptio"
          id="OpsPlanOptionRequired"
          name="OpsPlanOption"
          value={selectedOperationsInputId} // Updated prop name
          label="Info: Operation Plan Option*"
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
          ) : opsPlanOptions.length === 0 ? (
            <MenuItem disabled>No options available</MenuItem>
          ) : (
            opsPlanOptions.map((opt, index) => (
              <MenuItem key={index} value={opt.Operations_Input_Id}>
                {opt.Category_Desc}
              </MenuItem>
            ))
          )}
        </Select>
      </FormControl>
    </Grid>
  );
}
