import React from 'react';
import { Routes, Route } from 'react-router-dom';
import NavigationBar from './components/NavigationBar';
import TransactionsPage from './pages/TransactionsPage';
import BalancePage from './pages/BalancePage';


function App() {
  return (
    <div>
      <NavigationBar />
      <div className="container mt-4">
        <Routes>
          <Route path="/" element={<TransactionsPage />} />
          <Route path="/balance" element={<BalancePage />} />
          
        </Routes>
      </div>
    </div>
  );
}

export default App;
