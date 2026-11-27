
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
  inputTableHeadings,
  inputTableData,
  ifNoData,
  isAnEditableTable = false,
  hiddenColumns = [],
  highlightRowsByDetail = [],
  highlightColumnsByField = [],
  dateFormatColumns = [],
}) {
  // Flat value set (unused elsewhere)
  let tableValueSet = inputTableData?.map((tableDataObj) => {
    return Object.values(tableDataObj);
  });

  // Derive cell meta (type/date handling)
  let cellValueType = inputTableData?.map((tableObj) => {
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

  if (ifNoData) {
    return (
      <Box marginLeft={5} marginRight={5} marginTop={2} sx={{ flexGrow: 1 }}>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 500 }} aria-label="customized table">
            <TableHead>
              <TableRow>
                {inputTableHeadings?.map((headingString) => {
                  if (!hiddenColumns.includes(headingString)) {
                    return (
                      <StyledTableCell align="right">
                        {headingString}
                      </StyledTableCell>
                    );
                  }
                })}
              </TableRow>
            </TableHead>
            <TableBody>
              <StyledTableRow align="right">
                {"Error occurred while loading the table..."}
              </StyledTableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    );
  } else if (isAnEditableTable) {
    // Editable table rendering with optional column highlight
    return (
      <Box marginLeft={5} marginRight={5} marginTop={2} sx={{ flexGrow: 1 }}>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 500 }} aria-label="customized table">
            <TableHead>
              <TableRow>
                {inputTableHeadings?.map((headingString) => {
                  return (
                    <StyledTableCell align="right">
                      {headingString}
                    </StyledTableCell>
                  );
                })}
              </TableRow>
            </TableHead>
            <TableBody>
              {cellValueType?.map((valueSet) => {
                return (
                  <StyledTableRow align="right">
                    {Object.keys(valueSet).map((key) => {
                      if (!hiddenColumns.includes(key)) {
                        return (
                          <StyledTableCell
                            align="right"
                            sx={{
                              fontWeight: highlightColumnsByField.includes(key) ? "bold" : "normal",
                            }}
                          >
                            {valueSet[key]?.inputType === "checkbox" ? (
                              <DoneAllIcon />
                            ) : (
                              valueSet[key]?.value
                            )}
                          </StyledTableCell>
                        );
                      }
                    })}
                  </StyledTableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    );
  } else {
    // Read-only table rendering with row + column highlight
    return (
      <Box marginLeft={2} marginRight={2} marginTop={2} sx={{ flexGrow: 1 }}>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 500 }} aria-label="customized table">
            <TableHead>
              <TableRow>
                {inputTableHeadings?.map((headingString) => {
                  return (
                    <StyledTableCell align="right">
                      {headingString}
                    </StyledTableCell>
                  );
                })}
              </TableRow>
            </TableHead>
            <TableBody>
              {inputTableData?.map((valueObj) => {
                const isVital = highlightRowsByDetail.includes(valueObj["Details"]);
                return (
                  <StyledTableRow align="right">
                    {Object.keys(valueObj).map((key) => {
                      if (!hiddenColumns.includes(key)) {
                        // Explicit date configuration takes priority over legacy detection
                        const dateConfig = dateFormatColumns.find(
                          (column) =>
                            column.field.toLowerCase() === key.toLowerCase()
                        );

                        const isLegacyDate =
                          dateColumns.some(
                            (column) =>
                              column === key.toLowerCase() || column === key
                          ) || key.toLowerCase().includes("date");

                        const cellValue = dateConfig
                          ? formatDateWithConfig(valueObj[key], dateConfig.format)
                          : isLegacyDate
                            ? formatDate(valueObj[key])
                            : valueObj[key];

                        return (
                          <StyledTableCell
                            align="right"
                            sx={{
                              fontWeight:
                                isVital || highlightColumnsByField.includes(key)
                                  ? "bold"
                                  : "normal",
                            }}
                          >
                            {cellValue}
                          </StyledTableCell>
                        );
                      }
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
}

// Explicit date formatting with legacy fallback
function formatDateWithConfig(date, format) {
  if (!date) return "";

  if (format !== "MMM yyyy" && format !== "dd-MMM-yyyy") {
    return formatDate(date);
  }

  try {
    const parsedDate = new Date(date);

    if (isNaN(parsedDate.getTime())) return date;

    const options =
      format === "MMM yyyy"
        ? { month: "short", year: "numeric" }
        : { day: "2-digit", month: "short", year: "numeric" };

    return new Intl.DateTimeFormat("en-US", options)
      .format(parsedDate)
      .replace(/(\d{1,2}),/, "$1");
  } catch {
    return date;
  }
}

export default GenericTable;
