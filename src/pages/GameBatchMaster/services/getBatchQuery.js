import api from "../../../core/interceptor/api-interceptor";


//  Note: queryParams is object.

// Fetch Game_Batch
export function getGameBatch(queryParams) {
  return api.get("/api/getBatchQuery", {
    params: {
      ...queryParams,
      cmdLine: "Game_Batch",
    },
  })
}

// Fetch Game Batch Info
export function getGameBatchDetails(queryParams) {
  return api.get("/api/getBatchQuery", {
    params: {
      ...queryParams,
      cmdLine: "Batch_Details",
    },
  })
}

// Fetch Admin_Centre
export function getAdminCentre(queryParams) {
  return api.get("/api/getBatchQuery", {
    params: {
      ...queryParams,
      cmdLine: "Admin_Centre",
    },
  })
}

/*
// Fetch Admin_Centre with LOG
export function getAdminCentre(queryParams) {
  console.log('In Admin Centre ', queryParams);
  return api.get("/api/getBatchQuery", {
    params: {
      ...queryParams,
      cmdLine: "Admin_Centre",
    },
  }).then(response => {
    console.log("Admin response:", response.data);
    return response;
  }).catch(error => {
    console.error("API error:", error);
    throw error;
  });
}
*/

// Fetch Batch Status
export function getBatchStatus(queryParams) {
  return api.get("/api/getBatchQuery", {
    params: {
      ...queryParams,
      cmdLine: "Batch_Status",
    },
  })
}

// Fetch Facilitator
export function getFacilitator(queryParams) {
  return api.get("/api/getBatchQuery", {
    params: {
      ...queryParams,
      cmdLine: "Facilitator",
    },
  })
}

// Fetch Faculty
export function getFaculty(queryParams) {
  return api.get("/api/getBatchQuery", {
    params: {
      ...queryParams,
      cmdLine: "Faculty",
    },
  })
}

// Fetch UOM
export function getUOM(queryParams) {
  return api.get("/api/getBatchQuery", {
    params: {
      ...queryParams,
      cmdLine: "UOM",
    },
  })
}
