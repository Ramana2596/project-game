import React, { useEffect, useState } from "react";
import GameBatchSelector from "./components/GameBatchSelector";
import GameBatchDetailsForm from "./components/GameBatchDetailsForm";
import { fetchGameIdList, fetchGameBatchList, fetchGameBatchDetails } from "./services/getBatchQuery";
import { fetchFacultyList, fetchFacilitatorList, fetchUOMList, fetchBatchStatusList, fetchCentreList } from "./services/getListBoxOptions";
import { pageConstants } from "./constants/pageConstants";
import { updateGameBatch } from "./services/service";

export default function GameBatchDetails() {
  const [gameIdList, setGameIdList] = useState([]);
  const [gameBatchList, setGameBatchList] = useState([]);
  const [selected, setSelected] = useState({ gameId: "", gameBatch: "" });
  const [batchDetails, setBatchDetails] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [updateMessage, setUpdateMessage] = useState("");
  const [selectOptions, setSelectOptions] = useState({ Faculty: [], Facilitator: [], UOM: [], Batch_Status: [], Centre_Id: [] });

  // Fetch Game_Id list on mount
  useEffect(() => {
    fetchGameIdList()
      .then(res => setGameIdList(res.data || []))
      .catch(() => setError("Failed to load Game Id list"));
  }, []);

  // Fetch Game_Batch list when Game_Id changes
  useEffect(() => {
    if (selected.gameId) {
      fetchGameBatchList(selected.gameId)
        .then(res => setGameBatchList(res.data || []))
        .catch(() => setError("Failed to load Game Batch list"));
    } else {
      setGameBatchList([]);
    }
  }, [selected.gameId]);

  // Fetch list box options on mount
  useEffect(() => {
    Promise.all([
      fetchFacultyList(),
      fetchFacilitatorList(),
      fetchUOMList(),
      fetchBatchStatusList(),
      fetchCentreList()
    ]).then(([faculty, facilitator, uom, batchStatus, centre]) => {
      setSelectOptions({
        Faculty: faculty.data || [],
        Facilitator: facilitator.data || [],
        UOM: uom.data || [],
        Batch_Status: batchStatus.data || [],
        Centre_Id: centre.data || []
      });
    }).catch(() => setError("Failed to load list box options"));
  }, []);

  // Handler for selector submit
  const handleSelectorSubmit = ({ gameId, gameBatch }) => {
    setSelected({ gameId, gameBatch });
    setLoading(true);
    setError("");
    fetchGameBatchDetails({ gameId, gameBatch })
      .then(res => setBatchDetails(res.data || null))
      .catch(() => setError("Failed to load batch details"))
      .finally(() => setLoading(false));
  };

  // Handler for save (update)
  const handleSave = async (updatedDetails) => {
    setLoading(true);
    setError("");
    setUpdateMessage("");
    try {
      // Call update API (UI_Batch_Mgt_Trans) with all fields as parameters
      const res = await updateGameBatch({ ...updatedDetails, CMD_Line: "Update" });
      // Assume message is in res.data.message or res.data (adjust as per backend)
      const msg = res?.data?.message || res?.data || "Batch updated successfully.";
      setUpdateMessage(msg);
      setBatchDetails(updatedDetails); // Optionally refresh details
    } catch (e) {
      setError("Failed to update batch.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>Game Batch Details</h2>
      <GameBatchSelector
        gameIdList={gameIdList}
        gameBatchList={gameBatchList}
        onSubmit={handleSelectorSubmit}
      />
      {loading && <div>Loading batch details...</div>}
      {error && <div style={{ color: 'red' }}>{error}</div>}
      {batchDetails && (
        <GameBatchDetailsForm
          details={batchDetails}
          selectOptions={selectOptions}
          onSave={handleSave}
          onCancel={() => setBatchDetails(null)}
        />
      )}
      {updateMessage && <div style={{ color: 'green', marginTop: 8 }}>{updateMessage}</div>}
    </div>
  );
}
