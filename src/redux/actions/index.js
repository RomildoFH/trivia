export const FAZER_LOGIN = 'FAZER_LOGIN';
export const REQUEST_TOKEN_START = 'REQUEST_TOKEN_START';
export const RECEIVE_TOKEN = 'RECEIVE_TOKEN';

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

const apiToken = 'https://opentdb.com/api_token.php?command=request';

export const fetchToken = () => async (dispatch) => {
  dispatch(requestToken());
  const response = await fetch(apiToken);
  const tokenPromise = await response.json();
  localStorage.setItem('token', tokenPromise.token);
  return dispatch(receiveToken(tokenPromise));
};
