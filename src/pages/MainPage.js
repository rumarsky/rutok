import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import VideoFrame from '../components/VideoFrame';
import VideoFeed from '../components/VideoFeed';
import './MainPage.css';


//Данный массив формироваться будет по запросу к сервису Романа (все видео)
const videos = [
  {
    user: { avatar: 'https://i.pravatar.cc/40?img=5', username: 'rutok_user' },
    title: 'Весёлый котик',
    description: 'Котик играет с клубком. Смешно и мило!',
    tags: '#кот #милота #тренды',
    likes: 123,
    comments: 10,
    idVideo: 1, 
    commentsList: [
      { author: 'cat_lover', text: 'Какой милый!' },
      { author: 'user123', text: 'Хочу такого же кота!' },
    ],
  },
  {
    user: { avatar: 'https://i.pravatar.cc/40?img=6', username: 'skater_boy' },
    title: 'Трюки на скейте',
    description: 'Лучшие трюки этого лета!',
    tags: '#спорт #скейт #экстрим',
    likes: 98,
    comments: 7,
    idVideo: 2, //добавил id видоса
    commentsList: [
      { author: 'skatefan', text: 'Круто!' },
      { author: 'pro_skater', text: 'Давай ещё!' },
    ],
  },
  {
    user: { avatar: 'https://i.pravatar.cc/40?img=6', username: 'skater_boy' },
    title: 'Трюки на скейте',
    description: 'Лучшие трюки этого лета!',
    tags: '#спорт #скейт #экстрим',
    likes: 98,
    comments: 7,
    idVideo: 1, //добавил id видоса
    commentsList: [
      { author: 'skatefan', text: 'Круто!' },
      { author: 'pro_skater', text: 'Давай ещё!' },
    ],
  },
  {
    user: { avatar: 'https://i.pravatar.cc/40?img=6', username: 'skater_boy' },
    title: 'Трюки на скейте',
    description: 'Лучшие трюки этого лета!',
    tags: '#спорт #скейт #экстрим',
    likes: 98,
    comments: 7,
    idVideo: 6, //добавил id видоса
    commentsList: [
      { author: 'skatefan', text: 'Круто!' },
      { author: 'pro_skater', text: 'Давай ещё!' },
    ],
  },
  {
    user: { avatar: 'https://i.pravatar.cc/40?img=6', username: 'skater_boy' },
    title: 'Трюки на скейте',
    description: 'Лучшие трюки этого лета!',
    tags: '#спорт #скейт #экстрим',
    likes: 98,
    comments: 7,
    idVideo: 4, //добавил id видоса
    commentsList: [
      { author: 'skatefan', text: 'Круто!' },
      { author: 'pro_skater', text: 'Давай ещё!' },
    ],
  },
  // ...и так далее для всех видео
];

function MainPage() {
  const [search, setSearch] = useState('');
  const [openFeed, setOpenFeed] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleFrameClick = (idx) => {
    setCurrentIndex(idx);
    setOpenFeed(true);
  };

  const filteredVideos = videos.filter(video =>
    video.title.toLowerCase().includes(search.toLowerCase()) ||
    video.description.toLowerCase().includes(search.toLowerCase()) ||
    video.tags.toLowerCase().includes(search.toLowerCase()) ||
    video.user.username.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="main-page">
      <Sidebar />
      <div className="main-content">
        <input
          type="text"
          placeholder="Поиск роликов..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="search-input"
        />
        <div className="video-frame-list">
          {filteredVideos.map((video, idx) => (
            <VideoFrame
              key={idx}
              title={video.title}
              preview={video.idVideo}
              description={video.description}
              tags={video.tags}
              avatar={video.user.avatar}
              username={video.user.username}
              onClick={() => handleFrameClick(idx)}
            />
          ))}
        </div>
        {openFeed && (
          <div className="video-feed-modal-backdrop" onClick={() => setOpenFeed(false)}>
            <div className="video-feed-modal" onClick={e => e.stopPropagation()}>
              <VideoFeed
                videos={videos}
                initialIndex={currentIndex}
                onClose={() => setOpenFeed(false)}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default MainPage;