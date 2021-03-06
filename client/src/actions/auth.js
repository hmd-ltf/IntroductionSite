import axios from 'axios';
import setAuthToken from '../utils/setAuthToken';
import { setAlert } from './alert';

import {
  REGISTER_SUCCESS,
  REGISTER_FAILURE,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOG_OUT,
  DELETE_USER,
} from './types';

// Load User
export const loadUser = () => async (dispatch) => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }

  try {
    const res = await axios.get('/api/auth/');
    await axios.post('/api/profile/lastactive');
    dispatch({
      type: USER_LOADED,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: AUTH_ERROR,
    });
  }
};

// Login User
export const logIn = (email, password) => async (dispatch) => {
  const data = { email: email, password: password };
  try {
    const res = await axios.post('/api/auth/', data);

    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data,
    });
    dispatch(setAlert('Login Success', 'success'));

    dispatch(loadUser());
  } catch (err) {
    const errors = err.response.data.error;

    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
    }

    dispatch({
      type: LOGIN_FAILURE,
    });
  }
};

// Register User
export const signUp = (email, userName, password) => async (dispatch) => {
  const data = { email: email, userName: userName, password: password };
  try {
    const res = await axios.post('/api/user/', data);

    dispatch({
      type: REGISTER_SUCCESS,
      payload: res.data,
    });
    dispatch(setAlert('User Created Success', 'success'));
    dispatch(loadUser());
  } catch (err) {
    const errors = err.response.data.error;

    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
    }

    dispatch({
      type: REGISTER_FAILURE,
    });
  }
};

// LogOut
export const logOut = () => async (dispatch) => {
  try {
    await axios.post('/api/profile/lastactive');
    dispatch({
      type: LOG_OUT,
    });
  } catch (error) {
    dispatch({
      type: LOG_OUT,
    });
  }
};

// Delete User
export const deleteUser = () => async (dispatch) => {
  try {
    await axios.delete('/api/user');
    dispatch({
      type: DELETE_USER,
    });
    dispatch(setAlert('User Deleted Success', 'danger'));
  } catch (err) {
    const errors = err.response.data.error;

    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
    }

    dispatch({
      type: REGISTER_FAILURE,
    });
  }
};
