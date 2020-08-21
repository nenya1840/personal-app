import {
  GET_PROFILE,
} from '../constants/actions';

const initState = {
};

export default function reducer(state = initState, action) {
  switch (action.type) {
    case GET_PROFILE:
      return {
        ...state,
        user: action.payload,
      }
    default:
      return state;
  }
}
