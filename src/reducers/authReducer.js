import { LOGIN_SUCCESS } from '../actions/types';

const initialState = {
  token: null,
  isAuthenticated: false,
  loading: true,
  error: null,
  message: null,
};

const authReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case LOGIN_SUCCESS:
      return {
        ...state,
        token: payload,
        isAuthenticated: true,
        loading: false,
      };

    default:
      return state;
  }
};

export default authReducer;
