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

function GenericTable({ inputTableHeadings, inputTableData, ifNoData }) {
    let tableValueSet = inputTableData?.map((tableDataObj) => {
        return Object.values(tableDataObj);
    });

    if (ifNoData) {
        return (
            <Box margin={10} sx={{ flexGrow: 1 }}>
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 500 }} aria-label="customized table">
                        <TableHead>
                            <TableRow>
                                {inputTableHeadings?.map(headingString => {
                                    return (<StyledTableCell align="right">
                                        {headingString}
                                    </StyledTableCell>)
                                })}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            <StyledTableRow align="right">{'Some error occurred while loading the table...'}</StyledTableRow>
                        </TableBody>
                    </Table>
                </TableContainer>
            </Box>
        );
    } else {
        return (
            <Box margin={10} sx={{ flexGrow: 1 }}>
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 500 }} aria-label="customized table">
                        <TableHead>
                            <TableRow>
                                {inputTableHeadings?.map(headingString => {
                                    return (<StyledTableCell align="right">
                                        {headingString}
                                    </StyledTableCell>)
                                })}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {
                                tableValueSet?.map((valueSet) => {
                                    return (<StyledTableRow align="right">
                                        {
                                            valueSet?.map((value) => {
                                                return (<StyledTableCell align="right">
                                                    {value}
                                                </StyledTableCell>)
                                            })
                                        }
                                    </StyledTableRow>)
                                })

                            }

                        </TableBody>
                    </Table>
                </TableContainer>
            </Box>
        );
    }
}

export default GenericTable;