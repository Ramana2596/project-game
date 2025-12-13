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



const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: '#1a1a1a',
    color: theme.palette.common.white,
    padding: "14px 16px",
    fontWeight: 600,
    fontSize: '0.95rem',
    letterSpacing: '0.3px',
    borderBottom: 'none',
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
    padding: "12px 16px",
    color: '#333',
    borderBottom: '1px solid rgba(123, 31, 162, 0.1)',
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  backgroundColor: theme.palette.common.white,
  "&:nth-of-type(even)": {
    backgroundColor: 'rgba(123, 31, 162, 0.03)',
  },
  "&:hover": {
    backgroundColor: 'rgba(123, 31, 162, 0.08)',
    transition: 'background-color 0.2s ease',
  },
  "&:last-child td": {
    borderBottom: 'none',
  },
}));

function GenericTable({
  inputTableHeadings,
  inputTableData,
  ifNoData,
  isAnEditableTable = false,
  hiddenColumns = [],
  highlightRowsByDetail = [],        // ✅ new prop. Ensures safe operation even if no rows are passed.
}) {
  let tableValueSet = inputTableData?.map((tableDataObj) => {
    return Object.values(tableDataObj);
  });

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
        <TableContainer 
          component={Paper} 
          sx={{ 
            borderRadius: '12px',
            boxShadow: '0 4px 16px rgba(123, 31, 162, 0.15)',
            border: '1px solid rgba(123, 31, 162, 0.1)',
            overflow: 'hidden',
          }}
        >
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
                {"Some error occurred while loading the table..."}
              </StyledTableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    );
  } else if (isAnEditableTable) {
    return (
      <Box marginLeft={5} marginRight={5} marginTop={2} sx={{ flexGrow: 1 }}>
        <TableContainer 
          component={Paper} 
          sx={{ 
            borderRadius: '12px',
            boxShadow: '0 4px 16px rgba(123, 31, 162, 0.15)',
            border: '1px solid rgba(123, 31, 162, 0.1)',
            overflow: 'hidden',
          }}
        >
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
                          <StyledTableCell align="right">
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
    return (
      <Box marginLeft={2} marginRight={2} marginTop={2} sx={{ flexGrow: 1 }}>
        <TableContainer 
          component={Paper} 
          sx={{ 
            borderRadius: '12px',
            boxShadow: '0 4px 16px rgba(123, 31, 162, 0.15)',
            border: '1px solid rgba(123, 31, 162, 0.1)',
            overflow: 'hidden',
          }}
        >
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
 {/*           <TableBody>
              {inputTableData?.map((valueObj) => {
                return (
                  <StyledTableRow align="right">
                    {Object.keys(valueObj).map((key) => {
                      if (!hiddenColumns.includes(key)) {
                        return (
                          <StyledTableCell align="right">
                            {dateColumns.some((column) =>
                              column === key.toLowerCase() || column === key
                            ) || key.toLowerCase().includes("date")
                              ? formatDate(valueObj[key])
                              : valueObj[key]}
                          </StyledTableCell>
                        );
                      }
                    })}
                  </StyledTableRow>
                );
              })}
            </TableBody>
  */}
              <TableBody>
              {inputTableData?.map((valueObj) => {
                  const isVital = highlightRowsByDetail.includes(valueObj["Details"]); // ✅ use prop
                return (
                  <StyledTableRow align="right">
                    {Object.keys(valueObj).map((key) => {
                      if (!hiddenColumns.includes(key)) {
                        return (
                          <StyledTableCell
                            align="right"
                            sx={{
                              fontWeight: isVital ? "bold" : "normal",
                            }}
                          >
                            {dateColumns.some(
                              (column) =>
                                column === key.toLowerCase() || column === key
                            ) || key.toLowerCase().includes("date")
                              ? formatDate(valueObj[key])
                              : valueObj[key]}
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

export default GenericTable;
