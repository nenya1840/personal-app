import ajax from '../utils/ajax';
import { HOST } from '../constants';

export function getCaptcha(params) {
  return ajax.post(`${HOST}/user/getCaptcha`, {
    data: params,
    headers: {'content-type': 'application/x-www-form-urlencoded'}
  });
}


export function register(params) {
  return ajax.post(`${HOST}/user/register`, { data: params });
}


export function login(params) {
  return ajax.post(`${HOST}/user/login`, { data: params });
}
