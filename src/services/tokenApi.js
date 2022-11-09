const tokenResponse = async () => {
  const response = await fetch('https://opentdb.com/api_token.php?command=request');
  const api = response.json();
  return api;
};

export default tokenResponse;
