import { FETCH_ROOMS_SUCCESS } from '../actions/types';

const initialState = {
  rooms: null,
  loading: true,
  error: null,
  message: null,
};

const roomsReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case FETCH_ROOMS_SUCCESS:
      return { ...state, rooms: payload };

    default:
      return state;
  }
};

export default roomsReducer;