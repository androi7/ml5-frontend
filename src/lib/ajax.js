import axios from 'axios';

const BASE_URL = 'http://localhost:3001';
const LOGIN_PATH = '/user/login';
const SIGNUP_PATH = '/user/signup';
const PROFILE_PATH = '/user/me';

export default {
  login(email, password) {
    const url = `${BASE_URL}${LOGIN_PATH}`;
    console.log('url', url);
    return axios.post(url, {
      email,
      password
    });
  },

  signup(username, email, password, passwordConfirmation) {
    const url = `${BASE_URL}${SIGNUP_PATH}`;
    return axios.post(url, {
      username,
      email,
      password,
      passwordConfirmation
    });
  },

  openProfile(token) {
    const url = `${BASE_URL}${PROFILE_PATH}`;
    return axios.get(url, {
      headers: {
        'token': token
      }
    });
  }
};
