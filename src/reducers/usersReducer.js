import { FETCH_USERS_SUCCESS } from '../actions/types';

const initialState = {
  users: null,
  usersLoading: true,
  error: null,
  message: null,
};

const usersReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case FETCH_USERS_SUCCESS:
      return { ...state, users: payload, usersLoading: false };

    default:
      return state;
  }
};

export default usersReducer;
