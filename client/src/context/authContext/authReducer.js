import {
  SUCCESS_REGISTER,
  FAIL_REGISTER,
  SUCCESS_LOGIN,
  FAIL_LOGIN,
  SET_ERROR,
  CLEAR_ERROR,
  LOG_OUT,
  SET_USER,
  AUTH_ERROR
} from "../type";

export default (state, action) => {
  switch (action.type) {
    case SET_USER:
      return {
        user: action.payload,
        userAuth: true,
        errors: null
      };
    case SUCCESS_REGISTER:
    case SUCCESS_LOGIN:
      localStorage.setItem("token", action.payload);
      return {
        ...state,
        userAuth: true,
        errors: null
      };
    case FAIL_LOGIN:
    case FAIL_REGISTER:
    case LOG_OUT:
    case AUTH_ERROR:
      localStorage.removeItem("token");
      return {
        ...state,
        userAuth: null,
        errors: action.payload
      };
    case SET_ERROR:
      return {
        ...state,
        errors: action.payload
      };
    case CLEAR_ERROR:
      return {
        ...state,
        errors: null
      };
    default:
      return state;
  }
};
