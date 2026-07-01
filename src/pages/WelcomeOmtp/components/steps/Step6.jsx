// ==========================================
// Component: Walkthrough Step 6 (Variant-driven)
// ==========================================

import React from 'react';
import { Box, Typography, Grid } from '@mui/material';
import BaseStep from './BaseStep';

// Asset Imports
import imgIncomeStmt from '../../../../assets/DemoPicture/IncomeStmt.jpg';
import imgCashFlow from '../../../../assets/DemoPicture/CashFlow.jpg';
import imgBalanceSheet from '../../../../assets/DemoPicture/BalanceSheet.jpg';
import imgKeyResultBs from '../../../../assets/DemoPicture/KeyResultBs.jpg';
import imgKeyResultPl from '../../../../assets/DemoPicture/KeyResultPl.jpg';
import imgFinReportBs from '../../../../assets/DemoPicture/FinReportBs.jpg';
import { colors } from '../../../../ux/styles';

// Compact FinancialCard
const FinancialCard = ({ label, src }) => (
  <Box sx={{ mb: 1.5 }}>
    <Typography 
      variant="caption" 
      sx={{ fontWeight: 700, color: colors.title || '#1F2D3D', display: 'block', mb: 0.5, lineHeight: 1.2 }}
    >
      {label}
    </Typography>
    <Box 
      sx={{ 
        p: 0.75, 
        bgcolor: colors.background?.default || '#f9fafb', 
        border: `1px solid ${colors.border || '#E6E0F4'}`, 
        borderRadius: '10px', 
        transition: '0.3s',
        '&:hover': { 
          borderColor: colors.primary || '#7c3aed', 
          boxShadow: `0 2px 6px ${colors.shadow || 'rgba(124, 58, 237, 0.1)'}` 
        }
      }}
    >
      <Box 
        component="img" 
        src={src} 
        alt={`${label} Panel`} 
        sx={{ width: '100%', borderRadius: '6px', display: 'block' }} 
      />
    </Box>
  </Box>
);

const Step6 = () => {
  const reports = [
    { label: "Financial Outcomes after 4 months of play", src: imgKeyResultBs },
    { label: "Key Results after 4 months of play", src: imgKeyResultPl },
    { label: "Income statement – Main Dashboard", src: imgIncomeStmt },
    { label: "Cash Flow statement – Main dashboard", src: imgCashFlow },
    { label: "Balance Sheet in Main dashboard", src: imgBalanceSheet },
    { label: "Financial Report Summary", src: imgFinReportBs }
  ];

  return (
    <BaseStep 
      number="6"
      title="Review Financial Outcomes"
      description="Analyze financial outcomes, key results, income statement, cash flow statement, and balance sheet to see the real business impact of decisions."
    >
      <Grid container spacing={2}>
        {reports.map((report, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <FinancialCard label={report.label} src={report.src} />
          </Grid>
        ))}
      </Grid>
    </BaseStep>
  );
};

export default Step6;
