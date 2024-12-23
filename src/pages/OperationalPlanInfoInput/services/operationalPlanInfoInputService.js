import FetchDataFromApi from '../../../hooks/fetchData';
import api from '../../../core/interceptor/api-interceptor';

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

export function getOperationalPlanInfoData(queryParams) {
    return FetchDataFromApi('/api/getOperationalPlanInfoInput', true, { ...initGetMarketFactorInput, ...queryParams });
}

export function getOperationalPlanInfoTableData(queryParams, shouldTriggerApi) {
    return FetchDataFromApi('/api/getOperationalPlanInfoInput', shouldTriggerApi, { ...initGetMarketFactorInput, ...queryParams });
}

export function addOperationalPlanInfo(marketFactorInfoInputPayload) {
    let payload = { ...marketFactorInfoInputPayload, cmdLine: 'Add_Operation_Plan' }
    api.post('/api/updateOperationalPlanInfo', payload)
        .then(response => {
            console.log(response.data);
        })
        .catch(error => {
            console.error('Error posting data:', error);
        });
}

export function updateOperationalPlanInfoInput(marketFactorInfoInputPayload) {
    let payload = { ...marketFactorInfoInputPayload, cmdLine: 'Update_Operation_Plan' }
    api.post('/api/updateOperationalPlanInfo', payload)
        .then(response => {
            console.log(response.data);
        })
        .catch(error => {
            console.error('Error posting data:', error);
        });
}

export function deleteOperationalPlanInfo(marketFactorInfoInputPayload) {
    let payload = { ...marketFactorInfoInputPayload, cmdLine: 'Delete_Operation_Plan' };
    api.post('/api/updateOperationalPlanInfo', payload)
        .then(response => {
            console.log(response.data);
        })
        .catch(error => {
            console.error('Error posting data:', error);
        });
}