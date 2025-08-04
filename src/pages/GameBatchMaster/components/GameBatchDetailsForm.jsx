import React, { useEffect, useState } from "react";
import { Button, Grid, TextField, MenuItem } from "@mui/material";
import { pageConstants } from "../constants/pageConstants";
import { fetchGameBatchDetails } from "../services/getBatchQuery";

// Props:
//   details: object with batch details
//   selectOptions: { Faculty, Facilitator, UOM, Batch_Status }
//   onSave: function(updatedDetails)
//   onCancel: function()
export default function GameBatchDetailsForm({ details, selectOptions, onSave, onCancel }) {
  const [form, setForm] = useState(details || {});
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    setForm(details || {});
    setEditMode(false);
  }, [details]);

  const handleChange = (field, value) => {
    setForm(prev => ({ ...prev, [field]: value }));
  };

  const handleEdit = () => setEditMode(true);
  const handleCancel = () => {
    setForm(details || {});
    setEditMode(false);
    if (onCancel) onCancel();
  };
  const handleSave = () => {
    if (onSave) onSave(form);
    setEditMode(false);
  };

  if (!form || !form.Game_id) return null;

  return (
    <form>
      <Grid container spacing={2}>
        {pageConstants.contentSection.inputTypes.map(input => {
          const { columnName, inputType, readOnly } = input;
          let value = form[columnName] || "";
          let disabled = readOnly || !editMode;
          if (inputType === "select") {
            return (
              <Grid item xs={12} sm={6} md={4} key={columnName}>
                <TextField
                  select
                  label={columnName.replace(/_/g, " ")}
                  value={value}
                  onChange={e => handleChange(columnName, e.target.value)}
                  fullWidth
                  disabled={disabled}
                >
                  {(selectOptions[columnName] || []).map(opt => (
                    <MenuItem key={opt.value} value={opt.value}>{opt.label}</MenuItem>
                  ))}
                </TextField>
              </Grid>
            );
          }
          return (
            <Grid item xs={12} sm={6} md={4} key={columnName}>
              <TextField
                label={columnName.replace(/_/g, " ")}
                type={inputType}
                value={value}
                onChange={e => handleChange(columnName, e.target.value)}
                fullWidth
                disabled={disabled}
              />
            </Grid>
          );
        })}
      </Grid>
      <Grid container spacing={2} style={{ marginTop: 16 }}>
        {!editMode && (
          <Grid item>
            <Button variant="contained" color="primary" onClick={handleEdit}>Modify</Button>
          </Grid>
        )}
        {editMode && (
          <>
            <Grid item>
              <Button variant="contained" color="primary" onClick={handleSave}>Save</Button>
            </Grid>
            <Grid item>
              <Button variant="outlined" color="secondary" onClick={handleCancel}>Cancel</Button>
            </Grid>
          </>
        )}
      </Grid>
    </form>
  );
}
