import { nanoid } from 'nanoid';
import { SET_ALERT, REMOVE_ALERT } from './types';

// Set Alert
export const setAlert = (type, msg, subMessage = '', timeout = 5000) => (
  dispatch
) => {
  const id = nanoid();

  dispatch({
    type: SET_ALERT,
    payload: { type, msg, subMessage, id },
  });

  setTimeout(() => {
    dispatch({
      type: REMOVE_ALERT,
      payload: id,
    });
  }, timeout);
};
