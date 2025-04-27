export const pageConstants = {
  contentSection: {
    addBtnLabel: "Add",
    modifyBtnLabel: "Modify",
    saveBtnLabel: "Save",
    cancelBtnLabel: "Cancel",
    tableHeading: [
      "Strategy_Id",
      "Strategy_Description",
      "Business_Enabler",
      "Cost_Type",
      "Exclsuive_Group",
      "Usage Status"
    ],
    tableHeadingForAdd: [
      "Strategy_Description",
      "Business_Enabler",
      "Cost_Type",
      "Exclsuive_Group"
    ],
    hiddenTableColumns: [],
    hiddenTableColumnsForAdd: ["Strategy_Id"],
    inputTypes: [
      { columnName: "Strategy_Id", inputType: null },
      { columnName: "Strategy_Description", inputType: "text" },
      { columnName: "Business_Enabler", inputType: "select" },
      { columnName: "Cost_Type", inputType: "select" },
      { columnName: "Exclsuive_Group", inputType: "text" }
    ],
    inputTypesForAdd: [
      { columnName: "Strategy_Description", inputType: "text" },
      { columnName: "Business_Enabler", inputType: "select" },
      { columnName: "Cost_Type", inputType: "select" },
      { columnName: "Exclsuive_Group", inputType: "text" }
    ],
  },
};
