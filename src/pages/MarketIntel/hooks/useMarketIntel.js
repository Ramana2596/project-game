
/**
 * Component Name: UseMarketIntel
 * Module: Market Intelligence
 * Purpose: Manages session parameters, month input, category filter, and market data retrieval.
 * AI Tags: hook, market-intelligence, user-context, api, filter
 */

import { useState, useEffect, useCallback } from 'react';
import { useUser } from '../../../core/access/userContext';
import { getMarketInfoTeam } from '../services/mktIntelService';

export function useMarketIntel(productionMonth) {
    const { userInfo } = useUser();
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [queryParams, setQueryParams] = useState({
        Game_Id: userInfo?.gameId || 'OpsMgt',
        Game_Batch: userInfo?.gameBatch,
        Game_Team: userInfo?.gameTeam,
        Category: ''
    });

    // Synchronize session context
    useEffect(() => {
        setQueryParams(prev => ({
            ...prev,
            Game_Id: userInfo?.gameId || 'OpsMgt',
            Game_Batch: userInfo?.gameBatch,
            Game_Team: userInfo?.gameTeam
        }));
    }, [userInfo]);

    // Fetch market intelligence data
    const fetchMarketData = useCallback(async () => {
        if (!queryParams.Game_Batch || !queryParams.Game_Team) return;

        setLoading(true);
        setError(null);

        try {
            const month = productionMonth
                ? new Date(productionMonth).toISOString().split('T')[0]
                : null;

            const response = await getMarketInfoTeam({
                gameId: queryParams.Game_Id,
                gameBatch: queryParams.Game_Batch,
                gameTeam: queryParams.Game_Team,
                productionMonth: month
            });

            setData(Array.isArray(response.data?.data) ? response.data.data : []);
        } catch (err) {
            setError(err.message || 'Failed to fetch market intelligence data');
        } finally {
            setLoading(false);
        }
    }, [queryParams.Game_Id, queryParams.Game_Batch, queryParams.Game_Team, productionMonth]);

    useEffect(() => {
        fetchMarketData();
    }, [fetchMarketData]);

    // Update UI filters
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
