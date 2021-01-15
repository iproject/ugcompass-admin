import ugCompass from '../apis/ugCompass';
import { LOGIN_SUCCESS, LOAD_USER_SUCCESS, LOGOUT_SUCCESS } from './types';
import history from '../utils/history';

// **** Login
export const login = (formValues) => async (dispatch, getState) => {
  getState().auth.authLoading = true;
  const { data } = await ugCompass.post('/auth/login', formValues);
  dispatch({
    type: LOGIN_SUCCESS,
    payload: data.token,
  });

  localStorage.setItem('ugcompass_token', 'Bearer ' + data.token);
  // > Go to the main dashboard
  history.push('/');

  // Todo: Handle Errors
};

// **** Logout
export const logout = () => async (dispatch) => {
  const { data } = await ugCompass.get('/auth/logout');
  if (data.success) {
    localStorage.removeItem('ugcompass_token');
  }
  dispatch({
    type: LOGOUT_SUCCESS,
  });

  // Todo: Handle Errors
};

// **** Load User
export const loadUser = () => async (dispatch, getState) => {
  getState().auth.authLoading = true;
  const { data } = await ugCompass.get('/auth/me', {
    headers: {
      Authorization: localStorage.ugcompass_token,
    },
  });

  dispatch({
    type: LOAD_USER_SUCCESS,
    payload: data.data,
  });

  // Todo: Handle Errors
};
