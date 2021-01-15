import {
  FETCH_USERS_SUCCESS,
  FETCH_USER_SUCCESS,
  CREATE_USER_SUCCESS,
  DELETE_USER_SUCCESS,
  FILTER_USERS,
  CLEAR_FILTERED_USERS,
  CLEAR_CURRENT_USER,
} from '../actions/types';

const initialState = {
  users: null,
  currentUser: null,
  usersLoading: true,
  filteredUsers: null,
  error: null,
  message: null,
};

const usersReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case FETCH_USERS_SUCCESS:
      return { ...state, users: payload, usersLoading: false };

    case FETCH_USER_SUCCESS:
      return {
        ...state,
        currentUser: payload.data,
        usersLoading: false,
      };

    case CREATE_USER_SUCCESS:
      return {
        ...state,
        users: !payload.users
          ? [payload.user]
          : [payload.user, ...payload.users],
        usersLoading: false,
      };

    case DELETE_USER_SUCCESS:
      return {
        ...state,
        users: payload.users.filter((user) => user._id !== payload.userId),
        usersLoading: false,
      };

    case FILTER_USERS:
      return {
        ...state,
        filteredUsers: payload.users.filter((user) => {
          const regex = RegExp(`${payload.queryStr}`, 'gi');
          return user.name.match(regex);
        }),
      };

    case CLEAR_FILTERED_USERS:
      return {
        ...state,
        filteredUsers: null,
        usersLoading: false,
      };

    case CLEAR_CURRENT_USER:
      return {
        ...state,
        currentUser: null,
        usersLoading: false,
      };

    default:
      return state;
  }
};

export default usersReducer;
