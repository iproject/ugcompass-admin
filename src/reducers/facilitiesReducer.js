import {
  FETCH_FACILITIES_SUCCESS,
  SEARCH_FACILITIES_SUCCESS,
  CLEAR_FILTERED_FACILITIES,
  FILTER_FACILITIES,
} from '../actions/types';

const initialState = {
  facilities: null,
  facilitiesLoading: true,
  filteredFacilities: null,
  searchedFacilities: null,
  error: null,
  message: null,
};

const facilitiesReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case FETCH_FACILITIES_SUCCESS:
      return { ...state, facilities: payload.data, facilitiesLoading: false };

    case SEARCH_FACILITIES_SUCCESS:
      return {
        ...state,
        searchedFacilities: payload.data,
        facilitiesLoading: false,
      };

    case FILTER_FACILITIES:
      return {
        ...state,
        filteredFacilities: payload.facilities.filter((facility) => {
          const regex = RegExp(`${payload.queryStr}`, 'gi');
          return facility.name.match(regex);
        }),
      };

    case CLEAR_FILTERED_FACILITIES:
      return {
        ...state,
        filteredFacilities: null,
        facilitiesLoading: false,
      };

    default:
      return state;
  }
};

export default facilitiesReducer;
