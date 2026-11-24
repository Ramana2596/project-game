// ==========================================================
// Component Name : useWebActions
// Module         : WebOmtp (Landing)
// Purpose        : demo guest login, sign-in navigation, contact, scroll
// ==========================================================

// Imports
import { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useLoading } from "../../../hooks/loadingIndicatorContext.jsx";
import { useUser } from "../../../core/access/userContext.jsx";
import { getUserDetails } from "../../Welcome/services/service.js";
import { API_STATUS, API_STATUS_MAP } from "../../../utils/statusCodes.js";
import { FOOTER } from "../constants/content.js";

// Constants
const GUEST = { userEmail: "guest@guest.com", gameId: "OpsMgt" };
const DEMO_ROUTE = "/operationGame/demo";
const LOGIN_ROUTE = "/login";

const useWebActions = () => {
  // Global context access
  const navigate = useNavigate();
  const { setIsLoading } = useLoading();
  const { login, setUserInfo } = useUser();

  // State: toast message shown when demo login fails
  const [alertData, setAlertData] = useState({ open: false, message: "", severity: "info" });

  // Event handler: close the toast
  const closeAlert = useCallback(() => setAlertData((p) => ({ ...p, open: false })), []);

  // Event handler: sign in as guest and open the demo simulation
  const openDemo = useCallback(() => {
    setIsLoading(true);
    getUserDetails(GUEST)
      .then((response) => {
        // response is object
        const { success, sucValue, message, data } = response.data;
        if (success && data?.length > 0) {
          const u = data[0];
          login({ User_Id: u.User_Id, User_Login: u.User_Login, RL_Id: u.RL_Id, Role: u.Role });
          setUserInfo(u);
          navigate(DEMO_ROUTE);
        } else {
          setAlertData({
            open: true,
            message: message || "Error",
            severity: sucValue === 1 ? "warning" : "error",
          });
        }
      })
      .catch((err) =>
        setAlertData({
          open: true,
          message: typeof err.response?.data === "string" && err.response.data
            ? err.response.data
            : "Network Error",
          severity: "error",
        })
      )
      .finally(() => setIsLoading(false));
  }, [login, navigate, setIsLoading, setUserInfo]);

  // Event handler: go to the unified login / sign-up screen
  const getStarted = useCallback(() => navigate(LOGIN_ROUTE), [navigate]);

  // Event handler: open the contact link for Academia and Industry enquiries
  const contactUs = useCallback(() => { window.location.href = FOOTER.contact; }, []);

  // Event handler: smooth-scroll to a landing section
  const scrollTo = useCallback((id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  // Event handler: run a CTA by its action key (demo | start | contact)
  const runAction = useCallback((action) => {
    const map = { demo: openDemo, start: getStarted, contact: contactUs };
    (map[action] || getStarted)();
  }, [openDemo, getStarted, contactUs]);

  // AI Extension Hook (placeholder): Content Recommendation - suggest a starting audience path
  // const aiRecommendedAudience = useAiContentRecommender(); // future

  return { alertData, closeAlert, openDemo, getStarted, contactUs, scrollTo, runAction };
};

export default useWebActions;
