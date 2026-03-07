```javascript
// GenericTable.jsx
// Final Industry-grade universal table using MUI DataGrid
// Compact columns + horizontal scroll

import * as React from "react";
import { Box, Tooltip } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import DoneAllIcon from "@mui/icons-material/DoneAll";
import { dateColumns } from "../constants/globalConstants.js";
import { formatDate } from "../utils/formatDate";


// Indian number formatting
const formatNumber = (value) => {
  if (value === null || value === undefined) return "";
  if (!isNaN(value)) return new Intl.NumberFormat("en-US").format(value);
  return value;
};


// detect numeric
const isNumeric = (value) => {
  if (value === null || value === undefined) return false;
  return !isNaN(value);
};


function GenericTable({
  inputTableHeadings,
  inputTableData,
  ifNoData,
  isAnEditableTable = false,
  hiddenColumns = [],
  highlightRowsByDetail = [],
  highlightColumnsByField = [],
}) {

  const tableData = Array.isArray(inputTableData) ? inputTableData : [];

  const rows = tableData.map((row, index) => ({
    id: index + 1,
    ...row,
  }));


  const columns =
    tableData.length > 0
      ? Object.keys(tableData[0])
          .filter((key) => !hiddenColumns.includes(key))
          .map((key) => {

            const firstValue = tableData[0][key];
            const numeric = isNumeric(firstValue);

            return {
              field: key,
              headerName: key.replaceAll("_", " "),
              width: 180,        // fixed width prevents stretching
              sortable: true,

              align: numeric ? "right" : "left",
              headerAlign: numeric ? "right" : "left",

              cellClassName: highlightColumnsByField.includes(key)
                ? "highlight-column"
                : "",

              renderCell: (params) => {

                const value = params.value;

                if (key === "Game_Id" && isAnEditableTable) {
                  return <DoneAllIcon fontSize="small" />;
                }

                if (
                  dateColumns.includes(key.toLowerCase()) ||
                  key.toLowerCase().includes("date")
                ) {
                  return formatDate(value);
                }

                const displayValue = formatNumber(value);

                return (
                  <Tooltip title={String(displayValue)}>
                    <span
                      style={{
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                        width: "100%",
                      }}
                    >
                      {displayValue}
                    </span>
                  </Tooltip>
                );
              },
            };
          })
      : [];


  const getRowClassName = (params) => {
    const highlight = highlightRowsByDetail.includes(params.row?.Details);
    return highlight ? "highlight-row" : "";
  };


  if (ifNoData || tableData.length === 0) {
    return (
      <Box marginLeft={2} marginRight={2} marginTop={2}>
        <Box
          sx={{
            padding: 3,
            textAlign: "center",
            border: "1px solid #e5e7eb",
            borderRadius: 1,
            backgroundColor: "#f9fafb",
          }}
        >
          No data available
        </Box>
      </Box>
    );
  }


  return (
    <Box
      marginLeft={2}
      marginRight={2}
      marginTop={2}
      sx={{
        width: "100%",
        overflowX: "auto",   // enables horizontal scroll
      }}
    >
      <DataGrid
        rows={rows}
        columns={columns}
        autoHeight
        pagination
        pageSizeOptions={[5, 10, 25, 50]}
        disableRowSelectionOnClick
        getRowClassName={getRowClassName}

        sx={{
          minWidth: columns.length * 180,   // prevents stretching

          border: "1px solid #e5e7eb",
          fontFamily: "Inter, Roboto, Arial",
          fontSize: 13,

          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: "#000000",
            color: "#ffffff",
            fontWeight: 600,
          },

          "& .MuiDataGrid-row:nth-of-type(odd)": {
            backgroundColor: "#f8fafc",
          },

          "& .MuiDataGrid-row:hover": {
            backgroundColor: "#f1f5f9",
          },

          "& .highlight-column": {
            backgroundColor: "#fef9c3",
            fontWeight: 600,
          },

          "& .highlight-row": {
            fontWeight: 600,
            backgroundColor: "#fefce8",
          },
        }}
      />
    </Box>
  );
}

export default GenericTable;
```
