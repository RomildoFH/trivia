import { UPDATE_TIMER } from '../actions';

const INITIAL_STATE = {
  time: 30,
};

const timer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case UPDATE_TIMER:
    return ({
      ...state,
      time: action.payload,
    });
  default:
    return state;
  }
};

export default timer;
