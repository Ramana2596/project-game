// File: src/pages/UiAccess/UiAccess.jsx
// Purpose: Main page for managing Role ↔ UI Page Access (✔ Assigned model with filters)

import React, { useState } from "react";
import {
  Box, Typography, Paper, Button, Stack,
  FormControl, InputLabel, Select, MenuItem,
  Checkbox, FormControlLabel
} from "@mui/material";
import { Save as SaveIcon, Close as CancelIcon } from "@mui/icons-material";
import ToastMessage from "../../components/ToastMessage.jsx";

import UiAccessTable from "./components/UiAccessTable.jsx";
import { useUiAccess } from "./hooks/useUiAccess.js";

const UiAccess = () => {

  /* ---------------- Hook ---------------- */
  const {
    rows,
    loading,
    columns,

    roles,
    productAreas,

    handleAssignedChange,
    bulkAssign, // ✅ NEW

    saveAccessData,
    cancelEdit,

    selectedRole,
    setSelectedRole,
    selectedProductArea,
    setSelectedProductArea,
    loadAccessByRole,

    showUnassignedOnly,
    setShowUnassignedOnly,

  } = useUiAccess();

  /* ---------------- Toast State ---------------- */
  const [toast, setToast] = useState({
    open: false,
    message: "",
    severity: null // ✔ Changed default from "info" to null
  });

  /* ---------------- Save Handler ---------------- */
  const onSaveClick = async () => {
    const res = await saveAccessData();
    setToast({
      open: true,
      message: res.success ? "Access saved successfully" : "Save failed",
      severity: res.success ? "success" : "error",
    });
  };

  /* ---------------- Constants for Bulk Actions ---------------- */
  const BULK_GRANT = 1; 
  const BULK_REMOVE = 0;

  return (
    <Box sx={{ p: 4, backgroundColor: "#F8F9FA" }}>

      {/* ---------------- Title ---------------- */}
      <Typography variant="h4" sx={{ fontWeight: 700, color: "#0061F2", mb: 2 }}>
        UI Access Management
      </Typography>

      {/* ---------------- Toolbar (Filters + Actions) ---------------- */}
      <Stack
        direction="row"
        spacing={2}
        sx={{
          mb: 2,
          alignItems: "center",
          justifyContent: "space-between"
        }}
      >

        {/* ---------------- Left: Filters ---------------- */}
        <Stack direction="row" spacing={2}>

          {/* Role Filter */}
          <FormControl sx={{ minWidth: 220 }}>
            <InputLabel id="role-label">Role</InputLabel> {/* Added labelId */}
            <Select
              labelId="role-label" // ✔ Added binding
              value={selectedRole}
              label="Role"
              onChange={(e) => {
                const val = e.target.value;
                setSelectedRole(val);
                loadAccessByRole(val);
              }}
            >
              {roles?.map(r => (
                <MenuItem key={r.RL_Id} value={r.RL_Id}>
                  {r.Role}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          {/* ProductArea Filter */}
          <FormControl sx={{ minWidth: 220 }}>
            <InputLabel id="product-area-label">ProductArea</InputLabel> {/* Added labelId */}
            <Select
              labelId="product-area-label" // ✔ Added binding
              value={selectedProductArea}
              label="Product Area"
              onChange={(e) => setSelectedProductArea(e.target.value)}
            >
              <MenuItem value="">All</MenuItem>

              {productAreas?.map(d => (
                <MenuItem
                  key={d.Product_Area_Code}
                  value={d.Product_Area_Code}
                >
                  {d.Product_Area_Name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          {/* Show Unassigned Only */}
          <FormControlLabel
            control={
              <Checkbox
                checked={showUnassignedOnly}
                onChange={(e) =>
                  setShowUnassignedOnly(e.target.checked)
                }
              />
            }
            label="Show Unassigned Only"
          />

        </Stack>

        {/* ---------------- Right: Actions ---------------- */}
        <Stack direction="row" spacing={1} alignItems="center">

          {/* Bulk Grant */}
          <Button
            variant="outlined"
            size="small"
            onClick={() => bulkAssign(BULK_GRANT)}
          >
            Bulk Grant
          </Button>

          {/* Bulk Remove */}
          <Button
            variant="outlined"
            size="small"
            color="warning"
            onClick={() => bulkAssign(BULK_REMOVE)} 
          >
            Bulk Remove
          </Button>

          {/* Save */}
          <Button
            variant="contained"
            startIcon={<SaveIcon />}
            onClick={onSaveClick}
          >
            Save
          </Button>

          {/* Cancel */}
          <Button
            variant="contained"
            startIcon={<CancelIcon />}
            color="secondary" 
            onClick={cancelEdit}
          >
            Cancel
          </Button>

        </Stack>

      </Stack>

      {/* ---------------- Grid ---------------- */}
      <Paper
        elevation={10}
        sx={{
          borderRadius: "12px",
          border: "1px solid #DEE2E6",
          mt: 2
        }}
      >
        <Box sx={{ p: 2 }}>

          <UiAccessTable
            rows={rows}
            loading={loading}
            columns={columns}
            onCellChange={handleAssignedChange}
          />

        </Box>
      </Paper>

      {/* ---------------- Toast ---------------- */}
      <ToastMessage
        {...toast}
        onClose={() =>
          setToast({ ...toast, open: false })
        }
      />

    </Box>
  );
};

export default UiAccess;
