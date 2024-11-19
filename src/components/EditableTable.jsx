import * as React from 'react';
import { Box } from "@mui/material"
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { useState } from "react";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));


const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));

function EditableTable({ editableTableData, onCheckboxChange }) {
    const [checkedItems, setCheckedItems] = useState({});

    if (editableTableData && editableTableData.length > 0) {

        const transformDataToEditableTableData = (editableTableData, inputType = 'text') => {
            return editableTableData?.map(item => {
                const transformedItem = {};
                Object.keys(item).forEach(key => {
                    transformedItem[key] = {
                        value: item[key],
                        inputType: key === 'Decision' ? 'checkbox' : inputType
                    };
                });
                return transformedItem;
            });
        };

        const inputTableHeadings = Object.keys(editableTableData[0]);

        const tableData = transformDataToEditableTableData(editableTableData, 'readOnly');

        // Extract values
        const valueStringArr = tableData.map(item => {
            const values = [];
            Object.keys(item).forEach(key => {
                values.push(item[key].value);
            });
            return values;
        });

        // Extract input types
        const inputTypeArr = tableData.map(item => {
            const inputTypes = [];
            Object.keys(item).forEach(key => {
                inputTypes.push(item[key].inputType);
            });
            return inputTypes;
        });

        const handleCheckboxChange = (event, id) => {
            setCheckedItems({ ...checkedItems, id: id, value: event.target.checked, });
            onCheckboxChange(id, event.target.checked);
        };

        return (
            <Box margin={10} sx={{ flexGrow: 1 }}>
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 500 }} aria-label="customized table">
                        <TableHead>
                            <TableRow>
                                {inputTableHeadings.map((headingString, index) => (
                                    <StyledTableCell key={index} align="right">
                                        {headingString}
                                    </StyledTableCell>
                                ))}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {
                                valueStringArr?.map((valueObj, parentIndex) =>
                                    <StyledTableRow align="right">
                                        {
                                            valueObj?.map((value, index) =>
                                                <StyledTableCell align="right">
                                                    {
                                                        inputTypeArr[parentIndex][index] !== 'readOnly' ? <FormControlLabel
                                                            control={<Checkbox
                                                                checked={value}
                                                                onChange={(event) => handleCheckboxChange(event, editableTableData[parentIndex].Strategy_Id)}
                                                            />}
                                                        /> : value
                                                    }
                                                </StyledTableCell>
                                            )
                                        }
                                    </StyledTableRow>
                                )
                            }
                        </TableBody>
                    </Table>
                </TableContainer>
            </Box>
        );
    }

}

export default EditableTable;