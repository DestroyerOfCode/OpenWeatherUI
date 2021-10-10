import { filtersConstants } from "../_constants";

export const filtersActions = {
    update,
    clear,
};

function update(filterName, filterOperator, value, filters) {
    return (dispatch) => {
        if (
            (((filterOperator === '$gte' || filterOperator === '$lte') &&
                isNaN(value)) ||
                '' === value ||
                (Array.isArray(value) && value.length === 0)) &&
            filters[filterName] !== undefined
        ) {
            dispatch({
                type: filtersConstants.REMOVE_FILTER,
                filters,
                filterName,
                filterOperator,
            });
            return;
        } else if (filters[filterName]) {
            dispatch({
                type: filtersConstants.APPEND_FILTER_OPERATOR,
                filters,
                filterName,
                filterOperator,
                value,
            });
            return;
        } else if (
            ((filterOperator === '$gte' || filterOperator === '$lte') &&
                !isNaN(value)) ||
            '' !== value ||
            (Array.isArray(value) && value.length !== 0)
        ) {
            dispatch({
                type: filtersConstants.APPEND_FILTER_OPERATOR,
                filters,
                filterName,
                filterOperator,
                value,
            });
            return;
        }
        // dispatch({type: "UPDATE_FILTERS", filters});
    };
}

function clear() {
    return (dispatch) => {
        dispatch({ type: filtersConstants.CLEAR_FILTERS });
    };
}
