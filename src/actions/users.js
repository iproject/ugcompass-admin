import ugCompass from '../apis/ugCompass';
import { FETCH_USERS_SUCCESS } from '../actions/types';

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
