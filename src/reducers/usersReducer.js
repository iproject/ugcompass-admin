import { FETCH_USERS_SUCCESS } from '../actions/types';

const initialState = {
  users: null,
  loading: true,
  error: null,
  message: null,
};

const usersReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case FETCH_USERS_SUCCESS:
      return { ...state, users: payload };

    default:
      return state;
  }
};

export default usersReducer;
