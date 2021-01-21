import ugCompass from '../apis/ugCompass';
import { reset } from 'redux-form';
import history from '../utils/history';
import {
  FETCH_USERS_SUCCESS,
  FETCH_USERS_ERROR,
  FETCH_USER_SUCCESS,
  FETCH_USER_ERROR,
  CREATE_USER_SUCCESS,
  CREATE_USER_ERROR,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_ERROR,
  DELETE_USER_SUCCESS,
  DELETE_USER_ERROR,
  FILTER_USERS,
  CLEAR_FILTERED_USERS,
  CLEAR_CURRENT_USER,
} from '../actions/types';
import { setAlert } from './alerts';

// Set error response
const setErrorResponse = (
  err,
  actionType,
  dispatch,
  additionalMessage = '',
  alertTimer = 3000
) => {
  if (err.response) {
    dispatch({ type: actionType, payload: err.response.data.error });
    dispatch(
      setAlert('red', err.response.data.error, additionalMessage, alertTimer)
    );
  } else {
    dispatch({ type: actionType, payload: err.message });
    dispatch(setAlert('red', err.message, additionalMessage, alertTimer));
  }
};

export const fetchUsers = () => async (dispatch) => {
  try {
    const { data } = await ugCompass.get('/users', {
      headers: {
        Authorization: localStorage.getItem('ugcompass_token'),
      },
    });

    dispatch({
      type: FETCH_USERS_SUCCESS,
      payload: data.data,
    });
  } catch (err) {
    setErrorResponse(err, FETCH_USERS_ERROR, dispatch);
  }
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
    setErrorResponse(err, FETCH_USER_ERROR, dispatch);
  }
};

export const createUser = (formValues) => async (dispatch, getState) => {
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
    dispatch(reset('userForm'));
    history.push('/users');
    dispatch(setAlert('green', 'User created successfully', '', 3000));
  } catch (err) {
    setErrorResponse(err, CREATE_USER_ERROR, dispatch);
  }
};

export const updateUser = (formValues, userId) => async (
  dispatch,
  getState
) => {
  getState().users.usersLoading = true;
  try {
    const user = await ugCompass.put(`/users/${userId}`, formValues, {
      headers: {
        Authorization: localStorage.ugcompass_token,
        'Content-Type': 'application/json',
      },
    });
    dispatch({
      type: UPDATE_USER_SUCCESS,
      payload: { user, users: getState().users.users },
    });
    dispatch(reset('userForm'));
    history.push('/users');
    dispatch(setAlert('green', 'User updated successfully', '', 3000));
  } catch (err) {
    setErrorResponse(err, UPDATE_USER_ERROR, dispatch);
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
    dispatch(setAlert('green', 'User deleted successfully', '', 3000));
  } catch (err) {
    setErrorResponse(err, DELETE_USER_ERROR, dispatch);
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

export const clearCurrentUser = () => (dispatch) => {
  dispatch(reset('userForm'));

  dispatch({ type: CLEAR_CURRENT_USER });
};

export const clearFilteredUsers = () => ({
  type: CLEAR_FILTERED_USERS,
});
