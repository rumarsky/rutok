import React, { useState, useEffect, useRef } from 'react';
import { MdFavorite, MdComment} from 'react-icons/md';
import CommentPanel from './CommentPanel';
import './VideoFeed.css';
import storageService from '../services/storageService';

function VideoFeed({ videos = [], initialIndex = 0, onClose }) {
  const [current, setCurrent] = useState(initialIndex);
  const [showComments, setShowComments] = useState(false);
  const [liked, setLiked] = useState(false);
  const [allVideos, setAllVideos] = useState(videos);

  const [videoUrl, setVideoUrl] = useState(null);
  const [loading, setLoading] = useState(true);

  const [isPlaying, setIsPlaying] = useState(true);


  const videoRef = useRef(null);

  const touchStartY = useRef(null);

  const video = allVideos[current];

  const handleAddComment = (text) => {
    setAllVideos(prev => {
      const updated = [...prev];
      updated[current] = {
        ...updated[current],
        commentsList: [
          ...(updated[current].commentsList || []),
          { author: 'Вы', text }
        ],
        comments: (updated[current].comments || 0) + 1,
      };
      return updated;
    });
  };
  //остановка на паузу 
  const togglePlayPause = () => {
    if (videoRef.current.paused) {
      videoRef.current.play();
      setIsPlaying(true);
    } else {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  };

  //для загрузки видео
  useEffect(() => {
    const loadVideo = async () => {
      if (!video?.idVideo) {
        setLoading(false);
        return;
      }
      
      setLoading(true);
      console.log('Начало загрузки видео, ID:', video.idVideo);
      
      try {
        const response = await storageService.getVideoUrl(video.idVideo);
        console.log('Ответ от сервера:', response);
        
        if (!response?.urlVideo) {
          throw new Error('URL видео не получен');
        }
        
        setVideoUrl(response.urlVideo);
      } catch (err) {
        console.error('Ошибка загрузки видео:', err);
      } finally {
        setLoading(false);
      }
    };

    loadVideo();
  }, [current, video?.idVideo]);
//управление воспроизведением
  useEffect(() => {
    if (videoRef.current && videoUrl) {
      videoRef.current.load();
      videoRef.current.play().catch(e => console.log('Автовоспроизведение не разрешено:', e));
    }
  }, [videoUrl]);

  // Клавиши вверх/вниз
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowUp' && current > 0) {
        setCurrent((prev) => prev - 1);
        setLiked(false);
      }
      if (e.key === 'ArrowDown' && current < videos.length - 1) {
        setCurrent((prev) => prev + 1);
        setLiked(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [current, videos.length]);

  // Свайп по ролику
  const handleTouchStart = (e) => {
    touchStartY.current = e.touches[0].clientY;
  };

  const handleTouchEnd = (e) => {
    if (touchStartY.current === null) return;
    const deltaY = e.changedTouches[0].clientY - touchStartY.current;
    if (deltaY < -50 && current < videos.length - 1) {
      setCurrent((prev) => prev + 1);
      setLiked(false);
    }
    if (deltaY > 50 && current > 0) {
      setCurrent((prev) => prev - 1);
      setLiked(false);
    }
    touchStartY.current = null;
  };

  if (!video) {
    return (
      <div className="video-feed">
        <div className="video-placeholder">
          <div className="video-content">Нет видео для отображения</div>
        </div>
      </div>
    );
  }

  const handleLike = () => setLiked((prev) => !prev);
  const handleCommentClick = () => setShowComments((prev) => !prev);

  return (
    <div className="video-feed">
      <div
        className="video-placeholder"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <div className="video-content">
            {/* Здесь будет видео или его превью */}
            {loading ? (
              <div>Загрузка видео...</div>
            ) : videoUrl ? (
              <video
                ref={videoRef}
                src={videoUrl}
                controls={false}
                loop
                playsInline
                onClick={togglePlayPause}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  borderRadius: '24px'
                }}
              />
            ) : (
              <div>Не удалось загрузить видео</div>
            )}
        </div>
        <div className="video-info">
          <div className="video-info-user">
            <img className="video-info-avatar" src={video.user.avatar} alt="Аватар" />
            <span className="video-info-username">@{video.user.username}</span>
          </div>
          <div className="video-title">{video.title}</div>
          <div className="video-description">{video.description}</div>
          <div className="video-tags">{video.tags}</div>
        </div>
        <div className="video-actions">
          <button
            className="video-action-btn"
            title="Лайк"
            onClick={handleLike}
          >
            <MdFavorite className={`video-action-icon${liked ? ' liked' : ''}`} />
          </button>
          <span className="video-action-count">{video.likes + (liked ? 1 : 0)}</span>
          <button
            className="video-action-btn"
            title="Комментарий"
            onClick={handleCommentClick}
          >
            <MdComment className="video-action-icon" />
          </button>
          <span className="video-action-count">{video.comments}</span>
        </div>
      </div>
      <CommentPanel
        visible={showComments}
        onClose={() => setShowComments(false)}
        comments={video.commentsList}
        onAddComment={handleAddComment}
      />
    </div>
  );
}

export default VideoFeed;