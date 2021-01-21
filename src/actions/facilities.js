import { reset } from 'redux-form';
import ugCompass from '../apis/ugCompass';
import history from '../utils/history';
import {
  FETCH_FACILITIES_SUCCESS,
  FETCH_FACILITY_SUCCESS,
  FETCH_TOP_FACILITIES_SUCCESS,
  CREATE_FACILITY_SUCCESS,
  DELETE_FACILITY_SUCCESS,
  SEARCH_FACILITIES_SUCCESS,
  FILTER_FACILITIES,
  SET_CURRENT_FACILITY,
  CLEAR_FILTERED_FACILITIES,
  CLEAR_CURRENT_FACILITY,
} from '../actions/types';

export const fetchFacilities = () => async (dispatch, getState) => {
  getState().facilities.facilitiesLoading = true;
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

export const fetchFacility = (facilityId) => async (dispatch, getState) => {
  getState().facilities.facilitiesLoading = true;
  try {
    const { data } = await ugCompass.get(`/facilities/${facilityId}`);

    dispatch({
      type: FETCH_FACILITY_SUCCESS,
      payload: data,
    });
  } catch (err) {
    console.log(err);
    // Todo: Handle Errors
  }
};

export const fetchTopFacilities = () => async (dispatch, getState) => {
  getState().facilities.facilitiesLoading = true;
  try {
    const { data } = await ugCompass.get('/facilities', {
      params: {
        per_page: 5,
        select: 'name,description,averageRating,photos,category,campus,',
        order_by: '-averageRating',
      },
    });

    dispatch({
      type: FETCH_TOP_FACILITIES_SUCCESS,
      payload: data,
    });
  } catch (err) {
    console.log(err);
    // Todo: Handle Errors
  }
};

export const createFacility = (formValues) => async (dispatch, getState) => {
  getState().facilities.facilitiesLoading = true;
  try {
    const facility = await ugCompass.post('/facilities', formValues, {
      headers: {
        Authorization: localStorage.ugcompass_token,
        'Content-Type': 'application/json',
      },
    });
    dispatch({
      type: CREATE_FACILITY_SUCCESS,
      payload: { facilities: getState().facilities.facilities, facility },
    });
    dispatch(reset('facilityForm'));
    history.push('/facilities');
  } catch (err) {
    console.log(err);
    // Todo: Handle Errors
  }
};

export const updateFacility = (formValues, facilityId) => async (
  dispatch,
  getState
) => {
  getState().facilities.facilitiesLoading = true;
  try {
    await ugCompass.put(`/facilities/${facilityId}`, formValues, {
      headers: {
        Authorization: localStorage.ugcompass_token,
        'Content-Type': 'application/json',
      },
    });
    dispatch(reset('facilityForm'));
    history.push('/facilities');
  } catch (err) {
    console.log(err);
    // Todo: Handle Errors
  }
};

export const deleteFacility = (facilityId) => async (dispatch, getState) => {
  getState().facilities.facilitiesLoading = true;
  try {
    await ugCompass.delete(`/facilities/${facilityId}`, {
      headers: {
        Authorization: localStorage.ugcompass_token,
      },
    });
    dispatch({
      type: DELETE_FACILITY_SUCCESS,
      payload: { facilityId, facilities: getState().facilities.facilities },
    });
  } catch (err) {
    console.log(err);
    // Todo: Handle Errors
  }
};

export const searchFacilities = (searchTerm) => async (dispatch, getState) => {
  getState().facilities.facilitiesLoading = true;
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
  dispatch({
    type: FILTER_FACILITIES,
    payload: {
      queryStr,
      facilities: getState().facilities.facilities,
    },
  });
};

export const clearFilteredFacilities = () => ({
  type: CLEAR_FILTERED_FACILITIES,
});

export const setCurrentFacility = (facility) => (dispatch) => {
  dispatch(reset('facilityForm'));

  dispatch({
    type: SET_CURRENT_FACILITY,
    payload: facility,
  });
};

export const clearCurrentFacility = () => (dispatch) => {
  dispatch(reset('facilityForm'));

  dispatch({
    type: CLEAR_CURRENT_FACILITY,
  });
};
