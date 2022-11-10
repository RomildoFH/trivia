import questionResponse from '../../services/questionsApi';

export const FAZER_LOGIN = 'FAZER_LOGIN';
export const REQUEST_TOKEN_START = 'REQUEST_TOKEN_START';
export const RECEIVE_TOKEN = 'RECEIVE_TOKEN';
export const REQUEST_QUESTIONS_START = 'REQUEST_QUESTIONS_START';
export const RECEIVE_QUESTIONS = 'RECEIVE_QUESTIONS';

export const actionLogin = () => ({
  type: FAZER_LOGIN,
});

export const requestToken = () => ({
  type: REQUEST_TOKEN_START,
});

export const receiveToken = (token) => ({
  type: RECEIVE_TOKEN,
  token,
});

export const requestQuestions = () => ({
  type: REQUEST_QUESTIONS_START,
});

export const receiveQuestions = (questions) => ({
  type: RECEIVE_QUESTIONS,
  questions,
});

const apiToken = 'https://opentdb.com/api_token.php?command=request';

export const fetchToken = () => async (dispatch) => {
  dispatch(requestToken());
  const response = await fetch(apiToken);
  const tokenPromise = await response.json();
  localStorage.setItem('token', tokenPromise.token);
  return dispatch(receiveToken(tokenPromise));
};

export const fetchQuestions = () => async (dispatch) => {
  dispatch(requestQuestions());
  const token = localStorage.getItem('token');
  const response = await questionResponse(token);
  return dispatch(receiveQuestions(response));
};
