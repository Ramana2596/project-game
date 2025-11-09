// ----------- Imports ---------------
import { Box } from "@mui/material";
import { useEffect, useState } from "react";
import Grid from "@mui/material/Grid2";
import Divider from "@mui/material/Divider";
import { useUser } from "../../core/access/userContext.js";
import { useLoading } from "../../hooks/loadingIndicatorContext.js";
import { API_STATUS, API_STATUS_MAP } from "../../utils/statusCodes";
import Period from "./components/Period";
import {
  getOperationalPlanInfoTableData,
  updateOperationalPlanInfoInput,
  deleteOperationalPlanInfo,
  addOperationalPlanInfo,
  getParamValues,
} from "./services/operationalPlanInfoInputService.js";
import OperationalPlanInfoType from "./components/OperationalPlanInfo";
import OperationalPlanInputTable from "./components/OperationalPlanInputTable";
import ToastMessage from "../../components/ToastMessage.jsx";
import DatePeriod from "./components/DatePeriod.jsx";
import { pageConstants } from "./constants/pageConstants.js";

// ---------- Component ----------
export default function OperationalPlanInfoInput() {
  const { setIsLoading } = useLoading();
  const { userInfo } = useUser();

// Initial form state
  const initGetOperationalPlanInfo = {
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

// State
  const [isTableActionsEnable, setIsTableActionsEnable] = useState(false);
  const [isDisableHeaderSection, setIsDisableHeaderSection] = useState(false);
  const [shouldTriggerGetApi, setShouldTriggerApi] = useState(false);
  const [alertData, setAlertData] = useState({
    severity: "",
    message: "",
    isVisible: false,
  });
  const [operationalPlanInfoTableData, setOperationalPlanInfoTableData] = useState([]);
  const [getOperationalPlanInfoInput, setFormData] = useState(initGetOperationalPlanInfo);

// ----------Effects----------
// Fetch table data
  useEffect(() => {
    if (shouldTriggerGetApi) {
      setIsLoading(true);
      getOperationalPlanInfoTableData(getOperationalPlanInfoInput)
        .then((response) => {
          setOperationalPlanInfoTableData(response.data);
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
    if (getOperationalPlanInfoInput.operationsInputId) {
      setIsLoading(true);
      getParamValues(getOperationalPlanInfoInput)
        .then((response) => {
          setFormData({
            ...getOperationalPlanInfoInput,
            refTypeInfo: response.data[0].Ref_Type_Info,
            refTypePrice: response.data[0].Ref_Type_Price,
            marketInputId: response.data[0].Market_input_id,
          });
        })
        .catch((error) => {
          setAlertData({
            severity: "error",
            message:
              "Some Error occurred while fetching data" +
              error?.response?.data?.error,
            isVisible: true,
          });
        })
        .finally(() => setIsLoading(false));
    }
  }, [getOperationalPlanInfoInput.operationsInputId]);

// Disable trigger if table actions enabled
  useEffect(() => {
    if (isTableActionsEnable) {
      setShouldTriggerApi(false);
    }
  }, [isTableActionsEnable]);
  
// Trigger API if all fields set
  useEffect(() => {
    if (
      getOperationalPlanInfoInput.gameId &&
      getOperationalPlanInfoInput.gameBatch &&
      getOperationalPlanInfoInput.productionMonth &&
      getOperationalPlanInfoInput.operationsInputId &&
      getOperationalPlanInfoInput.refTypeInfo &&
      getOperationalPlanInfoInput.refTypePrice
    ) {
      setShouldTriggerApi(true);
    }
  }, [getOperationalPlanInfoInput]);

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

// ----------Helpers----------
  const formControlUpdate = (value) => {
    setShouldTriggerApi(false);
    setFormData({ ...getOperationalPlanInfoInput, ...value });
  };

  const onSubmitApiCall = (updatedData, deletedTableData, isEdit) => {
    setShouldTriggerApi(false);
    if (isTableActionsEnable) {
      if (isEdit) {
        updateTableData(updatedData, deletedTableData).then(() =>
          setShouldTriggerApi(true)
        ); // Trigger API after update;
      } else {
        addTableData(updatedData).then(() => setShouldTriggerApi(true)); // Trigger API after addition;
      }
    }
  };

  const updateHeaderSectionState = (isDisable) => {
    setIsDisableHeaderSection(isDisable);
  };

  const getFramedPayload = (updatedData, isAdd) => {
    if (updatedData && updatedData.length > 0) {
      return updatedData.map((obj) => ({
        gameId: getOperationalPlanInfoInput?.gameId,
        gameBatch: getOperationalPlanInfoInput?.gameBatch,
        gameTeam: getOperationalPlanInfoInput?.gameTeam,
        productionMonth: getOperationalPlanInfoInput?.productionMonth,
        operationsInputId: getOperationalPlanInfoInput?.operationsInputId,
        partNo: obj.Part,
        quantityId: isAdd ? obj.Quantity_Info : obj.Qty_Id,
        quantity: obj.Quantity,
        priceId: isAdd ? obj.Info_Price : obj.Price_Id,
        unitPrice: obj.Unit_Price,
        ...(!isAdd ? { currency: obj.currency } : null)
      }));
    }
    return [];
  };

// ----- Rendering -----
  return (
    <Box sx={{ flexGrow: 1, padding: 2 }}>

{/* Header: Game Batch & Team */}
{/*}
      <Grid container spacing={2}>
        <h3 className="standard-title-color">{pageConstants.gameBatch}: {userInfo?.gameBatch}</h3>
        <h3 className="standard-title-color">{pageConstants.gameTeam}: {userInfo?.gameTeam}</h3>
      </Grid>
*/}
      <Grid container spacing={2} alignItems="center" sx={{ marginBottom: 1 }} >
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

      <Grid sx={{ marginBottom: 0}} container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
        <OperationalPlanInfoType operationalPlanType={getOperationalPlanInfoInput.operationalPlanId}
          onFormControlUpdate={formControlUpdate}
          isDisabled={isDisableHeaderSection} />
        <DatePeriod selectedGameBatch={getOperationalPlanInfoInput.gameBatch}
          isDisabled={isDisableHeaderSection}
          marketType={getOperationalPlanInfoInput.productionMonth}
          onFormControlUpdate={formControlUpdate} />
      </Grid>

{/*
      <Divider />
*/}
      <Divider sx={{ my: 1 }} />

{/* Table Section */}
{/*}
      <OperationalPlanInputTable tableData={operationalPlanInfoTableData}
        isEnableTableActions={isTableActionsEnable}
        setDisableHeaderSection={updateHeaderSectionState}
        onSubmitApiCall={onSubmitApiCall}
        selectedOperationalInput={getOperationalPlanInfoInput} />
*/}
      <Box sx={{ flexGrow: 1, overflowY: 'auto' }}>
        <OperationalPlanInputTable 
          tableData={operationalPlanInfoTableData}
          isEnableTableActions={isTableActionsEnable}
          setDisableHeaderSection={updateHeaderSectionState}
          onSubmitApiCall={onSubmitApiCall}
          selectedOperationalInput={getOperationalPlanInfoInput} />
      </Box>

{/* Toast Notifications */}
      <ToastMessage open={alertData.isVisible}
        severity={alertData.severity}
        message={alertData.message} />
    </Box>
  );

// ---------- Table API: Add / Update / Delete ----------

// Add new table data
  function addTableData(updatedData) {
    const promises = [];
    if (updatedData && updatedData.length > 0) {
      const operationalPlanPayLoad = {
        operationalPlanInfoArray: getFramedPayload(updatedData, true),
        cmdLine: "Add",
      };
      promises.push(
        addOperationalPlanInfo(operationalPlanPayLoad)
          .then((res) => {
            const { returnValue, message } = res.data;
            const { severity, defaultMsg } =
              API_STATUS_MAP[returnValue] || API_STATUS_MAP[API_STATUS.SYSTEM_ERROR];

            setAlertData({
              severity,
              message: message || defaultMsg,
              isVisible: true,
            });
          })
          .catch((error) => {
            setAlertData({
              severity: "error",
              message:
                "Error: Input Not Added !" +
                error?.response?.data?.error,
              isVisible: true,
            });
            console.error("Error: Input Not Added !", error);
          })
      );
    }
    return Promise.all(promises);
  }

// Update or delete existing table data
  function updateTableData(updatedData, deletedTableData) {
    const promises = [];
    if (updatedData && updatedData.length > 0) {
      const operationalPlanPayLoad = {
        operationalPlanInfoArray: getFramedPayload(updatedData, false),
      };
      promises.push(
        updateOperationalPlanInfoInput(operationalPlanPayLoad)
        .then((res) => {
          const { returnValue, message } = res.data;
          const { severity, defaultMsg } =
            API_STATUS_MAP[returnValue] || API_STATUS_MAP[API_STATUS.SYSTEM_ERROR];

          setAlertData({
            severity,
            message: message || defaultMsg,
            isVisible: true,
          });
        })
        .catch((error) => {
          setAlertData({
            severity: "error",
            message:
              "Error: Not Updated !" +
              error?.response?.data?.error,
            isVisible: true,
          });
        })
      );
      if (deletedTableData && deletedTableData.length > 0) {
        const operationalInfoInputPayload = {
          operationalPlanInfoArray: getFramedPayload(deletedTableData, false),
        };
        promises.push(
          deleteOperationalPlanInfo(operationalInfoInputPayload)
          .then((res) => {
            const { returnValue, message } = res.data;
            const { severity, defaultMsg } =
              API_STATUS_MAP[returnValue] || API_STATUS_MAP[API_STATUS.SYSTEM_ERROR];

            setAlertData({
              severity,
              message: message || defaultMsg,
              isVisible: true,
            });
          })
            .catch((error) => {
              setAlertData({
                severity: "error",
                message:
                  "Error: Not Deleted ! " +
                  error?.response?.data?.error,
                isVisible: true,
              });
            })
        );
      } 
      return Promise.all(promises);
    }
  }
}