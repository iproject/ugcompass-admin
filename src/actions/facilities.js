import ugCompass from '../apis/ugCompass';
import history from '../utils/history';
import {
  FETCH_FACILITIES_SUCCESS,
  CREATE_FACILITY_SUCCESS,
  SEARCH_FACILITIES_SUCCESS,
  FILTER_FACILITIES,
  CLEAR_FILTERED_FACILITIES,
} from '../actions/types';

export const fetchFacilities = () => async (dispatch) => {
  try {
    const { data } = await ugCompass.get('/facilities');

    dispatch({
      type: FETCH_FACILITIES_SUCCESS,
      payload: data,
    });
  } catch (err) {
    console.log(err);
    // Todo: Handle Errors
  }
};

export const searchFacilities = (searchTerm) => async (dispatch) => {
  try {
    const { data } = await ugCompass.get('/facilities', {
      params: {
        search: searchTerm,
        per_page: 5,
      },
    });
    dispatch({ type: SEARCH_FACILITIES_SUCCESS, payload: data });
  } catch (err) {
    console.log(err);
    // Todo: Handle Errors
  }
};

export const filterFacilities = (queryStr) => (dispatch, getState) => {
  const facilities = getState().facilities.facilities;
  dispatch({
    type: FILTER_FACILITIES,
    payload: {
      queryStr,
      facilities,
    },
  });
  // Todo: Handle Errors
};

export const clearFilteredFacilities = () => ({
  type: CLEAR_FILTERED_FACILITIES,
  // Todo: Handle Errors
});

export const createFacility = (formValues) => async (dispatch, getState) => {
  getState().facilities.facilitiesLoading = true;
  try {
    await ugCompass.post('/facilities', formValues, {
      headers: {
        Authorization: localStorage.ugcompass_token,
        'Content-Type': 'application/json',
      },
    });
    fetchFacilities();
    history.push('/facilities');
  } catch (err) {
    console.log(err);
    // Todo: Handle Errors
  }
};
