// ============================================================
// LEAP V1.0
// File : leapService.js
// Purpose : LEAP data access service
// ============================================================

import axios from "axios";
import { mockData } from "../mock/leapMockData";

const USE_MOCK = true;

// ------------------------------------------------------------
// Get Stage Content
// ------------------------------------------------------------
export async function getStageContent(stageId) {

  if (USE_MOCK) {
    return mockData.filter(x => x.stageId === stageId);
  }

  const response = await axios.post(
    "/api/getLeap",
    {
      stageId,
    }
  );

  return response.data;
}