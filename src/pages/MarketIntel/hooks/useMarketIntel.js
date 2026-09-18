
/**
 * Component Name: UseMarketIntel
 * Module: Market Intelligence
 * Purpose: Manages state, session context parameters, and API orchestration for market intelligence data.
 * AI Tags: hook, state-management, market-intel, user-context
 */

import { useState, useEffect, useCallback } from 'react';
import { useUser } from '../../../core/access/userContext';
import { getMarketInfoTeam } from '../services/mktIntelService';

export function useMarketIntel(productionMonth) {
    const { userInfo } = useUser();
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // Dynamic query parameters initialized from UserContext
    const [queryParams, setQueryParams] = useState({
        Game_Id: userInfo?.gameId || 'OpsMgt',
        Game_Batch: userInfo?.gameBatch,
        Game_Team: userInfo?.gameTeam,
        Production_Month: productionMonth,
        Category: ''
    });

    // Synchronize query parameters when session context changes
    useEffect(() => {
        if (userInfo?.gameId && userInfo?.gameBatch && userInfo?.gameTeam) {
            setQueryParams(prev => ({
                ...prev,
                Game_Id: userInfo.gameId,
                Game_Batch: userInfo.gameBatch,
                Game_Team: userInfo.gameTeam
            }));
        }
    }, [userInfo]);

    // Fetch market intelligence data
    const fetchMarketData = useCallback(async () => {
        if (!queryParams.Game_Batch || !queryParams.Game_Team) return;

        setLoading(true);
        setError(null);

        try {
            const response = await getMarketInfoTeam({
                gameId: queryParams.Game_Id,
                gameBatch: queryParams.Game_Batch,
                gameTeam: queryParams.Game_Team,
                productionMonth: queryParams.Production_Month
            });

            setData(Array.isArray(response.data?.data) ? response.data.data : []);
        } catch (err) {
            setError(err.message || 'Failed to fetch market intelligence data');
        } finally {
            setLoading(false);
        }
    }, [queryParams]);

    useEffect(() => {
        fetchMarketData();
    }, [fetchMarketData]);

    // Update local filters
    const updateFilters = (newParams) => {
        setQueryParams(prev => ({
            ...prev,
            ...newParams
        }));
    };

    return {
        data,
        loading,
        error,
        queryParams,
        updateFilters,
        refetch: fetchMarketData
    };
}
