import ugCompass from '../apis/ugCompass';
import { LOGIN_SUCCESS } from './types';

export const login = (formValues) => async (dispatch) => {
  const { data } = await ugCompass.post('/auth/login', formValues);

  dispatch({
    type: LOGIN_SUCCESS,
    payload: data.token,
  });

  // Todo: Handle errors
};
