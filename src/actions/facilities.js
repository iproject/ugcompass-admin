import ugCompass from '../apis/ugCompass';
import { FETCH_FACILITIES_SUCCESS } from '../actions/types';

export const fetchFacilities = () => async (dispatch) => {
  const { data } = await ugCompass.get('/facilities');

  dispatch({
    type: FETCH_FACILITIES_SUCCESS,
    payload: data.data,
  });

  // Todo: Handle Errors
};
