import FetchDataFromApi from '../../../hooks/fetchData';

export function getBatchFromMarketInfo(requestType, gameId) {
    return FetchDataFromApi('/api/getMarketFactorInfoInput', true, {
        "type": requestType,
        "gameId": gameId
    });
}
