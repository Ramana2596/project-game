// Component Name : FinISTable
// Module         : FinIS (Income Statement)
// Purpose        : Render the Details + period-column table, with bold subtotal rows and ratio formatting
// Author/Version : UXLab V1.0
// AI Tags        : income-statement, table, report-grid

import React from "react";
import {
    Table, TableHead, TableBody, TableRow, TableCell, TableContainer,
    Typography, Box, CircularProgress,
} from "@mui/material";
import { tableStyle, layoutStyle } from "../../../ux/styles";
import { formatLineValue } from "../utils/finISFormatters";

// Component: presentational table - receives already-filtered rows and period columns
const FinISTable = ({
    rows, totalCount, periods, density, loading,
    isSubtotalLine, isRatioLine,
}) => {
    return (
        <TableContainer sx={tableStyle.container}>
            <Typography sx={tableStyle.parameters}>
                Showing {rows.length} of {totalCount} lines
            </Typography>

            {loading ? (
                <Box sx={{ ...layoutStyle.flexCenter, py: 6 }}>
                    <CircularProgress size={28} />
                </Box>
            ) : (
                <Table sx={density === "compact" ? tableStyle.compact : undefined}>
                    <TableHead>
                        <TableRow sx={tableStyle.columnHeader}>
                            <TableCell>Details</TableCell>
                            {periods.map((p) => (
                                <TableCell key={p} sx={tableStyle.numeric}>{p}</TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map((row) => {
                            const isSubtotal = isSubtotalLine(row.Line_No);
                            return (
                                <TableRow key={row.Line_No} sx={tableStyle.row}>
                                    <TableCell sx={{ ...tableStyle.cell, fontWeight: isSubtotal ? 700 : 400 }}>
                                        {row.Details}
                                    </TableCell>
                                    {periods.map((p) => (
                                        <TableCell
                                            key={p}
                                            sx={{ ...tableStyle.cell, ...tableStyle.numeric, fontWeight: isSubtotal ? 700 : 400 }}
                                        >
                                            {formatLineValue(row[p], isRatioLine(row.Line_No))}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>
            )}
        </TableContainer>
    );
};

export default FinISTable;
