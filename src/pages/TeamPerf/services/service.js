// File : src/pages/TeamPerf/services/teamPerfService.js
// Team Performance API Call Services

import api from "../../../core/interceptor/api-interceptor";


// Get Batch LOV
export const getBatch = () => {
    return api.get("/api/getTeamPerf", {
        params: {
            gameId: "",
            gameBatch: 0,
            cmdLine: "Get_Batch",
        },
    });
};

// Get Team
export const getTeam = (gameId, gameBatch) => {
    return api.get("/api/getTeamPerf", {
        params: {
            gameId,
            gameBatch,
            cmdLine: "Get_Team",
        },
    });
};

// Get Team Performance
export const getTeamPerf = (gameId, gameBatch, gameTeam) => {
    return api.get("/api/getTeamPerf", {
        params: {
            gameId,
            gameBatch,
            gameTeam,
            cmdLine: "Get_Team_Perf",
        },
    });
};