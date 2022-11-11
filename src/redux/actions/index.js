import questionResponse from '../../services/questionsApi';

export const FAZER_LOGIN = 'FAZER_LOGIN';
export const REQUEST_TOKEN_START = 'REQUEST_TOKEN_START';
export const RECEIVE_TOKEN = 'RECEIVE_TOKEN';
export const REQUEST_QUESTIONS_START = 'REQUEST_QUESTIONS_START';
export const RECEIVE_QUESTIONS = 'RECEIVE_QUESTIONS';
export const REQUEST_GRAVATAR_START = 'REQUEST_GRAVATAR_START';
export const RECEIVE_GRAVATAR = 'RECEIVE_GRAVATAR';
export const REQUEST_ANSWERS_START = 'REQUEST_ANSWERS_START';
export const RECEIVE_ANSWERS = 'RECEIVE_ANSWERS';

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

export const fetchQuestions = (token) => async (dispatch) => {
  dispatch(requestQuestions());
  try {
    const response = await questionResponse(token);
    dispatch(receiveQuestions(response));
  } catch (error) {
    return error;
  }
};

export const requestAnswers = () => ({
  type: REQUEST_ANSWERS_START,
});

export const receiveAnswers = (answers, correctAnswer) => ({
  type: RECEIVE_ANSWERS,
  answers,
  correctAnswer,
});

// Algorítmo que randomiza a ordem de itens dentro de um array
const shuffleArray = (array) => {
  for (let i = array.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

export const getAnswers = (questionList, currQuestion) => async (dispatch) => {
  dispatch(requestAnswers());
  try {
    const answersArr = [];
    const savedAnswer = questionList[currQuestion].correct_answer;
    answersArr.push(
      questionList[currQuestion].correct_answer,
    );
    questionList[currQuestion].incorrect_answers.forEach((element) => {
      answersArr.push(element);
    });
    console.log(answersArr);
    const reorderedArr = shuffleArray(answersArr);
    dispatch(receiveAnswers(reorderedArr, savedAnswer));
  } catch (error) {
    return console.log('deu ruim');
  }
};
