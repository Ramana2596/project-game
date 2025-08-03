export const pageConstants = {
  contentSection: {
    modifyBtnLabel: "Modify",
    saveBtnLabel: "Save",
    cancelBtnLabel: "Cancel",
    tableHeading: [
      "Game_id",
      "Game_Batch",
      "Centre_Id",
      "Faculty",
      "Facilitator",
      "Venue",
      "Start_Date",
      "Duration",
      "UOM",
      "Close_Date",
      "Batch_Status"
    ],
    hiddenTableColumns: [],
    inputTypes: [
      { columnName: "Game_id", inputType: "text", readOnly: true },
      { columnName: "Game_Batch", inputType: "text", readOnly: true },
      { columnName: "Centre_Id", inputType: "select" },
      { columnName: "Faculty", inputType: "select" },
      { columnName: "Facilitator", inputType: "select" },
      { columnName: "Venue", inputType: "text" },
      { columnName: "Start_Date", inputType: "date" },
      { columnName: "Duration", inputType: "number" },
      { columnName: "UOM", inputType: "select" },
      { columnName: "Close_Date", inputType: "date" },
      { columnName: "Batch_Status", inputType: "select" }
    ]
  },
};
