// File: src/pages/TeamPlan/components/TeamPlanItem.jsx
// Purpose: plan table for the active tab, with tab-specific edit rules.
// Built on tableStyle. Rules and number formatting come from utils/planRules.js.
// Inputs accept only whole numbers and say why a key was refused.
// Required Quantity 0 = "Not ordering now". Rows have stable keys, a changed-row marker and an inline error.
// Quantity and Unit_Price are the result of the user's choices (Required Quantity, price source),
// so they are shown larger and bold. Active row (click or focus) is reported so the Guide card can follow it.

// React and MUI building blocks.
import React, { useMemo, useState } from "react";
import {
  alpha,
  Box,
  CircularProgress,
  MenuItem,
  Paper,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import { EditOutlined as EditIcon } from "@mui/icons-material";
import { visuallyHidden } from "@mui/utils";

// UXLab V3 style tokens.
import { colors, masterTypo, tableStyle } from "../../../ux/styles";

// Shared plan rules and number formatting.
import {
  NUMERIC_KEYS,
  checkTypedQuantity,
  formatPrice,
  formatQuantity,
  getRowKey,
  isBlank,
} from "../utils/planRules.js";

// Cell text style (left aligned).
const TEXT_SX = { ...masterTypo.tableParameter, color: colors.body };

// Cell number style (right aligned, tabular digits).
const NUMBER_SX = {
  ...masterTypo.tableParameter,
  ...tableStyle.numeric,
  color: colors.body,
};

// Result values (Quantity, Unit_Price): larger, bold and dark so they stand out from the other cells.
const KEY_VALUE_SX = {
  ...masterTypo.body1,
  ...tableStyle.numeric,
  fontWeight: 700,
  color: colors.title,
};

const TeamPlanItem = ({
  rows,
  loading,
  columns,
  lovsMap,
  currentTab,
  changedRows = [],
  rowErrors = {},
  activePart = null,
  onActiveRowChange,
  onCellChange,
  fetchBuyInfoLovForPart,
}) => {
  // OI 001 is the product tab; the other tabs order materials and machines.
  const isProductTab = currentTab === "OI 001";

  // The input being edited (shows its raw text) and the reason a key was refused.
  const [active, setActive] = useState({ key: "", hint: "" });

  // Keys of rows edited since the last save.
  const changedKeys = useMemo(
    () => new Set(changedRows.map(getRowKey)),
    [changedRows]
  );

  // Show a spinner while the first load is running.
  if (loading) {
    return (
      <Box
        role="status"
        aria-label="Loading plan data"
        sx={{ display: "flex", justifyContent: "center", p: 4 }}
      >
        <CircularProgress size={28} />
      </Box>
    );
  }

  // Number input: raw text while editing, formatted otherwise.
  // options: onBlurExtra runs after blur; valueSx styles the typed number.
  const renderNumberInput = (
    rowIndex,
    row,
    field,
    label,
    hasError,
    { onBlurExtra, valueSx = NUMBER_SX } = {}
  ) => {
    const cellKey = `${getRowKey(row)}|${field}`;
    const isActive = active.key === cellKey;
    const hint = isActive ? active.hint : "";
    const raw = row[field];
    const notOrdering = field === "Required_Quantity" && !isBlank(raw) && Number(raw) === 0;

    return (
      <TextField
        size="small"
        value={isActive ? String(raw ?? "") : formatQuantity(raw)}
        error={hasError}
        // Focus: show the raw text and clear any hint.
        onFocus={() => setActive({ key: cellKey, hint: "" })}
        // Typing: refuse invalid keys with a reason, accept valid ones.
        onChange={(e) => {
          const reason = checkTypedQuantity(e.target.value);
          if (reason) {
            setActive({ key: cellKey, hint: reason });
            return;
          }
          setActive({ key: cellKey, hint: "" });
          onCellChange(rowIndex, field, e.target.value);
        }}
        // Enter works like clicking outside: runs the blur logic below.
        onKeyDown={(e) => {
          if (e.key === "Enter") e.target.blur();
        }}
        // Blur: back to formatted text, then run the extra action (price list fetch).
        onBlur={(e) => {
          setActive({ key: "", hint: "" });
          onBlurExtra?.(e);
        }}
        helperText={
          hint ||
          (notOrdering
            ? "Not ordering now"
            : isActive && field === "Required_Quantity"
            ? "Press Enter to update price"
            : undefined)
        }
        FormHelperTextProps={{
          sx: {
            ...masterTypo.caption,
            mx: 0,
            textAlign: "right",
            color: hint ? colors.error : colors.subtitle,
          },
        }}
        inputProps={{
          inputMode: "numeric",
          "aria-label": label,
          style: { textAlign: "right" },
        }}
        sx={{ minWidth: 110, "& .MuiInputBase-input": valueSx }}
        fullWidth
      />
    );
  };

  // Render one cell according to its column and the active tab.
  const renderCell = (col, row, rowIndex, hasError) => {
    const label = `${col.label} for part ${row.Part_No}`;

    // Required Quantity: input on Material and Machine tabs. 0 = not ordering.
    if (col.key === "Required_Quantity" && !isProductTab) {
      return renderNumberInput(rowIndex, row, "Required_Quantity", label, hasError, {
        // Price list is fetched after the user finishes typing (blur or Enter).
        onBlurExtra: (e) =>
          fetchBuyInfoLovForPart?.(currentTab, row.Part_No, e.target.value),
      });
    }

    // Info Price: text on Product tab, price selector on Material / Machine.
    if (col.key === "Info_Price") {
      if (isProductTab) {
        return (
          <Typography sx={TEXT_SX}>
            {row.Info_Price || row.Purchase_Preference || ""}
          </Typography>
        );
      }

      // Price options for this part, and the one currently selected.
      const priceLov = lovsMap?.[currentTab]?.[row.Part_No]?.Price_Lov || [];
      const selectedPriceId = priceLov.some((p) => p.Price_Id === row.Price_Id)
        ? row.Price_Id
        : "";

      return (
        <Select
          size="small"
          value={selectedPriceId}
          displayEmpty
          error={hasError}
          // Show the saved price text until the price list has loaded.
          renderValue={(v) =>
            priceLov.find((p) => p.Price_Id === v)?.Info_Price ??
            row.Info_Price ??
            ""
          }
          // Focus: make sure the price list is loaded for the dropdown.
          onFocus={() =>
            fetchBuyInfoLovForPart?.(currentTab, row.Part_No, row.Required_Quantity)
          }
          // Choice: the selected price sets Info_Price, Quantity and Unit_Price.
          onChange={(e) => {
            const selected = priceLov.find((p) => p.Price_Id === e.target.value);
            onCellChange(rowIndex, null, {
              ...row,
              Price_Id: e.target.value,
              Info_Price: selected?.Info_Price ?? "",
              Quantity: selected?.Quantity ?? 0,
              Unit_Price: selected?.Unit_Price ?? 0,
            });
          }}
          inputProps={{ "aria-label": `Price source for part ${row.Part_No}` }}
          sx={{ minWidth: 160, ...TEXT_SX }}
          fullWidth
        >
          {priceLov.map((p) => (
            <MenuItem key={p.Price_Id} value={p.Price_Id} sx={TEXT_SX}>
              {p.Info_Price}
            </MenuItem>
          ))}
        </Select>
      );
    }

    // Quantity: typed on the Product tab, calculated from the selected price on the others.
    if (col.key === "Quantity") {
      if (isProductTab) {
        return renderNumberInput(rowIndex, row, "Quantity", label, hasError, {
          valueSx: KEY_VALUE_SX,
        });
      }

      // Required Quantity 0 = "Not ordering now", so the ordered quantity is 0.
      const notOrdering =
        !isBlank(row.Required_Quantity) && Number(row.Required_Quantity) === 0;

      return (
        <Typography title="Calculated from the selected price" sx={KEY_VALUE_SX}>
          {formatQuantity(notOrdering ? 0 : row.Quantity ?? 0)}
        </Typography>
      );
    }

    // Unit Price: system value from the price source; "-" when there is none yet.
    if (col.key === "Unit_Price") {
      const price = formatPrice(row.Unit_Price);
      return (
        <Typography
          title="From the selected price"
          sx={{ ...KEY_VALUE_SX, ...(price === "" && { color: colors.muted }) }}
        >
          {price === "" ? "-" : price}
        </Typography>
      );
    }

    // Everything else is display-only: numbers right aligned, text left aligned.
    const value = row[col.key];
    if (NUMERIC_KEYS.includes(col.key)) {
      return <Typography sx={NUMBER_SX}>{formatQuantity(value)}</Typography>;
    }
    return <Typography sx={TEXT_SX}>{value ?? ""}</Typography>;
  };

  return (
    // Scrollable table area.
    <TableContainer
      component={Paper}
      elevation={0}
      square
      sx={{ maxHeight: "65vh", overflow: "auto", background: "transparent" }}
    >
      <Table size="small" stickyHeader sx={{ minWidth: 900, ...tableStyle.compact }}>
        {/* Column headers; editable columns carry a pencil icon and a hidden "(editable)" label */}
        <TableHead sx={tableStyle.columnHeader}>
          <TableRow>
            {columns.map((col) => (
              <TableCell
                key={col.key}
                title={col.editable ? "Editable" : undefined}
                align={NUMERIC_KEYS.includes(col.key) ? "right" : "left"}
                sx={{ whiteSpace: "nowrap" }}
              >
                <Box
                  component="span"
                  sx={{ display: "inline-flex", alignItems: "center", gap: 0.5 }}
                >
                  {col.label}
                  {col.editable && (
                    <>
                      <EditIcon aria-hidden sx={{ fontSize: 14, opacity: 0.85 }} />
                      <Box component="span" sx={visuallyHidden}>
                        (editable)
                      </Box>
                    </>
                  )}
                </Box>
              </TableCell>
            ))}
          </TableRow>
        </TableHead>

        <TableBody>
          {/* Empty state */}
          {!rows || rows.length === 0 ? (
            <TableRow>
              <TableCell colSpan={columns.length} align="center" sx={{ py: 6 }}>
                <Typography sx={{ ...masterTypo.body1, color: colors.subtitle, fontWeight: 600 }}>
                  No plan items for this category.
                </Typography>
              </TableCell>
            </TableRow>
          ) : (
            // Data rows
            rows.map((row, rowIndex) => {
              const rowKey = getRowKey(row);
              const errorMessage = rowErrors[rowKey];
              const isChanged = changedKeys.has(rowKey);

              // The line the Guide card is showing.
              const isActiveRow =
                activePart != null && String(row.Part_No) === String(activePart);

              // Tint sits on the cells so it shows over the striped row colour.
              // Errors and edited rows take priority over the active-row shade.
              const tint = errorMessage
                ? alpha(colors.error, 0.08)
                : isChanged
                ? alpha(colors.primary, 0.06)
                : isActiveRow
                ? alpha(colors.primary, 0.04)
                : undefined;

              return (
                // Click or focus makes this the active line for the Guide and Review cards.
                <TableRow
                  key={rowKey === "|" ? rowIndex : rowKey}
                  sx={tableStyle.row}
                  aria-selected={isActiveRow}
                  onClick={() => onActiveRowChange?.(row)}
                  onFocus={() => onActiveRowChange?.(row)}
                >
                  {columns.map((col, colIndex) => (
                    <TableCell
                      key={col.key}
                      sx={{
                        ...tableStyle.cell,
                        verticalAlign: "middle",
                        backgroundColor: tint,
                        // Marker bar on the first cell: a visible edge, not colour alone.
                        ...(colIndex === 0 && {
                          borderLeft: `3px solid ${
                            errorMessage
                              ? colors.error
                              : isChanged
                              ? colors.primary
                              : "transparent"
                          }`,
                        }),
                      }}
                    >
                      {renderCell(col, row, rowIndex, Boolean(errorMessage))}

                      {/* Inline row error under the first cell */}
                      {colIndex === 0 && errorMessage && (
                        <Typography
                          role="alert"
                          sx={{ ...masterTypo.caption, color: colors.error, mt: 0.5 }}
                        >
                          {errorMessage}
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