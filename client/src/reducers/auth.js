import {
  REGISTER_SUCCESS,
  REGISTER_FAILURE,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOG_OUT,
  DELETE_USER,
} from '../actions/types';

const initialState = {
  token: localStorage.getItem('token'),
  isAuthenticated: false,
  isLoading: true,
  user: null,
};

const auth = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case USER_LOADED:
      return {
        ...state,
        isAuthenticated: true,
        user: payload,
        isLoading: false,
      };

    case REGISTER_SUCCESS:
    case LOGIN_SUCCESS:
      localStorage.setItem('token', payload);

      return {
        ...state,
        token: payload,
        isAuthenticated: true,
        isLoading: false,
      };

    case AUTH_ERROR:
    case REGISTER_FAILURE:
    case LOGIN_FAILURE:
    case LOG_OUT:
    case DELETE_USER:
      localStorage.removeItem('token');
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        isLoading: false,
      };
    default:
      return { ...state };
  }
};

export default auth;
