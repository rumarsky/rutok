import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import UploadModal from '../components/UploadModal';
import VideoFrame from '../components/VideoFrame';
import VideoFeed from '../components/VideoFeed';
import './ProfilePage.css';

function ProfilePage() {
  const [showUpload, setShowUpload] = useState(false);
  const [openFeed, setOpenFeed] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Примерные данные пользователя
  const user = {
    avatar: 'https://i.pravatar.cc/120?img=3',
    username: 'rutok_user',
    name: 'Иван Иванов',
    bio: 'Люблю снимать короткие видео и делиться ими с миром!',
    stats: {
      videos: 12,
      followers: 340,
      following: 27,
      likes: 1500,
    },
  };

  // Примерные ролики пользователя
  const userVideos = [
    {
      user: { avatar: user.avatar, username: user.username },
      title: 'Мой первый ролик',
      description: 'Это мой первый ролик на RuTok!',
      tags: '#привет #rutok',
      likes: 10,
      comments: 2,
    },
    {
      user: { avatar: user.avatar, username: user.username },
      title: 'Путешествие',
      description: 'Красивые виды и море эмоций.',
      tags: '#путешествие #влог',
      likes: 25,
      comments: 5,
    },
    {
      user: { avatar: user.avatar, username: user.username },
      title: 'Трюк с котом',
      description: 'Котик делает сальто!',
      tags: '#кот #трюк #милота',
      likes: 42,
      comments: 7,
    },
  ];

  const handleFrameClick = (idx) => {
    setCurrentIndex(idx);
    setOpenFeed(true);
  };

  return (
    <div className="main-page">
      <Sidebar />
      <div className="profile-content">
        <div className="profile-header">
          <img className="profile-avatar" src={user.avatar} alt="Аватар" />
          <div className="profile-info">
            <div className="profile-username">@{user.username}</div>
            <div className="profile-name">{user.name}</div>
            <div className="profile-bio">{user.bio}</div>
            <div className="profile-stats">
              <div><b>{user.stats.videos}</b> роликов</div>
              <div><b>{user.stats.followers}</b> подписчиков</div>
              <div><b>{user.stats.following}</b> подписки</div>
              <div><b>{user.stats.likes}</b> лайков</div>
            </div>
          </div>
        </div>
        <button
          className="profile-upload-btn"
          onClick={() => setShowUpload(true)}
        >
          Загрузить видео
        </button>
        <h2 className="profile-videos-title">Мои ролики</h2>
        <div className="profile-videos-list">
          {userVideos.map((video, idx) => (
            <VideoFrame
              key={idx}
              title={video.title}
              description={video.description}
              tags={video.tags}
              avatar={video.user.avatar}
              username={video.user.username}
              onClick={() => handleFrameClick(idx)}
            />
          ))}
        </div>
      </div>
      <UploadModal visible={showUpload} onClose={() => setShowUpload(false)} />
      {openFeed && (
        <div className="video-feed-modal-backdrop" onClick={() => setOpenFeed(false)}>
          <div className="video-feed-modal" onClick={e => e.stopPropagation()}>
            <VideoFeed
              videos={userVideos}
              initialIndex={currentIndex}
              onClose={() => setOpenFeed(false)}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default ProfilePage;