import ugCompass from '../apis/ugCompass';
import { reset } from 'redux-form';
import history from '../utils/history';
import {
  FETCH_USERS_SUCCESS,
  FETCH_USER_SUCCESS,
  CREATE_USER_SUCCESS,
  DELETE_USER_SUCCESS,
  FILTER_USERS,
  CLEAR_FILTERED_USERS,
  CLEAR_CURRENT_USER,
} from '../actions/types';

export const fetchUsers = () => async (dispatch) => {
  const { data } = await ugCompass.get('/users', {
    headers: {
      Authorization: localStorage.getItem('ugcompass_token'),
    },
  });

  dispatch({
    type: FETCH_USERS_SUCCESS,
    payload: data.data,
  });

  // Todo: Handle Errors
};

export const fetchUser = (userId) => async (dispatch, getState) => {
  getState().users.usersLoading = true;
  try {
    const { data } = await ugCompass.get(`/users/${userId}`, {
      headers: {
        Authorization: localStorage.getItem('ugcompass_token'),
      },
    });

    dispatch({
      type: FETCH_USER_SUCCESS,
      payload: data,
    });
  } catch (err) {
    console.log(err);
    // Todo: Handle Errors
  }
};

export const createUsers = (formValues) => async (dispatch, getState) => {
  getState().users.usersLoading = true;
  try {
    const user = await ugCompass.post('/users', formValues, {
      headers: {
        Authorization: localStorage.ugcompass_token,
        'Content-Type': 'application/json',
      },
    });
    dispatch({
      type: CREATE_USER_SUCCESS,
      payload: { users: getState().users.users, user },
    });
    dispatch(reset('userform'));
    history.push('/users');
  } catch (err) {
    console.log(err);
    // Todo: Handle Errors
  }
};

export const updateUsers = (formValues, userId) => async (
  dispatch,
  getState
) => {
  getState().users.usersLoading = true;
  try {
    await ugCompass.put(`/users/${userId}`, formValues, {
      headers: {
        Authorization: localStorage.ugcompass_token,
        'Content-Type': 'application/json',
      },
    });
    dispatch(reset('userform'));
    history.push('/users');
  } catch (err) {
    console.log(err);
    // Todo: Handle Errors
  }
};

export const deleteUser = (userId) => async (dispatch, getState) => {
  getState().users.usersLoading = true;
  try {
    await ugCompass.delete(`/users/${userId}`, {
      headers: {
        Authorization: localStorage.ugcompass_token,
      },
    });
    dispatch({
      type: DELETE_USER_SUCCESS,
      payload: { userId, users: getState().users.users },
    });
  } catch (err) {
    console.log(err);
    // Todo: Handle Errors
  }
};

export const filterUsers = (queryStr) => (dispatch, getState) => {
  dispatch({
    type: FILTER_USERS,
    payload: {
      queryStr,
      users: getState().users.users,
    },
  });
};

export const clearFilteredUsers = () => ({
  type: CLEAR_FILTERED_USERS,
});

export const clearCurrentUsers = () => ({
  type: CLEAR_CURRENT_USER,
});
