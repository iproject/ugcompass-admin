import { reset } from 'redux-form';
import ugCompass from '../apis/ugCompass';
import history from '../utils/history';
import {
  FETCH_FACILITIES_SUCCESS,
  FETCH_FACILITIES_ERROR,
  FETCH_FACILITY_SUCCESS,
  FETCH_FACILITY_ERROR,
  FETCH_TOP_FACILITIES_SUCCESS,
  FETCH_TOP_FACILITIES_ERROR,
  CREATE_FACILITY_SUCCESS,
  CREATE_FACILITY_ERROR,
  UPDATE_FACILITY_ERROR,
  DELETE_FACILITY_SUCCESS,
  DELETE_FACILITY_ERROR,
  FILTER_FACILITIES,
  SET_CURRENT_FACILITY,
  CLEAR_FILTERED_FACILITIES,
  CLEAR_CURRENT_FACILITY,
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

export const fetchFacilities = () => async (dispatch, getState) => {
  getState().facilities.facilitiesLoading = true;
  try {
    const { data } = await ugCompass.get('/facilities');

    dispatch({
      type: FETCH_FACILITIES_SUCCESS,
      payload: data,
    });
  } catch (err) {
    setErrorResponse(err, FETCH_FACILITIES_ERROR, dispatch);
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
    setErrorResponse(err, FETCH_FACILITY_ERROR, dispatch);
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
    setErrorResponse(
      err,
      FETCH_TOP_FACILITIES_ERROR,
      dispatch,
      "Couldn't load top facilities"
    );
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
    dispatch(setAlert('green', 'Facility created successfully', '', 3000));
  } catch (err) {
    setErrorResponse(
      err,
      CREATE_FACILITY_ERROR,
      dispatch,
      'Facility was not created'
    );
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
    dispatch(setAlert('green', 'Facility updated successfully', '', 3000));
  } catch (err) {
    setErrorResponse(
      err,
      UPDATE_FACILITY_ERROR,
      dispatch,
      'Facility was not updated'
    );
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
    dispatch(setAlert('green', 'Facility deleted successfully', '', 3000));
  } catch (err) {
    setErrorResponse(err, DELETE_FACILITY_ERROR, dispatch);
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
