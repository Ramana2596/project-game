// file: src/App.js
// Purpose: Main application entry point with routing and global context providers.

import "./App.css";
import { Routes, Route, Navigate } from "react-router-dom";
import { useUser } from "./core/access/userContext.jsx";

import LoadingIndicator from "./components/LoadingIndicator";
import { LoadingProvider } from "./hooks/loadingIndicatorContext";

// Pages to be rendered based on route
import Welcome from "./pages/Welcome/Welcome";
import WelcomeOmtp from "./pages/WelcomeOmtp/WelcomeOmtp";
import AuthHubPage from "./pages/AuthHubPage/AuthHubPage.jsx";
import GameNavigationMenu from "./pages/NavigationMenu/GameNavigationMenu";
import UserFeedback from './pages/UserFeedback/UserFeedback';


function App() {
  // Protect application routes for authenticated users only
  const ProtectedRoute = ({ children }) => {
    const { userInfo } = useUser();

    if (!userInfo) {
      return <Navigate to="/login" replace />;
    }

    return children;
  };

// Main application routes with loading context provider
  return (
    <LoadingProvider>
      <div>
        <LoadingIndicator />

        <Routes>
          <Route path="/" element={<Welcome />} />
          <Route path="/login" element={<AuthHubPage />} />
          <Route
            path="/operationGame/welcomeOmtp"
            element={<WelcomeOmtp />}
          />
          <Route
            path="/operationGame/*"
            element={
              <ProtectedRoute>
                <GameNavigationMenu />
              </ProtectedRoute>
            }
          />

          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
        <UserFeedback />   {/* User feedback component */}
      </div>
    </LoadingProvider>
  );
}

export default App;