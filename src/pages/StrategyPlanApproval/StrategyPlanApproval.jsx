import { Box } from "@mui/material";
import Grid from "@mui/material/Grid2";
import { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import EditableTable from "../../components/EditableTable.jsx";
import { useUser } from "../../core/access/userContext.js";
import { pageConstants } from "./constants/pageConstants.js";
import {
  getStrategyPlan,
  updateStrategyPlan,
} from "./services/strategyPlanApprovalService.js";
import { useLoading } from "../../hooks/loadingIndicatorContext.js";
import ToastMessage from "../../components/ToastMessage.jsx";
import NotificationMessage from "../../components/NotificationMessage.jsx";

export default function StrategyPlanApproval() {
  const { setIsLoading } = useLoading();
  const [shouldUpdateStrategyPlan, setShouldUpdateStrategyPlan] =
    useState(false);
  const [strategyPlanRequestBody, setStrategyPlanRequestBody] = useState(null);
  const [checkboxStates, setCheckboxStates] = useState({});
  let [editableTableData, setEditableTableData] = useState([]);
  const { userInfo } = useUser();
  const [gameIdData, setGameIdData] = useState(null);
  const [alertData, setAlertData] = useState({
    severity: "",
    message: "",
    isVisible: false,
  });

  useEffect(() => {
    setIsLoading(true);
    getStrategyPlan({
      type: "getStrategyPlan",
      gameId: userInfo?.gameId,
      gameBatch: userInfo?.gameBatch,
      gameTeam: userInfo?.gameTeam,
    }).then((response) => {
      if (response) {
        setGameIdData(response.data);
      }
    })
      .finally(() => setIsLoading(false));
  }, []);

  useEffect(() => {
    if (gameIdData) {
      setEditableTableData(
        gameIdData?.map((strategyPlanApprObj) => ({
          ...strategyPlanApprObj,
          Decision:
            strategyPlanApprObj.Decision &&
              strategyPlanApprObj.Decision === "Yes"
              ? true
              : false,
        }))
      );
    }
  }, [gameIdData]);

  useEffect(() => {
    if (shouldUpdateStrategyPlan) {
      setIsLoading(true);
      updateStrategyPlan(strategyPlanRequestBody).then((response) => {
        setAlertData({
          severity: "success",
          message: "Strategy Plan Approval updated successfully",
          isVisible: true,
        });
      })
        .finally(() => setIsLoading(false));
    }
  }, [shouldUpdateStrategyPlan]);

  const strategFormUpdate = () => {
    setStrategyPlanRequestBody(
      editableTableData?.map((strategyPlanApprObj) => ({
        gameId: userInfo?.gameId,
        gameBatch: userInfo?.gameBatch,
        gameTeam: userInfo?.gameTeam,
        strategySetNo: strategyPlanApprObj.Strategy_Set_No,
        strategyId: strategyPlanApprObj.Strategy_Id,
        playerDecision: strategyPlanApprObj.Decision ? "Yes" : "No",
        decidedBy: "player",
      }))
    );
    setShouldUpdateStrategyPlan(true);
  };

  const strategyFormSubmit = (event) => {
    event.preventDefault();
    strategFormUpdate();
  };

  const handleCheckboxChange = (id, checked) => {
    setShouldUpdateStrategyPlan(false);
    setCheckboxStates((prevState) => ({ ...prevState, [id]: checked }));
    editableTableData.forEach((tableObj) =>
      tableObj.Strategy_Id === id ? (tableObj.Decision = checked) : null
    );
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <form onSubmit={strategyFormSubmit}>
        <Grid container margin={2} spacing={2}>
          <h3 className="standard-title-color">{pageConstants.gameBatch}: {userInfo?.gameBatch}</h3>
          <h3 className="standard-title-color">{pageConstants.gameTeam}: {userInfo?.gameTeam}</h3>
          <Grid item xs={12} container justifyContent="flex-end">
            <Button
              disabled={editableTableData.length === 0}
              type="submit"
              className="standard-button-primary-button"
              onClick={strategyFormSubmit}
              sx={{
                width: '100px',
                height: '50px'
              }}
            >
              {pageConstants.submitBtn}
            </Button>
          </Grid>
        </Grid>
      </form>

      <Grid spacing={2}>
        {editableTableData.length > 0 ? (
          <EditableTable editableTableData={editableTableData} onCheckboxChange={handleCheckboxChange} hiddenColumns={pageConstants.table.hiddenColumns} />
        ) : (
          <NotificationMessage message={pageConstants.noDataAvailable} />
        )}
      </Grid>

      <ToastMessage
        open={alertData.isVisible}
        severity={alertData.severity}
        message={alertData.message}
      />
    </Box>

  );
}
