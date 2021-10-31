const COURSE_API_URL = process.env.WEATHER_BASE_URL || 'http://localhost:8080';
const MESSAGER_API_URL =
    process.env.MESSAGER_BASE_URL || 'http://localhost:8081';

export const apiConstants = {
    WEATHER_FORECAST_API_URL: `${COURSE_API_URL}/weather/forecast`,
    WEATHER_CURRENT_API_URL: `${COURSE_API_URL}/weather/current`,
    MESSAGER_LOGIN_URL: `${MESSAGER_API_URL}/user/auth/login`,
    MESSAGER_REGISTER_URL: `${MESSAGER_API_URL}/user/auth/create`,
    MESSAGER_PATCH_USER_URL: `${MESSAGER_API_URL}/user`,
    MESSAGER_GET_USER_URL: `${MESSAGER_API_URL}/user`,
};
