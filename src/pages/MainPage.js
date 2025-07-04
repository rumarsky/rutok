import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import VideoFrame from '../components/VideoFrame';
import VideoFeed from '../components/VideoFeed';
import storageService from '../services/storageService';
import videoService from '../services/videoService';
import userService from '../services/userService';
import './MainPage.css';

const  romanAllVideos = await videoService.getAllUserVideos();
console.log(romanAllVideos, "roman videos");

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

const currVideos = await generateVideos(romanAllVideos,userService);
console.log(currVideos ,"All videos");

function MainPage() {
  const [search, setSearch] = useState('');
  const [openFeed, setOpenFeed] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleFrameClick = (idx) => {
    setCurrentIndex(idx);
    setOpenFeed(true);
  };

  //видосы сортируем от Ромы
  const filteredVideosAllsE = currVideos.filter(video =>
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
          {filteredVideosAllsE.map((video, idx) => (
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
                videos={currVideos}
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