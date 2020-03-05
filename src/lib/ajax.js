import axios from 'axios';

const BASE_URL = ''; //'http://localhost:3001';
const LOGIN_PATH = '/user/login';
const SIGNUP_PATH = '/user/signup';
const PROFILE_PATH = '/user';

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

  openProfile(token, userId) {
    const url = `${BASE_URL}${PROFILE_PATH}/${userId}`;
    return axios.get(url);
  },

  getMessages(token, chatId) {
    const url = `${BASE_URL}/chat/${chatId}/messages/`;
    return axios.get(url);
  },

  getParticipants(token) {
    const url = `${BASE_URL}/chat/participants`;
    console.log('getParticipants token', token);
    return axios.get(url);
  },

  uploadImage(image, token) {
    const url = `${BASE_URL}/video/upload`;
    // const formData = new FormData();
    // formData.append('image', image, 'titleTest');
    return axios.post(url, {
        file: image.imageData,
        name: image.filename
      }, {
        headers: {
          // undefined, so browser will set type automatically
        'Content-Type': undefined, // 'multipart/form-data'

      }
    });
  },

  getGallery(token) {
    const url = `${BASE_URL}/video/images`;

    return axios.get(url);
  },

  initPublicChat(token) {
    const url = `${BASE_URL}/chat/public`;
    return axios.post(url);
  }

};
