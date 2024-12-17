import * as React from 'react';
import { Box, Checkbox, TextField, Select, MenuItem, IconButton } from "@mui/material";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import DeleteIcon from '@mui/icons-material/Delete';
import { useState, useEffect } from "react";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: { fontSize: 14, },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': { backgroundColor: theme.palette.action.hover, },
    '&:last-child td, &:last-child th': { border: 0, },
}));

function AddTableData({ editableTableData, onCheckboxChange, hiddenColumns, tableInputTypes, inputTableHeadings }) {

    const [tableData, setTableData] = useState([]);
    const [checkedItems, setCheckedItems] = useState([]);
    const initialSelectValues = {};
    editableTableData?.forEach(row => {
        Object.keys(row)?.forEach(key => {
            if (!initialSelectValues[key]) {
                initialSelectValues[key] = new Set();
            }
            initialSelectValues[key].add(row[key]);
        });
    });
    useEffect(() => {
        // Initialize with one row by default 
        if (tableData.length === 0) {
            handleAddEntry();
        }
    }, []);
    const handleCheckboxChange = (event, rowIndex) => {
        const updatedCheckedItems = [...checkedItems];
        if (event.target.checked) {
            updatedCheckedItems.push(rowIndex);
            handleAddEntry();
        } else {
            const index = updatedCheckedItems.indexOf(rowIndex);
            if (index > -1) {
                updatedCheckedItems.splice(index, 1);
            }
        }

        setCheckedItems(updatedCheckedItems);
        emitCheckedValues(updatedCheckedItems);
    };
    const emitCheckedValues = (checkedRows) => {
        const selectedRows = checkedRows.map(rowIndex => tableData[rowIndex]);
        onCheckboxChange(selectedRows);
    };
    const handleInputChange = (event, rowIndex, key) => {
        const newData = [...tableData];
        newData[rowIndex][key].value = event.target.value;
        setTableData(newData);
    };
    const handleAddEntry = () => {
        const newRow = {};
        tableInputTypes?.forEach(typeObj => {
            newRow[typeObj.columnName] = { value: '', inputType: typeObj.inputType };
        });
        setTableData([...tableData, newRow]);
    };
    const handleDeleteEntry = (rowIndex) => {
        const newData = tableData.filter((_, index) => index !== rowIndex);
        const newCheckedItems = checkedItems.filter(index => index !== rowIndex);
        setTableData(newData);
        setCheckedItems(newCheckedItems);
        emitCheckedValues(newCheckedItems);
    };
    const renderInputField = (valueObj, key, rowIndex) => {
        const isChecked = checkedItems.includes(rowIndex);
        switch (valueObj[key]?.inputType) {
            case 'select':
                return (<Select
                    value={valueObj[key]?.value}
                    onChange={(event) => handleInputChange(event, rowIndex, key)} required={isChecked}
                >
                    {
                        Array.from(initialSelectValues[key] || []).map((value, index) => (
                            <MenuItem key={index} value={value}>{value}</MenuItem>
                        ))}
                </Select>
                );
            case 'checkbox':
                return (<Checkbox
                    checked={valueObj[key]?.value}
                    onChange={(event) => handleInputChange(event, rowIndex, key)} required={isChecked} />);
            case 'text':
                return (<TextField
                    value={valueObj[key]?.value}
                    onChange={(event) => handleInputChange(event, rowIndex, key)}
                    required={isChecked} />);
            default:
                return valueObj[key]?.value;
        }
    };

    return (
        <Box margin={10} sx={{ flexGrow: 1 }}>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 500 }} aria-label="customized table">
                    <TableHead>
                        <TableRow>
                            <StyledTableCell align="center">Select</StyledTableCell>
                            {inputTableHeadings.map((headingString, index) => (
                                !hiddenColumns.includes(headingString) &&
                                <StyledTableCell key={index} align="center">
                                    {headingString}
                                </StyledTableCell>
                            ))}
                            <StyledTableCell align="center">Actions</StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            tableData?.map((valueObj, rowIndex) => (
                                <StyledTableRow key={rowIndex} align="right">
                                    <StyledTableCell align="center">
                                        <Checkbox
                                            checked={checkedItems.includes(rowIndex)}
                                            onChange={(event) => handleCheckboxChange(event, rowIndex)}
                                        />
                                    </StyledTableCell>
                                    {
                                        Object.keys(valueObj)?.map((key, cellIndex) => (
                                            !hiddenColumns.includes(key) && key !== 'Actions' &&
                                            <StyledTableCell key={cellIndex} align="center">
                                                {renderInputField(valueObj, key, rowIndex)}
                                            </StyledTableCell>
                                        ))
                                    }
                                    {rowIndex !== 0 && (
                                        <StyledTableCell align="center">
                                            <IconButton onClick={() => handleDeleteEntry(rowIndex)}>
                                                <DeleteIcon />
                                            </IconButton>
                                        </StyledTableCell>
                                    )}
                                </StyledTableRow>
                            ))
                        }
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    );
}

export default AddTableData;
