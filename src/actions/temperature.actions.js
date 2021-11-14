export const temperatureActions = {
    changeTemperatue,
};

function changeTemperatue(units, abbreviation) {
    return (dispatch) => {
        dispatch({
            type: 'CHANGE_TEMPERATURE',
            units: units,
            abbreviation: abbreviation,
        });
    };
}
