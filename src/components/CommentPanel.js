import React, { useState } from 'react';
import './CommentPanel.css';

function CommentPanel({ visible, onClose, comments = [], onAddComment }) {
  const [input, setInput] = useState('');

  if (!visible) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim()) {
      onAddComment(input.trim());
      setInput('');
    }
  };

  return (
    <div className="comment-panel">
      <button className="comment-panel-close" onClick={onClose} title="Закрыть">×</button>
      <h2 className="comment-panel-title">Комментарии</h2>
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
        />
        <button type="submit">Отправить</button>
      </form>
    </div>
  );
}

export default CommentPanel;