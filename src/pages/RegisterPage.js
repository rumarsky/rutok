import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './AuthPage.css';

function RegisterPage({ onRegister, switchToLogin }) {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = e => {
    e.preventDefault();
    // Здесь логика регистрации
    onRegister?.(email, username, password);
  };

  return (
    <div className="auth-page">
      <form className="auth-form" onSubmit={handleSubmit}>
        <h2>Регистрация в RuTok</h2>
        <input
          type="text"
          placeholder="Имя пользователя"
          required
          value={username}
          onChange={e => setUsername(e.target.value)}
        />
        <input
          type="email"
          placeholder="Email"
          required
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Пароль"
          required
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
        <button type="submit">Зарегистрироваться</button>
        <div className="auth-switch">
          Уже есть аккаунт? <span onClick={() => navigate('/login')}>Войти</span>
        </div>
      </form>
    </div>
  );
}

export default RegisterPage;