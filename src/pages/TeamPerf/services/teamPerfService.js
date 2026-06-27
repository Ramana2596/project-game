// File : src/pages/TeamPerf/services/teamPerfService.js
// Team Performance API Call Services

import api from "../../../core/interceptor/api-interceptor";


// Get Game / Batch LOV

export const getGameBatch = () => {
    return api.get("/api/getTeamPerf", {
        params: {
            gameId: "",
            gameBatch: 0,
            cmdLine: "Get_Batch",
        },
    });
};


// Get Team Performance

export const getTeamPerf = (gameId, gameBatch, gameTeam = null) => {
    return api.get("/api/getTeamPerf", {
        params: {
            gameId,
            gameBatch,
            gameTeam,
        },
    });
};