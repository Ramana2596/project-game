import api from '../../../core/interceptor/api-interceptor';

export function updateGameTeamPlay(payLoad) {
    let payload = {
        ...payLoad,
        cmdLine: "Team Play",
    };
    return api.post("/api/updateGameTeamPlay", payload);
}

export function rollBackPeriod(payLoad) {
    let payload = {
        ...payLoad,
        cmdLine: "Rollback Last Period",
    };
    return api.post("/api/updateGameTeamPlay", payload);
}