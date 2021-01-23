import { reset } from 'redux-form';
import ugCompass from '../apis/ugCompass';
import history from '../utils/history';
import {
  FETCH_ROOMS_SUCCESS,
  FETCH_ROOMS_ERROR,
  FETCH_ROOM_SUCCESS,
  FETCH_ROOM_ERROR,
  CREATE_ROOM_SUCCESS,
  CREATE_ROOM_ERROR,
  UPDATE_ROOM_ERROR,
  DELETE_ROOM_SUCCESS,
  DELETE_ROOM_ERROR,
  FILTER_ROOMS,
  CLEAR_FILTERED_ROOMS,
  SET_CURRENT_ROOM,
  CLEAR_CURRENT_ROOM,
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

export const fetchRooms = () => async (dispatch, getState) => {
  getState().rooms.roomsLoading = true;
  try {
    const { data } = await ugCompass.get('/rooms');

    dispatch({
      type: FETCH_ROOMS_SUCCESS,
      payload: data,
    });
  } catch (err) {
    setErrorResponse(err, FETCH_ROOMS_ERROR, dispatch);
  }
};

export const fetchRoom = (roomId) => async (dispatch, getState) => {
  getState().rooms.roomsLoading = true;
  try {
    const { data } = await ugCompass.get(`/rooms/${roomId}`);

    dispatch({
      type: FETCH_ROOM_SUCCESS,
      payload: data,
    });
  } catch (err) {
    setErrorResponse(err, FETCH_ROOM_ERROR, dispatch);
  }
};

export const createRoom = (formValues, facilityId) => async (
  dispatch,
  getState
) => {
  getState().rooms.roomsLoading = true;
  try {
    const room = await ugCompass.post(
      `/facilities/${facilityId}/rooms`,
      formValues,
      {
        headers: {
          Authorization: localStorage.ugcompass_token,
          'Content-Type': 'application/json',
        },
      }
    );
    dispatch({
      type: CREATE_ROOM_SUCCESS,
      payload: { rooms: getState().rooms.rooms, room },
    });
    dispatch(reset('roomForm'));
    history.push('/rooms');
    dispatch(clearCurrentRoom());
    dispatch(setAlert('green', 'Room created successfully', '', 3000));
  } catch (err) {
    setErrorResponse(err, CREATE_ROOM_ERROR, dispatch, 'Room was not created');
  }
};

export const updateRoom = (formValues, roomId) => async (
  dispatch,
  getState
) => {
  getState().rooms.roomsLoading = true;
  try {
    await ugCompass.put(`/rooms/${roomId}`, formValues, {
      headers: {
        Authorization: localStorage.ugcompass_token,
        'Content-Type': 'application/json',
      },
    });
    dispatch(reset('roomForm'));
    history.push('/rooms');
    dispatch(clearCurrentRoom());
    dispatch(setAlert('green', 'Room updated successfully', '', 3000));
  } catch (err) {
    setErrorResponse(err, UPDATE_ROOM_ERROR, dispatch, 'Room was not updated');
  }
};

export const deleteRoom = (roomId) => async (dispatch, getState) => {
  getState().rooms.roomsLoading = true;
  try {
    await ugCompass.delete(`/rooms/${roomId}`, {
      headers: {
        Authorization: localStorage.ugcompass_token,
      },
    });
    dispatch({
      type: DELETE_ROOM_SUCCESS,
      payload: { roomId, rooms: getState().rooms.rooms },
    });
    dispatch(setAlert('green', 'Room deleted successfully', '', 3000));
  } catch (err) {
    setErrorResponse(err, DELETE_ROOM_ERROR, dispatch, 'Room was not deleted');
  }
};

export const filterRooms = (queryStr) => (dispatch, getState) => {
  dispatch({
    type: FILTER_ROOMS,
    payload: {
      queryStr,
      rooms: getState().rooms.rooms,
    },
  });
};

export const clearFilteredRooms = () => ({
  type: CLEAR_FILTERED_ROOMS,
});

export const setCurrentRoom = (room) => (dispatch) => {
  dispatch(reset('roomForm'));

  dispatch({
    type: SET_CURRENT_ROOM,
    payload: room,
  });
};

export const clearCurrentRoom = () => (dispatch) => {
  dispatch(reset('roomForm'));

  dispatch({
    type: CLEAR_CURRENT_ROOM,
  });
};
