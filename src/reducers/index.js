import { combineReducers } from 'redux';
import { filters } from './filters.reducer';
import { weatherCurrent } from './weather.current.reducer';
import { countries } from './countries.reducer';
import { descriptions } from './descriptions.reducer';
import { messages } from './messages.reducer';
import { auth } from './auth.reducer';
import { temperature } from './temperature.reducer';

const rootReducer = combineReducers({
    filters,
    weatherCurrent,
    countries,
    descriptions,
    messages,
    auth,
    temperature
});

export default rootReducer;
