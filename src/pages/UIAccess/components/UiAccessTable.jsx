// File: src/pages/UiAccess/components/UiAccessTable.jsx
// Purpose: Render table for Role ↔ UI Page Access (✔ Assigned model with enterprise UX)

import React from "react";
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  Paper, CircularProgress, Box, Typography,
  Checkbox, Tooltip   // ✅ Added for better UX
} from "@mui/material";

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
            rows.map((row, rowIndex) => {

              /* ---------------- Row State Styling ---------------- */
              const isUnassigned = row.Assigned === 0;
              const isDirty = row.__dirty;

              return (
                <TableRow
                  key={rowIndex}
                  hover
                  sx={{
                    // highlight: unassigned rows (soft amber)
                    backgroundColor: isUnassigned ? "#FFF8E1" : "inherit",

                    // highlight: dirty rows (light blue tint)
                    ...(isDirty && {
                      backgroundColor: "#E3F2FD"
                    }),

                    // indicator: left border for edited rows
                    borderLeft: isDirty ? "4px solid #1976D2" : "4px solid transparent",

                    transition: "all 0.15s ease-in-out"
                  }}
                >

                  {columns.map((col) => (
                    <TableCell key={col.key} sx={{ py: 0.8 }}>

                      {/* ---------------- Assigned Toggle (Checkbox UX) ---------------- */}
                      {col.key === "Assigned" ? (
                        <Box sx={{ display: "flex", justifyContent: "center" }}>

                          {/* ❌ Old index-based toggle (breaks with filter/sort) */}
                          {/*
                          <Checkbox
                            checked={row.Assigned === 1}
                            onChange={(e) =>
                              onCellChange(rowIndex, e.target.checked)
                            }
                          />
                          */}

                          {/* ✅ Key-based toggle using full row (stable + correct) */}
                          <Tooltip
                            title={row.Assigned ? "Remove Access" : "Grant Access"}
                            arrow
                          >
                            <Checkbox
                              size="small"

                              // bind numeric (0/1) to boolean
                              checked={row.Assigned === 1}

                              // ✔ pass full row instead of index
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
                        <Typography
                          sx={{
                            fontSize: "0.85rem",
                            color: "#212529",
                            fontWeight: 500
                          }}
                        >
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