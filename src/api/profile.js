import ajax from '../utils/ajax';
import { HOST } from '../constants';

export function getUserProfile(params) {
  return ajax.post(`${HOST}/account/center`, { data: params });
}