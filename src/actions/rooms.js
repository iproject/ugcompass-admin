import { reset } from 'redux-form';
import ugCompass from '../apis/ugCompass';
import history from '../utils/history';
import {
  FETCH_ROOMS_SUCCESS,
  FETCH_ROOM_SUCCESS,
  CREATE_ROOM_SUCCESS,
  DELETE_ROOM_SUCCESS,
  SEARCH_ROOMS_SUCCESS,
  FILTER_ROOMS,
  CLEAR_FILTERED_ROOMS,
  CLEAR_CURRENT_ROOM,
} from '../actions/types';

export const fetchRooms = () => async (dispatch, getState) => {
  getState().rooms.roomsLoading = true;
  try {
    const { data } = await ugCompass.get('/rooms');

    dispatch({
      type: FETCH_ROOMS_SUCCESS,
      payload: data,
    });
  } catch (err) {
    console.log(err);
    // Todo: Handle Errors
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
    console.log(err);
    // Todo: Handle Errors
  }
};

export const createRoom = (formValues) => async (dispatch, getState) => {
  getState().rooms.roomsLoading = true;
  try {
    const facility = await ugCompass.post('/rooms', formValues, {
      headers: {
        Authorization: localStorage.ugcompass_token,
        'Content-Type': 'application/json',
      },
    });
    dispatch({
      type: CREATE_ROOM_SUCCESS,
      payload: { rooms: getState().rooms.rooms, facility },
    });
    dispatch(reset('facilityform'));
    history.push('/rooms');
  } catch (err) {
    console.log(err);
    // Todo: Handle Errors
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
    dispatch(reset('facilityform'));
    history.push('/rooms');
  } catch (err) {
    console.log(err);
    // Todo: Handle Errors
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
  } catch (err) {
    console.log(err);
    // Todo: Handle Errors
  }
};

export const searchRooms = (searchTerm) => async (dispatch, getState) => {
  getState().rooms.roomsLoading = true;
  try {
    const { data } = await ugCompass.get('/rooms', {
      params: {
        search: searchTerm,
        per_page: 5,
      },
    });
    dispatch({ type: SEARCH_ROOMS_SUCCESS, payload: data });
  } catch (err) {
    console.log(err);
    // Todo: Handle Errors
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

export const clearCurrentRoom = () => ({
  type: CLEAR_CURRENT_ROOM,
});
