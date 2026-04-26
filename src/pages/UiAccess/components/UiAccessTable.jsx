// File: src/pages/UiAccess/components/UiAccessTable.jsx
// Purpose: Render table for Role ↔ UI Page Access

import React from "react";
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  Paper, CircularProgress, Box, Typography,
  Checkbox, Tooltip 
} from "@mui/material";

const UiAccessTable = ({ rows, loading, columns, onCellChange }) => {

  /* ---------------- Loading State ---------------- */
  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", p: 4 }}>
        <CircularProgress size={28} />
      </Box>
    );
  }

  /* ---------------- Normalize Assigned Value ---------------- */
  const isChecked = (val) => {
    // normalization for API inconsistencies
    return val === 1 || val === "1" || val === true;
  };

  return (
    <TableContainer
      component={Paper}
      sx={{
        maxHeight: "65vh",
        overflow: "auto",
        borderRadius: "12px"
      }}
    >
      <Table size="small" stickyHeader sx={{ minWidth: 900 }}>

        {/* ---------------- Header ---------------- */}
        <TableHead>
          <TableRow>
            {columns.map((col) => (
              <TableCell
                key={col.key}
                sx={{
                  fontWeight: 700,
                  backgroundColor: "#F1F3F5",
                  color: "#343A40",
                  fontSize: "0.85rem"
                }}
              >
                {col.label}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>

        {/* ---------------- Body ---------------- */}
        <TableBody>

          {/* No Data Message */}
          {(!rows || rows.length === 0) ? (
            <TableRow>
              <TableCell colSpan={columns.length} align="center" sx={{ py: 6 }}>
                <Typography sx={{ color: "#6c757d", fontWeight: 600 }}>
                  No Records
                </Typography>
              </TableCell>
            </TableRow>
          ) : (
            rows.map((row) => {

              /* ---------------- Row State ---------------- */
              const isUnassigned = !isChecked(row.Assigned);
              const isDirty = row.__dirty;

              return (
                <TableRow
                  key={`${row.Game_Id}-${row.RL_Id}-${row.UI_Id}`}
                  hover
                  sx={{
                    backgroundColor: isUnassigned ? "#FFF8E1" : "inherit",
                    ...(isDirty && { backgroundColor: "#E3F2FD" }),
                    borderLeft: isDirty ? "4px solid #1976D2" : "4px solid transparent",
                    transition: "all 0.15s ease-in-out"
                  }}
                >

                  {columns.map((col) => (
                    <TableCell key={col.key} sx={{ py: 0.8 }}>

                      {/* ---------------- Assigned Toggle ---------------- */}
                      {col.key === "Assigned" ? (
                        <Box sx={{ display: "flex", justifyContent: "center" }}>

                          <Tooltip
                            title={isChecked(row.Assigned) ? "Remove Access" : "Grant Access"}
                            arrow
                          >
                            <Checkbox
                              size="small"
                              checked={isChecked(row.Assigned)}
                              onChange={(e) =>
                                onCellChange(row, e.target.checked)
                              }
                              sx={{
                                color: "#ADB5BD",
                                padding: "4px",
                                "&.Mui-checked": {
                                  color: "#2E7D32"
                                }
                              }}
                            />
                          </Tooltip>

                        </Box>
                      ) : (
                        /* ---------------- Default Display ---------------- */
                        <Typography sx={{ fontSize: "0.85rem", color: "#212529", fontWeight: 500 }}>
                          {row[col.key] ?? ""}
                        </Typography>
                      )}

                    </TableCell>
                  ))}

                </TableRow>
              );
            })
          )}

        </TableBody>

      </Table>
    </TableContainer>
  );
};

export default UiAccessTable;
