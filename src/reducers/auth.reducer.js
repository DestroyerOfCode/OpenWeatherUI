import { authConstants } from '../_constants/auth.constants';

const user = JSON.parse(localStorage.getItem('user'));

const initialState = user
    ? { isLoggedIn: true, user }
    : { isLoggedIn: false, user: null };

export function auth(state = initialState, action) {
    const { type, payload } = action;

    switch (type) {
        case authConstants.REGISTER_SUCCESS:
            return {
                ...state,
                isLoggedIn: false,
            };
        case authConstants.REGISTER_FAIL:
            return {
                ...state,
                isLoggedIn: false,
            };
        case authConstants.LOGIN_SUCCESS:
            return {
                ...state,
                isLoggedIn: true,
                user: payload.user,
            };
        case authConstants.LOGIN_FAIL:
            return {
                ...state,
                isLoggedIn: false,
                user: null,
            };
        case authConstants.LOGOUT:
            return {
                ...state,
                isLoggedIn: false,
                user: null,
            };
        case authConstants.PATCH_SUCCESS:
            return {
                ...state,
                isLoggedIn: true,
                user: payload.user,
            };
        case authConstants.PATCH_FAIL:
            return {
                ...state,
                isLoggedIn: false,
                user: null,
            };

        case authConstants.GET_SUCCESS:
            return {
                ...state,
                isLoggedIn: true,
                user: payload.user,
            };

        case authConstants.GET_FAIL:
            return {
                ...state,
                isLoggedIn: false,
                user: null,
            };

        default:
            return state;
    }
}
