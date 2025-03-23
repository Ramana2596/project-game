import * as React from "react";
import { Box, Checkbox, TextField, Select, MenuItem, IconButton } from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import DeleteIcon from "@mui/icons-material/Delete";

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
}));

function AddTableCascading({
    tableInputTypes,
    onUpdateRowValues,
    onCheckboxChange,
    updatedRowDataToChild,
    resetKey,
}) {
    const [tableData, setTableData] = React.useState([]);
    const [checkedItems, setCheckedItems] = React.useState([]);
    const [currentRowIndex, setCurrentRowIndex] = React.useState(null); // Track the index of the currently selected row

    // Reset tableData and checkedItems when resetKey changes
    React.useEffect(() => {
        if (resetKey) {
            setTableData([]);
            setCheckedItems([]);
        }
    }, [resetKey]);

    React.useEffect(() => {
        // Initialize with one row by default
        if (tableData?.length === 0) {
            handleAddEntry();
        }
    }, [tableData]);

    // Update tableData with new values when updatedRowDataToChild is passed
    React.useEffect(() => {
        if (updatedRowDataToChild) {
            setTableData((prevData) => {
                return prevData.map((row, index) => {
                    if (index === currentRowIndex) {
                        return updatedRowDataToChild;
                    }
                    return row;
                });
            });
        }
    }, [updatedRowDataToChild]);

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

    const isRowComplete = (row) => {
        return Object.keys(row).every((key) => {
            if (row[key].inputType) {
                const value = row[key].value;
                return value !== "" && value !== null && value !== undefined;
            }
        });
    };

    const emitCheckedValues = (checkedRows) => {
        const selectedRows = checkedRows.map((rowIndex) => tableData[rowIndex]);
        onCheckboxChange(selectedRows);
    };

    const handleInputChange = (event, rowIndex, key) => {
        const newData = [...tableData];
        newData[rowIndex][key].value = event.target.value;
        setTableData(newData);
        onUpdateRowValues(newData[rowIndex]);
        setCurrentRowIndex(rowIndex); // Set the current row index after input change
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
        setTableData((prevData) => [...prevData, newRow]);
    };

    const handleDeleteEntry = (rowIndex) => {
        const newData = tableData.filter((_, index) => index !== rowIndex);
        const newCheckedItems = checkedItems.filter((index) => index !== rowIndex);
        setTableData(newData);
        setCheckedItems(newCheckedItems);
        emitCheckedValues(newCheckedItems);
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
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 500 }} aria-label="customized table">
                    <TableHead>
                        <TableRow>
                            <StyledTableCell align="center">Select</StyledTableCell>
                            {tableInputTypes.map((typeObj, index) => (
                                <StyledTableCell key={index} align="center">
                                    {typeObj.columnName}
                                </StyledTableCell>
                            ))}
                            <StyledTableCell align="center">Actions</StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {tableData?.map((valueObj, rowIndex) => (
                            <StyledTableRow key={rowIndex}>
                                <StyledTableCell align="center">
                                    <Checkbox
                                        checked={checkedItems.includes(rowIndex)}
                                        onChange={(event) => handleCheckboxChange(event, rowIndex)}
                                    />
                                </StyledTableCell>
                                {Object.keys(valueObj)?.map((key, cellIndex) => (
                                    <StyledTableCell key={cellIndex} align="center">
                                        {renderInputField(valueObj, key, rowIndex)}
                                    </StyledTableCell>
                                ))}
                                <StyledTableCell align="center">
                                    <IconButton onClick={() => handleDeleteEntry(rowIndex)}>
                                        <DeleteIcon />
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

export default AddTableCascading;
