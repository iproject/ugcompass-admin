import {
  LOGIN_SUCCESS,
  LOAD_USER_SUCCESS,
  LOGOUT_SUCCESS,
} from '../actions/types';

const initialState = {
  token: null,
  isAuthenticated: false,
  authLoading: false,
  error: null,
  message: null,
  currentUser: null,
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
      console.log(state);
      return {
        ...state,
        currentUser: null,
        isAuthenticated: false,
        token: null,
        authLoading: false,
      };

    default:
      return state;
  }
};

export default authReducer;
