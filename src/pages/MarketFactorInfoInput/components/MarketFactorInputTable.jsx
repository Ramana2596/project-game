import Grid from "@mui/material/Grid2";
import Button from "@mui/material/Button";
import GenericTable from "../../../components/GenericTable";
import { useState, useEffect } from "react";
import AddTableData from "../../../components/AddTableData";
import EditableTableData from "../../../components/EditableTableData";
import { getMarketFactorInfoTableData } from "../services/marketFactorInputService";
import { pageConstants } from "../constants/pageConstants";
import { useLoading } from "../../../hooks/loadingIndicatorContext";

export default function MarketFactorInputTable({
  tableData,
  isEnableTableActions,
  onSubmitApiCall,
  selectedMarketInput,
  setDisableHeaderSection,
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
  const [deletedTableData, setDeletedTableData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [addTableData, setAddTableData] = useState([]);
  const [resetKey, setResetKey] = useState(0); // Add resetKey state

  useEffect(() => {
    setIsDisableActionBtns(!isEnableTableActions);
  }, [isEnableTableActions]);

  useEffect(() => {
    const fetchData = async () => {
      if (selectedMarketInput?.gameBatch &&
        selectedMarketInput?.marketInputId &&
        selectedMarketInput?.refTypeInfo &&
        selectedMarketInput?.refTypePrice
      ) {
        try {
          setIsLoading(true);
          setLoading(true);
          const partPromise = getMarketFactorInfoTableData({
            gameId: selectedMarketInput?.gameId,
            gameBatch: selectedMarketInput?.gameBatch,
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
            gameId: selectedMarketInput?.gameId,
            gameBatch: selectedMarketInput?.gameBatch,
            productionMonth: null,
            marketInputId: selectedMarketInput?.marketInputId,
            partCategory: selectedMarketInput?.partCategory,
            refTypeInfo: selectedMarketInput?.refTypeInfo,
            refTypePrice: selectedMarketInput?.refTypePrice,
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
            gameId: selectedMarketInput?.gameId,
            gameBatch: selectedMarketInput?.gameBatch,
            productionMonth: null,
            marketInputId: selectedMarketInput?.marketInputId,
            partCategory: selectedMarketInput?.partCategory,
            refTypeInfo: selectedMarketInput?.refTypeInfo,
            refTypePrice: selectedMarketInput?.refTypePrice,
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
  }, [selectedMarketInput?.refTypeInfo,
  selectedMarketInput?.refTypePrice,
  selectedMarketInput?.marketInputId]);

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
        margin={2}
        container
        spacing={2}
        justifyContent="center"
        alignItems="center"
      >
        <Button
          disabled={isDisableActionBtns}
          type="button"
          sx={{
            height: '45px'
          }}
          className="standard-button-primary-button"
          onClick={onAddBtnClick}
        >
          {pageConstants.contentSection.addBtnLabel}
        </Button>
        <Button
          disabled={isDisableActionBtns}
          type="button"
          sx={{
            height: '45px'
          }}
          className="standard-button-secondary-button"
          onClick={onModifyBtnClick}
        >
          {pageConstants.contentSection.modifyBtnLabel}
        </Button>
        <Button
          disabled={isDisableSubCanBtns}
          type="button"
          sx={{
            height: '45px'
          }}
          className="standard-button-primary-button"
          onClick={onSubmitBtnClick}
        >
          {pageConstants.contentSection.saveBtnLabel}
        </Button>
        <Button
          disabled={isDisableSubCanBtns}
          type="button"
          sx={{
            height: '45px'
          }}
          className="standard-button-secondary-button"
          onClick={onCancelButtonClick}
        >
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
