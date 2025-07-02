import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import userService from "../services/userService";
import authService from "../services/authService";
import Notification from "../components/Notification"; // Импортируем компонент уведомления
import { jwtDecode } from "jwt-decode";
import "./SettingsPage.css";

function SettingsPage() {
  const [name, setName] = useState(null);
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [error, setError] = useState(null);
  const [theme, setTheme] = useState("dark");
  const [notification, setNotification] = useState(null); 

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = authService.getAccessToken();
        const payload = token ? jwtDecode(token) : null;
        const userId = payload?.user_id;
        const userData = await userService.getUserById(userId);

        setName(userData.username || "");
        setEmail(userData.email || "");
        setPassword(userData.password || "");
      } catch (error) {
        setError(`Ошибка загрузки данных пользователя: ${error.message}`);
        setNotification({
          message: `Ошибка загрузки данных: ${error.message}`,
          type: "error",
        });
      }
    };

    fetchUserData();
  }, []);

  if (name === null) {
    return (
      <div className="main-page">
        <Sidebar />
        <div className="settings-content">
          <h1 className="settings-title">Настройки</h1>
          <div className="settings-skeleton">{/* Skeleton Loading */}</div>
        </div>
      </div>
    );
  }

  const handleSave = (e) => {
    e.preventDefault();
    const token = authService.getAccessToken();
    const payload = token ? jwtDecode(token) : null;
    const userId = payload?.user_id;

    userService
      .updateUser(userId, {
        username: name,
        email: email,
        password: password,
        theme: theme,
      })
      .then(() => {
        setNotification({
          message: "Настройки успешно сохранены!",
          type: "success",
        });
        //window.location.reload();
      })
      .catch((error) => {
        setError(`Ошибка сохранения данных пользователя: ${error.message}`);
        setNotification({
          message: `Ошибка сохранения данных: ${error.message}`,
          type: "error",
        });
      });
  };

  return (
    <div className="main-page">
      <Sidebar />
      <div className="settings-content">
        <h1 className="settings-title">Настройки</h1>
        <form className="settings-form" onSubmit={handleSave}>
          <label>
            Имя пользователя:
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </label>
          <label>
            Email:
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </label>
          <label>
            Новый пароль:
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>
          <label>
            Тема:
            <select value={theme} onChange={(e) => setTheme(e.target.value)}>
              <option value="dark">Тёмная</option>
              <option value="light">Светлая</option>
            </select>
          </label>
          <button className="settings-save-btn" type="submit">
            Сохранить
          </button>
        </form>
        {notification && (
          <Notification
            message={notification.message}
            type={notification.type}
            onClose={() => setNotification(null)}
          />
        )}
      </div>
    </div>
  );
}

export default SettingsPage;