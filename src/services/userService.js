import authService from './authService';

const API_URL = "http://81.163.28.17:10007/api";

async function getUserById(id) {
  const response = await authService.authFetch(`${API_URL}/users/${id}`);
  if (!response.ok) throw new Error('Ошибка получения пользователя');
  return await response.json();
}

async function getUserByEmail(email) {
  const response = await authService.authFetch(`${API_URL}/users/email/${encodeURIComponent(email)}`);
  if (!response.ok) throw new Error('Ошибка получения пользователя по email');
  return await response.json();
}

async function updateUser(id, { username, password, email }) {
  const response = await authService.authFetch(`${API_URL}/users/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password, email }),
  });
  if (!response.ok) throw new Error('Ошибка обновления пользователя');
  return await response.json();
}

async function deleteUser(id) {
  const response = await authService.authFetch(`${API_URL}/users/${id}`, {
    method: 'DELETE',
  });
  if (!response.ok) throw new Error('Ошибка удаления пользователя');
  return await response.json();
}

async function registerUser({ username, email, password }) {
  const response = await fetch(`${API_URL}/users/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, email, password }),
  });
  if (!response.ok) throw new Error('Ошибка регистрации');
  return await response.json();
}

async function verifyUser({ email, password }) {
  const response = await fetch(`${API_URL}/users/verify`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });
  if (!response.ok) throw new Error('Ошибка верификации');
  return await response.json();
}

async function getRole(code) {
  const response = await authService.authFetch(`${API_URL}/roles/${encodeURIComponent(code)}`);
  if (!response.ok) throw new Error('Ошибка получения роли');
  return await response.json();
}

export default {
  getUserById,
  getUserByEmail,
  updateUser,
  deleteUser,
  registerUser,
  verifyUser,
  getRole,
};