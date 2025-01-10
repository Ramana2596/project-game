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
import RestoreIcon from "@mui/icons-material/Restore";
import { useState, useEffect } from "react";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
    padding: "8px 16px", // Adjust the padding to reduce height
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  "&:last-child td, &:last-child th": {
    border: 0,
  },
  "&.deleted": {
    backgroundColor: theme.palette.action.disabledBackground,
    textDecoration: "line-through",
  },
}));

function EditableTableData({
  editableTableData,
  onCheckboxChange,
  hiddenColumns,
  tableInputTypes,
  inputTableHeadings,
  onUpdate,
}) {
  const [tableData, setTableData] = useState([]);

  const initialSelectValues = {};

  editableTableData?.forEach((row) => {
    Object.keys(row).forEach((key) => {
      if (!initialSelectValues[key]) {
        initialSelectValues[key] = new Set();
      }
      initialSelectValues[key].add(row[key]);
    });
  });

  useEffect(() => {
    setTableData(transformDataToEditableTableData(editableTableData));
  }, [editableTableData]);

  function transformDataToEditableTableData(data) {
    return data?.map((item) => {
      const transformedItem = { ...item, deleted: false };
      return transformedItem;
    });
  }

  const handleCheckboxChange = (event, rowIndex, key) => {
    const newData = [...tableData];
    newData[rowIndex][key] = event.target.checked;
    setTableData(newData);
    onUpdate(newData);
  };

  const handleInputChange = (event, rowIndex, key) => {
    const newData = [...tableData];
    const { value, type } = event.target;
    newData[rowIndex][key] = type === "number" ? parseFloat(value) : value;
    setTableData(newData);
    onUpdate(newData);
  };

  const handleDeleteEntry = (rowIndex) => {
    const newData = [...tableData];
    newData[rowIndex].deleted = !newData[rowIndex].deleted;
    setTableData(newData);
    onUpdate(newData);
  };

  const renderInputField = (valueObj, key, rowIndex) => {
    if (key === "deleted") return null;
    switch (
      tableInputTypes.find((typeObj) => typeObj.columnName === key)?.inputType
    ) {
      case "select":
        return (
          <Select
            value={valueObj[key]}
            onChange={(event) => handleInputChange(event, rowIndex, key)}
          >
            {Array.from(initialSelectValues[key] || [])?.map((value, index) => (
              <MenuItem key={index} value={value}>
                {value}
              </MenuItem>
            ))}
          </Select>
        );
      case "checkbox":
        return (
          <Checkbox
            checked={valueObj[key]}
            onChange={(event) => handleCheckboxChange(event, rowIndex, key)}
          />
        );
      case "text":
        return (
          <TextField
            type="number"
            value={valueObj[key]}
            onChange={(event) => handleInputChange(event, rowIndex, key)}
          />
        );
      default:
        return valueObj[key];
    }
  };

  return (
    <Box marginLeft={10} marginRight={10} sx={{ flexGrow: 1 }}>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 500 }} aria-label="customized table">
          <TableHead>
            <TableRow>
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
              <StyledTableRow
                key={rowIndex}
                className={valueObj.deleted ? "deleted" : ""}
                align="right"
              >
                {Object.keys(valueObj).map(
                  (key, cellIndex) =>
                    !hiddenColumns.includes(key) &&
                    key !== "deleted" && (
                      <StyledTableCell key={cellIndex} align="center">
                        {renderInputField(valueObj, key, rowIndex)}
                      </StyledTableCell>
                    )
                )}
                <StyledTableCell align="center">
                  <IconButton onClick={() => handleDeleteEntry(rowIndex)}>
                    {valueObj.deleted ? <RestoreIcon /> : <DeleteIcon />}
                  </IconButton>
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}

export default EditableTableData;
