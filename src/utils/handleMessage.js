// src/utils/handleMessage.js
// Unified API, HTTP, Nw error Messaging

import { MSG_STATUS } from "./msgStatusCodes.js";

export function handleMessage(resp, err) {
  // --- Case 3: Nw (Network error / physical failure)
  if (err) {
    console.error("Network/Unexpected error:", err);
    return {
      severity: MSG_STATUS.NETWORK_ERROR.severity,
      message: MSG_STATUS.NETWORK_ERROR.defaultMsg,
      isVisible: true,
    };
  }

  // --- Case 1: API (returnValue from payload)
  const { returnValue, message } = resp?.data ?? {};
  if (returnValue !== undefined) {
    const statusEntry =
      Object.values(MSG_STATUS).find((s) => s.code === returnValue) ||
      MSG_STATUS.SYSTEM_ERROR;

    return {
      severity: statusEntry.severity,
      message: message || statusEntry.defaultMsg,
      isVisible: true,
    };
  }

  // --- Case 2: HTTP (resp.status)
  if (resp?.status) {
    const statusEntry =
      Object.values(MSG_STATUS).find((s) => s.code === resp.status) ||
      MSG_STATUS.SYSTEM_ERROR;

    return {
      severity: statusEntry.severity,
      message: statusEntry.defaultMsg,
      isVisible: true,
    };
  }

  // --- Fallback
  return {
    severity: MSG_STATUS.SYSTEM_ERROR.severity,
    message: MSG_STATUS.SYSTEM_ERROR.defaultMsg,
    isVisible: true,
  };
}
