import { descriptionsConstants } from '../_constants';

export function descriptions(state = [], action) {
    const { type, descriptions } = action;
    switch (type) {
        case descriptionsConstants.GET_DESCRIPTIONS:
            return descriptions;
        default:
            return state;
    }
}
