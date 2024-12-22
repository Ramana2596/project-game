import { useState, useEffect } from "react";

function UpdateApiCall(requestBody, apiUrl, shouldTrigger) {
    const apiBaseUrl = 'https://loving-humpback-monthly.ngrok-free.app';
    const [apiResponse, setApiResponse] = useState(null);
    const [apiFailureErrorRes, setApiFailureRes] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        async function makeApiCall() {
            try {
                setIsLoading(true);
                const res = await fetch(apiBaseUrl + apiUrl, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json', 'ngrok-skip-browser-warning': 'true' },
                    body: JSON.stringify(requestBody)
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

export default UpdateApiCall;