import { Box } from "@mui/material";
import { useEffect, useState } from "react";
import Grid from "@mui/material/Grid2";
import Divider from "@mui/material/Divider";
import GameBatch from "./components/GameBatch";
import DatePeriod from "./components/DatePeriod.jsx";
import MarketType from "./components/MarketType";
import {
  getMarketFactorInfoTableData,
  updateMarketFactorInfoInput,
  deleteMarketFactorInfo,
  addMarketFactorInfoInput,
  getParamValues,
} from "./services/marketFactorInputService.js";
import MarketFactorInputTable from "./components/MarketFactorInputTable";
import { useUser } from "../../core/access/userContext.js";
import ToastMessage from "../../components/ToastMessage.jsx";
import { useLoading } from "../../hooks/loadingIndicatorContext.js";

export default function MarketFactorInfoInput() {
  const { setIsLoading } = useLoading();
  const { userInfo } = useUser();
  const initGetMarketFactorInput = {
    gameId: userInfo?.gameId,
    gameBatch: "",
    productionMonth: "",
    marketInputId: "",
    partCategory: null,
    refTypeInfo: null,
    refTypePrice: null,
    cmdLine: "Get_Info",
  };

  const [isTableActionsEnable, setIsTableActionsEnable] = useState(false);
  const [isDisableHeaderSection, setIsDisableHeaderSection] = useState(false);
  const [shouldTriggerGetApi, setShouldTriggerApi] = useState(false);
  const [alertData, setAlertData] = useState({
    severity: "",
    message: "",
    isVisible: false,
  });
  const [getMarketFactorInput, setFormData] = useState(
    initGetMarketFactorInput
  );
  const [marketFactorInfoTableData, setMarketFactorInfoResponse] = useState([]);

  useEffect(() => {
    if (shouldTriggerGetApi) {
      setIsLoading(true);
      getMarketFactorInfoTableData(getMarketFactorInput)
        .then((response) => {
          setMarketFactorInfoResponse(response.data);
          setIsTableActionsEnable(true);
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
      setShouldTriggerApi(false);
      // Reset the trigger after API call
    }
  }, [shouldTriggerGetApi]);

  useEffect(() => {
    if (getMarketFactorInput.marketInputId) {
      setIsLoading(true);
      getParamValues(getMarketFactorInput)
        .then((response) => {
          setFormData({
            ...getMarketFactorInput,
            refTypeInfo: response.data[0].Ref_Type_Info,
            refTypePrice: response.data[0].Ref_Type_Price,
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
  }, [getMarketFactorInput.marketInputId]);

  useEffect(() => {
    if (isTableActionsEnable) {
      setShouldTriggerApi(false);
    }
  }, [isTableActionsEnable]);

  useEffect(() => {
    if (
      getMarketFactorInput.gameId &&
      getMarketFactorInput.gameBatch &&
      getMarketFactorInput.productionMonth &&
      getMarketFactorInput.marketInputId &&
      getMarketFactorInput.refTypeInfo &&
      getMarketFactorInput.refTypePrice
    ) {
      setShouldTriggerApi(true);
    }
  }, [getMarketFactorInput]);

  const formControlUpdate = (value) => {
    setShouldTriggerApi(false);
    setFormData({
      ...getMarketFactorInput,
      ...value,
    });
  };
  const onSubmitApiCall = (updatedData, deletedTableData, isEdit) => {
    setShouldTriggerApi(false);
    if (isTableActionsEnable) {
      if (isEdit) {
        updateTableData(updatedData, deletedTableData).then(() =>
          setShouldTriggerApi(true)
        );
        // Trigger API after update
      } else {
        addTableData(updatedData).then(() => setShouldTriggerApi(true));
        // Trigger API after addition
      }
    }
  };
  const updateHeaderSectionState = (isDisable) => {
    setIsDisableHeaderSection(isDisable);
  };
  const getFramedPayload = (updatedData) => {
    if (updatedData && updatedData.length > 0) {
      return updatedData.map((obj) => ({
        gameId: getMarketFactorInput?.gameId,
        gameBatch: getMarketFactorInput?.gameBatch,
        productionMonth: getMarketFactorInput?.productionMonth,
        marketInputId: getMarketFactorInput?.marketInputId,
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
  const getFramedPayloadForAdd = (updatedData) => {
    if (updatedData && updatedData.length > 0) {
      return updatedData.map((obj) => ({
        gameId: getMarketFactorInput?.gameId,
        gameBatch: getMarketFactorInput?.gameBatch,
        productionMonth: getMarketFactorInput?.productionMonth,
        marketInputId: getMarketFactorInput?.marketInputId,
        partNo: obj.Part,
        quantityId: obj.Info_Qty,
        quantity: obj.Quantity,
        priceId: obj.Info_Price,
        unitPrice: obj.Unit_Price,
        currency: 'USD'
      }));
    }
    return [];
  };
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

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid
        sx={{ margin: 2 }}
        container
        spacing={{ xs: 2, md: 3 }}
        columns={{ xs: 4, sm: 8, md: 12 }}
      >
        <GameBatch
          isDisabled={isDisableHeaderSection}
          gameBatch={getMarketFactorInput.gameBatch}
          onFormControlUpdate={formControlUpdate}
        />
        <MarketType
          isDisabled={isDisableHeaderSection}
          marketType={getMarketFactorInput.marketInputId}
          onFormControlUpdate={formControlUpdate}
        />
        <DatePeriod
          selectedGameBatch={getMarketFactorInput.gameBatch}
          isDisabled={isDisableHeaderSection}
          marketType={getMarketFactorInput.productionMonth}
          onFormControlUpdate={formControlUpdate}
        />
      </Grid>
      <Divider />
      <MarketFactorInputTable
        tableData={marketFactorInfoTableData}
        isEnableTableActions={isTableActionsEnable}
        onSubmitApiCall={onSubmitApiCall}
        setDisableHeaderSection={updateHeaderSectionState}
        selectedMarketInput={getMarketFactorInput}
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
      const mktFactorInforPayLoad = {
        marketFactorInfoArray: getFramedPayloadForAdd(updatedData),
      };
      promises.push(
        addMarketFactorInfoInput(mktFactorInforPayLoad)
          .then(() => {
            setAlertData({
              severity: "success",
              message: "Market factor info added successfully",
              isVisible: true,
            });
          })
          .catch((error) => {
            setAlertData({
              severity: "error",
              message:
                "Error adding market factor info: " +
                error?.response?.data?.error,
              isVisible: true,
            });
          })
      );
    }
    return Promise.all(promises);
  }

  function updateTableData(updatedData, deletedTableData) {
    const promises = [];
    if (updatedData && updatedData.length > 0) {
      const mktFactorInforPayLoad = {
        marketFactorInfoArray: getFramedPayload(updatedData),
      };
      promises.push(
        updateMarketFactorInfoInput(mktFactorInforPayLoad)
          .then(() => {
            setAlertData({
              severity: "success",
              message: "Market factor info updated successfully",
              isVisible: true,
            });
          })
          .catch((error) => {
            setAlertData({
              severity: "error",
              message:
                "Error updating market factor info: " +
                error?.response?.data?.error,
              isVisible: true,
            });
          })
      );
    }
    if (deletedTableData && deletedTableData.length > 0) {
      const marketFactorInfoInputPayload = {
        marketFactorInfoArray: getFramedPayload(deletedTableData),
      };
      promises.push(
        deleteMarketFactorInfo(marketFactorInfoInputPayload)
          .then(() => {
            setAlertData({
              severity: "success",
              message: "Market factor info deleted successfully",
              isVisible: true,
            });
          })
          .catch((error) => {
            setAlertData({
              severity: "error",
              message:
                "Error deleting market factor info: " +
                error?.response?.data?.error,
              isVisible: true,
            });
            console.error("Error deleting market factor info:", error);
          })
      );
    }
    return Promise.all(promises);
  }
}
