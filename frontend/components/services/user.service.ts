import axios from "axios";

const USER_BASE_URL = 'http://localhost:5000/user';

export function getUsersByRole(role: string) {
    const token = getToken();
    return axios.get(`${USER_BASE_URL}?role=${role}`, {
        headers: {'Authorization': `Bearer ${token}`}
    })
}
export function updateUser(id: string, payload: any) {
    const token = getToken();
    return axios.patch(`${USER_BASE_URL}/${id}`, payload, {
        headers: {'Authorization': `Bearer ${token}`}
    })
}
export function updateUserPassword(payload: any) {
    const token = getToken();
    return axios.post(`${USER_BASE_URL}/changePassword`, payload, {
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
