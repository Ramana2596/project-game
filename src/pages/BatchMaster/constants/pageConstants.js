export const pageConstants = {
  contentSection: {
    modifyBtnLabel: "Modify",
    saveBtnLabel: "Save",
    cancelBtnLabel: "Cancel",
    tableHeading: [
      "Game_Id",
      "Game_Batch",
      "Learn_Mode",
      "Batch_Size",
      "Team_Theme",
      "Centre_Id",
      "Faculty",
      "Facilitator",
      "Venue",
      "Start_Date",
      "Duration",
      "UOM",
      "Close_Date",
      "Batch_Open_Date",
      "Batch_Status"
    ],
    hiddenTableColumns: [],
    inputTypes: [
      // Always read-only fields
      { columnName: "Game_Id", inputType: "text", readOnly: true },
      { columnName: "Game_Batch", inputType: "text", readOnly: true },
      { columnName: "Learn_Mode", inputType: "text", readOnly: true },
      { columnName: "Batch_Size", inputType: "number", readOnly: true },
      { columnName: "Team_Theme", inputType: "text", readOnly: true },

      // Editable / select fields
      { columnName: "Centre_Id", inputType: "select" },
      { columnName: "Faculty", inputType: "select" },
      { columnName: "Facilitator", inputType: "select" },
      { columnName: "Venue", inputType: "text" },
      { columnName: "Start_Date", inputType: "date" },
      { columnName: "Duration", inputType: "number" },
      { columnName: "UOM", inputType: "select" },
      { columnName: "Close_Date", inputType: "date" },
      { columnName: "Batch_Open_Date", inputType: "date" },
      { columnName: "Batch_Status", inputType: "select" }
    ]
  }
};
