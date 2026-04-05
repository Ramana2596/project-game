// src/pages/BatchMaster/form/formConfigUtils.js

/**
 * Maps SQL types to UI controls
 */
const resolveControl = (field) => {
  const dbType = field?.db?.type;
  if (field?.ui?.control) return field.ui.control;

  switch (dbType) {
    case "date": return "date";
    case "int":
    case "tinyint": return "number";
    default: return "text";
  }
};

/**
 * Derives 'ch' width from DB DDL Length
 */
const resolveWidthCh = (field) => {
  const { type, length } = field?.db || {};
  
  // NVARCHAR: Length + 2 for padding. Max cap at 65ch for readability.
  if (type === "nvarchar" && length) {
    return Math.min(length + 2, 65);
  }
  
  // Static types
  if (type === "date") return 14; 
  if (type === "tinyint") return 5;
  if (type === "int") return 12;
  
  return 20; // Default fallback
};

export const getFormFields = (fields = []) => {
  return fields.map((field) => ({
    ...field,
    visible: field.visible ?? true,
    editable: field.editable ?? false,
    ui: {
      control: resolveControl(field),
      widthCh: resolveWidthCh(field)
    }
  }));
};