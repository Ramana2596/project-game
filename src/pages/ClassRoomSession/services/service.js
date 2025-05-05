import api from '../../../core/interceptor/api-interceptor';

export function getClassRoomSession(queryParams) {
    return api.get('/api/getClassRoomSession',
        {
            params: { ...queryParams }
        });
}
