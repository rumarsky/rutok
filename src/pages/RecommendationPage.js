import React from 'react';
import Sidebar from '../components/Sidebar';
import VideoFeed from '../components/VideoFeed';
import './RecommendationPage.css';

const recommendedVideos = [
  {
    user: { avatar: 'https://i.pravatar.cc/40?img=8', username: 'trend_maker' },
    title: 'Трендовый ролик',
    description: 'Самое популярное видео недели!',
    tags: '#тренды #рукок',
    likes: 321,
    comments: 18,
  },
  {
    user: { avatar: 'https://i.pravatar.cc/40?img=9', username: 'funny_dog' },
    title: 'Смешной пёс',
    description: 'Пёсик танцует под музыку!',
    tags: '#пёс #юмор #танцы',
    likes: 156,
    comments: 12,
  },
  {
    user: { avatar: 'https://i.pravatar.cc/40?img=10', username: 'vloger' },
    title: 'Влог из путешествия',
    description: 'Путешествие по Европе за 7 дней.',
    tags: '#влог #путешествие #европа',
    likes: 187,
    comments: 9,
  },
  {
    user: { avatar: 'https://i.pravatar.cc/40?img=11', username: 'dancer' },
    title: 'Танцевальный баттл',
    description: 'Кто победит в этом баттле?',
    tags: '#танцы #баттл #шоу',
    likes: 245,
    comments: 22,
  },
  {
    user: { avatar: 'https://i.pravatar.cc/40?img=12', username: 'artist' },
    title: 'Рисуем портрет',
    description: 'Портрет за 5 минут? Легко!',
    tags: '#арт #рисование #портрет',
    likes: 134,
    comments: 6,
  },
  {
    user: { avatar: 'https://i.pravatar.cc/40?img=13', username: 'chef' },
    title: 'Готовим бургер',
    description: 'Лучший домашний бургер за 10 минут.',
    tags: '#еда #бургер #рецепт',
    likes: 201,
    comments: 14,
  },
  {
    user: { avatar: 'https://i.pravatar.cc/40?img=14', username: 'gamer' },
    title: 'Лучшие моменты в игре',
    description: 'Топ-5 эпичных моментов!',
    tags: '#игры #гейминг #топ',
    likes: 178,
    comments: 11,
  },
  {
    user: { avatar: 'https://i.pravatar.cc/40?img=15', username: 'nature' },
    title: 'Красота природы',
    description: 'Восхитительные пейзажи и закаты.',
    tags: '#природа #пейзаж #закат',
    likes: 222,
    comments: 17,
  },
];

function RecommendationPage() {
  return (
    <div className="main-page">
      <Sidebar />
      <div className="main-content">
        <VideoFeed videos={recommendedVideos} initialIndex={0} />
      </div>
    </div>
  );
}

export default RecommendationPage;