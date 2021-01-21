import ugCompass from '../apis/ugCompass';
import {
  LOGIN_SUCCESS,
  LOAD_USER_SUCCESS,
  LOGOUT_SUCCESS,
  AUTH_ERROR,
  LOGOUT_ERROR,
} from './types';
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

// **** Login
export const login = (formValues) => async (dispatch, getState) => {
  getState().auth.authLoading = true;
  try {
    const { data } = await ugCompass.post('/auth/login', formValues);
    dispatch({
      type: LOGIN_SUCCESS,
      payload: data.token,
    });

    localStorage.setItem('ugcompass_token', 'Bearer ' + data.token);
    dispatch(loadUser());
  } catch (err) {
    setErrorResponse(err, AUTH_ERROR, dispatch);
  }
};

// **** Logout
export const logout = () => async (dispatch) => {
  try {
    const { data } = await ugCompass.get('/auth/logout');
    if (data.success) {
      localStorage.removeItem('ugcompass_token');
    }
    dispatch({
      type: LOGOUT_SUCCESS,
    });
  } catch (err) {
    setErrorResponse(err, LOGOUT_ERROR, dispatch);
  }
};

// **** Load User
export const loadUser = () => async (dispatch, getState) => {
  getState().auth.authLoading = true;

  try {
    const { data } = await ugCompass.get('/auth/me', {
      headers: {
        Authorization: localStorage.ugcompass_token,
      },
    });

    // Check user role
    if (data.data.role === 'user') {
      dispatch(logout());
      dispatch(
        setAlert(
          'red',
          'Unauthorized Access',
          "Your role as 'user' can not access UGCompass Admin. Please login at https://ugcompass.netlify.app/login",
          15000
        )
      );
    } else {
      dispatch({
        type: LOAD_USER_SUCCESS,
        payload: data.data,
      });
    }
  } catch (err) {
    setErrorResponse(err, AUTH_ERROR, dispatch);
  }

  // Todo: Handle Errors
};
