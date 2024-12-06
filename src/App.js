import './App.css';
import { Routes, Route } from 'react-router-dom';
import GameToolBar from './pages/GameToolBar';
import SignIn from './pages/SignIn/SignIn';
import ProtectedRoute from './components/hoc/ProtectedRoute';
import AccessDenied from './components/AccessDenied';

function App() {

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<SignIn />}></Route>
        <Route path="/operationGame/*" element={<ProtectedRoute component={<GameToolBar />} permission="UI 001" />} />
        <Route path="/accessDenied" element={<AccessDenied />}></Route>
      </Routes>
    </div>
  );
}

export default App;
