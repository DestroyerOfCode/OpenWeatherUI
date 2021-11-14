import { countriesConstants } from '../_constants';

export function countries(state = [], action) {
    const { type, countries } = action;
    switch (type) {
        case countriesConstants.GET_COUNTRIES:
            return countries;
        default:
            return state;
    }
}
