import { weatherCurrentConstants } from '../_constants';

const initialState = {
    totalElements: 0,
    content: {
        name: '',
        'coord.lat': '',
        'coord.lon': '',
        'sys.countryName': '',
        'weatherMain.humidity': 0,
        'weatherMain.feels_like': 0,
        'weatherMain.temp': 0,
        'weatherMain.temp_max': 0,
        'weatherMain.temp_min': 0,
        'weather.description': [],
    },
};
export function weatherCurrent(state = [initialState], action) {
    const {type, currentWeathers} = action;
    switch (type) {
        case weatherCurrentConstants.GET_CURRENT_WEATHERS:
            return currentWeathers;
        default:
            return state;
    }
}
