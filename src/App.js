import './App.css';
import { Routes, Route } from 'react-router-dom';
import GameToolBar from './pages/GameToolBar';
import SignIn from './pages/SignIn/SignIn';

function App() {

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<SignIn />}></Route>
        <Route path="/operationGame/*" element={<GameToolBar />}></Route>
      </Routes>
    </div>
  );
}

export default App;
