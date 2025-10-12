import React, { useEffect, useState } from "react";
import BatchMstSelector from "./components/BatchMstSelector.jsx";
import BatchMstForm from "./components/BatchMstForm.jsx";
import {
  getGameBatch,
  getGameBatchDetails,
  getAdminCentre,
  getBatchStatus,
  getFacilitator,
  getFaculty,
  getUOM
} from "./services/getBatchQuery.js";
import { updateBatchMst } from "./services/service.js";
import { useUser } from "../../core/access/userContext.js";

export default function GameBatchDetails() {
  const { userInfo } = useUser();
  const gameId = userInfo?.gameId || "OpsMgt"; //  fallback

  // Selected batch
  const [selected, setSelected] = useState({ gameId, gameBatch: "" }); 

  // UI states
  const [loading, setLoading] = useState(false); 
  const [error, setError] = useState(""); 
  const [updateMessage, setUpdateMessage] = useState(""); 

  // Dropdown options for form
  const [selectOptions, setSelectOptions] = useState({ 
    Centre_Id: [],
    Faculty: [],
    Facilitator: [],
    UOM: [],
    Batch_Status: [],
    Learn_Mode: [],   
    Team_Theme: []   
  });

  // Single row of batch details
  const [batchDetails, setBatchDetails] = useState(null); 

  // Declare Batch-list state (a trigger variable)
  const [gameBatchList, setGameBatchList] = useState([]); 

  // Fetch Batch list
  useEffect(() => {
    if (!gameId) return;

    getGameBatch({ gameId })
      .then(res => {
        const mappedBatches = (res.data || []).map(item => ({ 
          value: item.Game_Batch,
          label: String(item.Game_Batch)
        }));
        setGameBatchList(mappedBatches); 
      })
      .catch(() => setError("Failed to load Batch list")); 
  }, [gameId]);


  // Fetch listbox Values for Other Fields
  useEffect(() => {
    const { gameBatch } = selected;
    if (!gameBatch) return; // skip if no batch selected 

    const queryParams = { gameId, gameBatch }; 
    console.log('queryParams List: ', queryParams)
    Promise.all([
      getFaculty(queryParams),
      getFacilitator(queryParams),
      getUOM(queryParams),
      getBatchStatus(queryParams),
      getAdminCentre(queryParams)
    ])
      .then(([faculty, facilitator, uom, batchStatus, centre]) => {
        //  Modular and readable mapping
        setSelectOptions(prev => ({
          ...prev,

          // Faculty: store User_Id (DB), display User_Name (Role)
          Faculty: (faculty.data || []).map(i => ({
            value: i.User_Id,                                // DB
            label: `${i.User_Name}${i.Role ? " (" + i.Role + ")" : ""}` // User
          })),

          // Facilitator: store User_Id (DB), display User_Name (Role)
          Facilitator: (facilitator.data || []).map(i => ({
            value: i.User_Id,                                // DB
            label: `${i.User_Name}${i.Role ? " (" + i.Role + ")" : ""}` // User
          })),

          // UOM: same field for value and Label
          UOM: (uom.data || []).map(i => ({
            value: i.UOM,
            label: i.UOM
          })),

          // Batch_Status: same field for Value and Label
          Batch_Status: (batchStatus.data || []).map(i => ({
            value: i.Batch_Status,
            label: i.Batch_Status
          })),

          // Admin Centre: Value = Centre_Id, Label = Centre_Name (fallback Admin_Centre if missing)
          Centre_Id: (centre.data || []).map(i => ({
            value: i.Centre_Id,     // From DB
            label: i.Centre_Name    // Label
          }))
        }));

      })
      .catch(() => setError("Failed to load list-box options")); 
  }, [gameId, selected.gameBatch]);

  // -------------------------------
  // Handle selector submit: fetch batch details
  // -------------------------------
  const handleSelectorSubmit = ({ gameId, gameBatch }) => {
    setSelected({ gameId, gameBatch }); 
    setLoading(true); 
    setError(""); 


  // Note: Field names = DB column names, not camelCase.
    getGameBatchDetails({ gameId, gameBatch })
      .then(res => setBatchDetails((res.data && res.data[0]) || null))
      .catch(() => setError("Failed to load batch details")) 
      .finally(() => setLoading(false)); 
  };

  // -------------------------------
  // Handle Save
  // -------------------------------
  const handleSave = async updatedDetails => {
    setLoading(true); 
    setError(""); 
    setUpdateMessage(""); 

    try {
      const res = await updateBatchMst(updatedDetails); 
      const msg = res?.data?.message || res?.data || "Batch updated successfully."; 
      setUpdateMessage(msg); 
      setBatchDetails(updatedDetails); 
    } catch (e) {
      setError("Failed to update batch."); 
    } finally {
      setLoading(false); 
    }
  };

  return (
    <div>
      <h2>Batch Details</h2>

      {/* Selector */}
      <BatchMstSelector
        gameId={gameId}
        gameBatchList={gameBatchList}
        onSubmit={handleSelectorSubmit}
      />

      {/* Loading / Error */}
      {loading && <div>Loading batch details...</div>} 
      {error && <div style={{ color: "red" }}>{error}</div>} 

      {/* Form */}
      {batchDetails && (
        <BatchMstForm
          details={batchDetails}
          selectOptions={selectOptions}
          onSave={handleSave}
          onCancel={() => {
            setBatchDetails(null);                  //  Clear form
            setSelected({ gameId, gameBatch: "" }); //  Reset selector
          }}
        />
      )}

      {/* Update message */}
      {updateMessage && (
        <div style={{ color: "green", marginTop: 8 }}>{updateMessage}</div> 
      )}
    </div>
  );
}
