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
import { use } from "react";

export default function OperationalPlanInfoInput() {
  const { userInfo } = useUser();
  const [isTableActionsEnable, setIsTableActionsEnable] = useState(false);
  const [shouldTriggerGetApi, setShouldTriggerApi] = useState(false);
  const [operationalPlanInfoTableData, setOperationalPlanInfoTableData] =
    useState([]);

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

  useEffect(() => {
    if (shouldTriggerGetApi) {
      getOperationalPlanInfoTableData(getOperationalPlanInfoInput).then(
        (response) => {
          setOperationalPlanInfoTableData(response.data);
        }
      );
    }
  }, [shouldTriggerGetApi]);

  const [getOperationalPlanInfoInput, setFormData] = useState(
    initGetOperationalPlanInfo
  );

  useEffect(() => {
    if (
      shouldTriggerGetApi &&
      operationalPlanInfoTableData?.apiResponse &&
      operationalPlanInfoTableData?.apiResponse.length > 0
    ) {
      setIsTableActionsEnable(true);
    }
  }, [shouldTriggerGetApi, operationalPlanInfoTableData]);

  useEffect(() => {
    if (isTableActionsEnable) {
      setShouldTriggerApi(false);
    }
  }, [isTableActionsEnable]);

  useEffect(() => {
    // Check if all required inputs have values and trigger API call
    if (
      getOperationalPlanInfoInput.productionMonth &&
      getOperationalPlanInfoInput.operationsInputId
    ) {
      setShouldTriggerApi(true);
    }
  }, [getOperationalPlanInfoInput]);

  const formControlUpdate = (value) => {
    setShouldTriggerApi(false);
    setFormData({ ...getOperationalPlanInfoInput, ...value });
  };

  const onSubmitApiCall = (updatedData, deletedTableData, isEdit) => {
    if (isTableActionsEnable) {
      if (isEdit) {
        updateTableData(updatedData, deletedTableData);
      } else {
        addTableData(updatedData);
      }
    }
  };

  const getFramedPayload = (updatedData) => {
    if (updatedData && updatedData.length > 0) {
      return updatedData.map((obj) => ({
        gameId: getOperationalPlanInfoInput.gameId,
        gameBatch: getOperationalPlanInfoInput.gameBatch,
        productionMonth: getOperationalPlanInfoInput.productionMonth,
        marketInputId: getOperationalPlanInfoInput.marketInputId,
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
        onSubmitApiCall={onSubmitApiCall}
      />
    </Box>
  );

  function addTableData(updatedData) {
    if (updatedData && updatedData.length > 0) {
      const operationalPlanPayLoad = {
        operationalPlanInfoArray: getFramedPayload(updatedData),
      };
      addOperationalPlanInfo(operationalPlanPayLoad);
    }
  }

  function updateTableData(updatedData, deletedTableData) {
    if (updatedData && updatedData.length > 0) {
      const operationalPlanPayLoad = {
        operationalPlanInfoArray: getFramedPayload(updatedData),
      };
      updateOperationalPlanInfoInput(operationalPlanPayLoad);
    }
    if (deletedTableData && deletedTableData.length > 0) {
      const marketFactorInfoInputPayload = {
        operationalPlanInfoArray: getFramedPayload(deletedTableData),
      };
      deleteOperationalPlanInfo(marketFactorInfoInputPayload);
    }
  }
}
