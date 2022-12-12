import axios from "axios";

const TASK_BASE_URL = 'http://localhost:5000/task';

export function createTasks(data: any) {
    const token = getToken();
    return axios.post(`${TASK_BASE_URL}`, data, {
        headers: {'Authorization': `Bearer ${token}`}
    })
}
export function updatedTask(id: string, data: any) {
    const token = getToken();
    return axios.patch(`${TASK_BASE_URL}/${id}`, data, {
        headers: {'Authorization': `Bearer ${token}`}
    })
}
export function getTasks() {
    const token = getToken();
    return axios.get(`${TASK_BASE_URL}`, {
        headers: {'Authorization': `Bearer ${token}`}
    })
}
export function updateTaskStatus(id: string, newStatus: string) {
    const token = getToken();
    return axios.post(`${TASK_BASE_URL}/status/${id}`, {status: newStatus}, {
        headers: {'Authorization': `Bearer ${token}`}
    })
}
export function deleteTask(id: string) {
    const token = getToken();
    return axios.delete(`${TASK_BASE_URL}/${id}`, {
        headers: {'Authorization': `Bearer ${token}`}
    })
}

function getToken() {
    const token = sessionStorage.getItem('access_token');
    let parsedToken = '';
    if (token) {
        parsedToken = JSON.parse(token);
    }
    return parsedToken;
}
