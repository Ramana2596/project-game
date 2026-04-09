import api from "../../../core/interceptor/api-interceptor";

export function getUserDetails(queryParams) {
    return api.get("/api/getUserDetails", { params: { ...queryParams } });
}