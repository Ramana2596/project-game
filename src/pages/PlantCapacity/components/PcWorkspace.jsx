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
import {
  cardStyle,
  tableStyle,
  layoutStyle,
  colors,
  masterTypo,
} from "../../../ux/styles";
// Resolve utilisation colour from SP-driven utilisation level and Critical flag
const getUtilColor = (level, isCrit) => {
  if (isCrit || level === "Critical") return colors.error;
  switch (level) {
    case "Most-Used":
      return colors.warning;
    case "Balanced":
      return colors.success;
    case "Least-Used":
      return colors.info || colors.muted;
    default:
      return colors.success;
  }
};
export const PcWorkspace = ({ activeTab, workCentres = [], plant, loading }) => {
  // Show loading placeholder
  if (loading) {
    return <Skeleton variant="rounded" height={300} sx={{ borderRadius: 3 }} />;
  }
  // Resolve active workspace views and capacity UOM
  const showCards = activeTab === "overview" || activeTab === "workcentres";
  const showTable = activeTab === "overview" || activeTab === "report";
  const capUom = plant?.Cap_UOM || "Hours";
  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 4 }}>
      {/* Card Grid View */}
      {showCards && (
        <Box sx={layoutStyle.section}>
          <Box sx={layoutStyle.sectionHeader}>
            <Typography variant="h5" sx={{ ...masterTypo.h5, color: colors.heading }}>
              Work Centres: Capacity & Load
            </Typography>
            <Typography variant="caption" sx={{ color: colors.muted }}>
              Showing {workCentres.length} Work Centres
            </Typography>
          </Box>
          <Grid container spacing={1}>
            {workCentres.map((wc, idx) => {
              // Resolve work centre status and utilisation
              const isCrit = Number(wc.Critical_Mc) === 1;
              const isMostUsed = Number(wc.Is_Most_Used) === 1;
              const isLeastUsed = Number(wc.Is_Least_Used) === 1;
              const level = wc.WC_Util_Level || "Balanced";
              const pct = Number(wc.Mfg_Load_Percent) || 0;
              const col = getUtilColor(level, isCrit);
              return (
                <Grid item xs={12} sm={6} md={3} key={wc.WC_Description || wc.Mfg_Work_Centre || idx}>
                  <Card sx={{ ...cardStyle.primary, borderColor: isCrit ? colors.error : colors.border, borderWidth: isCrit ? 2 : 1 }}>
                    <CardContent sx={{ p: 2.5 }}>
                      {/* Work Centre Header */}
                      <Box sx={layoutStyle.flexRow}>
                        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                          <Box sx={{ width: 16, height: 16, borderRadius: 1.5, background: `${col}1A`, color: col, fontWeight: 800, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.85rem" }}>
                            {String(idx + 1).padStart(2, "0")}
                          </Box>
                          <Typography variant="h6" sx={{ fontWeight: 700, color: colors.title }}>
                            {wc.WC_Description || wc.Mfg_Work_Centre}
                          </Typography>
                        </Box>
                        {isCrit && (
                          <Chip icon={<AlertIcon fontSize="small" />} label="CRITICAL" size="small" sx={{ background: `${colors.error}22`, color: colors.error, fontWeight: 800, fontSize: "0.68rem" }} />
                        )}
                      </Box>
                      {/* Capital Asset */}
                      <Typography variant="body2" sx={{ color: colors.subtitle, mt: 0.5, height: 32, overflow: "hidden" }}>
                        {wc.Capital_Asset || "Work Centre Asset"}
                      </Typography>
                      {/* Machine Count and Utilisation Level */}
                      <Box sx={{ mt: 0.5, mb: 0.5, display: "flex", gap: 1, alignItems: "center", flexWrap: "wrap" }}>
                        <Chip label={`${wc.No_Of_Machines || 0} Machine(s)`} size="small" variant="outlined" sx={{ borderColor: colors.border, color: colors.body }} />
                        <Chip label={level} size="small" sx={{ background: `${col}1A`, color: col, fontWeight: 700, fontSize: "0.7rem" }} />
                      </Box>
                      {/* Utilisation and Capacity */}
                      <Box sx={{ mt: 1.5 }}>
                        <Box sx={layoutStyle.flexRow}>
                          <Typography variant="caption" sx={{ color: colors.subtitle, fontWeight: 600 }}>
                            Utilisation
                          </Typography>
                          <Typography variant="subtitle2" sx={{ fontWeight: 800, color: col }}>
                            {pct}%
                          </Typography>
                        </Box>
                        <LinearProgress variant="determinate" value={Math.min(pct, 100)} sx={{ height: 8, borderRadius: 4, mt: 0.75, mb: 1.5, backgroundColor: `${col}22`, "& .MuiLinearProgress-bar": { backgroundColor: col, borderRadius: 4 } }} />
                        <Box sx={layoutStyle.flexRow}>
                          <Typography variant="caption" sx={{ color: colors.muted }}>
                            Load: <strong>{wc.Load_Hours}</strong> {capUom}
                          </Typography>
                          <Typography variant="caption" sx={{ color: colors.muted }}>
                            Cap: <strong>{wc.Capacity_Hours}</strong> {capUom}
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
                  <TableCell align="right">Capacity ({capUom})</TableCell>
                  <TableCell align="right">Load ({capUom})</TableCell>
                  <TableCell align="right">% Utilisation</TableCell>
                  <TableCell align="center">Status</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {workCentres.map((row, i) => {
                  // Resolve work centre status and utilisation
                  const isCrit = Number(row.Critical_Mc) === 1;
                  const isMostUsed = Number(row.Is_Most_Used) === 1;
                  const isLeastUsed = Number(row.Is_Least_Used) === 1;
                  const level = row.WC_Util_Level || "Balanced";
                  const pct = Number(row.Mfg_Load_Percent) || 0;
                  const col = getUtilColor(level, isCrit);
                  return (
                    <TableRow key={row.WC_Description || row.Mfg_Work_Centre || i} sx={tableStyle.row}>
                      <TableCell sx={{ ...tableStyle.cell, fontWeight: 700 }}>
                        {row.WC_Description || row.Mfg_Work_Centre}
                      </TableCell>
                      <TableCell sx={tableStyle.cell}>{row.Capital_Asset || "N/A"}</TableCell>
                      <TableCell align="center" sx={tableStyle.cell}>{row.No_Of_Machines}</TableCell>
                      <TableCell align="right" sx={{ ...tableStyle.cell, ...tableStyle.numeric }}>{row.Capacity_Hours?.toLocaleString()}</TableCell>
                      <TableCell align="right" sx={{ ...tableStyle.cell, ...tableStyle.numeric }}>{row.Load_Hours?.toLocaleString()}</TableCell>
                      <TableCell align="right" sx={{ ...tableStyle.cell, ...tableStyle.numeric }}>
                        <Box sx={{ display: "inline-block", px: 1.5, py: 0.25, borderRadius: "999px", background: `${col}1A`, color: col, fontWeight: 700 }}>
                          {pct}%
                        </Box>
                      </TableCell>
                      {/* Status Flags */}
                      <TableCell align="center" sx={tableStyle.cell}>
                        <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", gap: 0.5, flexWrap: "wrap" }}>
                          {isCrit && (
                            <Chip icon={<AlertIcon fontSize="small" />} label="CRITICAL" size="small" sx={{ background: `${colors.error}1A`, color: colors.error, fontWeight: 700 }} />
                          )}
                          {isMostUsed && (
                            <Chip label="MOST-USED" size="small" sx={{ background: `${colors.warning}1A`, color: colors.warning, fontWeight: 700 }} />
                          )}
                          {isLeastUsed && (
                            <Chip label="LEAST-USED" size="small" sx={{ background: `${colors.info || colors.muted}1A`, color: colors.info || colors.muted, fontWeight: 700 }} />
                          )}
                          {!isCrit && !isMostUsed && !isLeastUsed && (
                            <Chip label={level.toUpperCase()} size="small" sx={{ background: `${col}1A`, color: col, fontWeight: 700 }} />
                          )}
                        </Box>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
            {/* Table Footer */}
            <Box sx={tableStyle.footer}>
              <Typography variant="caption" sx={{ color: colors.body, fontWeight: 600 }}>
                Total Work Centres: {workCentres.length}
              </Typography>
              <Typography variant="caption" sx={{ color: colors.body, fontWeight: 600 }}>
                Plant Cap: {plant?.Plant_Capacity_Hours?.toLocaleString() || 0} {capUom} | Load: {plant?.Plant_Load_Hours?.toLocaleString() || 0} {capUom}
              </Typography>
            </Box>
          </TableContainer>
        </Box>
      )}
    </Box>
  );
};