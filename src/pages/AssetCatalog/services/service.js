import api from "../../../core/interceptor/api-interceptor";

export function getCatalog(queryParams) {
  return api.get("/api/getAssetCatalog", {
    params: {
      ...queryParams,
      cmdLine: "Asset_Catalog",
    },
  });
}

export function getBatch(queryParams) {
  return api.get("/api/getAssetCatalog", {
    params: {
      ...queryParams,
      cmdLine: "Get_Batch",
    },
  });
}
