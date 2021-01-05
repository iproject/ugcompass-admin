import { FETCH_FACILITIES_SUCCESS } from '../actions/types';

const initialState = {
  facilities: null,
  loading: true,
  error: null,
  message: null,
};

const facilitiesReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case FETCH_FACILITIES_SUCCESS:
      return { ...state, facilities: payload };

    default:
      return state;
  }
};

export default facilitiesReducer;
