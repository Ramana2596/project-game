// ----------- Imports ---------------
// MUI components
import { Box } from "@mui/material";
import { useEffect, useState } from "react";
import Grid from "@mui/material/Grid2";
import Divider from "@mui/material/Divider";
// App context & hooks
import { useUser } from "../../core/access/userContext.jsx";
import { useLoading } from "../../hooks/loadingIndicatorContext.jsx";
// API Status Maps
import { API_STATUS, API_STATUS_MAP } from "../../utils/statusCodes.js";
// API services
import {
  getOpsPlanId,
  addOpsPlanInput,
  updateOpsPlanInput,
  deleteOpsPlanInput,
  getParamValues,
} from "./services/service.js";
// Child components
import OpsPlanOption from "./components/OpsPlanOption.jsx";
import OpsPlanInputTable from "./components/OpsPlanInputTable.jsx";
import ToastMessage from "../../components/ToastMessage.jsx";
import DatePeriod from "./components/DatePeriod.jsx";
//UI constants
import { pageConstants } from "./constants/pageConstants.js";

// ---------- Component ----------
export default function OpsPlanInput() {
  const { setIsLoading } = useLoading();
  const { userInfo } = useUser();

  // Initial form state
  const initOpsPlanInput = {
    gameId: userInfo?.gameId,
    gameBatch: userInfo?.gameBatch,
    gameTeam: userInfo?.gameTeam,
    productionMonth: null,
    operationsInputId: null,
    partCategory: null,
    refTypeInfo: null,
    refTypePrice: null,
    marketInputId: null,
    cmdLine: "Get_Info",
  };

  // ---------- State ----------
  const [isTableActionsEnable, setIsTableActionsEnable] = useState(false);
  const [isDisableHeaderSection, setIsDisableHeaderSection] = useState(false);
  const [shouldTriggerGetApi, setShouldTriggerApi] = useState(false);
  const [alertData, setAlertData] = useState({
    severity: "",
    message: "",
    isVisible: false,
  });

  const [opsPlanInput, setOpsPlanInput] = useState(initOpsPlanInput); // current input/form data
  const [opsPlanData, setOpsPlanData] = useState([]); // table display data

  // ---------- Effects ----------
  // Fetch table data
  useEffect(() => {
    if (shouldTriggerGetApi) {
      setIsLoading(true);
      getOpsPlanId(opsPlanInput)
        .then((response) => {
          setOpsPlanData(response.data);
          setIsTableActionsEnable(true);
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        })
        .finally(() => setIsLoading(false));
      setShouldTriggerApi(false); // Reset the trigger after API call
    }
  }, [shouldTriggerGetApi]);

  // Fetch param values
  useEffect(() => {
    if (opsPlanInput.operationsInputId) {
      setIsLoading(true);
      getParamValues(opsPlanInput)
        .then((response) => {
          setOpsPlanInput({
            ...opsPlanInput,
            refTypeInfo: response.data[0].Ref_Type_Info,
            refTypePrice: response.data[0].Ref_Type_Price,
            marketInputId: response.data[0].Market_input_id,
          });
        })
        .catch((error) => {
          setAlertData({
            severity: "error",
            message:
              "Error:In fetching Input Ref. data" +
              error?.response?.data?.error,
            isVisible: true,
          });
        })
        .finally(() => setIsLoading(false));
    }
  }, [opsPlanInput.operationsInputId]);

  // Disable trigger if table actions enabled
  useEffect(() => {
    if (isTableActionsEnable) {
      setShouldTriggerApi(false);
    }
  }, [isTableActionsEnable]);

  // Trigger API if all fields set
  useEffect(() => {
    if (
      opsPlanInput.gameId &&
      opsPlanInput.gameBatch &&
      opsPlanInput.productionMonth &&
      opsPlanInput.operationsInputId &&
      opsPlanInput.refTypeInfo &&
      opsPlanInput.refTypePrice
    ) {
      setShouldTriggerApi(true);
    }
  }, [opsPlanInput]);

  // Auto-hide toast messages
  useEffect(() => {
    if (alertData.isVisible) {
      const timer = setTimeout(() => {
        setAlertData((prevData) => ({
          ...prevData,
          isVisible: false,
        }));
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [alertData.isVisible]);

  // ---------- Helpers ----------
  const formControlUpdate = (value) => {
    setShouldTriggerApi(false);
    setOpsPlanInput({ ...opsPlanInput, ...value });
  };

  const onSubmitApiCall = (updatedData, deletedTableData, isEdit) => {
    setShouldTriggerApi(false);

    if (isTableActionsEnable) {
      if (isEdit) {
  // SAVE modifies or deletes rows      
        updateTableData(updatedData, deletedTableData).then(() =>
          setShouldTriggerApi(true)
        ); // Trigger API after update
      } else {
  // SAVE adds rows      
        addTableData(updatedData).then(() => setShouldTriggerApi(true)); // Trigger API after addition
      }
    }
  };

  // Disable/Enable header when table editing begins or ends
  const updateHeaderSectionState = (isDisable) => {
    setIsDisableHeaderSection(isDisable);
  };
/**
   * Prepare each table row into backend payload structure
   * isAdd = true  → uses Quantity_Info and Info_Price
   * isAdd = false → uses existing Qty_Id and Price_Id
   */
  const getFramedPayload = (updatedData, isAdd) => {
    if (updatedData && updatedData.length > 0) {
      return updatedData.map((obj) => ({
        gameId: opsPlanInput?.gameId,
        gameBatch: opsPlanInput?.gameBatch,
        gameTeam: opsPlanInput?.gameTeam,
        productionMonth: opsPlanInput?.productionMonth,
        operationsInputId: opsPlanInput?.operationsInputId,
        partNo: obj.Part,
        quantityId: isAdd ? obj.Quantity_Info : obj.Qty_Id,
        quantity: obj.Quantity,
        priceId: isAdd ? obj.Info_Price : obj.Price_Id,
        unitPrice: obj.Unit_Price,
        ...(!isAdd && { currency: obj.currency }),
      }));
    }
    return [];
  };

  // ---------- Render ----------
  return (
    <Box sx={{ flexGrow: 1, padding: 2 }}>
      {/* Header: Game Batch & Team */}
      <Grid container spacing={2} alignItems="center" sx={{ marginBottom: 1 }}>
        <Grid item>
          <h3 className="standard-title-color" style={{ margin: 0 }}>
            {pageConstants.gameBatch}: {userInfo?.gameBatch}
          </h3>
        </Grid>
        <Grid item>
          <h3 className="standard-title-color" style={{ margin: 0 }}>
            {pageConstants.gameTeam}: {userInfo?.gameTeam}
          </h3>
        </Grid>
      </Grid>

      {/* Form Section */}
      <Grid
        sx={{ marginBottom: 0 }}
        container
        spacing={{ xs: 2, md: 3 }}
        columns={{ xs: 4, sm: 8, md: 12 }}
      >
        <OpsPlanOption
          operationalPlanType={opsPlanInput.operationsInputId}
          onFormControlUpdate={formControlUpdate}
          isDisabled={isDisableHeaderSection}
        />
        <DatePeriod
          selectedGameBatch={opsPlanInput.gameBatch}
          isDisabled={isDisableHeaderSection}
          marketType={opsPlanInput.productionMonth}
          onFormControlUpdate={formControlUpdate}
        />
      </Grid>

      <Divider sx={{ my: 1 }} />

      {/* Table Section */}
      <Box sx={{ flexGrow: 1, overflowY: "auto" }}>
        <OpsPlanInputTable
          tableData={opsPlanData}
          isEnableTableActions={isTableActionsEnable}
          setDisableHeaderSection={updateHeaderSectionState}
          onSubmitApiCall={onSubmitApiCall}
          selectedOpsInput={opsPlanInput}
        />
      </Box>

      {/* Toast Notifications */}
      <ToastMessage
        open={alertData.isVisible}
        severity={alertData.severity}
        message={alertData.message}
      />
    </Box>
  );

// ---------- Table API: Add / Update / Delete ----------

// ---------- Helper for showing summary ----------
  function showOpsInputSummary(responses, actionLabel) {
    const results = responses.map(res => res.data);
    const total = results.length;
    const successCount = results.filter(r => r.returnValue === 0).length;
    const overallSuccess = successCount === total;
    const { severity } =
      API_STATUS_MAP[overallSuccess ? API_STATUS.SUCCESS : API_STATUS.BUSINESS_ERROR];
    const message = `${successCount} of ${total} ${actionLabel}`;

    setAlertData({
      severity,
      message,
      isVisible: true,
    });
  }

  // Add new table data
  function addTableData(updatedData) {
    if (!updatedData?.length) return Promise.resolve();

    const payloadArray = getFramedPayload(updatedData, true);
  // Each row triggers its own add API call
    const promises = payloadArray.map((payload) => addOpsPlanInput({ opsPlanInfoArray: [payload] }));

    return Promise.all(promises)
      .then((responses) => {
        showOpsInputSummary(responses, "Added");
      })
      .catch((error) => {
        setAlertData({
          severity: "error",
          message: "Error: Input Not Added! " + (error?.response?.data?.error || ""),
          isVisible: true,
        });
        console.error("Error: Input Not Added!", error);
      });
  }

  // UPDATE + DELETE operations
  function updateTableData(updatedData, deletedTableData) {
    const promises = [];
  
    // Handle modified rows
    if (updatedData?.length > 0) {
      const payloadArray = getFramedPayload(updatedData, false);
      const updatePromises = payloadArray.map((payload) =>
        updateOpsPlanInput({ opsPlanInfoArray: [payload] })
      );
      promises.push(...updatePromises);
    }
  
    // Handle deleted rows
    if (deletedTableData?.length > 0) {
      const payloadArray = getFramedPayload(deletedTableData, false);
      const deletePromises = payloadArray.map((payload) =>
        deleteOpsPlanInput({ opsPlanInfoArray: [payload] })
      );
      promises.push(...deletePromises);
    }
  return Promise.all(promises)
      .then((responses) => {
        const hasDelete = deletedTableData?.length > 0;
        const hasUpdate = updatedData?.length > 0;
        const actionLabel = hasDelete && !hasUpdate
          ? "Deleted"
          : hasUpdate && !hasDelete
          ? "Modified"
          : "Processed";
        showOpsInputSummary(responses, actionLabel);
      })
      .catch((error) => {
        setAlertData({
          severity: "error",
          message: "Error: Operation Failed! " + (error?.response?.data?.error || ""),
          isVisible: true,
        });
        console.error("Error in Update/Delete:", error);
      });
  }
}
