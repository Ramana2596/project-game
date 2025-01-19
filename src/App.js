import './App.css';
import { Routes, Route } from 'react-router-dom';
import Index from './pages/Index/Index';
import SignIn from './pages/SignIn/SignIn';
import LoadingIndicator from './components/LoadingIndicator';
import { LoadingProvider } from './hooks/loadingIndicatorContext';

function App() {
  return (
    <LoadingProvider>
      <div className="App">
        <LoadingIndicator />
        <Routes>
          <Route path="/" element={<SignIn />}></Route>
          <Route path="/operationGame/*" element={<Index />} />
        </Routes>
      </div>
    </LoadingProvider>
  );
}

export default App;
