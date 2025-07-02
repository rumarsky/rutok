import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import './SettingsPage.css';

function SettingsPage() {
  const [name, setName] = useState('Иван Иванов');
  const [email, setEmail] = useState('user@example.com');
  const [theme, setTheme] = useState('dark');
  const [notifications, setNotifications] = useState(true);

  const handleSave = (e) => {
    e.preventDefault();
    alert('Настройки сохранены!');
    // Здесь можно реализовать отправку данных на сервер
  };

  return (
    <div className="main-page">
      <Sidebar />
      <div className="settings-content">
        <h1 className="settings-title">Настройки</h1>
        <form className="settings-form" onSubmit={handleSave}>
          <label>
            Имя:
            <input
              type="text"
              value={name}
              onChange={e => setName(e.target.value)}
            />
          </label>
          <label>
            Email:
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
          </label>
          <label>
            Тема:
            <select value={theme} onChange={e => setTheme(e.target.value)}>
              <option value="dark">Тёмная</option>
              <option value="light">Светлая</option>
            </select>
          </label>
          {/* <label className="settings-checkbox">
            <input
              type="checkbox"
              checked={notifications}
              onChange={e => setNotifications(e.target.checked)}
            />
            Получать уведомления
          </label> */}
          <button className="settings-save-btn" type="submit">Сохранить</button>
        </form>
      </div>
    </div>
  );
}

export default SettingsPage;