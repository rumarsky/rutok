import React, { useState } from 'react';
import './CommentPanel.css';
import videoService from '../services/videoService';

function CommentPanel({ visible, onClose, comments = [], onAddComment, videoId }) {
  const [input, setInput] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);

  if (!visible) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim() || isSubmitting) return;
    
    setIsSubmitting(true);
    setError(null);

    try {
      //отсылаем коммент
      await videoService.addComment(input.trim(), videoId);
      
      //обновляем UI
      onAddComment(input.trim());
      
      //очищаем поле ввода
      setInput('');
    } catch (err) {
      console.error('Ошибка при добавлении комментария:', err);
      setError('Не удалось отправить комментарий');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="comment-panel">
      <button className="comment-panel-close" onClick={onClose} title="Закрыть">×</button>
      <h2 className="comment-panel-title">Комментарии</h2>
      {error && <div className="comment-error">{error}</div>}
      <div className="comment-panel-list">
        {comments.length === 0 && <div className="comment-item">Нет комментариев</div>}
        {comments.map((c, idx) => (
          <div className="comment-item" key={idx}>
            <div className="comment-author">{c.author}</div>
            <div className="comment-text">{c.text}</div>
          </div>
        ))}
      </div>
      <form className="comment-panel-input" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Добавить комментарий..."
          value={input}
          onChange={e => setInput(e.target.value)}
          disabled={isSubmitting}
        />
        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Отправка...' : 'Отправить'}
        </button>
      </form>
    </div>
  );
}

export default CommentPanel;