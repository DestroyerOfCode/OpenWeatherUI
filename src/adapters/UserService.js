import axios from 'axios';
import { apiConstants } from '../_constants';

export function getPublicContent() {
    return axios.get(apiConstants.MESSAGER_LOGIN_URL);
}

export function getUserBoard() {
    return axios.get(apiConstants.MESSAGER_LOGIN_URL, { headers: authHeader() });
}

export function getModeratorBoard() {
    return axios.get(apiConstants.MESSAGER_LOGIN_URL, { headers: authHeader() });
}

export function getAdminBoard() {
    return axios.get(apiConstants.MESSAGER_LOGIN_URL, { headers: authHeader() });
}

