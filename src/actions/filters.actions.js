import { filtersConstants } from "../_constants";

export const filtersActions = {
    update,
    clear,
};

function update(filterName, filterOperator, value, filters) {
    return (dispatch) => {
        if ( filters[filterName] !== undefined && (
            isNumericEmpty(filterOperator, value) ||
            '' === value ||
            isArrayEmpty(value)
        )) {
            return dispatch({
                type: filtersConstants.REMOVE_FILTER,
                filters,
                filterName,
                filterOperator,
            });
        } else if (filters[filterName] !== undefined && (
            isNumericNotEmpty(filterOperator, value) ||
            '' !== value ||
            isArrayNotEmpty(value)
        )) {
            return dispatch({
                type: filtersConstants.APPEND_FILTER_OPERATOR,
                filters,
                filterName,
                filterOperator,
                value,
            });
        } else if (filters[filterName] === undefined) {
            return dispatch({
                type: filtersConstants.APPEND_FILTER,
                filters,
                filterName,
                filterOperator,
                value,
            });
        }
    };
}

function isNumericEmpty(filterOperator, value) {
    return (filterOperator === '$gte' || filterOperator === '$lte') && isNaN(value);
}

function isNumericNotEmpty(filterOperator, value) {
    return (filterOperator === '$gte' || filterOperator === '$lte') && !isNaN(value);
}

function isArrayEmpty(value) {
    return Array.isArray(value) && value.length === 0;
}

function isArrayNotEmpty(value) {
    return Array.isArray(value) && value.length !== 0;
}

function clear() {
    return (dispatch) => {
        dispatch({ type: filtersConstants.CLEAR_FILTERS });
    };
}
