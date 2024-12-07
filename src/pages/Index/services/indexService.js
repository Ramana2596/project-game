import FetchDataFromApi from '../../../hooks/fetchData';

export function getUserAccessPageIds(userRole) {
    return FetchDataFromApi('/api/getUserAccessPageIds', true, {
        userRole
    })
}
