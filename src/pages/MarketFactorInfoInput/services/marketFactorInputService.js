import FetchDataFromApi from '../../../hooks/fetchData';

let initGetMarketFactorInput = {
    gameId: 'OpsMgt',
    gameBatch: null,
    productionMonth: null,
    marketInputId: null,
    partCategory: null,
    refTypeInfo: null,
    refTypePrice: null,
    cmdLine: null
};

export function getMarketFactorInfoFormData(queryParams) {
    return FetchDataFromApi('/api/getMarketFactorInfoInput', true, { ...initGetMarketFactorInput, ...queryParams });
}

export function getMarketFactorInfoTableData(queryParams, shouldTriggerApi) {
    return FetchDataFromApi('/api/getMarketFactorInfoInput', shouldTriggerApi, { ...initGetMarketFactorInput, ...queryParams });
}