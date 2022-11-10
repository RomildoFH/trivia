import { REQUEST_TOKEN_START, RECEIVE_TOKEN } from '../actions';

const INITIAL_STATE = {
  token: '',
};

const token = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case REQUEST_TOKEN_START:
    return {
      ...state,
    };
  case RECEIVE_TOKEN:
    return {
      ...state,
      token: action.token.token,
    };

  default:
    return state;
  }
};

export default token;
