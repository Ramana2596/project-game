// src/pages/BatchMaster/components/BatchMstForm.jsx

import React, { useState, useEffect, useMemo } from "react";
import { pageConstants } from "../constants/pageConstants";
import { getFormFields } from "../form/formConfigUtils";

export default function BatchMstForm({ details, selectOptions = {}, onSave, onCancel, onSelectionChange }) {
  const [formData, setFormData] = useState({});
  const [errors, setErrors] = useState({});

  const fields = useMemo(() => getFormFields(pageConstants?.contentSection?.fields || []), []);

  // ✅ Auto-Load Logic: Triggers when selection changes in the parent header
  // This replaces the need for a manual "LOAD" button.
  useEffect(() => {
    if (details) {
      setFormData(details);
      setErrors({});
    }
  }, [details]);

  const handleChange = (name, value) => {
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: "" }));
    
    // If Game or Batch is changed within the form, notify parent to fetch new data
    if (name === "Game_Id" || name === "Game_Batch") {
        onSelectionChange?.(name, value);
    }
  };

  const validate = () => {
    const newErrors = {};
    fields.forEach(f => {
      if (f.required && !formData[f.columnName]) newErrors[f.columnName] = "Required";
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const renderField = (field) => {
    const value = formData[field.columnName] ?? "";
    const commonProps = {
      disabled: !field.editable,
      onChange: e => handleChange(field.columnName, e.target.value),
      style: {
        width: "100%",
        border: "none",
        outline: "none",
        background: "transparent",
        fontSize: "13px",
        fontWeight: "700",
        color: field.editable ? "#000" : "#444",
      }
    };

    if (field.ui?.control === "select") {
      return (
        <select {...commonProps} value={value} style={{ ...commonProps.style, cursor: "pointer" }}>
          <option value="">--</option>
          {(selectOptions[field.columnName] || []).map(opt => (
            <option key={opt.value} value={opt.value}>{opt.label}</option>
          ))}
        </select>
      );
    }
    return <input type={field.ui?.control || "text"} value={value} {...commonProps} />;
  };

  return (
    <div style={{ padding: "10px 20px", background: "#fff" }}>
      <div style={{ width: "100%", maxWidth: "1450px" }}>
        
        {Object.keys(pageConstants.contentSection.sections).map((sectionKey) => {
          const sectionFields = fields.filter(f => f.section === sectionKey && f.visible);
          if (sectionFields.length === 0) return null;

          return (
            <div key={sectionKey} style={{ 
              marginBottom: "16px", 
              paddingBottom: "12px",
              borderBottom: "1px solid #f0f0f0" 
            }}>
              <div style={{ 
                display: "grid", 
                gridTemplateColumns: "repeat(12, 1fr)", 
                gap: "12px 20px" 
              }}>
                {sectionFields.map(field => {
                  let gridSpan = 2; // Base unit (6 columns total)
                  
                  // Line 2 alignment: Venue spans 2 columns (4 grid units)
                  if (field.columnName === "Venue") gridSpan = 4;
                  
                  // Line 4 alignment: Duration/UOM span 0.5 columns (1 grid unit)
                  if (field.columnName === "Duration" || field.columnName === "UOM") gridSpan = 1;

                  return (
                    <div 
                      key={field.columnName} 
                      style={{ 
                        display: "flex", 
                        flexDirection: "column",
                        gridColumn: `span ${gridSpan}` 
                      }}
                    >
                      <label style={{ fontSize: "10px", fontWeight: "800", color: "#78909c", marginBottom: "2px", textTransform: "uppercase" }}>
                        {field.label}
                      </label>
                      <div style={{
                        border: errors[field.columnName] ? "1px solid red" : "1px solid #cfd8dc",
                        borderRadius: "4px",
                        padding: "0 8px",
                        background: field.editable ? "#fff" : "#f8f9fa",
                        height: "36px",
                        display: "flex",
                        alignItems: "center"
                      }}>
                        {renderField(field)}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}

        <div style={{ display: "flex", justifyContent: "flex-end", gap: "12px", marginTop: "10px" }}>
          <button onClick={onCancel} style={{ padding: "8px 20px", cursor: "pointer", borderRadius: "4px", border: "1px solid #ccc", background: "#fff", fontWeight: "600" }}>
            {pageConstants.contentSection.cancelBtnLabel}
          </button>
          <button 
            onClick={() => validate() && onSave(formData)} 
            style={{ padding: "8px 28px", background: "#007bff", color: "#fff", border: "none", borderRadius: "4px", cursor: "pointer", fontWeight: "800" }}
          >
            {pageConstants.contentSection.saveBtnLabel}
          </button>
        </div>
      </div>
    </div>
  );
}