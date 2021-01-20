import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import authReducer from './authReducer';
import usersReducer from './usersReducer';
import facilitiesReducer from './facilitiesReducer';
import roomsReducer from './roomsReducer';
import { CLEAR_FACILITY_FORM_DATA } from '../actions/types';

export default combineReducers({
  auth: authReducer,
  form: formReducer.plugin({
    facilityForm: (state, action) => {
      switch (action.type) {
        case CLEAR_FACILITY_FORM_DATA:
          return undefined; // <--- blow away form data
        default:
          return state;
      }
    },
  }),
  // form: formReducer,
  users: usersReducer,
  facilities: facilitiesReducer,
  rooms: roomsReducer,
});
