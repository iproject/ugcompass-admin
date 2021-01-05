import ugCompass from '../apis/ugCompass';
import { LOGIN_SUCCESS } from './types';
import history from '../utils/history';

export const login = (formValues) => async (dispatch) => {
  const { data } = await ugCompass.post('/auth/login', formValues);

  dispatch({
    type: LOGIN_SUCCESS,
    payload: data.token,
  });

  localStorage.setItem('ugcompass_token', 'Bearer ' + data.token);
  // > Go to the main dashboard
  history.push('/');

  // Todo: Handle errors
};
