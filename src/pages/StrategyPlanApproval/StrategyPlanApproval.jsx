import { useEffect, useState } from "react";
import { Box, Button, Typography, Divider } from "@mui/material";
import Grid from "@mui/material/Grid2";

import EditableTable from "../../components/EditableTable.jsx";
import NotificationMessage from "../../components/NotificationMessage.jsx";
import ToastMessage from "../../components/ToastMessage.jsx";

import { useUser } from "../../core/access/userContext.jsx";
import { useLoading } from "../../hooks/loadingIndicatorContext.jsx";

import {
  getStrategyPlan,
  updateStrategyPlan,
} from "./services/strategyPlanApprovalService.js";

import { pageConstants } from "./constants/pageConstants.js";

export default function StrategyPlanApproval() {
  const { userInfo } = useUser();
  const { setIsLoading } = useLoading();

  // Page State
  const [strategyRows, setStrategyRows] = useState([]);
  const [sucValue, setSucValue] = useState(-1);
  const [statusMessage, setStatusMessage] = useState(null);

  const [toast, setToast] = useState({
    open: false,
    severity: "",
    message: "",
  });

  // Load Strategy Plan
  useEffect(() => {
    const loadStrategyPlan = async () => {
      setIsLoading(true);

      try {
        const apiResponse = await getStrategyPlan({
          gameId: userInfo?.gameId,
          gameBatch: userInfo?.gameBatch,
          gameTeam: userInfo?.gameTeam,
        });

        // Axios wrapper does NOT unwrap — apiResponse is the full axios object
        const responseBody = apiResponse?.data || {};

        const fetchedStrategyRows = Array.isArray(responseBody.data)
          ? responseBody.data
          : [];

        const normalizedStrategyRows = fetchedStrategyRows.map(
          (strategyRow) => ({
            ...strategyRow,
            Decision: strategyRow.Decision === "Yes",
          })
        );

        setStrategyRows(normalizedStrategyRows);
        setSucValue(responseBody.SucValue ?? -1);
        setStatusMessage(responseBody.Out_Message ?? null);
      } catch (error) {
        console.error("Failed to load strategy plan:", error);
        setToast({
          open: true,
          severity: "error",
          message: "Failed to load strategy plan.",
        });
      } finally {
        setIsLoading(false);
      }
    };

    if (userInfo?.gameId) {
      loadStrategyPlan();
    }
  }, [userInfo, setIsLoading]);

  // Handle Decision Change
  const handleDecisionChange = (strategyId, isChecked) => {
    setStrategyRows((rows) =>
      rows.map((row) =>
        row.Strategy_Id === strategyId ? { ...row, Decision: isChecked } : row
      )
    );
  };

  // Submit Strategy Plan
  const submitStrategyPlan = async () => {
    const decisionPayload = strategyRows.map((row) => ({
      gameId: userInfo?.gameId,
      gameBatch: userInfo?.gameBatch,
      gameTeam: userInfo?.gameTeam,
      strategySetNo: row.Strategy_Set_No,
      strategyId: row.Strategy_Id,
      playerDecision: row.Decision ? "Yes" : "No",
      decidedBy: "Player",
    }));

    setIsLoading(true);

    try {
      await updateStrategyPlan(decisionPayload);

      setToast({
        open: true,
        severity: "success",
        message: "Strategy Plan Decision completed successfully",
      });
    } catch (error) {
      console.error("Failed to update strategy plan:", error);
      setToast({
        open: true,
        severity: "error",
        message: "Failed to submit decision.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const canApprove = sucValue === 0 && strategyRows.length > 0;

  return (
    <Box sx={{ flexGrow: 1 }}>
      {/* Toolbar: Batch + Team (grouped, aesthetic) + Submit / Message*/}
      <Grid container margin={2} spacing={2} sx={{ alignItems: "center" }}>
        {/* Batch + Team + Submit travel together as one compact heading group */}
        <Grid size={{ xs: 12, sm: 5 }}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 2,
              flexWrap: "wrap",
              height: "50px",
            }}
          >
            <Typography
              className="standard-title-color"
              sx={{
                fontSize: "1.15rem",
                fontWeight: 600,
                lineHeight: "50px",
              }}
            >
              {pageConstants.gameBatch}:{" "}
              <Box component="span" sx={{ fontWeight: 700 }}>
                {userInfo?.gameBatch}
              </Box>
            </Typography>

            <Divider orientation="vertical" flexItem sx={{ my: 1 }} />

            <Typography
              className="standard-title-color"
              sx={{
                fontSize: "1.15rem",
                fontWeight: 600,
                lineHeight: "50px",
              }}
            >
              {pageConstants.gameTeam}:{" "}
              <Box component="span" sx={{ fontWeight: 700 }}>
                {userInfo?.gameTeam}
              </Box>
            </Typography>

            <Button
              type="button"
              disabled={!canApprove}
              onClick={submitStrategyPlan}
              className="standard-button-primary-button"
              sx={{ width: "100px", height: "50px" }}
            >
              {pageConstants.submitBtn}
            </Button>
          </Box>
        </Grid>

        {/* Message now gets the remaining, wider share of the row */}
        <Grid size={{ xs: 12, sm: 7 }}>
          <Box
            sx={{
              height: "50px",
              display: "flex",
              alignItems: "center",
            }}
          >
            {statusMessage && (
              <NotificationMessage
                message={statusMessage}
                sx={{ width: "100%" }}
              />
            )}
          </Box>
        </Grid>
      </Grid>

      {/* Strategy Plan Table  */}
      {strategyRows.length > 0 && (
        <Box sx={{ mt: 2 }}>
          <EditableTable
            editableTableData={strategyRows}
            onCheckboxChange={handleDecisionChange}
            hiddenColumns={pageConstants.table.hiddenColumns}
          />
        </Box>
      )}

      {/*  Toast */}
      <ToastMessage
        open={toast.open}
        severity={toast.severity}
        message={toast.message}
        onClose={() =>
          setToast((prev) => ({
            ...prev,
            open: false,
          }))
        }
      />
    </Box>
  );
}