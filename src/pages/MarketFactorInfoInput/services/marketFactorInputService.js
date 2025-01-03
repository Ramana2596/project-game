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

export function getMarketFactorInfoFormData(queryParams) {
    return FetchDataFromApi('/api/getMarketFactorInfoInput', true, { ...initGetMarketFactorInput, ...queryParams });
    // return api.get('/api/getMarketFactorInfoInput', {params: { ...initGetMarketFactorInput, ...queryParams }});
}

export function getMarketFactorInfoTableData(queryParams) {
    return api.get('/api/getMarketFactorInfoInput',
        {params: { ...initGetMarketFactorInput, ...queryParams }
    });
}

export function addMarketFactorInfoInput(marketFactorInfoInputPayload) {
    let payload = { ...marketFactorInfoInputPayload, cmdLine: 'Add_Market_Factor' }
    api.post('/api/updateMarketFactorInput', payload)
        .then(response => {
            console.log(response.data);
        })
        .catch(error => {
            console.error('Error posting data:', error);
        });
}

export function updateMarketFactorInfoInput(marketFactorInfoInputPayload) {
    let payload = { ...marketFactorInfoInputPayload, cmdLine: 'Update_Market_Factor' }
    api.post('/api/updateMarketFactorInput', payload)
        .then(response => {
            console.log(response.data);
        })
        .catch(error => {
            console.error('Error posting data:', error);
        });
}

export function deleteMarketFactorInfo(marketFactorInfoInputPayload) {
    let payload = { ...marketFactorInfoInputPayload, cmdLine: 'Delete_Market_Factor' };
    api.post('/api/updateMarketFactorInput', payload)
        .then(response => {
            console.log(response.data);
        })
        .catch(error => {
            console.error('Error posting data:', error);
        });
}