import { authConstants } from '../_constants';
import AuthService from '../adapters/AuthService';
import UserService from '../adapters/UserService';

export const registerUser = (userName, email, password) => (dispatch) => {
    return AuthService.register(userName, email, password).then(
        (response) => {
            dispatch({
                type: authConstants.REGISTER_SUCCESS,
            });

            dispatch({
                type: authConstants.SET_MESSAGE,
                payload: 'success',
            });

            return Promise.resolve();
        },
        (error) => {
            dispatch({
                type: authConstants.REGISTER_FAIL,
            });

            dispatch({
                type: authConstants.SET_MESSAGE,
                payload: 'fail',
            });

            return Promise.reject();
        }
    );
};

export const login = (userName, password) => (dispatch) => {
    return AuthService.login(userName, password).then(
        (data) => {
            dispatch({
                type: authConstants.LOGIN_SUCCESS,
                payload: { user: data },
            });

            return Promise.resolve();
        },
        (error) => {
            dispatch({
                type: authConstants.LOGIN_FAIL,
            });

            dispatch({
                type: authConstants.SET_MESSAGE,
                payload: 'fail',
            });

            return Promise.reject();
        }
    );
};

export const patchUser = (userName, patched) => (dispatch) => {
    return UserService.patchUser(userName, patched).then(
        (response) => {
            dispatch({
                type: authConstants.PATCH_SUCCESS,
                payload: { user: response.data },
            });

            return Promise.resolve();
        },
        (error) => {
            dispatch({
                type: authConstants.PATCH_FAIL,
            });

            return Promise.reject();
        }
    );
};

export const getUser = (userName) => (dispatch) => {
    return UserService.getUser(userName).then(
        (response) => {
            dispatch({
                type: authConstants.GET_SUCCESS,
                payload: { user: response.data },
            });

            return Promise.resolve();
        },
        (error) => {
            dispatch({
                type: authConstants.GET_FAIL,
            });

            return Promise.reject();
        }
    );
};

export const logout = () => (dispatch) => {
    AuthService.logout();

    dispatch({
        type: authConstants.LOGOUT,
    });
};
