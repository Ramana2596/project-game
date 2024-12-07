import './App.css';
import { Routes, Route } from 'react-router-dom';
import Index from './pages/Index/Index';
import SignIn from './pages/SignIn/SignIn';

function App() {

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<SignIn />}></Route>
        <Route path="/operationGame/*" element={<Index />} />
      </Routes>
    </div>
  );
}

export default App;
