import { FAZER_LOGIN, RECEIVE_GRAVATAR } from '../actions';

const INITIAL_STATE = {
  name: '',
  assertions: '',
  score: 0,
  gravatarEmail: '',
};

const player = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case FAZER_LOGIN:
    return ({
      ...state,
      name: action.name,
      gravatarEmail: action.gravatarEmail,
    });
  case RECEIVE_GRAVATAR:
    return ({
      ...state,
      gravatarEmail: action.gravatarEmail,
    });
  default:
    return state;
  }
};

export default player;
