export const FAZER_LOGIN = 'FAZER_LOGIN';
export const REQUEST_TOKEN_START = 'REQUEST_TOKEN_START';
export const RECEIVE_TOKEN = 'RECEIVE_TOKEN';
export const REQUEST_GRAVATAR_START = 'REQUEST_GRAVATAR_START';
export const RECEIVE_GRAVATAR = 'RECEIVE_GRAVATAR';
export const REQUEST_QUESTIONS_START = 'REQUEST_QUESTIONS_START';
export const RECEIVE_QUESTIONS = 'RECEIVE_QUESTIONS';
export const UPDATE_TIMER = 'UPDATE_TIMER';
export const INCREASE_SCORE = 'INCREASE_SCORE';
export const RESET_SCORE = 'RESET_SCORE';

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
  try {
    const response = await fetch(apiToken);
    const tokenPromise = await response.json();
    localStorage.setItem('token', tokenPromise.token);
    dispatch(receiveToken(tokenPromise));
  } catch (error) {
    return error;
  }
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
  try {
    const response = await fetch(url);
    dispatch(receiveGravatar(response.url));
  } catch (error) {
    return error;
  }
};

export const requestQuestions = () => ({
  type: REQUEST_QUESTIONS_START,
});

export const receiveQuestions = (questions) => ({
  type: RECEIVE_QUESTIONS,
  questions,
});

// https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
const getShuffledArr = (arr) => [...arr].map((_, i, arrCopy) => {
  const rand = i + (Math.floor(Math.random() * (arrCopy.length - i)));
  [arrCopy[rand], arrCopy[i]] = [arrCopy[i], arrCopy[rand]];
  return arrCopy[i];
});

export const fetchQuestions = (url) => async (dispatch) => {
  dispatch(requestQuestions());
  const response = await fetch(url);
  const questionsPromisse = await response.json();
  for (let i = 0; i < questionsPromisse.results.length; i += 1) {
    const rightAnswer = questionsPromisse.results[i].correct_answer;
    const wrongAnswers = questionsPromisse.results[i].incorrect_answers;
    const alternatives = [rightAnswer, ...wrongAnswers];
    const shuffledAlternatives = getShuffledArr(alternatives);
    questionsPromisse.results[i].shuffledAlternatives = shuffledAlternatives;
  }
  return dispatch(receiveQuestions(questionsPromisse));
};

export const updateTimer = (payload) => ({
  type: UPDATE_TIMER,
  payload,
});

export const increaseScore = (score, assertions) => ({
  type: INCREASE_SCORE,
  score,
  assertions,
});

export const resetScore = () => ({
  type: RESET_SCORE,
});
