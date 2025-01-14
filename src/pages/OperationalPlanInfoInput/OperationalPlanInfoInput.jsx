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
} from "./services/operationalPlanInfoInputService.js";
import OperationalPlanInfoType from "./components/OperationalPlanInfo";
import OperationalPlanInputTable from "./components/OperationalPlanInputTable";
import { useUser } from "../../core/access/userContext.js";
import ToastMessage from "../../components/ToastMessage.jsx";

export default function OperationalPlanInfoInput() {
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

  const initUpdateOperationalPlanInfo = {
    marketFactorInfoArray: [
      {
        gameId: null,
        gameBatch: null,
        productionMonth: null,
        marketInputId: null,
        partNo: null,
        quantityId: null,
        quantity: null,
        priceId: null,
        currency: null,
        unitPrice: null,
      },
    ],
    cmdLine: "",
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
      getOperationalPlanInfoTableData(getOperationalPlanInfoInput)
        .then((response) => {
          setOperationalPlanInfoTableData(response.data);
          setIsTableActionsEnable(true);
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });
      setShouldTriggerApi(false); // Reset the trigger after API call
    }
  }, [shouldTriggerGetApi]);

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
      getOperationalPlanInfoInput.operationsInputId
    ) {
      setIsTableActionsEnable(true);
    }
  }, [getOperationalPlanInfoInput]);

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

  const getFramedPayload = (updatedData) => {
    if (updatedData && updatedData.length > 0) {
      return updatedData.map((obj) => ({
        gameId: getOperationalPlanInfoInput?.gameId,
        gameBatch: getOperationalPlanInfoInput?.gameBatch,
        productionMonth: getOperationalPlanInfoInput?.productionMonth,
        operationsInputId: getOperationalPlanInfoInput?.operationsInputId,
        partNo: obj.Part,
        quantityId: obj.Qty_Id,
        quantity: obj.Quantity,
        priceId: obj.Price_Id,
        currency: obj.currency,
        unitPrice: obj.Unit_Price,
      }));
    }
    return [];
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2} justifyContent="center" alignItems="center">
        <h1>Operational Plan Input</h1>
      </Grid>
      <Grid container spacing={2} justifyContent="center" alignItems="center">
        <h3>Game Batch: {userInfo?.gameBatch}</h3>
        <h3>Game Team: {userInfo?.gameTeam}</h3>
      </Grid>
      <Grid
        sx={{ margin: 5 }}
        container
        spacing={{ xs: 2, md: 3 }}
        columns={{ xs: 4, sm: 8, md: 12 }}
      >
        <OperationalPlanInfoType
          operationalPlanType={getOperationalPlanInfoInput.operationalPlanId}
          onFormControlUpdate={formControlUpdate}
        />
        <Period
          marketType={getOperationalPlanInfoInput.productionMonth}
          onFormControlUpdate={formControlUpdate}
        />
      </Grid>
      <Divider />
      <OperationalPlanInputTable
        tableData={operationalPlanInfoTableData.apiResponse}
        isEnableTableActions={isTableActionsEnable}
        setDisableHeaderSection={updateHeaderSectionState}
        onSubmitApiCall={onSubmitApiCall}
        selectedOperationalInput={getOperationalPlanInfoInput}
      />
      <ToastMessage
        open={alertData.isVisible}
        severity={alertData.severity}
        message={alertData.message}
      />
    </Box>
  );

  function addTableData(updatedData) {
    const promises = [];
    if (updatedData && updatedData.length > 0) {
      const operationalPlanPayLoad = {
        operationalPlanInfoArray: getFramedPayload(updatedData),
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
        operationalPlanInfoArray: getFramedPayload(updatedData),
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
        operationalPlanInfoArray: getFramedPayload(deletedTableData),
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
