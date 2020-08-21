import axios from 'axios';
import * as interceptors from './interceptors';

function getAxiosInstance(options) {
  const instance = axios.create();
  interceptors.install(instance, options);
  return instance;
}

function makeGet() {
  return function(url, option) {
    const instance = getAxiosInstance(option);
    return instance({
      url,
      method: 'get',
      ...option
    })
  }
}


function makePost() {
  return function(url, option) {
    const instance = getAxiosInstance(option);
    return instance({
      url,
      method: 'post',
      ...option
    })
  }
}


export default {
  get: makeGet(),
  post: makePost(),
};
