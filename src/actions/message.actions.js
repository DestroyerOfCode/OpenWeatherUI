import { authConstants } from "../_constants";

export const setMessage = (message) => (dispatch) => {
  return dispatch({
    type: authConstants.SET_MESSAGE,
    payload: message,
})
};

export const clearMessage = () => ({
  type: authConstants.CLEAR_MESSAGE,
});