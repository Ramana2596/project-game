// File: src/pages/TeamPlan/components/TeamPlanItem.jsx
// Purpose: Render table with Tab-specific logic (Editable Quantity for Products)

import React from "react";
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  TextField, Paper, CircularProgress, Select, MenuItem, Box, Typography,
} from "@mui/material";

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

  // Display loading spinner while fetching data
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
            {/* Header row with sticky positioning and bold labels */}
            {columns.map((col) => (
              <TableCell
                key={col.key}
                sx={{
                  fontWeight: 800,
                  backgroundColor: "#F1F3F5",
                  textTransform: "uppercase",
                  fontSize: "0.85rem",
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
                <Typography sx={{ color: "#6c757d", fontWeight: 600 }}>No Records</Typography>
              </TableCell>
            </TableRow>
          ) : (
            rows.map((row, rowIndex) => {
              const priceLov = lovsMap?.[currentTab]?.[row.Part_No]?.Price_Lov || [];
              const selectedPriceId = priceLov.some((p) => p.Price_Id === row.Price_Id) ? (row.Price_Id ?? "") : "";

              return (
                <TableRow key={rowIndex} hover>
                  {columns.map((col) => (
                    <TableCell key={col.key} sx={{ verticalAlign: "middle" }}>
                      
                      {/* Required Quantity: Only for Material/Machinery tabs */}
                      {col.key === "Required_Quantity" && currentTab !== "OI 001" ? (
                        <TextField
                          size="small"
                          value={row.Required_Quantity ?? ""}
                          onFocus={() => onEditStart && onEditStart()}
                          onChange={(e) => {
                            const val = e.target.value === "" ? "" : Number(e.target.value);
                            onCellChange(rowIndex, "Required_Quantity", val);
                            const apiQty = Number(priceLov.find(p => p.Price_Id === row.Price_Id)?.Quantity || 0);
                            onCellChange(rowIndex, "Quantity", Math.max(Number(val || 0), apiQty));
                          }}
                          fullWidth
                        />
                      ) : 

                      /* Info_Price: Read-only for Products & Interactive Select for Material/Machinery,  */
                      col.key === "Info_Price" ? (
                        currentTab === "OI 001" ? (
                          <Typography sx={{ fontSize: "0.85rem" }}>{row.Info_Price || row.Purchase_Preference || ""}</Typography>
                        ) : (
                          <Select
                            size="small"
                            value={selectedPriceId}
                            onFocus={() => {
                              onEditStart && onEditStart();
                              fetchBuyInfoLovForPart && fetchBuyInfoLovForPart(currentTab, row.Part_No);
                            }}
                            onChange={(e) => {
                              const selected = priceLov.find((p) => p.Price_Id === e.target.value);
                              const finalQty = Math.max(Number(row.Required_Quantity || 0), Number(selected?.Quantity || 0));
                              onCellChange(rowIndex, null, {
                                ...row,
                                Price_Id: e.target.value,
                                Info_Price: selected?.Info_Price ?? "",
                                Quantity: finalQty,
                                Unit_Price: selected?.Unit_Price ?? 0,
                              });
                            }}
                            fullWidth
                          >
                            {priceLov.map((p) => <MenuItem key={p.Price_Id} value={p.Price_Id}>{p.Info_Price}</MenuItem>)}
                          </Select>
                        )
                      ) : 

                      /* Quantity: Editable for Products (OI 001), Calculated Display for others */
                      col.key === "Quantity" ? (
                        currentTab === "OI 001" ? (
                          <TextField
                            size="small"
                            value={row.Quantity ?? ""}
                            onFocus={() => onEditStart && onEditStart()}
                            onChange={(e) => onCellChange(rowIndex, "Quantity", e.target.value === "" ? "" : Number(e.target.value))}
                            fullWidth
                          />
                        ) : (
                          <Typography sx={{ fontWeight: 700, color: "#1976D2", textAlign: "right" }}>
                            {row.Quantity ?? 0}
                          </Typography>
                        )
                      ) : (
                        /* Standard fallback: Handles the "not displayed" values by checking for existence */
                        <Typography sx={{ fontSize: "0.85rem" }}>
                          {row[col.key] !== undefined && row[col.key] !== null ? row[col.key] : ""}
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

export default TeamPlanItem;