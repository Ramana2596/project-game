import { Box } from "@mui/material";
import { useEffect, useState } from "react";
import {
  getStrategyMasterData,
  addStrategyMaster,
  updateStrategyMaster,
  deleteStrategyMaster
  // getParamValues,
} from "./services/service.js";
import PageTable from "./components/PageTable.jsx";
import { useUser } from "../../core/access/userContext.js";
import { pageConstants } from "./constants/pageConstants.js";
import ToastMessage from "../../components/ToastMessage.jsx";
import { useLoading } from "../../hooks/loadingIndicatorContext.js";

export default function StrategyMaster() {
  const { setIsLoading } = useLoading();
  const { userInfo } = useUser();
  const [isTableActionsEnable, setIsTableActionsEnable] = useState(false);
  const [shouldTriggerGetApi, setShouldTriggerApi] = useState(false);
  const [alertData, setAlertData] = useState({
    severity: "",
    message: "",
    isVisible: false,
  });
  const [strategyMasterFormData, setFormData] = useState({ gameId: userInfo?.gameId, cmdLine: "Get_Info" });
  const [tableData, setTableData] = useState([]);

  useEffect(() => {
    if (shouldTriggerGetApi) {
      setIsLoading(true);
      getStrategyMasterData(strategyMasterFormData)
        .then((response) => {
          setTableData(response.data);
          setIsTableActionsEnable(true);
            setAlertData({
            severity: "success",
            message:
              "Rows displayed ",
            isVisible: true,
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
      setShouldTriggerApi(false);
      // Reset the trigger after API call
    }
  }, [shouldTriggerGetApi]);

  useEffect(() => {
    if (isTableActionsEnable) {
      setShouldTriggerApi(false);
    }
  }, [isTableActionsEnable]);

  useEffect(() => {
    if (
      strategyMasterFormData.gameId
    ) {
      setShouldTriggerApi(true);
    }
  }, [strategyMasterFormData]);

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

  const getFramedPayload = (updatedData) => {
    if (updatedData && updatedData.length > 0) {
      return updatedData.map((obj) => ({
        gameId: strategyMasterFormData?.gameId,
        strategyId: obj?.Strategy_Id,
        strategy: obj?.Strategy,
        businessEnabler: obj?.Business_Enabler,
        costType: obj.Cost_Type,
        mutualGroup: obj.Exclsuive_Group
      }));
    }
    return [];
  };
  const getFramedPayloadForAdd = (updatedData) => {
    if (updatedData && updatedData.length > 0) {
      return updatedData.map((obj) => ({
        gameId: strategyMasterFormData?.gameId,
        strategyId: obj?.Strategy_Id,
        strategy: obj?.Strategy,
        businessEnabler: obj?.Business_Enabler,
        costType: obj.Cost_Type,
        mutualGroup: obj.Exclsuive_Group
      }));
    }
    return [];
  };
  const getFramedPayloadDelete = (updatedData) => {
    if (updatedData && updatedData.length > 0) {
      return updatedData.map((obj) => ({
        gameId: strategyMasterFormData?.gameId,
        strategyId: obj?.Strategy_Id
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
      <PageTable
        tableData={tableData}
        isEnableTableActions={isTableActionsEnable}
        onSubmitApiCall={onSubmitApiCall}
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
      const strategyMasterPayload = {
        strategyMasterArray: getFramedPayloadForAdd(updatedData),
      };
      promises.push(
        addStrategyMaster(strategyMasterPayload)
          .then(() => {
            setAlertData({
              severity: "success",
              message: "Strategy Master data added successfully",
              isVisible: true,
            });
          })
          .catch((error) => {
            setAlertData({
              severity: "error",
              message:
                "Error adding strategy master data: " +
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
      const strategyMasterPayload = {
        strategyMasterArray: getFramedPayload(updatedData),
      };
      promises.push(
        updateStrategyMaster(strategyMasterPayload)
          .then(() => {
            setAlertData({
              severity: "success",
              message: "Strategy Master data updated successfully",
              isVisible: true,
            });
          })
          .catch((error) => {
            setAlertData({
              severity: "error",
              message:
                "Error updating Strategy Master data: " +
                error?.response?.data?.error,
              isVisible: true,
            });
          })
      );
    }
    if (deletedTableData && deletedTableData.length > 0) {
      const strategyMasterPayload = {
        strategyMasterArray: getFramedPayloadDelete(deletedTableData),
      };
      promises.push(
        deleteStrategyMaster(strategyMasterPayload)
          .then(() => {
            setAlertData({
              severity: "success",
              message: "Strategy Master data deleted successfully",
              isVisible: true,
            });
          })
          .catch((error) => {
            setAlertData({
              severity: "error",
              message:
                "Error deleting Strategy Master data: " +
                error?.response?.data?.error,
              isVisible: true,
            });
          })
      );
    }
    return Promise.all(promises);
  }
}
