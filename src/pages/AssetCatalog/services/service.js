import api from "../../../core/interceptor/api-interceptor";

export function getCatalog(queryParams) {
  return api.get("/api/getAssetCatalogBatch", {
    params: {
      ...queryParams,
      cmdLine: "Asset_Catalog",
    },
  });
}

export function getBatch(queryParams) {
  return api.get("/api/getAssetCatalogBatch", {
    params: {
      ...queryParams,
      cmdLine: "Get_Batch",
    },
  });
}
