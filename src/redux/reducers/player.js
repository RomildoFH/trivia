import { FAZER_LOGIN, RECEIVE_GRAVATAR, INCREASE_SCORE } from '../actions';

const INITIAL_STATE = {
  name: '',
  assertions: 0,
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
  case INCREASE_SCORE:
    return ({
      ...state,
      score: action.score,
      assertions: state.assertions + action.assertions,
    });
  default:
    return state;
  }
};

export default player;
