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
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { useState } from "react";
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

function EditableTable({ editableTableData, onCheckboxChange, hiddenColumns }) {
  const [checkedItems, setCheckedItems] = useState({});

  if (editableTableData && editableTableData.length > 0) {
    const transformDataToEditableTableData = (
      editableTableData,
      inputType = "text"
    ) => {
      return editableTableData?.map((item) => {
        const transformedItem = {};
        Object.keys(item).forEach((key) => {
          transformedItem[key] = {
            value: item[key],
            inputType: key === "Decision" ? "checkbox" : inputType,
          };
        });
        return transformedItem;
      });
    };

    const inputTableHeadings = Object.keys(editableTableData[0]);

    const tableData = transformDataToEditableTableData(
      editableTableData,
      "readOnly"
    );

    const handleCheckboxChange = (event, id) => {
      setCheckedItems({ ...checkedItems, id: id, value: event.target.checked });
      onCheckboxChange(id, event.target.checked);
    };

    return (
      <Box marginLeft={2} marginRight={2} sx={{ flexGrow: 1 }}>
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
                {inputTableHeadings.map((headingString, index) => {
                  if (!hiddenColumns.includes(headingString)) {
                    return (
                      <StyledTableCell key={index} align="center">
                        {headingString}
                      </StyledTableCell>
                    );
                  }
                })}
              </TableRow>
            </TableHead>
            <TableBody>
              {tableData?.map((valueObj) => {
                return (
                  <StyledTableRow align="right">
                    {Object.keys(valueObj).map((key) => {
                      if (!hiddenColumns.includes(key)) {
                        const cellClass =
                          valueObj[key]?.value?.length > 13 ? "large-cell" : "";
                        return valueObj[key].inputType === "readOnly" ? (
                          <StyledTableCell className={cellClass} align="center">
                            {dateColumns.some((column) =>
                              column.includes(key.toLowerCase())
                            ) || key.toLowerCase().includes("date")
                              ? formatDate(valueObj[key].value)
                              : valueObj[key].value}
                          </StyledTableCell>
                        ) : (
                          <FormControlLabel
                            control={
                              <Checkbox
                                checked={valueObj[key].value}
                                onChange={(event) =>
                                  handleCheckboxChange(
                                    event,
                                    valueObj.Strategy_Id.value
                                  )
                                }
                              />
                            }
                          />
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

export default EditableTable;
