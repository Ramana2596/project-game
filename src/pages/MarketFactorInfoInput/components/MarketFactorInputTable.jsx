import Grid from "@mui/material/Grid2";
import Button from "@mui/material/Button";
import GenericTable from "../../../components/GenericTable";
import { useState, useEffect } from "react";
import AddTableData from "../../../components/AddTableData";
import EditableTableData from "../../../components/EditableTableData";
import { useUser } from "../../../core/access/userContext";
import { getMarketFactorInfoTableData } from "../services/marketFactorInputService";
import { pageConstants } from "../constants/pageConstants";
import Alert from "../../../components/Alert";

export default function MarketFactorInputTable({
  tableData,
  isEnableTableActions,
  onSubmitApiCall,
  selectedMarketInput,
  alertData,
}) {
  const [isDisableActionBtns, setIsDisableActionBtns] = useState(
    !isEnableTableActions
  );
  const [isDisableSubCanBtns, setIsDisableSubCanBtns] = useState(
    !isEnableTableActions
  );
  const [isEnableGenericTable, setIsEnableGenericTable] = useState(false);
  const [isEnableTableAdd, setIsEnableTableAdd] = useState(true);
  const [isEnableTableEdit, setIsEnableTableEdit] = useState(true);
  const [checkedRows, setCheckedRows] = useState([]);
  const [newTableData, setNewTableData] = useState([]);
  const [deletedTableData, setDeletedTableData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [addTableData, setAddTableData] = useState([
    { columnName: "Item_Description", inputType: "select" },
    { columnName: "UOM", inputType: null },
    { columnName: "Quantity", inputType: "text" },
    { columnName: "Info_Qty", inputType: "select" },
    { columnName: "Unit_Price", inputType: "text" },
    { columnName: "currency", inputType: null },
    { columnName: "Info_Price", inputType: "select" },
  ]);
  const [isDataFetched, setIsDataFetched] = useState(false);
  const { userInfo } = useUser();

  useEffect(() => {
    setIsDisableActionBtns(!isEnableTableActions);
  }, [isEnableTableActions]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const partPromise = getMarketFactorInfoTableData({
          gameId: userInfo?.gameId,
          gameBatch: userInfo?.gameBatch,
          productionMonth: null,
          marketInputId: selectedMarketInput?.marketInputId,
          partCategory: selectedMarketInput?.partCategory,
          refTypeInfo: null,
          refTypePrice: null,
          cmdLine: "Get_Part",
        }).then((data) => {
          pageConstants.contentSection.inputTypesForAdd.forEach(
            (inputTypeObj) => {
              if (inputTypeObj.columnName === "Item_Description") {
                inputTypeObj.data = data.data?.map((dataObj) => {
                  return { value: dataObj?.Part, label: dataObj?.Description };
                });
              }
            }
          );
        });

        const qtyPromise = getMarketFactorInfoTableData({
          gameId: userInfo?.gameId,
          gameBatch: userInfo?.gameBatch,
          productionMonth: null,
          marketInputId: selectedMarketInput?.marketInputId,
          partCategory: selectedMarketInput?.partCategory,
          refTypeInfo: null,
          refTypePrice: null,
          cmdLine: "Get_Qty_Id",
        }).then((data) => {
          pageConstants.contentSection.inputTypesForAdd.forEach(
            (inputTypeObj) => {
              if (inputTypeObj.columnName === "Info_Qty") {
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

        const pricePromise = getMarketFactorInfoTableData({
          gameId: userInfo?.gameId,
          gameBatch: userInfo?.gameBatch,
          productionMonth: null,
          marketInputId: selectedMarketInput?.marketInputId,
          partCategory: selectedMarketInput?.partCategory,
          refTypeInfo: null,
          refTypePrice: null,
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
        setIsDataFetched(true); // Set fetch data completion state
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false); // Ensure loading is set to false in case of error
        setIsDataFetched(false); // Ensure isDataFetched is false in case of error
      }
    };

    fetchData();
  }, [selectedMarketInput]);

  const onAddBtnClick = () => {
    setIsDisableActionBtns(true);
    setIsDisableSubCanBtns(false);
    setIsEnableTableAdd(false);
    setIsEnableGenericTable(true);
  };

  const onModifyBtnClick = () => {
    setIsDisableActionBtns(true);
    setIsDisableSubCanBtns(false);
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
    setIsDisableActionBtns(false);
    setIsDisableSubCanBtns(true);
    setIsEnableTableEdit(true);
    setIsEnableTableAdd(true);
    setIsEnableGenericTable(false);
  };

  const onCancelButtonClick = () => {
    setIsDisableActionBtns(false);
    setIsDisableSubCanBtns(true);
    setIsEnableTableEdit(true);
    setIsEnableTableAdd(true);
    setIsEnableGenericTable(false);
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
    setCheckedRows(selectedRows);
    const newData = selectedRows.map((updatedItem, index) => {
      const originalItem = tableData[index];
      const transformedItem = {};
      Object.keys(updatedItem).forEach((key) => {
        if (key === "Item_Description") {
          transformedItem["Part"] = updatedItem[key].value || null;
        } else {
          transformedItem[key] = updatedItem[key].value || null;
        }
      });
      return transformedItem;
    });
    setNewTableData(newData);
  };

  return (
    <div>
      <Grid
        margin={5}
        container
        spacing={2}
        justifyContent="center"
        alignItems="center"
      >
        <Button
          disabled={isDisableActionBtns}
          type="button"
          variant="contained"
          onClick={onAddBtnClick}
        >
          {pageConstants.contentSection.addBtnLabel}
        </Button>
        <Button
          disabled={isDisableActionBtns}
          color="white"
          type="button"
          variant="contained"
          onClick={onModifyBtnClick}
        >
          {pageConstants.contentSection.modifyBtnLabel}
        </Button>
        <Button
          disabled={isDisableSubCanBtns}
          type="button"
          variant="contained"
          onClick={onSubmitBtnClick}
        >
          {pageConstants.contentSection.saveBtnLabel}
        </Button>
        <Button
          disabled={isDisableSubCanBtns}
          color="white"
          type="button"
          variant="contained"
          onClick={onCancelButtonClick}
        >
          {pageConstants.contentSection.cancelBtnLabel}
        </Button>
      </Grid>
      <Grid container spacing={2} justifyContent="center" alignItems="center">
        {alertData?.isVisible && (
          <Alert severity={alertData?.severity} message={alertData?.message} />
        )}
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
          <AddTableData
            inputTableHeadings={pageConstants.contentSection.tableHeadingForAdd}
            hiddenColumns={
              pageConstants.contentSection.hiddenTableColumnsForAdd
            }
            onCheckboxChange={handleCheckboxChange}
            tableInputTypes={addTableData}
            resetKey={isEnableTableAdd}
          />
        </div>
      )}
      <div hidden={isEnableTableEdit}>
        <EditableTableData
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
