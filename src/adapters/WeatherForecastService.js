import axios from 'axios';
import { apiConstants } from '../_constants';

export function getDailyForecastByCityName(lat, lon, excludedForecasts) {
    const params = { lat, lon, excludedForecasts: excludedForecasts };

    return axios.get(`${apiConstants.WEATHER_FORECAST_API_URL}/daily?lat=${lat}&lon=${lon}&excludedForecasts=${excludedForecasts}`);
}
