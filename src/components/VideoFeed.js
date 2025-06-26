import React, { useState } from 'react';
import { MdFavorite, MdComment } from 'react-icons/md';
import CommentPanel from './CommentPanel';
import './VideoFeed.css';

function VideoFeed() {
  const [showComments, setShowComments] = useState(false);
  const [liked, setLiked] = useState(false);
  const likes = 1234;
  const comments = 56;

  const handleLike = () => setLiked((prev) => !prev);

  const handleCommentClick = () => setShowComments((prev) => !prev);

  return (
    <div className="video-feed">
      <div className="video-placeholder">
        <div className="video-content">
          Вертикальный видеоролик
        </div>
        <div className="video-info">
          <div className="video-title">Название ролика</div>
          <div className="video-description">
            Краткое описание ролика. Здесь может быть несколько строк текста.
          </div>
          <div className="video-tags">
            #тренды&nbsp;&nbsp;#видео&nbsp;&nbsp;#rutok
          </div>
        </div>
        <div className="video-actions">
          <button
            className="video-action-btn"
            title="Лайк"
            onClick={handleLike}
          >
            <MdFavorite className={`video-action-icon${liked ? ' liked' : ''}`} />
          </button>
          <span className="video-action-count">{likes + (liked ? 1 : 0)}</span>
          <button
            className="video-action-btn"
            title="Комментарий"
            onClick={handleCommentClick}
          >
            <MdComment className="video-action-icon" />
          </button>
          <span className="video-action-count">{comments}</span>
        </div>
      </div>
      <CommentPanel visible={showComments} onClose={() => setShowComments(false)} />
    </div>
  );
}

export default VideoFeed;