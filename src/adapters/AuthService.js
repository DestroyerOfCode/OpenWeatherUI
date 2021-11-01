import axios from 'axios';
import { apiConstants } from '../_constants';

const login = (userName, password) => {
    return axios
        .post(apiConstants.MESSAGER_LOGIN_URL, { userName, password })
        .then((response) => {
            if (response.data.jwt) {
                localStorage.setItem('user', JSON.stringify(response.data));
            }

            return response.data;
        });
};

const logout = () => {
    localStorage.removeItem('user');
};

const register = (userName, email, userPassword) => {

    return axios.post(
        apiConstants.MESSAGER_REGISTER_URL,
        {
            userName,
            email,
            userPassword,
            roles: [
                {
                    name: 'ROLE_USER',
                },
            ],
        }
    );
};

export default { login, logout, register };