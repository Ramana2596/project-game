// src/utils/msgStatusCodes.js
// Unified MSG_STATUS with short categories: API, HTTP, Nw

export const MSG_STATUS = {
  // --- API (Application / Stored Procedure messages)
  SUCCESS: { code: 0, category: "API", severity: "success", defaultMsg: "Successful!" },
  BUSINESS_ERROR: { code: 1, category: "API", severity: "warning", defaultMsg: "Business error!" },
  SYSTEM_ERROR: { code: -1, category: "API", severity: "error", defaultMsg: "System error!" },

  // --- HTTP (Standard HTTP / Industry codes)
  UNAUTHORIZED: { code: 401, category: "HTTP", severity: "error", defaultMsg: "No authorization." },
  NOT_FOUND: { code: 404, category: "HTTP", severity: "warning", defaultMsg: "Resource missing." },
  SERVER_BUSY: { code: 503, category: "HTTP", severity: "info", defaultMsg: "Server busy. Please wait..." },
  MAINTENANCE: { code: 500, category: "HTTP", severity: "info", defaultMsg: "Service under maintenance." },

  // --- Nw (Network / Physical errors)-exceptions thrown by UI library (Axios, fetch).
  NETWORK_ERROR: { code: 1001, category: "Nw", severity: "error", defaultMsg: "Network error. Please try again." },
};
