import { useState, useEffect, useCallback, useMemo } from "react";
import { getPlantCapacity } from "../services/plantCapacityService";
import { useUser } from "../../../core/access/userContext";

export const usePlantCapacity = (props = {}) => {
  const { userInfo } = useUser();

  const [plant, setPlant] = useState(null);
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [tab, setTab] = useState("overview");
  const [filter, setFilter] = useState("all");

  const loadData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const payload = {
        gameId: props.gameId || userInfo?.gameId,
        gameBatch: props.gameBatch || userInfo?.gameBatch,
        gameTeam: props.gameTeam || userInfo?.gameTeam,
        productionMonth: props.productionMonth || userInfo?.productionMonth,
      };

      const response = await getPlantCapacity(payload);
      const data = response?.data || response;

      const workCentres = (data?.Work_Centre || []).map((item) => ({
        ...item,
        Capacity_Hours: item.Capacity_Hours != null ? Number(item.Capacity_Hours) : 0,
        Load_Hours: item.Load_Hours != null ? Number(item.Load_Hours) : 0,
        Mfg_Load_Percent: item.Mfg_Load_Percent != null ? Number(item.Mfg_Load_Percent) : 0,
        UOM: item.UOM || "Hrs",
      }));

      const plantInfo = data?.Plant?.[0] || {};
      const plantData = {
        ...plantInfo,
        Plant_Capacity_Hours: plantInfo.Plant_Capacity_Hours != null ? Number(plantInfo.Plant_Capacity_Hours) : 0,
        Plant_Load_Hours: plantInfo.Plant_Load_Hours != null ? Number(plantInfo.Plant_Load_Hours) : 0,
        Plant_Utilisation_Percent: plantInfo.Plant_Utilisation_Percent != null ? Number(plantInfo.Plant_Utilisation_Percent) : 0,
        UOM: plantInfo.UOM || "Hrs",
      };

      setPlant(plantData);
      setList(workCentres);
    } catch (err) {
      setError(err.message || "Error loading capacity data");
    } finally {
      setLoading(false);
    }
  }, [props, userInfo]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const criticalCount = useMemo(() => {
    return list.filter((item) => item.Critical_Mc === 1).length;
  }, [list]);

  const workCentres = useMemo(() => {
    if (filter === "critical") return list.filter((item) => item.Critical_Mc === 1);
    if (filter === "high") return list.filter((item) => item.Mfg_Load_Percent >= 85);
    return list;
  }, [list, filter]);

  return {
    plant,
    workCentres,
    criticalCount,
    loading,
    error,
    activeTab: tab,
    setActiveTab: setTab,
    filter,
    setFilter,
    reload: loadData,
  };
};