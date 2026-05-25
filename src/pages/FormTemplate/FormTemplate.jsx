// src/pages/BatchMasterNew/FormTemplate.jsx
// Purpose: Batch Master Page (Header + Form + UI-specific API Integration)

import React, { useEffect, useState } from "react";
import DataForm from "./components/DataForm";
import DataFormHeader from "./components/DataFormHeader";
import { formFields } from "./config/formFields";
import { 
  getGameBatch, 
  getGameBatchDetails, 
  getAdminCentre, 
  getBatchStatus, 
  getFacilitator, 
  getFaculty, 
  getUOM 
} from "./services/getBatchMstQuery";
import { saveDataForm } from "./services/service";
import { useUser } from "../../core/access/userContext";
import { API_STATUS, API_STATUS_MAP } from "../../utils/statusCodes";
import ToastMessage from "../../components/ToastMessage";

export default function FormTemplate() {
  const { userInfo } = useUser();
  const gameId = userInfo?.gameId || "OpsMgt";

  // =========================
  // STATE: Parameters
  // =========================
  const [params, setParams] = useState({
    gameId,
    gameBatch: ""
  });

  // =========================
  // STATE: Data
  // =========================
  const [batchList, setBatchList] = useState([]);
  const [details, setDetails] = useState(null);
  const [selectOptions, setSelectOptions] = useState({});

  // =========================
  // STATE: UI
  // =========================
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [toast, setToast] = useState({
    open: false,
    message: "",
    severity: "info"
  });

  // =========================
  // FETCH: Batch List on mount
  // =========================
  useEffect(() => {
    const loadBatchList = async () => {
      try {
        const res = await getGameBatch({ gameId: params.gameId });
        const list = (res?.data || []).map(b => ({
          value: b.Game_Batch,
          label: b.Game_Batch
        }));
        setBatchList(list);
      } catch (e) {
        console.error("Failed to load batch list", e);
      }
    };
    loadBatchList();
  }, [params.gameId]);

  // =========================
  // HANDLER: Param Change
  // =========================
  const handleParamChange = (key, value) => {
    setParams(prev => ({ ...prev, [key]: value }));
  };

  // =========================
  // HANDLER: Submit (fetch batch details + dropdowns)
  // =========================
  const handleSubmit = async () => {
    if (!params.gameBatch) return;

    setLoading(true);
    setError("");

    try {
      // -------------------------
      // Fetch Batch Details
      // -------------------------
      const res = await getGameBatchDetails(params);
      const data = res?.data;
      setDetails(data && data.length > 0 ? data[0] : {});

      // -------------------------
      // Fetch Dropdown Options in parallel
      // -------------------------
      const [adminCentre, batchStatus, facilitators, faculty, uoms] = await Promise.all([
        getAdminCentre(params),
        getBatchStatus(params),
        getFacilitator(params),
        getFaculty(params),
        getUOM(params)
      ]);

      // -------------------------
      // Map API data by columnName to {value, label} for DataForm
      // -------------------------
      setSelectOptions({
        Centre_Id: (adminCentre?.data || []).map(c => ({
          value: c.Centre_Id,
          label: c.Centre_Name
        })),
        Batch_Status: (batchStatus?.data || []).map(s => ({
          value: s.Batch_Status,
          label: s.Batch_Status
        })),
        Facilitator: (facilitators?.data || []).map(f => ({
          value: f.User_Id,
          label: f.User_Name
        })),
        Faculty: (faculty?.data || []).map(f => ({
          value: f.User_Id,
          label: f.User_Name
        })),
        UOM: (uoms?.data || []).map(u => ({
          value: u.UOM,
          label: u.UOM
        }))
      });

    } catch (e) {
      setError("Failed to load batch data");

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

  // =========================
  // HANDLER: Save updated batch
  // =========================
  const handleSave = async (updatedData) => {
    setLoading(true);
    setError("");

    try {
      const res = await saveDataForm(updatedData);
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

      // Success update
      if (status === API_STATUS.SUCCESS) {
        setDetails(updatedData);
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

  // =========================
  // RENDER
  // =========================
  return (
    <div style={{ padding: "16px" }}>
      {/* PAGE HEADING */}
      <h2>Batch Master</h2>

      {/* HEADER */}
      <DataFormHeader
        gameId={params.gameId}
        gameBatch={params.gameBatch}
        batchList={batchList}
        onChange={handleParamChange}
        onSubmit={handleSubmit}
      />

      {/* STATUS */}
      {loading && <div>Loading...</div>}
      {error && <div style={{ color: "red" }}>{error}</div>}

      {/* FORM */}
      {details && (
        <DataForm
          fields={formFields}
          details={details}
          selectOptions={selectOptions}
          onSave={handleSave}
          onCancel={() => {
            setDetails(null);
            setParams(prev => ({ ...prev, gameBatch: "" }));
          }}
        />
      )}

      {/* TOAST */}
      <ToastMessage
        open={toast.open}
        message={toast.message}
        severity={toast.severity}
        onClose={() => setToast(prev => ({ ...prev, open: false }))}
      />
    </div>
  );
}