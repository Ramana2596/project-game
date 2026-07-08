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
                mb: 0.75,
            }}
        >
            {label}
        </Typography>

        <Box
            sx={{
                p: 1,
                bgcolor: colors.background,
                border: `1px solid ${colors.border}`,
                borderRadius: 3,
                transition: "0.25s ease",

                "&:hover": {
                    borderColor: colors.primary,
                    boxShadow: `0 4px 12px ${colors.shadowColor}`,
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
            title="Review Financial Outcomes"
            description="Analyze key financial reports, business performance, income statement, cash flow statement, and balance sheet to understand the impact of operational decisions."
        >
            <Grid container spacing={2}>
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