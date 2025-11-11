// ----------------------------
// Imports
// ----------------------------
import { useState, useEffect } from "react";
import Grid from "@mui/material/Grid2";
import Button from "@mui/material/Button";
import GenericTable from "../../../components/GenericTable.jsx";
import EditableTableData from "../../../components/EditableTableData.jsx";
import AddTableCascading from "../../../components/AddTableCascading.jsx";
import { pageConstants } from "../constants/pageConstants.js";
import { getOperationalPlanInfoTableData } from "../services/service.js";
import { useLoading } from "../../../hooks/loadingIndicatorContext.js";

// ----------------------------
// Main Component
// ----------------------------
export default function OpsPlanInputTable({
  tableData,                    // Existing data to display
  isEnableTableActions,         // Controls Add/Modify enable
  onSubmitApiCall,              // Function to call parent on save
  setDisableHeaderSection,      // Disable header when editing
  selectedOpsInput,             // Input params (IDs, refs, etc.)
}) {
  const { setIsLoading } = useLoading();

  // ----------------------------
  // Local State
  // ----------------------------
  const [disableMainBtns, setDisableMainBtns] = useState(!isEnableTableActions);
  const [disableSubBtns, setDisableSubBtns] = useState(!isEnableTableActions);
  const [showTableView, setShowTableView] = useState(true);
  const [showAddForm, setShowAddForm] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);

  const [addFormConfig, setAddFormConfig] = useState([]);
  const [newRows, setNewRows] = useState([]);
  const [deletedRows, setDeletedRows] = useState([]);
  const [currentRow, setCurrentRow] = useState({});
  const [updatedRow, setUpdatedRow] = useState({});
  const [loading, setLoading] = useState(true);
  const [resetKey, setResetKey] = useState(0);

  // ----------------------------
  // Enable / Disable buttons on prop change
  // ----------------------------
  useEffect(() => {
    setDisableMainBtns(!isEnableTableActions);
  }, [isEnableTableActions]);

  // ----------------------------
  // Fetch dropdown data for cascading inputs
  // ----------------------------
  useEffect(() => {
    const fetchDropdownData = async () => {
      const { operationsInputId, marketInputId, refTypeInfo, refTypePrice } = selectedOpsInput || {};
      if (!operationsInputId || !marketInputId || !refTypeInfo || !refTypePrice) return;

      try {
        setIsLoading(true);
        setLoading(true);

        // Helper function for cascading dropdowns
        const fetchAndAssign = async (cmd, col, mapFn) => {
          const data = await getOperationalPlanInfoTableData({ ...selectedOpsInput, cmdLine: cmd });
          pageConstants.contentSection.inputTypesForAdd.forEach((obj) => {
            if (obj.columnName === col) obj.data = data.data.map(mapFn);
          });
        };

        await Promise.all([
          fetchAndAssign("Get_Part", "Description", (d) => ({ value: d.Part, label: d.Description })),
          fetchAndAssign("Get_Qty_Id", "Quantity_Info", (d) => ({ value: d.Info_Qty_Id, label: d.Info_On_Qty })),
          fetchAndAssign("Get_Price_Id", "Info_Price", (d) => ({ value: d.Price_Id, label: d.Info_On_Price })),
        ]);

        setAddFormConfig([...pageConstants.contentSection.inputTypesForAdd]);
      } catch (err) {
        console.error("Dropdown fetch error:", err);
      } finally {
        setIsLoading(false);
        setLoading(false);
      }
    };

    fetchDropdownData();
  }, [
    selectedOpsInput?.operationsInputId,
    selectedOpsInput?.marketInputId,
    selectedOpsInput?.refTypeInfo,
    selectedOpsInput?.refTypePrice,
  ]);

  // ----------------------------
  // Auto-fetch Unit Price when all 3 cascading values selected
  // ----------------------------
  useEffect(() => {
    const { Description, Quantity_Info, Info_Price } = currentRow;
    if (!Description?.value || !Quantity_Info?.value || !Info_Price?.value) return;

    getOperationalPlanInfoTableData({
      ...selectedOpsInput,
      partNo: Description.value,
      quantityId: Quantity_Info.value,
      priceId: Info_Price.value,
      cmdLine: "Get_Unit_Price",
    }).then((data) => {
      const price = data?.data?.[0]?.Unit_Price || 0;
      setUpdatedRow({
        ...currentRow,
        Unit_Price: { value: price, label: price, inputType: "readonly" },
      });
    });
  }, [currentRow?.Description?.value, currentRow?.Quantity_Info?.value, currentRow?.Info_Price?.value]);

  // ----------------------------
  // Button Handlers
  // ----------------------------
  const handleAdd = () => {
    setDisableMainBtns(true);
    setDisableSubBtns(false);
    setShowTableView(false);
    setShowAddForm(true);
    setDisableHeaderSection(true);
  };

  const handleEdit = () => {
    setDisableMainBtns(true);
    setDisableSubBtns(false);
    setShowTableView(false);
    setShowEditForm(true);
    setDisableHeaderSection(true);
  };

  const handleSave = () => {
    onSubmitApiCall(newRows, deletedRows, showAddForm); // true for Add, false for Edit
    resetView();
  };

  const handleCancel = () => {
    resetView();
    setResetKey((k) => k + 1); // refresh child
  };

  // ----------------------------
  // Helper - Reset View
  // ----------------------------
  const resetView = () => {
    setDisableMainBtns(false);
    setDisableSubBtns(true);
    setShowTableView(true);
    setShowAddForm(false);
    setShowEditForm(false);
    setDisableHeaderSection(false);
  };

  // ----------------------------
  // Editable table update handler
  // ----------------------------
  const handleTableUpdate = (updatedData) => {
    const modified = updatedData.filter((row, i) =>
      Object.keys(row).some((key) => row[key] !== tableData[i]?.[key])
    );
    const deleted = updatedData.filter((r) => r.deleted === true);
    setNewRows(modified);
    setDeletedRows(deleted);
  };

  // ----------------------------
  // Add form checkbox change (select new rows)
  // ----------------------------
  const handleCheckboxChange = (rows) => {
    const newData = rows.map((r) => {
      const result = {};
      Object.entries(r).forEach(([k, v]) => {
        result[k === "Description" ? "Part" : k] = v.value;
      });
      return result;
    });
    setNewRows(newData);
  };

  // ----------------------------
  // Cascading field update
  // ----------------------------
  const handleFieldUpdate = (rowData) => {
    const { Description, Quantity_Info, Info_Price } = rowData;
    if (Description?.value && Quantity_Info?.value && Info_Price?.value) {
      setCurrentRow(rowData);
    }
  };

  // ----------------------------
  // JSX UI
  // ----------------------------
  return (
    <div>
      {/* ---------------- Buttons Row ---------------- */}
      <Grid margin={2} container spacing={2} justifyContent="center" alignItems="center">
        <Button disabled={disableMainBtns} onClick={handleAdd}>
          {pageConstants.contentSection.addBtnLabel}
        </Button>
        <Button disabled={disableMainBtns} onClick={handleEdit}>
          {pageConstants.contentSection.modifyBtnLabel}
        </Button>
        <Button disabled={disableSubBtns} onClick={handleSave}>
          {pageConstants.contentSection.saveBtnLabel}
        </Button>
        <Button disabled={disableSubBtns} onClick={handleCancel}>
          {pageConstants.contentSection.cancelBtnLabel}
        </Button>
      </Grid>

      {/* ---------------- Table View ---------------- */}
      {showTableView && (
        <GenericTable
          inputTableHeadings={pageConstants.contentSection.tableHeading}
          inputTableData={tableData}
          hiddenColumns={pageConstants.contentSection.hiddenTableColumns}
        />
      )}

      {/* ---------------- Add Form (Cascading) ---------------- */}
      {!loading && showAddForm && (
        <AddTableCascading
          tableInputTypes={addFormConfig}
          onCheckboxChange={handleCheckboxChange}
          onUpdateRowValues={handleFieldUpdate}
          updatedRowDataToChild={updatedRow}
          resetKey={resetKey}
        />
      )}

      {/* ---------------- Edit Form ---------------- */}
      {showEditForm && (
        <EditableTableData
          key={resetKey}
          editableTableData={tableData}
          inputTableHeadings={pageConstants.contentSection.tableHeading}
          hiddenColumns={pageConstants.contentSection.hiddenTableColumns}
          tableInputTypes={pageConstants.contentSection.inputTypes}
          onUpdate={handleTableUpdate}
        />
      )}
    </div>
  );
}
