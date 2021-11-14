import { temperatureConstants } from '../_constants';

const initialState = {
    units: 'celsius',
    abbreviation: '°C',
};

export function temperature(state = initialState, action) {
    const { type, units, abbreviation } = action;

    switch (type) {
        case temperatureConstants.CHANGE_TEMPERATURE: {
            return {
                units: units,
                abbreviation: abbreviation,
            };
        }

        default: {
            return state;
        }
    }
}
