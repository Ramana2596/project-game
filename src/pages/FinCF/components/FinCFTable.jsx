
// File: FinCFTable.jsx
// Module: FinCF
// Purpose: Render period-wise cash flows with readable subtotal and total hierarchy.

import React from "react";
import {
    Box,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography,
    CircularProgress,
    Stack,
} from "@mui/material";
import AccountBalanceWalletOutlinedIcon from "@mui/icons-material/AccountBalanceWalletOutlined";
import { masterTypo, tableStyle } from "../../../ux/styles";
import {
    brand,
    surface,
    text,
    border,
    state,
} from "../../../ux/styles/colorPalette";
import {
    formatAmount,
    formatPeriodLabel,
    isSubtotalLine,
    isTotalLine,
} from "../utils/finCFFormatters";

// Keep table cells consistent with UXLab spacing and borders.
const cellSx = {
    ...tableStyle.cell,
    borderBottom: 1,
    borderColor: border.divider,
    py: 1,
};

// Render the statement with readable row states and sticky Details.
const FinCFTable = ({
    rows = [],
    totalCount,
    periods = [],
    density = "compact",
    loading = false,
}) => {
    const compact = density === "compact";

    // Use a light purple background for key totals with dark readable text.
    const getRowSx = (lineNo) => {
        if (Number(lineNo) === 49 || Number(lineNo) === 51) {
            return {
                bgcolor: brand.primarySoft,
                "& td": {
                    fontWeight: 800,
                    color: text.heading,
                },
                "&:hover": {
                    bgcolor: brand.primarySoft,
                },
            };
        }

        if (isSubtotalLine(lineNo) || isTotalLine(lineNo)) {
            return {
                bgcolor: surface.panel,
                "& td": {
                    fontWeight: 700,
                    color: text.heading,
                },
            };
        }

        return {
            bgcolor: surface.card,
            "&:hover": {
                bgcolor: state.hover.background,
            },
        };
    };

    // Keep the sticky Details cell aligned with its row background.
    const getLabelCellSx = (rowSx) => ({
        ...cellSx,
        position: "sticky",
        left: 0,
        zIndex: 1,
        minWidth: compact ? 260 : 340,
        width: compact ? 260 : 340,
        bgcolor: rowSx.bgcolor || surface.card,
    });

    return (
        <Paper
            sx={{
                ...tableStyle.container,
                overflow: "hidden",
                borderRadius: 2,
            }}
        >
            <Box
                sx={{
                    ...tableStyle.toolbar,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    flexWrap: "wrap",
                    gap: 1,
                    p: 1.5,
                }}
            >
                <Stack direction="row" spacing={1} alignItems="center">
                    <AccountBalanceWalletOutlinedIcon
                        fontSize="small"
                        sx={{ color: brand.primary }}
                    />
                    <Typography
                        sx={{
                            ...masterTypo.h6,
                            color: text.heading,
                            fontWeight: 800,
                        }}
                    >
                        Cash Flow Statement
                    </Typography>
                </Stack>

                <Typography
                    sx={{
                        ...masterTypo.caption,
                        color: text.muted,
                    }}
                >
                    Showing {rows.length} of {totalCount ?? rows.length} lines
                </Typography>
            </Box>

            <TableContainer sx={{ maxHeight: "70vh" }}>
                <Table
                    stickyHeader
                    size={compact ? "small" : "medium"}
                    aria-label="Cash flow statement"
                >
                    <TableHead>
                        <TableRow>
                            <TableCell
                                sx={{
                                    ...tableStyle.columnHeader,
                                    position: "sticky",
                                    left: 0,
                                    zIndex: 4,
                                    minWidth: compact ? 260 : 340,
                                    width: compact ? 260 : 340,
                                }}
                            >
                                Details
                            </TableCell>

                            {periods.map((period) => (
                                <TableCell
                                    key={period}
                                    align="right"
                                    sx={{
                                        ...tableStyle.columnHeader,
                                        minWidth: 140,
                                        whiteSpace: "nowrap",
                                    }}
                                >
                                    {formatPeriodLabel(period)}
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>

                    <TableBody>
                        {loading && (
                            <TableRow>
                                <TableCell
                                    colSpan={periods.length + 1}
                                    align="center"
                                    sx={{ py: 5 }}
                                >
                                    <CircularProgress size={28} />
                                    <Typography
                                        sx={{
                                            ...masterTypo.body2,
                                            color: text.subtitle,
                                            mt: 1,
                                        }}
                                    >
                                        Loading cash-flow data…
                                    </Typography>
                                </TableCell>
                            </TableRow>
                        )}

                        {!loading && rows.length === 0 && (
                            <TableRow>
                                <TableCell
                                    colSpan={periods.length + 1}
                                    align="center"
                                    sx={{ py: 5 }}
                                >
                                    <Typography
                                        sx={{
                                            ...masterTypo.body2,
                                            color: text.subtitle,
                                        }}
                                    >
                                        No cash-flow data matches the selected filters.
                                    </Typography>
                                </TableCell>
                            </TableRow>
                        )}

                        {!loading &&
                            rows.map((row, index) => {
                                const lineNo = Number(row?.Line_No);
                                const emphasized =
                                    isSubtotalLine(lineNo) ||
                                    isTotalLine(lineNo);
                                const keyTotal = lineNo === 49 || lineNo === 51;
                                const rowSx = getRowSx(lineNo);

                                return (
                                    <TableRow
                                        key={`${row?.Line_No ?? "line"}-${index}`}
                                        sx={{
                                            ...rowSx,
                                            "& td": {
                                                ...rowSx["& td"],
                                                py: compact ? 0.65 : 1.25,
                                            },
                                        }}
                                    >
                                        <TableCell sx={getLabelCellSx(rowSx)}>
                                            <Stack
                                                direction="row"
                                                spacing={1}
                                                alignItems="baseline"
                                            >
                                                <Typography
                                                    sx={{
                                                        ...masterTypo.caption,
                                                        color: keyTotal
                                                            ? text.heading
                                                            : text.muted,
                                                        minWidth: 22,
                                                        flexShrink: 0,
                                                    }}
                                                >
                                                    {row?.Line_No ?? ""}
                                                </Typography>

                                                <Typography
                                                    sx={{
                                                        ...masterTypo.body2,
                                                        color: text.heading,
                                                        fontWeight: emphasized
                                                            ? 700
                                                            : 400,
                                                        whiteSpace: compact
                                                            ? "normal"
                                                            : "nowrap",
                                                    }}
                                                >
                                                    {row?.Details ?? "—"}
                                                </Typography>
                                            </Stack>
                                        </TableCell>

                                        {periods.map((period) => {
                                            const value = row?.[period];
                                            const amount =
                                                value === "" || value == null
                                                    ? null
                                                    : Number(value);
                                            const valid =
                                                amount !== null &&
                                                Number.isFinite(amount);

                                            return (
                                                <TableCell
                                                    key={period}
                                                    align="right"
                                                    sx={{
                                                        ...cellSx,
                                                        ...tableStyle.numeric,
                                                        whiteSpace: "nowrap",
                                                        color: text.heading,
                                                        fontWeight: emphasized
                                                            ? 700
                                                            : 400,
                                                        fontVariantNumeric:
                                                            "tabular-nums",
                                                    }}
                                                >
                                                    {valid
                                                        ? formatAmount(amount)
                                                        : "—"}
                                                </TableCell>
                                            );
                                        })}
                                    </TableRow>
                                );
                            })}
                    </TableBody>
                </Table>
            </TableContainer>
        </Paper>
    );
};

export default FinCFTable;