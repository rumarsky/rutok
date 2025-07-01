import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../components/AuthContext';
import { parseJwt } from '../utils/parseJwt';
import './AuthPage.css';

async function loginUser({ email, password }) {
  const response = await fetch("http://81.163.28.17:10001/api/login", {
    method: "POST",
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password })
  });
  if (!response.ok) {
    const error = await response.text();
    throw new Error(error || 'Ошибка входа');
  } else {
    return await response.json();
  }
}

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState('');

  const handleSubmit = async e => {
    e.preventDefault();
    setError('');
    try {
      const data = await loginUser({ email, password });
      login(data.accessToken, data.refreshToken);

      // Достаём id пользователя из accessToken и сохраняем в cookies
      const payload = parseJwt(data.accessToken);
      if (payload && payload.id) {
        document.cookie = `userId=${payload.id}`;
      }

      navigate('/');
    } catch (err) {
      setError(err.message || 'Ошибка входа');
    }
  };

  return (
    <div className="auth-page">
      <form className="auth-form" onSubmit={handleSubmit}>
        <h2>Вход в RuTok</h2>
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
        <button type="submit">Войти</button>
        {error && <div className="auth-error">{error}</div>}
        <div className="auth-switch">
          Нет аккаунта? <span onClick={() => navigate('/register')}>Зарегистрироваться</span>
        </div>
      </form>
    </div>
  );
}

export default LoginPage;