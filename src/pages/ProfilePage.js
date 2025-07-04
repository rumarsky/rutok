
import React, { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import UploadModal from '../components/UploadModal';
import VideoFrame from '../components/VideoFrame';
import VideoFeed from '../components/VideoFeed';
import './ProfilePage.css';
import authService from '../services/authService';
import userService from '../services/userService';
import videoService from '../services/videoService';

import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';


async function generateVideos(apiVideos, userService) {
  return await Promise.all(apiVideos.map(async video => {
    //username
    let username = 'Unknown User';
    try {
      const user = await userService.getUserById(video.userId); 
      if (user && typeof user.username === 'string') {
        username = user.username;
      } else {
        console.warn(`No valid username for userId: ${video.userId}`);
      }
    } catch (error) {
      console.error(`Error fetching user for userId ${video.userId}:`, error);
    }

     //tags
    const tagsString = Array.isArray(video.tags)
    ? video.tags.map(tag => `#${tag.ruTag}`).join(' ')
    : '';

    //comments
    let comList = [];
    console.log(video.id, "curr id video");
    try{
      const comFromApi = await videoService.getVideoComments(video.id);
      console.log(comFromApi, "all comments");

      comList = await Promise.all(comFromApi.map(async comment => {
        let username = 'Unknown User';
        const user = await userService.getUserById(comment.userId);
        username = user.username;  
        return {
          author: username,
          text: comment.text
        };
      }));
    } catch (error){
      if (error.response?.status !== 404) { //игнор 404 ошибки
        console.error(`Error fetching comments for video ${video.id}:`, error);
      }
    }

    console.log(comList, "comment list for video");

    return {
      id:video.id,
      user: {
        avatar: 'https://i.pinimg.com/736x/fb/ee/5a/fbee5a490521126a19dcc0e8d5d56485.jpg',
        username
      },
      title: video.name || 'Untitled Video',
      description: video.description || '',
      tags: tagsString,
      likes: video.likes || 0,
      comments: video.commentsCount || 0,
      idVideo: video.idVideo || 0,
      commentsList: comList 
    };
  }));
}

function ProfilePage() {
  const [showUpload, setShowUpload] = useState(false);
  const [openFeed, setOpenFeed] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [user, setUser] = useState(null);

  const [error, setError] = useState('');
  const [userVid, setUserVideos] = useState([]);

  const [videosCount, setVideosCount] = useState(0);
  const [totalLikes, setTotalLikes] = useState(0);

  const navigate = useNavigate();

  const [notification, setNotification] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = authService.getAccessToken();
        const payload = token ? jwtDecode(token) : null;
        const userId = payload?.user_id;

        console.log("User ID : " +  userId );

        if (!userId) {
          setError("Не удалось определить пользователя");
          return;
        }
        const userData = await userService.getUserById(userId);
        setUser(userData);
        
        const romanVideo = await videoService.getUserVideosID(userId);
        console.log(romanVideo, "ids videos");

        const uservideos = [];
        for (const id in romanVideo){
          const videoInf = await videoService.getVideoByID(romanVideo[id]);
          uservideos.push(videoInf);
        }

        const currVideos = await generateVideos(uservideos,userService);
        console.log(currVideos ,"All videos");
        
        setUserVideos(currVideos);
        setVideosCount(currVideos.length);
        setTotalLikes(currVideos.reduce((sum, video) => sum + (video.likes || 0), 0));
      } catch (e) {
        setError("Ошибка загрузки профиля");
      }
    };
    fetchUser();
  }, []);

  const handleFrameClick = (idx) => {
    setCurrentIndex(idx);
    setOpenFeed(true);
  };

  const handleLogout = async () => {
    await authService.logout();
    navigate("/login");
  };

  if (error) {
    return (
      <div className="main-page">
        <Sidebar />
        <div className="profile-content">{error}</div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="main-page">
        <Sidebar />
        <div className="profile-content">Загрузка...</div>
      </div>
    );
  }

  return (
    <div className="main-page">
      <Sidebar />
      <div className="profile-content">
        <div className="profile-header">
          <img
            className="profile-avatar"
            src={user.avatar || 'https://i.pinimg.com/736x/fb/ee/5a/fbee5a490521126a19dcc0e8d5d56485.jpg'}
            alt="Аватар"
          />
          <div className="profile-info">
            <div className="profile-username">@{user.username}</div>
            <div className="profile-name">{user.name || user.username}</div>
            <div className="profile-bio">{user.bio || ""}</div>
            <div className="profile-stats">
              {/* Здесь можно добавить реальные данные, если они есть в user */}
              <div>
                <b>{videosCount}</b> роликов
              </div>
              {/* <div>
                <b>0</b> подписчиков
              </div>
              <div>
                <b>0</b> подписки
              </div> */}
              <div>
                <b>{totalLikes}</b> лайков
              </div>
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
          {userVid.map((video, idx) => (
            <VideoFrame
              key={idx}
              title={video.title}

              preview={video.idVideo} //передаем ссылку на превью

              description={video.description}
              tags={video.tags}
              avatar={video.user.avatar ||'https://i.pravatar.cc/120?img=3'}
              username={video.user.username}
              onClick={() => handleFrameClick(idx)}
            />
          ))}
        </div>
      </div>
      <UploadModal visible={showUpload} onClose={() => {
        setShowUpload(false)
        setNotification({ type: 'success', message: 'Видео загружено!' })
      }} />
      {openFeed && (
        <div
          className="video-feed-modal-backdrop"
          onClick={() => setOpenFeed(false)}
        >
          <div
            className="video-feed-modal"
            onClick={(e) => e.stopPropagation()}
          >
            <VideoFeed
              videos={userVid}
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
