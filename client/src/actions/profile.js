import axios from 'axios';
import { PROFILE_LOADED, PROFILE_UPDATED, PROFILE_ERROR } from './types';

// Load Profile of current user
export const loadProfile = () => async (dispatch) => {
  try {
    const res = await axios.get('/api/profile/me');
    dispatch({
      type: PROFILE_LOADED,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: PROFILE_ERROR,
    });
  }
};
