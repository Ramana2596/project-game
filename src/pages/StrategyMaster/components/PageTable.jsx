import Grid from "@mui/material/Grid2";
import Button from "@mui/material/Button";
import GenericTable from "../../../components/GenericTable";
import { useState, useEffect } from "react";
import AddTableData from "../../../components/AddTableData";
import EditableTableData from "../../../components/EditableTableData";
import { getStrategyMasterData } from "../services/service";
import { pageConstants } from "../constants/pageConstants";
import { useLoading } from "../../../hooks/loadingIndicatorContext";
import { useUser } from "../../../core/access/userContext";

export default function PageTable({
  tableData,
  isEnableTableActions,
  onSubmitApiCall
}) {
  const { userInfo } = useUser();
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
      try {
        setIsLoading(true);
        setLoading(true);
        const enablerTypePRomise = getStrategyMasterData({
          gameId: userInfo?.gameId,
          cmdLine: "Get_Enabler",
        }).then((data) => {
          pageConstants.contentSection.inputTypesForAdd.forEach(
            (inputTypeObj) => {
              if (inputTypeObj.columnName === "Business_Enabler") {
                inputTypeObj.data = data.data?.map((dataObj) => {
                  return { value: dataObj?.Business_Enabler, label: dataObj?.Description };
                });
              }
            }
          );
        });

        const costTypePromise = getStrategyMasterData({
          gameId: userInfo?.gameId,
          cmdLine: "Get_Cost_Type",
        }).then((data) => {
          pageConstants.contentSection.inputTypesForAdd.forEach(
            (inputTypeObj) => {
              if (inputTypeObj.columnName === "Cost_Type") {
                inputTypeObj.data = data.data?.map((dataObj) => {
                  return {
                    value: dataObj?.Cost_Type,
                    label: dataObj?.Info_On_Qty,
                  };
                });
              }
            }
          );
        });

        // Wait for all promises to complete
        await Promise.all([enablerTypePRomise, costTypePromise]);

        setAddTableData([...pageConstants.contentSection.inputTypesForAdd]);
        setLoading(false); // All data fetched, set loading to false
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false); // Ensure loading is set to false in case of error
      }
    };

    fetchData();
  }, []);

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
        transformedItem[key] = updatedItem[key].value || null;
      });
      return transformedItem;
    });
    setNewTableData(newData);
  };

  return (
    <div>
      <Grid margin={2} container spacing={2} justifyContent="center" alignItems="center" >
        <Button className="standard-button-primary-button" disabled={isDisableActionBtns} type="button" onClick={onAddBtnClick}>
          {pageConstants.contentSection.addBtnLabel}
        </Button>
        <Button className="standard-button-secondary-button" disabled={isDisableActionBtns} color="white" type="button" onClick={onModifyBtnClick}>
          {pageConstants.contentSection.modifyBtnLabel}
        </Button>
        <Button className="standard-button-primary-button" disabled={isDisableSubCanBtns} type="button" onClick={onSubmitBtnClick}>
          {pageConstants.contentSection.saveBtnLabel}
        </Button>
        <Button className="standard-button-secondary-button" disabled={isDisableSubCanBtns} type="button" onClick={onCancelButtonClick}>
          {pageConstants.contentSection.cancelBtnLabel}
        </Button>
      </Grid>
      <div hidden={isEnableGenericTable}>
        <GenericTable inputTableHeadings={pageConstants.contentSection.tableHeading}
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
