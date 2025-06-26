import React from 'react';
import './CommentPanel.css';

function CommentPanel({ visible, onClose }) {
  if (!visible) return null;

  return (
    <div className="comment-panel">
      <button className="comment-panel-close" onClick={onClose} title="Закрыть">×</button>
      <h2 className="comment-panel-title">Комментарии</h2>
      <div className="comment-panel-list">
        {/* Здесь будут комментарии */}
        <div className="comment-item">
          <div className="comment-author">user1</div>
          <div className="comment-text">Отличное видео!</div>
        </div>
        <div className="comment-item">
          <div className="comment-author">user2</div>
          <div className="comment-text">🔥🔥🔥</div>
        </div>
      </div>
      <div className="comment-panel-input">
        <input type="text" placeholder="Добавить комментарий..." />
        <button>Отправить</button>
      </div>
    </div>
  );
}

export default CommentPanel;