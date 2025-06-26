import React from 'react';
import './VideoFrame.css';

function VideoFrame({ title, description, tags }) {
  return (
    <div className="video-frame">
      <div className="video-frame-content">
        {/* Здесь может быть превью или заглушка */}
        <div className="video-frame-preview">Видео</div>
        <div className="video-frame-info">
          <div className="video-frame-title">{title}</div>
          <div className="video-frame-description">{description}</div>
          <div className="video-frame-tags">{tags}</div>
        </div>
      </div>
    </div>
  );
}

export default VideoFrame;