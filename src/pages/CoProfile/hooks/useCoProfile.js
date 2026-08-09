// ============================================================
// Component: useCoProfile
// Module: Company Profile
// Purpose: Company Profile data and UI state management
// AI Tags: company-profile, products, navigation, data-hook
// ============================================================

import {
  useCallback,
  useEffect,
  useState,
} from "react";

import { getProducts } from "../services/coProfileService";

// ------------------------------------------------------------
// Company Profile Hook
// ------------------------------------------------------------
export function useCoProfile(userInfo) {

  // ----------------------------------------------------------
  // Component State
  // ----------------------------------------------------------
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState("PRODUCT");

  // ----------------------------------------------------------
  // Load Product information
  // ----------------------------------------------------------
  const loadProducts = useCallback(async () => {
    if (!userInfo?.gameId) return;

    setLoading(true);
    setError(null);

    try {
      const queryParams = {
        gameId: userInfo.gameId,
        gameBatch: userInfo.gameBatch,
        gameTeam: userInfo.gameTeam,
      };

      const response = await getProducts(queryParams);

      setProducts(response?.data ?? []);
    } catch (err) {
      console.error(
        "Company Profile - Product data load failed:",
        err
      );

      setError(err);
      setProducts([]);
    } finally {
      setLoading(false);
    }
  }, [userInfo]);

  // ----------------------------------------------------------
  // Load data when authenticated user is available
  // ----------------------------------------------------------
  useEffect(() => {
    loadProducts();
  }, [loadProducts]);

  // ----------------------------------------------------------
  // AI Extension Hook
  // Reserved for future Company Profile intelligence
  // ----------------------------------------------------------
  // Future extensions:
  // - Product recommendation
  // - Company insights
  // - Learning analytics

  // ----------------------------------------------------------
  // Expose Hook API
  // ----------------------------------------------------------
  return {
    products,
    loading,
    error,
    activeTab,
    setActiveTab,
    loadProducts,
  };
}