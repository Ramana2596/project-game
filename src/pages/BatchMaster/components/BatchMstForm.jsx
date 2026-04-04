// src/pages/BatchMaster/components/BatchMstForm.jsx
// Purpose: Seamless grid-based Batch form with full UX enhancements (Game Batch style), validation, and safe rendering

import React, { useState, useEffect } from "react";
import { pageConstants } from "../constants/pageConstants"; 

export default function BatchMstForm({
  details,
  selectOptions,
  onSave,
  onCancel
}) {
  const [formData, setFormData] = useState({});
  const [errors, setErrors] = useState({}); // ✅ validation state

  // Initialize full form data (including hidden/system fields)
  useEffect(() => {
    setFormData(details || {});
    setErrors({}); // ✅ reset errors
  }, [details]);

  // Handle field value changes
  const handleChange = (name, value) => {
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // ✅ clear error on change
    setErrors(prev => ({
      ...prev,
      [name]: ""
    }));
  };

  // Ensure fields is always array (safety)
  const rawFields = pageConstants?.contentSection?.fields; // ✅
  const fields = Array.isArray(rawFields) ? rawFields : []; // ✅

  // Define section order for consistent layout
  const sectionOrder = ["basic", "assignment", "schedule", "config"];

  // Order fields based on section
  const orderedFields = sectionOrder.flatMap(section =>
    fields.filter(f => f && f.section === section)
  );

  // Common input style
  const inputStyle = {
    width: "100%",
    border: "none",
    outline: "none",
    fontSize: "14px",
    background: "transparent"
  };

  // Validate required fields
  const validate = () => {
    const newErrors = {};

    orderedFields.forEach(field => {
      if (field.required && !formData[field.columnName]) {
        newErrors[field.columnName] = `${field.label} is required`;
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Generic field renderer
  const renderField = (field) => {
    if (!field) return null;

    const value = formData[field.columnName] ?? "";
    const error = errors[field.columnName];

    const commonProps = {
      style: {
        ...inputStyle,
        cursor: field.editable ? "text" : "not-allowed"
      },
      onFocus: (e) => e.target.parentElement.style.border = "1px solid #1976d2", // ✅ focus
      onBlur: (e) => e.target.parentElement.style.border = error ? "1px solid red" : "1px solid #ccc" // ✅ blur
    };

    switch (field.type) {

      case "select":
        return (
          <select
            value={value}
            {...commonProps}
            onChange={e => handleChange(field.columnName, e.target.value)}
          >
            <option value="">-- Select --</option>
            {(selectOptions[field.columnName] || []).map(opt => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        );

      case "date":
        return (
          <input
            type="date"
            value={value ? String(value).split("T")[0] : ""}
            {...commonProps}
            onChange={e => handleChange(field.columnName, e.target.value)}
          />
        );

      case "number":
        return (
          <input
            type="number"
            value={value}
            {...commonProps}
            onChange={e => handleChange(field.columnName, e.target.value)}
          />
        );

      default:
        return (
          <input
            type="text"
            value={value}
            readOnly={!field.editable}
            {...commonProps}
            onChange={e => handleChange(field.columnName, e.target.value)}
          />
        );
    }
  };

  // Handle Save with validation
  const handleSave = () => {
    if (!validate()) return; // ✅ stop if invalid

    const {
      Created_By,
      Created_On,
      Modified_By,
      Modified_On,
      ...payload
    } = formData;

    onSave(payload);
  };

  return (
    <div style={{ padding: "16px" }}>

      {/* Responsive grid layout */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
          gap: "18px"
        }}
      >
        {orderedFields.map(field => {
          const error = errors[field.columnName];

          return (
            <div
              key={field.columnName}
              style={{ display: "flex", flexDirection: "column" }}
            >

              {/* Field label */}
              <label
                style={{
                  fontSize: "13px",
                  fontWeight: "500",
                  marginBottom: "6px",
                  color: "#444"
                }}
              >
                {field.label}
              </label>

              {/* Input container */}
              <div
                style={{
                  border: error ? "1px solid red" : "1px solid #ccc", // ✅ error highlight
                  borderRadius: "8px",
                  padding: "10px",
                  minHeight: "42px",
                  display: "flex",
                  alignItems: "center",
                  background: field.editable ? "#fff" : "#f5f5f5",
                  transition: "all 0.2s ease"
                }}
              >
                {renderField(field)}
              </div>

              {/* Error message */}
              {error && (
                <span style={{ color: "red", fontSize: "11px", marginTop: "4px" }}>
                  {error}
                </span>
              )}

            </div>
          );
        })}
      </div>

      {/* Inline action buttons aligned near LOAD */}
      <div
        style={{
          marginTop: "20px",
          display: "flex",
          justifyContent: "flex-end",
          alignItems: "center",
          gap: "10px"
        }}
      >
        {/* Cancel Button */}
        <button
          onClick={onCancel}
          style={{
            padding: "8px 16px",
            fontSize: "14px",
            borderRadius: "6px",
            border: "1px solid #ccc",
            background: "#f5f5f5",
            cursor: "pointer"
          }}
        >
          Cancel
        </button>

        {/* Submit Button (same style as LOAD) */}
        <button
          onClick={handleSave}
          style={{
            padding: "8px 16px",
            fontSize: "14px",
            borderRadius: "6px",
            border: "1px solid #ccc",
            background: "#f5f5f5",
            cursor: "pointer"
          }}
        >
          Submit
        </button>
      </div>

    </div>
  );
}