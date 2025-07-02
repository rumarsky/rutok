import authService from './authService';

const API_URL = "http://81.163.28.17:10003/api";

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

async function uploadVideo(video, preview) {
  const data = new FormData();
  data.append('file', video);
  data.append('preview', preview);

  return await authFetch(`${API_URL}/files/upload`, {
    method: 'POST',
    body: data
  });
}

async function getVideoUrl(videoId) {
  return await authFetch(`${API_URL}/files/${videoId}`);
}

async function getPreviewUrl(videoId) {
  return await authFetch(`${API_URL}/files/preview/${videoId}`);
}

export default {
  uploadVideo,
  getVideoUrl,
  getPreviewUrl,
};