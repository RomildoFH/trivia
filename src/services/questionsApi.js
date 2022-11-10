const questionResponse = async (token) => {
  const response = await fetch(`https://opentdb.com/api.php?amount=5&token=${token}`);
  const api = response.json();

  return api;
};

export default questionResponse;
