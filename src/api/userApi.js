export async function fetchUserByEmail(email) {
  const response = await fetch(`http://81.163.28.17:10007/api/users/email/${encodeURIComponent(email)}`);
  if (!response.ok) {
    throw new Error('Ошибка получения пользователя по email');
  }
  return await response.json();
}