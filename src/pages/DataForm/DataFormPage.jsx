// src/pages/DataForm/DataFormPage.jsx
// Purpose: DataForm Page (Header + Form + API Integration with production-grade UX)

import React, { useEffect, useState } from "react";
import DataForm from "./components/DataForm";
import DataFormHeader from "./components/DataFormHeader";
import { formConfig } from "./config/formConfig";
import {
  fetchDataForm,
  fetchDropdowns,
  saveDataForm
} from "./services/service";
import { useUser } from "../../core/access/userContext";
import { API_STATUS, API_STATUS_MAP } from "../../utils/statusCodes";
import ToastMessage from "../../components/ToastMessage";

export default function DataFormPage() {
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
  // FETCH: Batch List
  // =========================
  useEffect(() => {
    // TODO: Replace with API (getGameBatch)
    setBatchList([
      { value: "1", label: "1" },
      { value: "2", label: "2" }
    ]);
  }, []);

  // =========================
  // HANDLER: Param Change
  // =========================
  const handleParamChange = (key, value) => {
    setParams(prev => ({
      ...prev,
      [key]: value
    }));
  };

  // =========================
  // HANDLER: Submit
  // =========================
  const handleSubmit = async () => {
    if (!params.gameBatch) return;

    setLoading(true);
    setError("");

    try {
      // Fetch main data
      const res = await fetchDataForm(params);
      const data = res?.data;

      setDetails(data && data.length > 0 ? data[0] : {});

      // Fetch dropdowns
      const dd = await fetchDropdowns(params);
      setSelectOptions(dd?.data || {});
    } catch (e) {
      setError("Failed to load data");

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
  // HANDLER: Save
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
      <h2>Data Form</h2>

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
          fields={formConfig}
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