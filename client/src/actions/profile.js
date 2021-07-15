import axios from 'axios';
import {
  PROFILE_LOADED,
  PROFILE_UPDATED,
  PROFILE_ERROR,
  ALL_PROFILES,
  GET_USERNAME,
} from './types';
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

// Load Profile of current user
export const loadMe = () => async (dispatch) => {
  try {
    const res = await axios.get('/api/profile/me');
    dispatch({
      type: PROFILE_LOADED,
      payload: res.data,
    });
  } catch (err) {
    console.log(err);
    dispatch({
      type: PROFILE_ERROR,
    });
  }
};

// Update Details
export const postDetails =
  (name, profilePic, briefSummary) => async (dispatch) => {
    const body = {
      name: name,
      profilePic: profilePic,
      briefSummary: briefSummary,
    };
    try {
      console.log(body);
      const res = await axios.post('/api/profile', body);
      dispatch({
        type: PROFILE_UPDATED,
        payload: res.data,
      });
      dispatch(setAlert('Profile Updated', 'success'));
    } catch (err) {
      console.log(err);
      // const errors = err.response.data.error;

      // if (errors) {
      //   errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
      // }
      dispatch({
        type: PROFILE_ERROR,
      });
    }
  };

// Post new Education
export const postEducation =
  (institution, from, to = null) =>
  async (dispatch) => {
    try {
      let res = {};
      if (to === null) {
        res = await axios.put('/api/profile/education', {
          institution: institution,
          from: from,
        });
      } else {
        res = await axios.put('/api/profile/education', {
          institution: institution,
          from: from,
          to: to,
        });
      }
      dispatch({
        type: PROFILE_UPDATED,
        payload: res.data,
      });
      dispatch(setAlert('Education Added', 'success'));
    } catch (err) {
      dispatch(setAlert('Education Not Added', 'danger'));

      dispatch({
        type: PROFILE_ERROR,
      });
    }
  };
// Delete Education
export const deleteEducation = (id) => async (dispatch) => {
  try {
    const res = await axios.delete(`/api/profile/education/${id}`);
    dispatch({
      type: PROFILE_UPDATED,
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

// Post New Work Experiance
export const postExperiance =
  (title, company, from, to = null) =>
  async (dispatch) => {
    try {
      let res = {};
      if (to === null) {
        res = await axios.put('/api/profile/work', {
          title: title,
          company: company,
          from: from,
        });
      } else {
        res = await axios.put('/api/profile/work', {
          title: title,
          company: company,
          from: from,
          to: to,
        });
      }
      dispatch({
        type: PROFILE_UPDATED,
        payload: res.data,
      });
      dispatch(setAlert('Work Experiance Added', 'success'));
    } catch (err) {
      dispatch(setAlert('Work Experiance Not Added', 'danger'));

      dispatch({
        type: PROFILE_ERROR,
      });
    }
  };
// Delete Education
export const deleteExperiance = (id) => async (dispatch) => {
  try {
    const res = await axios.delete(`/api/profile/work/${id}`);
    dispatch({
      type: PROFILE_UPDATED,
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

// Post A message
export const postMessage = (id, name, email, message) => async (dispatch) => {
  try {
    const body = {
      name: name,
      email: email,
      message: message,
    };
    const res = await axios.post(`/api/profile/message/${id}`, body);
    dispatch({
      type: PROFILE_UPDATED,
      payload: res.data,
    });
    dispatch(setAlert('Message Sent', 'success'));
  } catch (err) {
    dispatch(setAlert('Message Not Sent', 'danger'));

    dispatch({
      type: PROFILE_ERROR,
    });
  }
};

// Delete A Message
export const deleteMessage = (id) => async (dispatch) => {
  try {
    const res = await axios.delete(`/api/profile/message/${id}`);
    dispatch({
      type: PROFILE_UPDATED,
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

// Load All PRofiles
export const loadAllProfiles = () => async (dispatch) => {
  try {
    const res = await axios.get(`/api/profile/`);
    dispatch({
      type: ALL_PROFILES,
      payload: res.data,
    });
  } catch (error) {
    dispatch(setAlert('Some Error Occured', 'danger'));
  }
};

// Get User Name By Profile ID
export const getUserName = (id) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/profile/userName/${id}`);
    console.log(res.data);
    dispatch({
      type: GET_USERNAME,
      payload: res.data.userName,
    });
  } catch (error) {
    dispatch(setAlert('Some Error Occured', 'danger'));
  }
};
