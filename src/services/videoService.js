import authService from './authService';

const API_URL = "http://81.163.28.17:10004/api";

async function authFetch(url, options = {}) {
    const token = authService.getAccessToken();

    const headers = {
      ...options.headers,
      'Authorization': `Bearer ${token}`
    };

    const response = await fetch(url, {
      ...options,
      headers
    });

    if (!response.ok) {
      const error = new Error(response.statusText);
      error.response = response;
      throw error;
    }

    return await response.json();
}

//для неавторизованных запросов
async function publicFetch(url, options = {}) {
    const response = await fetch(url, options);

    if (!response.ok) {
      const error = new Error(response.statusText);
      error.response = response;
      throw error;
    }

    return await response.json();
}

async function getUserVideosID(userId) {
    return await authFetch(`${API_URL}/videos/user/${userId}`);
}

async function getAllUserVideos(){
    return await publicFetch(`${API_URL}/videos`);
}

async function uploadVideo(name, description, idVideo, tags) {
    const opt = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            // Если нужна авторизация, authService добавит нужные заголовки через authFetch
        },
        body: JSON.stringify({
            name: name,
            description: description,
            idVideo: idVideo,
            tags: tags.map(tag => ({ ruTag: tag })) // Преобразуем массив строк в массив объектов {ruTag}
        })
    };

    return await authFetch(`${API_URL}/videos`, opt);
}

async function getVideoByID(videoId) {
    return await authFetch(`${API_URL}/videos/${videoId}`);
}

export default{
    getUserVideosID,
    getAllUserVideos,
    uploadVideo,
    getVideoByID
}