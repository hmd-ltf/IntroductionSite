import axios from 'axios';
import { PROFILE_LOADED, PROFILE_UPDATED, PROFILE_ERROR } from './types';
import { setAlert } from './alert';

// Load Profile of current user
export const loadProfile = (userName) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/profile/${userName}`);
    dispatch({
      type: PROFILE_LOADED,
      payload: res.data,
    });
  } catch (err) {
    const errors = err.response.data.error;

    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
    }
    dispatch({
      type: PROFILE_ERROR,
    });
  }
};
