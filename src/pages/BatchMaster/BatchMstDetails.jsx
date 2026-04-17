// Purpose: Orchestrates Batch selection, data fetch, dropdowns, and form save (UI + API integration)

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
} from "./services/getBatchMstQuery.js";
import { updateBatchMst } from "./services/service.js";
import { useUser } from "../../core/access/userContext.jsx";
import { API_STATUS, API_STATUS_MAP } from "../../utils/statusCodes";
import ToastMessage from "../../components/ToastMessage";

export default function GameBatchDetails() {
  const { userInfo } = useUser();
  const gameId = userInfo?.gameId || "OpsMgt";

  // Selected batch
  const [selected, setSelected] = useState({ gameId, gameBatch: "" });

  // UI states
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [toast, setToast] = useState({
    open: false,
    message: "",
    severity: "info"
  });

  // Dropdown options
  const [selectOptions, setSelectOptions] = useState({
    Centre_Id: [],
    Faculty: [],
    Facilitator: [],
    UOM: [],
    Batch_Status: [],
    Learn_Mode: [],
    Team_Theme: []
  });

  // Batch details
  const [batchDetails, setBatchDetails] = useState(null);

  // Batch list
  const [gameBatchList, setGameBatchList] = useState([]);

  // Fetch batch list
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

  // Fetch dropdown options
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
        setSelectOptions(prev => ({
          ...prev,

          // Faculty mapping
          Faculty: (faculty.data || []).map(i => ({
            value: i.User_Id,
            label: i.User_Name + (i.Role ? " (" + i.Role + ")" : "")
          })),

          // Facilitator mapping
          Facilitator: (facilitator.data || []).map(i => ({
            value: i.User_Id,
            label: i.User_Name + (i.Role ? " (" + i.Role + ")" : "")
          })),

          // UOM mapping
          UOM: (uom.data || []).map(i => ({
            value: i.UOM,
            label: i.UOM
          })),

          // Batch status mapping
          Batch_Status: (batchStatus.data || []).map(i => ({
            value: i.Batch_Status,
            label: i.Batch_Status
          })),

          // Centre mapping
          Centre_Id: (centre.data || []).map(i => ({
            value: i.Centre_Id,
            label: i.Centre_Name
          }))
        }));
      })
      .catch(() => setError("Failed to load list-box options"));
  }, [gameId, selected.gameBatch]);

  // Handle batch selection
  const handleSelectorSubmit = ({ gameId, gameBatch }) => {
    setSelected({ gameId, gameBatch });
    setLoading(true);
    setError("");

    getGameBatchDetails({ gameId, gameBatch })
      .then(res => {
        const data = res?.data;
        setBatchDetails(data && data.length > 0 ? data[0] : null);
      })
      .catch(() => setError("Failed to load batch details"))
      .finally(() => setLoading(false));
  };

  // Handle save
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

      // Reset + show toast
      setToast(prev => ({ ...prev, open: false }));
      setTimeout(() => {
        setToast({
          open: true,
          message: message || mapped.defaultMsg,
          severity: mapped.severity
        });
      }, 50);

      if (status === API_STATUS.SUCCESS) {
        setBatchDetails(updatedDetails);
      }
    } catch (e) {
      const mapped = API_STATUS_MAP[API_STATUS.SYSTEM_ERROR];
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

      <ToastMessage
        open={toast.open}
        message={toast.message}
        severity={toast.severity}
        onClose={() => setToast(prev => ({ ...prev, open: false }))}
      />
    </div>
  );
}