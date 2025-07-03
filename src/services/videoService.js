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

async function addComment(comment, idVideo){
    const opt = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            text: comment,
            videoId: idVideo,
        })
    };

    return await authFetch(`${API_URL}/comments`, opt);
}

async function getVideoComments(videoId) {
    return await publicFetch(`${API_URL}/comments/videos/${videoId}`);
}

async function addLike(idVid) {
    const opt = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id: idVid,
      })
    };
  
    try {
      const response = await authFetch(`${API_URL}/videos/${idVid}/like`, opt);
      
      //обработка пустого ответа
      if (response.status === 204 || response.headers.get('Content-Length') === '0') {
        return { success: true };
      }
      
      //с json работа если не пустое тело ответа
      const text = await response.text();
      return text ? JSON.parse(text) : { success: true };
      
    } catch (error) {
      console.error('Like error:', error);
      return { success: false, error: error.message };
    }
  }


export default{
    getUserVideosID,
    getAllUserVideos,
    uploadVideo,
    getVideoByID,
    addComment,
    getVideoComments,
    addLike
}
