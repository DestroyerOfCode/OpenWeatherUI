import { authConstants } from "../_constants/auth.constants";

const initialState = {};

export function messages (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case authConstants.SET_MESSAGE:
      return {...state,
      message: payload};

    case authConstants.CLEAR_MESSAGE:
      return "";

    default:
      return state;
  }
}