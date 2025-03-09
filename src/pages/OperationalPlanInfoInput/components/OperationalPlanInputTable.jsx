import Grid from "@mui/material/Grid2";
import Button from "@mui/material/Button";
import GenericTable from "../../../components/GenericTable";
import { useState, useEffect } from "react";
import AddTableData from "../../../components/AddTableData";
import EditableTableData from "../../../components/EditableTableData";
import { pageConstants } from "../constants/pageConstants.js";
import { getOperationalPlanInfoTableData } from "../services/operationalPlanInfoInputService";
import { useLoading } from "../../../hooks/loadingIndicatorContext.js";
import AddTableCascading from "../../../components/AddTableCascading.jsx";

export default function OperationalPlanInputTable({
  tableData,
  isEnableTableActions,
  onSubmitApiCall,
  setDisableHeaderSection,
  selectedOperationalInput,
}) {
  const { setIsLoading } = useLoading();
  const [isDisableActionBtns, setIsDisableActionBtns] = useState(
    !isEnableTableActions
  );
  const [isDisableSubCanBtns, setIsDisableSubCanBtns] = useState(
    !isEnableTableActions
  );
  const [isEnableGenericTable, setIsEnableGenericTable] = useState(false);
  const [isEnableTableAdd, setIsEnableTableAdd] = useState(true);
  const [isEnableTableEdit, setIsEnableTableEdit] = useState(true);
  const [newTableData, setNewTableData] = useState([]);
  const [addTableData, setAddTableData] = useState([]);
  const [currentRowDataFromChild, setCurrentRowData] = useState({});
  const [updatedRowData, setUpdatedRowData] = useState({});
  const [loading, setLoading] = useState(true);
  const [deletedTableData, setDeletedTableData] = useState([]);
  const [resetKey, setResetKey] = useState(0); // Add resetKey state

  useEffect(() => {
    setIsDisableActionBtns(!isEnableTableActions);
  }, [isEnableTableActions]);

  useEffect(() => {
    const fetchData = async () => {
      if (selectedOperationalInput?.operationsInputId &&
        selectedOperationalInput?.marketInputId &&
        selectedOperationalInput?.refTypeInfo &&
        selectedOperationalInput?.refTypePrice
      ) {
        try {
          setIsLoading(true);
          setLoading(true);
          const partPromise = getOperationalPlanInfoTableData({
            gameId: selectedOperationalInput?.gameId,
            gameBatch: selectedOperationalInput?.gameBatch,
            gameTeam: selectedOperationalInput?.gameTeam,
            productionMonth: null,
            partCategory: selectedOperationalInput?.partCategory,
            operationsInputId: selectedOperationalInput?.operationsInputId,
            refTypeInfo: null,
            refTypePrice: null,
            cmdLine: "Get_Part",
          }).then((data) => {
            pageConstants.contentSection.inputTypesForAdd.forEach(
              (inputTypeObj) => {
                if (inputTypeObj.columnName === "Description") {
                  inputTypeObj.data = data.data?.map((dataObj) => {
                    return { value: dataObj?.Part, label: dataObj?.Description };
                  });
                }
              }
            );
          });

          const qtyPromise = getOperationalPlanInfoTableData({
            gameId: selectedOperationalInput?.gameId,
            gameBatch: selectedOperationalInput?.gameBatch,
            productionMonth: null,
            operationsInputId: selectedOperationalInput?.operationsInputId,
            partCategory: selectedOperationalInput?.partCategory,
            refTypeInfo: selectedOperationalInput?.refTypeInfo,
            refTypePrice: selectedOperationalInput?.refTypePrice,
            cmdLine: "Get_Qty_Id",
          }).then((data) => {
            pageConstants.contentSection.inputTypesForAdd.forEach(
              (inputTypeObj) => {
                if (inputTypeObj.columnName === "Quantity_Info") {
                  inputTypeObj.data = data.data?.map((dataObj) => {
                    return {
                      value: dataObj?.Info_Qty_Id,
                      label: dataObj?.Info_On_Qty,
                    };
                  });
                }
              }
            );
          });

          const pricePromise = getOperationalPlanInfoTableData({
            gameId: selectedOperationalInput?.gameId,
            gameBatch: selectedOperationalInput?.gameBatch,
            productionMonth: null,
            operationsInputId: selectedOperationalInput?.operationsInputId,
            partCategory: selectedOperationalInput?.partCategory,
            refTypeInfo: selectedOperationalInput?.refTypeInfo,
            refTypePrice: selectedOperationalInput?.refTypePrice,
            cmdLine: "Get_Price_Id",
          }).then((data) => {
            pageConstants.contentSection.inputTypesForAdd.forEach(
              (inputTypeObj) => {
                if (inputTypeObj.columnName === "Info_Price") {
                  inputTypeObj.data = data.data?.map((dataObj) => {
                    return {
                      value: dataObj?.Price_Id,
                      label: dataObj?.Info_On_Price,
                    };
                  });
                }
              }
            );
          });

          // Wait for all promises to complete
          await Promise.all([partPromise, qtyPromise, pricePromise]);
          setAddTableData([...pageConstants.contentSection.inputTypesForAdd]);
          setLoading(false); // All data fetched, set loading to false
          setIsLoading(false);
        } catch (error) {
          console.error("Error fetching data:", error);
          setLoading(false); // Ensure loading is set to false in case of error
        }
      }
    };

    fetchData();
  }, [selectedOperationalInput?.operationsInputId, selectedOperationalInput?.marketInputId,
  selectedOperationalInput?.refTypeInfo,
  selectedOperationalInput?.refTypePrice]);

  useEffect(() => {
    getOperationalPlanInfoTableData({
      gameId: selectedOperationalInput?.gameId,
      gameBatch: selectedOperationalInput?.gameBatch,
      productionMonth: selectedOperationalInput?.productionMonth,
      marketInputId: selectedOperationalInput?.marketInputId,
      quantityId: currentRowDataFromChild?.Quantity_Info?.value,
      priceId: currentRowDataFromChild?.Info_Price?.value,
      partNo: currentRowDataFromChild?.Description?.value,
      cmdLine: "Get_Unit_Price",
    }).then((data) => {
      if (data && data.lenght > 0) {
        setUpdatedRowData({
          ...currentRowDataFromChild,
          Unit_Price: { value: data[0]?.Unit_Price, label: data[0]?.Unit_Price, inputType: "readonly" }
        });
      } else {
        setUpdatedRowData({
          ...currentRowDataFromChild,
          Unit_Price: { value: 0, label: 0, inputType: "readonly" }
        });
      }
    });
  }, [currentRowDataFromChild?.Info_Price?.value,
  currentRowDataFromChild?.Quantity_Info?.value,
  currentRowDataFromChild?.Description?.value]);

  const onAddBtnClick = () => {
    setIsDisableActionBtns(true);
    setIsDisableSubCanBtns(false);
    setDisableHeaderSection(true);
    setIsEnableTableAdd(false);
    setIsEnableGenericTable(true);
  };

  const onModifyBtnClick = () => {
    setIsDisableActionBtns(true);
    setIsDisableSubCanBtns(false);
    setDisableHeaderSection(true);
    setIsEnableTableEdit(false);
    setIsEnableGenericTable(true);
  };

  const onSubmitBtnClick = () => {
    if (!isEnableTableEdit && isEnableTableAdd) {
      onSubmitApiCall(newTableData, deletedTableData, true);
    }
    if (!isEnableTableAdd && isEnableTableEdit) {
      onSubmitApiCall(newTableData, deletedTableData, false);
    }
    setDisableHeaderSection(false);
    setIsDisableActionBtns(false);
    setIsDisableSubCanBtns(true);
    setIsEnableTableEdit(true);
    setIsEnableTableAdd(true);
    setIsEnableGenericTable(false);
  };

  const onCancelButtonClick = () => {
    setDisableHeaderSection(false);
    setIsDisableActionBtns(false);
    setIsDisableSubCanBtns(true);
    setIsEnableTableEdit(true);
    setIsEnableTableAdd(true);
    setIsEnableGenericTable(false);
    setResetKey((prevKey) => prevKey + 1); // Update resetKey to trigger reset
  };

  const updateData = (updatedTableData) => {
    const newData = updatedTableData.filter((updatedItem, index) => {
      const originalItem = tableData[index];
      return Object.keys(updatedItem).some((key) => {
        if (key !== "deleted") {
          return updatedItem[key] !== originalItem[key];
        }
      });
    });
    const deletedData = updatedTableData.filter((updatedItem, index) => {
      return Object.keys(updatedItem).some((key) => {
        if (key === "deleted") {
          return updatedItem[key] === true;
        }
      });
    });
    setNewTableData(newData);
    setDeletedTableData(deletedData);
  };

  const handleCheckboxChange = (selectedRows) => {
    const newData = selectedRows.map((updatedItem, index) => {
      const transformedItem = {};
      Object.keys(updatedItem).forEach((key) => {
        if (key === "Description") {
          transformedItem["Part"] = updatedItem[key].value;
        } else {
          transformedItem[key] = updatedItem[key].value;
        }
      });
      return transformedItem;
    });
    setNewTableData(newData);
  };

  const onTableFieldUpdate = (currentRowData) => {
    if (
      currentRowData?.Info_Price?.value &&
      currentRowData?.Quantity_Info?.value &&
      currentRowData?.Description?.value &&
      currentRowData?.Info_Price?.value !== "" &&
      currentRowData?.Quantity_Info?.value !== "" &&
      currentRowData?.Description?.value !== ""
    ) {
      setCurrentRowData(currentRowData);
    }
  };

  return (
    <div>
      <Grid margin={5} container spacing={2} justifyContent="center" alignItems="center">
        <Button disabled={isDisableActionBtns} type="button" variant="contained" onClick={onAddBtnClick}>
          {pageConstants.contentSection.addBtnLabel}
        </Button>
        <Button disabled={isDisableActionBtns} color="white" type="button" variant="contained" onClick={onModifyBtnClick}>
          {pageConstants.contentSection.modifyBtnLabel}
        </Button>
        <Button disabled={isDisableSubCanBtns} type="button" variant="contained" onClick={onSubmitBtnClick}>
          {pageConstants.contentSection.saveBtnLabel}
        </Button>
        <Button disabled={isDisableSubCanBtns} color="white" type="button" variant="contained" onClick={onCancelButtonClick}>
          {pageConstants.contentSection.cancelBtnLabel}
        </Button>
      </Grid>
      <div hidden={isEnableGenericTable}>
        <GenericTable
          inputTableHeadings={pageConstants.contentSection.tableHeading}
          inputTableData={tableData}
          ifNoData={null}
          hiddenColumns={pageConstants.contentSection.hiddenTableColumns}
        />
      </div>
      {!loading && (
        <div hidden={isEnableTableAdd}>
          <AddTableCascading
            inputTableHeadings={pageConstants.contentSection.tableHeadingForAdd}
            hiddenColumns={pageConstants.contentSection.hiddenTableColumnsForAdd}
            onCheckboxChange={handleCheckboxChange}
            tableInputTypes={addTableData}
            resetKey={isEnableTableAdd}
            onUpdateRowValues={onTableFieldUpdate}
            updatedRowDataToChild={updatedRowData}  // Pass updated data here
          />
        </div>
      )}
      <div hidden={isEnableTableEdit}>
        <EditableTableData
          key={resetKey} // Add key prop here to trigger reset
          editableTableData={tableData}
          inputTableHeadings={pageConstants.contentSection.tableHeading}
          hiddenColumns={pageConstants.contentSection.hiddenTableColumns}
          tableInputTypes={pageConstants.contentSection.inputTypes}
          onUpdate={updateData}
        />
      </div>
    </div>
  );
}
