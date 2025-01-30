import * as React from "react";
import { useEffect, useState } from "react";
import GenericTable from "../../components/GenericTable";
import { getDashboardData } from "./services/gameDashboard.js";
import { useLoading } from "../../hooks/loadingIndicatorContext.js";
import ToastMessage from "../../components/ToastMessage.jsx";
import { pageConstants } from "../GameDashboard/constants/pageConstants.js";

function GameDashboard() {
  const { setIsLoading } = useLoading();
  const [tableData, setData] = useState(null);
  const [alertData, setAlertData] = useState({
    severity: "",
    message: "",
    isVisible: false,
  });

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
          message: pageConstants.apiFailiureMessage,
          isVisible: true
        });
      })
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <div>
      <GenericTable
        inputTableHeadings={pageConstants.tableHeadings}
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
