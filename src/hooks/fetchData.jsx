import { useState, useEffect } from "react";

function FetchDataFromApi(apiEndpoint, shouldTrigger, queryParams = null) {
    const apiBaseUrl = 'https://loving-humpback-monthly.ngrok-free.app';
    const [apiResponse, setApiResponse] = useState(null);
    const [apiFailureErrorRes, setApiFailureRes] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    let queryString = queryParams ? new URLSearchParams(queryParams).toString() : queryParams;
    let apiUrl = '';
    if (queryString) {
        apiUrl = apiBaseUrl + apiEndpoint + '?' + queryString;
    } else {
        apiUrl = apiBaseUrl + apiEndpoint;
    }

    useEffect(() => {
        async function makeApiCall() {
            try {
                setIsLoading(true);
                const res = await fetch(apiUrl, {
                    headers: {
                        'ngrok-skip-browser-warning': 'true'
                    }
                });
                if (!res.ok) {
                    throw new Error(`HTTP error! status: ${res.status}`);
                }
                const result = await res.json();
                setApiResponse(result);
            } catch (error) {
                setApiFailureRes(error.message);
            } finally {
                setIsLoading(false);
            }
        };

        if (shouldTrigger) {
            makeApiCall();
        }
    }, [shouldTrigger]);

    return { apiResponse, apiFailureErrorRes, isLoading };
}

export default FetchDataFromApi;