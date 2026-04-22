// File: src/pages/UiAccess/components/UiAccessTable.jsx
// Purpose: Render table for Role ↔ UI Page Access (✔ Assigned model with visual cues)

import React from "react";
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  Paper, CircularProgress, Box, Typography
} from "@mui/material";

// Icons
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";

const UiAccessTable = ({ rows, loading, columns, onCellChange }) => {

  /* ---------------- Loading ---------------- */
  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", p: 4 }}>
        <CircularProgress size={28} />
      </Box>
    );
  }

  return (
    <TableContainer component={Paper} sx={{ maxHeight: "65vh", overflow: "auto" }}>
      <Table size="small" stickyHeader sx={{ minWidth: 800 }}>

        {/* ---------------- Header ---------------- */}
        <TableHead>
          <TableRow>
            {columns.map((col) => (
              <TableCell
                key={col.key}
                sx={{ fontWeight: 800, backgroundColor: "#F1F3F5" }}
              >
                {col.label}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>

        {/* ---------------- Body ---------------- */}
        <TableBody>

          {/* No Data */}
          {(!rows || rows.length === 0) ? (
            <TableRow>
              <TableCell colSpan={columns.length} align="center" sx={{ py: 6 }}>
                <Typography sx={{ color: "#6c757d", fontWeight: 600 }}>
                  No Records
                </Typography>
              </TableCell>
            </TableRow>
          ) : (
            rows.map((row, rowIndex) => (
              <TableRow
                key={rowIndex}
                hover
                sx={{
                  /* highlight for unassigned */
                  backgroundColor: row.Assigned ? "inherit" : "#FFF8E1"
                }}
              >

                {columns.map((col) => (
                  <TableCell key={col.key}>

                    {/* ---------------- Assigned Toggle (ADD/DELETE) ---------------- */}
                    {col.key === "Assigned" ? (
                      <Box
                        onClick={() =>
                          onCellChange(rowIndex, "Assigned", !row.Assigned)
                        }
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          gap: 1,
                          cursor: "pointer",
                          justifyContent: "center"
                        }}
                      >

                        {/* CheckBox / Assigned */}
                        {row.Assigned ? (
                          <CheckCircleIcon sx={{ color: "green", fontSize: 20 }} />
                        ) : (
                          <CancelIcon sx={{ color: "red", fontSize: 20 }} />
                        )}

                      </Box>

                    ) : (
                      /* ---------------- Default Display ---------------- */
                      <Typography sx={{ fontSize: "0.85rem" }}>
                        {row[col.key] ?? ""}
                      </Typography>
                    )}

                  </TableCell>
                ))}

              </TableRow>
            ))
          )}

        </TableBody>

      </Table>
    </TableContainer>
  );
};

export default UiAccessTable;