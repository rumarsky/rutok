import React , { useState, useEffect } from 'react';
import './VideoFrame.css';
import storageService from '../services/storageService';

function VideoFrame({ title, preview, description, tags, avatar, username, onClick }) {


  const [previewUrl, setPreviewUrl] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadPreview = async () => {
      try {
        setLoading(true);
        const response = await storageService.getPreviewUrl(preview);
        setPreviewUrl(response.urlPreview);
      } catch (err) {
        console.error('Failed to load preview:', err);
        setError('Не удалось загрузить превью');
      } finally {
        setLoading(false);
      }
    };

    if (preview) loadPreview();
  }, [preview]);


  return (
    <div className="video-frame" onClick={onClick} style={{ cursor: 'pointer' }}>
      <div className="video-frame-content">
        <div className="video-frame-preview">
          {loading ? (
            <div className="preview-loading">Загрузка...</div>
          ) : error ? (
            <div className="preview-error">{error}</div>
          ) : (
            <img src={previewUrl} alt="Превью видео" />
          )}
        </div>
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