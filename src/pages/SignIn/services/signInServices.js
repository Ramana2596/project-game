import FetchDataFromApi from '../../../hooks/fetchData';

export function getUserDetails(requestType, gameId, isApiCallTrue) {
    return FetchDataFromApi('/api/getMarketFactorInfoInput', isApiCallTrue, {
        "type": requestType,
        "gameId": gameId
    });
}
