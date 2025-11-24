// Importing necessary UI components and hooks from MUI and custom modules
import { Box } from "@mui/material";
import Grid from "@mui/material/Grid2";
import { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import EditableTable from "../../components/EditableTable.jsx";
import { useUser } from "../../core/access/userContext.jsx";
import { pageConstants } from "./constants/pageConstants.js";
import {
  getStrategyPlan,
  updateStrategyPlan,
} from "./services/strategyPlanApprovalService.js";
import { useLoading } from "../../hooks/loadingIndicatorContext.jsx";
import ToastMessage from "../../components/ToastMessage.jsx";
import NotificationMessage from "../../components/NotificationMessage.jsx";

// Main component for rendering & managing UI Strategy Plan Approval
export default function StrategyPlanApproval() {
  const { setIsLoading } = useLoading();
  // State to trigger strategy plan update API call
  const [shouldUpdateStrategyPlan, setShouldUpdateStrategyPlan] = useState(false);
  // Holds the request body for strategy plan update
  const [strategyPlanRequestBody, setStrategyPlanRequestBody] = useState(null);
  // Tracks checkbox states for each strategy item  
  const [checkboxStates, setCheckboxStates] = useState({});
  // Holds editable table data derived from fetched strategy plan  
  let [editableTableData, setEditableTableData] = useState([]);
  // Accessing current user context (gameId, batch, team)
  const { userInfo } = useUser();
  // Stores raw strategy plan data fetched from backend
  const [gameIdData, setGameIdData] = useState(null);
  const [alertData, setAlertData] = useState({
    severity: "",
    message: "",
    isVisible: false,
  });

  // Fetch strategy plan data on initial render using user context
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

  // Transform raw strategy plan data into editable format for table
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

  // Trigger strategy plan update when flag is set
  useEffect(() => {
    if (shouldUpdateStrategyPlan) {
      setIsLoading(true);
      updateStrategyPlan(strategyPlanRequestBody).then((response) => {
        setAlertData({
          severity: "success",
          message: "Strategy Plan Decision completed successfully",
          isVisible: true,
        });
      })
        .finally(() => setIsLoading(false));
    }
  }, [shouldUpdateStrategyPlan]);

  // Prepare request body for strategy plan update based on current table state
  const strategFormUpdate = () => {
    setStrategyPlanRequestBody(
      editableTableData?.map((strategyPlanApprObj) => ({
        gameId: userInfo?.gameId,
        gameBatch: userInfo?.gameBatch,
        gameTeam: userInfo?.gameTeam,
        strategySetNo: strategyPlanApprObj.Strategy_Set_No,
        strategyId: strategyPlanApprObj.Strategy_Id,
        playerDecision: strategyPlanApprObj.Decision ? "Yes" : "No",
        decidedBy: "Player",
      }))
    );
    setShouldUpdateStrategyPlan(true);
  };

  // Form submission handler to initiate strategy plan update
  const strategyFormSubmit = (event) => {
    event.preventDefault();
    strategFormUpdate();
  };

  // Checkbox change handler to update local state and table data
  const handleCheckboxChange = (id, checked) => {
    setShouldUpdateStrategyPlan(false);
    setCheckboxStates((prevState) => ({ ...prevState, [id]: checked }));
    editableTableData.forEach((tableObj) =>
      tableObj.Strategy_Id === id ? (tableObj.Decision = checked) : null
    );
  };

  // Render UI layout including form, table, and feedback messages
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
