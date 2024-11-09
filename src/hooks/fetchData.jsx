import { useState, useEffect } from "react";

function FetchDataFromApi(apiUrl, shouldTrigger) {
    const [apiResponse, setApiResponse] = useState(null);
    const [apiFailureErrorRes, setApiFailureRes] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        async function makeApiCall() {
            try {
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
    }, [apiUrl, shouldTrigger]);

    return { apiResponse, apiFailureErrorRes, isLoading };
}

export default FetchDataFromApi;