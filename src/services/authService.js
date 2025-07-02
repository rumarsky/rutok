const API_URL = "http://81.163.28.17:10001/api";

function setCookie(name, value, days = 7) {
  let expires = "";
  if (days) {
    const date = new Date();
    date.setTime(date.getTime() + days*24*60*60*1000);
    expires = "; expires=" + date.toUTCString();
  }
  document.cookie = name + "=" + encodeURIComponent(value) + expires + "; path=/";
}

function getCookie(name) {
  let matches = document.cookie.match(new RegExp(
    "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
  ));
  return matches ? decodeURIComponent(matches[1]) : undefined;
}

function deleteCookie(name) {
  document.cookie = name + "=; Max-Age=-1; path=/";
}

async function login(email, password) {
  const response = await fetch(`${API_URL}/login`, {
    method: "POST",
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({email, password})
  });
  if (!response.ok) {
    let errorMsg = 'Ошибка входа';
    try {
      const errorData = await response.json();
      errorMsg = errorData.message || errorMsg;
    } catch {}
    throw new Error(errorMsg);
  }
  const data = await response.json();
  setCookie('accessToken', data.accessToken);
  setCookie('refreshToken', data.refreshToken);
  return data;
}

let refreshPromise = null;

async function refreshToken() {
  if (!refreshPromise) {
    refreshPromise = (async () => {
      const refreshToken = getCookie('refreshToken');
      if (!refreshToken) throw new Error('Нет refreshToken');
      const response = await fetch(`${API_URL}/refresh`, {
        method: "POST",
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({token: refreshToken})
      });
      if (!response.ok) throw new Error('Ошибка обновления токена');
      const data = await response.json();
      setCookie('accessToken', data.accessToken);
      setCookie('refreshToken', data.refreshToken);
      return data;
    })();
    try {
      await refreshPromise;
    } finally {
      refreshPromise = null;
    }
  } else {
    await refreshPromise;
  }
}

async function logout() {
  const refreshToken = getCookie('refreshToken');
  if (refreshToken) {
    await fetch(`${API_URL}/logout`, {
      method: "POST",
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({token: refreshToken})
    });
  }
  deleteCookie('accessToken');
  deleteCookie('refreshToken');
}

function getAccessToken() {
  return getCookie('accessToken');
}

// Главная функция для защищённых запросов
async function authFetch(url, options = {}, retry = true) {
  const accessToken = getAccessToken();
  const headers = options.headers ? {...options.headers} : {};
  if (accessToken) {
    headers['Authorization'] = `Bearer ${accessToken}`;
  }
  const response = await fetch(url, {...options, headers});
  if (response.status === 401 && retry) {
    // Пробуем обновить токен и повторить запрос
    try {
      await refreshToken();
      return await authFetch(url, options, false);
    } catch (e) {
      // Не удалось обновить токен — выходим из аккаунта
      await logout();
      throw new Error('Сессия истекла, войдите заново');
    }
  }
  return response;
}

async function register(username, email, password) {
  const response = await fetch(`${API_URL}/registration`, {
    method: "POST",
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, email, password }),
  });
  if (!response.ok) {
    let errorMsg = 'Ошибка регистрации';
    try {
      const errorData = await response.json();
      errorMsg = errorData.message || errorMsg;
    } catch {}
    throw new Error(errorMsg);
  }
  const data = await response.json();
  setCookie('accessToken', data.accessToken);
  setCookie('refreshToken', data.refreshToken);
  return data;
}

export default {
  login,
  refreshToken,
  logout,
  getAccessToken,
  getCookie,
  setCookie,
  deleteCookie,
  authFetch,
  register,
};