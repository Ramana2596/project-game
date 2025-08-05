import api from "../../../core/interceptor/api-interceptor";

export function getAssetCatalogBatch(queryParams) {
  return api.get("/api/getAssetCatalogBatch", {
    params: {
      ...queryParams,
      cmdLine: "Asset_Catalog",
    },
  });
}

export function getGameBatch(queryParams) {
  return api.get("/api/getAssetCatalogBatch", {
    params: {
      ...queryParams,
      cmdLine: "Get_Batch",
    },
  });
}
