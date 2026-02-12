// File: src/pages/TeamPlan/components/TeamPlanItem.jsx
// Purpose: Render Team Plan table with editable cells and loading state

import React from "react";
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  TextField, Paper, CircularProgress, Select, MenuItem, Box, Typography,
} from "@mui/material";

// Team plan items with editable fields and loading state
const TeamPlanItem = ({
  rows,
  loading,
  columns,
  lovsMap,
  currentTab,
  onEditStart,
  onCellChange,
  fetchBuyInfoLovForPart,
}) => {
  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", p: 4 }}>
        <CircularProgress size={28} />
      </Box>
    );
  }

  return (
    <TableContainer component={Paper} sx={{ maxHeight: "65vh", overflow: "auto" }}>
      <Table size="small" stickyHeader sx={{ minWidth: 900 }}>
        <TableHead>
          <TableRow>
            {columns.map((col) => (
              <TableCell
                key={col.key}
                sx={{
                  fontWeight: 800,
                  backgroundColor: "#F1F3F5",
                  textTransform: "uppercase",
                  fontSize: "0.85rem",
                  color: "#212529",
                  position: "sticky",
                  top: 0,
                  zIndex: 2,
                }}
              >
                {col.label}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>

        <TableBody>
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
              // Price LOV for this row's Part_No and currentTab
              const priceLov = lovsMap?.[currentTab]?.[row.Part_No]?.Price_Lov || [];
              const hasPriceId = priceLov.some((p) => p.Price_Id === row.Price_Id);
              const selectedPriceId = hasPriceId ? (row.Price_Id ?? "") : "";

              return (
                <TableRow key={rowIndex} hover>
                  {columns.map((col) => (
                    <TableCell key={col.key} sx={{ verticalAlign: "top" }}>
                      {col.key === "Required_Quantity" ? (
                        col.editable ? (
                          <TextField
                            size="small"
                            value={row.Required_Quantity ?? ""}
                            onFocus={() => onEditStart && onEditStart()}
                            onChange={(e) => {
                              const raw = e.target.value;
                              const val = raw === "" ? "" : Number(raw);
                              onCellChange && onCellChange(rowIndex, "Required_Quantity", val);

                              const currentQty = row.Quantity;
                              const isQtyEmptyOrZero =
                                currentQty === "" || currentQty === null ||
                                currentQty === undefined || Number(currentQty) === 0;
                              if (isQtyEmptyOrZero) {
                                onCellChange && onCellChange(rowIndex, "Quantity", val);
                              }
                            }}
                            fullWidth
                            inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
                          />
                        ) : (
                          row.Required_Quantity ?? ""
                        )
                      ) : col.key === "Info_Price" ? (
                        col.editable ? (
                          <Select
                            size="small"
                            value={selectedPriceId}
                            onFocus={() => {
                              onEditStart && onEditStart();
                              fetchBuyInfoLovForPart && fetchBuyInfoLovForPart(currentTab, row.Part_No);
                            }}
                            // Handle all Changes in the row, as per LOV
                            onChange={(e) => {
                              const selectedPriceIdValue = e.target.value;
                              const selected = priceLov.find((p) => p.Price_Id === selectedPriceIdValue);

                              const updatedRow = {
                                ...row,
                                Price_Id: selectedPriceIdValue ?? null,
                                Info_Price: selected?.Info_Price ?? "",
                                Quantity: (selected?.Quantity === 0 || selected?.Quantity === null)
                                  ? row.Required_Quantity
                                  : selected?.Quantity ?? "",
                                Unit_Price: selected?.Unit_Price ?? null,
                              };

                              onCellChange && onCellChange(rowIndex, null, updatedRow);
                            }}

                            fullWidth
                          >
                            {priceLov.length === 0 ? (
                              <MenuItem value="">
                                <em>No options</em>
                              </MenuItem>
                            ) : (
                              priceLov.map((p) => (
                                <MenuItem key={p.Price_Id ?? p.Info_Price} value={p.Price_Id}>
                                  {p.Info_Price}
                                </MenuItem>
                              ))
                            )}
                          </Select>
                        ) : (
                          row.Info_Price ?? ""
                        )
                      ) : col.editable ? (
                        <TextField
                          size="small"
                          value={row[col.key] ?? ""}
                          onFocus={() => onEditStart && onEditStart()}
                          onChange={(e) => {
                            let val = e.target.value;
                            if (col.key === "Quantity" || col.key === "Required_Quantity") {
                              val = val === "" ? "" : Number(val);
                            }
                            onCellChange && onCellChange(rowIndex, col.key, val);

                            if (col.key === "Quantity") {
                              const newQty = val;
                              if (newQty === 0 || newQty === "" || newQty === null) {
                                const reqQty = row.Required_Quantity;
                                if (reqQty !== undefined && reqQty !== null) {
                                  onCellChange && onCellChange(rowIndex, "Quantity", reqQty);
                                }
                              }
                            }
                          }}
                          fullWidth
                          inputProps={{
                            inputMode: col.key === "Quantity" || col.key === "Required_Quantity" ? "numeric" : "text",
                            pattern: col.key === "Quantity" || col.key === "Required_Quantity" ? "[0-9]*" : undefined,
                          }}
                        />
                      ) : (
                        row[col.key] ?? ""
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

export default TeamPlanItem;
