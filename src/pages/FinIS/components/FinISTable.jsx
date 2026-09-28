/**
 * Component Name: FinISTable
 * Module: FinIS (Income Statement)
 * Purpose: Display the Income Statement as a period-by-period table with
 *          subtotals, drill-down rows and consistent UXLab table formatting.
 * Author/Version: UXLab / v1.0
 * AI Tags: table, finIS, income statement, statement, sticky columns, subtotal, drill-down
 */

import React from "react";
import {
    Box,
    IconButton,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography,
} from "@mui/material";
import KeyboardArrowDownRoundedIcon from "@mui/icons-material/KeyboardArrowDownRounded";
import KeyboardArrowRightRoundedIcon from "@mui/icons-material/KeyboardArrowRightRounded";
import { masterTypo, tableStyle } from "../../../ux/styles";
import {
    accent,
    border,
    brand,
    state,
    surface,
    text,
} from "../../../ux/styles/colorPalette";
import { formatLineValue } from "../utils/finISFormatters";

// Width of the sticky Details column
const DETAILS_WIDTH = 280;

// Hover tint drawn as an image so sticky cells keep their solid background
const HOVER_TINT = `linear-gradient(${accent.blue}0A, ${accent.blue}0A)`;

// Look of each row type
const ROW_LOOK = {
    line: {
        bg: surface.card,
        weight: 400,
        color: text.body,
        borderTop: "none",
        indent: 4,
    },
    subtotal: {
        bg: surface.panel,
        weight: 600,
        color: text.heading,
        borderTop: `1px solid ${border.default}`,
        indent: 2,
    },
    total: {
        bg: state.selected.background,
        weight: 700,
        color: brand.onPrimarySoft,
        borderTop: `2px solid ${brand.primary}`,
        indent: 2,
    },
};

// Income Statement row classification
const getRowType = (lineNo) => {
    if ([3, 13, 14, 23, 25, 27, 29, 30].includes(Number(lineNo))) {
        return "subtotal";
    }

    return "line";
};

export default function FinISTable({
    rows,
    totalCount,
    periods,
    loading,
    isTree,
    onToggle,
    isSubtotalLine,
    isRatioLine,
}) {
    // Derived values
    const columnCount = periods.length + 1;

    // Render one statement row
    const renderRow = (row) => {
        const lineNo = Number(row.Line_No);
        const rowType = getRowType(lineNo);
        const look = ROW_LOOK[rowType];

        const canToggle = isTree && row.hasChildren;
        const indent = isTree
            ? 2 + row.depth * 3
            : look.indent;

        return (
            <TableRow
                key={lineNo}
                hover
                onClick={
                    canToggle
                        ? () => onToggle(lineNo)
                        : undefined
                }
                sx={{
                    cursor: canToggle ? "pointer" : "default",
                    transition: tableStyle.row.transition,
                    backgroundColor: look.bg,
                    "&:nth-of-type(even)": {
                        backgroundColor: look.bg,
                    },
                    "&.MuiTableRow-hover:hover": {
                        backgroundColor: look.bg,
                    },
                    "&:hover, &:hover .sticky-cell": {
                        backgroundImage: HOVER_TINT,
                    },
                }}
            >
                <TableCell
                    className="sticky-cell"
                    sx={{
                        ...tableStyle.cell,
                        position: "sticky",
                        left: 0,
                        zIndex: 1,
                        minWidth: DETAILS_WIDTH,
                        backgroundColor: "inherit",
                        boxShadow: `inset -1px 0 0 ${border.divider}`,
                        borderTop: look.borderTop,
                        color: look.color,
                        fontWeight: look.weight,
                        pl: indent,
                    }}
                >
                    {isTree ? (
                        <Box
                            sx={{
                                display: "flex",
                                alignItems: "center",
                                gap: 0.5,
                            }}
                        >
                            {/* Drill-down arrow */}
                            {row.hasChildren ? (
                                <IconButton
                                    size="small"
                                    aria-label={`${row.isExpanded ? "Collapse" : "Expand"} ${row.Details}`}
                                    aria-expanded={row.isExpanded}
                                    onClick={(event) => {
                                        event.stopPropagation();
                                        onToggle(lineNo);
                                    }}
                                    sx={{
                                        p: 0.25,
                                        color: brand.primary,
                                    }}
                                >
                                    {row.isExpanded ? (
                                        <KeyboardArrowDownRoundedIcon fontSize="small" />
                                    ) : (
                                        <KeyboardArrowRightRoundedIcon fontSize="small" />
                                    )}
                                </IconButton>
                            ) : (
                                <Box sx={{ width: 24 }} />
                            )}

                            <span>{row.Details}</span>
                        </Box>
                    ) : (
                        row.Details
                    )}
                </TableCell>

                {periods.map((period) => {
                    const value = row[period];

                    return (
                        <TableCell
                            key={period}
                            sx={{
                                ...tableStyle.cell,
                                ...tableStyle.numeric,
                                minWidth: 140,
                                borderTop: look.borderTop,
                                color:
                                    value === null ||
                                    value === undefined
                                        ? text.muted
                                        : look.color,
                                fontWeight: look.weight,
                            }}
                        >
                            {formatLineValue(
                                value,
                                isRatioLine(lineNo)
                            )}
                        </TableCell>
                    );
                })}
            </TableRow>
        );
    };

    // Render
    return (
        <Box sx={tableStyle.container}>
            {/* Line count */}
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    gap: 2,
                    px: 2,
                    pt: 1.5,
                    pb: 1,
                }}
            >
                <Typography
                    sx={{
                        ...masterTypo.caption,
                        fontWeight: 700,
                        color: text.subtitle,
                    }}
                >
                    {rows.length === totalCount
                        ? `${totalCount} lines`
                        : `Showing ${rows.length} of ${totalCount} lines`}
                </Typography>
            </Box>

            <TableContainer sx={{ maxHeight: "70vh" }}>
                <Table
                    stickyHeader
                    size="small"
                    aria-label="Income statement"
                    sx={{
                        borderCollapse: "separate",
                        ...tableStyle.compact,
                    }}
                >
                    <TableHead sx={tableStyle.columnHeader}>
                        <TableRow>
                            <TableCell
                                sx={{
                                    position: "sticky",
                                    left: 0,
                                    zIndex: 3,
                                    minWidth: DETAILS_WIDTH,
                                    textAlign: "left",
                                }}
                            >
                                Details
                            </TableCell>

                            {periods.map((period) => (
                                <TableCell
                                    key={period}
                                    sx={{
                                        textAlign: "right",
                                        whiteSpace: "nowrap",
                                        minWidth: 140,
                                    }}
                                >
                                    {period}
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>

                    <TableBody>
                        {loading ? (
                            <TableRow>
                                <TableCell
                                    colSpan={columnCount}
                                    sx={{
                                        ...tableStyle.cell,
                                        textAlign: "center",
                                        py: 4,
                                    }}
                                >
                                    Loading Income Statement...
                                </TableCell>
                            </TableRow>
                        ) : rows.length ? (
                            rows.map(renderRow)
                        ) : (
                            <TableRow>
                                <TableCell
                                    colSpan={columnCount}
                                    sx={{
                                        ...tableStyle.cell,
                                        textAlign: "center",
                                        py: 4,
                                        color: text.subtitle,
                                    }}
                                >
                                    No lines match your search. Clear the
                                    search or choose All lines.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    );
}