
// services/mrService.js – API calls (SP -> API -> front-end)
import api from '../../../core/interceptor/api-interceptor';
import { toDate } from '../utils/mrFormat';

// APIs are POST with payload { params }; response is { success, code, message, data }
// period = "Jun-2026"; omit it to get all periods (used for the month list)
const call = (url, queryParams, period) =>
  api.post(url, { params: { ...queryParams, ...(period ? { productionMonth: toDate(period) } : {}) } })
    .then(({ data: res }) => {
      if (!res.success) throw new Error(res.message || 'Could not load data.');
      return res.data || [];
    });

// UI_Production_Record_Info
export const getProductionInfo = (queryParams, period) => call('/api/getProductionInfo', queryParams, period);

// UI_Sales_Record_Info
export const getSalesInfo = (queryParams, period) => call('/api/getSalesInfo', queryParams, period);