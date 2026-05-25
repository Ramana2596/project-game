// src/pages/DataForm/form/formUtils.js
// Purpose: Standard engine to derive UI configuration from DB schema + helper functions for DataForm (DB → UI, sections, dropdowns, editable)


// CONTROL TYPE RESOLUTION (DB → UI)
const resolveControl = (field) => {
  const dbType = field?.db?.type;

  // ✅ Explicit override (highest priority)
  if (field?.ui?.control) return field.ui.control;

  // DB-driven defaults
  switch (dbType) {
    case "date":
      return "date";
    case "int":
    case "tinyint":
      return "number";
    default:
      return "text";
  }
};


// WIDTH RESOLUTION (DB → UI WIDTH UNITS)
const resolveWidth = (field) => {
  const { type, length } = field?.db || {};

  // ✅ Explicit override
  if (field?.width) return field.width;

  switch (type) {
    case "tinyint":
      return 6;
    case "int":
      return 10;
    case "date":
      return 14;
    case "nvarchar":
      if (!length) return 20;
      if (length <= 20) return 16;
      if (length <= 50) return 24;
      if (length <= 100) return 40;
      return 50;
    default:
      return 20; // fallback
  }
};


// VISIBILITY & EDITABILITY NORMALIZATION
const resolveVisibility = (field) => (field.visible === undefined ? true : field.visible);
const resolveEditable = (field) => (field.editable === undefined ? false : field.editable);


// MAIN ENGINE: ENRICH FIELDS
export const getFormFields = (fields = []) => {
  return fields.map((field) => {
    const control = resolveControl(field);
    const width = resolveWidth(field);
    const visible = resolveVisibility(field);
    const editable = resolveEditable(field);

    return {
      ...field,
      visible,
      editable,
      ui: {
        control,
        width
      }
    };
  });
};


// HELPER: GROUP FIELDS BY SECTION
export const groupFieldsBySection = (fields = []) => {
  const sections = {};
  fields.forEach((f) => {
    const section = f.section || "General";
    if (!sections[section]) sections[section] = [];
    sections[section].push(f);
  });
  return sections;
};


// HELPER: GET ONLY EDITABLE FIELDS
export const getEditableFields = (fields = []) => {
  return fields.filter((f) => f.editable);
};


// HELPER: GET DROPDOWN OPTIONS (DEFAULT + SELECT OPTIONS)
export const getDropdownOptions = (field, selectOptions = {}) => {
  const options = selectOptions[field.columnName] || [];
  return [{ value: "", label: "--Select--" }, ...options];
};