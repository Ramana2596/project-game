// src/utils/getApiMessage.js
// Purpose: Map API returnValue and message using API_STATUS_MAP

import { API_STATUS, API_STATUS_MAP } from "./statusCodes";

export function getApiMessage(returnValue, message) {

  const statusKey = Number(returnValue); 

  const status =
    API_STATUS_MAP[statusKey] || API_STATUS_MAP[API_STATUS.SYSTEM_ERROR];

  return {
    severity: status.severity,
    message: message || status.defaultMsg,
    isVisible: true,
  };
}