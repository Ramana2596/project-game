// src/pages/DataForm/form/formConfigUtils.js
// Purpose: Standard engine to derive UI configuration from DB schema (DB → UI, auto layout ready)

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
// NOTE: Units are relative (not strict %). Used for row packing.
const resolveWidth = (field) => {
  const { type, length } = field?.db || {};

  // ✅ Explicit override (highest priority)
  if (field?.width) return field.width;

  // DB-driven defaults
  switch (type) {
    case "tinyint":
      return 6;

    case "int":
      return 10;

    case "date":
      return 14;

    case "nvarchar":
      if (!length) return 20;

      // Small text
      if (length <= 20) return 16;

      // Medium text
      if (length <= 50) return 24;

      // Large text
      if (length <= 100) return 40;

      // Very large
      return 50;

    default:
      return 20; // fallback
  }
};

// VISIBILITY NORMALIZATION
const resolveVisibility = (field) => {
  if (field.visible === undefined) return true;
  return field.visible;
};

// EDITABILITY NORMALIZATION
const resolveEditable = (field) => {
  if (field.editable === undefined) return false;
  return field.editable;
};

// MAIN ENGINE: ENRICH FIELDS
export const getFormFields = (fields = []) => {
  return fields.map((field) => {
    const control = resolveControl(field);
    const width = resolveWidth(field);
    const visible = resolveVisibility(field);
    const editable = resolveEditable(field);

    return {
      ...field,

      // Normalize flags
      visible,
      editable,

      // Attach derived UI config
      ui: {
        control,
        width   // ✅ NEW: Used by layout engine
      }
    };
  });
};