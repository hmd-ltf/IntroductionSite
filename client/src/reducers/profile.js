import {
  PROFILE_LOADED,
  PROFILE_UPDATED,
  PROFILE_ERROR,
} from '../actions/types';

const initialState = {
  isLoading: true,
  profile: null,
  profiles: [],
};

const profile = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case PROFILE_LOADED:
    case PROFILE_UPDATED:
      return {
        isLoading: false,
        profile: payload,
      };
    case PROFILE_ERROR:
      return {
        profile: null,
        isLoading: true,
      };
    default:
      return {
        ...state,
      };
  }
};

export default profile;
