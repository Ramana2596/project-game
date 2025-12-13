import * as React from "react";
import {
  Box,
  Checkbox,
  TextField,
  Select,
  MenuItem,
  IconButton,
} from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import DeleteIcon from "@mui/icons-material/Delete";
import { useState, useEffect } from "react";

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

function AddTableData({
  onCheckboxChange,
  hiddenColumns,
  tableInputTypes,
  inputTableHeadings,
  resetKey,
}) {
  const [tableData, setTableData] = useState([]);
  const [checkedItems, setCheckedItems] = useState([]);

  useEffect(() => {
    // Initialize with one row by default
    if (resetKey) {
      setTableData([]);
      setCheckedItems([]);
    }
  }, [resetKey]);

  useEffect(() => {
    // Initialize with one row by default
    if (tableData?.length === 0) {
      handleAddEntry();
    }
  }, [tableData]);

  const handleCheckboxChange = (event, rowIndex) => {
    if (isRowComplete(tableData[rowIndex])) {
      const updatedCheckedItems = [...checkedItems];
      if (event.target.checked) {
        updatedCheckedItems.push(rowIndex);
        if (rowIndex === tableData.length - 1) {
          handleAddEntry();
        }
      } else {
        const index = updatedCheckedItems.indexOf(rowIndex);
        if (index > -1) {
          updatedCheckedItems.splice(index, 1);
        }
      }

      setCheckedItems(updatedCheckedItems);
      emitCheckedValues(updatedCheckedItems);
    } else {
      event.preventDefault();
    }
  };

  const emitCheckedValues = (checkedRows) => {
    const selectedRows = checkedRows.map((rowIndex) => tableData[rowIndex]);
    onCheckboxChange(selectedRows);
  };

  const handleInputChange = (event, rowIndex, key) => {
    const newData = [...tableData];
    newData[rowIndex][key].value = event.target.value;
    setTableData(newData);
  };

  const handleAddEntry = () => {
    const newRow = {};
    tableInputTypes?.forEach((typeObj) => {
      newRow[typeObj.columnName] = {
        value: "",
        inputType: typeObj.inputType,
        data: typeObj.data || [],
      };
    });
    setTableData([...tableData, newRow]);
  };

  const handleDeleteEntry = (rowIndex) => {
    const newData = tableData.filter((_, index) => index !== rowIndex);
    const newCheckedItems = checkedItems.filter((index) => index !== rowIndex);
    setTableData(newData);
    setCheckedItems(newCheckedItems);
    emitCheckedValues(newCheckedItems);
  };

  const isRowComplete = (row) => {
    return Object.keys(row).every((key) => {
      if (row[key].inputType) {
        const value = row[key].value;
        return value !== "" && value !== null && value !== undefined;
      }
    });
  };

  const renderInputField = (valueObj, key, rowIndex) => {
    switch (valueObj[key]?.inputType) {
      case "select":
        return (
          <Select
            value={valueObj[key]?.value}
            onChange={(event) => handleInputChange(event, rowIndex, key)}
            required
          >
            {(valueObj[key]?.data || []).map((item, index) => (
              <MenuItem key={index} value={item.value}>
                {item.label}
              </MenuItem>
            ))}
          </Select>
        );
      case "checkbox":
        return (
          <Checkbox
            checked={valueObj[key]?.value}
            onChange={(event) => handleInputChange(event, rowIndex, key)}
            required
          />
        );
      case "number":
        return (
          <TextField
            type="number"
            value={valueObj[key]?.value}
            onChange={(event) => handleInputChange(event, rowIndex, key)}
            required
          />
        );
      case "text":
        return (
          <TextField
            value={valueObj[key]?.value}
            onChange={(event) => handleInputChange(event, rowIndex, key)}
            required
          />
        );
      default:
        return valueObj[key]?.value;
    }
  };

  return (
    <Box marginLeft={10} marginRight={10} sx={{ flexGrow: 1 }}>
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
              <StyledTableCell align="center">Select</StyledTableCell>
              {inputTableHeadings.map(
                (headingString, index) =>
                  !hiddenColumns.includes(headingString) && (
                    <StyledTableCell key={index} align="center">
                      {headingString}
                    </StyledTableCell>
                  )
              )}
              <StyledTableCell align="center">Actions</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {tableData?.map((valueObj, rowIndex) => (
              <StyledTableRow key={rowIndex} align="right">
                <StyledTableCell align="center">
                  <Checkbox
                    checked={checkedItems.includes(rowIndex)}
                    onChange={(event) => handleCheckboxChange(event, rowIndex)}
                  />
                </StyledTableCell>
                {Object.keys(valueObj)?.map(
                  (key, cellIndex) =>
                    !hiddenColumns.includes(key) &&
                    key !== "Actions" && (
                      <StyledTableCell key={cellIndex} align="center">
                        {renderInputField(valueObj, key, rowIndex)}
                      </StyledTableCell>
                    )
                )}
                {rowIndex !== 0 && (
                  <StyledTableCell align="center">
                    <IconButton onClick={() => handleDeleteEntry(rowIndex)}>
                      <DeleteIcon />
                    </IconButton>
                  </StyledTableCell>
                )}
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}

export default AddTableData;
