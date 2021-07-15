import {
  PROFILE_LOADED,
  PROFILE_UPDATED,
  PROFILE_ERROR,
  ALL_PROFILES,
  GET_USERNAME,
} from '../actions/types';

const initialState = {
  isLoading: true,
  profile: null,
  profiles: [],
  userName: '',
};

const profile = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case PROFILE_LOADED:
    case PROFILE_UPDATED:
      return {
        ...state,
        userName: '',
        isLoading: false,
        profile: payload,
      };
    case GET_USERNAME:
      return {
        ...state,
        userName: payload,
      };
    case PROFILE_ERROR:
      return {
        ...state,
        userName: '',
        profile: null,
        isLoading: true,
      };
    case ALL_PROFILES:
      return {
        ...state,
        userName: '',
        profiles: payload,
      };
    default:
      return {
        ...state,
      };
  }
};

export default profile;
