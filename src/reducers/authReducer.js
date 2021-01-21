import {
  LOGIN_SUCCESS,
  LOAD_USER_SUCCESS,
  LOGOUT_SUCCESS,
  AUTH_ERROR,
  LOGOUT_ERROR,
} from '../actions/types';

const initialState = {
  token: null,
  currentUser: null,
  isAuthenticated: false,
  authLoading: false,
  error: null,
};

const authReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case LOGIN_SUCCESS:
      return {
        ...state,
        token: payload,
        isAuthenticated: true,
        authLoading: false,
      };

    case LOAD_USER_SUCCESS:
      return {
        ...state,
        currentUser: payload,
        isAuthenticated: true,
        authLoading: false,
      };

    case LOGOUT_SUCCESS:
      return {
        ...state,
        currentUser: null,
        isAuthenticated: false,
        token: null,
        authLoading: false,
      };

    case AUTH_ERROR:
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        authLoading: false,
        currentUser: null,
        error: payload,
      };

    case LOGOUT_ERROR:
      return {
        ...state,
      };

    default:
      return state;
  }
};

export default authReducer;
