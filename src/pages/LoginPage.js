import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './AuthPage.css';

function LoginPage({ onLogin, switchToRegister }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  function getCookie(name) {
    let matches = document.cookie.match(new RegExp(
      "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
    ));
    return matches ? decodeURIComponent(matches[1]) : undefined;
  }

  async function loginUser({email, password}) {
    const response = await fetch("http://81.163.28.17:10001/api/login", {
      method: "POST",
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({email, password})
    })

    //1. получить токены +
    //2. сохранить токены в куки +
    //3. передавать токены в запросы +
    //4. если аксес истек - обновить - для этого во всех частях программы нужно будет делать проверку... и лучше ее будто вынести в отдельный компонент
    //5. предыдущие затереть -
    //6. если оба стерлись -

    if (!response.ok){
      const error = await response.text();
      throw new Error(error || 'Ошибка регистрации');
    } else {
      return await response.json()
    }
  }

  const handleSubmit = async e => {
    e.preventDefault();
    // Здесь логика авторизации
    try {
      const data = await loginUser({email, password})
      document.cookie = `accessToken=${encodeURIComponent(data.accessToken)}`
      document.cookie = `refreshToken=${encodeURIComponent(data.refreshToken)}`
      //с помощью функции getCookie можно получить дсоутп к любой куке. Но будет ли это работать и в других частях программы?
      navigate("/") 
    } catch (err) {

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
        <div className="auth-switch">
          Нет аккаунта? <span onClick={() => navigate('/register')}>Зарегистрироваться</span>
        </div>
      </form>
    </div>
  );
}

export default LoginPage;