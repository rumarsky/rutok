import React from 'react';
import Sidebar from '../components/Sidebar';
import VideoFrame from '../components/VideoFrame';
import './MainPage.css';

function MainPage() {
  return (
    <div className="main-page">
      <Sidebar />
      <div className="main-content">
        <h1>Добро пожаловать в RuTok!</h1>
        <div className="video-frame-list">
          <VideoFrame
            title="Весёлый котик"
            description="Котик играет с клубком. Смешно и мило!"
            tags="#кот #милота #тренды"
          />
          <VideoFrame
            title="Трюки на скейте"
            description="Лучшие трюки этого лета!"
            tags="#спорт #скейт #экстрим"
          />
          <VideoFrame
            title="Рецепт пиццы"
            description="Готовим вкусную пиццу дома."
            tags="#еда #рецепты #пицца"
          />
          <VideoFrame
            title="Рецепт пиццы"
            description="Готовим вкусную пиццу дома."
            tags="#еда #рецепты #пицца"
          />
        </div>
      </div>
    </div>
  );
}

export default MainPage;