import './App.css';
import { Routes, Route } from 'react-router-dom';
import SignIn from './pages/SignIn/SignIn';
import LoadingIndicator from './components/LoadingIndicator';
import { LoadingProvider } from './hooks/loadingIndicatorContext';
import GameNavigationMenu from './pages/NavigationMenu/GameNavigationMenu';
import Welcome from './pages/Welcome/Welcome';
import Register from './pages/RegisterUser/RegisterPage';
import WelcomeOmtp from './pages/WelcomeOmtp/WelcomeOmtp'; 

function App() {
  return (
    <LoadingProvider>
      <div>
        <LoadingIndicator />
        <Routes>
          <Route path="/" element={<Welcome />}></Route>
          <Route path="/signIn" element={<SignIn />}></Route>
          <Route path="/register" element={<Register />}></Route>
          {/* Add the specific route for the Intro */}
          <Route path="/operationGame/welcomeOmtp" element={<WelcomeOmtp />} />

          <Route path="/operationGame/*" element={<GameNavigationMenu />} />
        </Routes>
      </div>
    </LoadingProvider>
  );
}

export default App;


