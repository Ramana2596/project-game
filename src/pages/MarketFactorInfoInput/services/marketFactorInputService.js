import FetchDataFromApi from '../../../hooks/fetchData';

export function getMarketFactorInfoFormData(requestType, gameId) {
    return FetchDataFromApi('/api/getMarketFactorInfoInput', true, {
        "type": requestType,
        "gameId": gameId
    });
}