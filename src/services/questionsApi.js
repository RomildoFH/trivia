const apiResponse = async () => {
  const response = await fetch('https://economia.awesomeapi.com.br/json/all');
  const api = response.json();

  return api;
};

export default apiResponse;
