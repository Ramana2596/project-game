
// ==========================================================
// File    : src/App.js
// Purpose : Main application entry point with OMTP as default page
// ==========================================================

import "./App.css";
import { Routes, Route, Navigate } from "react-router-dom";
import { Box } from "@mui/material";

import { useUser } from "./core/access/userContext.jsx";

import LoadingIndicator from "./components/LoadingIndicator.jsx";
import { LoadingProvider } from "./hooks/loadingIndicatorContext.jsx";

import WebOmtp from "./pages/WebOmtp/WebOmtp.jsx";

import AuthHubPage from "./pages/AuthHubPage/AuthHubPage.jsx";
import NavigationMenu from "./pages/NavigationMenu/NavigationMenu.jsx";
import UserFeedback from "./pages/UserFeedback/UserFeedback.jsx";

// Existing welcome pages - retained but inactive
// import Welcome from "./pages/Welcome/Welcome.jsx";
// import WelcomeOmtp from "./pages/WelcomeOmtp/WelcomeOmtp.jsx";
// import OmtpWebsite from "./pages/OmtpWebsite/OmtpWebsite.jsx";

function App() {
  // Protect application routes for authenticated users only
  const ProtectedRoute = ({ children }) => {
    const { userInfo } = useUser();

    if (!userInfo) {
      return <Navigate to="/login" replace />;
    }

    return children;
  };

  // Main application routes with global loading and feedback context
  return (
    <LoadingProvider>
      {/* Reserve space for fixed feedback bar */}
      <Box
        sx={{
          minHeight: "100vh",
          pb: "32px",
        }}
      >
        <LoadingIndicator />

        {/* Application routes */}
        <Routes>
          {/* OMTP public website */}
          <Route path="/" element={<WebOmtp />} />
          <Route path="/WebOmtp" element={<WebOmtp />} />

          {/* Authentication routes */}
          <Route path="/login" element={<AuthHubPage />} />
          <Route path="/authHubPage" element={<AuthHubPage />} />

          {/* Protected OpsMgt application routes */}
          <Route
            path="/operationGame/*"
            element={
              <ProtectedRoute>
                <NavigationMenu />
              </ProtectedRoute>
            }
          />

          {/* Fallback route */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>

        {/* Global feedback bar */}
        <UserFeedback />
      </Box>
    </LoadingProvider>
  );
}

export default App;
