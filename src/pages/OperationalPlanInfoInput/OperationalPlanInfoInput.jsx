import { Box } from "@mui/material";
import { useEffect, useState } from "react";
import Grid from "@mui/material/Grid2";
import Divider from "@mui/material/Divider";
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
import { useUser } from "../../core/access/userContext.js";
import ToastMessage from "../../components/ToastMessage.jsx";
import { pageConstants } from "./constants/pageConstants.js";
import DatePeriod from "./components/DatePeriod.jsx";
import { useLoading } from "../../hooks/loadingIndicatorContext.js";

export default function OperationalPlanInfoInput() {
  const { setIsLoading } = useLoading();
  const { userInfo } = useUser();

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
    cmdLine: "Get_Plan",
  };

  const [isTableActionsEnable, setIsTableActionsEnable] = useState(false);
  const [isDisableHeaderSection, setIsDisableHeaderSection] = useState(false);
  const [shouldTriggerGetApi, setShouldTriggerApi] = useState(false);
  const [alertData, setAlertData] = useState({
    severity: "",
    message: "",
    isVisible: false,
  });
  const [operationalPlanInfoTableData, setOperationalPlanInfoTableData] =
    useState([]);
  const [getOperationalPlanInfoInput, setFormData] = useState(
    initGetOperationalPlanInfo
  );

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

  useEffect(() => {
    if (isTableActionsEnable) {
      setShouldTriggerApi(false);
    }
  }, [isTableActionsEnable]);

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

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2} justifyContent="center" alignItems="center">
        <h3>{pageConstants.gameBatch}: {userInfo?.gameBatch}</h3>
        <h3>{pageConstants.gameTeam}: {userInfo?.gameTeam}</h3>
      </Grid>
      <Grid sx={{ margin: 5 }} container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
        <OperationalPlanInfoType operationalPlanType={getOperationalPlanInfoInput.operationalPlanId}
          onFormControlUpdate={formControlUpdate}
          isDisabled={isDisableHeaderSection} />
        <DatePeriod selectedGameBatch={getOperationalPlanInfoInput.gameBatch}
          isDisabled={isDisableHeaderSection}
          marketType={getOperationalPlanInfoInput.productionMonth}
          onFormControlUpdate={formControlUpdate} />
      </Grid>
      <Divider />
      <OperationalPlanInputTable tableData={operationalPlanInfoTableData}
        isEnableTableActions={isTableActionsEnable}
        setDisableHeaderSection={updateHeaderSectionState}
        onSubmitApiCall={onSubmitApiCall}
        selectedOperationalInput={getOperationalPlanInfoInput} />
      <ToastMessage open={alertData.isVisible}
        severity={alertData.severity}
        message={alertData.message} />
    </Box>
  );

  function addTableData(updatedData) {
    const promises = [];
    if (updatedData && updatedData.length > 0) {
      const operationalPlanPayLoad = {
        operationalPlanInfoArray: getFramedPayload(updatedData, true),
      };
      promises.push(
        addOperationalPlanInfo(operationalPlanPayLoad)
          .then(() => {
            setAlertData({
              severity: "success",
              message: "Operational factor info added successfully",
              isVisible: true,
            });
          })
          .catch((error) => {
            setAlertData({
              severity: "error",
              message:
                "Error adding operational factor info: " +
                error?.response?.data?.error,
              isVisible: true,
            });
            console.error("Error adding operational factor info:", error);
          })
      );
    }
    return Promise.all(promises);
  }

  function updateTableData(updatedData, deletedTableData) {
    const promises = [];
    if (updatedData && updatedData.length > 0) {
      const operationalPlanPayLoad = {
        operationalPlanInfoArray: getFramedPayload(updatedData, false),
      };
      promises.push(
        updateOperationalPlanInfoInput(operationalPlanPayLoad)
          .then(() => {
            setAlertData({
              severity: "success",
              message: "Operational factor info updated successfully",
              isVisible: true,
            });
          })
          .catch((error) => {
            setAlertData({
              severity: "error",
              message:
                "Error updating operational factor info: " +
                error?.response?.data?.error,
              isVisible: true,
            });
          })
      );
    }
    if (deletedTableData && deletedTableData.length > 0) {
      const operationalInfoInputPayload = {
        operationalPlanInfoArray: getFramedPayload(deletedTableData, false),
      };
      promises.push(
        deleteOperationalPlanInfo(operationalInfoInputPayload)
          .then(() => {
            setAlertData({
              severity: "success",
              message: "Operational factor info deleted successfully",
              isVisible: true,
            });
          })
          .catch((error) => {
            setAlertData({
              severity: "error",
              message:
                "Error deleting operational factor info: " +
                error?.response?.data?.error,
              isVisible: true,
            });
          })
      );
    }
    return Promise.all(promises);
  }
}
