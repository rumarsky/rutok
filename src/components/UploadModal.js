import React, { useRef, useState } from 'react';
import './UploadModal.css';
import handleVideoService from "../services/handleVideoService";
import videoService from "../services/videoService";

function UploadModal({ visible, onClose }) {
  const [videoFile, setVideoFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState('');
  const [title, setTitle] = useState('');
  const [tags, setTags] = useState('');
  const [description, setDescription] = useState('');
  const fileInputRef = useRef();

  if (!visible) return null;

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setVideoFile(file);
    if (file) {
      setPreviewUrl(URL.createObjectURL(file));
    } else {
      setPreviewUrl('');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Здесь можно реализовать отправку данных на сервер
    const videoHandlerResponse = await handleVideoService.handleVideo(videoFile)
    if (videoHandlerResponse.videoId === undefined) {
      alert("Ошибка обработки и сохранения видео в хранилище.")
      return
    }
    const idVideo = videoHandlerResponse.videoId
    // const idVideo = 5
    const tags_arr = tags.split(' ')
    const videoServiceResponse = await videoService.uploadVideo(title, description, idVideo, tags_arr)
    if (typeof videoServiceResponse === 'number') {
      alert('Видео загружено!');
    } else {
      alert('Ошибка сохранения информации о видео.');
    }
    onClose();
  };

  return (
    <div className="upload-modal-backdrop">
      <div className="upload-modal">
        <button className="upload-modal-close" onClick={onClose} title="Закрыть">×</button>
        <h2 className="upload-modal-title">Загрузка видео</h2>
        <form className="upload-modal-form" onSubmit={handleSubmit}>
          <label className="upload-modal-label">
            <span>Выберите видео:</span>
            <input
              type="file"
              accept="video/*"
              onChange={handleFileChange}
              ref={fileInputRef}
              required
            />
          </label>
          {previewUrl && (
            <video className="upload-modal-preview" src={previewUrl} controls />
          )}
          <label className="upload-modal-label">
            <span>Название:</span>
            <input
              type="text"
              value={title}
              onChange={e => setTitle(e.target.value)}
              maxLength={50}
              required
            />
          </label>
          <label className="upload-modal-label">
            <span>Описание:</span>
            <textarea
              value={description}
              onChange={e => setDescription(e.target.value)}
              maxLength={200}
              rows={3}
            />
          </label>
          <label className="upload-modal-label">
            <span>Теги (через пробел):</span>
            <input
              type="text"
              value={tags}
              onChange={e => setTags(e.target.value)}
              placeholder="#тег1 #тег2"
            />
          </label>
          <button className="upload-modal-submit" type="submit">Загрузить</button>
        </form>
      </div>
    </div>
  );
}

export default UploadModal;