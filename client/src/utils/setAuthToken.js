import axios from 'axios';

const setAuthToken = (token) => {
  axios.defaults.headers.common['Contant-Type'] = 'application/json';

  if (token) {
    axios.defaults.headers.common['x-auth-token'] = token;
  } else {
    delete axios.defaults.headers.common['x-auth-token'];
    localStorage.removeItem(token);
  }
};

export default setAuthToken;
