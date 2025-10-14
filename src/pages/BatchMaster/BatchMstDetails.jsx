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
import { API_STATUS, API_STATUS_MAP } from "../../utils/statusCodes"; // ✅
import ToastMessage from "../../components/ToastMessage"; // ✅

export default function GameBatchDetails() {
  const { userInfo } = useUser();
  const gameId = userInfo?.gameId || "OpsMgt"; // fallback

  // Selected batch
  const [selected, setSelected] = useState({ gameId, gameBatch: "" }); 
  
  // UI states
  const [loading, setLoading] = useState(false); 
  const [error, setError] = useState(""); 
  const [toast, setToast] = useState({ open: false, message: "", severity: "info" }); // ✅

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

  // Fetch batch list on gameId change
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
    if (!gameBatch) return;

    const queryParams = { gameId, gameBatch }; 

    Promise.all([
      getFaculty(queryParams),
      getFacilitator(queryParams),
      getUOM(queryParams),
      getBatchStatus(queryParams),
      getAdminCentre(queryParams)
    ])
      .then(([faculty, facilitator, uom, batchStatus, centre]) => {
 // Modular and readable mapping
        setSelectOptions(prev => ({
          ...prev,

// Faculty: store User_Id (DB), display User_Name (Role)
          Faculty: (faculty.data || []).map(i => ({
            value: i.User_Id,
            label: `${i.User_Name}${i.Role ? " (" + i.Role + ")" : ""}`
          })),

// Facilitator: store User_Id (DB), display User_Name (Role)
          Facilitator: (facilitator.data || []).map(i => ({
            value: i.User_Id,
            label: `${i.User_Name}${i.Role ? " (" + i.Role + ")" : ""}`
          })),

// UOM: both value and label are UOM
          UOM: (uom.data || []).map(i => ({
            value: i.UOM,
            label: i.UOM
          })),

// Batch_Status: both value and label are Batch_Status
          Batch_Status: (batchStatus.data || []).map(i => ({
            value: i.Batch_Status,
            label: i.Batch_Status
          })),

// Centre_Id: store Centre_Id (DB), display Centre_Name
          Centre_Id: (centre.data || []).map(i => ({
            value: i.Centre_Id,
            label: i.Centre_Name
          }))
        }));
      })
      .catch(() => setError("Failed to load list-box options")); 
  }, [gameId, selected.gameBatch]);

  // Handler when a batch is selected from the dropdown
  const handleSelectorSubmit = ({ gameId, gameBatch }) => {
    setSelected({ gameId, gameBatch }); 
    setLoading(true); 
    setError(""); 

// Note: API Call returns SP Field names, in Snake_Case - not camelCase.
    getGameBatchDetails({ gameId, gameBatch })
      .then(res => setBatchDetails((res.data && res.data[0]) || null))
      .catch(() => setError("Failed to load batch details")) 
      .finally(() => setLoading(false)); 
  };

  // Handle Save
  const handleSave = async updatedDetails => {
    setLoading(true);
    setError("");

    try {
      const res = await updateBatchMst(updatedDetails);
      const { status, message } = res?.data || {};
      const mapped = API_STATUS_MAP[status] || {
        severity: "info",
        defaultMsg: "Unknown response"
      };

      // Force toast to reset before showing again
      setToast(prev => ({ ...prev, open: false })); // copy current prop & Close if already open
      setTimeout(() => {
        setToast({
          open: true,
          message: message || mapped.defaultMsg,
          severity: mapped.severity
        });
      }, 50); // Small delay to ensure re-render

      if (status === API_STATUS.SUCCESS) {
        setBatchDetails(updatedDetails); // update local state
      }
    } catch (e) {
      const mapped = API_STATUS_MAP[API_STATUS.SYSTEM_ERROR]; // fallback for catch
      setToast({
        open: true,
        message: mapped.defaultMsg,
        severity: mapped.severity
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>Batch Details</h2>

      <BatchMstSelector
        gameId={gameId}
        gameBatchList={gameBatchList}
        onSubmit={handleSelectorSubmit}
      />

      {loading && <div>Loading batch details...</div>} 
      {error && <div style={{ color: "red" }}>{error}</div>} 

      {batchDetails && (
        <BatchMstForm
          details={batchDetails}
          selectOptions={selectOptions}
          onSave={handleSave}
          onCancel={() => {
            setBatchDetails(null);
            setSelected({ gameId, gameBatch: "" });
          }}
        />
      )}

      {/* Toast Message */}
      <ToastMessage
        open={toast.open}
        message={toast.message}
        severity={toast.severity}
        onClose={() => setToast(prev => ({ ...prev, open: false }))}
      />
    </div>
  );
}
