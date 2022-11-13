import { REQUEST_ANSWERS_START, RECEIVE_ANSWERS } from '../actions';

const INITIAL_STATE = {
  currAnswers: [],
  correctAnswer: '',
};

const answers = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case REQUEST_ANSWERS_START:
    return {
      ...state,
    };
  case RECEIVE_ANSWERS:
    return {
      ...state,
      currAnswers: action.answers,
      correctAnswer: action.correctAnswer,
    };

  default:
    return state;
  }
};

export default answers;
