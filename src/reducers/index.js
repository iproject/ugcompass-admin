import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import authReducer from './authReducer';
import usersReducer from './usersReducer';
import facilitiesReducer from './facilitiesReducer';
import roomsReducer from './roomsReducer';
import alertsReducer from './alertsReducer';

export default combineReducers({
  auth: authReducer,
  form: formReducer,
  users: usersReducer,
  facilities: facilitiesReducer,
  rooms: roomsReducer,
  alerts: alertsReducer,
});
