import React from "react";
import {
  Grid,
  Card,
  CardContent,
  Box,
  Typography,
  Chip,
  LinearProgress,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  Skeleton,
} from "@mui/material";
import { WarningAmber as AlertIcon } from "@mui/icons-material";
import { cardStyle, tableStyle, layoutStyle, colors, masterTypo } from "../../../ux/styles";

export const PcWorkspace = ({ activeTab, workCentres, plant, loading }) => {
  if (loading) {
    return <Skeleton variant="rounded" height={300} sx={{ borderRadius: 3 }} />;
  }

  const showCards = activeTab === "overview" || activeTab === "workcentres";
  const showTable = activeTab === "overview" || activeTab === "report";

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 4 }}>
      {/* Card Grid View */}
      {showCards && (
        <Box sx={layoutStyle.section}>
          <Box sx={layoutStyle.sectionHeader}>
            <Typography variant="h5" sx={{ ...masterTypo.h5, color: colors.heading }}>
              Work Centre Capacity & Load Cards
            </Typography>
            <Typography variant="caption" sx={{ color: colors.muted }}>
              Showing {workCentres.length} Work Centres
            </Typography>
          </Box>

          <Grid container spacing={3}>
            {workCentres.map((wc, idx) => {
              const isCrit = wc.Critical_Mc === 1;
              const pct = wc.Mfg_Load_Percent || 0;
              const col = isCrit ? colors.error : pct >= 85 ? colors.warning : colors.success;

              return (
                <Grid item xs={12} sm={6} md={3} key={wc.Mfg_Work_Centre || idx}>
                  <Card sx={{ ...cardStyle.primary, borderColor: isCrit ? colors.error : colors.border, borderWidth: isCrit ? 2 : 1 }}>
                    <CardContent sx={{ p: 2.5 }}>
                      <Box sx={layoutStyle.flexRow}>
                        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                          <Box
                            sx={{
                              width: 32,
                              height: 32,
                              borderRadius: 1.5,
                              background: `${col}1A`,
                              color: col,
                              fontWeight: 800,
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              fontSize: "0.85rem",
                            }}
                          >
                            {String(idx + 1).padStart(2, "0")}
                          </Box>
                          <Typography variant="h6" sx={{ fontWeight: 700, color: colors.title }}>
                            {wc.Mfg_Work_Centre}
                          </Typography>
                        </Box>
                        {isCrit && (
                          <Chip label="CRITICAL" size="small" sx={{ background: `${colors.error}22`, color: colors.error, fontWeight: 800, fontSize: "0.68rem" }} />
                        )}
                      </Box>

                      <Typography variant="body2" sx={{ color: colors.subtitle, mt: 1, height: 40, overflow: "hidden" }}>
                        {wc.Capital_Asset || "Work Centre Asset"}
                      </Typography>

                      <Box sx={{ mt: 1, mb: 1.5 }}>
                        <Chip label={`${wc.No_Of_Machines || 0} Machine(s)`} size="small" variant="outlined" sx={{ borderColor: colors.border, color: colors.body }} />
                      </Box>

                      <Box sx={{ mt: 2 }}>
                        <Box sx={layoutStyle.flexRow}>
                          <Typography variant="caption" sx={{ color: colors.subtitle, fontWeight: 600 }}>
                            Utilisation
                          </Typography>
                          <Typography variant="subtitle2" sx={{ fontWeight: 800, color: col }}>
                            {pct}%
                          </Typography>
                        </Box>

                        <LinearProgress
                          variant="determinate"
                          value={Math.min(pct, 100)}
                          sx={{
                            height: 8,
                            borderRadius: 4,
                            mt: 0.75,
                            mb: 1.5,
                            backgroundColor: `${col}22`,
                            "& .MuiLinearProgress-bar": { backgroundColor: col, borderRadius: 4 },
                          }}
                        />

                        <Box sx={layoutStyle.flexRow}>
                          <Typography variant="caption" sx={{ color: colors.muted }}>
                            Load: <strong>{wc.Load_Hours}</strong> {"Hrs"}
                          </Typography>
                          <Typography variant="caption" sx={{ color: colors.muted }}>
                            Cap: <strong>{wc.Capacity_Hours}</strong> {"Hrs"}
                          </Typography>
                        </Box>
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>
              );
            })}
          </Grid>
        </Box>
      )}

      {/* Table Report View */}
      {showTable && (
        <Box sx={layoutStyle.section}>
          <Box sx={layoutStyle.sectionHeader}>
            <Typography variant="h5" sx={{ ...masterTypo.h5, color: colors.heading }}>
              Work Centre Operational Breakdown
            </Typography>
          </Box>

          <TableContainer component={Paper} sx={tableStyle.container}>
            <Table sx={{ minWidth: 650 }}>
              <TableHead sx={tableStyle.columnHeader}>
                <TableRow>
                  <TableCell>Work Centre</TableCell>
                  <TableCell>Capital Asset</TableCell>
                  <TableCell align="center">Machines</TableCell>
                  <TableCell align="right">Capacity ({plant?.UOM || "Hrs"})</TableCell>
                  <TableCell align="right">Load ({plant?.UOM || "Hrs"})</TableCell>
                  <TableCell align="right">% Utilisation</TableCell>
                  <TableCell align="center">Status</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {workCentres.map((row, i) => {
                  const isCrit = row.Critical_Mc === 1;
                  const pct = row.Mfg_Load_Percent || 0;
                  const col = isCrit ? colors.error : pct >= 85 ? colors.warning : colors.success;

                  return (
                    <TableRow key={row.Mfg_Work_Centre || i} sx={tableStyle.row}>
                      <TableCell sx={{ ...tableStyle.cell, fontWeight: 700 }}>{row.Mfg_Work_Centre}</TableCell>
                      <TableCell sx={tableStyle.cell}>{row.Capital_Asset || "N/A"}</TableCell>
                      <TableCell align="center" sx={tableStyle.cell}>{row.No_Of_Machines}</TableCell>
                      <TableCell align="right" sx={{ ...tableStyle.cell, ...tableStyle.numeric }}>{row.Capacity_Hours?.toLocaleString()}</TableCell>
                      <TableCell align="right" sx={{ ...tableStyle.cell, ...tableStyle.numeric }}>{row.Load_Hours?.toLocaleString()}</TableCell>
                      <TableCell align="right" sx={{ ...tableStyle.cell, ...tableStyle.numeric }}>
                        <Box sx={{ display: "inline-block", px: 1.5, py: 0.25, borderRadius: "999px", background: `${col}1A`, color: col, fontWeight: 700 }}>
                          {pct}%
                        </Box>
                      </TableCell>
                      <TableCell align="center" sx={tableStyle.cell}>
                        {isCrit ? (
                          <Chip icon={<AlertIcon fontSize="small" />} label="BOTTLENECK" size="small" sx={{ background: `${colors.error}1A`, color: colors.error, fontWeight: 700 }} />
                        ) : pct >= 85 ? (
                          <Chip label="HIGH LOAD" size="small" sx={{ background: `${colors.warning}1A`, color: colors.warning, fontWeight: 700 }} />
                        ) : (
                          <Chip label="BALANCED" size="small" sx={{ background: `${colors.success}1A`, color: colors.success, fontWeight: 700 }} />
                        )}
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>

            <Box sx={tableStyle.footer}>
              <Typography variant="caption" sx={{ color: colors.body, fontWeight: 600 }}>
                Total Work Centres: {workCentres.length}
              </Typography>
              <Typography variant="caption" sx={{ color: colors.body, fontWeight: 600 }}>
                Plant Cap: {plant?.Plant_Capacity_Hours?.toLocaleString() || 0} Hrs | Load: {plant?.Plant_Load_Hours?.toLocaleString() || 0} Hrs
              </Typography>
            </Box>
          </TableContainer>
        </Box>
      )}
    </Box>
  );
};