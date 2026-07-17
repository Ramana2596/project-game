// ==========================================
// Component: Walkthrough Step 6
// UXLab V1.0
// ==========================================

import React from "react";
import { Box, Typography, Grid } from "@mui/material";

import BaseStep from "./BaseStep";

// Assets
import imgIncomeStmt from "../../../../assets/DemoPicture/IncomeStmt.jpg";
import imgCashFlow from "../../../../assets/DemoPicture/CashFlow.jpg";
import imgBalanceSheet from "../../../../assets/DemoPicture/BalanceSheet.jpg";
import imgKeyResultBs from "../../../../assets/DemoPicture/KeyResultBs.jpg";
import imgKeyResultPl from "../../../../assets/DemoPicture/KeyResultPl.jpg";
import imgFinReportBs from "../../../../assets/DemoPicture/FinReportBs.jpg";

import {
    colors,
    semanticTypo,
} from "../../../../ux/styles";

const FinancialCard = ({ label, src }) => (
    <Box sx={{ mb: 2 }}>
        <Typography
            component="h3"
            variant="h6"
            sx={{
                ...semanticTypo.cardH5,
                color: colors.primaryDark,
                mb: 1.25,
            }}
        >
            {label}
        </Typography>

        <Box
            sx={{
                bgcolor: colors.panel,
                border: `1px solid ${colors.border}`,
                borderRadius: 4,
                p: 1.5,

                boxShadow: "0 8px 22px rgba(123,31,162,.08)",
                transition: "all .25s ease",

                "&:hover": {
                    transform: "translateY(-3px)",
                    borderColor: colors.primary,
                    boxShadow: "0 14px 30px rgba(123,31,162,.15)",
                },
            }}
        >
            <Box
                component="img"
                src={src}
                alt={label}
                sx={{
                    width: "100%",
                    display: "block",
                    borderRadius: 2,
                    border: `1px solid ${colors.border}`,
                }}
            />
        </Box>
    </Box>
);

const Step6 = () => {
    const reports = [
        {
            label: "Financial Outcome after 4 months",
            src: imgKeyResultBs,
        },
        {
            label: "Key Results after 4 months",
            src: imgKeyResultPl,
        },
        {
            label: "Income Statement - Dashboard",
            src: imgIncomeStmt,
        },
        {
            label: "Cash Flow Statement - Dashboard",
            src: imgCashFlow,
        },
        {
            label: "Balance Sheet - Dashboard",
            src: imgBalanceSheet,
        },
        {
            label: "Financial Report Summary",
            src: imgFinReportBs,
        },
    ];

    return (
        <BaseStep
            number="6"
            title="Review Financial Outcome"
            description="Analyze key financial reports, business performance, income statement, cash flow statement, and balance sheet to understand the impact of operational decisions."
        >
            <Grid container spacing={4}>
                {reports.map((report, index) => (
                    <Grid
                        item
                        xs={12}
                        sm={6}
                        md={4}
                        key={index}
                    >
                        <FinancialCard
                            label={report.label}
                            src={report.src}
                        />
                    </Grid>
                ))}
            </Grid>
        </BaseStep>
    );
};

export default Step6;