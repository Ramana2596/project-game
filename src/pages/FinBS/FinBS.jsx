
/**
 * Component Name: FinBS
 * Module: Finance / FinBS
 * Purpose: Finance screen showing the team's Balance Sheet: month control, KPI cards, search and filters, table.
 * Author/Version: UXLab / v1.0
 * AI Tags: finBS, balance sheet, finance, statement, kpi, table, OpsMgt
 */

import React, { useEffect, useState } from "react";
import { Alert, Box, Button, LinearProgress, Typography } from "@mui/material";
import { layoutStyle, masterTypo } from "../../ux/styles";
import { border, brand, gradients, surface, text } from "../../ux/styles/colorPalette";
import { useUser } from "../../core/access/userContext";
import FinBSHeader from "./components/FinBSHeader";
import FinBSKpis from "./components/FinBSKpis";
import FinBSToolbar from "./components/FinBSToolbar";
import FinBSTable from "./components/FinBSTable";
import useFinBS from "./hooks/useFinBS";
import useFinBSAi from "./hooks/useFinBSAi";
import { buildCsv, downloadCsv } from "./utils/exportCsv";
import { formatMonthLabel } from "./utils/formatters";
import { STATUS } from "./constants/finBS.constants";

export default function FinBS() {
  // Load the current game context.
  const { userInfo } = useUser();

  const gameId = userInfo?.gameId;
  const gameBatch = userInfo?.gameBatch;
  const gameTeam = userInfo?.gameTeam;
  const teamName = gameTeam;

  // State: cut-off month.
  const [month, setMonth] = useState("");

  // Load the statement and derive everything the screen shows.
  const sheet = useFinBS({
    gameId,
    gameBatch,
    gameTeam,
    productionMonth: month,
    enabled: true,
  });

  // Derived values.
  const hasRows = sheet.rows.length > 0;
  const showStatement = hasRows && (sheet.status === STATUS.SUCCESS || sheet.isLoading);
  const cutOff = month ? `up to ${formatMonthLabel(month)}` : "all periods";

  // Effects: initialize the month from the current screen state.
  useEffect(() => {
    setMonth("");
  }, [gameId, gameBatch, gameTeam]);

  // Handle Export CSV: download exactly the rows and columns on screen.
  const handleExport = () => {
    downloadCsv(
      `BalanceSheet_${teamName}_batch${gameBatch}.csv`,
      buildCsv(sheet.visibleRows, sheet.visiblePeriods)
    );
  };

  // AI extension hooks: placeholder for narration and analytics.
  const ai = useFinBSAi();

  // Render.
  return (
    <Box sx={layoutStyle.root}>
      <Box sx={layoutStyle.pageContainer}>
        {/* Statement panel */}
        <Box
          sx={{
            position: "relative",
            background: gradients.page,
            border: `1px solid ${border.default}`,
            borderRadius: 4,
            p: { xs: 1.25, md: 1.5 },
            display: "flex",
            flexDirection: "column",
            gap: 1.25,
          }}
        >
          {/* Cut-off month: top right of the panel */}
          <Box
            sx={{
              position: { xs: "static", md: "absolute" },
              top: "12px",
              right: "12px",
              alignSelf: "flex-end",
            }}
          >
            <FinBSHeader month={month} onMonthChange={setMonth} />
          </Box>

          <Box sx={{ textAlign: "center", mb: 0.25 }}>
            <Typography
              component="h2"
              sx={{
                ...masterTypo.h3,
                color: text.title,
                lineHeight: 1.2,
              }}
            >
              Balance sheet
            </Typography>

            <Typography
              sx={{
                ...masterTypo.body1,
                color: text.subtitle,
                lineHeight: 1.3,
              }}
            >
              Assets, equity and liabilities, period by period ({cutOff}).
            </Typography>
          </Box>

          {sheet.isLoading && (
            <LinearProgress
              sx={{
                height: 2,
                borderRadius: 1,
                background: brand.primarySoft,
                "& .MuiLinearProgress-bar": {
                  background: brand.primary,
                },
              }}
            />
          )}

          {/* No balance sheet exists for this team and month */}
          {sheet.status === STATUS.EMPTY && (
            <Alert
              severity="info"
              variant="outlined"
              sx={{
                borderRadius: 2,
                background: surface.paper,
                py: 0.5,
              }}
            >
              No balance sheet found for {teamName}, batch {gameBatch}
              {month ? ` up to ${formatMonthLabel(month)}` : ""}. Choose a later
              month or show all periods.
            </Alert>
          )}

          {/* The request failed */}
          {sheet.status === STATUS.ERROR && (
            <Alert
              severity="error"
              variant="outlined"
              sx={{
                borderRadius: 2,
                background: surface.paper,
                py: 0.5,
              }}
              action={
                <Button
                  color="inherit"
                  size="small"
                  onClick={sheet.reload}
                >
                  Try again
                </Button>
              }
            >
              The balance sheet could not be generated. {sheet.message}
            </Alert>
          )}

          {/* The statement: KPI cards, toolbar, table */}
          {showStatement && (
            <>
              <FinBSKpis
                summary={sheet.summary}
                isRefreshing={sheet.isLoading}
              />

              <FinBSToolbar
                search={sheet.search}
                onSearch={sheet.setSearch}
                view={sheet.view}
                onView={sheet.setView}
                group={sheet.group}
                onGroup={sheet.setGroup}
                onExport={handleExport}
                disabled={!sheet.visibleRows.length}
              />

              <FinBSTable
                rows={sheet.visibleRows}
                isTree={sheet.isTreeView}
                onToggle={sheet.toggleLine}
                totalCount={sheet.rows.length}
                periods={sheet.visiblePeriods}
                hiddenPeriodCount={sheet.hiddenPeriodCount}
                isRefreshing={sheet.isLoading}
              />
            </>
          )}

          {/* AI extension point */}
          {ai.isEnabled && (
            <Box data-ai-slot="executive-narration" />
          )}
        </Box>
      </Box>
    </Box>
  );
}