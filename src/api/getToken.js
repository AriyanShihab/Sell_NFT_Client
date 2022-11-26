const getToken = (email) => {
  fetch(`http://localhost:5000/jwt?email=${email}`)
    .then((res) => res.json())
    .then((tokenData) => {
      if (tokenData.accessToken) {
        return tokenData.accessToken;
      }
    });
};

export default getToken;
