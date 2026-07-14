import "./App.css";
import { Routes, Route, Navigate } from "react-router-dom";
import { Box } from "@mui/material";

import { useUser } from "./core/access/userContext.jsx";

import LoadingIndicator from "./components/LoadingIndicator";
import { LoadingProvider } from "./hooks/loadingIndicatorContext";

import Welcome from "./pages/Welcome/Welcome";
import WelcomeOmtp from "./pages/WelcomeOmtp/WelcomeOmtp";
import AuthHubPage from "./pages/AuthHubPage/AuthHubPage.jsx";
import NavigationMenu from "./pages/NavigationMenu/NavigationMenu.jsx";
import UserFeedback from './pages/UserFeedback/UserFeedback';

function App() {

  const ProtectedRoute = ({ children }) => {
    const { userInfo } = useUser();

    if (!userInfo) {
      return <Navigate to="/login" replace />;
    }

    return children;
  };

  return (
    <LoadingProvider>

      {/* Reserve space for fixed feedback bar - bottom-most line */}
      <Box
        sx={{
          minHeight: '100vh',
          pb: '32px'
        }}
      >
        <LoadingIndicator />

        <Routes>
          <Route path="/" element={<Welcome />} />
          <Route path="/login" element={<AuthHubPage />} />
          <Route path="/authHubPage" element={<AuthHubPage />} />
          
          <Route
            path="/operationGame/welcomeOmtp"
            element={<WelcomeOmtp />}
          />

          <Route
            path="/operationGame/*"
            element={
              <ProtectedRoute>
                <NavigationMenu />
              </ProtectedRoute>
            }
          />

          <Route path="*" element={<Navigate to="/" />} />
        </Routes>

        <UserFeedback />

      </Box>

    </LoadingProvider>
  );
}

export default App;