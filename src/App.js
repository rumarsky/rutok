import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainPage from './pages/MainPage';
import RecommendationPage from './pages/RecommendationPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/recommendations" element={<RecommendationPage />} />
        {/* Можно добавить другие страницы */}
      </Routes>
    </Router>
  );
}

export default App;