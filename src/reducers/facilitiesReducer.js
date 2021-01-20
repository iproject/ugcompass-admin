import {
  FETCH_FACILITIES_SUCCESS,
  FETCH_FACILITY_SUCCESS,
  FETCH_TOP_FACILITIES_SUCCESS,
  CREATE_FACILITY_SUCCESS,
  DELETE_FACILITY_SUCCESS,
  SEARCH_FACILITIES_SUCCESS,
  CLEAR_CURRENT_FACILITY,
  CLEAR_FILTERED_FACILITIES,
  FILTER_FACILITIES,
  SET_CURRENT_FACILITY,
} from '../actions/types';

const initialState = {
  facilities: null,
  topFacilities: null,
  currentFacility: null,
  facilitiesLoading: true,
  filteredFacilities: null,
  searchedFacilities: null,
  error: null,
  message: null,
};

const facilitiesReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case FETCH_FACILITIES_SUCCESS:
      return {
        ...state,
        facilities: payload.data,
        facilitiesLoading: false,
      };

    case FETCH_FACILITY_SUCCESS:
      return {
        ...state,
        currentFacility: payload.data,
        facilitiesLoading: false,
      };

    case FETCH_TOP_FACILITIES_SUCCESS:
      return {
        ...state,
        topFacilities: payload.data,
        facilitesLoading: false,
      };

    case CREATE_FACILITY_SUCCESS:
      return {
        ...state,
        facilities: !payload.facilites
          ? [payload.facility]
          : [payload.facility, ...payload.facilities],
        facilitiesLoading: false,
      };

    case DELETE_FACILITY_SUCCESS:
      return {
        ...state,
        facilities: payload.facilities.filter(
          (facility) => facility._id !== payload.facilityId
        ),
        facilitiesLoading: false,
      };

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

    case SET_CURRENT_FACILITY:
      return {
        ...state,
        currentFacility: payload,
        facilityLoading: false,
      };

    case CLEAR_CURRENT_FACILITY:
      return {
        ...state,
        currentFacility: null,
        facilitiesLoading: false,
      };

    default:
      return state;
  }
};

export default facilitiesReducer;
