import React, { useEffect, useState } from "react";
import { Button, Grid, TextField, MenuItem } from "@mui/material";
import { pageConstants } from "../constants/pageConstants.js";
import { useUser } from "../../../core/access/userContext.jsx";

/**
 * Component: BatchMstForm
 * Purpose:
 *   Display and edit all batch details for a selected Game_Batch.
 * Props:
 *   - details: object with batch details (from API)
 *   - selectOptions: { Centre_Id, Faculty, Facilitator, UOM, Batch_Status }
 *   - onSave: function(updatedDetails)
 *   - onCancel: function()
 * Notes:
 *   - Defaults are provided for onSave/onCancel to avoid runtime errors. 
 *   - Read-only fields display only.
 */
export default function BatchMstForm({
  details = {},                          //  default empty object
  selectOptions = {},                     //  default empty dropdowns
  onSave = () => {},                      //  default noop function
  onCancel = () => {}                     //  default noop function
}) {
  const { gameId } = useUser();
  const [form, setForm] = useState({});
  const [editMode, setEditMode] = useState(false);

  /** Initialize form whenever details change */
  useEffect(() => {
    const initialForm = {};
    pageConstants.contentSection.inputTypes.forEach(input => {
      //  Use null for fields with no value
      initialForm[input.columnName] = details?.[input.columnName] ?? null;
    });
    setForm(initialForm);
    setEditMode(false);
  }, [details]);

  /** Handle field change */
  const handleChange = (field, value) => {
    setForm(prev => ({ ...prev, [field]: value }));
  };

  /** Enable edit mode */
  const handleEdit = () => setEditMode(true);

  /** Cancel edit -> reset form */
  const handleCancel = () => {
    const resetForm = {};
    pageConstants.contentSection.inputTypes.forEach(input => {
      //  Use null for reset values
      resetForm[input.columnName] = details?.[input.columnName] ?? null;
    });
    setForm(resetForm);
    setEditMode(false);
    onCancel();  //  safe call
  };

    /* Save form -> call parent onSave with current form fileds*/
  const handleSave = () => {
    onSave(form); //  safe call
    setEditMode(false);
  };

  if (!form) return null; // safety

  return (
    <form>
      <Grid container spacing={2}>
        {pageConstants.contentSection.inputTypes.map(input => {
          const { columnName, inputType, readOnly } = input;
          //  use null fallback
          const value = form[columnName] ?? null;
          const disabled = readOnly || (!editMode && columnName !== "Game_Id");

          // Dropdown for editable select fields only
          const isDropdown =
            inputType === "select" &&
            ["Centre_Id", "Faculty", "Facilitator", "UOM", "Batch_Status"].includes(columnName);

          if (isDropdown) {
            return (
              <Grid item xs={12} sm={6} md={4} key={columnName}>
                <TextField
                  select
                  label={columnName.replace(/_/g, " ")}
                  // Simple default: first option if value not set
                  value={value ?? selectOptions[columnName]?.[0]?.value ?? ""}
                  onChange={e => handleChange(columnName, e.target.value)}
                  fullWidth
                  disabled={disabled}
                >
                  {(selectOptions[columnName] || []).map(opt => (
                    <MenuItem key={opt.value} value={opt.value}>
                      {opt.label}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
            );
          }

          // Text / number / date fields (including read-only display-only)
          return (
            <Grid item xs={12} sm={6} md={4} key={columnName}>
              <TextField
                label={columnName.replace(/_/g, " ")}
                type={inputType}
                //  fallback for rendering
                value={value ?? ""}  
                onChange={e => handleChange(columnName, e.target.value)}
                fullWidth
                disabled={disabled}
              />
            </Grid>
          );
        })}
      </Grid>

      {/* Action buttons */}
      <Grid container spacing={2} style={{ marginTop: 16 }}>
        {!editMode && (
          <Grid item>
            <Button variant="contained" color="primary" onClick={handleEdit}>
              {pageConstants.contentSection.modifyBtnLabel}
            </Button>
          </Grid>
        )}
        {editMode && (
          <>
            <Grid item>
              <Button variant="contained" color="primary" onClick={handleSave}>
                {pageConstants.contentSection.saveBtnLabel}
              </Button>
            </Grid>
            <Grid item>
              <Button variant="outlined" color="secondary" onClick={handleCancel}>
                {pageConstants.contentSection.cancelBtnLabel}
              </Button>
            </Grid>
          </>
        )}
      </Grid>
    </form>
  );
}
