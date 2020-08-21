import { message } from 'antd';
import * as api from '../api/profile'
import { GET_PROFILE } from '../constants/actions';

export function getUserProfile(payload = {}) {
  return async (dispatch) => {
    const {
      code,
      message: msg,
      data,
    } = await api.getUserProfile(payload);
    if (code === 0) {
      dispatch({
        type: GET_PROFILE,
        payload: data,
      })
    } else {
      message.error(msg);
    }
  }
}