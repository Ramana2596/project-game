// PlantCapacity.jsx
// Work_Centre and Plant Capacity, load, Utilisation

import { Box } from "@mui/material";
import GenericTable from "../../components/GenericTable.jsx";
import { useUser } from "../../core/access/userContext.jsx";
import { useEffect, useState } from "react";
import { getPlantCapacity } from "./services/service.js";
import { pageConstants } from "./constants/pageConstants.js";

export default function PlantCapacity() {
  const { userInfo } = useUser();

  const payload = {
    gameId: userInfo?.gameId,
    gameBatch: userInfo?.gameBatch,
    gameTeam: userInfo?.gameTeam,
  };

  const [workCentreData, setWorkCentreData] = useState([]);
  const [plantData, setPlantData] = useState([]);

  useEffect(() => {
    getPlantCapacity(payload).then((response) => {
      if (response?.data) {
        setWorkCentreData(response.data.Work_Centre || []);
        setPlantData(response.data.Plant || []);
      }
    });
  }, []);

  return (
    <Box sx={{ flexGrow: 1 }}>

      {/* Plant Summary - will be used for UX cards */}
      {plantData.length > 0 && (
        <Box>
          {/* Plant summary cards will come here */}
        </Box>
      )}

      {/* Work Centre / Machine Utilisation */}
      <GenericTable
        inputTableHeadings={pageConstants.tableHeading}
        inputTableData={workCentreData}
        ifNoData={null}
        highlightColumnsByField={pageConstants.highlightedColumns}
        hiddenColumns={pageConstants.hiddenColumns}
      />

    </Box>
  );
}
