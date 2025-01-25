import * as React from "react";
import { useEffect, useState } from "react";
import GenericTable from "../../components/GenericTable";
import { getDashboardData } from "./services/gameDashboard.js";
import { Typography } from "@mui/material";
import { useLoading } from "../../hooks/loadingIndicatorContext.js";
import ToastMessage from "../../components/ToastMessage.jsx";

function GameDashboard() {
  const { setIsLoading } = useLoading();
  const [tableData, setData] = useState(null);
  const [alertData, setAlertData] = useState({
    severity: "",
    message: "",
    isVisible: false,
  });

  const tableHeadings = [
    "Game_Id",
    "Game_Title",
    "Game_Short_Title",
    "Game_Objective",
    "Discipline",
    "Subject",
    "Faculty",
    "Duration_Hours",
    "Max_Seats",
    "Max_Sessions",
  ];

  useEffect(() => {
    setIsLoading(true)
    getDashboardData()
      .then((response) => {
        if (response) {
          setData(response.data);
        }
      })
      .catch((err) => {
        setAlertData({
          severity: "error",
          message: 'There was an error while processing your request. Please try again later',
          isVisible: true
        });
      })
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <div>
      <GenericTable
        inputTableHeadings={tableHeadings}
        inputTableData={tableData}
      ></GenericTable>
      <ToastMessage
        open={alertData.isVisible}
        severity={alertData.severity}
        message={alertData.message}
      />
    </div>
  );
}

export default GameDashboard;
