// Purpose: Field definitions (DB-driven UI config)

export const formConfig = [
  {
    columnName: "Game_Batch",
    label: "Batch",
    db: { type: "int" },
    section: "General",
    editable: false
  },
  {
    columnName: "Batch_Name",
    label: "Batch Name",
    db: { type: "nvarchar", length: 50 },
    section: "General",
    editable: true
  },
  {
    columnName: "Start_Date",
    label: "Start Date",
    db: { type: "date" },
    section: "Schedule",
    editable: true
  },
  {
    columnName: "End_Date",
    label: "End Date",
    db: { type: "date" },
    section: "Schedule",
    editable: true
  },
  {
    columnName: "Faculty",
    label: "Faculty",
    db: { type: "nvarchar", length: 50 },
    section: "Admin",
    editable: true,
    ui: { control: "select" }
  }
];