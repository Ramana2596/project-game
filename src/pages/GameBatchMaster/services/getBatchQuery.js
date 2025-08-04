import api from "../../../core/interceptor/api-interceptor";

// Fetch list of Game_Id for dropdown
export function fetchGameIdList() {
  // CMD_Line: 'Game_Id_List' (assumed, adjust if your backend expects a different value)
  return api.get("/api/UI_Batch_Query", { params: { CMD_Line: "Game_Id_List" } });
}

// Fetch list of Game_Batch for dropdown (optionally filtered by Game_Id)
export function fetchGameBatchList(gameId) {
  // CMD_Line: 'Game_Batch_List' (assumed, adjust as needed)
  // If Game_Id is required as a filter, include it
  const params = { CMD_Line: "Game_Batch_List" };
  if (gameId) params.Game_Id = gameId;
  return api.get("/api/UI_Batch_Query", { params });
}

// Fetch details for a specific Game_Id and Game_Batch
export function fetchGameBatchDetails({ gameId, gameBatch }) {
  return api.get("/api/UI_Batch_Query", {
    params: {
      CMD_Line: "Batch_Info",
      Game_Id: gameId,
      Game_Batch: gameBatch
    }
  });
}
