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

    lovRoles,
    lovProductArea,

    handleAssignedChange,

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

  const [toast, setToast] = useState({
    open: false,
    message: "",
    severity: "info"
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

  return (
    <Box sx={{ p: 4, backgroundColor: "#F8F9FA" }}>

      {/* ---------------- Title ---------------- */}
      <Typography variant="h4" sx={{ fontWeight: 700, color: "#0061F2", mb: 2 }}>
        UI Access Management
      </Typography>

      {/* ---------------- Filters ---------------- */}
      <Stack direction="row" spacing={2} sx={{ mb: 2 }}>

        {/* Role Filter */}
        <FormControl sx={{ minWidth: 220 }}>
          <InputLabel>Role</InputLabel>
          <Select
            value={selectedRole}
            label="Role"
            onChange={(e) => {
              const val = e.target.value;
              setSelectedRole(val);
              loadAccessByRole(val);
            }}
          >
            {lovRoles.map(r => (
              <MenuItem key={r.RL_Id} value={r.RL_Id}>
                {r.Role}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        {/* ProductArea Filter */}
        <FormControl sx={{ minWidth: 220 }}>
          <InputLabel>ProductArea</InputLabel>
          <Select
            value={selectedProductArea}
            label="Product Area"
            onChange={(e) => setSelectedProductArea(e.target.value)}
          >
            <MenuItem value="">All</MenuItem>

            {lovProductArea.map(d => (
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

            /* ✔ toggle handler */
            onCellChange={handleAssignedChange}
          />

        </Box>
      </Paper>

      {/* ---------------- Actions ---------------- */}
      <Stack direction="row" spacing={2} sx={{ mt: 3 }}>

        <Button
          variant="contained"
          startIcon={<SaveIcon />}
          onClick={onSaveClick}
        >
          Save
        </Button>

        <Button
          variant="contained"
          startIcon={<CancelIcon />}
          color="inherit"
          onClick={cancelEdit}
        >
          Cancel
        </Button>

      </Stack>

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