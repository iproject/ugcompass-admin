import ugCompass from '../apis/ugCompass';
import { FETCH_ROOMS_SUCCESS } from '../actions/types';

export const fetchRooms = () => async (dispatch) => {
  const { data } = await ugCompass.get('/rooms');

  dispatch({
    type: FETCH_ROOMS_SUCCESS,
    payload: data.data,
  });

  // Todo: Handle Errors
};
