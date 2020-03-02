import axios from 'axios';

const BASE_URL = 'http://localhost:3001';
const LOGIN_PATH = '/user/login';
const SIGNUP_PATH = '/user/signup';
const PROFILE_PATH = '/user';
// const CLOUDINARY_URL = 'https://api.cloudinary.com/v1_1/dqo5zfv4u';
// const CLOUDINARY_UPLOAD_PRESET = 'react-preset';

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
    return axios.get(url, {
      headers: {
        'token': token
      }
    });
  },

  getMessages(token, chatId) {
    const url = `${BASE_URL}/chat/${chatId}/messages/`;
    return axios.get(url, {
      header: {
        'token': token
      }
    });
  },

  getParticipants(token) {
    const url = `${BASE_URL}/chat/participants`;
    console.log('getParticipants token', token);
    return axios.get(url, {
      header: {
        'token': token
      }
    });
  },

  uploadImage(image) {
    const url=`${BASE_URL}/video/upload`;
    // const formData = new FormData();
    // formData.append('image', image, 'titleTest');
    return axios.post(url, {
      headers: { 'Content-Type': 'multipart/form-data'},
      file: image
    });
  }

  // uploadImageToCloud: async function(data) {
  //
  //   const url = `${CLOUDINARY_URL}/image/upload`;
  //   const res =  await fetch(url,{
  //     method: 'POST',
  //     body: data,
  //     headers: { 'Content-Type': 'multipart/form-data'}
  //   },
  //   );
  //   return await res.json();
  // }

};
