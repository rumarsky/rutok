import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './AuthPage.css';

async function registerUser({ username, email, password }) {
  const response = await fetch('http://81.163.28.17:10001/api/registration', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, email, password }),
  });
  if (!response.ok) {
    const error = await response.text();
    throw new Error(error || 'Ошибка регистрации');
  }
  return await response.json();
}

function RegisterPage() {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const data = await registerUser({ username, email, password });
      localStorage.setItem('accessToken', data.accessToken);
      localStorage.setItem('refreshToken', data.refreshToken);
      navigate('/');
    } catch (err) {
      setError(err.message || 'Ошибка регистрации');
    } finally {
      setLoading(false);
    }
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
        <button type="submit" disabled={loading}>
          {loading ? 'Регистрация...' : 'Зарегистрироваться'}
        </button>
        {error && <div className="auth-error">{error}</div>}
        <div className="auth-switch">
          Уже есть аккаунт? <span onClick={() => navigate('/login')}>Войти</span>
        </div>
      </form>
    </div>
  );
}

export default RegisterPage;