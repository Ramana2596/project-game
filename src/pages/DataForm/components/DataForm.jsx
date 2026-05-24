// src/pages/DataForm/components/DataForm.jsx
// Purpose: Generic DataForm Renderer with responsive auto-fit grid, validation, and dropdown support

import React, { useState, useEffect } from "react";
import {
  groupFieldsBySection,
  getDropdownOptions
} from "../form/formUtils";

export default function DataForm({
  fields = [],
  details = {},
  selectOptions = {},
  onSave,
  onCancel
}) {
  // =========================
  // STATE: Form Data + Errors
  // =========================
  const [formData, setFormData] = useState({});
  const [fieldErrors, setFieldErrors] = useState({});

  // =========================
  // INIT: Populate formData when details change
  // =========================
  useEffect(() => {
    setFormData(details || {});
    setFieldErrors({});
  }, [details]);

  // =========================
  // HANDLE FIELD CHANGE
  // =========================
  const handleChange = (key, value) => {
    setFormData(prev => ({
      ...prev,
      [key]: value
    }));
    setFieldErrors(prev => ({ ...prev, [key]: "" }));
  };

  // =========================
  // VALIDATION: Mandatory + Type
  // =========================
  const validateFields = () => {
    const errors = {};
    fields.forEach(f => {
      const val = formData[f.columnName];
      if (f.required && (!val || val === "")) {
        errors[f.columnName] = "Required";
        return;
      }
      if (!val) return;
      if (f.type === "number" && isNaN(val)) errors[f.columnName] = "Invalid number";
      if (f.type === "date") {
        const d = new Date(val);
        if (isNaN(d.getTime())) errors[f.columnName] = "Invalid date";
      }
    });
    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // =========================
  // SAVE CLICK
  // =========================
  const handleSaveClick = () => {
    if (validateFields()) onSave(formData);
  };

  // =========================
  // GROUP FIELDS BY SECTION
  // =========================
  const sections = groupFieldsBySection(fields);

  // =========================
  // RENDER FIELD
  // =========================
  const renderField = (field) => {
    const value = formData[field.columnName] || "";
    const commonStyle = {
      width: "100%",
      height: "28px",
      fontSize: "12px",
      padding: "2px 4px",
      boxSizing: "border-box"
    };

    // SELECT
    if (field.ui?.control === "select") {
      const options = getDropdownOptions(field, selectOptions);
      return (
        <select
          value={value}
          disabled={!field.editable}
          onChange={(e) => handleChange(field.columnName, e.target.value)}
          style={commonStyle}
        >
          <option value="">--Select--</option>
          {options.map(opt => (
            <option key={opt.value} value={opt.value}>{opt.label}</option>
          ))}
        </select>
      );
    }

    // INPUT
    return (
      <input
        type="text"
        value={value}
        disabled={!field.editable}
        onChange={(e) => handleChange(field.columnName, e.target.value)}
        style={{
          ...commonStyle,
          backgroundColor: field.editable ? "#fff" : "#f5f5f5"
        }}
      />
    );
  };

  // =========================
  // RENDER GRID ROWS
  // =========================
  const renderSectionFields = (sectionFields) => {
    return (
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
          gap: "16px",
          marginBottom: "12px"
        }}
      >
        {sectionFields.map(field => (
          <div key={field.columnName}>
            <label style={{ fontSize: "12px", fontWeight: 500 }}>
              {field.label} {field.required && <span style={{ color: "red" }}>*</span>}
            </label>
            {renderField(field)}
            {fieldErrors[field.columnName] && (
              <div style={{ color: "red", fontSize: "10px", marginTop: "2px" }}>
                {fieldErrors[field.columnName]}
              </div>
            )}
          </div>
        ))}
      </div>
    );
  };

  // =========================
  // RENDER
  // =========================
  return (
    <div style={{ marginTop: "16px" }}>
      {Object.keys(sections).map(section => (
        <div key={section} style={{ marginBottom: "24px" }}>
          <h4 style={{ marginBottom: "12px" }}>{section}</h4>
          {renderSectionFields(sections[section])}
        </div>
      ))}

      {/* ACTION BUTTONS */}
      <div style={{ marginTop: "16px" }}>
        <button onClick={handleSaveClick}>Save</button>
        <button onClick={onCancel} style={{ marginLeft: "8px" }}>Cancel</button>
      </div>
    </div>
  );
}