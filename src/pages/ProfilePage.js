import React, { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import UploadModal from '../components/UploadModal';
import VideoFrame from '../components/VideoFrame';
import VideoFeed from '../components/VideoFeed';
import './ProfilePage.css';
import authService from '../services/authService';
import userService from '../services/userService';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

function ProfilePage() {
  const [showUpload, setShowUpload] = useState(false);
  const [openFeed, setOpenFeed] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [user, setUser] = useState(null);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = authService.getAccessToken();
        const payload = token ? jwtDecode(token) : null;
        const userId = payload?.user_id;
        if (!userId) {
          setError('Не удалось определить пользователя');
          return;
        }
        const userData = await userService.getUserById(userId);
        setUser(userData);
      } catch (e) {
        setError('Ошибка загрузки профиля');
      }
    };
    fetchUser();
  }, []);

  const userVideos = [
    // Здесь можно реализовать загрузку видео пользователя по user.id
    // Пока оставим как пример:
    {
      user: { avatar: user?.avatar || '', username: user?.username || '' },
      title: 'Мой первый ролик',
      description: 'Это мой первый ролик на RuTok!',
      tags: '#привет #rutok',
      likes: 10,
      comments: 2,
    },
    // ...другие видео
  ];

  const handleFrameClick = (idx) => {
    setCurrentIndex(idx);
    setOpenFeed(true);
  };

  const handleLogout = async () => {
    await authService.logout();
    navigate('/login');
  };

  if (error) {
    return <div className="main-page"><Sidebar /><div className="profile-content">{error}</div></div>;
  }

  if (!user) {
    return <div className="main-page"><Sidebar /><div className="profile-content">Загрузка...</div></div>;
  }

  return (
    <div className="main-page">
      <Sidebar />
      <div className="profile-content">
        <div className="profile-header">
          <img className="profile-avatar" src={user.avatar || 'https://i.pravatar.cc/120?img=3'} alt="Аватар" />
          <div className="profile-info">
            <div className="profile-username">@{user.username}</div>
            <div className="profile-name">{user.name || user.username}</div>
            <div className="profile-bio">{user.bio || ''}</div>
            <div className="profile-stats">
              {/* Здесь можно добавить реальные данные, если они есть в user */}
              <div><b>0</b> роликов</div>
              <div><b>0</b> подписчиков</div>
              <div><b>0</b> подписки</div>
              <div><b>0</b> лайков</div>
            </div>
            <button className="profile-logout-btn" onClick={handleLogout}>
              Выйти
            </button>
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