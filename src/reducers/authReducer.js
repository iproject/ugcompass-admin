import { LOGIN_SUCCESS } from '../actions/types';

const initialState = {
  token: null,
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case LOGIN_SUCCESS:
      return { ...state, token: payload };

    default:
      return state;
  }
};
