import { Box } from "@mui/material";
import { useEffect, useState } from "react";
import Grid from "@mui/material/Grid2";
import Divider from "@mui/material/Divider";
import GameBatch from "./components/GameBatch";
import Period from "./components/Period";
import MarketType from "./components/MarketType";
import {
  getMarketFactorInfoTableData,
  updateMarketFactorInfoInput,
  deleteMarketFactorInfo,
  addMarketFactorInfoInput,
} from "./services/marketFactorInputService.js";
import MarketFactorInputTable from "./components/MarketFactorInputTable";
import { useUser } from "../../core/access/userContext.js";
import { pageConstants } from "./constants/pageConstants.js";

export default function MarketFactorInfoInput() {
  const [isTableActionsEnable, setIsTableActionsEnable] = useState(false);
  const [shouldTriggerGetApi, setShouldTriggerApi] = useState(false);
  const { userInfo } = useUser();
  const [alertData, setAlertData] = useState({
    severity: "",
    message: "",
    isVisible: false,
  });

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

  const initUpdateMarketFactorInput = {
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

  const [getMarketFactorInput, setFormData] = useState(
    initGetMarketFactorInput
  );
  const [marketFactorInfoTableData, setMarketFactorInfoResponse] = useState([]);

  useEffect(() => {
    if (shouldTriggerGetApi) {
      getMarketFactorInfoTableData(getMarketFactorInput)
        .then((response) => {
          setMarketFactorInfoResponse(response.data);
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
    // Check if all required inputs have values and trigger API call
    if (
      getMarketFactorInput.gameId &&
      getMarketFactorInput.gameBatch &&
      getMarketFactorInput.productionMonth &&
      getMarketFactorInput.marketInputId
    ) {
      setShouldTriggerApi(true);
    }
  }, [getMarketFactorInput]);

  const formControlUpdate = (value) => {
    setShouldTriggerApi(false);
    setFormData({ ...getMarketFactorInput, ...value });
  };

  const onSubmitApiCall = (updatedData, deletedTableData, isEdit) => {
    setShouldTriggerApi(false);
    if (isTableActionsEnable) {
      if (isEdit) {
        updateTableData(updatedData, deletedTableData).then(() =>
          setShouldTriggerApi(true)
        ); // Trigger API after update
      } else {
        addTableData(updatedData).then(() => setShouldTriggerApi(true)); // Trigger API after addition
      }
    }
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
      <Grid container spacing={2} justifyContent="center" alignItems="center">
        <h1>{pageConstants.pageTitle}</h1>
      </Grid>

      <Grid
        sx={{ margin: 5 }}
        container
        spacing={{ xs: 2, md: 3 }}
        columns={{ xs: 4, sm: 8, md: 12 }}
      >
        <GameBatch
          gameBatch={getMarketFactorInput.gameBatch}
          onFormControlUpdate={formControlUpdate}
        />
        <MarketType
          marketType={getMarketFactorInput.marketInputId}
          onFormControlUpdate={formControlUpdate}
        />
        <Period
          marketType={getMarketFactorInput.productionMonth}
          onFormControlUpdate={formControlUpdate}
        />
      </Grid>
      <Divider />
      <MarketFactorInputTable
        tableData={marketFactorInfoTableData}
        isEnableTableActions={isTableActionsEnable}
        onSubmitApiCall={onSubmitApiCall}
        selectedMarketInput={getMarketFactorInput}
        alertData={alertData}
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
            console.error("Error adding market factor info:", error);
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
            console.error("Error updating market factor info:", error);
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
