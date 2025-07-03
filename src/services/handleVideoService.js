import authService from "./authService";

const API_URL = "http://81.163.28.17:10002";

async function handleVideo(video) {
    const formData = new FormData();
    formData.append('uploaded_file', video);
    const opt ={
        method: "POST",
        headers: {'accept': 'application/json'},
        body: formData
    }
    const response = await authService.authFetch(`${API_URL}/api/files/handle`, opt)
    return await response.json();
}

export default {
    handleVideo
};