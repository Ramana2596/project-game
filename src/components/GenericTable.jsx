import * as React from "react";
import { Box } from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import DoneAllIcon from "@mui/icons-material/DoneAll";
import { dateColumns } from "../constants/globalConstants.js";
import { formatDate } from "../utils/formatDate";

// Styled header/body cell visuals
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
    padding: "8px 16px", 
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

// Zebra striping rows
const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

function GenericTable({
  inputTableHeadings = [],             // ✅ Default to empty array
  inputTableData = [],                 // ✅ Default to empty array (Fixes .map error)
  ifNoData,                            // Flag to show error row instead of data
  isAnEditableTable = false,           // Switch between read-only and checkbox table modes
  hiddenColumns = [],                  // DB field names to be hidden from rendering
  highlightRowsByDetail = [],          // row highlight prop
  highlightColumnsByField = [],        // column highlight by DB field name
}) {
  // Derive cell meta (type/date handling)
  let cellValueType = (inputTableData || []).map((tableObj) => {
    const transFormedItem = {};
    Object.keys(tableObj).forEach((key) => {
      transFormedItem[key] = {
        value: tableObj[key],
        inputType: key === "Game_Id" ? "checkbox" : "readOnly",
        valueType: dateColumns.includes(key.toLowerCase()) ? "date" : "text",
      };
    });
    return transFormedItem;
  });

  // Handle Error or Empty states
  if (ifNoData || !inputTableData || inputTableData.length === 0) {
    return (
      <Box marginLeft={5} marginRight={5} marginTop={2} sx={{ flexGrow: 1 }}>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 500 }} aria-label="customized table">
            <TableHead>
              <TableRow>
                {(inputTableHeadings || []).map((headingString) => {
                  if (!hiddenColumns.includes(headingString)) {
                    return (
                      <StyledTableCell key={headingString} align="right">
                        {headingString}
                      </StyledTableCell>
                    );
                  }
                  return null;
                })}
              </TableRow>
            </TableHead>
            <TableBody>
              <StyledTableRow>
                <TableCell colSpan={inputTableHeadings.length || 1} align="center">
                  {ifNoData ? "Error occurred while loading the table..." : "No data available"}
                </TableCell>
              </StyledTableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    );
  }

  // Render logic for editable checkbox tables
  if (isAnEditableTable) {
    return (
      <Box marginLeft={5} marginRight={5} marginTop={2} sx={{ flexGrow: 1 }}>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 500 }} aria-label="customized table">
            <TableHead>
              <TableRow>
                {inputTableHeadings.map((headingString) => (
                  <StyledTableCell key={headingString} align="right">{headingString}</StyledTableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {cellValueType.map((valueSet, index) => (
                <StyledTableRow key={index} align="right">
                  {Object.keys(valueSet).map((key) => {
                    if (!hiddenColumns.includes(key)) {
                      return (
                        <StyledTableCell 
                          key={key} 
                          align="right" 
                          sx={{ fontWeight: highlightColumnsByField.includes(key) ? "bold" : "normal" }}
                        >
                          {valueSet[key]?.inputType === "checkbox" ? <DoneAllIcon /> : valueSet[key]?.value}
                        </StyledTableCell>
                      );
                    }
                    return null;
                  })}
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    );
  }

  // Render logic for standard read-only tables
  return (
    <Box marginLeft={2} marginRight={2} marginTop={2} sx={{ flexGrow: 1 }}>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 500 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              {inputTableHeadings.map((headingString) => (
                <StyledTableCell key={headingString} align="right">{headingString}</StyledTableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {inputTableData.map((valueObj, index) => {
              const isVital = highlightRowsByDetail.includes(valueObj["Details"]);
              return (
                <StyledTableRow key={index} align="right">
                  {Object.keys(valueObj).map((key) => {
                    if (!hiddenColumns.includes(key)) {
                      const isDate = dateColumns.some(col => col === key.toLowerCase() || col === key) || key.toLowerCase().includes("date");
                      return (
                        <StyledTableCell
                          key={key}
                          align="right"
                          sx={{ fontWeight: (isVital || highlightColumnsByField.includes(key)) ? "bold" : "normal" }}
                        >
                          {isDate ? formatDate(valueObj[key]) : valueObj[key]}
                        </StyledTableCell>
                      );
                    }
                    return null;
                  })}
                </StyledTableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}

export default GenericTable;