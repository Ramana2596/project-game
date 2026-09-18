/**
 * Component Name: MarketIntelService
 * Module: Market Intelligence
 * Purpose: Handles API calls to fetch team market input details based on stored procedure UI_Market_Info_Team.
*/

import api from '../../../core/interceptor/api-interceptor';


export function getMarketInfoTeam(queryParams) {
    return api.post('/api/getMarketInfoTeam', {
        params: { ...queryParams }
    });
}