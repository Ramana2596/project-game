import './App.css';
import { Routes, Route } from 'react-router-dom';
import SignIn from './pages/SignIn/SignIn';
import LoadingIndicator from './components/LoadingIndicator';
import { LoadingProvider } from './hooks/loadingIndicatorContext';
import GameNavigationMenu from './pages/NavigationMenu/GameNavigationMenu';
import WelcomePage from './pages/Welcome/Welocme';

function App() {
  return (
    <LoadingProvider>
      <div className="App">
        <LoadingIndicator />
        <Routes>
          <Route path="/" element={<WelcomePage />}></Route>
          <Route path="/signIn" element={<SignIn />}></Route>
          <Route path="/operationGame/*" element={<GameNavigationMenu />} />
        </Routes>
      </div>
    </LoadingProvider>
  );
}

export default App;
