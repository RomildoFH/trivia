export const FAZER_LOGIN = 'FAZER_LOGIN';
export const REQUEST_TOKEN_START = 'REQUEST_TOKEN_START';
export const RECEIVE_TOKEN = 'RECEIVE_TOKEN';
export const REQUEST_GRAVATAR_START = 'REQUEST_GRAVATAR_START';
export const RECEIVE_GRAVATAR = 'RECEIVE_GRAVATAR';
export const REQUEST_QUESTIONS_START = 'REQUEST_QUESTIONS_START';
export const RECEIVE_QUESTIONS = 'RECEIVE_QUESTIONS';

export const actionLogin = (name, email) => ({
  type: FAZER_LOGIN,
  name,
  gravatarEmail: email,
});

export const requestToken = () => ({
  type: REQUEST_TOKEN_START,
});

export const receiveToken = (token) => ({
  type: RECEIVE_TOKEN,
  token,
});

const apiToken = 'https://opentdb.com/api_token.php?command=request';

export const fetchToken = () => async (dispatch) => {
  dispatch(requestToken());
  const response = await fetch(apiToken);
  const tokenPromise = await response.json();
  localStorage.setItem('token', tokenPromise.token);
  return dispatch(receiveToken(tokenPromise));
};

export const requestGravatar = () => ({
  type: REQUEST_GRAVATAR_START,
});

export const receiveGravatar = (gravatarEmail) => ({
  type: RECEIVE_GRAVATAR,
  gravatarEmail,
});

export const fetchGravatar = (url) => async (dispatch) => {
  dispatch(requestGravatar());
  const response = await fetch(url);
  return dispatch(receiveGravatar(response.url));
};

export const requestQuestions = () => ({
  type: REQUEST_QUESTIONS_START,
});

export const receiveQuestions = (questions) => ({
  type: RECEIVE_QUESTIONS,
  questions,
});

export const fetchQuestions = (url) => async (dispatch) => {
  dispatch(requestQuestions());
  const response = await fetch(url);
  const questionsPromisse = await response.json();
  return dispatch(receiveQuestions(questionsPromisse));
};
