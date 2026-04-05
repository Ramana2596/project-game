// src/pages/DataForm/components/DataForm.jsx
// Purpose: Generic DataForm Renderer with simple validation (Mandatory + Type)

import React, { useState, useEffect } from "react";

export default function DataForm({
  fields = [],
  details = {},
  selectOptions = {},
  onSave,
  onCancel
}) {
  // =========================
  // STATE
  // =========================
  const [formData, setFormData] = useState({});
  const [fieldErrors, setFieldErrors] = useState({});

  // =========================
  // INIT DATA
  // =========================
  useEffect(() => {
    setFormData(details || {});
    setFieldErrors({});
  }, [details]);

  // =========================
  // HANDLE CHANGE
  // =========================
  const handleChange = (key, value) => {
    setFormData(prev => ({
      ...prev,
      [key]: value
    }));

    // Clear error on change
    setFieldErrors(prev => ({
      ...prev,
      [key]: ""
    }));
  };

  // =========================
  // VALIDATION
  // =========================
  const validateFields = () => {
    const errors = {};

    fields.forEach(f => {
      const val = formData[f.columnName];

      // ✅ Mandatory
      if (f.required && (!val || val === "")) {
        errors[f.columnName] = "Required";
        return;
      }

      // Skip further validation if empty
      if (!val) return;

      // ✅ Number
      if (f.type === "number" && isNaN(val)) {
        errors[f.columnName] = "Invalid number";
      }

      // ✅ Date
      if (f.type === "date") {
        const d = new Date(val);
        if (isNaN(d.getTime())) {
          errors[f.columnName] = "Invalid date";
        }
      }
    });

    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // =========================
  // SAVE CLICK
  // =========================
  const handleSaveClick = () => {
    const isValid = validateFields();
    if (!isValid) return;

    onSave(formData);
  };

  // =========================
  // GROUP BY SECTION
  // =========================
  const sections = {};
  fields.forEach(f => {
    const section = f.section || "General";
    if (!sections[section]) sections[section] = [];
    sections[section].push(f);
  });

  // =========================
  // RENDER FIELD
  // =========================
  const renderField = (field) => {
    const value = formData[field.columnName] || "";

    const commonStyle = {
      width: "100%",
      height: "24px",
      fontSize: "12px"
    };

    // SELECT
    if (field.ui?.control === "select") {
      return (
        <select
          value={value}
          disabled={!field.editable}
          onChange={(e) =>
            handleChange(field.columnName, e.target.value)
          }
          style={commonStyle}
        >
          <option value="">--Select--</option>
          {(selectOptions[field.columnName] || []).map(opt => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
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
        onChange={(e) =>
          handleChange(field.columnName, e.target.value)
        }
        style={{
          ...commonStyle,
          backgroundColor: field.editable ? "#fff" : "#f5f5f5"
        }}
      />
    );
  };

  // =========================
  // RENDER
  // =========================
  return (
    <div style={{ marginTop: "16px" }}>
      {Object.keys(sections).map(section => (
        <div key={section} style={{ marginBottom: "16px" }}>
          {/* SECTION HEADER */}
          <h4 style={{ marginBottom: "8px" }}>{section}</h4>

          {/* TABLE GRID */}
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <tbody>
              {sections[section].map(field => (
                <tr key={field.columnName}>
                  {/* LABEL */}
                  <td style={{ width: "20%", padding: "4px" }}>
                    {field.label}
                    {field.required && (
                      <span style={{ color: "red", marginLeft: 2 }}>
                        *
                      </span>
                    )}
                  </td>

                  {/* FIELD */}
                  <td style={{ width: "30%", padding: "4px" }}>
                    {renderField(field)}

                    {/* INLINE ERROR */}
                    {fieldErrors[field.columnName] && (
                      <div
                        style={{
                          color: "red",
                          fontSize: "10px",
                          marginTop: "2px"
                        }}
                      >
                        {fieldErrors[field.columnName]}
                      </div>
                    )}
                  </td>

                  {/* EMPTY SPACE (RIGHT SIDE FREE) */}
                  <td style={{ width: "50%" }}></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ))}

      {/* ACTION BUTTONS */}
      <div style={{ marginTop: "16px" }}>
        <button onClick={handleSaveClick}>Save</button>
        <button onClick={onCancel} style={{ marginLeft: "8px" }}>
          Cancel
        </button>
      </div>
    </div>
  );
}