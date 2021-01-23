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

const initialState = {
  rooms: null,
  currentRoom: null,
  roomsLoading: true,
  filteredRooms: null,
  error: null,
  message: null,
};

const roomsReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case FETCH_ROOMS_SUCCESS:
      return {
        ...state,
        rooms: payload.data,
        roomsLoading: false,
      };

    case FETCH_ROOM_SUCCESS:
      return {
        ...state,
        currentRoom: payload.data,
        roomsLoading: false,
      };

    case CREATE_ROOM_SUCCESS:
      return {
        ...state,
        rooms: !payload.rooms
          ? [payload.room]
          : [payload.room, ...payload.rooms],
        roomsLoading: false,
      };

    case DELETE_ROOM_SUCCESS:
      return {
        ...state,
        rooms: payload.rooms.filter((room) => room._id !== payload.roomId),
        roomsLoading: false,
      };

    case FETCH_ROOMS_ERROR:
    case FETCH_ROOM_ERROR:
    case CREATE_ROOM_ERROR:
    case UPDATE_ROOM_ERROR:
    case DELETE_ROOM_ERROR:
      return {
        ...state,
        error: payload,
        roomsLoading: false,
      };

    case FILTER_ROOMS:
      return {
        ...state,
        filteredRooms: payload.rooms.filter((room) => {
          const regex = RegExp(`${payload.queryStr}`, 'gi');
          return room.name.match(regex);
        }),
      };

    case CLEAR_FILTERED_ROOMS:
      return {
        ...state,
        filteredRooms: null,
        roomsLoading: false,
      };

    case SET_CURRENT_ROOM:
      return {
        ...state,
        currentRoom: payload,
        facilityLoading: false,
      };

    case CLEAR_CURRENT_ROOM:
      return {
        ...state,
        currentRoom: null,
        roomsLoading: false,
      };

    default:
      return state;
  }
};

export default roomsReducer;
