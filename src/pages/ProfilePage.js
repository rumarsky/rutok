import React from 'react';
import Sidebar from '../components/Sidebar';
import './ProfilePage.css';

function ProfilePage() {
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
        <h2 className="profile-videos-title">Мои ролики</h2>
        <div className="profile-videos-list">
          {/* Здесь можно отобразить VideoFrame или превью роликов пользователя */}
          {/* <VideoFrame ... /> */}
          <div className="profile-video-placeholder">Видео 1</div>
          <div className="profile-video-placeholder">Видео 2</div>
          <div className="profile-video-placeholder">Видео 3</div>
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;