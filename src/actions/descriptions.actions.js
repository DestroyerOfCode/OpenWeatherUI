import { retrieveAllDescriptions } from '../adapters/WeatherCurrentService';
import i18n from 'i18next';

export const descriptionsActions = {
    getDescriptions,
};

function getDescriptions() {
    return (dispatch) =>
        retrieveAllDescriptions().then((response) => {
            dispatch({
                type: 'GET_DESCRIPTIONS',
                descriptions: internationalizeDescriptions(response),
            });
        });
}

const internationalizeDescriptions = (descriptions) => {
    return descriptions?.data?.map((description) => ({
        name: i18n.t('common.description.' + description.originalValue),
        id: description.id,
        originalValue: description.originalValue,
    }));
};
