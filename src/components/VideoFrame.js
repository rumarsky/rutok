import React from 'react';
import './VideoFrame.css';

function VideoFrame({ title, description, tags, avatar, username, onClick }) {
  return (
    <div className="video-frame" onClick={onClick} style={{ cursor: 'pointer' }}>
      <div className="video-frame-content">
        <div className="video-frame-preview">Видео</div>
        <div className="video-frame-info">
          <div className="video-frame-user">
            <img
              className="video-frame-avatar"
              src={avatar}
              alt="Аватар"
            />
            <span className="video-frame-username">{username}</span>
          </div>
          <div className="video-frame-title">{title}</div>
          <div className="video-frame-description">{description}</div>
          <div className="video-frame-tags">{tags}</div>
        </div>
      </div>
    </div>
  );
}

export default VideoFrame;