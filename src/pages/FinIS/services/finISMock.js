// Component Name : finISMock
// Module         : FinIS (Income Statement)
// Purpose        : Static mock rows shaped exactly like UI_Income_Statement_Dynamic's pivoted result set
// Author/Version : UXLab V1.0
// AI Tags        : income-statement, mock, dev-data

const finISMockData = [
    { Game_Id: "OpsMgt", Game_Batch: 99, Game_Team: "Demo", Line_No: 1, Details: "Sales Revenue", "Mar-2026": 27000.00 },
    { Game_Id: "OpsMgt", Game_Batch: 99, Game_Team: "Demo", Line_No: 2, Details: "Cost of Goods Sold", "Mar-2026": 14730.00 },
    { Game_Id: "OpsMgt", Game_Batch: 99, Game_Team: "Demo", Line_No: 3, Details: "Gross_Margin", "Mar-2026": 12270.00 },
    { Game_Id: "OpsMgt", Game_Batch: 99, Game_Team: "Demo", Line_No: 4, Details: "Utilities - Gas,Air, Water,", "Mar-2026": 291.00 },
    { Game_Id: "OpsMgt", Game_Batch: 99, Game_Team: "Demo", Line_No: 5, Details: "Fuel & Power of Factory", "Mar-2026": 437.00 },
    { Game_Id: "OpsMgt", Game_Batch: 99, Game_Team: "Demo", Line_No: 6, Details: "Consumables", "Mar-2026": 291.00 },
    { Game_Id: "OpsMgt", Game_Batch: 99, Game_Team: "Demo", Line_No: 7, Details: "Repairs & Maintenance", "Mar-2026": 195.00 },
    { Game_Id: "OpsMgt", Game_Batch: 99, Game_Team: "Demo", Line_No: 8, Details: "Rent & Godown Expense", "Mar-2026": 645.00 },
    { Game_Id: "OpsMgt", Game_Batch: 99, Game_Team: "Demo", Line_No: 9, Details: "RM Inventory Carrying cost", "Mar-2026": 30.00 },
    { Game_Id: "OpsMgt", Game_Batch: 99, Game_Team: "Demo", Line_No: 10, Details: "FG Inventory Carrying cost", "Mar-2026": 44.00 },
    { Game_Id: "OpsMgt", Game_Batch: 99, Game_Team: "Demo", Line_No: 11, Details: "Freight Inward", "Mar-2026": 0.00 },
    { Game_Id: "OpsMgt", Game_Batch: 99, Game_Team: "Demo", Line_No: 12, Details: "Depreciation", "Mar-2026": 1120.00 },
    { Game_Id: "OpsMgt", Game_Batch: 99, Game_Team: "Demo", Line_No: 13, Details: "Operating OH Cost", "Mar-2026": 3053.00 },
    { Game_Id: "OpsMgt", Game_Batch: 99, Game_Team: "Demo", Line_No: 14, Details: "Operating Profit", "Mar-2026": 9217.00 },
    { Game_Id: "OpsMgt", Game_Batch: 99, Game_Team: "Demo", Line_No: 15, Details: "Office Expenses", "Mar-2026": 370.00 },
    { Game_Id: "OpsMgt", Game_Batch: 99, Game_Team: "Demo", Line_No: 16, Details: "Office & WareHouse Rent", "Mar-2026": 195.00 },
    { Game_Id: "OpsMgt", Game_Batch: 99, Game_Team: "Demo", Line_No: 17, Details: "Salary", "Mar-2026": 1270.00 },
    { Game_Id: "OpsMgt", Game_Batch: 99, Game_Team: "Demo", Line_No: 18, Details: "Management Charges", "Mar-2026": 500.00 },
    { Game_Id: "OpsMgt", Game_Batch: 99, Game_Team: "Demo", Line_No: 19, Details: "Advertisement Expenses", "Mar-2026": 270.00 },
    { Game_Id: "OpsMgt", Game_Batch: 99, Game_Team: "Demo", Line_No: 20, Details: "Travelling & Misc Expenses", "Mar-2026": 570.00 },
    { Game_Id: "OpsMgt", Game_Batch: 99, Game_Team: "Demo", Line_No: 21, Details: "Freight Outward", "Mar-2026": 0.00 },
    { Game_Id: "OpsMgt", Game_Batch: 99, Game_Team: "Demo", Line_No: 22, Details: "Insurance", "Mar-2026": 195.00 },
    { Game_Id: "OpsMgt", Game_Batch: 99, Game_Team: "Demo", Line_No: 23, Details: "Admin OH Expense", "Mar-2026": 3370.00 },
    { Game_Id: "OpsMgt", Game_Batch: 99, Game_Team: "Demo", Line_No: 24, Details: "Non-Project Expense", "Mar-2026": 0.00 },
    { Game_Id: "OpsMgt", Game_Batch: 99, Game_Team: "Demo", Line_No: 25, Details: "Profit Before Int & Tax", "Mar-2026": 5847.00 },
    { Game_Id: "OpsMgt", Game_Batch: 99, Game_Team: "Demo", Line_No: 26, Details: "Interest", "Mar-2026": 0.00 },
    { Game_Id: "OpsMgt", Game_Batch: 99, Game_Team: "Demo", Line_No: 27, Details: "Profit Before Tax", "Mar-2026": 5847.00 },
    { Game_Id: "OpsMgt", Game_Batch: 99, Game_Team: "Demo", Line_No: 28, Details: "Corporate Tax", "Mar-2026": 993.99 },
    { Game_Id: "OpsMgt", Game_Batch: 99, Game_Team: "Demo", Line_No: 29, Details: "Profit After Tax", "Mar-2026": 4853.01 },
    { Game_Id: "OpsMgt", Game_Batch: 99, Game_Team: "Demo", Line_No: 30, Details: "Profit %", "Mar-2026": 17.97 },
];

// Function: mimic the async service call so the mock is a drop-in for finISService
export const fetchIncomeStatementMock = async () =>
    new Promise((resolve) => setTimeout(() => resolve(finISMockData), 150));

export default finISMockData;
