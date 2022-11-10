import { REQUEST_QUESTIONS_START, RECEIVE_QUESTIONS } from '../actions';

const INITIAL_STATE = {
  questionsList: [],
};

const questions = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case REQUEST_QUESTIONS_START:
    return {
      ...state,
    };
  case RECEIVE_QUESTIONS:
    return {
      ...state,
      questionsList: action.questions.results,
    };

  default:
    return state;
  }
};

export default questions;
