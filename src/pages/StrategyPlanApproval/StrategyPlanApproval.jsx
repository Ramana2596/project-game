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

export default function StrategyPlanApproval() {
  const [shouldUpdateStrategyPlan, setShouldUpdateStrategyPlan] =
    useState(false);
  const [strategyPlanRequestBody, setStrategyPlanRequestBody] = useState(null);
  const [checkboxStates, setCheckboxStates] = useState({});
  let [editableTableData, setEditableTableData] = useState([]);
  const { userInfo } = useUser();
  const [gameIdData, setGameIdData] = useState(null);

  useEffect(() => {
    getStrategyPlan({
      type: "getStrategyPlan",
      gameId: userInfo?.gameId,
      gameBatch: userInfo?.gameBatch,
      gameTeam: userInfo?.gameTeam,
    }).then((response) => {
      if (response) {
        setGameIdData(response.data);
      }
    });
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
      updateStrategyPlan(strategyPlanRequestBody).then((response) => {
        if (response) {
          console.log("Strategy Plan Updated Successfully");
        }
      });
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
        <Grid container spacing={2} justifyContent="center" alignItems="center">
          <h1>{pageConstants.pageTitle}</h1>
        </Grid>
        <Grid container spacing={2} justifyContent="center" alignItems="center">
          <h3>
            {pageConstants.gameBatch}: {userInfo?.gameBatch}
          </h3>
          <h3>
            {pageConstants.gameTeam}: {userInfo?.gameTeam}
          </h3>
        </Grid>
        <Grid container spacing={2} justifyContent="center" alignItems="center">
          <Button
            type="submit"
            variant="contained"
            onClick={strategyFormSubmit}
          >
            {pageConstants.submitBtn}
          </Button>
        </Grid>
      </form>
      {
        <EditableTable
          editableTableData={editableTableData}
          onCheckboxChange={handleCheckboxChange}
          hiddenColumns={pageConstants.table.hiddenColumns}
        ></EditableTable>
      }
    </Box>
  );
}
